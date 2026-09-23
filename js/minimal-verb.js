/* Nihongo-Learn · 极简页主题切换（黑白两系）
 * body 页无需依赖 js/theme-manager.js，独立管理自己的 data-theme 状态。
 */
(function () {
  "use strict";

  var STORAGE_KEY = "nihongo-minimal-theme";

  function current() {
    return document.documentElement.getAttribute("data-theme") || "light";
  }

  function apply(theme) {
    var next = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    var buttons = document.querySelectorAll("[data-theme-btn]");
    buttons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-theme-btn") === next));
    });
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      /* file:// 或隐私模式下忽略 */
    }
  }

  function init() {
    var saved = "light";
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      if (v === "dark" || v === "light") {
        saved = v;
      }
    } catch (e) {
      /* 忽略 */
    }
    apply(saved);

    var buttons = document.querySelectorAll("[data-theme-btn]");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        apply(btn.getAttribute("data-theme-btn"));
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();