"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Code, Check, X, RefreshCw, Copy, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { GitHubIntegration } from "@/components/github-integration"

interface AICodeGeneratorProps {
  issueTitle: string
  issueDescription: string
  issueType: string
}

export function AICodeGenerator({ issueTitle, issueDescription, issueType }: AICodeGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCode, setGeneratedCode] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [isCopied, setIsCopied] = useState(false)
  const [status, setStatus] = useState<"idle" | "generating" | "completed" | "approved" | "declined">("idle")

  // Mock issue key for GitHub integration
  const issueKey = "WEATHER-123"

  // Mock code generation based on issue details
  const generateCode = () => {
    setIsGenerating(true)
    setStatus("generating")

    // Simulate API call to AI service
    setTimeout(() => {
      let code = ""

      if (issueType === "Bug") {
        if (issueTitle.toLowerCase().includes("temperature conversion")) {
          if (selectedLanguage === "javascript") {
            code = `// Fixed temperature conversion function
function convertTemperature(value, fromUnit, toUnit) {
  // Normalize to Celsius first
  let celsius;
  
  switch (fromUnit.toLowerCase()) {
    case 'celsius':
    case 'c':
      celsius = value;
      break;
    case 'fahrenheit':
    case 'f':
      celsius = (value - 32) * 5/9;
      break;
    case 'kelvin':
    case 'k':
      celsius = value - 273.15;
      break;
    default:
      throw new Error(\`Unsupported unit: \${fromUnit}\`);
  }
  
  // Convert from Celsius to target unit
  switch (toUnit.toLowerCase()) {
    case 'celsius':
    case 'c':
      return celsius;
    case 'fahrenheit':
    case 'f':
      return (celsius * 9/5) + 32;
    case 'kelvin':
    case 'k':
      return celsius + 273.15;
    default:
      throw new Error(\`Unsupported unit: \${toUnit}\`);
  }
}

// Example usage
console.log(convertTemperature(32, 'fahrenheit', 'celsius')); // 0
console.log(convertTemperature(0, 'celsius', 'fahrenheit')); // 32
console.log(convertTemperature(273.15, 'kelvin', 'celsius')); // 0

module.exports = { convertTemperature };`
          } else if (selectedLanguage === "typescript") {
            code = `// Fixed temperature conversion function
type TemperatureUnit = 'celsius' | 'c' | 'fahrenheit' | 'f' | 'kelvin' | 'k';

function convertTemperature(value: number, fromUnit: TemperatureUnit, toUnit: TemperatureUnit): number {
  // Normalize to Celsius first
  let celsius: number;
  
  switch (fromUnit.toLowerCase()) {
    case 'celsius':
    case 'c':
      celsius = value;
      break;
    case 'fahrenheit':
    case 'f':
      celsius = (value - 32) * 5/9;
      break;
    case 'kelvin':
    case 'k':
      celsius = value - 273.15;
      break;
    default:
      throw new Error(\`Unsupported unit: \${fromUnit}\`);
  }
  
  // Convert from Celsius to target unit
  switch (toUnit.toLowerCase()) {
    case 'celsius':
    case 'c':
      return celsius;
    case 'fahrenheit':
    case 'f':
      return (celsius * 9/5) + 32;
    case 'kelvin':
    case 'k':
      return celsius + 273.15;
    default:
      throw new Error(\`Unsupported unit: \${toUnit}\`);
  }
}

// Example usage
console.log(convertTemperature(32, 'fahrenheit', 'celsius')); // 0
console.log(convertTemperature(0, 'celsius', 'fahrenheit')); // 32
console.log(convertTemperature(273.15, 'kelvin', 'celsius')); // 0

export { convertTemperature, type TemperatureUnit };`
          } else if (selectedLanguage === "python") {
            code = `# Fixed temperature conversion function
def convert_temperature(value: float, from_unit: str, to_unit: str) -> float:
    """
    Convert temperature between Celsius, Fahrenheit, and Kelvin
    
    Args:
        value (float): Temperature value to convert
        from_unit (str): Source unit ('celsius', 'c', 'fahrenheit', 'f', 'kelvin', 'k')
        to_unit (str): Target unit ('celsius', 'c', 'fahrenheit', 'f', 'kelvin', 'k')
        
    Returns:
        float: Converted temperature value
        
    Raises:
        ValueError: If unsupported unit is provided
    """
    # Normalize to Celsius first
    from_unit = from_unit.lower()
    
    if from_unit in ['celsius', 'c']:
        celsius = value
    elif from_unit in ['fahrenheit', 'f']:
        celsius = (value - 32) * 5/9
    elif from_unit in ['kelvin', 'k']:
        celsius = value - 273.15
    else:
        raise ValueError(f"Unsupported unit: {from_unit}")
    
    # Convert from Celsius to target unit
    to_unit = to_unit.lower()
    
    if to_unit in ['celsius', 'c']:
        return celsius
    elif to_unit in ['fahrenheit', 'f']:
        return (celsius * 9/5) + 32
    elif to_unit in ['kelvin', 'k']:
        return celsius + 273.15
    else:
        raise ValueError(f"Unsupported unit: {to_unit}")

# Example usage
if __name__ == "__main__":
    print(convert_temperature(32, 'fahrenheit', 'celsius'))  # 0.0
    print(convert_temperature(0, 'celsius', 'fahrenheit'))   # 32.0
    print(convert_temperature(273.15, 'kelvin', 'celsius'))  # 0.0
`
          }
        } else {
          // Generic bug fix template
          if (selectedLanguage === "javascript") {
            code = `// Bug fix for ${issueTitle}
function fixIssue() {
  // Identify the root cause
  const problem = getProblemSource();
  
  // Apply the fix
  if (problem) {
    applyPatch(problem);
    runTests();
    logFixedIssue("${issueTitle}");
  }
  
  return "Issue fixed";
}

module.exports = { fixIssue };`
          } else if (selectedLanguage === "typescript") {
            code = `// Bug fix for ${issueTitle}
function fixIssue(): string {
  // Identify the root cause
  const problem: any = getProblemSource();
  
  // Apply the fix
  if (problem) {
    applyPatch(problem);
    runTests();
    logFixedIssue("${issueTitle}");
  }
  
  return "Issue fixed";
}

export { fixIssue };`
          } else if (selectedLanguage === "python") {
            code = `# Bug fix for ${issueTitle}
def fix_issue() -> str:
    """Fix the identified issue"""
    # Identify the root cause
    problem = get_problem_source()
    
    # Apply the fix
    if problem:
        apply_patch(problem)
        run_tests()
        log_fixed_issue("${issueTitle}")
    
    return "Issue fixed"

if __name__ == "__main__":
    result = fix_issue()
    print(result)
`
          }
        }
      } else if (issueType === "Feature") {
        // Feature implementation template
        if (selectedLanguage === "javascript") {
          code = `// Implementation for ${issueTitle}
class FeatureImplementation {
  constructor() {
    this.initialized = false;
  }
  
  initialize() {
    // Set up required resources
    this.initialized = true;
    console.log("Feature initialized");
  }
  
  execute(params) {
    if (!this.initialized) {
      this.initialize();
    }
    
    // Main feature logic here
    const result = processFeatureRequest(params);
    
    return {
      success: true,
      data: result
    };
  }
  
  shutdown() {
    // Clean up resources
    this.initialized = false;
  }
}

module.exports = { FeatureImplementation };`
        } else if (selectedLanguage === "typescript") {
          code = `// Implementation for ${issueTitle}
interface FeatureParams {
  [key: string]: any;
}

interface FeatureResult {
  success: boolean;
  data: any;
}

class FeatureImplementation {
  private initialized: boolean;
  
  constructor() {
    this.initialized = false;
  }
  
  initialize(): void {
    // Set up required resources
    this.initialized = true;
    console.log("Feature initialized");
  }
  
  execute(params: FeatureParams): FeatureResult {
    if (!this.initialized) {
      this.initialize();
    }
    
    // Main feature logic here
    const result = processFeatureRequest(params);
    
    return {
      success: true,
      data: result
    };
  }
  
  shutdown(): void {
    // Clean up resources
    this.initialized = false;
  }
}

export { FeatureImplementation, type FeatureParams, type FeatureResult };`
        } else if (selectedLanguage === "python") {
          code = `# Implementation for ${issueTitle}
from typing import Dict, Any

class FeatureImplementation:
    """Implementation class for the new feature"""
    
    def __init__(self):
        self.initialized = False
    
    def initialize(self) -> None:
        """Set up required resources"""
        self.initialized = True
        print("Feature initialized")
    
    def execute(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Execute the main feature logic"""
        if not self.initialized:
            self.initialize()
        
        # Main feature logic here
        result = self._process_feature_request(params)
        
        return {
            "success": True,
            "data": result
        }
    
    def shutdown(self) -> None:
        """Clean up resources"""
        self.initialized = False
    
    def _process_feature_request(self, params: Dict[str, Any]) -> Any:
        """Process the feature request"""
        # Implementation details here
        return params

if __name__ == "__main__":
    feature = FeatureImplementation()
    result = feature.execute({"test": "data"})
    print(result)
`
        }
      } else {
        // Generic implementation
        if (selectedLanguage === "javascript") {
          code = `// Implementation for ${issueTitle}
function implementSolution() {
  console.log("Implementing solution for: ${issueTitle}");
  
  // Your implementation here
  
  return "Implementation complete";
}

module.exports = { implementSolution };`
        } else if (selectedLanguage === "typescript") {
          code = `// Implementation for ${issueTitle}
function implementSolution(): string {
  console.log("Implementing solution for: ${issueTitle}");
  
  // Your implementation here
  
  return "Implementation complete";
}

export { implementSolution };`
        } else if (selectedLanguage === "python") {
          code = `# Implementation for ${issueTitle}
def implement_solution() -> str:
    """Implement solution for the issue"""
    print("Implementing solution for: ${issueTitle}")
    
    # Your implementation here
    
    return "Implementation complete"

if __name__ == "__main__":
    result = implement_solution()
    print(result)
`
        }
      }

      setGeneratedCode(code)
      setIsGenerating(false)
      setStatus("completed")
    }, 2000)
  }

  const handleCopyCode = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  const handleApprove = () => {
    setStatus("approved")
    // In a real app, this would save the code to the repository or create a PR
  }

  const handleDecline = () => {
    setStatus("declined")
    // In a real app, this might log feedback or request improvements
  }

  const handleRegenerate = () => {
    setGeneratedCode(null)
    setStatus("idle")
    generateCode()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Code Generator
              </CardTitle>
              <CardDescription>Generate code solutions based on this issue</CardDescription>
            </div>
            {status === "approved" && (
              <Badge variant="default" className="bg-green-600">
                <Check className="mr-1 h-3 w-3" /> Approved
              </Badge>
            )}
            {status === "declined" && (
              <Badge variant="destructive">
                <X className="mr-1 h-3 w-3" /> Declined
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!generatedCode && status === "idle" && (
            <div className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <h3 className="font-medium mb-2">Issue Summary</h3>
                <p className="text-sm text-muted-foreground">{issueTitle}</p>

                <h3 className="font-medium mt-4 mb-2">Description</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {issueDescription || "No description provided."}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">Select language:</p>
                <div className="flex gap-2">
                  {["javascript", "typescript", "python"].map((lang) => (
                    <Badge
                      key={lang}
                      variant={selectedLanguage === lang ? "default" : "outline"}
                      className={cn("cursor-pointer", selectedLanguage === lang ? "" : "hover:bg-muted")}
                      onClick={() => setSelectedLanguage(lang)}
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button onClick={generateCode} className="w-full">
                <Code className="mr-2 h-4 w-4" />
                Generate Code Solution
              </Button>
            </div>
          )}

          {status === "generating" && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Analyzing issue and generating code solution...
              </p>
            </div>
          )}

          {generatedCode && (status === "completed" || status === "approved" || status === "declined") && (
            <div className="space-y-4">
              <Tabs defaultValue={selectedLanguage} onValueChange={setSelectedLanguage}>
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                  </TabsList>

                  <Button variant="outline" size="sm" onClick={handleCopyCode} disabled={isCopied}>
                    {isCopied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Code
                      </>
                    )}
                  </Button>
                </div>

                <TabsContent value={selectedLanguage} className="mt-2">
                  <div className="relative">
                    <pre className="rounded-md bg-muted p-4 overflow-x-auto max-h-96">
                      <code className="text-sm">{generatedCode}</code>
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>

        {generatedCode && status === "completed" && (
          <CardFooter className="flex justify-between gap-2">
            <Button variant="outline" className="w-full" onClick={handleDecline}>
              <X className="mr-2 h-4 w-4" />
              Decline
            </Button>
            <Button variant="outline" className="w-full" onClick={handleRegenerate}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
            <Button className="w-full" onClick={handleApprove}>
              <Check className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </CardFooter>
        )}

        {(status === "approved" || status === "declined") && (
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={handleRegenerate}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate New Solution
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* GitHub Integration - only show when code is approved */}
      {generatedCode && status === "approved" && (
        <GitHubIntegration
          code={generatedCode}
          issueKey={issueKey}
          issueTitle={issueTitle}
          language={selectedLanguage}
        />
      )}
    </div>
  )
}
