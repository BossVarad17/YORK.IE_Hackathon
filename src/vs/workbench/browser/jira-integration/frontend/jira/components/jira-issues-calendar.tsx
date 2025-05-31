"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface JiraIssuesCalendarProps {
  issues: any[]
  onSelectIssue: (issue: any) => void
}

export function JiraIssuesCalendar({ issues, onSelectIssue }: JiraIssuesCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const monthName = currentDate.toLocaleString("default", { month: "long" })
  const year = currentDate.getFullYear()

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const getIssuesForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return issues.filter((issue) => issue.dueDate === dateStr)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Bug":
        return "🐞"
      case "Feature":
        return "✨"
      case "Improvement":
        return "📈"
      case "Task":
        return "📋"
      default:
        return "📄"
    }
  }

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>
          {monthName} {year}
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-sm font-medium py-1">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {blanks.map((blank) => (
            <div key={`blank-${blank}`} className="aspect-square p-1"></div>
          ))}

          {days.map((day) => {
            const dayIssues = getIssuesForDay(day)
            const isToday =
              new Date().getDate() === day &&
              new Date().getMonth() === currentDate.getMonth() &&
              new Date().getFullYear() === currentDate.getFullYear()

            return (
              <div
                key={day}
                className={`aspect-square border rounded-md p-1 overflow-hidden ${
                  isToday ? "border-primary bg-primary/5" : ""
                }`}
              >
                <div className="text-sm font-medium mb-1">{day}</div>
                <div className="flex flex-col gap-1">
                  {dayIssues.slice(0, 3).map((issue) => (
                    <div
                      key={issue.id}
                      className="text-xs p-1 rounded bg-muted truncate cursor-pointer hover:bg-muted/80"
                      onClick={() => onSelectIssue(issue)}
                    >
                      <div className="flex items-center gap-1">
                        <span>{getTypeIcon(issue.type)}</span>
                        <span className="truncate">{issue.title}</span>
                      </div>
                    </div>
                  ))}
                  {dayIssues.length > 3 && (
                    <Badge variant="outline" className="w-fit text-xs">
                      +{dayIssues.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
