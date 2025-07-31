import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  published_at: string;
  meta_title?: string;
  meta_description?: string;
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

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPostAndCategories = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        // Fetch the blog post
        const { data: postData, error } = await supabase
          .from("blog_posts")
          .select(`
            id,
            title,
            slug,
            content,
            excerpt,
            featured_image,
            published_at,
            meta_title,
            meta_description,
            blog_categories (
              name,
              slug
            )
          `)
          .eq("slug", slug)
          .eq("status", "published")
          .single();

        if (error || !postData) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setPost(postData);

        // Fetch categories for sidebar
        const { data: categoriesData } = await supabase
          .from("blog_categories")
          .select("*")
          .order("name");

        if (categoriesData) {
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndCategories();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (notFound || !post) {
    return <Navigate to="/404" replace />;
  }

  const pageTitle = post.meta_title || `${post.title} | QuickKlar Blog`;
  const pageDescription = post.meta_description || post.excerpt || "Lesen Sie unseren neuesten Artikel über Entrümpelung und Umzug in Dortmund.";

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.published_at} />
        <meta property="article:section" content={post.blog_categories.name} />
        {post.featured_image && <meta property="og:image" content={post.featured_image} />}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.excerpt || pageDescription,
            "author": {
              "@type": "Organization",
              "name": "QuickKlar Entrümpelung"
            },
            "publisher": {
              "@type": "Organization",
              "name": "QuickKlar Entrümpelung",
              "logo": {
                "@type": "ImageObject",
                "url": "https://your-project-url.lovable.app/og-image.png"
              }
            },
            "datePublished": post.published_at,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://your-project-url.lovable.app/blog/${post.slug}`
            },
            ...(post.featured_image && {
              "image": {
                "@type": "ImageObject",
                "url": post.featured_image
              }
            })
          })}
        </script>
      </Helmet>

      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BlogPostContent post={post} />
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

export default BlogPost;