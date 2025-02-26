// Theme toggling
const themeToggle = document.querySelector(".theme-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function setTheme(isDark) {
  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "dark" : "light"
  );
  themeToggle.innerHTML = isDark
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

// Initial theme based on system preference
setTheme(prefersDarkScheme.matches);

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  setTheme(!isDark);
});

// Stagger fade-in animations
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.2}s`;
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Before/After Slider functionality
const slider = document.querySelector(".before-after-slider");
const handle = document.querySelector(".slider-handle");
const afterImage = document.querySelector(".after-image");

let isDragging = false;

const updateSlider = (e) => {
  if (!isDragging) return;

  const rect = slider.getBoundingClientRect();
  const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
  const percent = (x / rect.width) * 100;

  handle.style.left = `${percent}%`;
  afterImage.style.width = `${percent}%`;
};

handle.addEventListener("mousedown", () => (isDragging = true));
window.addEventListener("mousemove", updateSlider);
window.addEventListener("mouseup", () => (isDragging = false));

// Load particles.js for background effect
particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    color: { value: "#6f42c1" },
    opacity: { value: 0.1 },
    size: { value: 3 },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#6f42c1",
      opacity: 0.1,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
    },
  },
});

// Typing animation
const words = ["Instantly", "Beautifully", "Magically"];
let wordIndex = 0;
const typingText = document.querySelector(".typing-text");

setInterval(() => {
  typingText.textContent = words[wordIndex];
  wordIndex = (wordIndex + 1) % words.length;
}, 3000);

// Progress bar animation on scroll
const progressBars = document.querySelectorAll(".progress-fill");
const animateProgress = () => {
  progressBars.forEach((bar) => {
    const targetWidth = bar.style.width;
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.width = targetWidth;
    }, 100);
  });
};

// Intersection Observer for progress bars
const observeProgress = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateProgress();
        observeProgress.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelector(".expertise-container")?.forEach((container) => {
  observeProgress.observe(container);
});

// Testimonials carousel
const track = document.querySelector(".testimonial-track");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
let currentIndex = 0;

const moveCarousel = (direction) => {
  const cards = document.querySelectorAll(".testimonial-card");
  const cardWidth = cards[0].offsetWidth + 32;
  currentIndex = Math.max(
    0,
    Math.min(currentIndex + direction, cards.length - 1)
  );
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
};

prevBtn?.addEventListener("click", () => moveCarousel(-1));
nextBtn?.addEventListener("click", () => moveCarousel(1));

// Initialize vanilla-tilt for 3D cards
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.5,
});

// Testimonial slider
const testimonials = document.querySelectorAll(".mentor-quote");
const dots = document.querySelector(".slider-dots");

testimonials.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.classList.add("slider-dot");
  dot.addEventListener("click", () => showTestimonial(index));
  dots.appendChild(dot);
});

function showTestimonial(index) {
  testimonials.forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".slider-dot")
    .forEach((d) => d.classList.remove("active"));
  testimonials[index].classList.add("active");
  dots.children[index].classList.add("active");
}

// Auto-rotate testimonials
let currentTestimonial = 0;
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 5000);

// Reveal text animation
const revealText = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
};

const textObserver = new IntersectionObserver(revealText, {
  threshold: 0.5,
  rootMargin: "0px",
});

document.querySelectorAll(".reveal-text").forEach((text) => {
  text.style.opacity = 0;
  text.style.transform = "translateY(20px)";
  textObserver.observe(text);
});

// Initialize 3D tilt effect
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
  max: 25,
  speed: 400,
  glare: true,
  "max-glare": 0.5,
  scale: 1.1,
});

// Time capsule hover effect
document.querySelectorAll(".time-capsule").forEach((capsule) => {
  capsule.addEventListener("mousemove", (e) => {
    const rect = capsule.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    capsule.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  capsule.addEventListener("mouseleave", () => {
    capsule.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  });
});

// Progress ring animation
document.querySelectorAll(".progress-ring-circle").forEach((circle) => {
  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = circumference;

  function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }

  // Animate on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setProgress(75); // Example progress value
      }
    });
  });

  observer.observe(circle);
});

// Floating elements parallax
document.addEventListener("mousemove", (e) => {
  const elements = document.querySelectorAll(".element");
  elements.forEach((element, index) => {
    const speed = (index + 1) * 0.05;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    element.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
});

// Timeline scroll animation
const milestones = document.querySelectorAll(".milestone");
let currentMilestoneIndex = 0;

const animateTimeline = () => {
  milestones.forEach((milestone, index) => {
    const offset = (index - currentMilestoneIndex) * 60;
    const translateY = index * 150;
    const translateZ = Math.abs(offset) * -10;
    const opacity = 1 - Math.abs(offset) / 400;

    milestone.style.transform = `translateY(${translateY}px) translateZ(${translateZ}px)`;
    milestone.style.opacity = opacity;
  });
};

// Initialize timeline positions
animateTimeline();

// Scroll-based timeline animation
window.addEventListener("scroll", () => {
  const timelineSection = document.querySelector(".story-timeline");
  const rect = timelineSection.getBoundingClientRect();
  const scrollProgress =
    (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

  currentMilestoneIndex = Math.min(
    Math.max(Math.floor(scrollProgress * milestones.length), 0),
    milestones.length - 1
  );

  animateTimeline();
});

// Parallax effect for floating elements
document.addEventListener("mousemove", (e) => {
  const elements = document.querySelectorAll(".floating-tech-element");
  elements.forEach((element) => {
    const speed = parseFloat(element.dataset.speed);
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;

    element.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// Initialize 3D tilt effect for milestone cards
VanillaTilt.init(document.querySelectorAll(".milestone-card"), {
  max: 15,
  speed: 400,
  scale: 1.05,
  glare: true,
  "max-glare": 0.3,
});

// Milestone cards hover effect
document.querySelectorAll(".milestone-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateZ(50px)";
    const otherCards = document.querySelectorAll(".milestone-card:not(:hover)");
    otherCards.forEach((other) => {
      other.style.opacity = "0.7";
    });
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateZ(0)";
    const otherCards = document.querySelectorAll(".milestone-card");
    otherCards.forEach((other) => {
      other.style.opacity = "1";
    });
  });
});

// Initialize tilt effect for service cards
VanillaTilt.init(document.querySelectorAll(".service-card"), {
  max: 10,
  speed: 400,
  glare: true,
  "max-glare": 0.3,
  scale: 1.02,
});

// Floating elements parallax in service section
document.addEventListener("mousemove", (e) => {
  const elements = document.querySelectorAll(".tech-element, .design-element");
  elements.forEach((element) => {
    const speed = element.dataset.speed;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    element.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// Price animation on scroll
const priceElements = document.querySelectorAll(".amount");
const animatePrice = (element) => {
  const targetPrice = parseInt(element.textContent.replace(/\D/g, ""));
  let currentPrice = 0;
  const duration = 1500;
  const increment = targetPrice / (duration / 16);

  const updatePrice = () => {
    if (currentPrice < targetPrice) {
      currentPrice += increment;
      element.textContent = `$${Math.floor(currentPrice)}`;
      requestAnimationFrame(updatePrice);
    } else {
      element.textContent = `$${targetPrice}`;
    }
  };

  updatePrice();
};

// Observe price elements
const priceObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animatePrice(entry.target);
        priceObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

priceElements.forEach((element) => priceObserver.observe(element));

// Parallax effect for retreat background
const retreatBg = document.querySelector(".retreat-bg");
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  retreatBg.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Calendar functionality
class Calendar {
  constructor(container) {
    this.container = container;
    this.date = new Date();
    this.selectedDate = null;
    this.render();
  }

  render() {
    const year = this.date.getFullYear();
    const month = this.date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const grid = this.container.querySelector(".calendar-grid");
    grid.innerHTML = "";

    // Add days
    for (let i = 0; i < firstDay; i++) {
      grid.appendChild(this.createDay(""));
    }

    for (let day = 1; day <= daysInMonth; day++) {
      grid.appendChild(this.createDay(day));
    }
  }

  createDay(content) {
    const day = document.createElement("div");
    day.className = "calendar-day";
    day.textContent = content;
    if (content) {
      day.addEventListener("click", () => this.selectDate(content));
    }
    return day;
  }

  selectDate(day) {
    const selected = this.container.querySelector(".selected");
    if (selected) selected.classList.remove("selected");

    const newSelected = this.container.querySelector(
      `.calendar-day:not(:empty):nth-child(${day + this.date.getDay()})`
    );
    if (newSelected) {
      newSelected.classList.add("selected");
      this.selectedDate = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        day
      );
    }
  }
}

// Initialize calendar
const calendarContainer = document.querySelector(".calendar-wrapper");
if (calendarContainer) {
  const calendar = new Calendar(calendarContainer);

  // Calendar navigation
  document.querySelector(".prev-month")?.addEventListener("click", () => {
    calendar.date.setMonth(calendar.date.getMonth() - 1);
    calendar.render();
  });

  document.querySelector(".next-month")?.addEventListener("click", () => {
    calendar.date.setMonth(calendar.date.getMonth() + 1);
    calendar.render();
  });
}

// Gallery item hover effect
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    const rect = item.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    item.style.transform = `
            perspective(1000px)
            rotateY(${x * 20}deg)
            rotateX(${-y * 20}deg)
            translateZ(50px)
        `;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform =
      "perspective(1000px) rotateY(0) rotateX(0) translateZ(0)";
  });
});

// Ambient particles
const createParticles = () => {
  const particles = document.querySelector(".ambient-particles");
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.setProperty("--speed", Math.random() * 10 + 5 + "s");
    particle.style.setProperty("--size", Math.random() * 3 + 1 + "px");
    particles.appendChild(particle);
  }
};

createParticles();
