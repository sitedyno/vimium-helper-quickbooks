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

    var currentUrl = document.URL.toString();
    var selector = "";
        switch (true) {
            case currentUrl.startsWith("https://qbo.intuit.com/app/bill"):
            case currentUrl.startsWith("https://qbo.intuit.com/app/check"):
            case currentUrl.startsWith("https://qbo.intuit.com/app/creditcardcredit"):
                selector = "#accountsTable > div > table > tbody > tr > td";
                break;
            // quickbooks requires double click and vimium doesn't do double clicks
            // case currentUrl.startsWith("https://qbo.intuit.com/app/chartofaccounts"):
            //   selector = "div#coa-list-main > table > tbody > tr > td:nth-child(3)";
            //   break;
            case currentUrl.startsWith("https://qbo.intuit.com/app/deposit"):
                selector = "#depositTable > div > table > tbody > tr > td";
                break;
            case currentUrl.startsWith("https://qbo.intuit.com/app/register"):
                selector = "div.dgrid-row";
                break;
    }

    if (selector) {
        let elements = document.body.querySelectorAll(selector);

        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
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

