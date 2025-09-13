import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  AlertTriangle,
  Droplets,
  Users,
  Activity,
  Shield,
  Bell,
  TrendingUp,
  Brain,
  Zap,
  Target,
  Award,
  Globe,
  Smartphone,
} from "lucide-react"

const outbreakData = [
  { month: "Jan", cases: 12, waterQuality: 85, predicted: 10, prevented: 8 },
  { month: "Feb", cases: 8, waterQuality: 78, predicted: 12, prevented: 15 },
  { month: "Mar", cases: 15, waterQuality: 72, predicted: 18, prevented: 12 },
  { month: "Apr", cases: 22, waterQuality: 68, predicted: 25, prevented: 18 },
  { month: "May", cases: 35, waterQuality: 65, predicted: 38, prevented: 22 },
  { month: "Jun", cases: 28, waterQuality: 70, predicted: 32, prevented: 28 },
]

const diseaseData = [
  { name: "Diarrhea", value: 45, color: "#dc2626", trend: "+12%" },
  { name: "Cholera", value: 25, color: "#f59e0b", trend: "-8%" },
  { name: "Typhoid", value: 20, color: "#374151", trend: "+3%" },
  { name: "Hepatitis A", value: 10, color: "#6b7280", trend: "-15%" },
]

const aiMetrics = [
  { subject: "Accuracy", A: 92, fullMark: 100 },
  { subject: "Precision", A: 88, fullMark: 100 },
  { subject: "Recall", A: 85, fullMark: 100 },
  { subject: "F1-Score", A: 87, fullMark: 100 },
  { subject: "Coverage", A: 94, fullMark: 100 },
  { subject: "Response Time", A: 96, fullMark: 100 },
]

const waterSources = [
  {
    id: 1,
    name: "Village Well A",
    status: "contaminated",
    lastTested: "2 hours ago",
    riskLevel: "critical",
    ph: 6.2,
    turbidity: 15.2,
    bacteria: 850,
  },
  {
    id: 2,
    name: "River Source B",
    status: "safe",
    lastTested: "1 hour ago",
    riskLevel: "low",
    ph: 7.1,
    turbidity: 2.1,
    bacteria: 12,
  },
  {
    id: 3,
    name: "Borehole C",
    status: "moderate",
    lastTested: "45 min ago",
    riskLevel: "medium",
    ph: 6.8,
    turbidity: 8.5,
    bacteria: 180,
  },
  {
    id: 4,
    name: "Community Tank D",
    status: "contaminated",
    lastTested: "30 min ago",
    riskLevel: "high",
    ph: 5.9,
    turbidity: 22.1,
    bacteria: 1200,
  },
]

