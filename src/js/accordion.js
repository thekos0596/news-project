const accordionEl = document.getElementsByClassName('accordion__active');

export function initAccordion() {
  const accordionEl = document.querySelectorAll('.accordion__wrap');

  accordionEl.forEach(el => {
    const activeEl = el.querySelector('.accordion__active');

    activeEl.addEventListener('click', () => {
      el.classList.toggle('active');
    });
  });
}

initAccordion();