"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Check, Copy, ChevronLeft, Eye } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function CreatePostPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  // Form fields
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [order, setOrder] = useState("1")
  const [content, setContent] = useState("")

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin")
    if (isAdmin !== "true") {
      router.push("/icecream/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  // Generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  }

  const handleCopyJSON = () => {
    const slug = generateSlug(title)
    const today = new Date().toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })

    const postObject = {
      slug,
      title,
      description,
      category: category.toUpperCase(),
      order: Number.parseInt(order),
      lastUpdated: today,
      content: content || `# ${title}\n\nStart writing your content here...\n\n## Section 1\n\nAdd your first section content.\n\n## Section 2\n\nAdd more content here.`,
    }

    const jsonString = JSON.stringify(postObject, null, 2)
    navigator.clipboard.writeText(jsonString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/40 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/icecream/dashboard"
            className="inline-flex items-center gap-2 hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Create New Post</h1>

        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-border/40 space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Introduction to Web Security"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief description of the post"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., INTRODUCTION"
                  required
                />
              </div>

              <div>
                <label htmlFor="order" className="block text-sm font-medium mb-2">
                  Order <span className="text-red-500">*</span>
                </label>
                <Input
                  id="order"
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  placeholder="1"
                  min="1"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                Content (Markdown) <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your content in markdown...\n\n# Heading\n## Subheading\n\n- List item\n\n**bold** *italic* `code`"
                rows={20}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm resize-y"
                required
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Supports markdown: **bold**, *italic*, # headings, - lists, [links](url), ```code blocks```, etc.
              </p>
            </div>

            {showPreview && content && (
              <div>
                <label className="block text-sm font-medium mb-2">Live Preview</label>
                <div className="prose prose-neutral dark:prose-invert max-w-none p-4 border border-border rounded-lg bg-muted/30 min-h-96 overflow-auto">
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
                      a: ({ children, href, ...props }) => (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" {...props}>
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
                    {content}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {title && (
              <div className="pt-4 border-t border-border/40">
                <p className="text-sm text-muted-foreground mb-1">Generated Slug:</p>
                <code className="text-sm bg-accent px-3 py-1.5 rounded">{generateSlug(title)}</code>
              </div>
            )}
          </div>

          <Button
            onClick={handleCopyJSON}
            disabled={!title || !description || !category || !order}
            className="w-full"
            size="lg"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy JSON to Clipboard
              </>
            )}
          </Button>

          {copied && (
            <div className="p-6 glass-panel rounded-2xl border border-green-500/20 bg-green-500/10">
              <h3 className="font-semibold mb-3 text-sm text-green-600 dark:text-green-400">✓ JSON Copied to Clipboard!</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li>1. Open the <code className="px-1.5 py-0.5 bg-accent rounded text-xs">data/blogs.ts</code> file</li>
                <li>2. Paste the JSON object into the <code className="px-1.5 py-0.5 bg-accent rounded text-xs">blogs</code> array</li>
                <li>3. Save the file and your post is live!</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
