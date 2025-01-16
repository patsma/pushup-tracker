import { gsap } from 'gsap';

export const useLogoAnimation = () => {
  const animatePushup = (count = -1, delay = 2) => {
    const tl = gsap.timeline({
      repeat: count,
      repeatDelay: delay,
    });

    tl.to('#bodyUp', { duration: 1, y: 80, ease: 'power2.inOut' });
    tl.to('#head', { duration: 1, y: 80, ease: 'power2.inOut' }, '<+=0.1');
    tl.to('#bodyUp', { duration: 1, y: 0, ease: 'power2.inOut' });
    tl.to('#head', { duration: 1, y: 0, ease: 'power2.inOut' }, '<');

    return tl;
  };

  return {
    animatePushup,
  };
};
