<template>
  <footer class="footer">
    <div class="container-main">
      <div class="footer-content">
        <p>&copy; 2025 Modamori Oluwayomi</p>
        <a href="https://github.com/portia-dot" class="footer-link">GitHub</a>
        <a href="https://www.linkedin.com/in/modamori/" class="footer-link"
          >LinkedIn</a
        >
        <button
          class="back-to-top"
          @click="scrollToTop"
          aria-label="Back to top"
          :style="{
            opacity: showBackToTop ? '1' : '0',
            visibility: showBackToTop ? 'visible' : 'hidden',
          }"
        >
          <i class="fas fa-arrow-up"></i>
        </button>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      showBackToTop: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.showBackToTop = window.pageYOffset > 300;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>


