"use client";

import type React from "react";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Eye } from "lucide-react";
import type { BlogPost } from "@/types/blog";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    try {
      const res = await fetch(`/api/posts/${id}`);
      if (res.ok) {
        const data = await res.json();
        const post: BlogPost = data.post;
        setTitle(post.title);
        setContent(post.content);
        setExcerpt(post.excerpt);
        setStatus(post.status);
      }
    } catch (error) {
      console.error("Failed to load post");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, excerpt, status }),
      });

      if (res.ok) {
        router.push("/notes/dashboard");
      } else {
        alert("Failed to update post");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/notes/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <button
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? "Edit" : "Preview"}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Post</h1>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-2"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter post title"
                />
              </div>

              <div>
                <label
                  htmlFor="excerpt"
                  className="block text-sm font-medium mb-2"
                >
                  Excerpt
                </label>
                <input
                  id="excerpt"
                  type="text"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Brief description (optional)"
                />
              </div>

              {!showPreview ? (
                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium mb-2"
                  >
                    Content (Markdown)
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={20}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm"
                    placeholder="Write your content in markdown..."
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Supports markdown formatting: **bold**, *italic*, #
                    headings, - lists, etc.
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Preview
                  </label>
                  <div className="prose prose-slate dark:prose-invert max-w-none p-4 border border-border rounded-lg bg-muted/30">
                    {content ? (
                      <div className="whitespace-pre-wrap">{content}</div>
                    ) : (
                      <p className="text-muted-foreground">
                        No content to preview
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium mb-2"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as "draft" | "published")
                  }
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <Link
              href="/notes/dashboard"
              className="px-6 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {loading ? "Saving..." : "Update Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
