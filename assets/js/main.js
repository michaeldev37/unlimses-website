
async function loadIncludes() {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  if (header) {
    header.innerHTML = await fetch("includes/header.html").then(r => r.text());
  }

  if (footer) {
    footer.innerHTML = await fetch("includes/footer.html").then(r => r.text());
  }

  setTimeout(initUI, 50);
}

function initUI() {

  if (window.lucide) {
    lucide.createIcons();
  }

  const burger = document.getElementById("burger-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
}

document.addEventListener("DOMContentLoaded", loadIncludes);