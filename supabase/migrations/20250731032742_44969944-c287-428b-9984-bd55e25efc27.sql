-- Create blog categories table
CREATE TABLE public.blog_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  meta_title TEXT,
  meta_description TEXT,
  category_id UUID REFERENCES public.blog_categories(id),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog tags table
CREATE TABLE public.blog_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog post tags junction table
CREATE TABLE public.blog_post_tags (
  post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Enable RLS on all blog tables
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post_tags ENABLE ROW LEVEL SECURITY;

-- Public read access to published blog content
CREATE POLICY "Public can view published blog posts" 
ON public.blog_posts 
FOR SELECT 
USING (status = 'published');

CREATE POLICY "Public can view blog categories" 
ON public.blog_categories 
FOR SELECT 
USING (true);

CREATE POLICY "Public can view blog tags" 
ON public.blog_tags 
FOR SELECT 
USING (true);

CREATE POLICY "Public can view blog post tags" 
ON public.blog_post_tags 
FOR SELECT 
USING (true);

-- Admin access policies (for future admin authentication)
CREATE POLICY "Admins can manage blog posts" 
ON public.blog_posts 
FOR ALL 
USING (false);

CREATE POLICY "Admins can manage blog categories" 
ON public.blog_categories 
FOR ALL 
USING (false);

CREATE POLICY "Admins can manage blog tags" 
ON public.blog_tags 
FOR ALL 
USING (false);

CREATE POLICY "Admins can manage blog post tags" 
ON public.blog_post_tags 
FOR ALL 
USING (false);

-- Create triggers for updated_at
CREATE TRIGGER update_blog_categories_updated_at
BEFORE UPDATE ON public.blog_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_tags_updated_at
BEFORE UPDATE ON public.blog_tags
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample categories
INSERT INTO public.blog_categories (name, slug, description) VALUES
('Entrümpelung Ratgeber', 'entrumpelung-ratgeber', 'Tipps und Tricks für die Entrümpelung von Haus und Wohnung'),
('Umzug Checklisten', 'umzug-checklisten', 'Praktische Checklisten und Anleitungen für den Umzug'),
('Dortmund Lokal', 'dortmund-lokal', 'Lokale Tipps und Informationen für Dortmund und Umgebung'),
('Nachhaltigkeit', 'nachhaltigkeit', 'Umweltfreundliche Entsorgung und nachhaltige Praktiken'),
('Kosten & Preise', 'kosten-preise', 'Transparente Informationen zu Kosten und Preisgestaltung');

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, slug, content, excerpt, meta_title, meta_description, category_id, status, published_at) 
SELECT 
  '10 Tipps für eine erfolgreiche Entrümpelung in Dortmund',
  '10-tipps-entrumpelung-dortmund',
  '<h2>Entrümpelung leicht gemacht</h2><p>Eine Entrümpelung kann überwältigend wirken, aber mit der richtigen Strategie wird sie zum Kinderspiel. Hier sind unsere bewährten Tipps...</p><h3>1. Planen Sie im Voraus</h3><p>Eine gute Planung ist der Schlüssel zum Erfolg. Erstellen Sie eine Liste der zu entrümpelnden Räume...</p>',
  'Entrümpelung in Dortmund leicht gemacht: 10 praktische Tipps für eine stressfreie und effiziente Haushaltsauflösung.',
  '10 Tipps für Entrümpelung Dortmund | QuickKlar Entrümpelung',
  'Entrümpelung Dortmund: 10 bewährte Tipps für eine erfolgreiche Haushaltsauflösung. Professionelle Beratung von QuickKlar Entrümpelung.',
  cat.id,
  'published',
  now() - INTERVAL '2 days'
FROM blog_categories cat WHERE cat.slug = 'entrumpelung-ratgeber'
LIMIT 1;

INSERT INTO public.blog_posts (title, slug, content, excerpt, meta_title, meta_description, category_id, status, published_at) 
SELECT 
  'Umzug in Dortmund: Die ultimative Checkliste',
  'umzug-dortmund-checkliste',
  '<h2>Ihr Umzug in Dortmund</h2><p>Ein Umzug kann stressig sein, aber mit unserer detaillierten Checkliste behalten Sie den Überblick...</p><h3>8 Wochen vor dem Umzug</h3><p>Beginnen Sie frühzeitig mit der Planung...</p>',
  'Die komplette Umzug-Checkliste für Dortmund: Von der Planung bis zum ersten Tag im neuen Zuhause.',
  'Umzug Dortmund Checkliste | Kompletter Umzugsratgeber',
  'Umzug Dortmund: Die ultimative Checkliste für einen stressfreien Umzug. Tipps von lokalen Experten.',
  cat.id,
  'published',
  now() - INTERVAL '5 days'
FROM blog_categories cat WHERE cat.slug = 'umzug-checklisten'
LIMIT 1;

INSERT INTO public.blog_posts (title, slug, content, excerpt, meta_title, meta_description, category_id, status, published_at) 
SELECT 
  'Nachhaltige Entsorgung: Wie Sie richtig entrümpeln',
  'nachhaltige-entsorgung-entrumpelung',
  '<h2>Umweltbewusst entrümpeln</h2><p>Nachhaltigkeit spielt bei der Entrümpelung eine wichtige Rolle. Erfahren Sie, wie Sie verantwortungsvoll entrümpeln...</p>',
  'Umweltfreundlich entrümpeln: Tipps für nachhaltige Entsorgung und Wiederverwertung von Haushaltsgegenständen.',
  'Nachhaltige Entrümpelung | Umweltfreundlich entrümpeln',
  'Nachhaltige Entrümpelung: Umweltfreundliche Entsorgung und Wiederverwertung. Tipps für verantwortungsvolles Entrümpeln.',
  cat.id,
  'published',
  now() - INTERVAL '1 week'
FROM blog_categories cat WHERE cat.slug = 'nachhaltigkeit'
LIMIT 1;