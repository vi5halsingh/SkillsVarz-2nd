const pages = document.querySelectorAll('.page');
const imageElement = document.querySelector('.img .image');
const titleElement = document.querySelector('.title');
const bookElement = document.getElementById('book');
const flipAll = document.getElementById('flipAll');
//animate book
flipAll.addEventListener('click', () => {
  // Prevent mouse follow effect
  window.removeEventListener('mousemove', parallaxHandler);

  // Animate image
  gsap.to(imageElement, {
    x: 1250,
    scale: 1.5,
    delay: 0.1,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.in'
  });

  // Animate title
  gsap.to(titleElement, {
    scale: 70,
    delay: 0.5,
    opacity: 1,
    duration: 1.5,
    ease: 'power2.inOut'
  });

  // Calculate the distance to center the book horizontally
  const bookRect = bookElement.getBoundingClientRect();
  const bookCenter = bookRect.left + bookRect.width / 2;
  const viewportCenter = window.innerWidth / 2;
  const deltaX = viewportCenter - bookCenter;

  // Step 1: Move book to center horizontally WHILE flipping
  let delay = 0;
  gsap.to(bookElement, {
    x: deltaX,
    duration: 2, // match flipping duration
    ease: 'power2.inOut'
  });

  for (let i = current; i < pages.length - 1; i++) {
    gsap.to(pages[i], {
      rotateY: -180,
      duration: 2,
      delay: delay,
      ease: 'slow(0.7, 0.7, false)'
    });
    delay += 0.3;
  }

  // Step 2: Zoom the book after flipping
  setTimeout(() => {
    gsap.to(bookElement, {
      scale: 5,
      duration: 1, // Changed from 3 to 1 for a quicker zoom
      ease: 'power2.inOut',
      onComplete: () => {
        // Fade out .hero section after all animations
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
          gsap.to(heroSection, {
            opacity: 0,
            duration: 0.7,
            onComplete: () => {
              heroSection.style.display = "none";
              // Enable scroll after hero is hidden (if you want)
              // document.body.style.overflowY = "scroll";
            }
          });
        }
      }
    });
  }, (delay) * 1000);

  // Set current index to last
  current = pages.length - 1;
});
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

// --- Parallax Cursor Effect ---

// Infinite floating animation for chariot (imageElement)
if (imageElement) {
  gsap.to(imageElement, {
    y: -20,
    duration: 3,
    ease: "power1.inOut",
    yoyo: true,
    repeat: -1
  });
}

// Infinite floating animation for book (bookElement)
if (bookElement) {
  gsap.to(bookElement, {
    y: -12,
    duration: 3.5,
    ease: "power1.inOut",
    yoyo: true,
    repeat: -1
  });
}
function parallaxHandler(e) {
  const x = e.clientX;
  const y = e.clientY;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Calculate offset from center, normalized between -1 and 1
  const offsetX = (x - centerX) / centerX;
  const offsetY = (y - centerY) / centerY;

  // Parallax strengths for each element
  const chariotStrength = 10; // px
  const bookStrength = 8;    // px
  const titleStrength = 4;   // px

  // Animate chariot image
  if (imageElement) {
    gsap.to(imageElement, {
      x: offsetX * chariotStrength -350,
      y: offsetY * chariotStrength,
      duration: 0.6,
      ease: "power2.out"
    });
  }

  // Animate book
  if (bookElement) {
    gsap.to(bookElement, {
      x: offsetX * bookStrength,
      y: offsetY * bookStrength,
      duration: 0.6,
      ease: "power2.out"
    });
  }

  // Animate title
  if (titleElement) {
    gsap.to(titleElement, {
      x: offsetX * titleStrength,
      y: offsetY * titleStrength,
      duration: 0.6,
      ease: "power2.out"
    });
  }
}

window.addEventListener('mousemove', parallaxHandler);

// --- DVD BUTTON INDICATOR LOGIC ---
const dvdBtn = document.getElementById('dvdBtn');
let dvdSpinning = false;

if (dvdBtn) {
  dvdBtn.addEventListener('click', () => {
    dvdSpinning = !dvdSpinning;
    if (dvdSpinning) {
      dvdBtn.classList.add('rotating');
    } else {
      dvdBtn.classList.remove('rotating');
    }
  });
}

