"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home,
  type LucideIcon,
  Network,
  Settings,
  StickyNote,
  User,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type NavItem = {
  title: string
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Course Catalog",
    href: "/courses",
    icon: BookOpen,
  },
  {
    title: "Study Planner",
    href: "/planner",
    icon: Calendar,
  },
  {
    title: "SecondBrain",
    href: "/knowledge",
    icon: Network,
  },
  {
    title: "Flashcards",
    href: "/flashcards",
    icon: StickyNote,
  },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <motion.div
      initial={{ width: "var(--sidebar-width)" }}
      animate={{
        width: collapsed ? "var(--sidebar-width-collapsed)" : "var(--sidebar-width)",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative h-screen border-r border-border bg-card neumorphic"
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center px-4">
          <AnimatePresence mode="wait">
            {!collapsed ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="logo-container"
              >
                <div className="logo">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                    <path
                      d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5Z"
                      fill="url(#paint0_linear)"
                    />
                    <path
                      d="M15 15C15 13.8954 15.8954 13 17 13H23C24.1046 13 25 13.8954 25 15V25C25 26.1046 24.1046 27 23 27H17C15.8954 27 15 26.1046 15 25V15Z"
                      fill="white"
                      fillOpacity="0.3"
                    />
                    <path
                      d="M20 17C21.6569 17 23 18.3431 23 20C23 21.6569 21.6569 23 20 23C18.3431 23 17 21.6569 17 20C17 18.3431 18.3431 17 20 17Z"
                      fill="white"
                      fillOpacity="0.6"
                    />
                    <defs>
                      <linearGradient id="paint0_linear" x1="5" y1="5" x2="35" y2="35" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#7C83FD" />
                        <stop offset="1" stopColor="#48E5C2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h1 className="logo-text">NeuralNotes</h1>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mx-auto"
              >
                <div className="logo h-8 w-8">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                    <path
                      d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5Z"
                      fill="url(#paint0_linear)"
                    />
                    <path
                      d="M15 15C15 13.8954 15.8954 13 17 13H23C24.1046 13 25 13.8954 25 15V25C25 26.1046 24.1046 27 23 27H17C15.8954 27 15 26.1046 15 25V15Z"
                      fill="white"
                      fillOpacity="0.3"
                    />
                    <path
                      d="M20 17C21.6569 17 23 18.3431 23 20C23 21.6569 21.6569 23 20 23C18.3431 23 17 21.6569 17 20C17 18.3431 18.3431 17 20 17Z"
                      fill="white"
                      fillOpacity="0.6"
                    />
                    <defs>
                      <linearGradient id="paint0_linear" x1="5" y1="5" x2="35" y2="35" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#7C83FD" />
                        <stop offset="1" stopColor="#48E5C2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex h-10 items-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-accent/10",
                  pathname === item.href ? "bg-secondary/20 text-secondary" : "text-muted-foreground",
                )}
              >
                <item.icon className="mr-2 h-5 w-5" />
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <div className="h-8 w-8 rounded-full bg-secondary/20">
                    <User className="h-8 w-8 p-1.5 text-secondary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">gopal_ag</span>
                    <span className="text-xs text-muted-foreground">Student</span>
                  </div>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <Settings className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
