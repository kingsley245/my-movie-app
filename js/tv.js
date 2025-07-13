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

async function trendingMoviesTV(params) {
  try {
    const res = await fetchAPIData('/tv/top_rated');
    const results = res.results;

    const wrapper = document.getElementById('trending-cards-wrapper');
    wrapper.innerHTML = '';

    results.forEach((movie) => {
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

      // Optionally: Click opens TMDB page or trailer later
      // card.onclick = () => {
      //   window.open(`https://www.themoviedb.org/movie/${movie.id}`, '_blank');
      // };

      wrapper.appendChild(card);
    });
  } catch (error) {
    console.error(' Error fetching videos from TMDB:', error);
  }
}
