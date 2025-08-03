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
  console.log(movie);
}

fetchtest();

// async function fetchVideosFromDatabase() {
//   try {
//     const response = await fetchAPIData('movie/popular');
//     const popularResult = response.results;

//     const wrapper = document.getElementById('trending-cards-wrapper');
//     wrapper.innerHTML = '';

//     popularResult.forEach((movie) => {
//       const title =
//         movie.title.length > 30
//           ? movie.title.slice(0, 30) + '...'
//           : movie.title;
//       const rating = movie.vote_average.toFixed(1); // Rounded to 1 decimal
//       const poster = movie.poster_path
//         ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
//         : 'fallback.jpg'; // fallback image

//       const card = document.createElement('div');
//       card.className = 'movie-card';
//       card.innerHTML = `
//         <img src="${poster}" alt="${title}" />
//         <div class="movie-rating"><i class="fas fa-star"></i> ${rating}</div>
//         <div class="movie-title">${movie.title}</div>
//       `;

//       wrapper.appendChild(card);
//     });
//   } catch (error) {
//     console.error(' Error fetching videos from TMDB:', error);
//   } finally {
//     hideLoader(); // Make sure this is defined elsewhere
//   }
// }

async function fetchNollyWoodTrailer() {
  try {
    const response = await fetchAPIData('movie/upcoming');
    const popularResult = response.results;

    const wrapper = document.getElementById('nollywood-wrapper');
    wrapper.innerHTML = '';

    popularResult.forEach((movie) => {
      const title =
        movie.title.length > 30
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
    });
  } catch (error) {
    console.error(' Error fetching videos from TMDB:', error);
  } finally {
    hideLoader(); // Make sure this is defined elsewhere
  }
}

async function fetchNollywoodMovies() {
  const query = 'latest nollywood movie trailers 2025';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=6&q=${encodeURIComponent(
    query
  )}&key=${globalYoutubeApi}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const wrapper = document.getElementById('nollywood-wrapper');
    wrapper.innerHTML = '';

    data.items.forEach((video) => {
      const { title, thumbnails } = video.snippet;
      const videoId = video.id.videoId;

      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${thumbnails.high.url}" alt="${title}" />
        <div class="movie-rating"><i class="fas fa-star"></i> N/A</div>
        <div class="movie-title">${
          title.length > 30 ? title.slice(0, 30) + '...' : title
        }</div>
      `;

      // card.onclick = () => {
      //   window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
      // };

      wrapper.appendChild(card);
    });
  } catch (error) {
    console.error('Failed to fetch Nollywood movies:', error);
  }
}

async function fetchTrendingComediesNigeria() {
  const query = 'Trending Nigerian Comedy Skits 2025';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=6&q=${encodeURIComponent(
    query
  )}&key=${globalYoutubeApi}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const wrapper = document.getElementById('nigeria-comedy-wrapper');
    wrapper.innerHTML = '';

    data.items.forEach((video) => {
      const { title, thumbnails } = video.snippet;
      const videoId = video.id.videoId;

      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${thumbnails.high.url}" alt="${title}" />
        <div class="movie-rating"><i class="fas fa-star"></i> </div>
        <div class="movie-title">${
          title.length > 30 ? title.slice(0, 30) + '...' : title
        }</div>
      `;

      card.onclick = () => {
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
      };

      wrapper.appendChild(card);
    });
  } catch (error) {
    console.error('Comedy fetch error:', error);
  }
}

