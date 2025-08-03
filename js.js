// const globalLocation = {
//   currentPage: window.location.pathname
// };

// const links = document.querySelectorAll('.sidebar-list-item-l');

// const scriptMap = {
//   'tv.html': 'js/tv.js',
//   'Movie.html': 'js/movie.js',
//   'Trending.html': 'js/trending.js',
//   'animation.html': 'js/animation.js',
//   'home.html': 'js/home.js',
//   'sportlife.html': 'js/sport live.js',
//   'search.html': 'js/search.js'
// };

// function loadContent(url, pushToHistory = true) {
//   localStorage.setItem('activePage', url);

//   // Updating active class from my css
//   links.forEach((link) => link.classList.remove('active'));
//   const targetLi = Array.from(links).find((li) => {
//     const a = li.querySelector('a');
//     return a && a.getAttribute('href') === url;
//   });
//   if (targetLi) targetLi.classList.add('active');

//   // Loading content from external file
//   fetch(url)
//     .then((res) => {
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       return res.text();
//     })
//     .then((html) => {
//       document.getElementById('homeContent').innerHTML = html;

//       for (let key in scriptMap) {
//         if (url.includes(key)) {
//           loadScript(scriptMap[key]);
//           break;
//         }
//       }

//       // Updating browser history
//       if (pushToHistory) {
//         history.pushState({ url }, null, url);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       document.getElementById(
//         'homeContent'
//       ).innerHTML = `<h1 style="color:red;">Failed to load</h1>`;
//     });
// }

// // clicked listeners to all sidebar items
// links.forEach((li) => {
//   li.addEventListener('click', function (e) {
//     e.preventDefault();
//     const a = li.querySelector('a');
//     if (!a) return;
//     const url = a.getAttribute('href');
//     loadContent(url, true);
//   });
// });

// window.addEventListener('popstate', (e) => {
//   const url = (e.state && e.state.url) || 'home.html';
//   loadContent(url, false);
// });

// // on page load

// window.addEventListener('DOMContentLoaded', () => {
//   const saved = localStorage.getItem('activePage') || 'home.html';
//   loadContent(saved, false);
// });

// // Loading external JS file
// function loadScript(filepath) {
//   const script = document.createElement('script');
//   script.src = filepath;
//   script.defer = true;
//   document.body.appendChild(script);
// }

const links = document.querySelectorAll('.sidebar-list-item-l');

const scriptMap = {
  tv: 'js/tv.js',
  movie: 'js/movie.js',
  trending: 'js/trending.js',
  animation: 'js/animation.js',
  home: 'js/home.js',
  sportlive: 'js/sport live.js',
  search: 'js/search.js'
};

function loadContent(pageKey) {
  const file = `${pageKey}.html`;
  localStorage.setItem('activePage', pageKey);

  // Update sidebar active class
  links.forEach((link) => link.classList.remove('active'));
  const targetLi = Array.from(links).find((li) => {
    const a = li.querySelector('a');
    return a && a.getAttribute('href') === `#${pageKey}`;
  });
  if (targetLi) targetLi.classList.add('active');

  // Load HTML
  fetch(file)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.text();
    })
    .then((html) => {
      document.getElementById('homeContent').innerHTML = html;

      // Load JS for page half content
      if (scriptMap[pageKey]) {
        loadScript(scriptMap[pageKey]);
      }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById(
        'homeContent'
      ).innerHTML = `<h1 style="color:red;">Failed to load ${file}</h1>`;
    });
}

// Handle click events
links.forEach((li) => {
  li.addEventListener('click', function (e) {
    e.preventDefault();
    const a = li.querySelector('a');
    if (!a) return;
    const page = a.getAttribute('href').substring(1); // remove #
    location.hash = page;
  });
});

// Hash change or page refresh
window.addEventListener('hashchange', () => {
  const page = location.hash.replace('#', '') || 'home';
  loadContent(page);
});

window.addEventListener('DOMContentLoaded', () => {
  const page = location.hash.replace('#', '') || 'home';
  loadContent(page);
});

function loadScript(filepath) {
  const script = document.createElement('script');
  script.src = filepath;
  script.defer = true;
  document.body.appendChild(script);
}

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search');

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'enter') {
    e.preventDefault();
  }
});
