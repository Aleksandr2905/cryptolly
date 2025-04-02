document.addEventListener('DOMContentLoaded', () => {
  const sliderInit = () => {
    const sliderWrapper = document.querySelector('.vertical-slider__wrapper');
    const slider = document.querySelector('.vertical-slider__slides');
    const slides = document.querySelectorAll('.vertical-slider__slide');
    const titleElement = document.getElementById('slider-title');

    if (!slider || slides.length === 0) return;

    const VISIBLE_SLIDES = 3;
    let currentIndex = 0;
    let totalSlides = slides.length;
    let isScrolling = false;
    let isMobile = window.innerWidth <= 375;

    const initSlider = () => {
      if (isMobile) {
        for (let i = 0; i < totalSlides; i++) {
          slides[i].style.display = 'flex';
          slides[i].style.opacity = '1';
        }

        setupMobileScrollHandlers();
      } else {
        for (let i = 0; i < totalSlides; i++) {
          slides[i].style.display = 'flex';
          slides[i].style.opacity = '1';
        }
        setupDesktopScrollHandlers();
      }

      updateTitle();
    };

    const updateTitle = () => {
      if (titleElement && slides[currentIndex]) {
        const newTitle = slides[currentIndex].getAttribute('data-title');
        console.log(`New title: ${newTitle}`);

        if (newTitle && newTitle.trim() !== '') {
          titleElement.textContent = newTitle;
        } else {
          titleElement.textContent = `Lörem ipsum dorade boktig till geosylig postmodern ${
            currentIndex + 1
          }`;
        }
      }
    };

    const slideUp = () => {
      if (currentIndex <= 0 || isScrolling) return;

      isScrolling = true;
      currentIndex--;

      updateTitle();
      scrollToActiveSlide();

      setTimeout(() => {
        isScrolling = false;
      }, 300);
    };

    const slideDown = () => {
      if (currentIndex >= totalSlides - 1 || isScrolling) return;

      isScrolling = true;
      currentIndex++;

      updateTitle();
      scrollToActiveSlide();

      setTimeout(() => {
        isScrolling = false;
      }, 300);
    };

    const scrollToActiveSlide = () => {
      if (!slides[currentIndex]) return;

      const slideTop = slides[currentIndex].offsetTop;
      slider.scrollTo({
        top: slideTop - 50,
        behavior: 'smooth',
      });
    };

    const handleWheel = e => {
      e.preventDefault();

      if (e.deltaY > 0) {
        slideDown();
      } else {
        slideUp();
      }
    };

    const setupDesktopScrollHandlers = () => {
      sliderWrapper.addEventListener('mouseenter', () => {
        sliderWrapper.addEventListener('wheel', handleWheel, {
          passive: false,
        });
      });

      sliderWrapper.addEventListener('mouseleave', () => {
        sliderWrapper.removeEventListener('wheel', handleWheel);
      });
    };

    const setupMobileScrollHandlers = () => {
      let scrollTimeout;
      let isManualScrolling = false;

      const updateActiveCard = () => {
        for (let i = 0; i < totalSlides; i++) {
          slides[i].classList.remove('active-slide');
        }

        if (currentIndex >= 0 && currentIndex < totalSlides) {
          slides[currentIndex].classList.add('active-slide');
        }
      };

      slider.addEventListener('scroll', () => {
        if (isManualScrolling) return;

        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }

        scrollTimeout = setTimeout(() => {
          const scrollTop = slider.scrollTop;
          const slideHeight = slides[0].offsetHeight + 20;

          let visibleIndex = Math.floor(scrollTop / slideHeight);

          const scrollOffset = scrollTop % slideHeight;
          const scrollProgress = scrollOffset / slideHeight;

          if (scrollProgress > 0.5 && visibleIndex < totalSlides - 1) {
            visibleIndex++;
          }

          if (
            visibleIndex >= 0 &&
            visibleIndex < totalSlides &&
            visibleIndex !== currentIndex
          ) {
            currentIndex = visibleIndex;
            updateActiveCard();
            updateTitle();
          }
        }, 100);
      });

      updateActiveCard();
    };

    const handleResize = () => {
      const wasDesktop = !isMobile;
      isMobile = window.innerWidth <= 768;

      if (wasDesktop !== !isMobile) {
        initSlider();
      }
    };

    window.addEventListener('resize', handleResize);
    initSlider();
  };

  sliderInit();
});
