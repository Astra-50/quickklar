import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogHero } from "@/components/blog/BlogHero";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  published_at: string;
  blog_categories: {
    name: string;
    slug: string;
  };
}

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        // Fetch categories
        const { data: categoriesData } = await supabase
          .from("blog_categories")
          .select("*")
          .order("name");

        if (categoriesData) {
          setCategories(categoriesData);
        }

        // Fetch posts with category filter
        let query = supabase
          .from("blog_posts")
          .select(`
            id,
            title,
            slug,
            excerpt,
            featured_image,
            published_at,
            blog_categories (
              name,
              slug
            )
          `)
          .eq("status", "published")
          .order("published_at", { ascending: false });

        if (categoryFilter) {
          query = query.eq("blog_categories.slug", categoryFilter);
        }

        const { data: postsData } = await query;

        if (postsData) {
          setPosts(postsData);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [categoryFilter]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <BlogHero />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {posts.length > 0 ? (
              <div className="grid gap-8">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">Keine Artikel gefunden</h3>
                <p className="text-muted-foreground">
                  {categoryFilter 
                    ? "Für diese Kategorie sind noch keine Artikel verfügbar."
                    : "Derzeit sind keine Artikel verfügbar."
                  }
                </p>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <BlogSidebar categories={categories} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;