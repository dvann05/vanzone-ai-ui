/* =========================================================
   VANZONE AI UI
   NEURAL NETWORK BACKGROUND
   Version: 1.0.0
   ========================================================= */

(() => {

  "use strict";


  /* =======================================================
     CONFIG
     ======================================================= */

  const CONFIG = {

    particleDensity: 0.000065,

    maxParticles: 90,

    connectionDistance: 145,

    mouseDistance: 180,

    mouseForce: 0.015,

    particleSpeed: 0.18,

    lineOpacity: 0.16,

    particleOpacity: 0.7

  };


  /* =======================================================
     REDUCED MOTION
     ======================================================= */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  /* =======================================================
     INITIALIZE
     ======================================================= */

  const init = () => {

    const containers =
      document.querySelectorAll(
        "[data-vz-ai-background]"
      );


    if (!containers.length) {
      return;
    }


    containers.forEach(
      createNetwork
    );

  };


  /* =======================================================
     NETWORK
     ======================================================= */

  const createNetwork = (
    container
  ) => {


    const canvas =
      document.createElement(
        "canvas"
      );


    container.appendChild(
      canvas
    );


    const ctx =
      canvas.getContext(
        "2d"
      );


    if (!ctx) {
      return;
    }


    let width = 0;

    let height = 0;

    let particles = [];


    const mouse = {

      x: null,

      y: null

    };


    /* =====================================================
       RESIZE
       ===================================================== */

    const resize = () => {

      const rect =
        container.getBoundingClientRect();


      const dpr =
        Math.min(
          window.devicePixelRatio || 1,
          2
        );


      width =
        Math.max(
          1,
          rect.width
        );


      height =
        Math.max(
          1,
          rect.height
        );


      canvas.width =
        width * dpr;


      canvas.height =
        height * dpr;


      canvas.style.width =
        `${width}px`;


      canvas.style.height =
        `${height}px`;


      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );


      createParticles();

    };


    /* =====================================================
       PARTICLE COUNT
       ===================================================== */

    const getParticleCount = () => {

      const area =
        width * height;


      let count =
        Math.round(
          area *
          CONFIG.particleDensity
        );


      count =
        Math.max(
          24,
          count
        );


      count =
        Math.min(
          CONFIG.maxParticles,
          count
        );


      if (
        window.innerWidth < 600
      ) {

        count =
          Math.min(
            count,
            45
          );

      }


      return count;

    };


    /* =====================================================
       CREATE PARTICLES
       ===================================================== */

    const createParticles = () => {

      const count =
        getParticleCount();


      particles =
        Array.from(
          {
            length: count
          },
          () => {

            const angle =
              Math.random() *
              Math.PI *
              2;


            const speed =
              CONFIG.particleSpeed *
              (
                .4 +
                Math.random() *
                .8
              );


            return {

              x:
                Math.random() *
                width,

              y:
                Math.random() *
                height,

              vx:
                Math.cos(angle) *
                speed,

              vy:
                Math.sin(angle) *
                speed,

              radius:
                .8 +
                Math.random() *
                1.8,

              pulse:
                Math.random() *
                Math.PI *
                2

            };

          }
        );

    };


    /* =====================================================
       MOUSE
       ===================================================== */

    const pointerMove = (
      event
    ) => {

      const rect =
        canvas.getBoundingClientRect();


      mouse.x =
        event.clientX -
        rect.left;


      mouse.y =
        event.clientY -
        rect.top;

    };


    const pointerLeave = () => {

      mouse.x = null;

      mouse.y = null;

    };


    container.addEventListener(
      "pointermove",
      pointerMove,
      {
        passive: true
      }
    );


    container.addEventListener(
      "pointerleave",
      pointerLeave
    );


    /* =====================================================
       UPDATE
       ===================================================== */

    const update = () => {

      particles.forEach(
        (particle) => {

          particle.x +=
            particle.vx;

          particle.y +=
            particle.vy;


          /* Mouse influence */

          if (
            mouse.x !== null &&
            mouse.y !== null
          ) {

            const dx =
              mouse.x -
              particle.x;


            const dy =
              mouse.y -
              particle.y;


            const distance =
              Math.sqrt(
                dx * dx +
                dy * dy
              );


            if (
              distance <
              CONFIG.mouseDistance
            ) {

              const force =
                (
                  1 -
                  distance /
                  CONFIG.mouseDistance
                ) *
                CONFIG.mouseForce;


              particle.vx +=
                dx * force;

              particle.vy +=
                dy * force;

            }

          }


          /* Limit speed */

          const speed =
            Math.sqrt(
              particle.vx *
                particle.vx +
              particle.vy *
                particle.vy
            );


          const maxSpeed =
            CONFIG.particleSpeed *
            2.2;


          if (
            speed >
            maxSpeed
          ) {

            particle.vx =
              particle.vx /
              speed *
              maxSpeed;


            particle.vy =
              particle.vy /
              speed *
              maxSpeed;

          }


          /* Wrap around */

          if (
            particle.x < -20
          ) {

            particle.x =
              width + 20;

          }

          if (
            particle.x >
            width + 20
          ) {

            particle.x =
              -20;

          }


          if (
            particle.y < -20
          ) {

            particle.y =
              height + 20;

          }

          if (
            particle.y >
            height + 20
          ) {

            particle.y =
              -20;

          }


          particle.pulse +=
            .015;

        }
      );

    };


    /* =====================================================
       DRAW PARTICLES
       ===================================================== */

    const drawParticles = () => {

      particles.forEach(
        (particle) => {

          const pulse =
            (
              Math.sin(
                particle.pulse
              ) + 1
            ) / 2;


          const radius =
            particle.radius +
            pulse * .6;


          ctx.beginPath();


          ctx.arc(
            particle.x,
            particle.y,
            radius,
            0,
            Math.PI * 2
          );


          ctx.fillStyle =
            `rgba(
              145,
              130,
              255,
              ${CONFIG.particleOpacity}
            )`;


          ctx.fill();

        }
      );

    };


    /* =====================================================
       DRAW CONNECTIONS
       ===================================================== */

    const drawConnections = () => {

      for (
        let i = 0;
        i < particles.length;
        i++
      ) {

        const a =
          particles[i];


        for (
          let j = i + 1;
          j < particles.length;
          j++
        ) {

          const b =
            particles[j];


          const dx =
            a.x -
            b.x;


          const dy =
            a.y -
            b.y;


          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );


          if (
            distance >
            CONFIG.connectionDistance
          ) {

            continue;

          }


          const opacity =
            (
              1 -
              distance /
              CONFIG.connectionDistance
            ) *
            CONFIG.lineOpacity;


          ctx.beginPath();


          ctx.moveTo(
            a.x,
            a.y
          );


          ctx.lineTo(
            b.x,
            b.y
          );


          ctx.strokeStyle =
            `rgba(
              109,
              93,
              252,
              ${opacity}
            )`;


          ctx.lineWidth =
            .7;


          ctx.stroke();

        }

      }

    };


    /* =====================================================
       MOUSE CONNECTIONS
       ===================================================== */

    const drawMouseConnections = () => {

      if (
        mouse.x === null ||
        mouse.y === null
      ) {

        return;

      }


      particles.forEach(
        (particle) => {

          const dx =
            mouse.x -
            particle.x;


          const dy =
            mouse.y -
            particle.y;


          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );


          if (
            distance >
            CONFIG.mouseDistance
          ) {

            return;

          }


          const opacity =
            (
              1 -
              distance /
              CONFIG.mouseDistance
            ) * .25;


          ctx.beginPath();


          ctx.moveTo(
            mouse.x,
            mouse.y
          );


          ctx.lineTo(
            particle.x,
            particle.y
          );


          ctx.strokeStyle =
            `rgba(
              0,
              212,
              255,
              ${opacity}
            )`;


          ctx.lineWidth =
            .8;


          ctx.stroke();

        }
      );

    };


    /* =====================================================
       RENDER
       ===================================================== */

    const render = () => {

      ctx.clearRect(
        0,
        0,
        width,
        height
      );


      if (!reducedMotion) {

        update();

      }


      drawConnections();

      drawMouseConnections();

      drawParticles();


      if (!reducedMotion) {

        requestAnimationFrame(
          render
        );

      }

    };


    /* =====================================================
       OBSERVER
       ===================================================== */

    if (
      "ResizeObserver" in window
    ) {

      const resizeObserver =
        new ResizeObserver(
          resize
        );

      resizeObserver.observe(
        container
      );

    } else {

      window.addEventListener(
        "resize",
        resize
      );

    }


    resize();


    render();

  };


  /* =======================================================
     DOM READY
     ======================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init
    );

  } else {

    init();

  }


  /* =======================================================
     PUBLIC API
     ======================================================= */

  window.VanzoneAIBackground = {
    version: "1.0.0"
  };

})();
