<template>
  <div v-cloak>
    <!-- Projects Hero -->
    <section class="projects-hero">
      <div class="container-main">
        <h1 class="page-title">Research & Projects</h1>
        <p class="page-subtitle">
          Exploring the frontiers of artificial intelligence through innovative
          research and practical applications
        </p>
      </div>
    </section>

    <!-- Publications Section -->
    <section class="publications-section">
      <div class="container-main">
        <h2 class="section-title">Publications</h2>
        <div class="publications-list" v-if="!loading">
          <div
            class="publication-item"
            v-for="pub in publications"
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
      </div>
    </section>

    <!-- Projects Section -->
    <section class="projects-section">
      <div class="container-main">
        <h2 class="section-title">Research Projects</h2>
        <div class="projects-grid" v-if="!loading">
          <div
            class="project-detail"
            v-for="project in projects"
            :id="project.id"
            :key="project.id"
          >
            <div
              class="project-status"
              :class="
                project.status
                  ? project.status.toLowerCase().replace(' ', '-')
                  : ''
              "
              v-if="project.status"
            >
              {{ project.status }}
            </div>
            <img
              :src="project.thumbnail"
              :alt="project.title"
              class="project-thumbnail"
            />
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <div
              class="tech-stack"
              v-if="project.techStack && project.techStack.length"
            >
              <h4>Technologies:</h4>
              <div class="tech-tags">
                <span
                  class="tech-tag"
                  v-for="tech in project.techStack"
                  :key="tech"
                  >{{ tech }}</span
                >
              </div>
            </div>
            <table
              class="results-table"
              v-if="
                project.results &&
                project.results.length &&
                project.status !== 'In Progress'
              "
            >
              <thead>
                <tr>
                  <th v-for="(value, key) in project.results[0]" :key="key">
                    {{ key }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in project.results" :key="index">
                  <td v-for="(value, key) in row" :key="key">{{ value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="loading" class="loading">Loading projects...</div>
      </div>
    </section>
  </div>
</template>

<script>
import { dataService } from "../services/dataService.js";

export default {
  name: "Projects",
  data() {
    return {
      loading: true,
      projects: [],
      publications: [],
    };
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

