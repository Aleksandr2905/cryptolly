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

    slides.forEach((slide, index) => {
      console.log(`Slide ${index} title: ${slide.dataset.title}`);
    });

    const initSlider = () => {
      if (isMobile) {
        for (let i = 0; i < totalSlides; i++) {
          slides[i].style.display = 'flex';
          slides[i].style.opacity = '1';
        }

        setupMobileScrollHandlers();
      } else {
        for (let i = VISIBLE_SLIDES; i < totalSlides; i++) {
          slides[i].style.display = 'none';
        }
        setupDesktopScrollHandlers();
      }

      updateTitle();
    };

    const updateTitle = () => {
      console.log(`Updating title with currentIndex: ${currentIndex}`);

      if (titleElement && slides[currentIndex]) {
        const newTitle = slides[currentIndex].getAttribute('data-title');
        console.log(`New title: ${newTitle}`);

        if (newTitle && newTitle.trim() !== '') {
          titleElement.textContent = newTitle;
        } else {
          titleElement.textContent = `Lörem ipsum dorade boktig till geosylig postmodern ${currentIndex}`;
        }
      }
    };

    const slideUp = () => {
      if (currentIndex <= 0 || isScrolling) return;

      isScrolling = true;
      currentIndex--;
      console.log(`Slide up, new currentIndex: ${currentIndex}`);

      const lastVisibleIndex = currentIndex + VISIBLE_SLIDES - 1;

      if (slides[lastVisibleIndex + 1]) {
        slides[lastVisibleIndex + 1].style.opacity = '0';
        setTimeout(() => {
          slides[lastVisibleIndex + 1].style.display = 'none';
          isScrolling = false;
        }, 300);
      } else {
        isScrolling = false;
      }

      if (slides[currentIndex]) {
        slides[currentIndex].style.display = 'flex';
        slides[currentIndex].style.opacity = '0';

        setTimeout(() => {
          slides[currentIndex].style.opacity = '1';
        }, 50);
      }

      updateTitle();
    };

    const slideDown = () => {
      if (currentIndex >= totalSlides - 1 || isScrolling) return;

      isScrolling = true;

      slides[currentIndex].style.opacity = '0';

      setTimeout(() => {
        slides[currentIndex].style.display = 'none';

        if (currentIndex < totalSlides - 1) {
          currentIndex++;
        }

        console.log(`Slide down, new currentIndex: ${currentIndex}`);

        updateTitle();

        const newVisibleIndex = Math.min(
          currentIndex + VISIBLE_SLIDES - 1,
          totalSlides - 1
        );

        if (newVisibleIndex < totalSlides && slides[newVisibleIndex]) {
          slides[newVisibleIndex].style.display = 'flex';
          slides[newVisibleIndex].style.opacity = '0';

          setTimeout(() => {
            slides[newVisibleIndex].style.opacity = '1';
          }, 50);
        }

        isScrolling = false;
      }, 300);
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

        if (currentIndex >= 0 && currentIndex + 1 < totalSlides) {
          slides[currentIndex + 1].classList.add('active-slide');
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
            console.log(`Mobile scroll, new currentIndex: ${currentIndex}`);
          }
        }, 100);
      });

      updateActiveCard();
    };

    const handleResize = () => {
      const wasDesktop = !isMobile;
      isMobile = window.innerWidth <= 375;

      if (wasDesktop !== !isMobile) {
        initSlider();
      }
    };

    window.addEventListener('resize', handleResize);
    initSlider();
  };

  sliderInit();
});
