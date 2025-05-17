"use client"

import { motion } from "framer-motion"
import { CalendarClock, AlertTriangle } from "lucide-react"

export function UpcomingDeadlines() {
  const deadlines = [
    {
      id: 1,
      title: "Algorithm Quiz",
      date: "May 20, 2025",
      daysLeft: 3,
      urgent: true,
    },
    {
      id: 2,
      title: "Database Project",
      date: "May 25, 2025",
      daysLeft: 8,
      urgent: false,
    },
    {
      id: 3,
      title: "ML Assignment",
      date: "June 2, 2025",
      daysLeft: 16,
      urgent: false,
    },
  ]

  return (
    <div className="space-y-3">
      {deadlines.map((deadline, index) => (
        <motion.div
          key={deadline.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-md border p-3"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2">
              <CalendarClock className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <h4 className="font-medium">{deadline.title}</h4>
                <p className="text-xs text-muted-foreground">{deadline.date}</p>
              </div>
            </div>
            {deadline.urgent ? (
              <div className="flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                <AlertTriangle className="h-3 w-3" />
                Urgent
              </div>
            ) : (
              <div className="rounded-full bg-muted px-2 py-0.5 text-xs">{deadline.daysLeft} days left</div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
