import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-in-production")

export async function createToken(payload: { username: string; id: string }) {
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("7d").setIssuedAt().sign(secret)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch (error) {
    return null
  }
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")

  if (!token) return null

  return verifyToken(token.value)
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}
