import type { LucideIcon } from "lucide-react";

export interface FAQ {
  question: string;
  answer: string;
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  longDescription?: {
    overview: string;
    useCases: string[];
    howItWorks: string;
    tips?: string[];
  };
  category: string; // Category ID / slug
  icon: LucideIcon | ((props: React.SVGProps<SVGSVGElement>) => JSX.Element); // Allow LucideIcon or custom SVG
  faqs?: FAQ[];
  path: string;
  keywords?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: LucideIcon | ((props: React.SVGProps<SVGSVGElement>) => JSX.Element);
  path: string;
}
