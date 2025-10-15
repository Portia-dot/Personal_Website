<template>
  <div id="app">
    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="main">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Theme Toggle Button -->
    <button
      class="theme-toggle"
      @click="toggleTheme"
      :aria-label="`Toggle theme`"
    >
      <i :class="themeIcon"></i>
    </button>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      theme: "light",
    };
  },
  computed: {
    themeIcon() {
      return this.theme === "dark" ? "fas fa-sun" : "fas fa-moon";
    },
  },
  mounted() {
    // Load saved theme or default to light
    this.theme = localStorage.getItem("theme") || "light";
    this.applyTheme();
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
      this.applyTheme();
      localStorage.setItem("theme", this.theme);
    },
    applyTheme() {
      document.documentElement.setAttribute("data-theme", this.theme);
    },
  },
};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>

