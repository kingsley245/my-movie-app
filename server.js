const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const logger = require('./logger');
const sendErrorMail = require('./mailer');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(' MongoDB connected');
    logger.info('MongoDB connected');
  })
  .catch((err) => {
    console.error(' MongoDB error:', err.message);
    logger.error('MongoDB error: ' + err.message);
  });

// Movie Schema
const videoSchema = new mongoose.Schema({
  title: String,
  videoId: String,
  posterPath: String,
  backdropPath: String,
  genres: [String],
  overview: String,
  releaseDate: Date
});

const Video = mongoose.model('Video', videoSchema);

// Generic TMDB fetch function
const fetchAPIData = async (endpoint) => {
  try {
    const res = await axios.get(`https://api.themoviedb.org/3/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return res.data;
  } catch (error) {
    const msg = `TMDB fetch failed at endpoint ${endpoint}: ${error.message}`;
    logger.error(msg);
    await sendErrorMail(msg);
    throw error;
  }
};

// Save movie to MongoDB if not already existing
const saveMovieToDB = async (movie) => {
  const exists = await Video.findOne({ videoId: movie.videoId });
  if (!exists) {
    const newMovie = new Video(movie);
    await newMovie.save();
    logger.info(`Saved: ${movie.title}`);
  } else {
    logger.info(` Skipped (already exists): ${movie.title}`);
  }
};

// Fetch & save popular movies
app.get('/fetch-popular', async (req, res) => {
  try {
    const { results } = await fetchAPIData('movie/popular');
    for (const movie of results) {
      await saveMovieToDB({
        title: movie.title,
        videoId: movie.id.toString(),
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        genres: [], // Could be extended with detailed fetch
        overview: movie.overview,
        releaseDate: movie.release_date
      });
    }
    res.status(200).json({ message: ' Popular movies fetched and saved.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch/save popular movies' });
  }
});

// Fetch & save trending movies
app.get('/fetch-trending', async (req, res) => {
  try {
    const { results } = await fetchAPIData('/trending/movie/day');
    for (const movie of results) {
      await saveMovieToDB({
        title: movie.title,
        videoId: movie.id.toString(),
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        genres: [],
        overview: movie.overview,
        releaseDate: movie.release_date
      });
    }
    res.status(200).json({ message: 'Trending movies fetched and saved.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch/save trending movies' });
  }
});

// fetch and save up coming
app.get('/upcoming-movie', async (req, res) => {
  try {
    const { results } = await fetchAPIData('movie/upcoming?page=1');

    const savePromises = results.map((movie) =>
      saveMovieToDB({
        title: movie.title,
        videoId: movie.id.toString(),
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        genres: [],
        overview: movie.overview,
        releaseDate: movie.release_date
      })
    );

    await Promise.all(savePromises);

    res.status(200).json({ message: 'Upcoming movies saved successfully.' });
  } catch (error) {
    console.error('Error saving upcoming movies:', error.message);
    res.status(500).json({ error: 'Failed to save upcoming movies.' });
  }
});

// Route to return all saved videos
app.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving videos' });
  }
});

// 404 fallback route
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  logger.info(`Server started on port ${PORT}`);
});
