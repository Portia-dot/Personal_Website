<template>
  <div v-cloak>
    <!-- Library Hero -->
    <section class="library-hero">
      <div class="container-main">
        <h1 class="page-title">Personal Library</h1>
        <p class="page-subtitle">
          Books that have shaped my understanding of AI, technology,
          neuroscience, and human behavior
        </p>
      </div>
    </section>

    <!-- AI & Technical Development -->
    <section class="library-section">
      <div class="container-main">
        <h2 class="section-title">AI & Technical Development</h2>
        <div class="books-grid">
          <div class="book-card" v-for="book in aiBooks" :key="book.title">
            <div class="book-cover">
              <i :class="book.icon"></i>
            </div>
            <div class="book-info">
              <h3 class="book-title">{{ book.title }}</h3>
              <p class="book-author">{{ book.author }}</p>
              <p class="book-description">{{ book.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Neuroscience & Cognitive Modeling -->
    <section class="library-section">
      <div class="container-main">
        <h2 class="section-title">Neuroscience & Cognitive Modeling</h2>
        <div class="books-grid">
          <div
            class="book-card"
            v-for="book in neuroscienceBooks"
            :key="book.title"
          >
            <div class="book-cover">
              <i :class="book.icon"></i>
            </div>
            <div class="book-info">
              <h3 class="book-title">{{ book.title }}</h3>
              <p class="book-author">{{ book.author }}</p>
              <p class="book-description">{{ book.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Human Behavior & Mastery -->
    <section class="library-section">
      <div class="container-main">
        <h2 class="section-title">Human Behavior & Mastery</h2>
        <div class="books-grid">
          <div
            class="book-card"
            v-for="book in behaviorBooks"
            :key="book.title"
          >
            <div class="book-cover">
              <i :class="book.icon"></i>
            </div>
            <div class="book-info">
              <h3 class="book-title">{{ book.title }}</h3>
              <p class="book-author">{{ book.author }}</p>
              <p class="book-description">{{ book.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Library",
  data() {
    return {
      aiBooks: [
        {
          title: "Hands-On Machine Learning with Scikit-Learn, Keras & PyTorch",
          author: "Aurélien Géron",
          description:
            "Comprehensive guide to machine learning with practical implementations using popular Python frameworks.",
          icon: "fas fa-book",
        },
        {
          title: "Hands-On Large Language Models",
          author: "Emmanuel Ameisen et al.",
          description:
            "Practical guide to building and deploying large language models for real-world applications.",
          icon: "fas fa-book",
        },
        {
          title: "Learning Python (6th Edition)",
          author: "Mark Lutz",
          description:
            "Comprehensive Python programming guide covering both fundamentals and advanced concepts.",
          icon: "fas fa-book",
        },
      ],
      neuroscienceBooks: [
        {
          title: "Computational Neuroscience",
          author: "Diana Ivanova Stephanova & Bozhidar Dimitrov Kolev",
          description:
            "Mathematical and computational approaches to understanding neural systems and brain function.",
          icon: "fas fa-brain",
        },
        {
          title: "The Neuroscience of Memory",
          author: "Sherrie D. All, PhD",
          description:
            "Understanding how memory works in the brain and its implications for learning and cognition.",
          icon: "fas fa-brain",
        },
      ],
      behaviorBooks: [
        {
          title: "Behave: The Biology of Humans at Our Best and Worst",
          author: "Robert Sapolsky",
          description:
            "Comprehensive exploration of human behavior from biological, psychological, and social perspectives.",
          icon: "fas fa-user",
        },
        {
          title: "Mastery",
          author: "Robert Greene",
          description:
            "Strategies and principles for achieving mastery in any field through deliberate practice and persistence.",
          icon: "fas fa-user",
        },
        {
          title: "The 50th Law",
          author: "Robert Greene & 50 Cent",
          description:
            "Lessons on fearlessness, power, and success from the intersection of ancient wisdom and modern street smarts.",
          icon: "fas fa-user",
        },
      ],
    };
  },
};
</script>

