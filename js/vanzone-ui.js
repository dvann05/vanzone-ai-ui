/* =========================================================
   VANZONE AI UI
   INTERACTION ENGINE
   Version: 1.0.0
   ========================================================= */

(() => {
  "use strict";


  /* =======================================================
     CONFIG
     ======================================================= */

  const CONFIG = {
    revealThreshold: 0.12,
    navbarScroll: 24,
    spotlightThrottle: 16,
    magneticStrength: 0.18
  };


  /* =======================================================
     REDUCED MOTION
     ======================================================= */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  /* =======================================================
     DOM READY
     ======================================================= */

  const ready = (callback) => {

    if (document.readyState !== "loading") {
      callback();
      return;
    }

    document.addEventListener(
      "DOMContentLoaded",
      callback
    );

  };


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  const initReveal = () => {

    const elements =
      document.querySelectorAll(
        ".vz-reveal-on-scroll"
      );

    if (!elements.length) return;


    if (prefersReducedMotion) {

      elements.forEach((element) => {
        element.classList.add("is-visible");
      });

      return;
    }


    if (!("IntersectionObserver" in window)) {

      elements.forEach((element) => {
        element.classList.add("is-visible");
      });

      return;
    }


    const observer =
      new IntersectionObserver(
        (entries, obs) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            obs.unobserve(entry.target);

          });

        },
        {
          threshold:
            CONFIG.revealThreshold,

          rootMargin:
            "0px 0px -40px 0px"
        }
      );


    elements.forEach((element) => {
      observer.observe(element);
    });

  };


  /* =======================================================
     NAVBAR
     ======================================================= */

  const initNavbar = () => {

    const navbars =
      document.querySelectorAll(
        ".vz-navbar"
      );

    if (!navbars.length) return;


    const updateNavbar = () => {

      const scrolled =
        window.scrollY >
        CONFIG.navbarScroll;


      navbars.forEach((navbar) => {

        navbar.classList.toggle(
          "is-scrolled",
          scrolled
        );

      });

    };


    updateNavbar();


    window.addEventListener(
      "scroll",
      updateNavbar,
      {
        passive: true
      }
    );

  };


  /* =======================================================
     MOUSE SPOTLIGHT
     ======================================================= */

  const initSpotlight = () => {

    if (prefersReducedMotion) return;


    const elements =
      document.querySelectorAll(
        ".vz-spotlight"
      );

    if (!elements.length) return;


    elements.forEach((element) => {

      let ticking = false;


      element.addEventListener(
        "pointermove",
        (event) => {

          if (ticking) return;

          ticking = true;


          requestAnimationFrame(() => {

            const rect =
              element.getBoundingClientRect();


            const x =
              event.clientX -
              rect.left;


            const y =
              event.clientY -
              rect.top;


            element.style.setProperty(
              "--vz-mouse-x",
              `${x}px`
            );


            element.style.setProperty(
              "--vz-mouse-y",
              `${y}px`
            );


            ticking = false;

          });

        },
        {
          passive: true
        }
      );


      element.addEventListener(
        "pointerleave",
        () => {

          element.style.setProperty(
            "--vz-mouse-x",
            "50%"
          );

          element.style.setProperty(
            "--vz-mouse-y",
            "50%"
          );

        }
      );

    });

  };


  /* =======================================================
     MAGNETIC BUTTONS
     ======================================================= */

  const initMagneticButtons = () => {

    if (prefersReducedMotion) return;


    const buttons =
      document.querySelectorAll(
        "[data-vz-magnetic]"
      );


    buttons.forEach((button) => {

      button.addEventListener(
        "pointermove",
        (event) => {

          const rect =
            button.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left -
            rect.width / 2;


          const y =
            event.clientY -
            rect.top -
            rect.height / 2;


          const strength =
            CONFIG.magneticStrength;


          button.style.transform =
            `translate(
              ${x * strength}px,
              ${y * strength}px
            )`;

        }
      );


      button.addEventListener(
        "pointerleave",
        () => {

          button.style.transform =
            "";

        }
      );

    });

  };


  /* =======================================================
     TILT CARDS
     ======================================================= */

  const initTilt = () => {

    if (prefersReducedMotion) return;


    const cards =
      document.querySelectorAll(
        "[data-vz-tilt]"
      );


    cards.forEach((card) => {

      card.addEventListener(
        "pointermove",
        (event) => {

          const rect =
            card.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left;


          const y =
            event.clientY -
            rect.top;


          const centerX =
            rect.width / 2;


          const centerY =
            rect.height / 2;


          const rotateX =
            ((y - centerY) /
              centerY) * -4;


          const rotateY =
            ((x - centerX) /
              centerX) * 4;


          card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-6px)`;

        }
      );


      card.addEventListener(
        "pointerleave",
        () => {

          card.style.transform =
            "";

        }
      );

    });

  };


  /* =======================================================
     SMOOTH ANCHOR
     ======================================================= */

  const initSmoothAnchors = () => {

    if (prefersReducedMotion) return;


    document.addEventListener(
      "click",
      (event) => {

        const link =
          event.target.closest(
            'a[href^="#"]'
          );


        if (!link) return;


        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(
            targetId
          );


        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });


        history.pushState(
          null,
          "",
          targetId
        );

      }
    );

  };


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  const initMobileMenu = () => {

    const toggles =
      document.querySelectorAll(
        "[data-vz-menu-toggle]"
      );


    toggles.forEach((toggle) => {

      const targetSelector =
        toggle.getAttribute(
          "data-vz-menu-toggle"
        );


      const menu =
        document.querySelector(
          targetSelector
        );


      if (!menu) return;


      toggle.addEventListener(
        "click",
        () => {

          const opened =
            menu.classList.toggle(
              "is-open"
            );


          toggle.setAttribute(
            "aria-expanded",
            String(opened)
          );


          document.body.classList.toggle(
            "vz-menu-open",
            opened
          );

        }
      );


      menu
        .querySelectorAll("a")
        .forEach((link) => {

          link.addEventListener(
            "click",
            () => {

              menu.classList.remove(
                "is-open"
              );

              toggle.setAttribute(
                "aria-expanded",
                "false"
              );

              document.body.classList.remove(
                "vz-menu-open"
              );

            }
          );

        });

    });

  };


  /* =======================================================
     THEME SYSTEM
     ======================================================= */

  const initTheme = () => {

    const buttons =
      document.querySelectorAll(
        "[data-vz-theme-toggle]"
      );


    const root =
      document.documentElement;


    const storageKey =
      "vanzone-theme";


    const applyTheme = (theme) => {

      if (theme === "light") {

        root.setAttribute(
          "data-vz-theme",
          "light"
        );

      } else {

        root.removeAttribute(
          "data-vz-theme"
        );

      }

    };


    const saved =
      localStorage.getItem(
        storageKey
      );


    if (saved) {
      applyTheme(saved);
    }


    buttons.forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const current =
            root.getAttribute(
              "data-vz-theme"
            );


          const next =
            current === "light"
              ? "dark"
              : "light";


          applyTheme(next);


          localStorage.setItem(
            storageKey,
            next
          );


          button.setAttribute(
            "aria-label",
            next === "light"
              ? "Switch to dark mode"
              : "Switch to light mode"
          );

        }
      );

    });

  };


  /* =======================================================
     COPY CODE
     ======================================================= */

  const initCopyCode = () => {

    const blocks =
      document.querySelectorAll(
        "pre[data-copy]"
      );


    blocks.forEach((block) => {

      const button =
        block.querySelector(
          "[data-copy-button]"
        );


      if (!button) return;


      button.addEventListener(
        "click",
        async () => {

          const code =
            block.querySelector(
              "code"
            );


          if (!code) return;


          try {

            await navigator.clipboard.writeText(
              code.innerText
            );


            const original =
              button.textContent;


            button.textContent =
              "Copied!";


            setTimeout(() => {

              button.textContent =
                original;

            }, 1600);


          } catch (error) {

            console.warn(
              "Vanzone UI: clipboard unavailable.",
              error
            );

          }

        }
      );

    });

  };


  /* =======================================================
     READING PROGRESS
     ======================================================= */

  const initReadingProgress = () => {

    const bar =
      document.querySelector(
        "[data-vz-reading-progress]"
      );


    if (!bar) return;


    const article =
      document.querySelector(
        ".vz-article-body"
      );


    if (!article) return;


    const update = () => {

      const rect =
        article.getBoundingClientRect();


      const articleTop =
        window.scrollY +
        rect.top;


      const articleHeight =
        article.offsetHeight;


      const current =
        window.scrollY -
        articleTop;


      const available =
        articleHeight -
        window.innerHeight;


      const progress =
        available > 0
          ? Math.min(
              Math.max(
                current / available,
                0
              ),
              1
            )
          : 0;


      bar.style.transform =
        `scaleX(${progress})`;

    };


    update();


    window.addEventListener(
      "scroll",
      update,
      {
        passive: true
      }
    );

  };

   /* =======================================================
   TABS
   ======================================================= */

const initTabs = () => {

  document
    .querySelectorAll("[data-vz-tabs]")
    .forEach((tabs) => {

      const buttons =
        tabs.querySelectorAll(
          ".vz-tab"
        );

      const panels =
        tabs.querySelectorAll(
          ".vz-tab-panel"
        );

      buttons.forEach((button, index) => {

        button.addEventListener(
          "click",
          () => {

            buttons.forEach((item) => {
              item.classList.remove(
                "is-active"
              );
            });

            panels.forEach((panel) => {
              panel.classList.remove(
                "is-active"
              );
            });

            button.classList.add(
              "is-active"
            );

            if (panels[index]) {
              panels[index].classList.add(
                "is-active"
              );
            }

          }
        );

      });

    });

};


/* =======================================================
   ACCORDION
   ======================================================= */

const initAccordion = () => {

  document
    .querySelectorAll(
      ".vz-accordion-trigger"
    )
    .forEach((trigger) => {

      trigger.addEventListener(
        "click",
        () => {

          const item =
            trigger.closest(
              ".vz-accordion-item"
            );

          if (!item) return;

          const open =
            item.classList.toggle(
              "is-open"
            );

          trigger.setAttribute(
            "aria-expanded",
            String(open)
          );

        }
      );

    });

};


/* =======================================================
   MODAL
   ======================================================= */

const initModals = () => {

  document
    .querySelectorAll(
      "[data-vz-modal-open]"
    )
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const selector =
            button.getAttribute(
              "data-vz-modal-open"
            );

          const modal =
            document.querySelector(
              selector
            );

          if (!modal) return;

          modal.classList.add(
            "is-open"
          );

          document.body.classList.add(
            "vz-menu-open"
          );

        }
      );

    });


  document
    .querySelectorAll(
      "[data-vz-modal-close]"
    )
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const modal =
            button.closest(
              ".vz-modal"
            );

          if (!modal) return;

          modal.classList.remove(
            "is-open"
          );

          document.body.classList.remove(
            "vz-menu-open"
          );

        }
      );

    });

};


/* =======================================================
   TOAST
   ======================================================= */

const showToast = (
  message,
  duration = 3000
) => {

  let container =
    document.querySelector(
      ".vz-toast-container"
    );


  if (!container) {

    container =
      document.createElement(
        "div"
      );

    container.className =
      "vz-toast-container";

    document.body.appendChild(
      container
    );

  }


  const toast =
    document.createElement(
      "div"
    );

  toast.className =
    "vz-toast";

  toast.textContent =
    message;


  container.appendChild(
    toast
  );


  window.setTimeout(
    () => {

      toast.classList.add(
        "is-leaving"
      );

      window.setTimeout(
        () => {
          toast.remove();
        },
        400
      );

    },
    duration
  );

};


/* =======================================================
   SEARCH OVERLAY
   ======================================================= */

const initSearchOverlay = () => {

  document
    .querySelectorAll(
      "[data-vz-search-open]"
    )
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const selector =
            button.getAttribute(
              "data-vz-search-open"
            );

          const overlay =
            document.querySelector(
              selector
            );

          if (!overlay) return;

          overlay.classList.add(
            "is-open"
          );

          const input =
            overlay.querySelector(
              "input"
            );

          if (input) {

            window.setTimeout(
              () => input.focus(),
              200
            );

          }

        }
      );

    });


  document
    .querySelectorAll(
      "[data-vz-search-close]"
    )
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const overlay =
            button.closest(
              ".vz-search-overlay"
            );

          if (!overlay) return;

          overlay.classList.remove(
            "is-open"
          );

        }
      );

    });

};


/* =======================================================
   KEYBOARD ESCAPE
   ======================================================= */

const initEscapeKey = () => {

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key !== "Escape") {
        return;
      }


      document
        .querySelectorAll(
          ".vz-modal.is-open, .vz-search-overlay.is-open, .vz-mobile-menu.is-open"
        )
        .forEach((element) => {

          element.classList.remove(
            "is-open"
          );

        });


      document.body.classList.remove(
        "vz-menu-open"
      );

    }
  );

};


  /* =======================================================
     INITIALIZE
     ======================================================= */

  ready(() => {

  initReveal();

  initNavbar();

  initSpotlight();

  initMagneticButtons();

  initTilt();

  initSmoothAnchors();

  initMobileMenu();

  initTheme();

  initCopyCode();

  initReadingProgress();

  initTabs();

  initAccordion();

  initModals();

  initSearchOverlay();

  initEscapeKey();

});


  /* =======================================================
     PUBLIC API
     ======================================================= */

  window.VanzoneUI = {

    version: "1.0.0",

    reveal: initReveal,

    navbar: initNavbar,

    spotlight: initSpotlight,

    magnetic: initMagneticButtons,

    tilt: initTilt,

    theme: initTheme,

    tabs: initTabs,

    accordion: initAccordion,

    modal: initModals,

    search: initSearchOverlay,

    toast: showToast

  };

})();
