"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Event = {
  day: number;
  title: string;
  type: string;
};

export function StudyCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    { day: 5, title: "Neural Networks Quiz", type: "quiz" },
    { day: 8, title: "Database Project Due", type: "deadline" },
    { day: 12, title: "Study Group: Algorithms", type: "study" },
    { day: 15, title: "Machine Learning Lab", type: "practice" },
    { day: 19, title: "Midterm Review", type: "review" },
    { day: 22, title: "Data Structures Exam", type: "exam" },
    { day: 25, title: "Web Dev Workshop", type: "workshop" },
  ]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState({ title: "", type: "study" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthName = currentMonth.toLocaleString("default", { month: "long" });
  const year = currentMonth.getFullYear();

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getEventForDay = (day: number) => {
    return events.find(event => event.day === day);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "quiz": return "bg-secondary/20 text-secondary";
      case "deadline": return "bg-destructive/20 text-destructive";
      case "study": return "bg-primary/20 text-primary";
      case "practice": return "bg-accent/20 text-accent-foreground";
      case "review": return "bg-amber-500/20 text-amber-500";
      case "exam": return "bg-red-500/20 text-red-500";
      case "workshop": return "bg-green-500/20 text-green-500";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const addEvent = () => {
    if (selectedDay && newEvent.title.trim()) {
      setEvents([...events, { 
        day: selectedDay, 
        title: newEvent.title,
        type: newEvent.type
      }]);
      setNewEvent({ title: "", type: "study" });
      setIsDialogOpen(false);
    }
  };

  const handleAddClick = (day: number) => {
    setSelectedDay(day);
    setIsDialogOpen(true);
  };

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {monthName} {year}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium">
            {day}
          </div>
        ))}
        
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="p-2" />
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const event = getEventForDay(day);
          const isToday = new Date().getDate() === day && 
                          new Date().getMonth() === currentMonth.getMonth() && 
                          new Date().getFullYear() === currentMonth.getFullYear();
          
          return (
            <motion.div
              key={`day-${day}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.01 }}
              className={cn(
                "calendar-day flex min-h-[80px] flex-col rounded-md border p-1",
                isToday && "border-secondary",
                event && "has-event"
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-sm",
                  isToday && "bg-secondary text-secondary-foreground"
                )}>
                  {day}
                </span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={() => handleAddClick(day)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              {event && (
                <div className={cn(
                  "mt-1 rounded p-1 text-xs",
                  getEventTypeColor(event.type)
                )}>
                  {event.title}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-secondary" />
          <span className="text-xs">Quiz</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-destructive" />
          <span className="text-xs">Deadline</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-xs">Study</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-accent" />
          <span className="text-xs">Practice</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-amber-500" />
          <span className="text-xs">Review</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <span className="text-xs">Exam</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span className="text-xs">Workshop</span>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Event for Day {selectedDay}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="event-title">Event Title</Label>
              <Input
                id="event-title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                placeholder="Enter event title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-type">Event Type</Label>
              <Select 
                value={newEvent.type} 
                onValueChange={(value) => setNewEvent({...newEvent, type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="study">Study</SelectItem>
                  <SelectItem value="practice">Practice</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addEvent}>Add Event</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
