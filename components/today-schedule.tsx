"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScheduleItem {
  id: string
  time: string
  title: string
  duration: string
  completed: boolean
  type: "study" | "quiz" | "break" | "review"
}

interface TodayScheduleProps {
  schedule: ScheduleItem[]
}

export function TodaySchedule({ schedule }: TodayScheduleProps) {
  const [items, setItems] = useState(schedule)

  const handleToggleComplete = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "study":
        return "border-l-secondary"
      case "quiz":
        return "border-l-accent"
      case "break":
        return "border-l-green-500"
      case "review":
        return "border-l-amber-500"
      default:
        return "border-l-muted"
    }
  }

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={cn(
            "flex cursor-pointer items-center gap-3 rounded-md border-l-4 bg-card p-3 transition-all hover:bg-muted/20",
            getTypeStyles(item.type),
            item.completed && "opacity-60",
          )}
          onClick={() => handleToggleComplete(item.id)}
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-background">
            {item.completed ? (
              <CheckCircle2 className="h-5 w-5 text-accent" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className={cn("font-medium", item.completed && "line-through")}>{item.title}</h4>
              <span className="text-xs text-muted-foreground">{item.duration}</span>
            </div>
            <p className="text-sm text-muted-foreground">{item.time}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
