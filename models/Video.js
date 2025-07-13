const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: String,
  thumbnail: String,
  videoId: String,
  publishedAt: String
});

module.exports = mongoose.model('Video', videoSchema);
