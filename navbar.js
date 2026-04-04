// navbar.js
document.addEventListener("DOMContentLoaded", () => {
    const navHTML = `
      <a href="index.html">Home</a>
      <a href="pitchperfect.html">Pitch Perfect Game</a>
    `;

    const topnav = document.querySelector('.topnav');
    topnav.innerHTML = navHTML;
});
