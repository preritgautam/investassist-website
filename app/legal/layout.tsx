import { connection } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function LegalLayout({ children }: { children: React.ReactNode }) {
  await connection()

  return <div className="min-h-screen bg-background text-foreground">{children}</div>
}
