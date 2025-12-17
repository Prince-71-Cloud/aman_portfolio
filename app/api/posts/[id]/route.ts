import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { getPostById, updatePost, deletePost } from "@/lib/posts"
import { hasGitHubConfig, getGitHubConfig } from "@/lib/github-config"
import { commitToGitHub, deleteFromGitHub, formatPostAsMarkdown } from "@/lib/github"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  const { id } = await params

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const post = await getPostById(id)

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  if (post.authorId !== session.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  return NextResponse.json({ post })
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  const { id } = await params

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const post = await getPostById(id)

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    if (post.authorId !== session.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const updated = await updatePost(id, body)

    if (updated && updated.status === "published" && hasGitHubConfig()) {
      const config = getGitHubConfig()!
      const filePath = `blog/${updated.slug}.md`
      const content = formatPostAsMarkdown(updated)
      const message = `Update blog post: ${updated.title}`

      await commitToGitHub(config, filePath, content, message)
    }

    return NextResponse.json({ post: updated })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  const { id } = await params

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const post = await getPostById(id)

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  if (post.authorId !== session.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  if (hasGitHubConfig()) {
    const config = getGitHubConfig()!
    const filePath = `blog/${post.slug}.md`
    const message = `Delete blog post: ${post.title}`

    await deleteFromGitHub(config, filePath, message)
  }

  await deletePost(id)

  return NextResponse.json({ success: true })
}
