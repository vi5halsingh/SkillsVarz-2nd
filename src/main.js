const pages = document.querySelectorAll('.page');
let current = 0;

// Initialize all pages unflipped
pages.forEach(page => gsap.set(page, { rotateY: 0 }));

document.getElementById('next').addEventListener('click', () => {
  if (current < pages.length - 1) {
    gsap.to(pages[current], {
      rotateY: -180,
      duration: 1,
      ease: 'power2.inOut'
    });
    current++;
  }
});

document.getElementById('prev').addEventListener('click', () => {
  if (current > 0) {
    current--;
    gsap.to(pages[current], {
      rotateY: 0,
      duration: 1,
      ease: 'power2.inOut'
    });
  }
});

document.getElementById('flipAll').addEventListener('click', () => {
  let delay = 0;
  for (let i = current; i < pages.length - 1; i++) {
    gsap.to(pages[i], {
      rotateY: -180,
      duration: 0.6,
      delay: delay,
      ease: 'power2.inOut'
    });
    delay += 0.3;
  }

  // Ensure last page is not flipped (its front stays visible)
  // Set current index to last
  current = pages.length - 1;
});