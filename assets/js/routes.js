document.addEventListener("DOMContentLoaded", () => {
  const routes = {
    "/": "about",
    "/about": "about",
    "/profile": "profile",
    "/courses": "courses",
    "/portfolio": "portfolio",
    "/contact": "contact",
  };

  const mainSections = document.querySelectorAll("main article[data-page]");
  const navLinks = document.querySelectorAll("[data-nav-link]");

  function showPage(pageName) {
    mainSections.forEach((section) => {
      section.classList.toggle("active", section.dataset.page === pageName);
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.target === pageName);
    });
  }

  function navigate(path, push = true) {
    const pageName = routes[path] || "about";
    if (push) history.pushState({ path }, "", path);
    showPage(pageName);
  }

  // Handle nav clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetPage = link.dataset.target;
      const path =
        Object.keys(routes).find((key) => routes[key] === targetPage) || "/";
      navigate(path);
    });
  });

  // Handle browser back/forward
  window.addEventListener("popstate", () => {
    navigate(window.location.pathname, false);
  });

  // Initial load
  navigate(window.location.pathname, false);
});
