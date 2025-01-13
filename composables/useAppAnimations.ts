import { gsap } from "gsap";

export const useAppAnimations = () => {
  const mainTimeline = gsap.timeline();

  // Separate footer initialization
  const initializeFooter = () => {
    const footerEl = document.querySelector(".the-footer");
    const arrowEl = document.querySelector(".footer-toggle-arrow");
    const isFooterHidden = localStorage.getItem("footerHidden") === "true";

    if (isFooterHidden) {
      // Set initial state immediately
      gsap.set(footerEl, { yPercent: 100, opacity: 1 });
      gsap.set(arrowEl, { rotation: 180, opacity: 1 });
    } else {
      gsap.set([footerEl, arrowEl], { opacity: 0 });
      gsap.to([footerEl, arrowEl], {
        opacity: 1,
        duration: 0.5,
        delay: 1, // Delay to let main content load first
        ease: "power2.out",
      });
    }
  };

  // Initial page load animation
  const initializePageAnimation = () => {
    const loader = document.querySelector(".initial-loader");
    const elements = [
      "h1",
      ".user-controls",
      ".pushup-buttons",
      ".pushups-container",
      ".leaderboard",
    ];

    // Initialize footer separately
    initializeFooter();

    mainTimeline
      .to(loader, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          if (loader) {
            loader.remove();
          }
        },
      })
      .from(elements, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
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
      timeline.to(footerEl, { yPercent: 0 }).to(arrowEl, { rotation: 0 }, "<");
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
