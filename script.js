// ===== GLOBAL VARIABLES =====
let isNavOpen = false;
let isDragging = false;
let currentModel = "transformer";

// ===== DOM ELEMENTS =====
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const backToTop = document.getElementById("back-to-top");

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", function () {
  initializeNavigation();
  initializeBackToTop();
  initializeContactForm();
  initializeThemeToggle();
  // Avoid duplicate rendering if Vue app is active
  if (!window.__VUE_APP_ACTIVE__) {
    loadContent();
  }
  initializeMathJax();
  initializeCodeHighlighting();
});

// ===== NAVIGATION =====
function initializeNavigation() {
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", toggleNavigation);

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          closeNavigation();
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        isNavOpen &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeNavigation();
      }
    });
  }
}

function toggleNavigation() {
  if (isNavOpen) {
    closeNavigation();
  } else {
    openNavigation();
  }
}

function openNavigation() {
  navMenu.classList.add("active");
  navToggle.classList.add("active");
  isNavOpen = true;
  document.body.style.overflow = "hidden";
}

function closeNavigation() {
  navMenu.classList.remove("active");
  navToggle.classList.remove("active");
  isNavOpen = false;
  document.body.style.overflow = "";
}

// ===== BACK TO TOP =====
function initializeBackToTop() {
  if (backToTop) {
    backToTop.addEventListener("click", scrollToTop);

    // Show/hide back to top button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTop.style.opacity = "1";
        backToTop.style.visibility = "visible";
      } else {
        backToTop.style.opacity = "0";
        backToTop.style.visibility = "hidden";
      }
    });
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ===== IMAGE COMPARISON SLIDER =====
function initializeImageComparison() {
  const comparisonContainer = document.querySelector(".comparison-container");
  const slider = document.querySelector(".comparison-slider");
  const afterImage = document.querySelector(".comparison-after");

  if (!comparisonContainer || !slider || !afterImage) return;

  let isDragging = false;

  function updateSliderPosition(x) {
    const rect = comparisonContainer.getBoundingClientRect();
    const percentage = Math.max(
      0,
      Math.min(100, ((x - rect.left) / rect.width) * 100)
    );

    slider.style.left = percentage + "%";
    afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
  }

  function handleMouseDown(e) {
    isDragging = true;
    updateSliderPosition(e.clientX);
    e.preventDefault();
  }

  function handleMouseMove(e) {
    if (isDragging) {
      updateSliderPosition(e.clientX);
    }
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function handleTouchStart(e) {
    isDragging = true;
    updateSliderPosition(e.touches[0].clientX);
    e.preventDefault();
  }

  function handleTouchMove(e) {
    if (isDragging) {
      updateSliderPosition(e.touches[0].clientX);
    }
  }

  function handleTouchEnd() {
    isDragging = false;
  }

  // Mouse events
  slider.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  // Touch events
  slider.addEventListener("touchstart", handleTouchStart);
  document.addEventListener("touchmove", handleTouchMove);
  document.addEventListener("touchend", handleTouchEnd);

  // Click on container to move slider
  comparisonContainer.addEventListener("click", (e) => {
    if (!isDragging) {
      updateSliderPosition(e.clientX);
    }
  });
}

// ===== VIDEO CONTROLS =====
function initializeVideoControls() {
  const video = document.querySelector(".demo-video");
  const videoButtons = document.querySelectorAll(".video-btn");

  if (!video || !videoButtons.length) return;

  videoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const speed = parseFloat(button.dataset.speed);
      video.playbackRate = speed;

      // Update active button
      videoButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
}

// ===== MODEL SELECTOR =====
function initializeModelSelector() {
  const modelSelect = document.getElementById("model-select");
  const modelImage = document.getElementById("model-image");
  const accuracyElement = document.getElementById("accuracy");
  const parametersElement = document.getElementById("parameters");
  const flopsElement = document.getElementById("flops");

  if (!modelSelect) return;

  const modelData = {
    transformer: {
      image:
        "https://via.placeholder.com/400x300/495057/ffffff?text=Vision+Transformer",
      accuracy: "94.2%",
      parameters: "86M",
      flops: "17.6B",
    },
    resnet: {
      image: "https://via.placeholder.com/400x300/6c757d/ffffff?text=ResNet-50",
      accuracy: "92.1%",
      parameters: "25M",
      flops: "4.1B",
    },
    efficientnet: {
      image:
        "https://via.placeholder.com/400x300/28a745/ffffff?text=EfficientNet-B7",
      accuracy: "95.3%",
      parameters: "66M",
      flops: "37B",
    },
    vit: {
      image: "https://via.placeholder.com/400x300/dc3545/ffffff?text=ViT-Large",
      accuracy: "96.1%",
      parameters: "307M",
      flops: "61B",
    },
  };

  modelSelect.addEventListener("change", (e) => {
    const selectedModel = e.target.value;
    const data = modelData[selectedModel];

    if (data) {
      if (modelImage) {
        modelImage.src = data.image;
        modelImage.alt = selectedModel;
      }
      if (accuracyElement) accuracyElement.textContent = data.accuracy;
      if (parametersElement) parametersElement.textContent = data.parameters;
      if (flopsElement) flopsElement.textContent = data.flops;
    }
  });
}

// ===== THEME TOGGLE =====
function initializeThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  if (!themeToggle || !themeIcon) return;

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById("theme-icon");
  const themeToggle = document.getElementById("theme-toggle");

  if (theme === "dark") {
    themeIcon.className = "fas fa-sun";
    themeToggle.classList.add("dark");
  } else {
    themeIcon.className = "fas fa-moon";
    themeToggle.classList.remove("dark");
  }
}

