"use client"

import { motion } from "framer-motion"
import { AlarmClock, BookOpen, Brain, Clock, Network, Save, Tag } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CourseAnalysisProps {
  onCreatePlan: () => void
}

export function CourseAnalysis({ onCreatePlan }: CourseAnalysisProps) {
  // Mock analysis data
  const analysisData = {
    title: "Introduction to Machine Learning",
    fileType: "PDF",
    fileSize: "2.4 MB",
    pageCount: 45,
    estimatedStudyTime: "4.5 hours",
    difficulty: "Intermediate",
    keyTopics: [
      "Supervised Learning",
      "Neural Networks",
      "Decision Trees",
      "Model Evaluation",
      "Feature Engineering",
      "Bias-Variance Tradeoff",
    ],
    conceptMap: [
      { id: "1", name: "Machine Learning", size: 100, group: 1 },
      { id: "2", name: "Supervised Learning", size: 80, group: 1 },
      { id: "3", name: "Unsupervised Learning", size: 70, group: 2 },
      { id: "4", name: "Neural Networks", size: 75, group: 1 },
      { id: "5", name: "Decision Trees", size: 65, group: 1 },
      { id: "6", name: "Model Evaluation", size: 60, group: 3 },
      { id: "7", name: "Feature Engineering", size: 55, group: 3 },
      { id: "8", name: "Bias-Variance Tradeoff", size: 50, group: 3 },
    ],
    connections: [
      { source: "1", target: "2" },
      { source: "1", target: "3" },
      { source: "2", target: "4" },
      { source: "2", target: "5" },
      { source: "4", target: "6" },
      { source: "5", target: "6" },
      { source: "6", target: "7" },
      { source: "6", target: "8" },
    ],
    recommendedCourses: [
      "Advanced Machine Learning Techniques",
      "Deep Learning Fundamentals",
      "Statistical Methods for Data Science",
    ],
    studyPlan: [
      { day: 1, topic: "Introduction & Supervised Learning", duration: "1 hour" },
      { day: 1, topic: "Decision Trees", duration: "30 minutes" },
      { day: 2, topic: "Neural Networks Basics", duration: "1 hour" },
      { day: 3, topic: "Model Evaluation Techniques", duration: "45 minutes" },
      { day: 4, topic: "Feature Engineering", duration: "45 minutes" },
      { day: 5, topic: "Review & Practice", duration: "30 minutes" },
    ],
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

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{analysisData.title}</h2>
          <p className="text-muted-foreground">
            {analysisData.fileType} • {analysisData.fileSize} • {analysisData.pageCount} pages
          </p>
        </div>
        <div>
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" /> Save to Library
          </Button>
        </div>
      </motion.div>

      <motion.div 
        variants={item} 
        className="flex flex-col items-center justify-center py-4 mb-2 text-center"
      >
        <p className="text-muted-foreground mb-3 max-w-md">
          Create a personalized study schedule according to your goals and learning pace
        </p>
        <Button 
          onClick={onCreatePlan}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg transition-all duration-300 hover:shadow-xl rounded-full px-8 py-6 h-auto"
        >
          <AlarmClock className="mr-2 h-5 w-5" /> Create Study Plan
        </Button>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="concepts">Concept Map</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="neumorphic">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Key Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Estimated Study Time</span>
                    </div>
                    <span className="font-medium">{analysisData.estimatedStudyTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Difficulty Level</span>
                    </div>
                    <Badge variant="secondary">{analysisData.difficulty}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Key Concepts</span>
                    </div>
                    <span className="font-medium">{analysisData.keyTopics.length}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-2 neumorphic">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Key Topics</CardTitle>
                  <CardDescription>Main concepts extracted from the document</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {analysisData.keyTopics.map((topic, index) => (
                      <motion.div
                        key={topic}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20">{topic}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="neumorphic">
              <CardHeader>
                <CardTitle className="text-lg">Recommended Study Path</CardTitle>
                <CardDescription>AI-generated study plan based on content analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisData.studyPlan.map((session, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 rounded-md border p-3"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10">
                        <AlarmClock className="h-4 w-4 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">
                            Day {session.day}: {session.topic}
                          </h4>
                          <span className="text-sm text-muted-foreground">{session.duration}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="neumorphic">
              <CardHeader>
                <CardTitle className="text-lg">Related Courses</CardTitle>
                <CardDescription>Suggested courses based on this material</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysisData.recommendedCourses.map((course, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between rounded-md border p-3"
                    >
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <span>{course}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="concepts">
            <Card className="neumorphic">
              <CardHeader>
                <CardTitle>Knowledge Graph</CardTitle>
                <CardDescription>Visual representation of concepts and their relationships</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[500px] p-0">
                <div className="relative h-[500px] w-full overflow-hidden rounded-md bg-card p-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="100%" height="100%" viewBox="0 0 800 500">
                      <defs>
                        <marker
                          id="arrowhead"
                          viewBox="0 0 10 10"
                          refX="8"
                          refY="5"
                          markerUnits="strokeWidth"
                          markerWidth="10"
                          markerHeight="10"
                          orient="auto"
                        >
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(124, 131, 253, 0.5)" />
                        </marker>
                      </defs>

                      {/* Connections */}
                      {analysisData.connections.map((connection, index) => {
                        const source = analysisData.conceptMap.find((n) => n.id === connection.source)
                        const target = analysisData.conceptMap.find((n) => n.id === connection.target)

                        if (!source || !target) return null

                        // Calculate positions (simplified for demo)
                        const sourceX = 100 + ((Number.parseInt(source.id) * 100) % 600)
                        const sourceY = 100 + ((Number.parseInt(source.id) * 70) % 300)
                        const targetX = 100 + ((Number.parseInt(target.id) * 100) % 600)
                        const targetY = 100 + ((Number.parseInt(target.id) * 70) % 300)

                        return (
                          <motion.line
                            key={`${connection.source}-${connection.target}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            x1={sourceX}
                            y1={sourceY}
                            x2={targetX}
                            y2={targetY}
                            stroke="rgba(124, 131, 253, 0.5)"
                            strokeWidth="2"
                            markerEnd="url(#arrowhead)"
                            className="node-link"
                          />
                        )
                      })}

                      {/* Nodes */}
                      {analysisData.conceptMap.map((node, index) => {
                        // Calculate positions (simplified for demo)
                        const x = 100 + ((Number.parseInt(node.id) * 100) % 600)
                        const y = 100 + ((Number.parseInt(node.id) * 70) % 300)
                        const radius = (node.size / 100) * 30 + 20

                        let fill
                        if (node.group === 1) fill = "rgba(124, 131, 253, 0.8)"
                        else if (node.group === 2) fill = "rgba(72, 229, 194, 0.8)"
                        else fill = "rgba(255, 170, 100, 0.8)"

                        return (
                          <motion.g
                            key={node.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="knowledge-node"
                          >
                            <circle cx={x} cy={y} r={radius} fill={fill} />
                            <text x={x} y={y} textAnchor="middle" alignmentBaseline="middle" fill="white" fontSize="12">
                              {node.name}
                            </text>
                          </motion.g>
                        )
                      })}
                    </svg>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-secondary" />
                    <span className="text-sm">Core Concepts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-accent" />
                    <span className="text-sm">Related Topics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <span className="text-sm">Applications</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Network className="mr-2 h-4 w-4" /> Explore Full Graph
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
