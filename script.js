/* global console, chrome */

(function () {
  "use strict";

  let observer = new MutationObserver(function (mutations) {
    labelClickables();
  });

  let config = { childList: true, subtree: true };

  let lastCallTime = null;
  let callInterval = 500; // half a second?
  let elapsed = 0;

  function labelClickables() {
    let callTime = new Date().getTime();
    if (lastCallTime === null) {
      lastCallTime = callTime;
    }

    elapsed = callTime - lastCallTime;
    if (elapsed > 0 && elapsed < callInterval) {
      return; // rate limit
    }

      "button",
      "textarea",
      "input",
      "select",
      "details",
      "button",
    ];
    let roles = [
      "button",
      "tab",
      "link",
      "checkbox",
      "menuitem",
      "menuitemcheckbox",
      "menuitemradio",
    ];
    let selector =
      ":not(" +
      tags.join("):not(") +
      '):not([role="' +
      roles.join('"]):not([role="') +
      '"]):not([onclick]):not([jsaction])';
    let elements = document.body.querySelectorAll(selector);

    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      if (
        element.style.cursor === "pointer" ||
        (element.className !== "" &&
          element.computedStyleMap().get("cursor").value === "pointer" &&
          element.parentElement.computedStyleMap().get("cursor").value !==
            "pointer")
      ) {
        element.setAttribute("role", "button");
      }
      lastCallTime = new Date().getTime();
    }
  }

  function run() {
    labelClickables();
    observer.observe(document.body, config);
  }

  run();

  document.addEventListener("page:load", run);
  document.addEventListener("ready", run);
  document.addEventListener("turbolinks:load", run);
})();
