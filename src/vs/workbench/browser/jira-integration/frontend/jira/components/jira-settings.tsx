"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle2, Settings, Trash2, RefreshCw, Moon, Sun, Laptop } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useTheme } from "next-themes"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function JiraSettings() {
  const [jiraUrl, setJiraUrl] = useState("https://your-domain.atlassian.net")
  const [email, setEmail] = useState("john@example.com")
  const [syncEnabled, setSyncEnabled] = useState(true)
  const [syncInterval, setSyncInterval] = useState("5")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "error" | null>("connected")
  const { theme, setTheme } = useTheme()

  const handleTestConnection = () => {
    setIsTestingConnection(true)
    setConnectionStatus(null)

    // Simulate connection test
    setTimeout(() => {
      setConnectionStatus("connected")
      setIsTestingConnection(false)
    }, 2000)
  }

  const handleDisconnect = () => {
    // In a real app, this would disconnect from Jira
    console.log("Disconnecting from Jira...")
  }

  const handleSaveSettings = () => {
    // In a real app, this would save settings via API
    console.log("Saving settings...")
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold">Jira Settings</h2>
        <p className="text-muted-foreground">Manage your Jira integration settings and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            Appearance
          </CardTitle>
          <CardDescription>Customize the appearance of the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Label>Theme</Label>
            <RadioGroup defaultValue={theme} onValueChange={setTheme} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="flex items-center gap-1.5">
                  <Sun className="h-4 w-4" />
                  Light
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark" className="flex items-center gap-1.5">
                  <Moon className="h-4 w-4" />
                  Dark
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system" className="flex items-center gap-1.5">
                  <Laptop className="h-4 w-4" />
                  System
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Connection Settings
          </CardTitle>
          <CardDescription>Configure your Jira instance connection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              {connectionStatus === "connected" ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-orange-500" />
              )}
              <div>
                <p className="font-medium">Connection Status</p>
                <p className="text-sm text-muted-foreground">
                  {connectionStatus === "connected" ? "Connected to Jira" : "Connection needs verification"}
                </p>
              </div>
            </div>
            <Badge variant={connectionStatus === "connected" ? "default" : "secondary"}>
              {connectionStatus === "connected" ? "Active" : "Inactive"}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jira-url">Jira Instance URL</Label>
              <Input id="jira-url" value={jiraUrl} onChange={(e) => setJiraUrl(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleTestConnection} disabled={isTestingConnection} variant="outline">
              {isTestingConnection ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                "Test Connection"
              )}
            </Button>
            <Button onClick={handleDisconnect} variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Disconnect
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sync Settings</CardTitle>
          <CardDescription>Configure how data syncs between the weather app and Jira</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sync-enabled">Enable Real-time Sync</Label>
              <p className="text-sm text-muted-foreground">Automatically sync changes between Jira and the app</p>
            </div>
            <Switch id="sync-enabled" checked={syncEnabled} onCheckedChange={setSyncEnabled} />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="sync-interval">Sync Interval</Label>
            <Select value={syncInterval} onValueChange={setSyncInterval} disabled={!syncEnabled}>
              <SelectTrigger id="sync-interval" className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Every minute</SelectItem>
                <SelectItem value="5">Every 5 minutes</SelectItem>
                <SelectItem value="15">Every 15 minutes</SelectItem>
                <SelectItem value="30">Every 30 minutes</SelectItem>
                <SelectItem value="60">Every hour</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">How often to check for updates from Jira</p>
          </div>

          {!syncEnabled && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Sync Disabled</AlertTitle>
              <AlertDescription>
                Changes in Jira won't be reflected in the app until you manually refresh or re-enable sync.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Choose how you want to be notified about Jira updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications-enabled">In-App Notifications</Label>
              <p className="text-sm text-muted-foreground">Show notifications within the weather app</p>
            </div>
            <Switch
              id="notifications-enabled"
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive email alerts for important updates</p>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
              disabled={!notificationsEnabled}
            />
          </div>

          <div className="space-y-3">
            <Label>Notification Types</Label>
            <div className="space-y-2">
              {[
                { id: "assigned", label: "When assigned to an issue", enabled: true },
                { id: "status", label: "When issue status changes", enabled: true },
                { id: "comments", label: "When someone comments on my issues", enabled: false },
                { id: "mentions", label: "When mentioned in comments", enabled: true },
                { id: "due", label: "When issues are due soon", enabled: true },
              ].map((notification) => (
                <div key={notification.id} className="flex items-center justify-between py-1">
                  <span className="text-sm">{notification.label}</span>
                  <Switch defaultChecked={notification.enabled} disabled={!notificationsEnabled} />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Code Generator Settings</CardTitle>
          <CardDescription>Configure AI code generation preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="ai-enabled">Enable AI Code Generation</Label>
              <p className="text-sm text-muted-foreground">Generate code solutions for issues automatically</p>
            </div>
            <Switch id="ai-enabled" defaultChecked />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="ai-model">AI Model</Label>
            <Select defaultValue="gpt-4">
              <SelectTrigger id="ai-model" className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                <SelectItem value="claude">Claude</SelectItem>
                <SelectItem value="llama">Llama</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Select the AI model to use for code generation</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="default-language">Default Language</Label>
            <Select defaultValue="javascript">
              <SelectTrigger id="default-language" className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Default programming language for code generation</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-generate">Auto-generate on issue view</Label>
              <p className="text-sm text-muted-foreground">Automatically generate code when viewing an issue</p>
            </div>
            <Switch id="auto-generate" defaultChecked={false} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </div>
    </div>
  )
}
