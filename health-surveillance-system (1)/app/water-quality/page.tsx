"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  Droplets,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Thermometer,
  Zap,
  Activity,
  Plus,
  RefreshCw,
  Download,
  Upload,
} from "lucide-react"

// Mock data for water quality monitoring
const waterSources = [
  {
    id: 1,
    name: "Village Well A",
    location: "Kamrup District",
    coordinates: { lat: 26.1445, lng: 91.7362 },
    status: "contaminated",
    lastTested: "2 hours ago",
    riskLevel: "high",
    ph: 6.2,
    turbidity: 15.8,
    bacteria: 850,
    chlorine: 0.1,
    temperature: 28.5,
    conductivity: 420,
  },
  {
    id: 2,
    name: "River Source B",
    location: "Guwahati Block",
    coordinates: { lat: 26.1158, lng: 91.7086 },
    status: "safe",
    lastTested: "1 hour ago",
    riskLevel: "low",
    ph: 7.2,
    turbidity: 2.1,
    bacteria: 45,
    chlorine: 0.8,
    temperature: 26.8,
    conductivity: 280,
  },
  {
    id: 3,
    name: "Borehole C",
    location: "Dibrugarh District",
    coordinates: { lat: 27.4728, lng: 94.912 },
    status: "moderate",
    lastTested: "4 hours ago",
    riskLevel: "medium",
    ph: 6.8,
    turbidity: 8.5,
    bacteria: 180,
    chlorine: 0.4,
    temperature: 24.2,
    conductivity: 350,
  },
  {
    id: 4,
    name: "Community Tank D",
    location: "Jorhat Block",
    coordinates: { lat: 26.7509, lng: 94.2037 },
    status: "contaminated",
    lastTested: "30 minutes ago",
    riskLevel: "high",
    ph: 5.9,
    turbidity: 22.3,
    bacteria: 1200,
    chlorine: 0.05,
    temperature: 29.1,
    conductivity: 480,
  },
]

const historicalData = [
  { time: "00:00", ph: 7.1, turbidity: 3.2, bacteria: 65 },
  { time: "04:00", ph: 7.0, turbidity: 4.1, bacteria: 78 },
  { time: "08:00", ph: 6.9, turbidity: 5.8, bacteria: 95 },
  { time: "12:00", ph: 6.7, turbidity: 8.2, bacteria: 145 },
  { time: "16:00", ph: 6.5, turbidity: 12.1, bacteria: 220 },
  { time: "20:00", ph: 6.3, turbidity: 15.8, bacteria: 350 },
]

const testKitResults = [
  {
    id: 1,
    testKit: "TK-001",
    location: "Village Well A",
    tester: "Priya Sharma",
    date: "2024-01-15",
    results: "Contaminated",
  },
  { id: 2, testKit: "TK-002", location: "River Source B", tester: "Raj Kumar", date: "2024-01-15", results: "Safe" },
  {
    id: 3,
    testKit: "TK-003",
    location: "Borehole C",
    tester: "Anita Das",
    date: "2024-01-14",
    results: "Moderate Risk",
  },
]

