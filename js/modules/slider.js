import {pad} from '../services/services';

function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
  function initSlidesCarusel() {
    const slides = document.querySelectorAll(slide);
    const nextButton = document.querySelector(nextArrow);
    const prevButton = document.querySelector(prevArrow);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesInner = document.querySelector(field);
    const total = document.getElementById(totalCounter);
    const width = window.getComputedStyle(slidesWrapper).width;
    const current = document.querySelector(currentCounter);
    const slider = document.querySelector(container);

    total.textContent = pad(slides.length, 2);

    slidesInner.style.width = 100 * slides.length + '%';
    slidesInner.style.display = 'flex';
    slidesInner.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
      slide.style.width = width;
  });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    const dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.classList.add('dot');
      dot.setAttribute('data-slide-to', i + 1);
      indicators.append(dot);
      dots.push(dot);
    }

    let currentSlideIndex = 1;
    let offset = 0;

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const slideTo = +e.target.getAttribute('data-slide-to');
    showSlide(slideTo);
  })
  });

    nextButton.addEventListener('click', (event) => {
      if (currentSlideIndex === slides.length) {
      currentSlideIndex = 1;
    } else {
      currentSlideIndex += 1;
    }
    showSlide(currentSlideIndex);
  });

    prevButton.addEventListener('click', (event) => {
      if (currentSlideIndex === 1) {
      currentSlideIndex = slides.length;
    } else {
      currentSlideIndex -= 1;
    }
    showSlide(currentSlideIndex);
  });

    showSlide(currentSlideIndex);


    function showSlide(slideToShow) {
      currentSlideIndex = +slideToShow;
      // offset = +width.slice(0, width.length - 2) * (currentSlideIndex - 1);
      offset = deleteNotDigits(width) * (currentSlideIndex - 1);
      current.textContent = pad(currentSlideIndex, 2);
      slidesInner.style.transform = `translateX(${-offset}px)`;
      dots.forEach(dot => {
        dot.style.opacity = '.5';
    });
      dots[currentSlideIndex - 1].style.opacity = 1;
    }

    function deleteNotDigits(str) {
      return +str.replace(/\D/g, '');
    }
  }

  initSlidesCarusel();


}

export default slider;