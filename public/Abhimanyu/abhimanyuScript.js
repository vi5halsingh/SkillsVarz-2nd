
gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("hero-canvas");
const contentSection = document.getElementById("content-section");
const context = canvas.getContext("2d");

const frameCount = 76;
const currentFrame = index => `vdo abhimanyu/frame (${String(index +1)}).webp`;
// console.log("abhi is ",currentFrame(0));
const images = [];
let imageSeq = { frame: 0 };

// Preload images and track loading progress
let loadedImages = 0;
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.onload = () => {
    loadedImages++;
    if (loadedImages === frameCount) {
      initAnimation();
    }
  };
  img.src = currentFrame(i);
  images.push(img);
}

// Initialize animation after all images are loaded
function initAnimation() {
  // Render first image
  context.drawImage(images[0], 0, 0);
  
  let isAnimating = false; // Flag to prevent animation overlap

  gsap.to(imageSeq, {
    frame: frameCount,
    snap: "frame",
    ease: "power2",
    scrollTrigger: {
      scrub: 0.8,
      // pin: true,
      trigger: canvas,
      start: "top top",
      end: "bottom 20%",
      anticipatePin: 1,
      fastScrollEnd: true,
      preventOverlaps: true,
      markers: false,
      onLeave: () => {
        if (isAnimating) return;
        isAnimating = true;

        gsap.to(canvas, {
          scale: 0.5,
          rotationY: 90,
          perspective: 1000,
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            canvas.style.display = "none";
            canvas.style.position = "static";
            isAnimating = false;
          }
        });
      },
      onEnterBack: () => {
        if (isAnimating) return;
        isAnimating = true;

        canvas.style.display = "block";
        canvas.style.position = "fixed";
        
        gsap.fromTo(canvas, 
          {
            scale: 0.5,
            rotationY: 90,
            opacity: 0
          },
          {
            scale: 1,
            rotationY: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              isAnimating = false;
            }
          }
        );
      }
    },
    onUpdate: render
  });
} 

function render() {
  const frameIndex = Math.min(Math.floor(imageSeq.frame), frameCount - 1);
  const img = images[frameIndex];
  if (img) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0);
  }
}

// feature section
// console.log("gsaping",gsap, ScrollTrigger);
const headTagLine = document.querySelector('.headTagLine');
gsap.from(headTagLine, {
  ease: "power4.out",
  scrollTrigger: {
    toggleActions: "play reverse play reverse", 
    trigger: '#FeatureSec',
    start: "top 0%",
    end: "bottom 80%",
    anticipatePin: 1,
    fastScrollEnd: true,
    preventOverlaps: true,
    // markers: true,
    // pin: true
  },
  x: -50,
  opacity: 0,
  duration: 0.8,
  delay: 0.2
});

// Animate heading
gsap.from(".feature-heading", {
  scrollTrigger: {
    trigger: "#FeatureSec",
    start: "top 20%",
    end: "bottom 80%",
    toggleActions: "play reverse play reverse", 
    // markers: true,
  },
  y: -100,
  opacity: 0,
  duration: 1.5,
  ease: "power4.out",
});

// Animate Small Card (left)
gsap.from(".small-card", {
  scrollTrigger: {
    trigger: "#FeatureSec",
    start: "top 10%",
    end: "bottom 100%",
    // scrub: true,
    toggleActions: "play reverse play reverse", 
    // markers:true
  },
  x: -100,
  z: 100,
  opacity: 0,
  duration: 1.5,
  ease: "power2.out",
});

// Animate Medium Card (center)
gsap.from(".medium-card", {
  scrollTrigger: {
    y:-100,
    trigger: "#FeatureSec",
    start: "top 0%",
    end: "bottom 100%",
    toggleActions: "play reverse play reverse", // Ensures reverse on scroll out
    // scrub: 0.8, // Remove scrub for toggleActions to work as expected
    // markers: true,
  },
  // scale: 1.8,
  y:100,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

// Animate Tall Card (right)
gsap.from(".tall-card", {
  scrollTrigger: {
    trigger: "#FeatureSec",
    start: "top 0%",
    end: "bottom 50%",
    toggleActions: "play reverse play reverse", 
    // markers: true,
    // onComplete: () => {
    //   // Add a class to the tall card to trigger the animation
    //   document.querySelector('#FeatureSec').style.display = 'none';
    // }
  },
  // y: 150,
  scale:3,
  rotation: 5,
  opacity: 0,
  duration: 1,
  ease: "power4.inOut",
});

// Animate caption (shloka text)
gsap.from(".card-caption", {
  scrollTrigger: {
    trigger: "#FeatureSec",
    start: "top 0%",
    end: "bottom 120%",
    toggleActions: "play reverse play reverse", 
    // markers:true
  },
  opacity: 0,
  y: 100,
  // x: -100,
  duration: 1.5,
  delay: 0.5,
  ease: "power1.out",
});




gsap.from(".keeper-title", {
  scrollTrigger: {
    trigger: ".keeper-section",
    start: "top 0%",
    end: "bottom 90%",
    toggleActions: "play reverse play reverse",
    // markers:true,
    pin:true,
  },
  opacity: 0,
  scale: 0.7,
  duration: 1,
  ease: "back.out(1.7)"
});

gsap.utils.toArray('.card-3d').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: '.keeper-section',
      start: 'top 10%',
      end: 'bottom 50%',
      toggleActions: 'play reverse play reverse',
      // markers: true,
      // pin:true,
      // scrub: 0.8
    },
    scale: 1.2,
    y: 80,
    opacity: 0,
    duration: 0.2 + i * 0.3,
    ease: 'power2.inOut'
  });
});
gsap.from(".shloka", {
  scrollTrigger: {
    trigger: ".keeper-section",
    start: "top -30%",
    end: "bottom 20%",
    toggleActions: "play reverse play reverse",
    // markers: true,
    // pin:true,
  },
  y: 100,
  opacity: 0,
  duration: 1
})

function goToNextSection() {
  try {
    window.parent.postMessage({ 
      type: 'scrollToKaranArjun',
    }, '*');
  } catch (error) {
    console.error('Error navigating to next section:', error);
  }
}
document.querySelector('#dropdi-btn').addEventListener('click',() =>{
  goToNextSection();
  // alert("clicked")
});

