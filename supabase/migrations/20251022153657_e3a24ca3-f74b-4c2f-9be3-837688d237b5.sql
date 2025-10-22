-- Create content sections table for easy management
CREATE TABLE public.content_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL UNIQUE,
  opening_hook TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create content items table for subsections
CREATE TABLE public.content_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL,
  heading TEXT NOT NULL,
  body TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  FOREIGN KEY (section_key) REFERENCES public.content_sections(section_key) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE public.content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;

-- Public read access for content
CREATE POLICY "Public can view content sections"
ON public.content_sections
FOR SELECT
USING (true);

CREATE POLICY "Public can view content items"
ON public.content_items
FOR SELECT
USING (true);

-- Only admins can modify content
CREATE POLICY "Admins can manage content sections"
ON public.content_sections
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage content items"
ON public.content_items
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert "What We Do" content
INSERT INTO public.content_sections (section_key, opening_hook)
VALUES (
  'what_we_do',
  'I''ve helped companies grow from scrappy startups to billion-dollar success stories. Now I''m bringing that same expertise to Bay Area small businesses—without the enterprise price tag or complexity.'
);

INSERT INTO public.content_items (section_key, heading, body, order_index)
VALUES
  ('what_we_do', 'Your Website, Your Way', 'I''ve built sites that served millions at The Washington Post. Now I create simple, powerful sites you can actually update yourself. No getting locked into expensive agencies or confusing platforms—you''ll own everything and understand how it works.', 1),
  ('what_we_do', 'Analytics That Actually Help', 'I used data to help Arcadia become a unicorn and Inspire Clean Energy achieve a successful exit. Now I translate those same insights into "what do I do next?" actions for your business. No confusing dashboards—just clear answers to "Is this working?"', 2),
  ('what_we_do', 'Teaching You Independence', 'You won''t need to call me every time something changes. I build systems you understand and can manage. Like teaching someone to fish: you''ll have the skills to thrive on your own.', 3);

-- Insert "Why Us" content
INSERT INTO public.content_sections (section_key, opening_hook)
VALUES (
  'why_us',
  'After building products for millions of users at places like The Washington Post and Arcadia, I realized the same principles that make enterprise software successful can transform small businesses—if you remove the complexity and cost.'
);

INSERT INTO public.content_items (section_key, heading, body, order_index)
VALUES
  ('why_us', 'Proven at Scale, Perfect for Small Business', 'I''ve built products for startups that became unicorns. I know what works—and what''s overkill for a small business. You get enterprise-grade expertise tailored to your actual needs, not inflated with unnecessary complexity.', 1),
  ('why_us', 'Your Neighbor, Not Just Your Consultant', 'I''m a Bay Area local with genuine community ties. Shopping at the same farmers markets, living in the same neighborhoods. When you succeed, our whole community succeeds.', 2),
  ('why_us', 'Enterprise Skills Without Enterprise Prices', 'Modern, sophisticated tech that doesn''t require ongoing expensive maintenance. One fair price, you own everything—no subscriptions, no surprises. The same approach that scaled companies to millions of users, tailored for your business.', 3),
  ('why_us', 'I Actually Care About Your Success', 'This isn''t about volume of clients—it''s about depth of partnership. Your success stories become community success stories. I''m personally invested in your outcomes.', 4),
  ('why_us', 'Simple, Clear, Yours', 'Everything is built for you to understand. No tech jargon, no vendor lock-in. If it''s not simple enough for you to manage, I haven''t done my job.', 5);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to content_sections
CREATE TRIGGER update_content_sections_updated_at
BEFORE UPDATE ON public.content_sections
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();