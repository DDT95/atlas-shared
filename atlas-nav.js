/*!
 * Atlas territorial 95 — barre de navigation partagée
 * Un seul fichier à inclure sur chaque site pour retrouver la même
 * ergonomie de navigation dans les 23 cartes de l'atlas.
 * Usage : <script src="https://ddt95.github.io/atlas-shared/atlas-nav.js" data-atlas-current="eau95"></script>
 */
(function () {
  var ATLAS_HOME = "https://ddt95.github.io/atlas-territorial-95/";

  var THEMES = [
    { slug: "portail-communal95", title: "Portail communal" },
    { slug: "urbanisme95", title: "Urbanisme à la parcelle" },
    { slug: "artificialisation-zan95", title: "Artificialisation & ZAN" },
    { slug: "agriculture95", title: "Agriculture" },
    { slug: "eau95", title: "Eau" },
    { slug: "observatoire_risques_95", title: "Risques majeurs" },
    { slug: "observatoire_bati", title: "Logement & habitat (observatoire)" },
    { slug: "biodiversite95", title: "Biodiversité" },
    { slug: "transport95", title: "Mobilités & transports" },
    { slug: "transition-energetique95", title: "Transition énergétique" },
    { slug: "val-doise-domicile-travail", title: "Domicile-travail" },
    { slug: "val-doise-sol-formes-urbaines", title: "Sol & formes urbaines" },
    { slug: "val-doise-nature-adaptation", title: "Nature & adaptation" },
    { slug: "val-doise-logement-habitat", title: "Logement & habitat" },
    { slug: "val-doise-securite", title: "Sécurité" },
    { slug: "bus-trains-95", title: "Bus & trains" },
    { slug: "acces-services95", title: "Accès aux services" },
    { slug: "chaleur-refuges-95", title: "Chaleur & refuges" },
    { slug: "val-doise-nuisances", title: "Nuisances" },
    { slug: "projets-transformations-95", title: "Projets & transformations" },
    { slug: "inspiration-valdoise-95", title: "Inspiration val-d’oisienne" },
  ];

  var CURRENT_SLUG = (function () {
    var script = document.currentScript;
    var fromAttr = script && script.getAttribute("data-atlas-current");
    if (fromAttr) return fromAttr;
    var path = window.location.pathname.replace(/\/$/, "").split("/");
    return path[path.length - 1] || "";
  })();

  function buildNav() {
    var slug = CURRENT_SLUG;
    var nav = document.createElement("nav");
    nav.className = "atlas-nav";
    nav.setAttribute("aria-label", "Navigation dans l'atlas territorial");

    var home = document.createElement("a");
    home.className = "atlas-nav-home";
    home.href = ATLAS_HOME;
    home.innerHTML = "<span aria-hidden=\"true\">←</span> Atlas territorial";
    nav.appendChild(home);

    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "atlas-nav-toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-haspopup", "true");
    var current = THEMES.find(function (t) { return t.slug === slug; });
    toggle.innerHTML =
      "<span class=\"atlas-nav-current\">" +
      (current ? current.title : "Explorer l'atlas") +
      "</span><span class=\"atlas-nav-caret\" aria-hidden=\"true\">▾</span>";
    nav.appendChild(toggle);

    var menu = document.createElement("div");
    menu.className = "atlas-nav-menu";
    menu.setAttribute("role", "menu");
    THEMES.forEach(function (theme) {
      var a = document.createElement("a");
      a.href = "https://ddt95.github.io/" + theme.slug + "/";
      a.textContent = theme.title;
      a.setAttribute("role", "menuitem");
      if (theme.slug === slug) {
        a.className = "is-current";
        a.setAttribute("aria-current", "page");
      }
      menu.appendChild(a);
    });
    nav.appendChild(menu);

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target)) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    return nav;
  }

  function mount() {
    document.body.classList.add("has-atlas-nav");
    document.body.insertBefore(buildNav(), document.body.firstChild);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
