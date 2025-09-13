"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin, User, Droplets, AlertTriangle, CheckCircle, Phone, Camera } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const symptoms = [
  "Diarrhea",
  "Vomiting",
  "Fever",
  "Abdominal pain",
  "Dehydration",
  "Nausea",
  "Headache",
  "Fatigue",
  "Loss of appetite",
]

const waterSources = [
  "Village Well",
  "Borehole",
  "River/Stream",
  "Community Tank",
  "Private Well",
  "Rainwater Collection",
  "Other",
]

export default function CommunityReporting() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [reportType, setReportType] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, symptom])
    } else {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                <h2 className="text-2xl font-bold text-green-800">Report Submitted Successfully</h2>
                <p className="text-green-700">
                  Thank you for your report. The health department has been notified and will take appropriate action.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-green-600">Report ID: #HSS-2024-{Math.floor(Math.random() * 10000)}</p>
                  <p className="text-sm text-green-600">Submitted: {format(new Date(), "PPP")}</p>
                </div>
                <Button onClick={() => setSubmitted(false)} className="mt-4">
                  Submit Another Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-balance">Community Health Reporting</h1>
          <p className="text-muted-foreground text-pretty">
            Report health cases and water quality issues in your community
          </p>
          <Badge variant="outline" className="bg-accent text-accent-foreground">
            <User className="mr-1 h-3 w-3" />
            ASHA Worker Portal
          </Badge>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setReportType("health")}>
            <CardHeader className="text-center">
              <AlertTriangle className="h-8 w-8 text-primary mx-auto" />
              <CardTitle className="text-lg">Health Case</CardTitle>
              <CardDescription>Report disease symptoms or outbreak</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setReportType("water")}>
            <CardHeader className="text-center">
              <Droplets className="h-8 w-8 text-blue-500 mx-auto" />
              <CardTitle className="text-lg">Water Quality</CardTitle>
              <CardDescription>Report water contamination issues</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setReportType("emergency")}>
            <CardHeader className="text-center">
              <Phone className="h-8 w-8 text-destructive mx-auto" />
              <CardTitle className="text-lg">Emergency</CardTitle>
              <CardDescription>Urgent health emergency alert</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Reporting Form */}
        {reportType && (
          <Card>
            <CardHeader>
              <CardTitle>
                {reportType === "health" && "Health Case Report"}
                {reportType === "water" && "Water Quality Report"}
                {reportType === "emergency" && "Emergency Alert"}
              </CardTitle>
              <CardDescription>
                Please provide detailed information to help health officials respond effectively
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Reporter Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Reporter Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="reporter-name">Your Name</Label>
                      <Input id="reporter-name" placeholder="Enter your full name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reporter-role">Role</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asha">ASHA Worker</SelectItem>
                          <SelectItem value="volunteer">Community Volunteer</SelectItem>
                          <SelectItem value="health-worker">Health Worker</SelectItem>
                          <SelectItem value="community-member">Community Member</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reporter-phone">Phone Number</Label>
                      <Input id="reporter-phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reporter-village">Village/Area</Label>
                      <Input id="reporter-village" placeholder="Enter village or area name" required />
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location Details
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="district">District</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kamrup">Kamrup</SelectItem>
                          <SelectItem value="guwahati">Guwahati</SelectItem>
                          <SelectItem value="dibrugarh">Dibrugarh</SelectItem>
                          <SelectItem value="jorhat">Jorhat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="block">Block/Tehsil</Label>
                      <Input id="block" placeholder="Enter block name" required />
                    </div>
                  </div>
                </div>

                {/* Health Case Specific Fields */}
                {reportType === "health" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Patient Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="patient-age">Patient Age</Label>
                        <Input id="patient-age" type="number" placeholder="Age in years" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="patient-gender">Gender</Label>
                        <RadioGroup defaultValue="" className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Symptoms (Select all that apply)</Label>
                      <div className="grid gap-2 md:grid-cols-3">
                        {symptoms.map((symptom) => (
                          <div key={symptom} className="flex items-center space-x-2">
                            <Checkbox
                              id={symptom}
                              checked={selectedSymptoms.includes(symptom)}
                              onCheckedChange={(checked) => handleSymptomChange(symptom, checked as boolean)}
                            />
                            <Label htmlFor={symptom} className="text-sm">
                              {symptom}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="onset-date">Symptom Onset Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !selectedDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}

                {/* Water Quality Specific Fields */}
                {reportType === "water" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Water Source Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="water-source">Water Source Type</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select water source" />
                          </SelectTrigger>
                          <SelectContent>
                            {waterSources.map((source) => (
                              <SelectItem key={source} value={source.toLowerCase().replace(/[^a-z0-9]/g, "-")}>
                                {source}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="water-issue">Issue Type</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select issue type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="contamination">Contamination</SelectItem>
                            <SelectItem value="color-change">Color Change</SelectItem>
                            <SelectItem value="bad-smell">Bad Smell</SelectItem>
                            <SelectItem value="taste-change">Taste Change</SelectItem>
                            <SelectItem value="debris">Debris/Particles</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Common Fields */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide detailed information about the case/issue..."
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additional-info">Additional Information</Label>
                    <Textarea
                      id="additional-info"
                      placeholder="Any other relevant information (optional)..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>

                {/* Photo Upload */}
                <div className="space-y-2">
                  <Label htmlFor="photo">Photo Evidence (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload photos or drag and drop</p>
                    <Input id="photo" type="file" accept="image/*" multiple className="hidden" />
                  </div>
                </div>

                {/* Priority Level */}
                <div className="space-y-2">
                  <Label>Priority Level</Label>
                  <RadioGroup defaultValue="medium" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low" className="text-green-600">
                        Low
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium" className="text-secondary">
                        Medium
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high" className="text-destructive">
                        High
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setReportType("")}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Offline Notice */}
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            This form works offline. Your report will be submitted when internet connection is restored.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
