import { gsap } from "gsap";

export const useAppAnimations = () => {
  const mainTimeline = gsap.timeline();

  // Initial page load animation
  const initializePageAnimation = () => {
    const loader = document.querySelector(".initial-loader");
    const elements = [
      "h1",
      ".user-controls",
      ".pushup-buttons",
      ".pushups-container",
      ".leaderboard",
      ".the-footer",
    ];

    mainTimeline
      .to(loader, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          if (loader) {``
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
    animateNewEntry,
    animateNumber,
  };
};
