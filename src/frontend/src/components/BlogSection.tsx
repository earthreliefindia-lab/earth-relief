import type { BlogPost } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBlogPosts } from "@/hooks/useQueries";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const fallbackPosts: BlogPost[] = [
  {
    title: "Why Biodegradable Packaging Is the Future of Retail",
    date: "March 2026",
    readTime: BigInt(5),
    excerpt:
      "As consumer awareness grows, biodegradable packaging is rapidly replacing single-use plastic across retail sectors. Here's why the shift is unstoppable.",
    category: "Sustainability",
  },
  {
    title: "Circular Economy: Turning Waste Into a Resource",
    date: "February 2026",
    readTime: BigInt(7),
    excerpt:
      "A circular economy model redesigns waste out of the equation. Earth Relief is leading the charge with innovative waste-to-material transformations.",
    category: "Innovation",
  },
  {
    title: "Teaching the Next Generation: Our School Programs",
    date: "January 2026",
    readTime: BigInt(4),
    excerpt:
      "Education is the most powerful tool for change. Discover how Earth Relief's awareness programs are shaping eco-conscious students worldwide.",
    category: "Education",
  },
];

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  const delay = index === 1 ? "delay-200" : index === 2 ? "delay-400" : "";

  const categoryColors: Record<string, string> = {
    Sustainability: "bg-primary/15 text-primary border-primary/30",
    Innovation: "bg-secondary/30 text-secondary-foreground border-secondary/40",
    Education: "bg-accent/60 text-accent-foreground border-accent/50",
  };

  const colorClass =
    categoryColors[post.category] ??
    "bg-muted text-muted-foreground border-border";

  return (
    <article
      ref={ref}
      data-ocid={`blog.item.${index + 1}`}
      className={`card-hover group rounded-3xl bg-white card-shadow border-0 overflow-hidden flex flex-col ${delay}`}
    >
      <div className="p-6 flex flex-col flex-1">
        {/* Category */}
        <span
          className={`inline-flex items-center self-start px-3 py-1 rounded-full text-xs font-semibold border mb-4 ${colorClass}`}
        >
          {post.category}
        </span>

        {/* Title */}
        <h3 className="font-heading text-xl font-semibold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-200">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {Number(post.readTime)} min read
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            data-ocid={`blog.item.${index + 1}`}
            className="text-primary hover:text-primary/80 hover:bg-primary/10 px-2 py-1 h-auto text-xs font-semibold gap-1"
          >
            Read More
            <ArrowRight size={12} />
          </Button>
        </div>
      </div>
    </article>
  );
}

function BlogSkeleton({ index: _index }: { index: number }) {
  return (
    <div
      data-ocid="blog.loading_state"
      className="rounded-3xl bg-white card-shadow border-0 p-6 space-y-4"
    >
      <Skeleton className="h-6 w-24 rounded-full" />
      <Skeleton className="h-7 w-full" />
      <Skeleton className="h-7 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex justify-between pt-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

export default function BlogSection() {
  const { data: posts, isLoading } = useGetBlogPosts();
  const headerRef = useScrollReveal<HTMLDivElement>();

  const displayPosts = posts && posts.length > 0 ? posts : fallbackPosts;

  return (
    <section
      id="blog"
      className="py-28 lg:py-40 bg-muted/20"
      data-ocid="blog.section"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-14">
          <span className="eyebrow-pill mb-5 inline-flex">
            Learn &amp; Grow
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight">
            Knowledge Hub
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Insights, stories, and guides from the front lines of sustainable
            living.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-7"
          data-ocid="blog.list"
        >
          {isLoading
            ? [0, 1, 2].map((i) => <BlogSkeleton key={i} index={i} />)
            : displayPosts
                .slice(0, 3)
                .map((post, i) => (
                  <BlogCard key={post.title} post={post} index={i} />
                ))}
        </div>
      </div>
    </section>
  );
}
