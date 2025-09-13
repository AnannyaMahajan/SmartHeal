"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  Send,
  Users,
  MapPin,
  Phone,
  Mail,
  Settings,
  Plus,
  Archive,
  Eye,
} from "lucide-react"
import { format } from "date-fns"

// Mock alert data
const alerts = [
  {
    id: 1,
    type: "outbreak",
    severity: "critical",
    title: "High Risk Diarrhea Outbreak Predicted",
    message:
      "AI model predicts 87% probability of diarrhea outbreak in Kamrup District within 7 days. Immediate preventive measures recommended.",
    location: "Kamrup District",
    timestamp: new Date("2024-01-15T10:30:00"),
    status: "active",
    recipients: 45,
    acknowledged: 12,
    source: "AI Prediction System",
  },
  {
    id: 2,
    type: "water",
    severity: "high",
    title: "Water Contamination Detected",
    message:
      "Village Well A shows bacterial contamination levels exceeding safe limits. Immediate testing and treatment required.",
    location: "Village Well A",
    timestamp: new Date("2024-01-15T08:15:00"),
    status: "acknowledged",
    recipients: 23,
    acknowledged: 18,
    source: "Water Quality Monitor",
  },
  {
    id: 3,
    type: "health",
    severity: "medium",
    title: "Increased Case Reports",
    message: "5 new diarrhea cases reported in Guwahati Block in the last 24 hours. Monitor for potential outbreak.",
    location: "Guwahati Block",
    timestamp: new Date("2024-01-15T06:45:00"),
    status: "resolved",
    recipients: 18,
    acknowledged: 18,
    source: "Community Reports",
  },
  {
    id: 4,
    type: "system",
    severity: "low",
    title: "Sensor Maintenance Required",
    message: "Water quality sensor at Borehole C requires calibration. Schedule maintenance within 48 hours.",
    location: "Borehole C",
    timestamp: new Date("2024-01-14T16:20:00"),
    status: "active",
    recipients: 8,
    acknowledged: 3,
    source: "Sensor Network",
  },
]

const recipients = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    role: "District Health Officer",
    contact: "+91 98765 43210",
    email: "priya.sharma@health.gov.in",
  },
  { id: 2, name: "Raj Kumar", role: "ASHA Supervisor", contact: "+91 98765 43211", email: "raj.kumar@asha.org" },
  { id: 3, name: "Anita Das", role: "Block Coordinator", contact: "+91 98765 43212", email: "anita.das@block.gov.in" },
  {
    id: 4,
    name: "Community Leaders",
    role: "Village Representatives",
    contact: "Group SMS",
    email: "leaders@community.org",
  },
]

const alertTemplates = [
  {
    id: 1,
    name: "Outbreak Warning",
    type: "outbreak",
    severity: "critical",
    template:
      "URGENT: {disease} outbreak predicted in {location} with {probability}% probability. Immediate action required. Contact health department.",
  },
  {
    id: 2,
    name: "Water Contamination",
    type: "water",
    severity: "high",
    template:
      "ALERT: Water contamination detected at {location}. Avoid consumption. Testing in progress. Updates to follow.",
  },
  {
    id: 3,
    name: "Health Advisory",
    type: "health",
    severity: "medium",
    template:
      "ADVISORY: Increased {disease} cases in {location}. Practice hygiene measures. Report symptoms to health workers.",
  },
]

