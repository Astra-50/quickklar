import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Share2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  published_at: string;
  blog_categories: {
    name: string;
    slug: string;
  };
}

interface BlogPostContentProps {
  post: BlogPost;
}

export const BlogPostContent = ({ post }: BlogPostContentProps) => {
  const publishedDate = format(new Date(post.published_at), "d. MMMM yyyy", { locale: de });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt || "",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <article className="prose prose-lg max-w-none">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zum Blog
          </Link>
        </Button>
        
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">
            <Link to={`/blog?category=${post.blog_categories.slug}`}>
              {post.blog_categories.name}
            </Link>
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            {publishedDate}
          </div>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-1" />
            Teilen
          </Button>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          {post.title}
        </h1>
        
        {post.excerpt && (
          <p className="text-xl text-muted-foreground mb-6 not-prose">
            {post.excerpt}
          </p>
        )}
      </div>

      {post.featured_image && (
        <div className="mb-8 not-prose">
          <img 
            src={post.featured_image} 
            alt={post.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      )}
      
      <div 
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      <div className="mt-12 p-6 bg-secondary rounded-lg not-prose">
        <h3 className="text-lg font-semibold mb-2">Benötigen Sie professionelle Hilfe?</h3>
        <p className="text-muted-foreground mb-4">
          Kontaktieren Sie QuickKlar für eine kostenlose Beratung zu Ihrer Entrümpelung oder Ihrem Umzug in Dortmund.
        </p>
        <Button asChild>
          <Link to="/#contact">Kostenloses Angebot anfordern</Link>
        </Button>
      </div>
    </article>
  );
};