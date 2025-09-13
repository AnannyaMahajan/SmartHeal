"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Brain,
  AlertTriangle,
  Target,
  Calendar,
  MapPin,
  Droplets,
  Thermometer,
  CloudRain,
  Activity,
  Zap,
  RefreshCw,
} from "lucide-react"

// Mock AI prediction data
const outbreakPredictions = [
  {
    id: 1,
    disease: "Diarrhea",
    location: "Kamrup District",
    riskLevel: "high",
    probability: 87,
    predictedCases: 45,
    timeframe: "Next 7 days",
    factors: ["High water contamination", "Monsoon season", "Population density"],
    confidence: 92,
  },
  {
    id: 2,
    disease: "Cholera",
    location: "Guwahati Block",
    riskLevel: "medium",
    probability: 64,
    predictedCases: 12,
    timeframe: "Next 14 days",
    factors: ["Moderate water quality", "Temperature rise", "Previous cases"],
    confidence: 78,
  },
  {
    id: 3,
    disease: "Typhoid",
    location: "Dibrugarh District",
    riskLevel: "low",
    probability: 23,
    predictedCases: 3,
    timeframe: "Next 30 days",
    factors: ["Improved sanitation", "Low contamination"],
    confidence: 85,
  },
]

const historicalAccuracy = [
  { month: "Jan", predicted: 25, actual: 28, accuracy: 89 },
  { month: "Feb", predicted: 18, actual: 16, accuracy: 94 },
  { month: "Mar", predicted: 32, actual: 35, accuracy: 91 },
  { month: "Apr", predicted: 45, actual: 42, accuracy: 93 },
  { month: "May", predicted: 38, actual: 41, accuracy: 92 },
  { month: "Jun", predicted: 52, actual: 48, accuracy: 92 },
]

const riskFactors = [
  { factor: "Water Quality", weight: 35, impact: "high", trend: "increasing" },
  { factor: "Weather Patterns", weight: 25, impact: "high", trend: "stable" },
  { factor: "Population Density", weight: 20, impact: "medium", trend: "increasing" },
  { factor: "Sanitation Level", weight: 15, impact: "medium", trend: "improving" },
  { factor: "Previous Outbreaks", weight: 5, impact: "low", trend: "decreasing" },
]

const environmentalData = [
  { date: "2024-01-01", temperature: 28, rainfall: 12, humidity: 78, waterQuality: 65 },
  { date: "2024-01-02", temperature: 29, rainfall: 8, humidity: 82, waterQuality: 62 },
  { date: "2024-01-03", temperature: 31, rainfall: 15, humidity: 85, waterQuality: 58 },
  { date: "2024-01-04", temperature: 30, rainfall: 22, humidity: 88, waterQuality: 55 },
  { date: "2024-01-05", temperature: 28, rainfall: 18, humidity: 84, waterQuality: 60 },
  { date: "2024-01-06", temperature: 27, rainfall: 5, humidity: 76, waterQuality: 68 },
  { date: "2024-01-07", temperature: 29, rainfall: 0, humidity: 72, waterQuality: 72 },
]

const modelMetrics = {
  accuracy: 92.3,
  precision: 89.7,
  recall: 94.1,
  f1Score: 91.8,
  lastTrained: "2024-01-15",
  dataPoints: 15420,
}

