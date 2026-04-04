// navbar.js
document.addEventListener("DOMContentLoaded", () => {
    const navHTML = `
      <a href="index.html">Home</a>
      <a href="pitchperfect.html">Pitch Perfect Game</a>
    `;

    const topnav = document.querySelector('.topnav');
    
    if (topnav) {
        topnav.innerHTML = navHTML;

        // Auto-highlight the active link
        const currentPath = window.location.pathname.split("/").pop() || "index.html";
        document.querySelectorAll('.topnav a').forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    } else {
        console.error("Could not find the .topnav div!");
    }
});
