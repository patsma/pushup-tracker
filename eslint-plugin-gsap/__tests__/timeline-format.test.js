const { RuleTester } = require('eslint');
const rule = require('../index').rules['timeline-format'];

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
});

ruleTester.run('timeline-format', rule, {
  valid: [
    // Single line GSAP animations
    'gsap.set(toggleBtn, { opacity: 0 });',
    'gsap.to(el, { duration: 0.3, opacity: 0 });',

    // Timeline with prettier-ignore and proper chaining
    `// prettier-ignore
    timeline
    .to(footerEl, { yPercent: 100 })
    .to(arrowEl, { rotation: 180 }, '<');`,

    // Timeline initialization
    'const tl = gsap.timeline({ defaults: { duration: 0.5 } });',
  ],

  invalid: [
    // Multi-line GSAP animation should be single line
    {
      code: `gsap.from(el, {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: 'sine.out'
      });`,
      output:
        "gsap.from(el, { y: -20, opacity: 0, duration: 0.6, ease: 'sine.out' });",
      errors: [{ message: 'GSAP animations should be on a single line' }],
    },

    // Timeline chain without prettier-ignore
    {
      code: `timeline
        .to(footerEl, { yPercent: 100 })
        .to(arrowEl, { rotation: 180 }, '<');`,
      output: `// prettier-ignore
timeline
        .to(footerEl, { yPercent: 100 })
        .to(arrowEl, { rotation: 180 }, '<');`,
      errors: [
        { message: 'GSAP timeline chains should have prettier-ignore comment' },
      ],
    },

    // Multi-line timeline initialization
    {
      code: `gsap.timeline({
        defaults: { 
          duration: 0.5 
        }
      });`,
      output: 'gsap.timeline({ defaults: { duration: 0.5 } });',
      errors: [{ message: 'GSAP animations should be on a single line' }],
    },
  ],
});
