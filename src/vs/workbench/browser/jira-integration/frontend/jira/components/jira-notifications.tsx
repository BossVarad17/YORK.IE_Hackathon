"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Check, CheckCheck, Trash2, Settings, MessageSquare, User, AlertCircle } from "lucide-react"

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "assignment",
    title: "You were assigned to WEATHER-123",
    description: "Fix temperature conversion bug",
    time: "2 minutes ago",
    read: false,
    priority: "high",
    issueKey: "WEATHER-123",
    actor: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: 2,
    type: "comment",
    title: "New comment on WEATHER-122",
    description: "John Doe commented: 'Working on a fix now. Should be ready for review by tomorrow.'",
    time: "1 hour ago",
    read: false,
    priority: "medium",
    issueKey: "WEATHER-122",
    actor: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: 3,
    type: "status_change",
    title: "WEATHER-121 status changed",
    description: "Status changed from 'In Progress' to 'Done'",
    time: "3 hours ago",
    read: true,
    priority: "low",
    issueKey: "WEATHER-121",
    actor: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: 4,
    type: "due_date",
    title: "WEATHER-120 is due tomorrow",
    description: "Update weather icons for accessibility",
    time: "5 hours ago",
    read: true,
    priority: "medium",
    issueKey: "WEATHER-120",
    actor: null,
  },
  {
    id: 5,
    type: "mention",
    title: "You were mentioned in WEATHER-119",
    description: "Sarah mentioned you in a comment about severe weather alerts implementation",
    time: "1 day ago",
    read: true,
    priority: "high",
    issueKey: "WEATHER-119",
    actor: {
      name: "Sarah Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
]

export function JiraNotifications() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [notificationList, setNotificationList] = useState(notifications)

  const unreadCount = notificationList.filter((n) => !n.read).length

  const filteredNotifications = notificationList.filter((notification) => {
    if (selectedTab === "unread") return !notification.read
    if (selectedTab === "mentions") return notification.type === "mention"
    if (selectedTab === "assignments") return notification.type === "assignment"
    return true
  })

  const markAsRead = (id: number) => {
    setNotificationList((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotificationList((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <User className="h-4 w-4 text-blue-500" />
      case "comment":
        return <MessageSquare className="h-4 w-4 text-green-500" />
      case "status_change":
        return <CheckCheck className="h-4 w-4 text-purple-500" />
      case "due_date":
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      case "mention":
        return <Bell className="h-4 w-4 text-red-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Notifications</h2>
          <p className="text-muted-foreground">Stay updated with your Jira issues and activities</p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <CheckCheck className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
          )}
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Activity
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="mentions">Mentions</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No notifications</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {selectedTab === "unread"
                      ? "You're all caught up!"
                      : `No ${selectedTab === "all" ? "" : selectedTab} notifications to show.`}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                        !notification.read ? "bg-blue-50 border-blue-200" : "bg-background"
                      }`}
                    >
                      <div className="mt-1">{getNotificationIcon(notification.type)}</div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className={`text-sm ${!notification.read ? "font-medium" : ""}`}>{notification.title}</p>
                            <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {notification.issueKey}
                              </Badge>
                              <Badge variant="outline" className={`text-xs ${getPriorityColor(notification.priority)}`}>
                                {notification.priority}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            {notification.actor && (
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={notification.actor.avatar || "/placeholder.svg"}
                                  alt={notification.actor.name}
                                />
                                <AvatarFallback>{notification.actor.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete notification</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