// ===== CONTACT FORM =====
function initializeContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", handleContactFormSubmit);
  }
}

function handleContactFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  // Simple form validation
  if (!data.name || !data.email || !data.message) {
    showNotification("Please fill in all fields.", "error");
    return;
  }

  if (!isValidEmail(data.email)) {
    showNotification("Please enter a valid email address.", "error");
    return;
  }

  // Simulate form submission
  showNotification(
    "Thank you for your message! I'll get back to you soon.",
    "success"
  );
  e.target.reset();
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "1rem 1.5rem",
    borderRadius: "6px",
    color: "white",
    fontWeight: "500",
    zIndex: "10000",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
    maxWidth: "300px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  });

  // Set background color based on type
  const colors = {
    success: "#28a745",
    error: "#dc3545",
    info: "#17a2b8",
    warning: "#ffc107",
  };
  notification.style.backgroundColor = colors[type] || colors.info;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// ===== CONTENT LOADING =====
async function loadContent() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();

    loadFeaturedProjects(data.projects);
    loadPublications(data.publications);
    loadAllProjects(data.projects);
  } catch (error) {
    console.error("Error loading content:", error);
    // Fallback content if data.json is not available
    loadFallbackContent();
  }
}

function loadFeaturedProjects(projects) {
  const container = document.getElementById("featured-projects");

  if (!container || !projects) return;

  const featuredProjects = projects.slice(0, 3);

  container.innerHTML = featuredProjects
    .map(
      (project) => `
        <div class="project-card">
            ${
              project.status
                ? `<span class="project-status ${project.status
                    .toLowerCase()
                    .replace(" ", "-")}">${project.status}</span>`
                : ""
            }
            <img src="${project.thumbnail}" alt="${
        project.title
      }" class="project-thumbnail">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <a href="projects.html#${project.id}" class="project-link">
                Read More <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `
    )
    .join("");
}

function loadPublications(publications) {
  const recentContainer = document.getElementById("recent-publications");
  const allContainer = document.getElementById("publications-list");

  if (recentContainer && publications) {
    const recentPubs = publications.slice(0, 3);
    recentContainer.innerHTML = recentPubs
      .map((pub) => createPublicationHTML(pub))
      .join("");
  }

  if (allContainer && publications) {
    allContainer.innerHTML = publications
      .map((pub) => createPublicationHTML(pub))
      .join("");
  }
}

function createPublicationHTML(publication) {
  const statusBadge = publication.status
    ? `<span class="status-badge ${publication.status
        .toLowerCase()
        .replace(" ", "-")}">${publication.status}</span>`
    : "";
  const description = publication.description || publication.abstract || "";

  return `
        <div class="publication-item">
            <h3 class="publication-title">
                ${
                  publication.doi
                    ? `<a href="${publication.doi}" target="_blank">${publication.title}</a>`
                    : publication.title
                }
                ${statusBadge}
            </h3>
            <p class="publication-authors">${publication.authors}</p>
            <p class="publication-venue">${publication.venue} (${
    publication.year
  })</p>
            ${
              description
                ? `<p class="publication-description">${description}</p>`
                : ""
            }
            <div class="publication-keywords">
                ${publication.keywords
                  .map(
                    (keyword) => `<span class="keyword-tag">${keyword}</span>`
                  )
                  .join("")}
            </div>
        </div>
    `;
}

