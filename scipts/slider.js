const sliderWrapper = document.querySelector(".members__wrapper");
const slides = document.querySelectorAll(".members__slide");
const prevButton = document.querySelector(".slider-prev");
const nextButton = document.querySelector(".slider-next");
const counter = document.querySelector(".members__counter span:first-child");

let currentIndex = 3;
let slideWidth;
let gap = 20;
let totalSlideWidth;
let isAnimating = false;
let autoSlideInterval;

function updateDimensions() {
  slideWidth = slides[0].offsetWidth;
  totalSlideWidth = slideWidth + gap;

  sliderWrapper.style.transition = "none";
  sliderWrapper.style.transform = `translateX(-${totalSlideWidth * currentIndex}px)`;
}

function cloneSlides() {
  const wrapper = sliderWrapper;

  const startClones = Array.from(slides)
    .slice(-3)
    .map((slide) => slide.cloneNode(true));
  startClones.forEach((clone) => wrapper.prepend(clone));

  const endClones = Array.from(slides)
    .slice(0, 3)
    .map((slide) => slide.cloneNode(true));
  endClones.forEach((clone) => wrapper.appendChild(clone));

  updateDimensions();
}

function updateCounter() {
  const visibleIndex = ((currentIndex - 3 + slides.length) % slides.length) + 1;
  counter.textContent = visibleIndex;
}

function slideTo(index) {
  if (isAnimating) return;
  isAnimating = true;

  sliderWrapper.style.transition = "transform 0.3s ease-in-out";
  sliderWrapper.style.transform = `translateX(-${totalSlideWidth * index}px)`;

  sliderWrapper.addEventListener(
    "transitionend",
    () => {
      isAnimating = false;

      if (index >= slides.length + 3) {
        currentIndex = 3;
        sliderWrapper.style.transition = "none";
        sliderWrapper.style.transform = `translateX(-${totalSlideWidth * currentIndex}px)`;
      } else if (index < 3) {
        currentIndex = slides.length + 2;
        sliderWrapper.style.transition = "none";
        sliderWrapper.style.transform = `translateX(-${totalSlideWidth * currentIndex}px)`;
      }

      updateCounter();
    },
    { once: true }
  );
}

function nextSlide() {
  if (isAnimating) return;
  currentIndex += 1;
  slideTo(currentIndex);
  resetAutoSlide();
}

function prevSlide() {
  if (isAnimating) return;
  currentIndex -= 1;
  slideTo(currentIndex);
  resetAutoSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 4000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

window.addEventListener("resize", () => {
  updateDimensions();
});

prevButton.addEventListener("click", () => {
  prevSlide();
});
nextButton.addEventListener("click", () => {
  nextSlide();
});

cloneSlides();
startAutoSlide();
updateCounter();
updateDimensions();
