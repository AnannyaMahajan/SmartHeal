"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  BookOpen,
  Play,
  Download,
  Share2,
  Users,
  CheckCircle,
  Clock,
  Globe,
  Droplets,
  Heart,
  Shield,
  Search,
  Star,
  Eye,
} from "lucide-react"

// Mock educational content data
const educationalContent = [
  {
    id: 1,
    title: "Water Purification Methods",
    category: "Water Safety",
    type: "video",
    duration: "5 min",
    language: "English",
    description:
      "Learn simple and effective methods to purify water at home using boiling, chlorination, and filtration.",
    views: 1250,
    rating: 4.8,
    difficulty: "beginner",
    tags: ["water", "purification", "safety", "home"],
    thumbnail: "/water-purification-methods.jpg",
  },
  {
    id: 2,
    title: "Hand Hygiene Best Practices",
    category: "Hygiene",
    type: "interactive",
    duration: "3 min",
    language: "Hindi",
    description: "Interactive guide on proper handwashing techniques to prevent disease transmission.",
    views: 2100,
    rating: 4.9,
    difficulty: "beginner",
    tags: ["hygiene", "handwashing", "prevention"],
    thumbnail: "/hand-hygiene-washing.jpg",
  },
  {
    id: 3,
    title: "Recognizing Diarrhea Symptoms",
    category: "Disease Prevention",
    type: "infographic",
    duration: "2 min",
    language: "Assamese",
    description: "Visual guide to identify early symptoms of diarrhea and when to seek medical help.",
    views: 890,
    rating: 4.7,
    difficulty: "beginner",
    tags: ["diarrhea", "symptoms", "health"],
    thumbnail: "/diarrhea-symptoms-medical.jpg",
  },
  {
    id: 4,
    title: "Community Water Source Protection",
    category: "Water Safety",
    type: "document",
    duration: "10 min",
    language: "English",
    description: "Comprehensive guide on protecting community water sources from contamination.",
    views: 650,
    rating: 4.6,
    difficulty: "intermediate",
    tags: ["community", "water", "protection", "environment"],
    thumbnail: "/community-water-source-protection.jpg",
  },
  {
    id: 5,
    title: "Oral Rehydration Solution (ORS) Preparation",
    category: "Treatment",
    type: "video",
    duration: "4 min",
    language: "Bengali",
    description: "Step-by-step instructions for preparing ORS at home to treat dehydration.",
    views: 1800,
    rating: 4.9,
    difficulty: "beginner",
    tags: ["ORS", "dehydration", "treatment", "home"],
    thumbnail: "/ors-preparation-medical.jpg",
  },
  {
    id: 6,
    title: "Monsoon Health Precautions",
    category: "Seasonal Health",
    type: "checklist",
    duration: "6 min",
    language: "Hindi",
    description: "Essential precautions to take during monsoon season to prevent water-borne diseases.",
    views: 1450,
    rating: 4.8,
    difficulty: "beginner",
    tags: ["monsoon", "prevention", "seasonal", "health"],
    thumbnail: "/monsoon-health-precautions-rain.jpg",
  },
]

const categories = [
  { name: "Water Safety", count: 15, icon: Droplets, color: "bg-blue-100 text-blue-800" },
  { name: "Hygiene", count: 12, icon: Heart, color: "bg-green-100 text-green-800" },
  { name: "Disease Prevention", count: 18, icon: Shield, color: "bg-red-100 text-red-800" },
  { name: "Treatment", count: 8, icon: BookOpen, color: "bg-purple-100 text-purple-800" },
  { name: "Seasonal Health", count: 6, icon: Globe, color: "bg-yellow-100 text-yellow-800" },
]

const languages = ["English", "Hindi", "Assamese", "Bengali", "Bodo"]

const campaigns = [
  {
    id: 1,
    title: "Clean Water for All",
    description: "Community-wide water safety awareness campaign",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    participants: 2500,
    completion: 78,
    status: "active",
  },
  {
    id: 2,
    title: "Monsoon Health Preparedness",
    description: "Seasonal health education initiative",
    startDate: "2024-06-01",
    endDate: "2024-09-30",
    participants: 1800,
    completion: 45,
    status: "active",
  },
  {
    id: 3,
    title: "Hand Hygiene Week",
    description: "Week-long hygiene awareness program",
    startDate: "2024-01-15",
    endDate: "2024-01-21",
    participants: 3200,
    completion: 100,
    status: "completed",
  },
]

