import { LucideIcon } from "lucide-react";

export type Tool = {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  pricing: "Free Trial" | "Freemium" | "Paid";
  description: string;
  tags: string[];
  category: string;
  featured: boolean;
  dealUrl?: string;
  visitUrl: string;
  bookmarks: number;
};

export type Category = {
  name: string;
  icon: LucideIcon;
};