export default function AIOutbreakPrediction() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7days")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate AI model refresh
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsRefreshing(false)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600"
    if (confidence >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance flex items-center gap-2">
              <Brain className="h-8 w-8 text-primary" />
              AI Outbreak Prediction
            </h1>
            <p className="text-muted-foreground text-pretty">
              Machine learning-powered disease outbreak forecasting and risk assessment
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">7 Days</SelectItem>
                <SelectItem value="14days">14 Days</SelectItem>
                <SelectItem value="30days">30 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh Model
            </Button>
          </div>
        </div>

        {/* High Risk Alert */}
        <Alert className="border-destructive bg-destructive/10">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertTitle className="text-destructive">High Risk Prediction</AlertTitle>
          <AlertDescription>
            AI model predicts 87% probability of diarrhea outbreak in Kamrup District within 7 days. Immediate
            preventive measures recommended.
          </AlertDescription>
        </Alert>

        {/* Model Performance Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{modelMetrics.accuracy}%</div>
              <p className="text-xs text-muted-foreground">
                Based on {modelMetrics.dataPoints.toLocaleString()} data points
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Predictions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{outbreakPredictions.length}</div>
              <p className="text-xs text-muted-foreground">
                {outbreakPredictions.filter((p) => p.riskLevel === "high").length} high risk
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(outbreakPredictions.reduce((acc, p) => acc + p.confidence, 0) / outbreakPredictions.length)}
                %
              </div>
              <p className="text-xs text-muted-foreground">Model reliability score</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h</div>
              <p className="text-xs text-muted-foreground">Model retrained: {modelMetrics.lastTrained}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="predictions" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="risk-factors">Risk Factors</TabsTrigger>
            <TabsTrigger value="model-performance">Model Performance</TabsTrigger>
            <TabsTrigger value="environmental">Environmental Data</TabsTrigger>
          </TabsList>

          <TabsContent value="predictions" className="space-y-4">
            <div className="grid gap-4">
              {outbreakPredictions.map((prediction) => (
                <Card key={prediction.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        {prediction.disease} Outbreak Prediction
                      </CardTitle>
                      <Badge className={getRiskColor(prediction.riskLevel)}>
                        {prediction.riskLevel.toUpperCase()} RISK
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {prediction.location} • {prediction.timeframe}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Outbreak Probability</span>
                          <span className="font-mono">{prediction.probability}%</span>
                        </div>
                        <Progress value={prediction.probability} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Predicted Cases</span>
                          <span className="font-mono">{prediction.predictedCases}</span>
                        </div>
                        <Progress value={(prediction.predictedCases / 100) * 100} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Model Confidence</span>
                          <span className={`font-mono ${getConfidenceColor(prediction.confidence)}`}>
                            {prediction.confidence}%
                          </span>
                        </div>
                        <Progress value={prediction.confidence} className="h-2" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Contributing Risk Factors:</h4>
                      <div className="flex flex-wrap gap-2">
                        {prediction.factors.map((factor, index) => (
                          <Badge key={index} variant="outline">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="destructive">
                        Issue Alert
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Generate Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="risk-factors" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Factor Analysis</CardTitle>
                  <CardDescription>AI-identified factors contributing to outbreak risk</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {riskFactors.map((factor, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{factor.factor}</span>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={
                              factor.impact === "high"
                                ? "border-red-200 text-red-700"
                                : factor.impact === "medium"
                                  ? "border-yellow-200 text-yellow-700"
                                  : "border-green-200 text-green-700"
                            }
                          >
                            {factor.impact}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{factor.weight}%</span>
                        </div>
                      </div>
                      <Progress value={factor.weight} className="h-2" />
                      <p className="text-xs text-muted-foreground">Trend: {factor.trend}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Distribution</CardTitle>
                  <CardDescription>Current risk levels across monitored areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "High Risk", value: 1, color: "#dc2626" },
                          { name: "Medium Risk", value: 1, color: "#f59e0b" },
                          { name: "Low Risk", value: 1, color: "#16a34a" },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {[
                          { name: "High Risk", value: 1, color: "#dc2626" },
                          { name: "Medium Risk", value: 1, color: "#f59e0b" },
                          { name: "Low Risk", value: 1, color: "#16a34a" },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="model-performance" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Prediction Accuracy Over Time</CardTitle>
                  <CardDescription>Historical model performance vs actual outcomes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={historicalAccuracy}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        name="Predicted Cases"
                      />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="hsl(var(--secondary))"
                        strokeWidth={2}
                        name="Actual Cases"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Model Metrics</CardTitle>
                  <CardDescription>Current AI model performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Accuracy</span>
                      <span className="font-mono text-green-600">{modelMetrics.accuracy}%</span>
                    </div>
                    <Progress value={modelMetrics.accuracy} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Precision</span>
                      <span className="font-mono text-green-600">{modelMetrics.precision}%</span>
                    </div>
                    <Progress value={modelMetrics.precision} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Recall</span>
                      <span className="font-mono text-green-600">{modelMetrics.recall}%</span>
                    </div>
                    <Progress value={modelMetrics.recall} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>F1 Score</span>
                      <span className="font-mono text-green-600">{modelMetrics.f1Score}%</span>
                    </div>
                    <Progress value={modelMetrics.f1Score} className="h-2" />
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Training Data: {modelMetrics.dataPoints.toLocaleString()} samples
                    </p>
                    <p className="text-sm text-muted-foreground">Last Trained: {modelMetrics.lastTrained}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="environmental" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Factors Correlation</CardTitle>
                <CardDescription>How environmental conditions correlate with outbreak risk</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={environmentalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke="hsl(var(--destructive))"
                      strokeWidth={2}
                      name="Temperature (°C)"
                    />
                    <Line
                      type="monotone"
                      dataKey="rainfall"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      name="Rainfall (mm)"
                    />
                    <Line
                      type="monotone"
                      dataKey="humidity"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={2}
                      name="Humidity (%)"
                    />
                    <Line
                      type="monotone"
                      dataKey="waterQuality"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Water Quality Index"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Temperature Impact</CardTitle>
                  <Thermometer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">High</div>
                  <p className="text-xs text-muted-foreground">Correlation: +0.78</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rainfall Impact</CardTitle>
                  <CloudRain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Medium</div>
                  <p className="text-xs text-muted-foreground">Correlation: +0.45</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Water Quality Impact</CardTitle>
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Critical</div>
                  <p className="text-xs text-muted-foreground">Correlation: -0.89</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
