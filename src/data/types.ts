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
  visit_url: string;
  bookmarks: number;
  created_at?: string | null;
};

export type Category = {
  name: string;
  icon: LucideIcon;
};