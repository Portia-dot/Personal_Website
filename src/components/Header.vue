<template>
  <header class="header">
    <nav class="nav">
      <div class="nav-brand">
        <router-link to="/" class="nav-logo">MO</router-link>
      </div>
      <div class="nav-menu" :class="{ active: isNavOpen }" id="nav-menu">
        <router-link to="/" class="nav-link" @click="closeNav"
          >Home</router-link
        >
        <router-link to="/about" class="nav-link" @click="closeNav"
          >About</router-link
        >
        <router-link to="/projects" class="nav-link" @click="closeNav"
          >Projects</router-link
        >
        <router-link to="/library" class="nav-link" @click="closeNav"
          >Library</router-link
        >
        <a
          href="/Modamori Oluwayomi Curriculum vitae.pdf"
          class="nav-link"
          target="_blank"
          @click="closeNav"
          >CV</a
        >
      </div>
      <div class="nav-social">
        <a
          href="https://github.com/portia-dot"
          class="social-link"
          aria-label="GitHub"
        >
          <i class="fab fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/modamori/"
          class="social-link"
          aria-label="LinkedIn"
        >
          <i class="fab fa-linkedin"></i>
        </a>
        <a
          href="https://scholar.google.ca/citations?user=ElEms3kAAAAJ&hl=en"
          class="social-link"
          aria-label="Google Scholar"
        >
          <i class="fas fa-graduation-cap"></i>
        </a>
      </div>
      <div class="nav-toggle" @click="toggleNav">
        <span class="hamburger"></span>
        <span class="hamburger"></span>
        <span class="hamburger"></span>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isNavOpen: false,
    };
  },
  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
      document.body.style.overflow = this.isNavOpen ? "hidden" : "";
    },
    closeNav() {
      this.isNavOpen = false;
      document.body.style.overflow = "";
    },
  },
  mounted() {
    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        this.isNavOpen &&
        !e.target.closest(".nav-menu") &&
        !e.target.closest(".nav-toggle")
      ) {
        this.closeNav();
      }
    });

    // Close mobile menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isNavOpen) {
        this.closeNav();
      }
    });
  },
};
</script>