export default function HealthDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 p-8 border border-primary/20">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-balance bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    HealthGuard AI
                  </h1>
                  <p className="text-lg text-muted-foreground text-pretty">
                    Next-Generation Disease Surveillance & Prevention Platform
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span>15 Communities</span>
                </div>
                <div className="flex items-center gap-1">
                  <Smartphone className="h-4 w-4" />
                  <span>180 Active Users</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  <span>Real-time Monitoring</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700 px-3 py-1">
                <Activity className="mr-2 h-4 w-4" />
                System Operational
              </Badge>
              <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 px-3 py-1">
                <Brain className="mr-2 h-4 w-4" />
                AI Active
              </Badge>
              <Button size="lg" className="shadow-lg">
                <Bell className="mr-2 h-5 w-5" />
                Alerts (3)
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Alert className="border-destructive/50 bg-gradient-to-r from-destructive/10 to-destructive/5 shadow-lg">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <AlertTitle className="text-destructive text-lg">Critical Water Contamination</AlertTitle>
            <AlertDescription className="text-base">
              AI detected severe contamination in Village Well A. 850+ bacteria count detected.
              <div className="mt-3 flex gap-2">
                <Button variant="destructive" size="sm" className="shadow-md">
                  Deploy Response Team
                </Button>
                <Button variant="outline" size="sm">
                  View Analytics
                </Button>
              </div>
            </AlertDescription>
          </Alert>

          <Alert className="border-secondary/50 bg-gradient-to-r from-secondary/10 to-secondary/5 shadow-lg">
            <Target className="h-5 w-5 text-secondary-foreground" />
            <AlertTitle className="text-secondary-foreground text-lg">Outbreak Prevention Success</AlertTitle>
            <AlertDescription className="text-base">
              AI predictions prevented 28 potential cases this month through early intervention.
              <div className="mt-3">
                <Button variant="secondary" size="sm" className="shadow-md">
                  View Success Metrics
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Active Cases</CardTitle>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-primary">127</div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium">12% reduction</span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Water Sources</CardTitle>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                <Droplets className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold">24</div>
              <div className="flex items-center gap-1 text-sm">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span className="text-orange-600 font-medium">8 contaminated</span>
                <span className="text-muted-foreground">sources</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent" />
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">AI Accuracy</CardTitle>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                <Brain className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-green-600">92%</div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium">+3.2%</span>
                <span className="text-muted-foreground">improvement</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent" />
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Prevention Rate</CardTitle>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10">
                <Shield className="h-5 w-5 text-secondary-foreground" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-secondary-foreground">87%</div>
              <div className="flex items-center gap-1 text-sm">
                <Award className="h-4 w-4 text-secondary-foreground" />
                <span className="text-secondary-foreground font-medium">Industry leading</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 h-12 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-background data-[state=active]:shadow-md">
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="ai-analytics"
              className="data-[state=active]:bg-background data-[state=active]:shadow-md"
            >
              AI Analytics
            </TabsTrigger>
            <TabsTrigger
              value="water-quality"
              className="data-[state=active]:bg-background data-[state=active]:shadow-md"
            >
              Water Quality
            </TabsTrigger>
            <TabsTrigger value="outbreaks" className="data-[state=active]:bg-background data-[state=active]:shadow-md">
              Disease Tracking
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-background data-[state=active]:shadow-md">
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Disease Outbreak Trends & AI Predictions
                  </CardTitle>
                  <CardDescription>Real-time cases vs AI predictions with prevention impact</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={outbreakData}>
                      <defs>
                        <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="cases"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#colorCases)"
                        strokeWidth={3}
                      />
                      <Area
                        type="monotone"
                        dataKey="predicted"
                        stroke="hsl(var(--secondary))"
                        fillOpacity={1}
                        fill="url(#colorPredicted)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                      <Line type="monotone" dataKey="prevented" stroke="#10b981" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Disease Distribution
                  </CardTitle>
                  <CardDescription>Current outbreak composition with trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {diseaseData.map((disease, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full" style={{ backgroundColor: disease.color }} />
                          <span className="font-medium">{disease.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">{disease.value}%</span>
                          <Badge
                            variant={disease.trend.startsWith("+") ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {disease.trend}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai-analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    AI Model Performance
                  </CardTitle>
                  <CardDescription>Real-time machine learning metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={aiMetrics}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                      />
                      <Radar
                        name="Performance"
                        dataKey="A"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-secondary-foreground" />
                    Prediction Accuracy
                  </CardTitle>
                  <CardDescription>AI vs actual outcomes over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={outbreakData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="cases"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        name="Actual Cases"
                      />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="hsl(var(--secondary))"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="AI Predicted"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-green-700 dark:text-green-400">Model Confidence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">94.2%</div>
                  <Progress value={94.2} className="mt-2 h-2" />
                  <p className="text-sm text-green-600/80 dark:text-green-400/80 mt-1">High confidence predictions</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-blue-700 dark:text-blue-400">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">1.2s</div>
                  <Progress value={96} className="mt-2 h-2" />
                  <p className="text-sm text-blue-600/80 dark:text-blue-400/80 mt-1">Average prediction latency</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-purple-700 dark:text-purple-400">Data Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">98.7%</div>
                  <Progress value={98.7} className="mt-2 h-2" />
                  <p className="text-sm text-purple-600/80 dark:text-purple-400/80 mt-1">Clean, validated data</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="water-quality" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-600" />
                  Real-Time Water Source Monitoring
                </CardTitle>
                <CardDescription>Live sensor data and contamination alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {waterSources.map((source) => (
                    <div key={source.id} className="rounded-xl border bg-card/50 p-6 shadow-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-lg">{source.name}</h3>
                          <p className="text-sm text-muted-foreground">Last updated: {source.lastTested}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              source.status === "safe"
                                ? "default"
                                : source.status === "contaminated"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className="px-3 py-1"
                          >
                            {source.status.toUpperCase()}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={
                              source.riskLevel === "critical" || source.riskLevel === "high"
                                ? "border-destructive text-destructive"
                                : source.riskLevel === "medium"
                                  ? "border-secondary text-secondary-foreground"
                                  : "border-green-500 text-green-600"
                            }
                          >
                            {source.riskLevel} risk
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">pH Level</p>
                          <p className="text-2xl font-bold">{source.ph}</p>
                          <Progress value={((source.ph - 6) / 2) * 100} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Turbidity (NTU)</p>
                          <p className="text-2xl font-bold">{source.turbidity}</p>
                          <Progress value={Math.min((source.turbidity / 25) * 100, 100)} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Bacteria (CFU/ml)</p>
                          <p className="text-2xl font-bold">{source.bacteria}</p>
                          <Progress value={Math.min((source.bacteria / 1000) * 100, 100)} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disease Tracking tab */}
          <TabsContent value="outbreaks" className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Monthly Case Reports</CardTitle>
                <CardDescription>Track disease patterns across communities</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={outbreakData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="cases" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community tab */}
          <TabsContent value="community" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Community Engagement</CardTitle>
                  <CardDescription>ASHA worker and volunteer participation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Active ASHA Workers</span>
                      <span>24/30</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Community Volunteers</span>
                      <span>156/200</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Health Education Coverage</span>
                      <span>12/15 villages</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest community health actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Water testing completed in Village A</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-secondary mt-2"></div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Health education session conducted</p>
                        <p className="text-xs text-muted-foreground">5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground mt-2"></div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">New case reported in District B</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
