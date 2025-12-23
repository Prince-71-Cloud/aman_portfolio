"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogs } from "@/data/blogs";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      router.push("/icecream/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/notes");
  };

  if (!isAuthenticated) {
    return null;
  }

  const sortedBlogs = [...blogs].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/40 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/notes"
            className="text-lg font-bold hover:text-primary transition-colors"
          >
            AB<span className="text-primary">.</span>
          </Link>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Kickout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Heh Heh</h1>
            <p className="text-muted-foreground">See my blog posts</p>
          </div>
          <Link href="/icecream/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </Link>
        </div>

        <div className="glass-panel rounded-2xl border border-border/40 overflow-hidden">
          {sortedBlogs.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-muted-foreground mb-4">
                No posts yet. Create your first post!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border/40">
              {sortedBlogs.map((post) => (
                <div
                  key={post.slug}
                  className="p-6 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                          Published
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {post.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Category: {post.category}</span>
                        <span>•</span>
                        <span>Order: {post.order}</span>
                        <span>•</span>
                        <span>Updated: {post.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 glass-panel rounded-2xl border border-border/40">
          <h2 className="text-lg font-semibold mb-3">📝 How to Add Posts</h2>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li>1. Click "Create Post" to generate a new blog post JSON</li>
            <li>2. Fill in the required fields and click "Copy JSON"</li>
            <li>
              3. Open{" "}
              <code className="px-1.5 py-0.5 bg-accent rounded text-xs">
                data/blogs.ts
              </code>{" "}
              file
            </li>
            <li>4. Paste the copied JSON object into the blogs array</li>
            <li>5. Save the file - your post will appear automatically!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
