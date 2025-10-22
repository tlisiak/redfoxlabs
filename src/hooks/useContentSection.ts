import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ContentItem {
  id: string;
  heading: string;
  body: string;
  order_index: number;
}

interface ContentSection {
  opening_hook: string;
  items: ContentItem[];
}

export const useContentSection = (sectionKey: string) => {
  return useQuery({
    queryKey: ['content-section', sectionKey],
    queryFn: async (): Promise<ContentSection> => {
      // Fetch section header
      const { data: section, error: sectionError } = await supabase
        .from('content_sections')
        .select('opening_hook')
        .eq('section_key', sectionKey)
        .single();

      if (sectionError) throw sectionError;

      // Fetch section items
      const { data: items, error: itemsError } = await supabase
        .from('content_items')
        .select('id, heading, body, order_index')
        .eq('section_key', sectionKey)
        .order('order_index', { ascending: true });

      if (itemsError) throw itemsError;

      return {
        opening_hook: section.opening_hook,
        items: items || [],
      };
    },
  });
};
