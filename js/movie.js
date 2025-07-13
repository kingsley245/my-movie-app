// checking scroll behavior
const scrollContainerScroll = document.querySelector('.scroll-container');
const btnLeftScroll = document.querySelector('.scroll-left');
const btnRightScroll = document.querySelector('.scroll-right');

console.log('scrollContainerScroll:', scrollContainerScroll);
console.log('btnLeftScroll:', btnLeftScroll);
console.log('btnRightScroll:', btnRightScroll);

function checkingArrow() {
  const scrollLeft = scrollContainerScroll.scrollLeft;
  const scrollWidth = scrollContainerScroll.scrollWidth;
  const clientWidth = scrollContainerScroll.clientWidth;

  if (scrollLeft <= 0) {
    btnLeftScroll.classList.add('hidden');
  } else {
    btnLeftScroll.classList.remove('hidden');
  }

  if (scrollLeft + clientWidth >= scrollWidth - 1) {
    btnRightScroll.classList.add('hidden');
  } else {
    btnRightScroll.classList.remove('hidden');
  }
}

window.addEventListener('load', checkingArrow);
scrollContainerScroll.addEventListener('scroll', checkingArrow);

// toggling arrow button
const scrollContainer = document.querySelector('.scroll-container');
const btnLeft = document.querySelector('.scroll-left');
const btnRight = document.querySelector('.scroll-right');

const scrollAmount = 300;

btnLeft.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth'
  });
});

btnRight.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
});
