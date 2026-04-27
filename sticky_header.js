(function () {
  const header = document.querySelector("header, .navbar, .nav, .w-nav");
  if (!header) return;

  const navMenu = header.querySelector("nav, .nav-menu, .w-nav-menu");
  if (!navMenu) return;

  header.classList.add("custom-sticky-header");
  navMenu.classList.add("custom-nav-menu");

  const hamburger = document.createElement("button");
  hamburger.className = "custom-hamburger";
  hamburger.innerHTML = "☰";

  header.appendChild(hamburger);

  hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("show-dropdown");
  });

  window.addEventListener("scroll", function () {
    if (window.scrollY > 80) {
      header.classList.add("scrolled");
      navMenu.classList.remove("show-dropdown");
    } else {
      header.classList.remove("scrolled");
      navMenu.classList.remove("show-dropdown");
    }
  });
})();
