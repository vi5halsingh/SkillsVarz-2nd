const pages = document.querySelectorAll('.page');
const imageElement = document.querySelector('.img .image');
const titleElement = document.querySelector('.title');
const bookElement = document.getElementById('book');
const flipAll = document.getElementById('flipAll');

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

const mainVideo = document.querySelector('#mainVideo'); // Get reference to video element
if (mainVideo) {
    mainVideo.addEventListener('ended', () => {
        const heroBtns = document.querySelector('.hero-btns');
        heroBtns.classList.add('show-buttons');
        
        // Animate buttons appearance
        gsap.to('.hero-btns', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.inOut'
        });
    });
}



// --- DVD BUTTON INDICATOR LOGIC ---



  // Video controls
  // const mainVideo = document.getElementById('mainVideo');
  const enterBtn = document.getElementById('enterBtn');
  const replayBtn = document.getElementById('replayBtn');

  
  mainVideo.loop = false;

  
  mainVideo.addEventListener('ended', () => {
      enterBtn.style.display = 'block';
      gsap.to(enterBtn, {opacity: 1, duration: 1});
      gsap.to(replayBtn, {opacity: 1, duration: 1, display: 'block'});
      mainVideo.pause();
  });

  
  enterBtn.addEventListener('click', () => {
      gsap.to(".hero", {
          opacity: 0,
          duration: 1,
          onComplete: () => {
              document.querySelector(".hero").style.display = "none";
          }
      });
      
      // Show and animate the form section
      gsap.fromTo("#animatedFormSection",
          { opacity: 0, scale: 0.8 },
          {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              onStart: () => {
                  document.getElementById("animatedFormSection").style.display = "block";
              }
          }
      );
      
  });

  
  // Initialize hidden state for form section
  gsap.set("#animatedFormSection", {
      opacity: 0,
      display: "none"
  });
  gsap.to(enterBtn, {opacity: 0, duration: 0.5});
  gsap.to(replayBtn, {opacity: 0, duration: 0.5});
 

  // Handle replay button click
  replayBtn.addEventListener('click', () => {
      mainVideo.currentTime = 0;
      mainVideo.style.display = 'block';
      gsap.to(mainVideo, {opacity: 1, duration: 1});
      mainVideo.play();
      gsap.to(enterBtn, {opacity: 0, duration: 0.5});
      gsap.to(replayBtn, {opacity: 0, duration: 0.5});
  });
 

