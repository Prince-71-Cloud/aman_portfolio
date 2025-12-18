import Link from "next/link"
import { Lock, BookOpen } from "lucide-react"
import { blogs } from "@/data/blogs"

export default function NotesPage() {
  const sortedBlogs = [...blogs].sort((a, b) => a.order - b.order)

  const categories = sortedBlogs.reduce((acc: any, post) => {
    const category = post.category || "Uncategorized"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(post)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/40 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-black tracking-tight hover:scale-105 transition-transform duration-300 group">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Aman Bhuiyan
            </span>
            <span className="inline-block ml-0.5 text-primary group-hover:animate-bounce">.</span>
          </Link>
          <Link
            href="/icecream/login"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            Admin
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Left Sidebar Navigation */}
        <aside className="w-64 border-r border-border/40 min-h-screen sticky top-[57px] self-start hidden lg:block">
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Course Notes
              </h2>
              <p className="text-xs text-muted-foreground mb-4">Web Security v2</p>
            </div>

            {Object.entries(categories).map(([category, categoryPosts]: [string, any]) => (
              <div key={category} className="space-y-1">
                <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2">{category}</h3>
                <div className="space-y-0.5">
                  {categoryPosts.map((post: any, index: number) => (
                    <Link
                      key={post.slug}
                      href={`/notes/${post.slug}`}
                      className="block px-3 py-1.5 text-sm rounded-md hover:bg-accent transition-colors"
                    >
                      Class {index + 1} - {post.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 py-12">
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No posts published yet.</p>
            </div>
          ) : (
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-8">
                All Course Notes<span className="text-primary">.</span>
              </h1>
              <div className="space-y-8">
                {Object.entries(categories).map(([category, categoryPosts]: [string, any]) => (
                  <section key={category}>
                    <h2 className="text-2xl font-bold mb-4 uppercase text-muted-foreground">{category}</h2>
                    <div className="space-y-3">
                      {categoryPosts.map((post: any, index: number) => (
                        <Link
                          key={post.slug}
                          href={`/notes/${post.slug}`}
                          className="block p-4 rounded-lg border border-border/40 hover:border-border hover:bg-accent/50 transition-all group"
                        >
                          <h3 className="font-semibold group-hover:text-primary transition-colors">
                            Class {index + 1} - {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{post.description}</p>
                        </Link>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
