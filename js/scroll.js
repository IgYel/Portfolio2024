let horizontalScrollerItems = gsap.utils.toArray(".horizontalScroller__item");
let mainEndLineText = document.querySelector(".MainEndLineText");
let mainEndLineTextContact = document.querySelector(".MainEndLineTextContact");
let lineUp = document.querySelector(".LineUp");
let lineBot = document.querySelector(".LineBot");
let aboutLineUp = document.querySelector(".AboutLineUp");
let aboutLineBot = document.querySelector(".AboutLineBot");
let portfolioText = document.querySelector(".PortfolioText");
let aboutBackgroundText = document.querySelector("#FixedText");

gsap.registerPlugin(ScrollTrigger);

// Horizontal scroll animation for the Portfolio section
if (horizontalScrollerItems.length) {
  gsap.to(horizontalScrollerItems, {
    xPercent: -110 * (horizontalScrollerItems.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontalScroller",
      pin: true,
      scrub: 1,
      end: () =>
        "+=" + document.querySelector(".horizontalScroller__item").offsetWidth,
    },
  });
}

// Function to create scroll triggers
function createScrollTrigger(element, xPercent, trigger, start, end) {
  if (element) {
    gsap.to(element, {
      xPercent: xPercent,
      ease: "none",
      scrollTrigger: {
        trigger: trigger,
        start: start,
        end: end,
        scrub: 1,
      },
    });
  }
}

// Apply scroll triggers
createScrollTrigger(
  mainEndLineText,
  -10,
  ".MainEndLineText",
  "top bottom",
  "bottom top"
);
createScrollTrigger(lineUp, 5, ".LineUp", "top bottom", "bottom top");
createScrollTrigger(lineBot, -5, ".LineBot", "top bottom", "bottom top");
createScrollTrigger(
  aboutLineUp,
  -5,
  ".AboutLineUp",
  "top bottom",
  "bottom top"
);
createScrollTrigger(
  aboutLineBot,
  5,
  ".AboutLineBot",
  "top bottom",
  "top -100%"
);

// Function to update letterSpacing on scroll
function updateLetterSpacing(element, divisor, offset) {
  if (element) {
    window.addEventListener("scroll", function () {
      var scrollPosition = window.scrollY;
      var newLetterSpacing = scrollPosition / divisor + offset + "rem";
      element.style.letterSpacing = newLetterSpacing;
    });
  }
}

// Update letterSpacing for elements
updateLetterSpacing(portfolioText, 900, -3);
updateLetterSpacing(aboutBackgroundText, -800, 2);

// Animation and scroll trigger for FixedText
if (aboutBackgroundText) {
  gsap.to(aboutBackgroundText, {
    y: 30,
    duration: 1,
    scrollTrigger: {
      trigger: aboutBackgroundText,
      start: "top top",
      end: "bottom -50%", // Pin for longer
      scrub: true,
      pin: true, // Pin only FixedText
    },
  });
}

// Function to create width animation scroll triggers
function createWidthScrollTrigger(element, widthChange, trigger, start, end) {
  if (element) {
    gsap.to(element, {
      width: widthChange,
      ease: "none",
      scrollTrigger: {
        trigger: trigger,
        start: start,
        end: end,
        scrub: 1,
      },
    });
  }
}

//! Speed

let lastScrollTop = 0;
let lastTimestamp = 0;
let scrollSpeed = 0;
let scrollTimeout;

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let timestamp = performance.now();

  if (lastTimestamp !== 0) {
    let timeDiff = timestamp - lastTimestamp;
    let distance = Math.abs(scrollTop - lastScrollTop);
    scrollSpeed = distance / timeDiff; // Scroll Speed
  }

  lastScrollTop = scrollTop;
  lastTimestamp = timestamp;

  // Update text-shadow for AboutTextCard elements
  const aboutCards = document.querySelectorAll(".AboutTextCard");
  aboutCards.forEach((card) => {
    card.style.textShadow = `
        0 0 ${Math.round(scrollSpeed * 5)}px #fafafa,
        0 0 ${Math.round(scrollSpeed * 7)}px rgb(255, 101, 222),
        0 0 ${Math.round(scrollSpeed * 10)}px #fafafa
      `;
  });

  // Reset timer on every scroll event
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    scrollSpeed = 0;
    aboutCards.forEach((card) => {
      card.style.textShadow = `
          0 0 0px #fafafa,
          0 0 0px rgb(255, 101, 222),
          0 0 0px #fafafa
        `;
    });
  }, 600); // 600 ms delay
});