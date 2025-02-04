import { salesMarketingTools } from "./sales-marketing";
import { contentCreationTools } from "./content-creation";
import { developmentTools } from "./development";
import type { Tool } from "../types";

export const tools: Tool[] = [
  ...salesMarketingTools,
  ...contentCreationTools,
  ...developmentTools,
];

export * from "../categories";
export type { Tool, Category } from "../types";