# Blog System with GitHub Integration

## Features

- Secure authentication with JWT tokens
- Markdown-based blog editor with preview
- Automatic GitHub repository sync
- CRUD operations for blog posts
- Protected routes via middleware

## Getting Started

### 1. Login Credentials

Login credentials:
- Username: `IceCream23`
- Password: `Life2255!!`

### 2. Configure GitHub Integration

1. Go to Dashboard → GitHub Settings
2. Create a GitHub Personal Access Token:
   - Visit https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Give it a name like "Blog Integration"
   - Select the `repo` scope
   - Generate and copy the token

3. Enter your credentials:
   - **Token**: Your GitHub personal access token
   - **Owner**: Your GitHub username
   - **Repo**: Your repository name
   - **Branch**: `main` (or your default branch)

### 3. Create Blog Posts

1. Click "New Post" from the dashboard
2. Write your content in markdown format
3. Set status to "Published" to sync to GitHub
4. Click "Save Post"

Published posts will automatically:
- Be committed to your GitHub repo in the `blog/` directory
- Include frontmatter with metadata
- Use the post slug as the filename

### 4. How GitHub Sync Works

- **Published posts** → Automatically committed to GitHub
- **Updated posts** → Existing files are updated
- **Deleted posts** → Files are removed from GitHub
- **Draft posts** → Not synced until published

## File Structure

\`\`\`
blog/
  getting-started-with-nextjs.md
  my-first-post.md
\`\`\`

Each markdown file includes frontmatter:

\`\`\`markdown
---
title: "Post Title"
date: "2024-01-15T10:00:00.000Z"
status: "published"
---

Your content here...
\`\`\`

## Security Notes

- JWT tokens are stored in HTTP-only cookies
- Passwords are hashed with bcrypt
- All routes are protected via middleware
- GitHub tokens are stored securely (use environment variables in production)

## Production Deployment

For production, replace the in-memory stores with a database:
- User authentication → Use a proper database
- Blog posts → Store in database
- GitHub config → Use environment variables
