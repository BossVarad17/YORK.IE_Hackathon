"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Github,
  GitBranch,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Settings,
  Plus,
  ExternalLink,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface GitHubIntegrationProps {
  code: string
  issueKey: string
  issueTitle: string
  language: string
}

export function GitHubIntegration({ code, issueKey, issueTitle, language }: GitHubIntegrationProps) {
  const [githubToken, setGithubToken] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [repositories, setRepositories] = useState<any[]>([])
  const [selectedRepo, setSelectedRepo] = useState("")
  const [branchName, setBranchName] = useState(`feature/${issueKey.toLowerCase()}-fix`)
  const [commitMessage, setCommitMessage] = useState(`Fix: ${issueTitle} (${issueKey})`)
  const [fileName, setFileName] = useState(`fix-${issueKey.toLowerCase()}.${getFileExtension(language)}`)
  const [isLoading, setIsLoading] = useState(false)
  const [pushStatus, setPushStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [pullRequestUrl, setPullRequestUrl] = useState("")

  function getFileExtension(lang: string): string {
    switch (lang.toLowerCase()) {
      case "javascript":
        return "js"
      case "typescript":
        return "ts"
      case "python":
        return "py"
      case "java":
        return "java"
      case "csharp":
        return "cs"
      default:
        return "txt"
    }
  }

  const handleConnect = async () => {
    if (!githubToken.trim()) {
      setErrorMessage("Please enter a valid GitHub token")
      return
    }

    setIsLoading(true)
    setErrorMessage("")

    try {
      // Simulate GitHub API call to verify token and fetch repositories
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock repositories data
      const mockRepos = [
        { id: 1, name: "weather-app", full_name: "user/weather-app", private: false },
        { id: 2, name: "jira-integration", full_name: "user/jira-integration", private: true },
        { id: 3, name: "project-dashboard", full_name: "user/project-dashboard", private: false },
      ]

      setRepositories(mockRepos)
      setIsConnected(true)
      setPushStatus("idle")
    } catch (error) {
      setErrorMessage("Failed to connect to GitHub. Please check your token.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePushCode = async () => {
    if (!selectedRepo || !branchName || !fileName || !commitMessage) {
      setErrorMessage("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    setErrorMessage("")
    setPushStatus("idle")

    try {
      // Simulate GitHub API calls
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock successful push
      const mockPrUrl = `https://github.com/${selectedRepo}/pull/123`
      setPullRequestUrl(mockPrUrl)
      setPushStatus("success")
    } catch (error) {
      setErrorMessage("Failed to push code to GitHub. Please try again.")
      setPushStatus("error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setGithubToken("")
    setRepositories([])
    setSelectedRepo("")
    setPushStatus("idle")
    setErrorMessage("")
    setPullRequestUrl("")
  }

  if (!isConnected) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            GitHub Integration
          </CardTitle>
          <CardDescription>
            Connect your GitHub account to push generated code directly to your repositories
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="github-token">GitHub Personal Access Token</Label>
            <Input
              id="github-token"
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              <a
                href="https://github.com/settings/tokens/new?scopes=repo,workflow"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                Generate a new token with repo permissions
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>

          <Alert>
            <Settings className="h-4 w-4" />
            <AlertTitle>Required Permissions</AlertTitle>
            <AlertDescription>
              Your token needs the following scopes: <code>repo</code>, <code>workflow</code>
            </AlertDescription>
          </Alert>

          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <Button onClick={handleConnect} disabled={isLoading || !githubToken.trim()} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Github className="mr-2 h-4 w-4" />
                Connect to GitHub
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              GitHub Integration
              <Badge variant="default" className="bg-green-600">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Connected
              </Badge>
            </CardTitle>
            <CardDescription>Push your generated code to GitHub and create a pull request</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleDisconnect}>
            Disconnect
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="push" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="push">Push Code</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="push" className="space-y-4">
            {pushStatus === "success" && (
              <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-800 dark:text-green-200">Code Pushed Successfully!</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-300">
                  Your code has been pushed to the repository and a pull request has been created.
                  <a
                    href={pullRequestUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 inline-flex items-center gap-1 text-green-600 dark:text-green-400 hover:underline"
                  >
                    View Pull Request
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </AlertDescription>
              </Alert>
            )}

            {pushStatus === "error" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Push Failed</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="repository">Repository</Label>
                <Select value={selectedRepo} onValueChange={setSelectedRepo}>
                  <SelectTrigger id="repository">
                    <SelectValue placeholder="Select a repository" />
                  </SelectTrigger>
                  <SelectContent>
                    {repositories.map((repo) => (
                      <SelectItem key={repo.id} value={repo.full_name}>
                        <div className="flex items-center gap-2">
                          <span>{repo.name}</span>
                          {repo.private && (
                            <Badge variant="secondary" className="text-xs">
                              Private
                            </Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch-name">Branch Name</Label>
                <div className="relative">
                  <GitBranch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="branch-name"
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file-name">File Name</Label>
              <Input
                id="file-name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder={`fix-${issueKey.toLowerCase()}.${getFileExtension(language)}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="commit-message">Commit Message</Label>
              <Textarea
                id="commit-message"
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                placeholder="Describe your changes..."
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Code Preview</Label>
              <div className="rounded-md bg-muted p-4 max-h-40 overflow-y-auto">
                <pre className="text-sm">
                  <code>
                    {code.substring(0, 500)}
                    {code.length > 500 ? "..." : ""}
                  </code>
                </pre>
              </div>
            </div>

            <Button
              onClick={handlePushCode}
              disabled={isLoading || !selectedRepo || !branchName || !fileName}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Pushing to GitHub...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Push Code & Create PR
                </>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Connected Repositories</h3>
                <div className="space-y-2">
                  {repositories.map((repo) => (
                    <div key={repo.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Github className="h-4 w-4" />
                        <div>
                          <p className="font-medium">{repo.name}</p>
                          <p className="text-sm text-muted-foreground">{repo.full_name}</p>
                        </div>
                        {repo.private && <Badge variant="secondary">Private</Badge>}
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Default Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-create branch from issue key</span>
                    <Badge variant="outline">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-generate commit messages</span>
                    <Badge variant="outline">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Create pull request automatically</span>
                    <Badge variant="outline">Enabled</Badge>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Another Repository
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
