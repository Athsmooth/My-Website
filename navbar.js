// navbar.js
document.addEventListener("DOMContentLoaded", () => {
    const navHTML = `
      <div class="nav-content">
        <img src="assets/logo3.png" class="nav-logo" alt="Logo">
        <div class="nav-links">
          <a href="index.html">Home</a>
          <a href="pitchperfect.html">Pitch Perfect Game</a>
        </div>
      </div>
    `;

    const topnav = document.querySelector('.topnav');
    topnav.innerHTML = navHTML;
});

let lastScrollY = window.scrollY;
const nav = document.querySelector(".topnav");

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling DOWN - Hide the nav
        nav.classList.add("nav-hidden");
    } else {
        // Scrolling UP - Show the nav
        nav.classList.remove("nav-hidden");
    }

    lastScrollY = currentScrollY;
});