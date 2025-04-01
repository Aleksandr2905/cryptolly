document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.team__slider');
  const slides = document.querySelectorAll('.team__slide');
  const prevButton = document.querySelector('.team__slide-prev-button');
  const nextButton = document.querySelector('.team__slide-next-button');
  const navDots = document.querySelectorAll('.team__slide-nav-dot');

  let currentIndex = 0;
  const slideCount = slides.length;

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    navDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  prevButton.addEventListener('click', function () {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlider();
  });

  nextButton.addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlider();
  });

  navDots.forEach((dot, index) => {
    dot.addEventListener('click', function () {
      currentIndex = index;
      updateSlider();
    });
  });

  updateSlider();
});
