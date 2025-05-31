"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Zap, Shield, Sparkles, BarChart3, Users, Bot, ArrowRight, Play, Star, Layers } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface JiraConnectProps {
  onConnect: () => void
}

export function JiraConnect({ onConnect }: JiraConnectProps) {
  const [connectMethod, setConnectMethod] = useState("oauth")
  const [jiraUrl, setJiraUrl] = useState("")
  const [username, setUsername] = useState("")
  const [apiToken, setApiToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleConnect = () => {
    setLoading(true)
    setError("")

    // Simulate API connection
    setTimeout(() => {
      if (connectMethod === "oauth") {
        onConnect()
      } else if (connectMethod === "token") {
        if (!jiraUrl || !username || !apiToken) {
          setError("Please fill in all fields")
          setLoading(false)
          return
        }
        onConnect()
      }
      setLoading(false)
    }, 1500)
  }

  const features = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: "AI-Powered Code Generation",
      description: "Generate code solutions automatically from issue descriptions using advanced AI models.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "Track project progress with detailed insights, charts, and performance metrics.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Collaboration",
      description: "Seamless team management with role-based access and real-time collaboration.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Bank-level security with OAuth 2.0, API tokens, and encrypted data transmission.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Optimized performance with real-time sync and instant notifications.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Multi-Project Support",
      description: "Manage multiple Jira projects from a single, unified dashboard interface.",
      color: "from-indigo-500 to-purple-500",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Engineering Manager",
      company: "TechCorp",
      content:
        "Jira Pro has transformed how our team manages projects. The AI code generation saves us hours every week.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Michael Rodriguez",
      role: "Product Owner",
      company: "StartupXYZ",
      content: "The analytics dashboard gives us insights we never had before. Game-changer for project planning.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Emily Johnson",
      role: "Lead Developer",
      company: "DevStudio",
      content:
        "Integration was seamless, and the interface is incredibly intuitive. Our productivity has increased 40%.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "2M+", label: "Issues Managed" },
    { value: "500+", label: "Companies" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Jira Pro
                </h1>
                <p className="text-xs text-muted-foreground">Advanced Project Management</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="outline" className="hidden md:flex">
                Documentation
              </Button>
              <Button variant="outline" className="hidden md:flex">
                Support
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                AI-Powered Project Management
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Transform Your{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Jira Workflow
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Supercharge your project management with AI-powered code generation, advanced analytics, and seamless
                team collaboration. Experience the future of issue tracking today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="gradient-bg hover:opacity-90 transition-all duration-300 text-lg px-8 py-6"
                onClick={() => document.getElementById("connect-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 hover:bg-accent/50 transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm font-medium">4.9/5 rating</span>
              </div>
              <div className="text-sm text-muted-foreground">Trusted by 500+ companies</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
            <Card className="relative glass-effect border-0 shadow-2xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">Quick Connect</CardTitle>
                <CardDescription>Get started in under 2 minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="oauth" onValueChange={setConnectMethod}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="oauth">OAuth (Recommended)</TabsTrigger>
                    <TabsTrigger value="token">API Token</TabsTrigger>
                  </TabsList>
                  <TabsContent value="oauth" className="mt-6">
                    <div className="space-y-4">
                      <div className="text-center p-6 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border border-blue-200 dark:border-blue-800">
                        <Shield className="h-12 w-12 mx-auto text-blue-600 dark:text-blue-400 mb-3" />
                        <p className="text-sm text-muted-foreground">
                          Secure OAuth 2.0 authentication with your Atlassian account
                        </p>
                      </div>
                      <Button
                        className="w-full gradient-bg hover:opacity-90 transition-all duration-300 py-6 text-lg"
                        onClick={handleConnect}
                        disabled={loading}
                      >
                        {loading ? "Connecting..." : "Connect with Atlassian"}
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="token" className="mt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="jira-url">Jira Instance URL</Label>
                        <Input
                          id="jira-url"
                          placeholder="https://your-domain.atlassian.net"
                          value={jiraUrl}
                          onChange={(e) => setJiraUrl(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Email</Label>
                        <Input
                          id="username"
                          placeholder="your.email@example.com"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="api-token">API Token</Label>
                        <Input
                          id="api-token"
                          type="password"
                          placeholder="Your Jira API token"
                          value={apiToken}
                          onChange={(e) => setApiToken(e.target.value)}
                        />
                      </div>
                      <Button
                        className="w-full gradient-bg hover:opacity-90 transition-all duration-300 py-6"
                        onClick={handleConnect}
                        disabled={loading}
                      >
                        {loading ? "Connecting..." : "Connect with API Token"}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border/50 bg-muted/20">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-muted-foreground mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Modern Teams
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to manage projects efficiently, from AI-powered automation to advanced analytics
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 glass-effect">
              <CardHeader>
                <div
                  className={`h-12 w-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/20 border-y border-border/50">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Loved by{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Developers
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">See what our users have to say about Jira Pro</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-effect border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="connect-section" className="container mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Ready to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get Started?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of teams already using Jira Pro to streamline their project management workflow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="gradient-bg hover:opacity-90 transition-all duration-300 text-lg px-8 py-6"
              onClick={handleConnect}
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/20">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-lg">Jira Pro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Advanced project management and issue tracking for modern development teams.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Features</div>
                <div>Pricing</div>
                <div>Integrations</div>
                <div>API</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>About</div>
                <div>Blog</div>
                <div>Careers</div>
                <div>Contact</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Documentation</div>
                <div>Help Center</div>
                <div>Community</div>
                <div>Status</div>
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 mt-12 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Jira Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
