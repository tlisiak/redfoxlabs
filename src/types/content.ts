export interface ContentItem {
  id: string;
  heading: string;
  body: string;
  order_index: number;
}

export interface ContentSection {
  opening_hook: string;
  items: ContentItem[];
}
