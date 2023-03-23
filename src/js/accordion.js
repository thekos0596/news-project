const accordionEl = document.getElementsByClassName('accordion__wrap');

export function initAccordion(){
  // for (let i = 0; i < accordionEl.length; i++) {
  //   accordionEl[i].addEventListener('click', function () {
  //     this.classList.toggle('active');
  //     const icon = this.querySelector('use');
  //     if (icon.getAttribute('href') === './images/icon_accord.svg#icon-accord_down') {
  //       icon.setAttribute('href', './images/icon_accord.svg#icon-accord_up');
  //     } else {
  //       icon.setAttribute('href', './images/icon_accord.svg#icon-accord_down');
  //     }
  //   });
  // }
//   for (let i=0; i<accordionEl.length; i++) {
//     accordionEl[i].addEventListener('click', function () {
//       this.classList.toggle('active')

//       const icon = this.querySelector('.accordion__active use');
//       const isExpanded = icon.getAttribute('href').includes('icon-accord_up');
//       if (isExpanded) {
//         icon.setAttribute('href', './images/icon_accord.svg#icon-accord_down');
//       } else {
//         icon.setAttribute('href', './images/icon_accord.svg#icon-accord_up');
//       }
//     })
//   }
// }
    for (let i=0; i<accordionEl.length; i++) {
      accordionEl[i].addEventListener('click', function () {
        this.classList.toggle('active')
      })
    }
  }


    // for (let i = 0; i < accordionEl.length; i++) {
    //   accordionEl[i].addEventListener('click', function () {
    //     this.classList.toggle('active');
    //     const icon = this.querySelector('.accordion__active use');
    //     const isExpanded = this.classList.contains('active');
    //     if (isExpanded) {
    //       icon.setAttribute('href', './images/icon_accord.svg#icon-accord_up');
    //     } else {
    //       icon.setAttribute('href', './images/icon_accord.svg#icon-accord_down');
    //     }
    //   });
    // }
  // }

initAccordion();