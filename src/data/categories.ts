import { Headset, Percent, Box, Calculator, ChartLine, Edit, Server, Palette, List, Briefcase, Users, Building, Database, DollarSign, Target } from "lucide-react";
import type { Category } from "./types";

export const categories: Category[] = [
  { name: "Sales & Marketing", icon: Percent },
  { name: "Content Creation", icon: Edit },
  { name: "Development", icon: Server },
  { name: "Design", icon: Palette },
  { name: "Productivity", icon: List },
  { name: "Business Intelligence", icon: Target },
  { name: "Data & Analytics", icon: Database }
];