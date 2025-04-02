(() => {
  const refs = {
    openModalBtn: document.querySelectorAll('[data-mobile-open]'),
    closeModalBtn: document.querySelectorAll('[data-mobile-close]'),
    modal: document.querySelector('[data-mobile]'),
    backdrop: document.querySelector('[data-mobile-backdrop]'),
    body: document.body,
    modalItems: document.querySelectorAll('.mobile-menu__nav-item'),
    btnItems: document.querySelectorAll('.mobile-menu__buttons > *'),
  };

  refs.openModalBtn.forEach(btn => {
    btn.addEventListener('click', toggleModal);
  });

  refs.closeModalBtn.forEach(btn => {
    btn.addEventListener('click', toggleModal);
  });

  refs.backdrop?.addEventListener('click', toggleModal);

  function toggleModal() {
    const isMenuHidden = refs.modal.classList.contains(
      'mobile-menu__is-hidden'
    );
    refs.modal.classList.toggle('mobile-menu__is-hidden');
    refs.backdrop?.classList.toggle('mobile-menu__is-hidden');

    if (isMenuHidden) {
      disableScroll();
    } else {
      enableScroll();
    }
  }

  function disableScroll() {
    refs.body.style.overflow = 'hidden';
  }

  function enableScroll() {
    refs.body.style.overflow = '';
  }
})();
