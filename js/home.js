const globalYoutubeApi = 'AIzaSyDVvv2ovnfnafvXCFobzgSahqXb2O8JsD4';

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
// loading indicator fetch
fetch('html/loading.html')
  .then((res) => res.text())
  .then((html) => {
    const loaderWrapper = document.createElement('div');
    loaderWrapper.innerHTML = html;
    document.body.appendChild(loaderWrapper);
  });

function showloader() {
  const loading = document.getElementById('lottie-loader');
  if (loading) loading.style.display = 'block';
}

function hideLoader() {
  const loading = document.getElementById('lottie-loader');
  if (loading) loading.style.display = 'none';
}
// using the youtube api

async function fetchtest() {
  const popular = await fetchAPIData('movie/popular');
  const movie = popular.results;
}

fetchtest();

(() => {
  const scrollContainer = document.getElementById('scroll_container-movie');
  const btnLeft = document.querySelector('.scroll-left');
  const btnRight = document.querySelector('.scroll-right');

  if (!scrollContainer || !btnLeft || !btnRight) return;

  const scrollAmount = 500;

  function updateArrows() {
    const scrollLeft = scrollContainer.scrollLeft;
    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;

    btnLeft.classList.toggle('hidden', scrollLeft <= 0);

    // hide right arrow if at end
    btnRight.classList.toggle(
      'hidden',
      scrollLeft + clientWidth >= scrollWidth - 1
    );
  }

  updateArrows();

  window.addEventListener('load', updateArrows);
  scrollContainer.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);

  // left button scroll
  btnLeft.addEventListener('click', () => {
    scrollContainer.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  // right button scroll
  btnRight.addEventListener('click', () => {
    scrollContainer.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });
})();

// scroll container for popular movies

(() => {
  const scrollContainer = document.getElementById(
    'scroll_container-popular-movies'
  );
  const btnLeft = document.getElementById('scroll-left-popular');
  const btnRight = document.getElementById('scroll-right-popular');

  if (!scrollContainer || !btnLeft || !btnRight) return;

  const scrollAmount = 500;

  function updateArrows() {
    const scrollLeft = scrollContainer.scrollLeft;
    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;

    btnLeft.classList.toggle('hidden', scrollLeft <= 0);

    btnRight.classList.toggle(
      'hidden',
      scrollLeft + clientWidth >= scrollWidth - 1
    );
  }

  updateArrows();

  // run again on load, scroll, resize
  window.addEventListener('load', updateArrows);
  scrollContainer.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);

  // left button scroll
  btnLeft.addEventListener('click', () => {
    scrollContainer.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  // right button scroll
  btnRight.addEventListener('click', () => {
    scrollContainer.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });
})();

// scroll container for Now playing movies
(() => {
  const scrollContainer = document.getElementById(
    'scroll_container-nowplaying-movies'
  );
  const btnLeft = document.getElementById('scroll-left-nowplaying');
  const btnRight = document.getElementById('scroll-right-nowplaying');

  if (!scrollContainer || !btnLeft || !btnRight) return;

  const scrollAmount = 500;

  function updateArrows() {
    const scrollLeft = scrollContainer.scrollLeft;
    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;

    btnLeft.classList.toggle('hidden', scrollLeft <= 0);

    btnRight.classList.toggle(
      'hidden',
      scrollLeft + clientWidth >= scrollWidth - 1
    );
  }

  updateArrows();

  // run again when page loads, scrolling, or resizing
  window.addEventListener('load', updateArrows);
  scrollContainer.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);

  // left button scroll
  btnLeft.addEventListener('click', () => {
    scrollContainer.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  // right button scroll
  btnRight.addEventListener('click', () => {
    scrollContainer.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });
})();

// scroll container for Top Rated movies
(() => {
  const scrollContainer = document.getElementById(
    'scroll_container-top_rated-movies'
  );
  const btnLeft = document.getElementById('scroll-left-top_rated');
  const btnRight = document.getElementById('scroll-right-top_rated');

  if (!scrollContainer || !btnLeft || !btnRight) return;

  const scrollAmount = 500;

  function updateArrows() {
    const scrollLeft = scrollContainer.scrollLeft;
    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;

    btnLeft.classList.toggle('hidden', scrollLeft <= 0);

    btnRight.classList.toggle(
      'hidden',
      scrollLeft + clientWidth >= scrollWidth - 1
    );
  }

  updateArrows();

  scrollContainer.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);

  btnLeft.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  btnRight.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
})();

// How much to scroll per click (adjust this to match card width + gap)

// trending movie details
function ShowMovieDetails(movie) {
  const template = document.getElementById('MovieDetailsTemplate');
  const clone = template.content.cloneNode(true);

  // fill details
  const overlay = clone.querySelector('.overlay_movieDetails');
  const card = clone.querySelector('.card_Details');
  const closeBtn = clone.querySelector('.closeBtn');
  console.log(template);
  console.log(clone.querySelector('.detailImage'));

  clone.querySelector(
    '.detailImage'
  ).src = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
  clone.querySelector('.detailImage').alt = movie.title || movie.name;
  clone.querySelector('.movie_details_title').textContent =
    movie.title || movie.name;
  clone.querySelector('.movie_details_description').textContent =
    movie.overview;

  const tags = clone.querySelector('.movie_tages');
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

  // close modal function
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

async function fetchNollyWoodTrailer() {
  try {
    const response = await fetchAPIData('movie/upcoming');
    const popularResult = response.results;

    const wrapper = document.getElementById('nollywood-wrapper');
    wrapper.innerHTML = '';

    popularResult.forEach((movie) => {
      const title =
        movie.title.length > 10
          ? movie.title.slice(0, 30) + '...'
          : movie.title;
      const rating = movie.vote_average.toFixed(1); // Rounded to 1 decimal
      const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'fallback.jpg'; // fallback image

      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${poster}" alt="${title}" />
        <div class="movie-rating"><i class="fas fa-star"></i> ${rating}</div>
        <div class="movie-title">${movie.title}</div>
      `;

      wrapper.appendChild(card);
      card.addEventListener('click', () => {
        ShowMovieDetails(movie);
      });
    });
  } catch (error) {
    console.error(' Error fetching videos from TMDB:', error);
  } finally {
    hideLoader(); // Make sure this is defined elsewhere
  }
}

// fectching  popular movies for home
async function PopularMoviesForHome() {
  try {
    const response = await fetchAPIData('movie/popular');
    const popularResult = response.results;

    const wrapper = document.getElementById('popular-movies');
    wrapper.innerHTML = '';

    popularResult.forEach((movie) => {
      const title =
        movie.title.length > 10
          ? movie.title.slice(0, 30) + '...'
          : movie.title;
      const rating = movie.vote_average.toFixed(1); // Rounded to 1 decimal
      const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'fallback.jpg'; // fallback image

      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${poster}" alt="${title}" />
        <div class="movie-rating"><i class="fas fa-star"></i> ${rating}</div>
        <div class="movie-title">${movie.title}</div>
      `;

      wrapper.appendChild(card);
      card.addEventListener('click', () => {
        ShowMovieDetails(movie);
      });
    });
  } catch (error) {
    console.error(' Error fetching videos from TMDB:', error);
  } finally {
    hideLoader(); // Make sure this is defined elsewhere
  }
}
async function ShowNow_playingMovies() {
  try {
    const response = await fetchAPIData('movie/now_playing');
    const popularResult = response.results;

    const wrapper = document.getElementById('now_playing-movies');
    wrapper.innerHTML = '';

    popularResult.forEach((movie) => {
      const title =
        movie.title.length > 10
          ? movie.title.slice(0, 30) + '...'
          : movie.title;
      const rating = movie.vote_average.toFixed(1); // Rounded to 1 decimal
      const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'fallback.jpg'; // fallback image

      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${poster}" alt="${title}" />
        <div class="movie-rating"><i class="fas fa-star"></i> ${rating}</div>
        <div class="movie-title">${movie.title}</div>
      `;

      wrapper.appendChild(card);
      card.addEventListener('click', () => {
        ShowMovieDetails(movie);
      });
    });
  } catch (error) {
    console.error(' Error fetching videos from TMDB:', error);
  } finally {
    hideLoader(); // Make sure this is defined elsewhere
  }
}

async function ShowTop_rated_movies() {
  try {
    const response = await fetchAPIData('movie/top_rated');
    const popularResult = response.results;

    const wrapper = document.getElementById('top_rated-movies');
    wrapper.innerHTML = '';

    popularResult.forEach((movie) => {
      const title =
        movie.title.length > 10
          ? movie.title.slice(0, 30) + '...'
          : movie.title;
      const rating = movie.vote_average.toFixed(1); // Rounded to 1 decimal
      const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'fallback.jpg'; // fallback image

      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${poster}" alt="${title}" />
        <div class="movie-rating"><i class="fas fa-star"></i> ${rating}</div>
        <div class="movie-title">${movie.title}</div>
      `;

      wrapper.appendChild(card);
      card.addEventListener('click', () => {
        ShowMovieDetails(movie);
      });
    });
  } catch (error) {
    console.error(' Error fetching videos from TMDB:', error);
  } finally {
    hideLoader(); // Make sure this is defined elsewhere
  }
}
ShowNow_playingMovies();
fetchNollyWoodTrailer();
PopularMoviesForHome();
ShowTop_rated_movies();
