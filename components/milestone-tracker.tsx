"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Edit3 } from "lucide-react"

interface MilestoneProps {
  milestones: {
    id: string
    title: string
    dueDate: string
    progress: number
  }[]
}

export function MilestoneTracker({ milestones }: MilestoneProps) {
  return (
    <div className="space-y-6">
      {milestones.map((milestone, index) => (
        <motion.div
          key={milestone.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-lg border p-4"
        >
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium">{milestone.title}</h3>
              <p className="text-sm text-muted-foreground">Due: {milestone.dueDate}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={milestone.progress >= 75 ? "secondary" : "outline"}>
                {milestone.progress >= 75 ? "Almost Done" : "In Progress"}
              </Badge>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{milestone.progress}% Complete</span>
              {milestone.progress === 100 && (
                <div className="flex items-center gap-1 text-sm text-accent">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Completed</span>
                </div>
              )}
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="progress-fill h-full rounded-full" style={{ width: `${milestone.progress}%` }}></div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
