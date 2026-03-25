import { useEffect, useState } from "react";
import { Calendar, ExternalLink, BookOpen, Newspaper, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@adhikarihemanta932`
        );
        const data = await response.json();

        if (data.status === "ok") {
          const formattedPosts = data.items.slice(0, 6).map((item: any) => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            description: item.description.replace(/<[^>]+>/g, "").substring(0, 120) + "...",
            thumbnail: item.thumbnail || item.enclosure?.link,
          }));
          setPosts(formattedPosts);
        }
      } catch (error) {
        console.error("Error fetching Medium posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMediumPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section id="blog" className="py-24 md:py-32 px-4 relative mesh-gradient">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
              <Newspaper className="w-5 h-5 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-display">
            Latest <span className="gradient-text">Articles</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Thoughts on software development, technology, and best practices
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-3d rounded-2xl p-5 animate-pulse">
                <div className="h-40 bg-muted/50 rounded-xl mb-4" />
                <div className="h-5 bg-muted/50 rounded mb-2" />
                <div className="h-4 bg-muted/50 rounded mb-4 w-3/4" />
                <div className="h-3 bg-muted/50 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <motion.a
                key={post.link}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group card-3d rounded-2xl overflow-hidden flex flex-col cursor-pointer"
              >
                {post.thumbnail && (
                  <div className="overflow-hidden h-40 sm:h-44 relative">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>{formatDate(post.pubDate)}</span>
                  </div>
                  <h3 className="text-base font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors font-display leading-snug flex-1">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-xs mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-sm text-primary font-medium mt-auto">
                    Read Article
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="card-3d rounded-2xl p-12 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No articles found. Check back soon!</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="https://medium.com/@adhikarihemanta932"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card font-medium text-sm hover:text-primary hover:border-primary/30 transition-all duration-300"
          >
            View All Articles on Medium
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
