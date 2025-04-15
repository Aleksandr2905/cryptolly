document.addEventListener('DOMContentLoaded', () => {
  const sliderInit = () => {
    const sliderWrapper = document.querySelector('.vertical-slider__wrapper');
    const slider = document.querySelector('.vertical-slider__slides');
    const slides = document.querySelectorAll('.vertical-slider__slide');
    const titleElement = document.getElementById('slider-title');

    if (!slider || !sliderWrapper || slides.length === 0) return;

    let currentIndex = 0;
    let totalSlides = slides.length;
    let isScrolling = false;
    let isMobile = window.innerWidth <= 768;
    let autoScrollInterval = null;

    const initSlider = () => {
      sliderWrapper.removeEventListener('wheel', handleWheel);
      sliderWrapper.removeEventListener('mouseenter', handleWrapperMouseEnter);
      sliderWrapper.removeEventListener('mouseleave', handleWrapperMouseLeave);
      slider.removeEventListener('scroll', handleMobileScroll);
      stopAutoScroll();

      if (isMobile) {
        setupMobileScrollHandlers();
      } else {
        setupDesktopHandlers();
      }

      updateSlideClasses();
      updateTitle();
      if (!isMobile) {
        scrollToCenterSlide(currentIndex, 'auto');
      }
    };

    const updateTitle = () => {
      if (titleElement && slides[currentIndex]) {
        const newTitle = slides[currentIndex].getAttribute('data-title');
        titleElement.textContent =
          newTitle && newTitle.trim() !== ''
            ? newTitle
            : `Lörem ipsum dorade boktig till geosylig postmodern ${
                currentIndex + 1
              }`;
      }
    };

    const scrollToCenterSlide = (index, behavior = 'smooth') => {
      if (!slides[index] || isMobile || totalSlides < 3) return;

      let firstVisibleIndex;
      if (index < 1) {
        firstVisibleIndex = 0;
      } else if (index >= totalSlides - 1) {
        firstVisibleIndex = totalSlides - 3;
      } else {
        firstVisibleIndex = index - 1;
      }

      firstVisibleIndex = Math.max(
        0,
        Math.min(firstVisibleIndex, totalSlides - 3)
      );

      const firstVisibleSlide = slides[firstVisibleIndex];
      if (!firstVisibleSlide) return;

      const targetScrollTop = firstVisibleSlide.offsetTop;

      slider.scrollTo({
        top: targetScrollTop,
        behavior: behavior,
      });
    };

    const updateSlideClasses = () => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active-slide', i === currentIndex);
      });
    };

    const changeSlide = newIndex => {
      if (
        newIndex < 0 ||
        newIndex >= totalSlides ||
        newIndex === currentIndex ||
        isScrolling
      )
        return false;

      isScrolling = true;
      currentIndex = newIndex;
      updateTitle();
      updateSlideClasses();

      const behavior = 'smooth';
      if (!isMobile) {
        scrollToCenterSlide(currentIndex, behavior);
      }

      const scrollDuration = behavior === 'smooth' ? 400 : 0;
      setTimeout(() => {
        isScrolling = false;
      }, scrollDuration);

      return true;
    };

    const slideUp = () => {
      if (isScrolling) return;
      changeSlide(currentIndex - 1);
    };

    const slideDown = () => {
      if (isScrolling) return;
      const nextIndex = (currentIndex + 1) % totalSlides;
      changeSlide(nextIndex);
    };

    const startAutoScroll = () => {
      stopAutoScroll();
      autoScrollInterval = setInterval(() => {
        slideDown();
      }, 2000);
    };

    const stopAutoScroll = () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
      }
    };

    const handleWheel = e => {
      stopAutoScroll();
      e.preventDefault();
      if (isScrolling) return;

      if (e.deltaY > 0) {
        slideDown();
      } else {
        slideUp();
      }
    };

    const handleWrapperMouseEnter = () => {
      if (isMobile || autoScrollInterval) return;
      startAutoScroll();
    };

    const handleWrapperMouseLeave = () => {
      if (isMobile) return;
      stopAutoScroll();
    };

    const setupDesktopHandlers = () => {
      sliderWrapper.addEventListener('wheel', handleWheel, { passive: false });

      sliderWrapper.addEventListener('mouseenter', handleWrapperMouseEnter);
      sliderWrapper.addEventListener('mouseleave', handleWrapperMouseLeave);
    };

    let scrollTimeout;
    const handleMobileScroll = () => {
      if (isScrolling) return;

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        const scrollTop = slider.scrollTop;
        let closestIndex = 0;
        let minDistance = Infinity;

        slides.forEach((slide, index) => {
          const slideTop = slide.offsetTop - slider.offsetTop;
          const slideCenter = slideTop + slide.offsetHeight / 2;
          const containerCenter = scrollTop + slider.clientHeight / 2;
          const distance = Math.abs(slideCenter - containerCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        });

        if (closestIndex !== currentIndex) {
          currentIndex = closestIndex;
          updateSlideClasses();
          updateTitle();
        }
      }, 150);
    };

    const setupMobileScrollHandlers = () => {
      slider.addEventListener('scroll', handleMobileScroll, { passive: true });
      updateSlideClasses();
    };

    const handleResize = () => {
      const currentlyMobile = window.innerWidth <= 768;
      if (isMobile !== currentlyMobile) {
        isMobile = currentlyMobile;
        stopAutoScroll();
        initSlider();
      }
    };

    window.addEventListener('resize', handleResize);
    initSlider();
  };

  sliderInit();
});