export default function AlertSystem() {
  const [selectedAlert, setSelectedAlert] = useState(alerts[0])
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-red-600"
      case "acknowledged":
        return "text-yellow-600"
      case "resolved":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "outbreak":
        return <AlertTriangle className="h-4 w-4" />
      case "water":
        return <Bell className="h-4 w-4" />
      case "health":
        return <Users className="h-4 w-4" />
      case "system":
        return <Settings className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const filteredAlerts = alerts.filter((alert) => {
    const severityMatch = filterSeverity === "all" || alert.severity === filterSeverity
    const statusMatch = filterStatus === "all" || alert.status === filterStatus
    return severityMatch && statusMatch
  })

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance flex items-center gap-2">
              <Bell className="h-8 w-8 text-primary" />
              Alert & Notification System
            </h1>
            <p className="text-muted-foreground text-pretty">
              Real-time alerts and emergency communications for health surveillance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Alert
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Alert</DialogTitle>
                  <DialogDescription>
                    Send immediate notifications to health officials and community workers
                  </DialogDescription>
                </DialogHeader>
                <CreateAlertForm onClose={() => setShowCreateDialog(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Active Critical Alerts */}
        {alerts.filter((a) => a.severity === "critical" && a.status === "active").length > 0 && (
          <Alert className="border-destructive bg-destructive/10">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertTitle className="text-destructive">Critical Alerts Active</AlertTitle>
            <AlertDescription>
              {alerts.filter((a) => a.severity === "critical" && a.status === "active").length} critical alert(s)
              require immediate attention.
            </AlertDescription>
          </Alert>
        )}

        {/* Alert Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {alerts.filter((a) => a.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">
                {alerts.filter((a) => a.severity === "critical" && a.status === "active").length} critical
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Recipients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alerts.reduce((acc, alert) => acc + alert.recipients, 0)}</div>
              <p className="text-xs text-muted-foreground">Across all active alerts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {Math.round(
                  (alerts.reduce((acc, alert) => acc + alert.acknowledged, 0) /
                    alerts.reduce((acc, alert) => acc + alert.recipients, 0)) *
                    100,
                )}
                %
              </div>
              <p className="text-xs text-muted-foreground">Average acknowledgment rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Alert</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h</div>
              <p className="text-xs text-muted-foreground">High risk outbreak prediction</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="active-alerts" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active-alerts">Active Alerts</TabsTrigger>
            <TabsTrigger value="recipients">Recipients</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="active-alerts" className="space-y-4">
            {/* Filters */}
            <div className="flex gap-4">
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="acknowledged">Acknowledged</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Alerts List */}
            <div className="grid gap-4">
              {filteredAlerts.map((alert) => (
                <Card key={alert.id} className={alert.severity === "critical" ? "border-red-200" : ""}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(alert.type)}
                          <CardTitle className="text-lg">{alert.title}</CardTitle>
                          <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                        </div>
                        <CardDescription className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {alert.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {format(alert.timestamp, "PPp")}
                          </span>
                          <span className={`font-medium ${getStatusColor(alert.status)}`}>
                            {alert.status.toUpperCase()}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{alert.message}</p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Source: {alert.source}</span>
                      <span>
                        {alert.acknowledged}/{alert.recipients} acknowledged (
                        {Math.round((alert.acknowledged / alert.recipients) * 100)}%)
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {alert.status === "active" && (
                        <>
                          <Button size="sm" variant="destructive">
                            <Send className="mr-2 h-4 w-4" />
                            Resend Alert
                          </Button>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark Resolved
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Archive className="mr-2 h-4 w-4" />
                        Archive
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recipients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Alert Recipients</CardTitle>
                <CardDescription>Manage notification recipients and contact preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recipients.map((recipient) => (
                  <div key={recipient.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{recipient.name}</p>
                      <p className="text-sm text-muted-foreground">{recipient.role}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {recipient.contact}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {recipient.email}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Active
                      </Badge>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Recipient
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Alert Templates</CardTitle>
                <CardDescription>Pre-configured message templates for quick alert creation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {alertTemplates.map((template) => (
                  <div key={template.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{template.name}</h4>
                        <Badge className={getSeverityColor(template.severity)}>{template.severity.toUpperCase()}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Use Template
                        </Button>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{template.template}</p>
                  </div>
                ))}
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Configure how and when alerts are sent</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send alerts via SMS</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send alerts via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send mobile push notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Voice Alerts</Label>
                      <p className="text-sm text-muted-foreground">Automated voice calls for critical alerts</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alert Thresholds</CardTitle>
                  <CardDescription>Configure when automatic alerts are triggered</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Outbreak Probability Threshold</Label>
                    <Select defaultValue="75">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50% - Low threshold</SelectItem>
                        <SelectItem value="75">75% - Medium threshold</SelectItem>
                        <SelectItem value="90">90% - High threshold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Water Quality Alert Level</Label>
                    <Select defaultValue="moderate">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any contamination</SelectItem>
                        <SelectItem value="moderate">Moderate contamination</SelectItem>
                        <SelectItem value="severe">Severe contamination only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Case Report Threshold</Label>
                    <Select defaultValue="5">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 cases in 24 hours</SelectItem>
                        <SelectItem value="5">5 cases in 24 hours</SelectItem>
                        <SelectItem value="10">10 cases in 24 hours</SelectItem>
                      </SelectContent>
                    </Select>
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

function CreateAlertForm({ onClose }: { onClose: () => void }) {
  const [selectedRecipients, setSelectedRecipients] = useState<number[]>([])

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="alert-type">Alert Type</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select alert type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="outbreak">Disease Outbreak</SelectItem>
            <SelectItem value="water">Water Contamination</SelectItem>
            <SelectItem value="health">Health Advisory</SelectItem>
            <SelectItem value="system">System Alert</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="severity">Severity Level</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Alert Title</Label>
        <Input id="title" placeholder="Enter alert title" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Alert Message</Label>
        <Textarea id="message" placeholder="Enter detailed alert message" className="min-h-[100px]" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" placeholder="Enter affected location" />
      </div>

      <div className="space-y-2">
        <Label>Recipients</Label>
        <div className="space-y-2">
          {recipients.map((recipient) => (
            <div key={recipient.id} className="flex items-center space-x-2">
              <Checkbox
                id={`recipient-${recipient.id}`}
                checked={selectedRecipients.includes(recipient.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedRecipients([...selectedRecipients, recipient.id])
                  } else {
                    setSelectedRecipients(selectedRecipients.filter((id) => id !== recipient.id))
                  }
                }}
              />
              <Label htmlFor={`recipient-${recipient.id}`} className="text-sm">
                {recipient.name} - {recipient.role}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1">
          <Send className="mr-2 h-4 w-4" />
          Send Alert
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
