"use client"

import { useState } from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { JiraConnect } from "@/components/jira-connect"
import { JiraIssuesDashboard } from "@/components/jira-issues-dashboard"
import { JiraIssueDetail } from "@/components/jira-issue-detail"
import { JiraCreateIssue } from "@/components/jira-create-issue"
import { JiraSettings } from "@/components/jira-settings"
import { JiraNotifications } from "@/components/jira-notifications"
import { ThemeToggle } from "@/components/theme-toggle"
import { Chatbot } from "@/components/chatbot"
import { LayoutDashboard, Plus, Settings, Bell, LogOut, Zap, BarChart3, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function JiraIntegrationDashboard() {
  const [connected, setConnected] = useState(false)
  const [activeView, setActiveView] = useState("dashboard")
  const [selectedIssue, setSelectedIssue] = useState(null)

  // Mock notification count
  const notificationCount = 3

  if (!connected) {
    return <JiraConnect onConnect={() => setConnected(true)} />
  }

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <JiraIssuesDashboard
            onSelectIssue={(issue) => {
              setSelectedIssue(issue)
              setActiveView("issue-detail")
            }}
          />
        )
      case "issue-detail":
        return <JiraIssueDetail issue={selectedIssue} onBack={() => setActiveView("dashboard")} />
      case "create-issue":
        return <JiraCreateIssue onCreated={() => setActiveView("dashboard")} />
      case "settings":
        return <JiraSettings />
      case "notifications":
        return <JiraNotifications />
      default:
        return <JiraIssuesDashboard />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Sidebar className="border-r border-border/50">
          <SidebarHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-center gap-3 px-4 py-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Jira Pro
                </h1>
                <p className="text-xs text-muted-foreground">Project Management</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-2">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Main
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeView === "dashboard"}
                      onClick={() => setActiveView("dashboard")}
                      className="rounded-lg transition-all duration-200 hover:bg-accent/50"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveView("create-issue")}
                      isActive={activeView === "create-issue"}
                      className="rounded-lg transition-all duration-200 hover:bg-accent/50"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Create Issue</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Activity
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveView("notifications")}
                      isActive={activeView === "notifications"}
                      className="rounded-lg transition-all duration-200 hover:bg-accent/50"
                    >
                      <Bell className="h-4 w-4" />
                      <span>Notifications</span>
                      {notificationCount > 0 && (
                        <Badge className="ml-auto h-5 w-5 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500 border-0">
                          {notificationCount}
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="rounded-lg transition-all duration-200 hover:bg-accent/50">
                      <BarChart3 className="h-4 w-4" />
                      <span>Analytics</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="rounded-lg transition-all duration-200 hover:bg-accent/50">
                      <Users className="h-4 w-4" />
                      <span>Team</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                System
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveView("settings")}
                      isActive={activeView === "settings"}
                      className="rounded-lg transition-all duration-200 hover:bg-accent/50"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-border/50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 ring-2 ring-primary/20">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">John Doe</p>
                  <p className="text-xs text-muted-foreground truncate">john@example.com</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                title="Disconnect Jira"
                className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm p-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="hover:bg-accent/50 transition-colors" />
                <div>
                  <h1 className="text-xl font-semibold">
                    {activeView === "dashboard" && "Issues Dashboard"}
                    {activeView === "issue-detail" && "Issue Details"}
                    {activeView === "create-issue" && "Create New Issue"}
                    {activeView === "settings" && "Settings"}
                    {activeView === "notifications" && "Notifications"}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {activeView === "dashboard" && "Manage and track your project issues"}
                    {activeView === "issue-detail" && "View and edit issue details"}
                    {activeView === "create-issue" && "Create a new project issue"}
                    {activeView === "settings" && "Configure your Jira integration"}
                    {activeView === "notifications" && "Stay updated with your activities"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle />
              </div>
            </div>
          </header>

          <main className="p-6 animate-fade-in">{renderContent()}</main>
        </div>

        <Chatbot />
      </div>
    </SidebarProvider>
  )
}
