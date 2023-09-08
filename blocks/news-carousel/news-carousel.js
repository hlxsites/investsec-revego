import { createOptimizedPicture } from '../../scripts/lib-franklin.js';
import { jsx } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const response = await fetch('/news/query-index.json?sheet=default&limit=6');
  if (!response.ok) {
    return;
  }
  const records = await response.json();

  const cards = [];
  records.data.forEach((item) => {
    const pic = createOptimizedPicture(item['card-thumbnail'], item['card-title'], true, [{ width: '710' }]);
    pic.querySelector('img').width = '710';
    pic.querySelector('img').height = '485';
    cards.push(jsx`
    <div class="slider-item">
      <div class="slider-image">
        <a href="${item.path}">${pic.outerHTML}</a>
      </div>
      <div class="slider-text">
        <h3><a href="${item.path}">${item['card-title']}</a></h3>
        <p>${item['card-description']}</p>
      </div>
    </div>
`);
  });

  block.innerHTML = jsx`<section class="slider">
    <span class="slider-control prev"><i class="gg-chevron-left-o"></i></span>
    <span class="slider-control next"><i class="gg-chevron-right-o"></i></span>
    <div class="slider-container" data-multislide="false" data-step="sm">
      ${cards.join('')}
    </div>
  </section>
`;

  const slider = block.querySelector('.slider-container');
  const sliderControlPrev = block.querySelector('.slider-control.prev');
  const sliderControlNext = block.querySelector('.slider-control.next');

  let isDragStart = false;
  let isDragging = false;
  let isSlide = false;
  let prevPageX;
  let prevScrollLeft;
  let positionDiff;

  const sliderItem = slider.querySelector('.slider-item');
  const isMultislide = (slider.dataset.multislide === 'true');

  sliderControlPrev.addEventListener('click', () => {
    if (isSlide) return;
    isSlide = true;
    const slideWidth = isMultislide ? slider.clientWidth : sliderItem.clientWidth;
    slider.scrollLeft += -slideWidth;
    setTimeout(() => { isSlide = false; }, 700);
  },
  { passive: true });

  sliderControlNext.addEventListener('click', () => {
    if (isSlide) return;
    isSlide = true;
    const slideWidth = isMultislide ? slider.clientWidth : sliderItem.clientWidth;
    slider.scrollLeft += slideWidth;
    setTimeout(() => { isSlide = false; }, 700);
  },
  { passive: true });

  function autoSlide() {
    if (
      slider.scrollLeft - (slider.scrollWidth - slider.clientWidth) > -1 || slider.scrollLeft <= 0
    ) return;
    positionDiff = Math.abs(positionDiff);
    const slideWidth = isMultislide ? slider.clientWidth : sliderItem.clientWidth;
    const valDifference = slideWidth - positionDiff;
    if (slider.scrollLeft > prevScrollLeft) {
      return;
    }
    slider.scrollLeft -= positionDiff > slideWidth / 5 ? valDifference : -positionDiff;
  }

  function dragStart(e) {
    if (isSlide) return;
    e.preventDefault();
    isSlide = true;
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = slider.scrollLeft;
    setTimeout(() => { isSlide = false; }, 700);
  }

  function dragging(e) {
    e.preventDefault();
    if (!isDragStart) return;
    isDragging = true;
    slider.classList.add('dragging');
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    slider.scrollLeft = prevScrollLeft - positionDiff;
  }

  function dragStop() {
    isSlide = false;
    isDragStart = false;
    slider.classList.remove('dragging');
    if (!isDragging) return;
    isDragging = false;
    autoSlide();
  }

  window.addEventListener('resize', autoSlide, { passive: true});
  slider.addEventListener('mousedown', dragStart, { passive: true});
  slider.addEventListener('touchstart', dragStart, { passive: true});
  slider.addEventListener('mousemove', dragging, { passive: true});
  slider.addEventListener('touchmove', dragging, { passive: true});
  slider.addEventListener('mouseup', dragStop, { passive: true});
  slider.addEventListener('touchend', dragStop, { passive: true});
  slider.addEventListener('mouseleave', dragStop, { passive: true});

  function autoplayStart() {
    setInterval(() => {
      sliderControlNext.click();
      // let slideWidth = isMultislide ? slider.clientWidth : sliderItem.clientWidth;
      // (total(6) - data-step(3))*slideWidth = 3*400 = 1200
      if (slider.scrollLeft === 1200) {
        slider.scrollLeft = 0;
      }
    }, 4000);
  }

  autoplayStart();
}
