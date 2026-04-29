(function () {
  const target = document.querySelector(".KL-D-102");
  if (!target) return;

  const navItems = ["HOME", "SHOP", "PAGES", "CONTACT US"];
  
	let watches = [];
	
	async function fetchWatches() {
	  const menRes = await fetch("https://dummyjson.com/products/category/mens-watches");
	  const womenRes = await fetch("https://dummyjson.com/products/category/womens-watches");
	
	  const menData = await menRes.json();
	  const womenData = await womenRes.json();
	
	  const apiWatches = [...menData.products, ...womenData.products];
	
	  watches = apiWatches.map((watch, index) => ({
	    id: watch.id,
	    name: watch.title,
	    price: watch.price,
	    image: watch.thumbnail,
	    rating: watch.rating,
	    dial: ["Analog", "Digital", "Smart", "Chronograph"][index % 4],
	    handSize: ["30–35", "36–42", "43-50"][index % 3],
	    dialColor: ["Black", "White", "Blue", "Gold", "Silver"][index % 5],
	    strapColor: ["Black", "Brown", "Blue", "Gold", "Silver"][index % 5],
	  }));
	}

  const sliderImages = [
    "https://i.imgur.com/WREAh7d.png",
    "https://i.imgur.com/5CQB4E7.png",
    "https://i.imgur.com/OT2UugP.png",
  ];

  target.innerHTML = "";
  target.classList.add("home-page");

  const header = document.createElement("nav");
  header.classList.add("nav");

  const logo = document.createElement("img");
  logo.classList.add("logo");
  logo.src =
    "https://carriasticapp.vercel.app/_next/image?url=%2Fimages%2Fwhite_logo_slogan.png&w=384&q=75";

  const nav = document.createElement("div");
  nav.classList.add("nav-items");

  navItems.forEach(item => {
    const navItem = document.createElement("div");
    navItem.classList.add("nav-item");
    navItem.textContent = item;
    nav.appendChild(navItem);
  });

  const navRight = document.createElement("div");
  navRight.classList.add("nav-icons");

  ["👤", "👜", "🔍", "US 🇺🇸 ⌄"].forEach(icon => {
    const span = document.createElement("span");
    span.innerHTML = icon;
    navRight.appendChild(span);
  });

  header.append(logo, nav, navRight);

  const hero = document.createElement("section");
  hero.classList.add("hero-section");

  const imageSlider = document.createElement("div");
  imageSlider.classList.add("image-slider");

  const slidesWrapper = document.createElement("div");
  slidesWrapper.classList.add("slides-wrapper");

  sliderImages.forEach((src, index) => {
    const slide = document.createElement("div");
    slide.classList.add("slide");
    if (index === 0) slide.classList.add("active");

    const image = document.createElement("img");
    image.src = src;
    image.alt = `Slider image ${index + 1}`;

    slide.appendChild(image);
    slidesWrapper.appendChild(slide);
  });

  const prevBtn = document.createElement("button");
  prevBtn.classList.add("slider-btn", "prev-btn");
  prevBtn.innerHTML = "‹";

  const nextBtn = document.createElement("button");
  nextBtn.classList.add("slider-btn", "next-btn");
  nextBtn.innerHTML = "›";

  const dots = document.createElement("div");
  dots.classList.add("slider-dots");

  sliderImages.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => showSlide(index));
    dots.appendChild(dot);
  });

  imageSlider.append(slidesWrapper, prevBtn, nextBtn, dots);
  hero.appendChild(imageSlider);

  target.append(header, hero);

  let currentIndex = 0;
  const slides = imageSlider.querySelectorAll(".slide");
  const dotButtons = imageSlider.querySelectorAll(".dot");

  function showSlide(index) {
    slides[currentIndex].classList.remove("active");
    dotButtons[currentIndex].classList.remove("active");

    currentIndex = index;

    slides[currentIndex].classList.add("active");
    dotButtons[currentIndex].classList.add("active");
  }

  prevBtn.addEventListener("click", () => {
    const newIndex =
      currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    showSlide(newIndex);
  });

  nextBtn.addEventListener("click", () => {
    const newIndex =
      currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    showSlide(newIndex);
  });

  setInterval(() => {
    const newIndex =
      currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    showSlide(newIndex);
  }, 4000);
  
  const banner_image = document.createElement("img");
  banner_image.src = "https://i.imgur.com/RAzlYTE.png"
  banner_image.style.width = "100vw"
  banner_image.style.height = "auto"
  
  target.appendChild(banner_image);
  
  
  async function createBestCollection() {
	  await fetchWatches();
	
	  const best_collection = document.createElement("div");
	  best_collection.classList.add("best-collection");
	
	  const best_collection_title = document.createElement("h2");
	  best_collection_title.classList.add("best_collection_title");
	  best_collection_title.textContent = "Best In Store";
	
	  const tabs = document.createElement("div");
	  tabs.classList.add("collection-tabs");
	
	  ["CLASSIC", "MODERN", "SPECIAL EDITION"].forEach((tab, index) => {
	    const tabItem = document.createElement("span");
	    tabItem.textContent = tab;
	    tabItem.classList.add("collection-tab");
	    if (index === 0) tabItem.classList.add("active-tab");
	    tabs.appendChild(tabItem);
	  });
	
	  const productWrapper = document.createElement("div");
	  productWrapper.classList.add("product-wrapper");
	
	  watches.slice(0, 4).forEach(watch => {
	    const card = document.createElement("div");
	    card.classList.add("product-card");
	
	    card.innerHTML = `
	      <div class="product-img-box">
	        <img src="${watch.image}" alt="${watch.name}">
	      </div>
	      <h3>${watch.name}</h3>
	      <p class="product-price">$${watch.price}</p>
	      <div class="stars">★★★★★</div>
	      <button class="cart-btn">ADD TO CART</button>
	    `;
	
	    productWrapper.appendChild(card);
	  });
	
	  best_collection.append(best_collection_title, tabs, productWrapper);
	  target.appendChild(best_collection);
	}

	createBestCollection();
	
	const most_wanted = document.createElement("div");
	most_wanted.classList.add("most_wanted");
	
	const most_wanted_img = document.createElement("img");
	most_wanted_img.src = "https://i.imgur.com/hdVYXsC.png";
	most_wanted_img.style.width = "100vw";
	most_wanted_img.style.height = "auto";
	
	const most_wanted_div = document.createElement("div");
	most_wanted_div.classList.add("most_wanted_div");
	
	const most_wanted_text = document.createElement("h2");
	most_wanted_text.textContent = "Most wanted of the year";
	
	const most_wanted_btn = document.createElement("button");
	most_wanted_btn.textContent = "SHOP NOW";
	
	most_wanted_div.append(most_wanted_text, most_wanted_btn);
	
	most_wanted.append(most_wanted_img, most_wanted_div);
	
	target.appendChild(most_wanted);
})();
