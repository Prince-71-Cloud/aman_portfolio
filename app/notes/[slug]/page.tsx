import Link from "next/link"
import { ChevronLeft, Clock } from "lucide-react"
import { blogs } from "@/data/blogs"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }))
}

function extractHeadings(markdown: string) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: { level: number; text: string; id: string }[] = []
  let match

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const text = match[2]
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")

    headings.push({ level, text, id })
  }

  return headings
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogs.find((p) => p.slug === slug)


  if (!post) {
    return (
      <div className="min-h-screen bg-background py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/notes" className="text-primary hover:underline">
            Back to all posts
          </Link>
        </div>
      </div>
    )
  }

  const headings = extractHeadings(post.content)
  const sortedBlogs = [...blogs].sort((a, b) => a.order - b.order)
  const categories = sortedBlogs.reduce((acc: any, p) => {
    const cat = p.category || "Uncategorized"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(p)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <div className="border-b border-border/40 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-black tracking-tight hover:scale-105 transition-transform duration-300 group">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Aman Bhuiyan
            </span>
            <span className="inline-block ml-0.5 text-primary group-hover:animate-bounce">.</span>
          </Link>
          <Link href="/notes" className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors">
            <ChevronLeft className="w-4 h-4" />
            All Notes
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Left Sidebar - Navigation */}
        <aside className="w-64 border-r border-border/40 min-h-screen sticky top-[57px] self-start hidden lg:block">
          <div className="p-6 space-y-6">
            {Object.entries(categories).map(([category, categoryPosts]: [string, any]) => (
              <div key={category} className="space-y-1">
                <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2">{category}</h3>
                <div className="space-y-0.5">
                  {categoryPosts.map((p: any, index: number) => (
                    <Link
                      key={p.slug}
                      href={`/notes/${p.slug}`}
                      className={`block px-3 py-1.5 text-sm rounded-md transition-colors ${
                        p.slug === post.slug ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent"
                      }`}
                    >
                      Class {index + 1} - {p.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 lg:px-12 py-12">
          <article className="max-w-3xl">
            <div className="text-sm text-primary uppercase font-semibold mb-4">{post.category}</div>

            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Clock className="w-4 h-4" />
              <span>Last updated {post.lastUpdated}</span>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || "")
                    const codeString = String(children).replace(/\n$/, "")
                    
                    if (inline) {
                      return (
                        <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono border border-border" {...props}>
                          {children}
                        </code>
                      )
                    }
                    
                    if (match) {
                      return (
                        <SyntaxHighlighter 
                          style={vscDarkPlus} 
                          language={match[1]} 
                          PreTag="div"
                          className="rounded-lg my-4"
                          {...props}
                        >
                          {codeString}
                        </SyntaxHighlighter>
                      )
                    }
                    
                    return (
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4 border border-border">
                        <code className="text-sm font-mono" {...props}>
                          {children}
                        </code>
                      </pre>
                    )
                  },
                  h2: ({ children, ...props }) => {
                    const id = String(children)
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-|-$/g, "")
                    return (
                      <h2 id={id} {...props}>
                        {children}
                      </h2>
                    )
                  },
                  h3: ({ children, ...props }) => {
                    const id = String(children)
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-|-$/g, "")
                    return (
                      <h3 id={id} {...props}>
                        {children}
                      </h3>
                    )
                  },
                  a: ({ children, href, ...props }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                      {children}
                    </a>
                  ),
                  img: ({ src, alt, ...props }) => (
                    <img src={src} alt={alt} className="rounded-lg my-4" {...props} />
                  ),
                  ul: ({ children, ...props }) => (
                    <ul className="list-disc list-inside my-4" {...props}>
                      {children}
                    </ul>
                  ),
                  ol: ({ children, ...props }) => (
                    <ol className="list-decimal list-inside my-4" {...props}>
                      {children}
                    </ol>
                  ),
                  li: ({ children, ...props }) => (
                    <li className="my-1" {...props}>
                      {children}
                    </li>
                  ),
                  blockquote: ({ children, ...props }) => (
                    <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground" {...props}>
                      {children}
                    </blockquote>
                  ),
                  table: ({ children, ...props }) => (
                    <div className="overflow-x-auto my-4">
                      <table className="min-w-full border-collapse border border-border" {...props}>
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children, ...props }) => (
                    <thead className="bg-muted" {...props}>
                      {children}
                    </thead>
                  ),
                  th: ({ children, ...props }) => (
                    <th className="border border-border px-4 py-2 text-left font-semibold" {...props}>
                      {children}
                    </th>
                  ),
                  td: ({ children, ...props }) => (
                    <td className="border border-border px-4 py-2" {...props}>
                      {children}
                    </td>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
        </main>

        {/* Right Sidebar - Table of Contents */}
        {headings.length > 0 && (
          <aside className="w-64 min-h-screen sticky top-[57px] self-start hidden xl:block">
            <div className="p-6">
              <h3 className="text-sm font-semibold mb-4">On this page</h3>
              <nav className="space-y-2">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`block text-sm text-muted-foreground hover:text-foreground transition-colors ${
                      heading.level === 3 ? "pl-4" : ""
                    }`}
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
