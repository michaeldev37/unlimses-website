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

  document.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });

  const header = document.getElementById("site-header");
  const headerInner = document.getElementById("header-inner");
  const logo = document.getElementById("header-logo");

  if (header && headerInner && logo) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        headerInner.classList.remove("py-4");
        headerInner.classList.add("py-2");

        logo.classList.remove("h-10");
        logo.classList.add("h-8");
      } else {
        headerInner.classList.remove("py-2");
        headerInner.classList.add("py-4");

        logo.classList.remove("h-8");
        logo.classList.add("h-10");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", loadIncludes);