async function fetchTrendingNigerianCartoons() {
  // const apiKey = 'AIzaSyDU7Jw10AykEQgzsGMkZwA8h7TC0ewl9vI';
  const query = 'Trending Nigerian Cartoons for kids 2025';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=6&q=${encodeURIComponent(
    query
  )}&key=${globalYoutubeApi}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const wrapper = document.getElementById('cartoons-wrapper');
    console.log(wrapper);
    wrapper.innerHTML = '';

    data.items.forEach((video) => {
      const { title, thumbnails } = video.snippet;
      const videoId = video.id.videoId;

      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${thumbnails.high.url}" alt="${title}" />
        <div class="movie-rating"><i class="fas fa-star"></i> 🎬</div>
        <div class="movie-title">${
          title.length > 30 ? title.slice(0, 30) + '...' : title
        }</div>
      `;

      card.onclick = () => {
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
      };

      wrapper.appendChild(card);
    });
  } catch (error) {
    console.error('Cartoon fetch failed:', error);
  }
}

// k-drama
async function fetchLatestKDrama() {
  const query = 'Latest Korean Drama 2025 with English Subtitles';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=6&q=${encodeURIComponent(
    query
  )}&key=${globalYoutubeApi}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const wrapper = document.getElementById('kdrama-wrapper');
    console.log(wrapper);
    wrapper.innerHTML = '';

    data.items.forEach((video) => {
      const { title, thumbnails } = video.snippet;
      const videoId = video.id.videoId;

      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${thumbnails.high.url}" alt="${title}" />
        <div class="movie-rating"><i class="fas fa-star"></i> 🇰🇷</div>
        <div class="movie-title">${
          title.length > 30 ? title.slice(0, 30) + '...' : title
        }</div>
      `;

      card.onclick = () => {
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
      };

      wrapper.appendChild(card);
    });
  } catch (error) {
    console.error('K-Drama fetch failed:', error);
  }
}

async function fetchLatestRomanticMovies() {
  const query = 'Latest Romantic Movies 2025 full movie English';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=6&q=${encodeURIComponent(
    query
  )}&key=${globalYoutubeApi}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const wrapper = document.getElementById('romantic-wrapper');
    wrapper.innerHTML = '';

    data.items.forEach((video) => {
      const { title, thumbnails } = video.snippet;
      const videoId = video.id.videoId;

      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${thumbnails.high.url}" alt="${title}" />
        <div class="movie-rating"><i class="fas fa-heart"></i> </div>
        <div class="movie-title">${
          title.length > 30 ? title.slice(0, 30) + '...' : title
        }</div>
      `;

      card.onclick = () => {
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
      };

      wrapper.appendChild(card);
    });
  } catch (error) {
    console.error('Romantic movie fetch failed:', error);
  }
}

async function fetchHollywoodRomanticMovies() {
  const query = 'Hollywood Romantic Movies 2025 full movie English';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=6&q=${encodeURIComponent(
    query
  )}&key=${globalYoutubeApi}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const wrapper = document.getElementById('hollywood-romantic-wrapper');
    wrapper.innerHTML = '';

    data.items.forEach((video) => {
      const { title, thumbnails } = video.snippet;
      const videoId = video.id.videoId;

      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${thumbnails.high.url}" alt="${title}" />
        <div class="movie-rating"><i class="fas fa-heart"></i></div>
        <div class="movie-title">${
          title.length > 30 ? title.slice(0, 30) + '...' : title
        }</div>
      `;

      card.onclick = () => {
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
      };

      wrapper.appendChild(card);
    });
  } catch (error) {
    console.error('Hollywood Romantic Movies fetch failed:', error);
  }
}

async function fetchActionMovies() {
  const query = 'Latest Hollywood Action Movies 2025';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=6&q=${encodeURIComponent(
    query
  )}&key=${globalYoutubeApi}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const wrapper = document.getElementById('action-wrapper');
    wrapper.innerHTML = '';

    data.items.forEach((video) => {
      const { title, thumbnails } = video.snippet;
      const videoId = video.id.videoId;

      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `
        <img src="${thumbnails.high.url}" alt="${title}" />
        <div class="movie-rating"><i class="fas fa-star"></i></div>
        <div class="movie-title">${
          title.length > 30 ? title.slice(0, 30) + '...' : title
        }</div>
      `;

      card.onclick = () => {
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
      };

      wrapper.appendChild(card);
    });
  } catch (error) {
    console.error(' Action movies fetch failed:', error);
  }
}

fetchNollyWoodTrailer();
