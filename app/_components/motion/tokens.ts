/**
 * Motion tokens — the JS mirror of the CSS custom properties defined in
 * app/_style/globals.css. Imported by components that drive motion through
 * JS (GSAP, IntersectionObserver) so the timing/easing language stays in
 * sync with the CSS-driven hover transforms.
 *
 * Single source of truth: change a value here and (matching change in CSS),
 * the entire site's motion shifts in step.
 */

// ease-out-quart — snappy start, soft settle. Same curve as --ease-motion.
export const EASE_MOTION = "cubic-bezier(0.165, 0.84, 0.44, 1)";

// GSAP-named easing equivalent (closest match — power4.out approximates ease-out-quart)
export const GSAP_EASE = "power4.out";

// Durations in seconds for GSAP, milliseconds for setTimeout-style consumers
export const DURATION = {
	fast: { s: 0.2, ms: 200 },     // color shifts, simple state changes
	base: { s: 0.32, ms: 320 },    // hover transforms (cards, links)
	slow: { s: 0.5, ms: 500 },     // image zooms
	reveal: { s: 0.6, ms: 600 },   // scroll-triggered section entrances
} as const;

// Reveal rise distance — matches .reveal { transform: translateY(12px) } in globals.css
export const REVEAL_RISE_PX = 12;
