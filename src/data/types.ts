export interface Tool {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  pricing: string;
  description: string;
  tags: string[];
  category: string;
  featured: boolean;
  visit_url: string;
  bookmarks: number;
  created_at?: string;
}