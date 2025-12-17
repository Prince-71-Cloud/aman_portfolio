import { hashPassword } from "./password"

export interface User {
  id: string
  username: string
  password: string
  createdAt: string
}

// In-memory user store (replace with database in production)
const users: User[] = []

// Initialize with demo user
async function initDemoUser() {
  if (users.length === 0) {
    const hashedPassword = await hashPassword("Life2255!!")
    users.push({
      id: "1",
      username: "IceCream23",
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    })
  }
}

export async function getUserByUsername(username: string): Promise<User | null> {
  await initDemoUser()
  return users.find((u) => u.username === username) || null
}

export async function createUser(username: string, password: string): Promise<User> {
  await initDemoUser()
  const hashedPassword = await hashPassword(password)
  const user: User = {
    id: Date.now().toString(),
    username,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  }
  users.push(user)
  return user
}
