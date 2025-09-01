// async function fetchAPIData(endpoint) {
//   const api_key =
//     'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmZkYzAzNDE4YWUxNDEyYWFmMGIwMzc2MjY5MWMyMiIsIm5iZiI6MTc0MDA3MDQxOS4wNzIsInN1YiI6IjY3Yjc1ZTEzYmM4NGQ1NmNiZWJhMGU4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AaOSDu2daaBc65yUTLh63CTzVc6BaDBXX7RVIZl3VdM';
//   const apiUrl = 'https://api.themoviedb.org/3/';

//   const res = await fetch(apiUrl + endpoint, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${api_key}`,
//       'content-Type': 'application/json'
//     }
//   });

//   const data = await res.json();

//   return data;
// }

// console.log(data);
// fetchAPIData();

// alert('fjd');

// // checking scroll behavior
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

// // toggling arrow button
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

// btnRight.addEventListener('click', () => {e
//   scrollContainer.scrollBy({
//     left: scrollAmount,
//     behavior: 'smooth'
//   });
// });
