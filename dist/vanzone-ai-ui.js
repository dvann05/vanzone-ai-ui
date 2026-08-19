/*!
 * Vanzone AI UI
 * Production Loader
 * Version 1.0.0
 * MIT License
 */

(function () {
  "use strict";

  var current =
    document.currentScript;

  if (!current || !current.src) {
    return;
  }

  var base =
    current.src.replace(
      /\/dist\/vanzone-ai-ui\.js(?:\?.*)?$/,
      ""
    );

  if (!base) {
    return;
  }

  function load(src) {

    var script =
      document.createElement("script");

    script.src = src;

    script.defer = true;

    document.head.appendChild(
      script
    );

  }

  load(
    base +
    "/js/vanzone-ui.js"
  );

  load(
    base +
    "/js/ai-background.js"
  );

})();
