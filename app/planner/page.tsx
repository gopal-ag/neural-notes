"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, Edit3, Flag, Plus, Save, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockStudyPlan } from "@/lib/mock-data"
import { StudyCalendar } from "@/components/study-calendar"
import { MilestoneTracker } from "@/components/milestone-tracker"

export default function PlannerPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentWeek, setCurrentWeek] = useState(0)
  const { weeklySchedule, milestones } = mockStudyPlan

  useEffect(() => {
    setIsLoaded(true)
  }, [])

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
      <motion.div variants={container} initial="hidden" animate="show" className="mx-auto max-w-7xl space-y-6">
        <motion.div variants={item} className="flex items-center justify-between">
          <div>
            <h1 className="font-grotesk text-3xl font-bold">Study Planner</h1>
            <p className="text-muted-foreground">Organize your learning schedule</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Study Session
          </Button>
        </motion.div>

        <motion.div variants={item}>
          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
            </TabsList>

            <TabsContent value="weekly" className="space-y-6">
              <Card className="neumorphic">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Weekly Schedule</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => setCurrentWeek(currentWeek - 1)}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium">Week {currentWeek + 1}</span>
                      <Button variant="outline" size="icon" onClick={() => setCurrentWeek(currentWeek + 1)}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>Your optimized study plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {weeklySchedule.map((day, dayIndex) => (
                      <motion.div
                        key={day.day}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: dayIndex * 0.05 }}
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10">
                            <span className="text-sm font-medium">{day.day.charAt(0)}</span>
                          </div>
                          <h3 className="font-medium">{day.day}</h3>
                        </div>
                        <div className="space-y-2 pl-10">
                          {day.sessions.length > 0 ? (
                            day.sessions.map((session, sessionIndex) => (
                              <motion.div
                                key={session.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: sessionIndex * 0.05 + 0.1 }}
                                className="group flex items-center justify-between rounded-md border p-3 transition-all hover:bg-muted/20"
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`h-2 w-2 rounded-full ${
                                      session.type === "study"
                                        ? "bg-secondary"
                                        : session.type === "quiz"
                                          ? "bg-accent"
                                          : session.type === "practice"
                                            ? "bg-green-500"
                                            : session.type === "project"
                                              ? "bg-amber-500"
                                              : "bg-muted-foreground"
                                    }`}
                                  />
                                  <div>
                                    <h4 className="font-medium">
                                      {session.subject}: {session.topic}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">{session.time}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Edit3 className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </motion.div>
                            ))
                          ) : (
                            <div className="rounded-md border border-dashed p-4 text-center text-muted-foreground">
                              <p>No study sessions scheduled</p>
                              <Button variant="link" className="mt-2">
                                <Plus className="mr-2 h-4 w-4" /> Add Session
                              </Button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-secondary" />
                      <span className="text-sm">Study</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-accent" />
                      <span className="text-sm">Quiz</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="text-sm">Practice</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-amber-500" />
                      <span className="text-sm">Project</span>
                    </div>
                  </div>
                  <Button variant="outline">
                    <Save className="mr-2 h-4 w-4" /> Save Schedule
                  </Button>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card className="col-span-2 neumorphic">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-secondary" />
                      Study Time Distribution
                    </CardTitle>
                    <CardDescription>Hours spent on different subjects</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <div className="flex h-full flex-col items-center justify-center">
                      <div className="h-full w-full">
                        <svg width="100%" height="100%" viewBox="0 0 400 250">
                          {/* Simplified bar chart for demo */}
                          <g transform="translate(40, 20)">
                            {/* Y-axis */}
                            <line x1="0" y1="0" x2="0" y2="200" stroke="currentColor" strokeOpacity="0.2" />
                            {[0, 1, 2, 3, 4].map((tick) => (
                              <g key={tick} transform={`translate(0, ${200 - tick * 50})`}>
                                <line x1="-5" y1="0" x2="0" y2="0" stroke="currentColor" />
                                <text x="-10" y="5" textAnchor="end" fontSize="10" fill="currentColor">
                                  {tick}h
                                </text>
                              </g>
                            ))}

                            {/* X-axis */}
                            <line x1="0" y1="200" x2="320" y2="200" stroke="currentColor" strokeOpacity="0.2" />

                            {/* Bars */}
                            <motion.rect
                              initial={{ height: 0, y: 200 }}
                              animate={{ height: 150, y: 50 }}
                              transition={{ duration: 0.8, delay: 0.1 }}
                              x="20"
                              width="40"
                              fill="#7C83FD"
                              rx="4"
                            />
                            <motion.rect
                              initial={{ height: 0, y: 200 }}
                              animate={{ height: 100, y: 100 }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              x="80"
                              width="40"
                              fill="#7C83FD"
                              rx="4"
                            />
                            <motion.rect
                              initial={{ height: 0, y: 200 }}
                              animate={{ height: 180, y: 20 }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                              x="140"
                              width="40"
                              fill="#7C83FD"
                              rx="4"
                            />
                            <motion.rect
                              initial={{ height: 0, y: 200 }}
                              animate={{ height: 80, y: 120 }}
                              transition={{ duration: 0.8, delay: 0.4 }}
                              x="200"
                              width="40"
                              fill="#7C83FD"
                              rx="4"
                            />
                            <motion.rect
                              initial={{ height: 0, y: 200 }}
                              animate={{ height: 120, y: 80 }}
                              transition={{ duration: 0.8, delay: 0.5 }}
                              x="260"
                              width="40"
                              fill="#7C83FD"
                              rx="4"
                            />

                            {/* Labels */}
                            <text x="40" y="220" textAnchor="middle" fontSize="10" fill="currentColor">
                              Mon
                            </text>
                            <text x="100" y="220" textAnchor="middle" fontSize="10" fill="currentColor">
                              Tue
                            </text>
                            <text x="160" y="220" textAnchor="middle" fontSize="10" fill="currentColor">
                              Wed
                            </text>
                            <text x="220" y="220" textAnchor="middle" fontSize="10" fill="currentColor">
                              Thu
                            </text>
                            <text x="280" y="220" textAnchor="middle" fontSize="10" fill="currentColor">
                              Fri
                            </text>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="neumorphic">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Flag className="mr-2 h-5 w-5 text-secondary" />
                      Upcoming Milestones
                    </CardTitle>
                    <CardDescription>Track your progress</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {milestones.slice(0, 3).map((milestone, index) => (
                      <motion.div
                        key={milestone.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{milestone.title}</h4>
                          <Badge variant="outline">{milestone.dueDate}</Badge>
                        </div>
                        <Progress value={milestone.progress} className="h-2" />
                        <p className="text-right text-xs text-muted-foreground">{milestone.progress}% complete</p>
                      </motion.div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Milestones
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="calendar">
              <Card className="neumorphic">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="mr-2 h-5 w-5 text-secondary" />
                    Calendar View
                  </CardTitle>
                  <CardDescription>Monthly study schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <StudyCalendar />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="milestones">
              <Card className="neumorphic">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Flag className="mr-2 h-5 w-5 text-secondary" />
                    Milestones & Goals
                  </CardTitle>
                  <CardDescription>Track your learning objectives</CardDescription>
                </CardHeader>
                <CardContent>
                  <MilestoneTracker milestones={milestones} />
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add New Milestone
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  )
}
