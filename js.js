const links = [
  ...document.querySelectorAll('.sidebar-list-item-l'),
  ...(document.getElementById('ToggleMenu')
    ? [document.getElementById('ToggleMenu')]
    : [])
];

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
  console.log(links);

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

// const searchForm = document.getElementById('search-form');
// const searchInput = document.getElementById('search');

// searchInput.addEventListener('keydown', (e) => {
//   if (e.key === 'enter') {
//     e.preventDefault();
//   }
// });

//  menu click menu
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('side_BAR');
const sideOverLay = document.createElement('div');
sideOverLay.className = 'side_overlay';
document.body.appendChild(sideOverLay);

menuToggle.addEventListener('click', () => {
  sideOverLay.classList.add('active');
  sidebar.classList.add('active');
});

sideOverLay.addEventListener('click', () => {
  sideOverLay.classList.remove('active');
  sidebar.classList.remove('active');
});

// Close when resizing to desktop
const BREAKPOINT = 768; // adjust this to your design breakpoint
window.addEventListener('resize', () => {
  if (window.innerWidth > BREAKPOINT) {
    sidebar.classList.remove('active');
    sideOverLay.classList.remove('active');
  }
});

document.querySelectorAll('.mobile_link a').forEach((link) => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('active');
    sideOverLay.classList.remove('active');
  });
});

const AllLinks = document.querySelectorAll(
  '.side-list-item-l a, .mobile_link a'
);
AllLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const current = link.dataset.link;

    // removing all active for all
    AllLinks.forEach((li) => li.parentElement.classList.remove('active'));

    // add active to both sidebar and mobile link that share the same data-set-link
    document
      .querySelectorAll(`[data-link="${current}"]`)
      .forEach((matchingValue) => {
        matchingValue.parentElement.classList.add('active');
      });
  });
});

const mobile_link_active = document.querySelectorAll('.mobile_link');

function showACTIVE(pageKey) {
  // const mobile_link_active = document.querySelectorAll('mobile_link');
  mobile_link_active.forEach((link) => link.classList.remove('active'));
  localStorage.setItem('active', pageKey);

  const recentLI = Array.from(mobile_link_active).find((li) => {
    const a = li.querySelector('a');
    return a && a.getAttribute('href') === `#${pageKey}`;
  });
  if (recentLI) recentLI.classList.add('active');
  console.log(mobile_link_active);
}

// handles mobile click events

mobile_link_active.forEach((li) => {
  li.addEventListener('click', function (e) {
    e.preventDefault();

    const a = li.querySelector('a');
    if (!a) return;
    const page_active = a.getAttribute('href').substring(1);
    location.hash.page;
  });
});

// hash changes or refresh
window.addEventListener('hashchange', () => {
  const page = location.hash.replace('#', '') || 'home';
  showACTIVE(page);
});

window.addEventListener('DOMContentLoaded', () => {
  const page = location.hash.replace('#', '') || 'home';
  showACTIVE(page);
});
