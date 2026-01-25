// ============================================
// SCRIPT.JS - UNLIMSES
// Fichier JavaScript unifié et debuggé
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  loadIncludes();
});

/* =========================
   LOAD HEADER & FOOTER
========================= */
async function loadIncludes() {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  if (!header && !footer) {
    console.warn("Aucun élément header ou footer trouvé");
    return;
  }

  const tasks = [];

  if (header) {
    tasks.push(
      fetch("includes/header.html")
        .then(r => {
          if (!r.ok) throw new Error(`Erreur HTTP: ${r.status}`);
          return r.text();
        })
        .then(html => {
          header.innerHTML = html;
          console.log("✅ Header chargé");
        })
        .catch(err => {
          console.error("❌ Erreur chargement header:", err);
        })
    );
  }

  if (footer) {
    tasks.push(
      fetch("includes/footer.html")
        .then(r => {
          if (!r.ok) throw new Error(`Erreur HTTP: ${r.status}`);
          return r.text();
        })
        .then(html => {
          footer.innerHTML = html;
          console.log("✅ Footer chargé");
        })
        .catch(err => {
          console.error("❌ Erreur chargement footer:", err);
        })
    );
  }

  // Attendre que tout soit chargé
  await Promise.all(tasks);

  // IMPORTANT : Initialiser dans le bon ordre APRÈS le chargement
  // Petit délai pour s'assurer que le DOM est bien mis à jour
  setTimeout(() => {
    initHeader();
    initLucideIcons();
    initContactForm();
  }, 50);
}

/* =========================
   HEADER - Navigation & Menu
========================= */
function initHeader() {
  const burgerBtn = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const burgerIcon = document.querySelector('.burger-icon');
  const header = document.getElementById('site-header');
  const headerLogo = document.getElementById('header-logo');

  // Vérification : si pas de header chargé, arrêter
  if (!header) {
    console.warn("Header non trouvé - init annulée");
    return;
  }

  // ============================================
  // MENU MOBILE - Toggle
  // ============================================
  if (burgerBtn && mobileMenu && burgerIcon) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      
      if (isOpen) {
        // Fermer
        mobileMenu.classList.remove('open');
        burgerIcon.classList.remove('open');
        burgerBtn.setAttribute('aria-expanded', 'false');
        burgerBtn.setAttribute('aria-label', 'Ouvrir le menu');
      } else {
        // Ouvrir
        mobileMenu.classList.add('open');
        burgerIcon.classList.add('open');
        burgerBtn.setAttribute('aria-expanded', 'true');
        burgerBtn.setAttribute('aria-label', 'Fermer le menu');
      }
    });
    console.log("✅ Menu burger initialisé");
  }

  // ============================================
  // MENU MOBILE - Fermeture au clic sur un lien
  // ============================================
  const mobileLinks = document.querySelectorAll('.mobile-link');
  if (mobileLinks.length > 0) {
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenu && burgerIcon && burgerBtn) {
          mobileMenu.classList.remove('open');
          burgerIcon.classList.remove('open');
          burgerBtn.setAttribute('aria-expanded', 'false');
          burgerBtn.setAttribute('aria-label', 'Ouvrir le menu');
        }
      });
    });
    console.log(`✅ ${mobileLinks.length} liens mobiles initialisés`);
  }

  // ============================================
  // MENU MOBILE - Fermeture au clic extérieur
  // ============================================
  document.addEventListener('click', (e) => {
    if (header && mobileMenu && !header.contains(e.target) && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      if (burgerIcon) burgerIcon.classList.remove('open');
      if (burgerBtn) {
        burgerBtn.setAttribute('aria-expanded', 'false');
        burgerBtn.setAttribute('aria-label', 'Ouvrir le menu');
      }
    }
  });

  // ============================================
  // EFFET SCROLL - Réduction du header
  // ============================================
  if (header && headerLogo) {
    const onScroll = () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.classList.add('shadow-lg');
        headerLogo.classList.add('h-8');
        headerLogo.classList.remove('h-10');
      } else {
        header.classList.remove('shadow-lg');
        headerLogo.classList.remove('h-8');
        headerLogo.classList.add('h-10');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Appel initial
    console.log("✅ Effet scroll initialisé");
  }

  // ============================================
  // PAGE ACTIVE - Mise en évidence
  // ============================================
  setActivePage();

  // ============================================
  // FERMETURE MENU au toucher ESC
  // ============================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      if (burgerIcon) burgerIcon.classList.remove('open');
      if (burgerBtn) {
        burgerBtn.setAttribute('aria-expanded', 'false');
        burgerBtn.setAttribute('aria-label', 'Ouvrir le menu');
        burgerBtn.focus(); // Retour du focus au bouton
      }
    }
  });

  console.log("✅ Header initialisé complètement");
}

/* =========================
   PAGE ACTIVE - Navigation
========================= */
function setActivePage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('[data-page]');
  
  if (navLinks.length === 0) {
    console.warn("Aucun lien de navigation trouvé");
    return;
  }

  let activeCount = 0;
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('data-page') + '.html';
    
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('text-blue-600', 'font-semibold');
      link.setAttribute('aria-current', 'page');
      activeCount++;
    }
  });

  console.log(`✅ Page active: ${currentPage} (${activeCount} liens marqués)`);
}

/* =========================
   LUCIDE ICONS
========================= */
function initLucideIcons() {
  // Vérifier que Lucide est chargé
  if (typeof lucide === 'undefined') {
    console.warn("⚠️ Lucide n'est pas chargé");
    return;
  }

  // Vérifier qu'il y a des icônes à initialiser
  const icons = document.querySelectorAll("[data-lucide]");
  if (icons.length === 0) {
    console.log("ℹ️ Aucune icône Lucide sur cette page");
    return;
  }

  try {
    lucide.createIcons();
    console.log(`✅ ${icons.length} icônes Lucide initialisées`);
  } catch (error) {
    console.error("❌ Erreur initialisation Lucide:", error);
  }
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) {
    console.log("Pas de formulaire de contact sur cette page");
    return;
  }

  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const privacy = document.getElementById("privacy");
  const submit = document.getElementById("submit-btn");

  if (!email || !phone || !privacy || !submit) {
    console.error("Éléments du formulaire manquants");
    return;
  }

  // Désactiver le bouton par défaut
  submit.disabled = true;

  // Activer/désactiver selon la checkbox
  privacy.addEventListener("change", () => {
    submit.disabled = !privacy.checked;
  });

  // Validation à la soumission
  form.addEventListener("submit", (e) => {
    if (!privacy.checked) {
      e.preventDefault();
      alert("Veuillez accepter les conditions de protection des données.");
      return;
    }

    if (!email.value.trim() || !phone.value.trim()) {
      e.preventDefault();
      alert("Veuillez renseigner un email et un numéro.");
      return;
    }

    console.log("Formulaire soumis avec succès");
    setTimeout(() => {
      form.reset();
      submit.disabled = true;
    }, 800);
  });

  console.log("Formulaire de contact initialisé");
}