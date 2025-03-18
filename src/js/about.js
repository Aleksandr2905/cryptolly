document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.about__buttons button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));

      button.classList.add('active');

      const tabName = button.dataset.tab;

      document.querySelectorAll('.about__img').forEach(img => {
        img.classList.toggle('active', img.dataset.content === tabName);
      });

      document.querySelectorAll('.about__text').forEach(text => {
        text.classList.toggle('active', text.dataset.content === tabName);
      });
    });
  });
});
