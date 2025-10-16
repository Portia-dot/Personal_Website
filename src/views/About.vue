<template>
  <div v-cloak>
    <!-- About Hero -->
    <section class="about-hero">
      <div class="container-large">
        <div class="about-intro">
          <div class="about-photo">
            <img
              src="/image.png"
              alt="Modamori Oluwayomi"
              class="profile-img"
            />
          </div>
          <div class="about-text">
            <h1 class="page-title">About Me</h1>
            <p class="about-description">
              I am a Machine Learning and Geospatial Researcher interested in
              building intelligent systems that connect simulation, computer
              vision, and large language models. My work focuses on how AI can
              learn from structured environmental data and simulated worlds to
              improve decision-making and perception in complex, real-world
              systems.
            </p>
            <p class="about-description">
              My research journey began during my MSc in Environmental Science
              (Data Science Specialization) at Thompson Rivers University, where
              I developed metaheuristic and spiral-based optimization algorithms
              for wildfire prediction across Canadian provinces. This work
              advanced feature selection in imbalanced datasets and contributed
              to the understanding of how AI can model spatial and temporal risk
              patterns.
            </p>
            <p class="about-description">
              Currently, I am exploring how simulation-driven learning,
              vision-based perception, and language-guided reasoning can
              converge to create adaptive and interpretable AI systems.
              <strong
                >I aim to continue this trajectory through a PhD or MSc-PhD
                program in Computer Science or Artificial Intelligence, focusing
                on multi-fidelity simulation, vision-language models, and
                generative world modeling for autonomous and scientific
                applications.</strong
              >
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="timeline-section">
      <div class="container-main">
        <h2 class="section-title">Education & Experience</h2>
        <div class="timeline">
          <div
            class="timeline-item"
            v-for="(item, index) in timeline"
            :key="index"
          >
            <div class="timeline-date">{{ item.period }}</div>
            <div class="timeline-content">
              <h3>{{ item.title }}</h3>
              <p class="timeline-location">{{ item.location }}</p>
              <ul class="timeline-details">
                <li v-for="detail in item.details" :key="detail">
                  {{ detail }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section class="skills-section">
      <div class="container-main">
        <h2 class="section-title">Technical Skills</h2>
        <div class="skills-grid">
          <div
            class="skill-category"
            v-for="(skills, category) in skillCategories"
            :key="category"
          >
            <h3>{{ category }}</h3>
            <div class="skill-tags">
              <span class="skill-tag" v-for="skill in skills" :key="skill">{{
                skill
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section class="contact-section">
      <div class="container-main">
        <h2 class="section-title">Get In Touch</h2>
        <div class="contact-content">
          <div class="contact-info">
            <p class="contact-text">
              I'm always interested in discussing new research opportunities,
              collaborations, or just chatting about the latest developments in
              AI/ML.
            </p>
            <div class="contact-methods">
              <a href="mailto:modamorio21@mytru.ca" class="contact-method">
                <i class="fas fa-envelope"></i>
                modamorio21@mytru.ca
              </a>
              <a
                href="https://www.linkedin.com/in/modamori/"
                class="contact-method"
              >
                <i class="fab fa-linkedin"></i>
                LinkedIn Profile
              </a>
              <a href="https://github.com/portia-dot" class="contact-method">
                <i class="fab fa-github"></i>
                GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      timeline: [
        {
          period: "2025 - Present",
          title: "Machine Learning & Geospatial Researcher",
          location: "Independent Research",
          details: [
            "Exploring simulation-driven learning and vision-language models",
            "Developing multi-fidelity simulation approaches",
            "Working on generative world modeling for autonomous systems",
          ],
        },
        {
          period: "2022 - 2025",
          title: "MSc in Environmental Science",
          location: "Thompson Rivers University",
          details: [
            "Specialization: Data Science",
            "Developed metaheuristic optimization algorithms for wildfire prediction",
            "Advanced feature selection in imbalanced datasets",
            "Research across Canadian provinces",
          ],
        },
        {
          period: "2020 - 2022",
          title: "Research Assistant",
          location: "Thompson Rivers University",
          details: [
            "Wildfire prediction and risk assessment",
            "Spatial and temporal pattern analysis",
            "Environmental data modeling",
          ],
        },
      ],
      skillCategories: {
        "Machine Learning": [
          "Metaheuristic Algorithms",
          "Feature Selection",
          "Imbalanced Datasets",
          "Optimization",
          "Spiral-based Methods",
          "Large Language Models",
        ],
        "Geospatial & Environmental": [
          "Wildfire Prediction",
          "Spatial Analysis",
          "Temporal Modeling",
          "Risk Assessment",
          "Environmental Data",
          "ArcGIS",
        ],
        "Computer Vision & Simulation": [
          "Vision-Language Models",
          "Simulation-driven Learning",
          "Multi-fidelity Simulation",
          "Generative World Modeling",
          "Perception Systems",
        ],
        "Programming & Tools": [
          "Python",
          "R",
          "Jupyter",
          "Git",
          "LaTeX",
          "Power BI",
        ],
      },
    };
  },
};
</script>