export default function EducationalContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [selectedContent, setSelectedContent] = useState<(typeof educationalContent)[0] | null>(null)

  const filteredContent = educationalContent.filter((content) => {
    const matchesSearch =
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || content.category === selectedCategory
    const matchesLanguage = selectedLanguage === "all" || content.language === selectedLanguage
    return matchesSearch && matchesCategory && matchesLanguage
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />
      case "interactive":
        return <Users className="h-4 w-4" />
      case "document":
        return <BookOpen className="h-4 w-4" />
      case "infographic":
        return <Eye className="h-4 w-4" />
      case "checklist":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-balance flex items-center justify-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            Health Education Center
          </h1>
          <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
            Comprehensive health education resources for disease prevention, water safety, and community wellness
          </p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search educational content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.name} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Languages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {languages.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="content" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Educational Content</TabsTrigger>
            <TabsTrigger value="campaigns">Health Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">Learning Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-4">
              {/* Categories Sidebar */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedCategory === category.name ? "bg-primary/10 border-primary" : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <div className="flex items-center gap-2">
                        <category.icon className="h-4 w-4" />
                        <span className="font-medium text-sm">{category.name}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <Badge className={category.color}>{category.count} items</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Content Grid */}
              <div className="lg:col-span-3 space-y-4">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredContent.map((content) => (
                    <Card key={content.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <img
                          src={content.thumbnail || "/placeholder.svg"}
                          alt={content.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-black/70 text-white">
                            {getTypeIcon(content.type)}
                            <span className="ml-1">{content.type}</span>
                          </Badge>
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge variant="outline" className="bg-white/90">
                            <Clock className="h-3 w-3 mr-1" />
                            {content.duration}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base line-clamp-2">{content.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{content.category}</Badge>
                          <Badge className={getDifficultyColor(content.difficulty)}>{content.difficulty}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground line-clamp-2">{content.description}</p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {content.views.toLocaleString()} views
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {content.rating}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 flex-wrap">
                          {content.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" className="flex-1" onClick={() => setSelectedContent(content)}>
                                <Play className="mr-2 h-4 w-4" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>{content.title}</DialogTitle>
                                <DialogDescription>{content.description}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                                  <div className="text-center space-y-2">
                                    <Play className="h-16 w-16 mx-auto text-muted-foreground" />
                                    <p className="text-muted-foreground">Educational content would load here</p>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                  </Button>
                                  <Button variant="outline">
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Share
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-4">
            <div className="grid gap-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{campaign.title}</CardTitle>
                      <Badge
                        className={
                          campaign.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </div>
                    <CardDescription>{campaign.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Participants</p>
                        <p className="text-2xl font-bold">{campaign.participants.toLocaleString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Duration</p>
                        <p className="text-sm text-muted-foreground">
                          {campaign.startDate} to {campaign.endDate}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Completion</p>
                        <div className="space-y-1">
                          <Progress value={campaign.completion} className="h-2" />
                          <p className="text-sm text-muted-foreground">{campaign.completion}%</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">View Details</Button>
                      <Button size="sm" variant="outline">
                        Generate Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Content</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{educationalContent.length}</div>
                  <p className="text-xs text-muted-foreground">Educational resources</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {educationalContent.reduce((acc, content) => acc + content.views, 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">Across all content</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(
                      educationalContent.reduce((acc, content) => acc + content.rating, 0) / educationalContent.length
                    ).toFixed(1)}
                  </div>
                  <p className="text-xs text-muted-foreground">User satisfaction</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Languages</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{languages.length}</div>
                  <p className="text-xs text-muted-foreground">Supported languages</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
                <CardDescription>Most viewed educational content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {educationalContent
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map((content, index) => (
                      <div key={content.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{content.title}</p>
                            <p className="text-sm text-muted-foreground">{content.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{content.views.toLocaleString()} views</p>
                          <p className="text-sm text-muted-foreground">★ {content.rating}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
