import { NextRequest } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File
    
    if (!file) {
      return new Response("No file uploaded", { status: 400 })
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp"]
    if (!validTypes.includes(file.type)) {
      return new Response("Invalid file type", { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return new Response("File too large", { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Save file to public directory
    const filename = `${session.user.id}-${Date.now()}-${file.name}`
    const path = join(process.cwd(), "public/uploads", filename)
    await writeFile(path, buffer)

    // Return the public URL
    const url = `/uploads/${filename}`
    return Response.json({ url })
  } catch (error) {
    console.error("Error uploading file:", error)
    return new Response("Error uploading file", { status: 500 })
  }
} 