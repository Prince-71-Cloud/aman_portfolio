import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/posts"

export async function GET() {
  try {
    const posts = await getAllPosts()
    // Only return published posts with public fields
    const publicPosts = posts
      .filter((post) => post.published)
      .map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        tags: post.tags,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        content: post.content,
      }))

    return NextResponse.json(publicPosts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
