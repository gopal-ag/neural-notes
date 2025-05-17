import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { BottomNavBar } from "@/components/bottom-nav-bar"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "NeuralNotes | Smart Study Planning",
  description: "AI-powered study planning and knowledge management",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen">
            <div className="fixed h-screen hidden md:block">
              <Sidebar />
            </div>
            <div className="flex-1 ml-0 md:ml-[var(--sidebar-width,240px)] overflow-auto pb-16 md:pb-0">
              <main className="flex-1">{children}</main>
            </div>
            <BottomNavBar />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
