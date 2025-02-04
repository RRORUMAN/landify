import type { Tool } from "../types";

export const contentCreationTools: Tool[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    logo: "https://placehold.co/60x60",
    rating: 4.9,
    reviews: 10000,
    pricing: "Freemium",
    description: "Advanced language model for content generation, coding, and analysis.",
    tags: ["ai chat", "writing", "analysis"],
    category: "Content Creation",
    featured: true,
    visit_url: "https://chat.openai.com",
    bookmarks: 5000,
  },
  {
    id: "grammarly",
    name: "Grammarly",
    logo: "https://placehold.co/60x60",
    rating: 4.8,
    reviews: 8000,
    pricing: "Freemium",
    description: "AI writing assistant for grammar, style, and tone improvement.",
    tags: ["writing", "editing", "grammar"],
    category: "Content Creation",
    featured: true,
    visit_url: "https://www.grammarly.com",
    bookmarks: 3500,
  }
];