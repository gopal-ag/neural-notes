"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, BookOpen, Brain } from "lucide-react"

interface QuickStatsProps {
  stats: {
    totalStudyHours: number
    coursesInProgress: number
    conceptsMastered: number
  }
}

export function QuickStats({ stats }: QuickStatsProps) {
  const statItems = [
    {
      icon: Clock,
      label: "Study Hours",
      value: stats.totalStudyHours,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: BookOpen,
      label: "Active Courses",
      value: stats.coursesInProgress,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Brain,
      label: "Concepts Mastered",
      value: stats.conceptsMastered,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ]

  return (
    <Card className="neumorphic">
      <CardContent className="p-6">
        <div className="space-y-4">
          {statItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="flex items-center gap-4"
            >
              <div className={`rounded-full p-2 ${item.bgColor}`}>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
