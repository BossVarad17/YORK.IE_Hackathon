"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface JiraIssuesListProps {
  issues: any[]
  onSelectIssue: (issue: any) => void
}

export function JiraIssuesList({ issues, onSelectIssue }: JiraIssuesListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do":
        return "bg-slate-200 text-slate-800 hover:bg-slate-300"
      case "In Progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "Done":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      default:
        return "bg-slate-100 text-slate-800 hover:bg-slate-200"
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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Key</TableHead>
            <TableHead>Summary</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead className="w-[120px]">Priority</TableHead>
            <TableHead className="w-[150px]">Assignee</TableHead>
            <TableHead className="w-[120px]">Due Date</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onSelectIssue(issue)}>
              <TableCell className="font-medium">{issue.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{getTypeIcon(issue.type)}</span>
                  <span>{issue.title}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(issue.status)}>
                  {issue.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getPriorityColor(issue.priority)}>
                  {issue.priority}
                </Badge>
              </TableCell>
              <TableCell>
                {issue.assignee ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={issue.assignee.avatar || "/placeholder.svg"} alt={issue.assignee.name} />
                      <AvatarFallback>{issue.assignee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{issue.assignee.name}</span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">Unassigned</span>
                )}
              </TableCell>
              <TableCell>{new Date(issue.dueDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
