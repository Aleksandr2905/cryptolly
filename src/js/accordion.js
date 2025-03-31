document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion__item');
  let activeItem = null;

  function closeAccordionItem(item) {
    const content = item.querySelector('.accordion__item-content');
    content.style.maxHeight = content.scrollHeight + 'px';
    content.offsetHeight;
    content.style.maxHeight = '0';

    content.addEventListener('transitionend', function handler() {
      item.classList.remove('accordion__item--active');
      content.removeEventListener('transitionend', handler);
    });
  }

  function openAccordionItem(item) {
    const content = item.querySelector('.accordion__item-content');
    item.classList.add('accordion__item--active');
    content.style.maxHeight = content.scrollHeight + 'px';
  }

  accordionItems.forEach(item => {
    const button = item.querySelector('.accordion__item-wrapper');

    button.addEventListener('click', () => {
      const isActive = item.classList.contains('accordion__item--active');

      if (isActive) {
        closeAccordionItem(item);
        activeItem = null;
      } else {
        if (activeItem) {
          closeAccordionItem(activeItem);
        }
        openAccordionItem(item);
        activeItem = item;
      }
    });
  });
});
