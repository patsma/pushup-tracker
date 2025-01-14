import { gsap } from "gsap";

export const useAppAnimations = () => {
  const mainTimeline = gsap.timeline();

  // Initial page load animation
  const initializePageAnimation = () => {
    const loader = document.querySelector(".initial-loader");
    const footerEl = document.querySelector(".the-footer");
    const toggleBtn = document.querySelector(".footer-toggle-btn");
    const arrowEl = document.querySelector(".footer-toggle-arrow");

    const isFooterHidden = localStorage.getItem("footerHidden") === "true";

    // Main content elements
    const elements = [
      ".logo-group",
      ".user-controls",
      ".pushup-buttons",
      ".pushups-container",
      ".leaderboard",
    ];

    // Set initial states
    gsap.set(toggleBtn, { opacity: 0 });
    gsap.set([footerEl], { opacity: 0 });
    if (isFooterHidden) {
      gsap.set(footerEl, { yPercent: 100 });
      gsap.set(arrowEl, { rotation: 180 });
    }

    // Create main sequence
    mainTimeline
      // Fade out loader
      .to(loader, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          if (loader) {
            loader.remove();
          }
        },
      })
      // Animate main content elements
      .from(elements, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
      })
      // Animate footer elements based on state
      .add(function () {
        const footerTimeline = gsap.timeline();

        if (isFooterHidden) {
          footerTimeline.to(toggleBtn, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        } else {
          footerTimeline
            .to([footerEl, toggleBtn], {
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
            })
            .from(
              footerEl,
              {
                yPercent: 20,
                duration: 0.5,
                ease: "power2.out",
              },
              "<"
            );
        }
      });
  };

  // Footer toggle animation
  const animateFooter = (
    footerEl: Element,
    arrowEl: Element,
    hide: boolean
  ) => {
    const timeline = gsap.timeline({
      defaults: {
        duration: 0.5,
        ease: "power3.inOut",
      },
    });

    if (hide) {
      timeline
        .to(footerEl, { yPercent: 100 })
        .to(arrowEl, { rotation: 180 }, "<");
    } else {
      timeline
        .to(footerEl, { yPercent: 0, opacity: 1 })
        .to(arrowEl, { rotation: 0 }, "<");
    }

    return timeline;
  };

  // New entry animation
  const animateNewEntry = (el: Element) => {
    gsap.from(el, {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: "sine.out",
    });
  };

  // Number counter animation
  const animateNumber = (el: Element, startValue: number, endValue: number) => {
    gsap.to(el, {
      duration: 1,
      innerText: endValue,
      snap: { innerText: 1 },
      ease: "power2.out",
      startAt: { innerText: startValue },
    });
  };

  return {
    initializePageAnimation,
    animateFooter,
    animateNewEntry,
    animateNumber,
  };
};
