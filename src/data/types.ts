export interface Tool {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  tags: string[];
  rating: number;
  reviews: number;
  pricing: string;
  featured: boolean;
  visit_url: string;
  bookmarks: number;
  created_at?: string;
}

export type Category = {
  id: string;
  name: string;
  description: string;
  icon: string;
  toolCount: number;
};