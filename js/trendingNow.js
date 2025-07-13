const global__routes = window.location.pathname;

async function fetchAPIData(endpoint) {
  const api_key =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmZkYzAzNDE4YWUxNDEyYWFmMGIwMzc2MjY5MWMyMiIsIm5iZiI6MTc0MDA3MDQxOS4wNzIsInN1YiI6IjY3Yjc1ZTEzYmM4NGQ1NmNiZWJhMGU4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AaOSDu2daaBc65yUTLh63CTzVc6BaDBXX7RVIZl3VdM';

  const apiUrl = 'https://api.themoviedb.org/3/';

  const res = await fetch(apiUrl + endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${api_key}`,
      'content-Type': 'application/json'
    }
  });

  const data = await res.json();

  return data;
}

const container = document.getElementById('trendingContainer');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

const updateArrows = () => {
  const maxScrollLeft = container.scrollWidth - container.clientWidth;
  scrollLeftBtn.style.display = container.scrollLeft > 0 ? 'block' : 'none';
  scrollRightBtn.style.display =
    container.scrollLeft < maxScrollLeft - 10 ? 'block' : 'none';
};

scrollLeftBtn.addEventListener('click', () => {
  container.scrollBy({
    left: -container.clientWidth,
    behavior: 'smooth'
  });
});

scrollRightBtn.addEventListener('click', () => {
  container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
});

container.addEventListener('scroll', updateArrows);
window.addEventListener('load', updateArrows);

// Trending movies
function showTrendingDetails(movie) {
  const template = document.getElementById('movieDetailsTemplate');
  const clone = template.content.cloneNode(true);

  // Fill details
  const overlay = clone.querySelector('.overlay');
  const card = clone.querySelector('.card');
  const closeBtn = clone.querySelector('.closeBtn');

  clone.querySelector(
    '.detailImage'
  ).src = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
  clone.querySelector('.detailImage').alt = movie.title || movie.name;
  clone.querySelector('.detailTitle').textContent = movie.title || movie.name;
  clone.querySelector('.detailDescription').textContent = movie.overview;

  const tags = clone.querySelector('.detailTags');
  tags.innerHTML = `
    <span class="tag">${(
      movie.release_date ||
      movie.first_air_date ||
      ''
    ).slice(0, 4)}</span>
    <span class="tag">16+</span>
    <span class="tag">${movie.media_type || 'Movie'}</span>
    <span class="tag">Action</span>
    <span class="tag">Thriller</span>
  `;

  // Close modal function
  function closeCard() {
    card.classList.add('fade-out');
    setTimeout(() => {
      overlay.remove();
    }, 300);
  }

  closeBtn.addEventListener('click', closeCard);

  overlay.addEventListener('click', (e) => {
    if (!card.contains(e.target)) {
      closeCard();
    }
  });

  document.body.appendChild(clone);
}

// fetchTrending movies for home page an array of 20
async function fetchTrendingMovies() {
  const trending = await fetchAPIData('/trending/movie/day');
  const movies = trending.results;
  console.log(movies);
  const trending_card = document.getElementById('trendingContainer');
  trending_card.innerHTML = '';

  if (!Array.isArray(movies)) {
    console.error('Expected an array in trending.results, got:', movies);
    return;
  }
  movies.forEach((movies, index) => {
    const div = document.createElement('div');
    div.className = 'movie-card';
    div.innerHTML = ` <img src="https://image.tmdb.org/t/p/w500${
      movies.poster_path
    }" alt="${movies.name}" />  <div class="card-number">${index + 1}</div>`;
    div.addEventListener('click', () => showTrendingDetails(movies));
    trending_card.appendChild(div);
  });
}

async function fetchUpcomingMovie() {
  const Upcoming = await fetchAPIData('/movie/upcoming');
  const resultsUpcoming = Upcoming.results;
  console.log(resultsUpcoming);
}

fetchUpcomingMovie();
// Routes// Init app

function init() {
  switch (global__routes) {
    case '/':
    case '/index.html':
      fetchTrendingMovies();
      // showTrendingDetails();
      break;
    case '/shows.html':
      // displplaypopularTVshows();
      // console.log('tv shows')
      break;
    case '/movie-details.html':
      // console.log('movies-details');
      // displayMovieDetails();
      break;
    case '/tv-details.html':
      // displayTVdetails();
      break;
    case '/search.html':
      // search();
      break;
  }

  // highlightActivelink();
}
document.addEventListener('DOMContentLoaded', init);
