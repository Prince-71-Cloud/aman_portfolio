import type { BlogPost, CreatePostInput } from "@/types/blog"

// In-memory post store (replace with database in production)
const posts: BlogPost[] = []

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export async function getAllPosts(authorId?: string): Promise<BlogPost[]> {
  if (authorId) {
    return posts
      .filter((p) => p.authorId === authorId)
      .sort((a, b) => {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      })
  }
  return posts.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  return posts.find((p) => p.id === id) || null
}

export async function createPost(input: CreatePostInput, authorId: string): Promise<BlogPost> {
  const post: BlogPost = {
    id: Date.now().toString(),
    ...input,
    slug: generateSlug(input.title),
    category: input.category || "Uncategorized",
    tags: input.tags || [],
    published: input.published || false,
    authorId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  posts.push(post)
  return post
}

export async function updatePost(id: string, input: Partial<CreatePostInput>): Promise<BlogPost | null> {
  const index = posts.findIndex((p) => p.id === id)
  if (index === -1) return null

  const updated: BlogPost = {
    ...posts[index],
    ...input,
    slug: input.title ? generateSlug(input.title) : posts[index].slug,
    category: input.category || posts[index].category,
    tags: input.tags || posts[index].tags,
    published: input.published !== undefined ? input.published : posts[index].published,
    updatedAt: new Date().toISOString(),
  }

  posts[index] = updated
  return updated
}

export async function deletePost(id: string): Promise<boolean> {
  const index = posts.findIndex((p) => p.id === id)
  if (index === -1) return false

  posts.splice(index, 1)
  return true
}
