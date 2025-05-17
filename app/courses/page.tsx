"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Clock, Filter, Search, Upload } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockCourses } from "@/lib/mock-data"
import { FileUploader } from "@/components/file-uploader"
import { CourseAnalysis } from "@/components/course-analysis"
import { StudyPlanSetup } from "@/components/study-plan-setup"
import { ModernTabs } from "@/components/modern-tabs"

// Course emojis based on category
const categoryEmojis: Record<string, string> = {
  "Computer Science": "💻",
  "Web Development": "🌐",
  Mathematics: "🧮",
  Business: "📊",
}

export default function CoursesPage() {
  const [courses, setCourses] = useState(mockCourses)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [showPlanSetup, setShowPlanSetup] = useState(false)
  const [activeTab, setActiveTab] = useState("catalog")

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab === "upload") {
      setActiveTab("upload")
    }
  }, [searchParams])

  const categories = ["All", "Computer Science", "Web Development", "Mathematics", "Business"]
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "All" || course.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const handleFileUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      setIsAnalyzing(true)

      // Simulate analysis process
      setTimeout(() => {
        setIsAnalyzing(false)
        setShowAnalysis(true)
      }, 3000)
    }
  }

  const handleCreatePlan = () => {
    setShowPlanSetup(true)
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
    <div className="gradient-mesh min-h-screen p-6">
      <motion.div variants={container} initial="hidden" animate="show" className="mx-auto max-w-7xl space-y-6">
        <motion.div variants={item} className="flex items-center justify-between">
          <div>
            <h1 className="font-grotesk text-3xl font-bold">Course Catalog</h1>
            <p className="text-muted-foreground">Browse and manage your learning materials</p>
          </div>
          <Button onClick={() => setActiveTab("upload")}>
            <Upload className="mr-2 h-4 w-4" /> Upload Study Material
          </Button>
        </motion.div>

        <motion.div variants={item}>
          <ModernTabs
            tabs={[
              { id: "catalog", label: "Course Catalog" },
              { id: "upload", label: "Material Analysis" },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {activeTab === "catalog" && (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="search-container flex-1">
                  <Search className="search-icon h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search courses..."
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
                  <select
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                  >
                    {difficulties.map((difficulty) => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty}
                      </option>
                    ))}
                  </select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <AnimatePresence>
                <motion.div
                  className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {filteredCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      variants={item}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="course-card neumorphic">
                        <div className="course-image">
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/80 to-secondary/30">
                            <span className="text-6xl">{categoryEmojis[course.category] || "📚"}</span>
                          </div>
                          {course.progress > 0 && (
                            <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-1">
                              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                  className="progress-fill h-full rounded-full"
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                              <p className="text-right text-xs">{course.progress}% complete</p>
                            </div>
                          )}
                        </div>
                        <div className="course-content">
                          <div className="flex items-start justify-between">
                            <h3 className="course-title">{course.title}</h3>
                            <Badge
                              variant={
                                course.difficulty === "Beginner"
                                  ? "outline"
                                  : course.difficulty === "Intermediate"
                                    ? "secondary"
                                    : "default"
                              }
                            >
                              {course.difficulty}
                            </Badge>
                          </div>
                          <p className="course-description">{course.description}</p>
                          <div className="mb-3 flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            {course.estimatedHours} hours
                            <span className="mx-2">•</span>
                            <BookOpen className="mr-1 h-4 w-4" />
                            {course.category}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {course.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="bg-secondary/10">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="course-footer">
                            <div className="text-sm">
                              <span className="font-medium">Instructor:</span> {course.instructor}
                            </div>
                            <Button variant="outline" size="sm">
                              {course.progress > 0 ? "Continue" : "Start"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {activeTab === "upload" && (
            <AnimatePresence mode="wait">
              {!isAnalyzing && !showAnalysis && !showPlanSetup ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="neumorphic">
                    <CardHeader>
                      <CardTitle>Upload Study Material</CardTitle>
                      <CardDescription>
                        Upload your study materials (PDFs, slides, documents) for AI analysis. Our system will extract
                        key concepts, create flashcards, and generate a personalized study plan based on your learning
                        goals.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FileUploader onFilesSelected={handleFileUpload} />
                    </CardContent>
                  </Card>
                </motion.div>
              ) : isAnalyzing ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-border bg-card p-10 text-center"
                >
                  <div className="relative h-16 w-16">
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-secondary opacity-20"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-t-secondary"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  </div>
                  <h3 className="text-xl font-medium">Analyzing your document...</h3>
                  <p className="text-muted-foreground">
                    Our AI is extracting key concepts, estimating study time, and building topic relationships
                  </p>
                </motion.div>
              ) : showPlanSetup ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <StudyPlanSetup onComplete={() => router.push("/planner")} />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CourseAnalysis onCreatePlan={handleCreatePlan} />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
