// Initialize Lenis smooth scroll
  const lenis = new Lenis({
    lerp: 0.1,
    smooth: true
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// GSAP animations
gsap.registerPlugin(ScrollTrigger)

// Horizontal scroll GSAP for story-section
const horizontalSections = gsap.utils.toArray(".horizontal-scroll__item");

// Check screen width before applying horizontal scroll animation
if (window.innerWidth > 768 && horizontalSections.length > 1) {
    gsap.to(horizontalSections, {
        xPercent: -100 * (horizontalSections.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: ".horizontal-scroll",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            // Adjust end calculation if needed, ensure .horizontal-scroll has correct width
            end: () => "+=" + (document.querySelector(".horizontal-scroll__container").scrollWidth - window.innerWidth)
        }
    });
}

// Animate only intro and legacy sections vertically
gsap.utils.toArray('section:not(.story-section)').forEach((section, i) => {
    const heading = section.querySelector('.brutal-heading')
    const text = section.querySelector('.brutal-text')
    const media = section.querySelector('.media-container')
    const decor = section.querySelector('.decor-element')

    gsap.from(heading, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0% 100%)',
        duration: 1.5,
        ease: 'power4.out'
    })

    gsap.to(text, {
        scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3
    })

    gsap.from(media, {
        scrollTrigger: {
            trigger: media,
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: i % 2 === 0 ? 100 : -100,
        opacity: 0,
        duration: 1
    })

    if (decor) {
        // Only animate with gsap.from for decor elements that are NOT in legacy-section
        if (!section.classList.contains('legacy-section')) {
            gsap.from(decor, {
                scrollTrigger: {
                    trigger: decor,
                    start: 'top bottom',
                    toggleActions: 'play none none none'
                },
                rotation: 360,
                duration: 1,
                ease: 'elastic.out(1, 0.5)'
            })
        }
    }
});

// Scroll-based text reveal with jumpy animation for brutal-heading-middle
gsap.fromTo(
    ".brutal-heading-middle",
    {
        clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0% 100%)',
        y: 60
    },
    {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
        y: 0,
        ease: "elastic.out(1, 0.6)",
        duration: 5.2,
        scrollTrigger: {
            trigger: ".brutal-heading-middle",
            start: "top 80%",
            end: "top -40%", // <-- Increased scroll distance for slower reveal
            scrub: true,
            // markers: true,
        }
    }
);

// Animate legacy-section video to fullscreen on scroll (fixed position for smooth overlay)
gsap.to(".legacy-section .media-container", {
    scrollTrigger: {
        trigger: ".legacy-section",
        start: "top center",
        end: "bottom top",
        scrub: true,
        pin: false,
        // markers: true,
    },
    // position: "fixed",
    // top: 0,
    // left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 1000,
    ease: "power2.inOut"
});

// Animate the middle section's content (fade in, slide from left)
// gsap.to(".content", {
//     scrollTrigger: {
//         trigger: ".story-section + .content",
//         start: "top 80%",
//         end: "top 40%",
//         scrub: true,
//         marker:true,
//     },
//     x: -100,
//     opacity: 0,
//     ease: "power2.out"
// });

// // Animate the middle section's media-container (fade in, slide from right)
// gsap.from(".story-section + .media-container", {
//     scrollTrigger: {
//         trigger: ".story-section + .media-container",
//         start: "top 80%",
//         end: "top 40%",
//         scrub: true
//     },
//     x: 100,
//     opacity: 0,
//     ease: "power2.out"
// });

// Make decor-element-second rotate as much as you scroll through legacy-section
gsap.to(".decor-element-second", {
    scrollTrigger: {
        trigger: ".legacy-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    },
    rotation: 1080, // 3 full rotations; increase for more
    ease: "none"
});

// Make decor-element-middle rotate as you scroll through story-section
gsap.to(".decor-element-middle", {
    scrollTrigger: {
        trigger: ".story-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    },
    rotation: 1080, // 3 full rotations; adjust as needed
    ease: "none"
});
window.addEventListener("scroll",() => {
    document.querySelector('.scroll-hint').style.display = 'none';
})