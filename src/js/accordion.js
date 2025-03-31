document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion__item');

  accordionItems.forEach(item => {
    const button = item.querySelector('.accordion__item-wrapper');

    button.addEventListener('click', () => {
      const isActive = item.classList.contains('accordion__item--active');

      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('accordion__item--active');
      });

      if (!isActive) {
        item.classList.add('accordion__item--active');
      }
    });
  });
});
