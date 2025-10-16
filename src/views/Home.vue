<template>
  <div v-cloak>
    <!-- Hero Section -->
    <section class="hero">
      <div class="container-main">
        <h1 class="hero-title">Modamori Oluwayomi Felix</h1>
        <p class="hero-subtitle">
          Machine Learning & Geospatial Researcher | Data Analyst
        </p>
        <p class="hero-bio">
          Exploring intelligent systems that connect simulation, computer
          vision, and large language models to real-world environmental and
          autonomous applications. My work spans geospatial analytics,
          metaheuristic optimization, and reinforcement learning, focusing on
          building interpretable and efficient AI systems for risk prediction,
          simulation-based reasoning, and decision intelligence.
        </p>
        <router-link to="/projects" class="btn btn-primary"
          >View Projects</router-link
        >
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="featured-projects">
      <div class="container-main">
        <h2 class="section-title">Featured Research</h2>
        <div class="grid-columns-3" v-if="!loading">
          <div
            class="project-card"
            v-for="project in featuredProjects"
            :key="project.id"
          >
            <span
              class="project-status"
              :class="
                project.status
                  ? project.status.toLowerCase().replace(' ', '-')
                  : ''
              "
              v-if="project.status"
            >
              {{ project.status }}
            </span>
            <img
              :src="project.thumbnail"
              :alt="project.title"
              class="project-thumbnail"
            />
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <router-link :to="`/projects#${project.id}`" class="project-link">
              Read More <i class="fas fa-arrow-right"></i>
            </router-link>
          </div>
        </div>
        <div v-if="loading" class="loading">Loading projects...</div>
      </div>
    </section>

    <!-- Recent Publications -->
    <section class="recent-publications">
      <div class="container-main">
        <h2 class="section-title">Recent Publications</h2>
        <div class="publications-list" v-if="!loading">
          <div
            class="publication-item"
            v-for="pub in recentPublications"
            :key="pub.title"
          >
            <h3 class="publication-title">
              <a v-if="pub.doi" :href="pub.doi" target="_blank">{{
                pub.title
              }}</a>
              <span v-else>{{ pub.title }}</span>
              <span
                class="status-badge"
                :class="
                  pub.status ? pub.status.toLowerCase().replace(' ', '-') : ''
                "
                v-if="pub.status"
              >
                {{ pub.status }}
              </span>
            </h3>
            <p class="publication-authors">{{ pub.authors }}</p>
            <p class="publication-venue">{{ pub.venue }} ({{ pub.year }})</p>
            <p class="publication-description" v-if="pub.description">
              {{ pub.description }}
            </p>
            <div class="publication-keywords">
              <span class="keyword-tag" v-for="kw in pub.keywords" :key="kw">{{
                kw
              }}</span>
            </div>
          </div>
        </div>
        <div v-if="loading" class="loading">Loading publications...</div>
        <div class="text-center">
          <router-link to="/projects" class="btn btn-outline"
            >View All Publications</router-link
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { dataService } from "../services/dataService.js";

export default {
  name: "Home",
  data() {
    return {
      loading: true,
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
      const data = await dataService.getData();
      this.projects = data.projects || [];
      this.publications = data.publications || [];
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      this.loading = false;
    }
  },
};
</script>