export default function WaterQualityMonitoring() {
  const [selectedSource, setSelectedSource] = useState(waterSources[0])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "bg-green-100 text-green-800 border-green-200"
      case "moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "contaminated":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getParameterStatus = (parameter: string, value: number) => {
    const ranges = {
      ph: { safe: [6.5, 8.5], moderate: [6.0, 9.0] },
      turbidity: { safe: [0, 5], moderate: [5, 10] },
      bacteria: { safe: [0, 100], moderate: [100, 500] },
      chlorine: { safe: [0.2, 2.0], moderate: [0.1, 0.2] },
    }

    const range = ranges[parameter as keyof typeof ranges]
    if (!range) return "unknown"

    if (value >= range.safe[0] && value <= range.safe[1]) return "safe"
    if (value >= range.moderate[0] && value <= range.moderate[1]) return "moderate"
    return "danger"
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Water Quality Monitoring</h1>
            <p className="text-muted-foreground text-pretty">
              Real-time monitoring of water sources across communities
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh Data
            </Button>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Source
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Water Source</DialogTitle>
                  <DialogDescription>Register a new water source for monitoring</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="source-name">Source Name</Label>
                    <Input id="source-name" placeholder="Enter water source name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Enter location details" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="source-type">Source Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="well">Village Well</SelectItem>
                        <SelectItem value="borehole">Borehole</SelectItem>
                        <SelectItem value="river">River/Stream</SelectItem>
                        <SelectItem value="tank">Community Tank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Add Water Source</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Critical Alerts */}
        <Alert className="border-destructive bg-destructive/10">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertTitle className="text-destructive">Water Quality Alert</AlertTitle>
          <AlertDescription>
            2 water sources showing high contamination levels. Immediate testing and treatment required.
          </AlertDescription>
        </Alert>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sources</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{waterSources.length}</div>
              <p className="text-xs text-muted-foreground">Across 4 districts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Safe Sources</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {waterSources.filter((s) => s.status === "safe").length}
              </div>
              <p className="text-xs text-muted-foreground">25% of total sources</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contaminated</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {waterSources.filter((s) => s.status === "contaminated").length}
              </div>
              <p className="text-xs text-muted-foreground">Requires immediate action</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2m</div>
              <p className="text-xs text-muted-foreground">Auto-refresh enabled</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="live-monitoring" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="live-monitoring">Live Monitoring</TabsTrigger>
            <TabsTrigger value="test-results">Test Results</TabsTrigger>
            <TabsTrigger value="historical">Historical Data</TabsTrigger>
            <TabsTrigger value="sensors">Sensor Management</TabsTrigger>
          </TabsList>

          <TabsContent value="live-monitoring" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-3">
              {/* Water Sources List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Water Sources</CardTitle>
                  <CardDescription>Select a source to view details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {waterSources.map((source) => (
                    <div
                      key={source.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedSource.id === source.id ? "bg-primary/10 border-primary" : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedSource(source)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{source.name}</p>
                          <p className="text-sm text-muted-foreground">{source.location}</p>
                        </div>
                        <Badge className={getStatusColor(source.status)}>{source.status}</Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>Updated {source.lastTested}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Selected Source Details */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5" />
                    {selectedSource.name}
                  </CardTitle>
                  <CardDescription>Real-time water quality parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Status Overview */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(selectedSource.status)}>
                        {selectedSource.status.toUpperCase()}
                      </Badge>
                      <span className={`text-sm font-medium ${getRiskColor(selectedSource.riskLevel)}`}>
                        {selectedSource.riskLevel.toUpperCase()} RISK
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">Last updated: {selectedSource.lastTested}</div>
                  </div>

                  {/* Parameters Grid */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">pH Level</Label>
                        <span className="text-sm font-mono">{selectedSource.ph}</span>
                      </div>
                      <Progress value={(selectedSource.ph / 14) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground">Safe range: 6.5 - 8.5</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Turbidity (NTU)</Label>
                        <span className="text-sm font-mono">{selectedSource.turbidity}</span>
                      </div>
                      <Progress value={Math.min((selectedSource.turbidity / 25) * 100, 100)} className="h-2" />
                      <p className="text-xs text-muted-foreground">Safe range: 0 - 5 NTU</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Bacteria (CFU/100ml)</Label>
                        <span className="text-sm font-mono">{selectedSource.bacteria}</span>
                      </div>
                      <Progress value={Math.min((selectedSource.bacteria / 1000) * 100, 100)} className="h-2" />
                      <p className="text-xs text-muted-foreground">Safe range: 0 - 100 CFU/100ml</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Chlorine (mg/L)</Label>
                        <span className="text-sm font-mono">{selectedSource.chlorine}</span>
                      </div>
                      <Progress value={(selectedSource.chlorine / 2) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground">Safe range: 0.2 - 2.0 mg/L</p>
                    </div>
                  </div>

                  {/* Additional Parameters */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Temperature: {selectedSource.temperature}°C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Conductivity: {selectedSource.conductivity} μS/cm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="test-results" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Manual Test Kit Results</CardTitle>
                <CardDescription>Results from field testing using portable test kits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testKitResults.map((result) => (
                    <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{result.location}</p>
                        <p className="text-sm text-muted-foreground">
                          Tested by {result.tester} on {result.date}
                        </p>
                        <p className="text-sm text-muted-foreground">Test Kit: {result.testKit}</p>
                      </div>
                      <Badge
                        className={getStatusColor(
                          result.results.toLowerCase().includes("safe")
                            ? "safe"
                            : result.results.toLowerCase().includes("moderate")
                              ? "moderate"
                              : "contaminated",
                        )}
                      >
                        {result.results}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Results
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historical" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historical Trends - {selectedSource.name}</CardTitle>
                <CardDescription>24-hour water quality parameter trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="ph" stroke="hsl(var(--primary))" strokeWidth={2} name="pH Level" />
                    <Line
                      type="monotone"
                      dataKey="turbidity"
                      stroke="hsl(var(--secondary))"
                      strokeWidth={2}
                      name="Turbidity"
                    />
                    <Line
                      type="monotone"
                      dataKey="bacteria"
                      stroke="hsl(var(--destructive))"
                      strokeWidth={2}
                      name="Bacteria Count"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sensors" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>IoT Sensor Status</CardTitle>
                  <CardDescription>Connected water quality sensors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {waterSources.map((source) => (
                    <div key={source.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Activity className="h-4 w-4 text-green-500" />
                        <div>
                          <p className="font-medium">Sensor-{source.id.toString().padStart(3, "0")}</p>
                          <p className="text-sm text-muted-foreground">{source.name}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Online
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sensor Configuration</CardTitle>
                  <CardDescription>Manage sensor settings and calibration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Data Collection Interval</Label>
                    <Select defaultValue="15min">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5min">Every 5 minutes</SelectItem>
                        <SelectItem value="15min">Every 15 minutes</SelectItem>
                        <SelectItem value="30min">Every 30 minutes</SelectItem>
                        <SelectItem value="1hour">Every hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Alert Threshold</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low sensitivity</SelectItem>
                        <SelectItem value="medium">Medium sensitivity</SelectItem>
                        <SelectItem value="high">High sensitivity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Update Configuration</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
