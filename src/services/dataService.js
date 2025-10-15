// Data service for fetching and managing application data
class DataService {
  constructor() {
    this.cache = null;
    this.cacheTime = null;
    this.cacheDuration = 5 * 60 * 1000; // 5 minutes
  }

  async getData() {
    // Return cached data if still valid
    if (
      this.cache &&
      this.cacheTime &&
      Date.now() - this.cacheTime < this.cacheDuration
    ) {
      return this.cache;
    }

    try {
      const response = await fetch("/data.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Cache the data
      this.cache = data;
      this.cacheTime = Date.now();

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      // Return fallback data if fetch fails
      return this.getFallbackData();
    }
  }

  getFallbackData() {
    return {
      projects: [
        {
          id: "spiral-optimization",
          title: "Spiral Optimization Framework",
          description:
            "Development of spiral-enhanced metaheuristic algorithms for feature selection and optimization in imbalanced wildfire and environmental datasets.",
          thumbnail:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center",
          techStack: ["Python", "NumPy", "Scikit-learn", "Matplotlib"],
          results: [
            {
              Algorithm: "Spiral-Enhanced",
              Accuracy: "94.2%",
              "F1-Score": "0.91",
              "Time (s)": "2.3",
            },
            {
              Algorithm: "PSO",
              Accuracy: "89.1%",
              "F1-Score": "0.85",
              "Time (s)": "1.8",
            },
            {
              Algorithm: "GA",
              Accuracy: "87.3%",
              "F1-Score": "0.82",
              "Time (s)": "3.1",
            },
          ],
        },
        {
          id: "simulation-rl",
          title: "Simulation-Driven Reinforcement Learning",
          description:
            "Design of multi-fidelity simulation environments that bridge physical data and AI models, improving generalization and decision-making in safety-critical domains.",
          thumbnail:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center",
          techStack: ["Python", "PyTorch", "OpenAI Gym", "TensorBoard"],
          results: [
            {
              Environment: "High-Fidelity",
              "Success Rate": "87.3%",
              Episodes: "1000",
              Reward: "0.92",
            },
            {
              Environment: "Medium-Fidelity",
              "Success Rate": "82.1%",
              Episodes: "500",
              Reward: "0.88",
            },
            {
              Environment: "Low-Fidelity",
              "Success Rate": "76.8%",
              Episodes: "200",
              Reward: "0.84",
            },
          ],
        },
        {
          id: "vision-language",
          title: "Vision-Language Grounding for Environmental AI",
          description:
            "Exploration of multimodal models integrating satellite imagery and textual reports through large language models for explainable geospatial reasoning.",
          thumbnail:
            "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=250&fit=crop&crop=center",
          techStack: ["Python", "Transformers", "CLIP", "Hugging Face"],
          results: [
            {
              Model: "Vision-Language",
              Accuracy: "91.2%",
              "BLEU Score": "0.87",
              "Inference Time": "0.15s",
            },
            {
              Model: "CLIP Baseline",
              Accuracy: "84.6%",
              "BLEU Score": "0.79",
              "Inference Time": "0.12s",
            },
            {
              Model: "Text-Only",
              Accuracy: "76.3%",
              "BLEU Score": "0.82",
              "Inference Time": "0.08s",
            },
          ],
          status: "In Progress",
        },
      ],
      publications: [
        {
          title: "Improved Energy Valley Optimizer for Wildfire Prediction",
          authors: "Oluwayomi, M.",
          venue: "Environmental Modelling & Software",
          year: "2025",
          status: "Under review",
          description:
            "Benchmarks the Energy Valley Optimizer and spiral variants for province-specific wildfire forecasting across Canada.",
          keywords: [
            "Wildfire Prediction",
            "Energy Valley Optimizer",
            "Metaheuristics",
            "Environmental Modeling",
          ],
        },
        {
          title: "Spiral-Enhanced Liver Cancer Algorithm for Feature Selection",
          authors: "Oluwayomi, M.",
          venue: "Journal of Computational Science",
          year: "2025",
          status: "Under review",
          description:
            "Introduces spiral-based feature-selection method improving sensitivity in imbalanced datasets.",
          keywords: [
            "Feature Selection",
            "Spiral Optimization",
            "Wildfire Prediction",
            "Metaheuristics",
          ],
        },
        {
          title:
            "Advanced Wildfire Prediction with Machine Learning: Leveraging Metaheuristic Optimization and Spiral-Based Algorithms for Feature Selection",
          authors: "Oluwayomi, M.",
          venue: "MSc Thesis, Thompson Rivers University Library",
          year: "2025",
          status: "Published",
          description:
            "Comprehensive thesis exploring machine learning approaches for wildfire prediction using metaheuristic optimization and spiral-based algorithms.",
          keywords: [
            "Wildfire Prediction",
            "Machine Learning",
            "Metaheuristics",
            "Feature Selection",
            "Thesis",
          ],
        },
      ],
    };
  }
}

export const dataService = new DataService();

