"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Eye } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function NewPostPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  const generateSlug = () => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  }

  const generateJSON = () => {
    const slug = generateSlug()
    const lastUpdated = new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })
    
    return {
      slug,
      title,
      description,
      category,
      order: Math.floor(Math.random() * 10000),
      lastUpdated,
      content,
    }
  }

  const copyJSONToClipboard = () => {
    const jsonObject = generateJSON()
    const jsonString = JSON.stringify(jsonObject, null, 2)
    navigator.clipboard.writeText(jsonString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title, 
          description, 
          content, 
          category,
          lastUpdated: new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })
        }),
      })

      if (res.ok) {
        router.push("/notes")
      } else {
        alert("Failed to create post")
      }
    } catch (error) {
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Notes
          </Link>

          <div className="flex items-center gap-3">
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card p-6">
            <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Title <span className="text-red-500">*</span>
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
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <input
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Brief description of the post"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  id="category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g., INTRODUCTION, COOKIES, SECURITY"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-2">
                  Content (Markdown) <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={20}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm"
                  placeholder="Write your content in markdown...&#10;&#10;# Heading&#10;## Subheading&#10;&#10;- List item&#10;&#10;**bold** *italic* `code`"
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
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={copyJSONToClipboard}
              disabled={!title || !description || !content || !category}
              className="inline-flex items-center gap-2 px-6 py-2 border border-border rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {copied ? "Copied!" : "Copy JSON to Clipboard"}
            </button>
            <Link
              href="/notes"
              className="px-6 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
            >
              Cancel
            </Link>
          </div>

          {copied && (
            <div className="glass-card p-4 bg-green-500/10 border-green-500/20">
              <p className="text-sm text-green-600 dark:text-green-400">
                <strong>✓ JSON copied to clipboard!</strong>
                <br />
                Now paste it into the <code className="px-1 py-0.5 bg-muted rounded text-xs">data/blogs.ts</code> file in the blogs array.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
