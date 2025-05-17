"use client"

import { motion } from "framer-motion"
import { BookOpen, CheckCircle2, Clock, FileText, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

interface Activity {
  id: string
  type: "completed" | "started" | "quiz" | "achievement"
  title: string
  timestamp: string
  details?: string
}

interface RecentActivityProps {
  activities: Activity[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "started":
        return <BookOpen className="h-4 w-4 text-secondary" />
      case "quiz":
        return <FileText className="h-4 w-4 text-accent" />
      case "achievement":
        return <Trophy className="h-4 w-4 text-amber-500" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-1">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={cn("flex items-start gap-3 rounded-md p-2 transition-all hover:bg-muted/20")}
        >
          <div className="mt-0.5 flex-shrink-0">{getActivityIcon(activity.type)}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{activity.title}</h4>
              <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
            </div>
            {activity.details && <p className="text-sm text-muted-foreground">{activity.details}</p>}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
