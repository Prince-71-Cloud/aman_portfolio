import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { getAllPosts, createPost } from "@/lib/posts"
import { hasGitHubConfig, getGitHubConfig } from "@/lib/github-config"
import { commitToGitHub, formatPostAsMarkdown } from "@/lib/github"

export async function GET() {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const posts = await getAllPosts(session.id as string)
  return NextResponse.json({ posts })
}

export async function POST(request: NextRequest) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, content, excerpt, status } = body

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content required" }, { status: 400 })
    }

    const post = await createPost(
      {
        title,
        content,
        excerpt: excerpt || content.substring(0, 150),
        status: status || "draft",
      },
      session.id as string,
    )

    if (post.status === "published" && hasGitHubConfig()) {
      const config = getGitHubConfig()!
      const filePath = `blog/${post.slug}.md`
      const markdownContent = formatPostAsMarkdown(post)
      const message = `Add blog post: ${post.title}`

      const result = await commitToGitHub(config, filePath, markdownContent, message)

      if (!result.success) {
        return NextResponse.json(
          {
            error: "Post created but GitHub sync failed",
            post,
            githubError: result.error,
          },
          { status: 207 },
        )
      }
    }

    return NextResponse.json({ post })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
