"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, Filter, Plus, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockFlashcards } from "@/lib/mock-data"
import { Flashcard } from "@/components/flashcard"
import { ModernTabs } from "@/components/modern-tabs"

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState(mockFlashcards)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [reviewMode, setReviewMode] = useState(false)
  const [reviewCards, setReviewCards] = useState<typeof mockFlashcards>([])
  const [activeTab, setActiveTab] = useState("review")

  const categories = ["All", ...Array.from(new Set(mockFlashcards.map((card) => card.category)))]

  const filteredCards = flashcards.filter((card) => {
    const matchesSearch =
      card.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.back.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || card.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const activeCards = reviewMode ? reviewCards : filteredCards

  useEffect(() => {
    // Reset current card index when filters change
    setCurrentCardIndex(0)
  }, [searchTerm, selectedCategory, reviewMode])

  const startReview = () => {
    // Get cards due for review
    const dueCards = flashcards.filter((card) => {
      const nextReview = new Date(card.nextReview)
      return nextReview <= new Date()
    })

    setReviewCards(dueCards)
    setReviewMode(true)
  }

  const handleNextCard = () => {
    if (currentCardIndex < activeCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    }
  }

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
    }
  }

  const handleRateCard = (cardId: string, rating: "easy" | "medium" | "hard") => {
    // Update card mastery based on rating
    setFlashcards((cards) =>
      cards.map((card) => {
        if (card.id === cardId) {
          const masteryChange = rating === "easy" ? 1 : rating === "medium" ? 0 : -1
          const newMastery = Math.max(1, Math.min(5, card.mastery + masteryChange))

          // Calculate next review date based on mastery
          const today = new Date()
          const daysToAdd = rating === "easy" ? 7 : rating === "medium" ? 3 : 1
          const nextReview = new Date(today)
          nextReview.setDate(today.getDate() + daysToAdd)

          return {
            ...card,
            mastery: newMastery,
            lastReviewed: today.toISOString().split("T")[0],
            nextReview: nextReview.toISOString().split("T")[0],
          }
        }
        return card
      }),
    )

    // Move to next card
    handleNextCard()
  }

  return (
    <div className="gradient-mesh min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-grotesk text-3xl font-bold">Flashcards</h1>
            <p className="text-muted-foreground">Review and reinforce key concepts</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={startReview} disabled={reviewMode}>
              Start Review Session
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Flashcard
            </Button>
          </div>
        </div>

        <ModernTabs
          tabs={[
            { id: "review", label: "Review" },
            { id: "browse", label: "Browse All" },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {activeTab === "review" && (
          <div className="space-y-6">
            {reviewMode ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Review Session</h2>
                  <Button variant="outline" onClick={() => setReviewMode(false)}>
                    Exit Review
                  </Button>
                </div>

                {activeCards.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Card {currentCardIndex + 1} of {activeCards.length}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handlePrevCard}
                          disabled={currentCardIndex === 0}
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleNextCard}
                          disabled={currentCardIndex === activeCards.length - 1}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeCards[currentCardIndex].id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Flashcard
                          card={activeCards[currentCardIndex]}
                          onRate={(rating) => handleRateCard(activeCards[currentCardIndex].id, rating)}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                ) : (
                  <Card className="neumorphic">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <div className="mb-4 rounded-full bg-secondary/10 p-4">
                        <Check className="h-8 w-8 text-secondary" />
                      </div>
                      <h3 className="text-xl font-medium">All caught up!</h3>
                      <p className="text-muted-foreground">
                        You have no flashcards due for review. Check back later or browse all cards.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <Card className="neumorphic">
                  <CardHeader>
                    <CardTitle>Review Due Cards</CardTitle>
                    <CardDescription>
                      Start a review session with cards that are due for review based on spaced repetition
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold">
                          {flashcards.filter((card) => new Date(card.nextReview) <= new Date()).length}
                        </p>
                        <p className="text-sm text-muted-foreground">Cards due for review</p>
                      </div>
                      <Button onClick={startReview}>Start Review Session</Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <Card className="neumorphic">
                    <CardHeader>
                      <CardTitle>Mastery Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Mastered</span>
                          <span className="font-bold">{flashcards.filter((card) => card.mastery >= 4).length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Learning</span>
                          <span className="font-bold">
                            {flashcards.filter((card) => card.mastery >= 2 && card.mastery < 4).length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Difficult</span>
                          <span className="font-bold">{flashcards.filter((card) => card.mastery < 2).length}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="neumorphic md:col-span-2">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {flashcards
                          .sort((a, b) => new Date(b.lastReviewed).getTime() - new Date(a.lastReviewed).getTime())
                          .slice(0, 3)
                          .map((card) => (
                            <div key={card.id} className="flex items-center justify-between rounded-md border p-3">
                              <div>
                                <p className="font-medium">{card.front}</p>
                                <p className="text-xs text-muted-foreground">Last reviewed: {card.lastReviewed}</p>
                              </div>
                              <Badge variant={card.mastery >= 4 ? "secondary" : "outline"}>
                                {card.mastery >= 4 ? "Mastered" : "Learning"}
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "browse" && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="search-container flex-1">
                <Search className="search-icon h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search flashcards..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCards.map((card) => (
                <Card key={card.id} className="neumorphic">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{card.front}</CardTitle>
                      <Badge variant="outline">{card.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{card.back}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">Mastery:</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1.5 w-4 ${
                              level <= card.mastery ? "bg-secondary" : "bg-muted"
                            } ${level > 1 ? "ml-0.5" : ""}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="secondary" size="sm">
                        Review
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
