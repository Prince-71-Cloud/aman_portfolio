import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSession } from "@/lib/auth"
import { setGitHubConfig, getGitHubConfig } from "@/lib/github-config"

export async function GET() {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const config = getGitHubConfig()
  return NextResponse.json({
    configured: !!config,
    owner: config?.owner || "",
    repo: config?.repo || "",
    branch: config?.branch || "main",
  })
}

export async function POST(request: NextRequest) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { token, owner, repo, branch } = await request.json()

    if (!token || !owner || !repo) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    setGitHubConfig({
      token,
      owner,
      repo,
      branch: branch || "main",
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
