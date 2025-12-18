"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Github, CheckCircle, XCircle } from "lucide-react"

export default function SettingsPage() {
  const [token, setToken] = useState("")
  const [owner, setOwner] = useState("")
  const [repo, setRepo] = useState("")
  const [branch, setBranch] = useState("main")
  const [loading, setLoading] = useState(false)
  const [configured, setConfigured] = useState(false)

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = async () => {
    try {
      const res = await fetch("/api/github/config")
      if (res.ok) {
        const data = await res.json()
        setConfigured(data.configured)
        setOwner(data.owner)
        setRepo(data.repo)
        setBranch(data.branch)
      }
    } catch (error) {
      console.error("Failed to load config")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/github/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, owner, repo, branch }),
      })

      if (res.ok) {
        setConfigured(true)
        alert("GitHub integration configured successfully!")
      } else {
        alert("Failed to configure GitHub integration")
      }
    } catch (error) {
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/notes/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-primary/10">
              <Github className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">GitHub Integration</h1>
              <p className="text-sm text-muted-foreground">Configure automatic blog post sync</p>
            </div>
          </div>

          <div className="mb-6 p-4 rounded-lg border border-border bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              {configured ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">GitHub Connected</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-orange-500" />
                  <span className="font-medium">Not Connected</span>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {configured
                ? "Your blog posts will automatically sync to GitHub when published."
                : "Configure your GitHub credentials to enable automatic blog post syncing."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="token" className="block text-sm font-medium mb-2">
                GitHub Personal Access Token
              </label>
              <input
                id="token"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="ghp_xxxxxxxxxxxx"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Create a token with <code>repo</code> permissions at{" "}
                <a
                  href="https://github.com/settings/tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  github.com/settings/tokens
                </a>
              </p>
            </div>

            <div>
              <label htmlFor="owner" className="block text-sm font-medium mb-2">
                Repository Owner
              </label>
              <input
                id="owner"
                type="text"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="your-username"
              />
            </div>

            <div>
              <label htmlFor="repo" className="block text-sm font-medium mb-2">
                Repository Name
              </label>
              <input
                id="repo"
                type="text"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="my-portfolio"
              />
            </div>

            <div>
              <label htmlFor="branch" className="block text-sm font-medium mb-2">
                Branch
              </label>
              <input
                id="branch"
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="main"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {loading ? "Saving..." : "Save Configuration"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="font-semibold mb-2">How it works</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Published posts are automatically committed to your repository</li>
              <li>
                • Posts are saved as markdown files in the <code>blog/</code> directory
              </li>
              <li>• Each file includes frontmatter with metadata</li>
              <li>• Deleted posts are removed from the repository</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/notes/dashboard" className="text-sm text-primary hover:underline">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
