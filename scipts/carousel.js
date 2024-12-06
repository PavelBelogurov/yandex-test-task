document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".stages__card-mobile");
  const slider = document.querySelector(".stages__cards-mobile");
  const btnLeft = document.querySelector(".arrow-left-mobile");
  const btnRight = document.querySelector(".arrow-right-mobile");
  const points = document.querySelectorAll(".svg-points-mobile circle");

  let currentIndex = 0;

  const updateSlider = () => {
    const slideWidth = 335;
    const gap = 40;
    slider.style.transform = `translateX(-${currentIndex * (slideWidth + gap)}px)`;

    btnLeft.classList.toggle("disabled", currentIndex === 0);
    btnRight.classList.toggle("disabled", currentIndex === slides.length - 1);

    points.forEach((point, index) => {
      point.setAttribute("fill", index === currentIndex ? "#313131" : "#D9D9D9");
    });
  };

  btnLeft.addEventListener("click", () => {
    if (currentIndex > 0) currentIndex--;
    updateSlider();
  });

  btnRight.addEventListener("click", () => {
    if (currentIndex < slides.length - 1) currentIndex++;
    updateSlider();
  });

  points.forEach((point, index) => {
    point.addEventListener("click", () => {
      currentIndex = index;
      updateSlider();
    });
  });

  const handleResize = () => {
    const mobileContainer = document.querySelector(".stages__mobile-container");
    const cardsContainer = document.querySelector(".stages__cards");

    if (window.innerWidth <= 375) {
      mobileContainer.classList.add("active");
      cardsContainer.classList.add("hidden");
    } else {
      mobileContainer.classList.remove("active");
      cardsContainer.classList.remove("hidden");
    }
  };

  window.addEventListener("resize", handleResize);
  handleResize();

  updateSlider();
});
