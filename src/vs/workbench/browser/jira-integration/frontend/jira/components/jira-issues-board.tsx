"use client"

import { type DragEvent, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface JiraIssuesBoardProps {
  issues: any[]
  onSelectIssue: (issue: any) => void
}

export function JiraIssuesBoard({ issues, onSelectIssue }: JiraIssuesBoardProps) {
  const [draggingIssue, setDraggingIssue] = useState<string | null>(null)

  const statuses = ["To Do", "In Progress", "Done"]

  const handleDragStart = (e: DragEvent<HTMLDivElement>, issueId: string) => {
    setDraggingIssue(issueId)
    e.dataTransfer.setData("text/plain", issueId)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>, status: string) => {
    e.preventDefault()
    const issueId = e.dataTransfer.getData("text/plain")

    // In a real app, this would update the issue status via API
    console.log(`Moving issue ${issueId} to ${status}`)

    setDraggingIssue(null)
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "High":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      default:
        return "bg-slate-100 text-slate-800 hover:bg-slate-200"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statuses.map((status) => (
        <div key={status} className="flex flex-col h-full">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-medium text-sm">{status}</h3>
            <Badge variant="outline" className="font-normal">
              {issues.filter((issue) => issue.status === status).length}
            </Badge>
          </div>

          <div
            className="flex-1 rounded-md border bg-muted/40 p-2 min-h-[400px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <div className="flex flex-col gap-2">
              {issues
                .filter((issue) => issue.status === status)
                .map((issue) => (
                  <div
                    key={issue.id}
                    className="rounded-md border bg-card p-3 shadow-sm cursor-pointer hover:border-primary/50"
                    draggable
                    onDragStart={(e) => handleDragStart(e, issue.id)}
                    onClick={() => onSelectIssue(issue)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-muted-foreground">{issue.id}</span>
                      <Badge variant="outline" className={getPriorityColor(issue.priority)}>
                        {issue.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span>{getTypeIcon(issue.type)}</span>
                      <p className="font-medium text-sm">{issue.title}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs text-muted-foreground">
                        {new Date(issue.dueDate).toLocaleDateString()}
                      </div>
                      {issue.assignee ? (
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={issue.assignee.avatar || "/placeholder.svg"} alt={issue.assignee.name} />
                          <AvatarFallback>{issue.assignee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          Unassigned
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
