// trending clicked card for home page

const faqButtons = document.querySelectorAll('.faq-question');

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('i');
    const isOpen = answer.style.display === 'block';
    // closing other answers
    faqButtons.forEach((btn) => {
      const otherAnswer = btn.nextElementSibling;
      const otherIcon = btn.querySelector('i');

      otherAnswer.style.display = 'none';
      otherIcon.classList.remove('fa-xmark');
      otherIcon.classList.add('fa-plus');
    });
    // making sure two answers is not opened
    if (!isOpen) {
      answer.style.display = 'block';
      icon.classList.remove('fa-plus');
      icon.classList.add('fa-xmark');
    }
  });
});

// const learnMore = document.getElementById('hiddenseen');
// const hiddenParagraph = document.getElementById('hiddenopen');

// learnMore.addEventListener('click', () => {
//   hiddenParagraph.classList.remove('hidden');
//   learnMore.style.display = 'none';
// });

// scroll disable
// const scrollContainerScroll = document.querySelector('.scroll-container');
// const btnLeftScroll = document.querySelector('.scroll-left');
// const btnRightScroll = document.querySelector('.scroll-right');

// function checkingArrow() {
//   const scrollLeft = scrollContainerScroll.scrollLeft;
//   const scrollWidth = scrollContainerScroll.scrollWidth;
//   const clientWidth = scrollContainerScroll.clientWidth;

//   if (scrollLeft <= 0) {
//     btnLeftScroll.classList.add('hidden');
//   } else {
//     btnLeft.classList.remove('hicdden');
//   }

//   if (scrollLeft + clientWidth >= scrollWidth - 1) {
//     btnRightScroll.classList.add('hidden');
//   } else {
//     btnRightScroll.classList.remove('hidden');
//   }
// }

// window.addEventListener('load', checkingArrow);
// scrollContainerScroll.addEventListener('scroll', checkingArrow);

// Getting Values from the sign in page
document.addEventListener('DOMContentLoaded', function () {
  const loginButton = document.querySelector('.btn');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('Password');
  const errorMsg = document.getElementById('error');

  const validEmail = 'Kingleyfestus24@gmail.com';
  const validPassword = '35729083K';

  loginButton.addEventListener('click', function () {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (email === validEmail && password === validPassword) {
      // Redirect to main page
      window.location.href = '../AfterSigninPage.html';
    } else {
      errorMsg.textContent = 'Invalid email or password. Try again.';
    }

    if (emailInput === '' && passwordInput === '') {
      errorMsg.textContent = 'please input your login credentials';
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const getStartedInput = document.getElementById('get__started');
  const formRegistered = document.getElementById('form__registered');

  console.log(formRegistered);
  console.log(getStartedInput);
  formRegistered.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent default

    const userEmail = getStartedInput.value.trim(); // Get the email value

    if (userEmail) {
      const encodedEmail = encodeURIComponent(userEmail);
      console.log(encodedEmail);
      window.location.href = `../html/signin.html?email=${encodedEmail}`;
    } else {
      alert('Please enter your email address to get started.');
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const urlpasrs = new URLSearchParams(window.location.search);
  const email = urlpasrs.get('email');

  const emailInput = document.getElementById('emailInput');
  if (email && emailInput) {
    emailInput.value = decodeURIComponent(email);
  }
});
