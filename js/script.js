// ===== Accessibility widget =====
(function () {
  var html = document.documentElement;
  var FS_CLASSES = ["a11y-fs-1", "a11y-fs-2", "a11y-fs-3"];
  var store = {
    get: function (k) {
      try { return localStorage.getItem(k); } catch (e) { return null; }
    },
    set: function (k, v) {
      try { localStorage.setItem(k, v); } catch (e) {}
    }
  };

  function applyStored() {
    var fs = store.get("a11y-fs");
    if (fs && FS_CLASSES.indexOf(fs) !== -1) html.classList.add(fs);
    if (store.get("a11y-contrast") === "1") html.classList.add("a11y-contrast");
    if (store.get("a11y-underline") === "1") html.classList.add("a11y-underline");
  }
  applyStored();

  function currentFsIndex() {
    for (var i = 0; i < FS_CLASSES.length; i++) {
      if (html.classList.contains(FS_CLASSES[i])) return i;
    }
    return -1;
  }
  function setFs(index) {
    FS_CLASSES.forEach(function (c) { html.classList.remove(c); });
    if (index >= 0 && index < FS_CLASSES.length) {
      html.classList.add(FS_CLASSES[index]);
      store.set("a11y-fs", FS_CLASSES[index]);
    } else {
      store.set("a11y-fs", "");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".a11y-toggle");
    var panel = document.querySelector(".a11y-panel");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", function () {
      var isOpen = panel.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      if (isOpen) {
        var firstBtn = panel.querySelector("button");
        if (firstBtn) firstBtn.focus();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("open")) {
        panel.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });

    var incBtn = panel.querySelector('[data-a11y="inc"]');
    var decBtn = panel.querySelector('[data-a11y="dec"]');
    var contrastBtn = panel.querySelector('[data-a11y="contrast"]');
    var underlineBtn = panel.querySelector('[data-a11y="underline"]');
    var resetBtn = panel.querySelector('[data-a11y="reset"]');

    if (incBtn) incBtn.addEventListener("click", function () {
      setFs(Math.min(currentFsIndex() + 1, FS_CLASSES.length - 1));
    });
    if (decBtn) decBtn.addEventListener("click", function () {
      setFs(currentFsIndex() - 1);
    });
    if (contrastBtn) contrastBtn.addEventListener("click", function () {
      var on = html.classList.toggle("a11y-contrast");
      store.set("a11y-contrast", on ? "1" : "0");
      contrastBtn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    if (underlineBtn) underlineBtn.addEventListener("click", function () {
      var on = html.classList.toggle("a11y-underline");
      store.set("a11y-underline", on ? "1" : "0");
      underlineBtn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    if (resetBtn) resetBtn.addEventListener("click", function () {
      setFs(-1);
      html.classList.remove("a11y-contrast", "a11y-underline");
      store.set("a11y-contrast", "0");
      store.set("a11y-underline", "0");
    });

    // reflect persisted state on toggle buttons
    if (contrastBtn) contrastBtn.setAttribute("aria-pressed", html.classList.contains("a11y-contrast") ? "true" : "false");
    if (underlineBtn) underlineBtn.setAttribute("aria-pressed", html.classList.contains("a11y-underline") ? "true" : "false");
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  var btn = document.querySelector(".hamburger");
  var menu = document.querySelector(".mobile-menu");
  if (btn && menu) {
    btn.addEventListener("click", function () {
      menu.classList.toggle("open");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { menu.classList.remove("open"); });
    });
  }

  // Active service nav highlight
  var navLinks = document.querySelectorAll(".service-nav a");
  var blocks = document.querySelectorAll(".service-block");
  if (navLinks.length && blocks.length && "IntersectionObserver" in window) {
    var map = {};
    navLinks.forEach(function (l) { map[l.getAttribute("href")] = l; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = "#" + entry.target.id;
        if (entry.isIntersecting && map[id]) {
          navLinks.forEach(function (l) { l.style.background = ""; l.style.color = ""; });
          map[id].style.background = "#0f9c99";
          map[id].style.color = "#fff";
        }
      });
    }, { rootMargin: "-40% 0px -50% 0px" });
    blocks.forEach(function (b) { obs.observe(b); });
  }
});
