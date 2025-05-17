"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface StudyPlanSetupProps {
  onComplete: () => void
}

export function StudyPlanSetup({ onComplete }: StudyPlanSetupProps) {
  const [step, setStep] = useState(1)
  const [goal, setGoal] = useState("")
  const [deadline, setDeadline] = useState("")
  const [hoursPerDay, setHoursPerDay] = useState(2)
  const [difficulty, setDifficulty] = useState("medium")

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      onComplete()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <Card className="neumorphic">
      <CardHeader>
        <CardTitle>Create Your Study Plan</CardTitle>
        <CardDescription>Let's personalize your learning experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="mb-6 flex justify-between">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  step >= i ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {i}
              </div>
              <span className="mt-2 text-xs text-muted-foreground">
                {i === 1 ? "Goals" : i === 2 ? "Schedule" : "Preferences"}
              </span>
            </div>
          ))}
        </div>

        <motion.div
          key={`step-${step}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal" className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-secondary" /> What is your learning goal?
                </Label>
                <Input
                  id="goal"
                  placeholder="e.g., Pass Machine Learning Certification"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-secondary" /> When do you need to achieve this by?
                </Label>
                <Input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hours" className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-secondary" /> How many hours can you study per day?
                </Label>
                <div className="space-y-4">
                  <Slider
                    id="hours"
                    min={0.5}
                    max={8}
                    step={0.5}
                    value={[hoursPerDay]}
                    onValueChange={(value) => setHoursPerDay(value[0])}
                  />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">0.5 hours</span>
                    <span className="font-medium">{hoursPerDay} hours</span>
                    <span className="text-sm text-muted-foreground">8 hours</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-secondary" /> Which days are you available to study?
                </Label>
                <div className="flex flex-wrap gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <Button key={day} variant="outline" className="flex-1">
                      {day}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-secondary" /> What's your preferred difficulty level?
                </Label>
                <RadioGroup value={difficulty} onValueChange={setDifficulty} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="easy" id="easy" />
                    <Label htmlFor="easy">Easy</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hard" id="hard" />
                    <Label htmlFor="hard">Hard</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-secondary" /> Learning preferences
                </Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="visual" className="h-4 w-4 rounded border-gray-300" />
                    <Label htmlFor="visual">Visual learning (diagrams, charts)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="practical" className="h-4 w-4 rounded border-gray-300" />
                    <Label htmlFor="practical">Practical exercises</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="quizzes" className="h-4 w-4 rounded border-gray-300" />
                    <Label htmlFor="quizzes">Regular quizzes</Label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={step === 1}>
          Back
        </Button>
        <Button onClick={handleNext}>{step < 3 ? "Next" : "Create Plan"}</Button>
      </CardFooter>
    </Card>
  )
}
