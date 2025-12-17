import { type NextRequest, NextResponse } from "next/server"
import { getUserByUsername } from "@/lib/users"
import { verifyPassword } from "@/lib/password"
import { createToken, setAuthCookie } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 })
    }

    const user = await getUserByUsername(username)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const isValid = await verifyPassword(password, user.password)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = await createToken({ username: user.username, id: user.id })
    await setAuthCookie(token)

    return NextResponse.json({
      success: true,
      user: { id: user.id, username: user.username },
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