function loadAllProjects(projects) {
  const container = document.getElementById("projects-grid");

  if (!container || !projects) return;

  container.innerHTML = projects
    .map(
      (project) => `
        <div class="project-detail" id="${project.id}">
            ${
              project.status
                ? `<div class="project-status ${project.status
                    .toLowerCase()
                    .replace(" ", "-")}">${project.status}</div>`
                : ""
            }
            <img src="${project.thumbnail}" alt="${
        project.title
      }" class="project-thumbnail">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            ${
              project.techStack
                ? `<div class="tech-stack">
                    <h4>Technologies:</h4>
                    <div class="tech-tags">
                      ${project.techStack
                        .map((tech) => `<span class="tech-tag">${tech}</span>`)
                        .join("")}
                    </div>
                   </div>`
                : ""
            }
            ${
              project.results && project.status !== "In Progress"
                ? createResultsTable(project.results)
                : ""
            }
        </div>
    `
    )
    .join("");
}

function createResultsTable(results) {
  if (!results || !results.length) return "";

  const headers = Object.keys(results[0]);

  return `
        <table class="results-table">
            <thead>
                <tr>
                    ${headers.map((header) => `<th>${header}</th>`).join("")}
                </tr>
            </thead>
            <tbody>
                ${results
                  .map(
                    (row) => `
                    <tr>
                        ${headers
                          .map((header) => `<td>${row[header]}</td>`)
                          .join("")}
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
    `;
}

function loadFallbackContent() {
  // Fallback content when data.json is not available
  const fallbackProjects = [
    {
      id: "spiral-optimization",
      title: "Spiral Optimization Framework",
      description:
        "Development of spiral-enhanced metaheuristic algorithms for feature selection and optimization in imbalanced wildfire and environmental datasets.",
      thumbnail:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center",
    },
    {
      id: "simulation-rl",
      title: "Simulation-Driven Reinforcement Learning",
      description:
        "Design of multi-fidelity simulation environments that bridge physical data and AI models, improving generalization and decision-making in safety-critical domains.",
      thumbnail:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center",
    },
    {
      id: "vision-language",
      title: "Vision-Language Grounding for Environmental AI",
      description:
        "Exploration of multimodal models integrating satellite imagery and textual reports through large language models for explainable geospatial reasoning.",
      thumbnail:
        "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=250&fit=crop&crop=center",
    },
  ];

  loadFeaturedProjects(fallbackProjects);
}

// ===== MATHJAX INITIALIZATION =====
function initializeMathJax() {
  if (window.MathJax) {
    MathJax.typesetPromise();
  }
}

// ===== CODE HIGHLIGHTING =====
function initializeCodeHighlighting() {
  if (window.hljs) {
    hljs.highlightAll();
  }
}

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.addEventListener("click", (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const targetId = e.target.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
});

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".project-card, .publication-item, .timeline-item"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeScrollAnimations);

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ===== RESPONSIVE HANDLING =====
function handleResize() {
  if (window.innerWidth > 768 && isNavOpen) {
    closeNavigation();
  }
}

window.addEventListener("resize", debounce(handleResize, 250));

// ===== ACCESSIBILITY IMPROVEMENTS =====
document.addEventListener("keydown", (e) => {
  // Close mobile menu with Escape key
  if (e.key === "Escape" && isNavOpen) {
    closeNavigation();
  }

  // Handle Enter key on custom buttons
  if (e.key === "Enter" && e.target.classList.contains("back-to-top")) {
    scrollToTop();
  }
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy load images
function initializeLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", initializeLazyLoading);
