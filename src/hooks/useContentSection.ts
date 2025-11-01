import { ContentSection } from "@/types/content";
import { whatWeDoContent } from "@/content/sections/what-we-do";
import { whyUsContent } from "@/content/sections/why-us";

const contentSections: Record<string, ContentSection> = {
  what_we_do: whatWeDoContent,
  why_us: whyUsContent,
};

export const useContentSection = (sectionKey: string) => {
  const data = contentSections[sectionKey];
  
  return {
    data,
    isLoading: false,
    error: data ? null : new Error(`Content section "${sectionKey}" not found`),
  };
};
