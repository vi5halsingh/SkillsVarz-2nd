import './index.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.from("#titleName", {
  opacity: 0,
  duration: 0.5,
 scale:2
})
gsap.from("#tagLine", {
  opacity: 0,
  duration: 3,
  // scale:0.8,
  y: -100, 
})

// function setAnimationScroll() {
//   const runTime = gsap.timeline({
//     scrollTrigger: {
//       trigger: '#title',
//       start: 'top top',
//       end: 'bottom bottom',
//       scrub: true,
//       pin: true,
//       anticipatePin: 1,
//     }
//   });

//   // Animation sequence
//   runTime
//     .to('#tagLine', {
//       scale: 2,
//       opacity: 0,
//       duration: 2,
//       scaleX: 1.5, // stretches the tagline horizontally
//     }, 0)
//     .to('#titleName', {
//       scale: 1.5,
//       y: -50, // moves titleName slightly upward
//       duration: 2,
//       ease: "power2.out",
//     }, 0); // run at the same time as tagline animation
// }

// setAnimationScroll();
