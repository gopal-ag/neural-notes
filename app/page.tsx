"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { BookOpen, Calendar, Clock, Flame, Network, Search, StickyNote, Target, Upload } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockUserData, mockTodaySchedule, mockFlashcards } from "@/lib/mock-data"
import { UpcomingDeadlines } from "@/components/upcoming-deadlines"
import { TodaySchedule } from "@/components/today-schedule"
import { ModernTabs } from "@/components/modern-tabs"

export default function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const { goals, stats, streakDays } = mockUserData
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleUpload = () => {
    router.push("/courses?tab=upload")
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  if (!isLoaded) {
    return null
  }

  return (
    <div className="gradient-mesh min-h-screen p-6">
      <motion.div variants={container} initial="hidden" animate="show" className="mx-auto max-w-7xl space-y-8">
        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-grotesk text-3xl font-bold">Welcome back, Gopal</h1>
              <p className="text-muted-foreground">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-full bg-secondary/20 px-3 py-1">
                <Flame className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium">{streakDays} day streak</span>
              </div>
            </div>
          </div>

          <div className="relative flex items-center">
            <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Ask any question about your studies or search for content..."
              className="h-12 w-full rounded-lg border border-border bg-background/60 pl-10 pr-4 shadow-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
            />
          </div>
          
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-center justify-center rounded-xl border bg-gradient-to-br from-background to-secondary/5 p-6 text-center shadow-md transition-all duration-300 hover:shadow-lg neumorphic w-full"
            onClick={handleUpload}
          >
            <div className="mb-6 rounded-full bg-secondary/20 p-4 transition-transform duration-300 hover:scale-110">
              <Upload className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">Upload Study Material</h3>
            <p className="text-sm text-muted-foreground">
              Upload PDFs, documents, or slides to get AI-powered analysis, summaries, and personalized study
              plans
            </p>
          </motion.div>
        </motion.div>

        <motion.div variants={item}>
          <ModernTabs
            tabs={[
              { id: "overview", label: "Overview" },
              { id: "goals", label: "Goals & Progress" },
              { id: "recommendations", label: "Recommendations" },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <motion.div
                  variants={item}
                  whileHover={{ y: -5 }}
                  className="stat-card neumorphic"
                  onClick={() => router.push("/planner")}
                >
                  <div className="stat-icon">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="stat-value">{stats.totalStudyHours}</div>
                  <div className="stat-label">Study Hours</div>
                </motion.div>

                <motion.div
                  variants={item}
                  whileHover={{ y: -5 }}
                  className="stat-card neumorphic"
                  onClick={() => router.push("/courses")}
                >
                  <div className="stat-icon">
                    <BookOpen className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="stat-value">{stats.coursesInProgress}</div>
                  <div className="stat-label">Active Courses</div>
                </motion.div>

                <motion.div
                  variants={item}
                  whileHover={{ y: -5 }}
                  className="stat-card neumorphic"
                  onClick={() => router.push("/knowledge")}
                >
                  <div className="stat-icon">
                    <Network className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="stat-value">{stats.conceptsMastered}</div>
                  <div className="stat-label">Concepts Mastered</div>
                </motion.div>

                <motion.div
                  variants={item}
                  whileHover={{ y: -5 }}
                  className="stat-card neumorphic"
                  onClick={() => router.push("/flashcards")}
                >
                  <div className="stat-icon">
                    <StickyNote className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="stat-value">{mockFlashcards.length}</div>
                  <div className="stat-label">Flashcards</div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="neumorphic">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="mr-2 h-5 w-5 text-secondary" />
                      Current Goals
                    </CardTitle>
                    <CardDescription>Your active learning objectives</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {goals.map((goal, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{goal.title}</span>
                          <span className="text-sm text-muted-foreground">{goal.progress}% Complete</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="progress-fill h-full rounded-full"
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Started: {goal.startDate}</span>
                          <span>Due: {goal.dueDate}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="neumorphic">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-secondary" />
                      Upcoming Deadlines
                    </CardTitle>
                    <CardDescription>Don't miss these dates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UpcomingDeadlines />
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="neumorphic">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-secondary" />
                      Today's Schedule
                    </CardTitle>
                    <CardDescription>Your study plan for today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TodaySchedule schedule={mockTodaySchedule as any} />
                  </CardContent>
                </Card>

                <Card className="neumorphic">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <StickyNote className="mr-2 h-5 w-5 text-secondary" />
                      Flashcards
                    </CardTitle>
                    <CardDescription>Review your study materials</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">Recent Flashcard Sets</h4>
                          <p className="text-sm text-muted-foreground">Continue where you left off</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{mockFlashcards.length} cards total</span>
                      </div>
                      <div className="space-y-2">
                        {mockFlashcards.slice(0, 3).map((set, index) => (
                          <div key={index} className="flex justify-between rounded-lg border p-3">
                            <div>
                              <div className="font-medium">{set.title}</div>
                              <div className="text-xs text-muted-foreground">{set.cardCount} cards</div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Last review: {set.lastReviewed || "Never"}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center">
                        <button 
                          className="text-sm font-medium text-secondary hover:underline"
                          onClick={() => router.push("/flashcards")}
                        >
                          See all flashcards →
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "goals" && (
            <div className="space-y-4">
              <Card className="neumorphic">
                <CardHeader>
                  <CardTitle>Learning Goals</CardTitle>
                  <CardDescription>Track your progress towards your goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {goals.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{goal.title}</h3>
                          <p className="text-sm text-muted-foreground">{goal.description}</p>
                        </div>
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20">
                          <span className="text-xl font-bold">{goal.progress}%</span>
                        </div>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div className="progress-fill h-full rounded-full" style={{ width: `${goal.progress}%` }}></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Started: {goal.startDate}</span>
                        <span>Due: {goal.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "recommendations" && (
            <div className="space-y-4">
              <Card className="neumorphic">
                <CardHeader>
                  <CardTitle>Personalized Recommendations</CardTitle>
                  <CardDescription>Based on your learning patterns and goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">Suggested Focus Areas</h3>
                    <p className="text-sm text-muted-foreground">
                      Based on your recent quiz results, we recommend focusing on these topics:
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-center text-sm">
                        <div className="mr-2 h-2 w-2 rounded-full bg-destructive"></div>
                        Data Structures: Binary Trees
                      </li>
                      <li className="flex items-center text-sm">
                        <div className="mr-2 h-2 w-2 rounded-full bg-destructive"></div>
                        Algorithm Complexity Analysis
                      </li>
                      <li className="flex items-center text-sm">
                        <div className="mr-2 h-2 w-2 rounded-full bg-amber-500"></div>
                        Database Normalization
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">Recommended Study Sessions</h3>
                    <p className="text-sm text-muted-foreground">
                      Optimize your learning with these suggested sessions:
                    </p>
                    <div className="mt-2 space-y-2">
                      <div className="rounded-md bg-secondary/10 p-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Deep Focus: Binary Trees</span>
                          <span className="text-xs">45 min</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Recommended time: Today, 3:00 PM</p>
                      </div>
                      <div className="rounded-md bg-accent/10 p-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Quick Review: SQL Joins</span>
                          <span className="text-xs">15 min</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Recommended time: Tomorrow, 9:00 AM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
