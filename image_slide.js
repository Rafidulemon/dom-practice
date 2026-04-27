// Slice 5 images from a marquee image slider, then show 5 images and add prev, next button

//
(function () {
  const original = document.querySelector(".logo-marquee-container");
  if (!original) return;

  const copy = original.cloneNode(true);
  copy.classList.add("my-slider-copy");

  original.after(copy);

  // Remove duplicate marquee row
  const rows = copy.querySelectorAll(".marquee-content");
  rows.forEach((row, index) => {
    if (index > 0) row.remove();
  });

  const slider = copy.querySelector(".marquee-content");
  const images = [...slider.querySelectorAll("img")];

  let startIndex = 0;
  const visibleCount = 5;

  slider.style.animation = "none";
  slider.style.transform = "none";
  slider.style.display = "flex";
  slider.style.gap = "20px";
  slider.style.justifyContent = "center";
  slider.style.alignItems = "center";

  copy.style.opacity = "1";
  copy.style.transform = "none";
  copy.style.overflow = "hidden";

  images.forEach(img => {
    img.style.display = "block";
    img.style.width = "160px";
    img.style.height = "auto";
    img.style.opacity = "1";
    img.style.visibility = "visible";
  });

  function updateSlider() {
    images.forEach((img, index) => {
      img.style.display =
        index >= startIndex && index < startIndex + visibleCount
          ? "block"
          : "none";
    });
  }
  
  function updateButtons() {
  	prevBtn.disabled = startIndex === 0;
  	nextBtn.disabled = startIndex >= images.length - visibleCount;
	}

  const controls = document.createElement("div");
  controls.className = "slider-controls";

  const prevBtn = document.createElement("button");
  prevBtn.innerHTML = "&lt;";

  const nextBtn = document.createElement("button");
	nextBtn.innerHTML = "&gt;";

  controls.append(prevBtn, nextBtn);
  copy.after(controls);
  
  prevBtn.addEventListener('click', (e)=>{
  	startIndex--;
    if (startIndex < 0) startIndex = images.length - visibleCount;
    updateSlider();
    updateButtons();
  })
  
  nextBtn.addEventListener('click', (e)=>{
  	startIndex++;
    if (startIndex > images.length - visibleCount) startIndex = 0;
    updateSlider();
    updateButtons();
  })

  updateSlider();
  updateButtons();
})();
