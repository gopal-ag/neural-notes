"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThumbsDown, ThumbsUp, Zap } from "lucide-react"

interface FlashcardProps {
  card: {
    id: string
    front: string
    back: string
    category: string
    difficulty: string
    mastery: number
  }
  onRate: (rating: "easy" | "medium" | "hard") => void
}

export function Flashcard({ card, onRate }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleRate = (rating: "easy" | "medium" | "hard") => {
    onRate(rating)
    setIsFlipped(false)
  }

  return (
    <div className="relative h-[400px] w-full perspective-1000">
      <div
        className={`flashcard absolute h-full w-full cursor-pointer ${isFlipped ? "flipped" : ""}`}
        onClick={handleFlip}
      >
        <Card className="flashcard-front absolute h-full w-full neumorphic">
          <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
            <Badge variant="outline" className="mb-4">
              {card.category}
            </Badge>
            <h3 className="text-2xl font-bold">{card.front}</h3>
            <p className="mt-4 text-sm text-muted-foreground">Click to reveal answer</p>
          </CardContent>
        </Card>

        <Card className="flashcard-back absolute h-full w-full neumorphic">
          <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
            <p className="mb-4 text-lg">{card.back}</p>
            <div className="mt-auto">
              <p className="text-sm text-muted-foreground">How well did you know this?</p>
              <div className="mt-4 flex justify-center gap-4">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="flex flex-col gap-1 p-3"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRate("hard")
                    }}
                  >
                    <ThumbsDown className="h-5 w-5 text-destructive" />
                    <span className="text-xs">Hard</span>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="flex flex-col gap-1 p-3"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRate("medium")
                    }}
                  >
                    <Zap className="h-5 w-5 text-amber-500" />
                    <span className="text-xs">Medium</span>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="flex flex-col gap-1 p-3"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRate("easy")
                    }}
                  >
                    <ThumbsUp className="h-5 w-5 text-accent" />
                    <span className="text-xs">Easy</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
