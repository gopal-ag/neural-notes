"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  onClick: () => void
}

export function FeatureCard({ icon: Icon, title, description, onClick }: FeatureCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="cursor-pointer" onClick={onClick}>
      <Card className="h-full neumorphic overflow-hidden border-border/50 transition-all duration-300 hover:border-secondary/50">
        <CardContent className="flex h-full flex-col p-6">
          <div className="mb-4 rounded-full bg-secondary/10 p-3 w-fit">
            <Icon className="h-6 w-6 text-secondary" />
          </div>
          <h3 className="mb-2 text-lg font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
