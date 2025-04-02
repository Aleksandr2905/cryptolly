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
    let isMobile = window.innerWidth <= 768;

    // Проверяем data-title атрибуты всех слайдов
    slides.forEach((slide, index) => {
      console.log(`Slide ${index} title: ${slide.dataset.title}`);
    });

    // Устанавливаем начальное состояние слайдера
    const initSlider = () => {
      if (isMobile) {
        // На мобильных устройствах показываем все слайды, но в видимой области только 3
        for (let i = 0; i < totalSlides; i++) {
          slides[i].style.display = 'flex';
          slides[i].style.opacity = '1';
        }

        // Устанавливаем обработчики скролла для мобильных
        setupMobileScrollHandlers();
      } else {
        // Скрываем все слайды, начиная с VISIBLE_SLIDES
        for (let i = VISIBLE_SLIDES; i < totalSlides; i++) {
          slides[i].style.display = 'none';
        }
        // Устанавливаем desktop обработчики
        setupDesktopScrollHandlers();
      }

      // Обновляем заголовок, соответствующий первому слайду
      updateTitle();
    };

    // Обновление текста заголовка в соответствии с активным слайдом
    const updateTitle = () => {
      console.log(`Updating title with currentIndex: ${currentIndex}`);

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

    // Прокрутка вверх
    const slideUp = () => {
      if (currentIndex <= 0 || isScrolling) return;

      isScrolling = true;
      currentIndex--;
      console.log(`Slide up, new currentIndex: ${currentIndex}`);

      // Анимируем удаление последнего слайда и добавление нового первого слайда
      const lastVisibleIndex = currentIndex + VISIBLE_SLIDES - 1;

      // Скрываем слайд, который должен исчезнуть
      if (slides[lastVisibleIndex + 1]) {
        slides[lastVisibleIndex + 1].style.opacity = '0';
        setTimeout(() => {
          slides[lastVisibleIndex + 1].style.display = 'none';
          isScrolling = false;
        }, 300);
      } else {
        isScrolling = false;
      }

      // Показываем слайд, который должен появиться
      if (slides[currentIndex]) {
        slides[currentIndex].style.display = 'flex';
        slides[currentIndex].style.opacity = '0';

        setTimeout(() => {
          slides[currentIndex].style.opacity = '1';
        }, 50);
      }

      updateTitle();
    };

    // Прокрутка вниз
    const slideDown = () => {
      // Разрешаем прокрутку до последнего возможного слайда
      if (currentIndex >= totalSlides - 1 || isScrolling) return;

      isScrolling = true;

      // Скрываем текущий слайд
      slides[currentIndex].style.opacity = '0';

      setTimeout(() => {
        slides[currentIndex].style.display = 'none';

        // Увеличиваем индекс только если не на последней карточке
        if (currentIndex < totalSlides - 1) {
          currentIndex++;
        }

        console.log(`Slide down, new currentIndex: ${currentIndex}`);

        // Обновляем заголовок сразу после изменения индекса
        updateTitle();

        // Показываем новый слайд в конце видимой области
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

    // Обработчик события прокрутки колесика мыши
    const handleWheel = e => {
      e.preventDefault();

      // Определяем направление прокрутки
      if (e.deltaY > 0) {
        // Прокрутка вниз
        slideDown();
      } else {
        // Прокрутка вверх
        slideUp();
      }
    };

    // Настраиваем обработчики для десктопа
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

    // Настраиваем обработчики для мобильных устройств
    const setupMobileScrollHandlers = () => {
      // Обработчик события скролла для изменения заголовка
      let scrollTimeout;
      let isManualScrolling = false;

      // Функция для добавления акцента на активную карточку
      const updateActiveCard = () => {
        // Сбрасываем активные классы для всех карточек
        for (let i = 0; i < totalSlides; i++) {
          slides[i].classList.remove('active-slide');
        }

        // Находим текущую видимую (центральную) карточку
        if (currentIndex >= 0 && currentIndex + 1 < totalSlides) {
          // Выделяем центральную карточку (текущий индекс + 1)
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
          const slideHeight = slides[0].offsetHeight + 20; // высота слайда + gap

          // Вычисляем индекс видимого слайда
          let visibleIndex = Math.floor(scrollTop / slideHeight);

          // Проверяем, насколько мы прокрутили до следующего слайда
          const scrollOffset = scrollTop % slideHeight;
          const scrollProgress = scrollOffset / slideHeight;

          // Если прокрутили больше половины слайда, переходим к следующему
          if (
            scrollProgress > 0.5 &&
            visibleIndex < totalSlides - VISIBLE_SLIDES
          ) {
            visibleIndex++;
          }

          if (
            visibleIndex >= 0 &&
            visibleIndex < totalSlides &&
            visibleIndex !== currentIndex
          ) {
            // Обновляем текущий индекс
            currentIndex = visibleIndex;

            // Обновляем активную карточку
            updateActiveCard();

            // Обновляем заголовок
            updateTitle();
            console.log(`Mobile scroll, new currentIndex: ${currentIndex}`);
          }
        }, 100);
      });

      // Инициализация активной карточки
      updateActiveCard();
    };

    // Обработчик изменения размера окна
    const handleResize = () => {
      const wasDesktop = !isMobile;
      isMobile = window.innerWidth <= 768;

      if (wasDesktop !== !isMobile) {
        // Пересоздаем слайдер если изменился тип устройства
        initSlider();
      }
    };

    // Добавляем обработчик изменения размера окна
    window.addEventListener('resize', handleResize);

    // Инициализируем слайдер
    initSlider();
  };

  sliderInit();
});
