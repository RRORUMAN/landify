import type { Tool } from "../types";

export const developmentTools: Tool[] = [
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    logo: "https://placehold.co/60x60",
    rating: 4.8,
    reviews: 5000,
    pricing: "Paid",
    description: "AI pair programmer that helps you write better code faster.",
    tags: ["coding", "development", "ai assistant"],
    category: "Development",
    featured: true,
    visitUrl: "https://github.com/features/copilot",
    bookmarks: 2800,
  },
  {
    id: "tabnine",
    name: "Tabnine",
    logo: "https://placehold.co/60x60",
    rating: 4.7,
    reviews: 3000,
    pricing: "Freemium",
    description: "AI code completion tool supporting multiple languages and IDEs.",
    tags: ["coding", "ai", "development"],
    category: "Development",
    featured: false,
    visitUrl: "https://www.tabnine.com",
    bookmarks: 1500,
  }
];