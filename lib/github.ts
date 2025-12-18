interface GitHubConfig {
  token: string
  owner: string
  repo: string
  branch: string
}

export async function commitToGitHub(
  config: GitHubConfig,
  filePath: string,
  content: string,
  message: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const { token, owner, repo, branch } = config

    // Get the current file SHA if it exists
    let sha: string | undefined
    try {
      const getFileRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

      if (getFileRes.ok) {
        const fileData = await getFileRes.json()
        sha = fileData.sha
      }
    } catch (error) {
      // File doesn't exist, which is fine for new files
    }

    // Create or update the file
    const payload: Record<string, unknown> = {
      message,
      content: Buffer.from(content).toString("base64"),
      branch,
    }

    if (sha) {
      payload.sha = sha
    }

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const error = await res.text()
      return { success: false, error: `GitHub API error: ${error}` }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function deleteFromGitHub(
  config: GitHubConfig,
  filePath: string,
  message: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const { token, owner, repo, branch } = config

    // Get the file SHA
    const getFileRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!getFileRes.ok) {
      return { success: false, error: "File not found" }
    }

    const fileData = await getFileRes.json()
    const sha = fileData.sha

    // Delete the file
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        sha,
        branch,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      return { success: false, error: `GitHub API error: ${error}` }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export function formatPostAsMarkdown(post: { title: string; content: string; createdAt: string; status: string }) {
  return `---
title: "${post.title}"
date: "${post.createdAt}"
status: "${post.status}"
---

${post.content}
`
}
