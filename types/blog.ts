export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category?: string
  tags?: string[]
  published: boolean
  status: "draft" | "published"
  createdAt: string
  updatedAt: string
  authorId: string
}

export interface CreatePostInput {
  title: string
  content: string
  excerpt: string
  category?: string
  tags?: string[]
  published: boolean
  status: "draft" | "published"
}

export interface UpdatePostInput extends Partial<CreatePostInput> {
  id: string
}
