"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Calendar, LayoutGrid, List, RefreshCw } from "lucide-react"
import { JiraIssuesList } from "@/components/jira-issues-list"
import { JiraIssuesBoard } from "@/components/jira-issues-board"
import { JiraIssuesCalendar } from "@/components/jira-issues-calendar"

// Mock data for issues
const mockIssues = [
  {
    id: "WEATHER-123",
    title: "Fix temperature conversion bug",
    status: "In Progress",
    priority: "High",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "2025-06-15",
    type: "Bug",
  },
  {
    id: "WEATHER-122",
    title: "Add precipitation forecast to hourly view",
    status: "To Do",
    priority: "Medium",
    assignee: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "2025-06-20",
    type: "Feature",
  },
  {
    id: "WEATHER-121",
    title: "Improve radar map loading performance",
    status: "Done",
    priority: "High",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "2025-05-30",
    type: "Improvement",
  },
  {
    id: "WEATHER-120",
    title: "Update weather icons for accessibility",
    status: "In Progress",
    priority: "Low",
    assignee: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "2025-06-10",
    type: "Task",
  },
  {
    id: "WEATHER-119",
    title: "Implement severe weather alerts",
    status: "To Do",
    priority: "Critical",
    assignee: null,
    dueDate: "2025-06-05",
    type: "Feature",
  },
]

interface JiraIssuesDashboardProps {
  onSelectIssue: (issue: any) => void
}

export function JiraIssuesDashboard({ onSelectIssue }: JiraIssuesDashboardProps) {
  const [viewType, setViewType] = useState("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [assigneeFilter, setAssigneeFilter] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  // Filter issues based on current filters
  const filteredIssues = mockIssues.filter((issue) => {
    // Search filter
    if (
      searchQuery &&
      !issue.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !issue.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Status filter
    if (statusFilter !== "all" && issue.status !== statusFilter) {
      return false
    }

    // Priority filter
    if (priorityFilter !== "all" && issue.priority !== priorityFilter) {
      return false
    }

    // Assignee filter
    if (assigneeFilter === "assigned" && !issue.assignee) {
      return false
    }
    if (assigneeFilter === "unassigned" && issue.assignee) {
      return false
    }

    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search issues..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>

          <div className="flex border rounded-md">
            <Button
              variant={viewType === "list" ? "secondary" : "ghost"}
              size="sm"
              className="rounded-r-none"
              onClick={() => setViewType("list")}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List View</span>
            </Button>
            <Button
              variant={viewType === "board" ? "secondary" : "ghost"}
              size="sm"
              className="rounded-none border-x"
              onClick={() => setViewType("board")}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Board View</span>
            </Button>
            <Button
              variant={viewType === "calendar" ? "secondary" : "ghost"}
              size="sm"
              className="rounded-l-none"
              onClick={() => setViewType("calendar")}
            >
              <Calendar className="h-4 w-4" />
              <span className="sr-only">Calendar View</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[130px] h-8">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[130px] h-8">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
          <SelectTrigger className="w-[130px] h-8">
            <SelectValue placeholder="Assignee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assignees</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="unassigned">Unassigned</SelectItem>
          </SelectContent>
        </Select>

        {(statusFilter !== "all" || priorityFilter !== "all" || assigneeFilter !== "all" || searchQuery) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setStatusFilter("all")
              setPriorityFilter("all")
              setAssigneeFilter("all")
              setSearchQuery("")
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>

      <div>
        {filteredIssues.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="rounded-full bg-muted p-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No issues found</h3>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {viewType === "list" && <JiraIssuesList issues={filteredIssues} onSelectIssue={onSelectIssue} />}

            {viewType === "board" && <JiraIssuesBoard issues={filteredIssues} onSelectIssue={onSelectIssue} />}

            {viewType === "calendar" && <JiraIssuesCalendar issues={filteredIssues} onSelectIssue={onSelectIssue} />}
          </>
        )}
      </div>
    </div>
  )
}
