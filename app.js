// Vue 3 Progressive Enhancement for Personal Website
const hasVue = typeof window !== "undefined" && !!window.Vue;

if (hasVue) {
  const { createApp } = Vue;

  createApp({
    data() {
      return {
        loading: true,
        error: null,
        projects: [],
        publications: [],
      };
    },
    computed: {
      featuredProjects() {
        return this.projects.slice(0, 3);
      },
      recentPublications() {
        return this.publications.slice(0, 3);
      },
    },
    async mounted() {
      try {
        const resp = await fetch("data.json", { cache: "no-store" });
        const data = await resp.json();
        this.projects = Array.isArray(data.projects) ? data.projects : [];
        this.publications = Array.isArray(data.publications)
          ? data.publications
          : [];
      } catch (e) {
        this.error = "Failed to load data.";
      } finally {
        this.loading = false;
      }
    },
  }).mount("#app");
}

// Expose flag for legacy script to avoid duplicate rendering
window.__VUE_APP_ACTIVE__ = hasVue;

