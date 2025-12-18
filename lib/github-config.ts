// Store GitHub configuration (in production, use a database)
let githubConfig: {
  token: string
  owner: string
  repo: string
  branch: string
} | null = null

export function setGitHubConfig(config: { token: string; owner: string; repo: string; branch: string }) {
  githubConfig = config
}

export function getGitHubConfig() {
  return githubConfig
}

export function hasGitHubConfig() {
  return githubConfig !== null && githubConfig.token && githubConfig.owner && githubConfig.repo
}
