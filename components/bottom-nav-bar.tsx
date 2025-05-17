"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, StickyNote, Settings, Network, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type BottomNavItem = {
  title: string
  href: string
  icon: LucideIcon
}

const bottomNavItems: BottomNavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Planner",
    href: "/planner",
    icon: Calendar,
  },
  {
    title: "Cards",
    href: "/flashcards",
    icon: StickyNote,
  },
  {
    title: "SecondBrain",
    href: "/knowledge", // Assuming a /settings page
    icon: Network,
  },
]

export function BottomNavBar() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        {bottomNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex flex-col items-center justify-center px-2 hover:bg-muted group",
              pathname === item.href
                ? "text-secondary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <item.icon
              className={cn(
                "w-5 h-5 mb-1",
                pathname === item.href ? "text-secondary" : "text-muted-foreground group-hover:text-foreground",
              )}
            />
            <span className="text-xs">{item.title}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
