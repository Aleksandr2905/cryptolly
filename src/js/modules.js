document.addEventListener('DOMContentLoaded', () => {
  const moduleItems = document.querySelectorAll('.modules__item');

  moduleItems.forEach(item => {
    const header = item.querySelector('.modules__item-header');
    const description = item.querySelector('.modules__item-description');
    const btns = item.querySelectorAll('.modules__item-btn');
    const descriptionWrapper = item.querySelector(
      '.modules__item-description-wrapper'
    );
    const descriptionText = item.querySelector(
      '.modules__item-description-btn'
    );
    const closeBtn = item.querySelector('.modules__item-btn-close');
    let activeBtn = null;

    header.addEventListener('click', () => {
      const isOpen = description.classList.contains('is-open');

      if (isOpen) {
        description.classList.remove('is-open');
        item.classList.remove('modules__item--active');
      } else {
        description.classList.add('is-open');
        item.classList.add('modules__item--active');
      }
    });

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (activeBtn) {
          activeBtn.classList.remove('is-active');
        }

        btn.classList.add('is-active');
        activeBtn = btn;

        const btnDescription = btn.getAttribute('data-description');
        if (descriptionText) {
          descriptionText.textContent = btnDescription;
        }
        descriptionWrapper.classList.add('is-open');
      });
    });

    closeBtn.addEventListener('click', () => {
      descriptionWrapper.classList.remove('is-open');
      if (activeBtn) {
        activeBtn.classList.remove('is-active');
        activeBtn = null;
      }
    });
  });
});
