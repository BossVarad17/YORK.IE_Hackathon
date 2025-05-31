"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, MessageSquare, Paperclip, Edit, CheckCircle2, AlertCircle, Calendar, User } from "lucide-react"
import { AICodeGenerator } from "@/components/ai-code-generator"

interface JiraIssueDetailProps {
  issue: any
  onBack: () => void
}

export function JiraIssueDetail({ issue, onBack }: JiraIssueDetailProps) {
  const [comment, setComment] = useState("")
  const [status, setStatus] = useState(issue?.status || "To Do")
  const [priority, setPriority] = useState(issue?.priority || "Medium")
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState(
    issue?.description ||
      "This issue needs to be addressed to ensure accurate temperature conversion throughout the application.",
  )

  // Mock comments
  const comments = [
    {
      id: 1,
      author: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content: "I've identified the issue. It's in the conversion utility function.",
      date: "2025-05-28T14:30:00Z",
    },
    {
      id: 2,
      author: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content: "Working on a fix now. Should be ready for review by tomorrow.",
      date: "2025-05-29T09:15:00Z",
    },
  ]

  // Mock activity
  const activity = [
    {
      id: 1,
      type: "status_change",
      from: "To Do",
      to: "In Progress",
      user: "John Doe",
      date: "2025-05-28T10:00:00Z",
    },
    {
      id: 2,
      type: "priority_change",
      from: "Medium",
      to: "High",
      user: "Jane Smith",
      date: "2025-05-27T16:45:00Z",
    },
    {
      id: 3,
      type: "assignee_change",
      from: "Unassigned",
      to: "John Doe",
      user: "Jane Smith",
      date: "2025-05-27T16:40:00Z",
    },
  ]

  const handleAddComment = () => {
    if (!comment.trim()) return

    // In a real app, this would send the comment to the API
    console.log("Adding comment:", comment)

    // Clear the comment field
    setComment("")
  }

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    // In a real app, this would update the issue via API
  }

  const handlePriorityChange = (newPriority: string) => {
    setPriority(newPriority)
    // In a real app, this would update the issue via API
  }

  const handleSaveDescription = () => {
    setIsEditing(false)
    // In a real app, this would update the issue via API
  }

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  if (!issue) return null

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" className="mb-4" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Issues
      </Button>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-2">
                <span>{getTypeIcon(issue.type)}</span>
                <span className="text-sm font-medium text-muted-foreground">{issue.id}</span>
              </div>
              <CardTitle className="text-xl">{issue.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                  {!isEditing && (
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-2">
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSaveDescription}>
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm">{description}</p>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">Comments</h3>

                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{comment.author.name}</span>
                          <span className="text-xs text-muted-foreground">{formatDate(comment.date)}</span>
                        </div>
                        <p className="text-sm mt-1">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Paperclip className="h-4 w-4 mr-1" />
                        Attach
                      </Button>
                      <Button size="sm" onClick={handleAddComment} disabled={!comment.trim()}>
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <AICodeGenerator issueTitle={issue.title} issueDescription={description} issueType={issue.type} />
        </div>

        <div className="w-full md:w-80 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Issue Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Status</span>
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger className={getStatusColor(status)}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Priority</span>
                <Select value={priority} onValueChange={handlePriorityChange}>
                  <SelectTrigger className={getPriorityColor(priority)}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Assignee</span>
                <div className="flex items-center gap-2 p-2 border rounded-md">
                  {issue.assignee ? (
                    <>
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={issue.assignee.avatar || "/placeholder.svg"} alt={issue.assignee.name} />
                        <AvatarFallback>{issue.assignee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{issue.assignee.name}</span>
                    </>
                  ) : (
                    <span className="text-sm text-muted-foreground">Unassigned</span>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Due Date</span>
                <div className="flex items-center gap-2 p-2 border rounded-md">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{new Date(issue.dueDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Type</span>
                <div className="flex items-center gap-2 p-2 border rounded-md">
                  <span>{getTypeIcon(issue.type)}</span>
                  <span className="text-sm">{issue.type}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activity.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="mt-0.5">
                    {item.type === "status_change" && <CheckCircle2 className="h-4 w-4 text-blue-500" />}
                    {item.type === "priority_change" && <AlertCircle className="h-4 w-4 text-orange-500" />}
                    {item.type === "assignee_change" && <User className="h-4 w-4 text-green-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs">
                      <span className="font-medium">{item.user}</span>
                      {item.type === "status_change" && (
                        <>
                          {" "}
                          changed status from <span className="font-medium">{item.from}</span> to{" "}
                          <span className="font-medium">{item.to}</span>
                        </>
                      )}
                      {item.type === "priority_change" && (
                        <>
                          {" "}
                          changed priority from <span className="font-medium">{item.from}</span> to{" "}
                          <span className="font-medium">{item.to}</span>
                        </>
                      )}
                      {item.type === "assignee_change" && (
                        <>
                          {" "}
                          changed assignee from <span className="font-medium">{item.from}</span> to{" "}
                          <span className="font-medium">{item.to}</span>
                        </>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{formatDate(item.date)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
