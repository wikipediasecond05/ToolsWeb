
import type { LucideIcon } from "lucide-react";
import type { IconName } from "@/components/icons"; // Import IconName

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
  iconName: IconName; // Added for serialization
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

// New type for passing to Client Components
export interface RelatedToolData {
  id: string;
  title: string;
  path: string;
  iconName: IconName;
}
