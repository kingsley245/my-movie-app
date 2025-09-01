// // const scrollContainer = document.querySelector('.scroll-container');
// const btnLeft = document.querySelector('.scroll-left');
// const btnRight = document.querySelector('.scroll-right');

// const scrollAmount = 300;

// btnLeft.addEventListener('click', () => {
//   scrollContainer.scrollBy({
//     left: -scrollAmount,
//     behavior: 'smooth'
//   });
// });

// btnRight.addEventListener('click', () => {
//   scrollContainer.scrollBy({
//     left: scrollAmount,
//     behavior: 'smooth'
//   });
// });

// // const scrollContainerScroll = document.querySelector('.scroll-container');
// const btnLeftScroll = document.querySelector('.scroll-left');
// const btnRightScroll = document.querySelector('.scroll-right');

// console.log('scrollContainerScroll:', scrollContainerScroll);
// console.log('btnLeftScroll:', btnLeftScroll);
// console.log('btnRightScroll:', btnRightScroll);

// function checkingArrow() {
//   const scrollLeft = scrollContainerScroll.scrollLeft;
//   const scrollWidth = scrollContainerScroll.scrollWidth;
//   const clientWidth = scrollContainerScroll.clientWidth;

//   if (scrollLeft <= 0) {
//     btnLeftScroll.classList.add('hidden');
//   } else {
//     btnLeftScroll.classList.remove('hidden');
//   }

//   if (scrollLeft + clientWidth >= scrollWidth - 1) {
//     btnRightScroll.classList.add('hidden');
//   } else {
//     btnRightScroll.classList.remove('hidden');
//   }
// }

// window.addEventListener('load', checkingArrow);
// scrollContainerScroll.addEventListener('scroll', checkingArrow);

// async function loadPage(page) {
//   try {
//     const res = await fetch(page);
//     if (!res.ok) throw new Error('Page not found');
//     const html = await res.text();
//     document.getElementById('homeContent').innerHTML = html;

//     // Update active class on links
//     document.querySelectorAll('.sidebar-list-item-l a').forEach((a) => {
//       if (a.getAttribute('href') === page) {
//         a.classList.add('active');
//       } else {
//         a.classList.remove('active');
//       }
//     });
//   } catch (err) {
//     document.getElementById('content').innerHTML =
//       '<p>Sorry, page could not be loaded.</p>';
//     console.error(err);
//   }
// }

// window.addEventListener('DOMContentLoaded', () => {
//   // Load default page
//   loadPage('home.html');

//   // Add click listeners to sidebar links
//   document.querySelectorAll('sidebar-list-item-l a').forEach((link) => {
//     alert(',mfcbhij');
//     link.addEventListener('click', (e) => {
//       e.preventDefault();
//       loadPage(link.getAttribute('href'));
//     });
//   });
// });

// console.log(sidebar - list - item - l);
