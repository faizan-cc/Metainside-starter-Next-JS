"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Star, 
  Github, 
  Twitter, 
  Mail, 
  Calendar,
  Settings,
  Download,
  Share,
  Eye,
  Lock,
  Bell,
  Trash2,
  Edit,
  Plus
} from "lucide-react";

export function ShadcnShowcase() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          shadcn/ui Components
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Beautiful, accessible components built with Radix UI and Tailwind CSS
        </p>
      </div>
      
      {/* Button Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Button Variants
          </CardTitle>
          <CardDescription>
            Different styles and sizes of buttons available in shadcn/ui
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
        </CardContent>
      </Card>

      {/* Badge Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Badge Components
          </CardTitle>
          <CardDescription>
            Various badge styles for labels, status indicators, and more
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
              <Heart className="w-3 h-3 mr-1" />
              Custom
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Icon Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="w-5 h-5" />
            Icon Buttons
          </CardTitle>
          <CardDescription>
            Buttons combined with Lucide React icons for enhanced UX
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share className="w-4 h-4" />
              Share
            </Button>
            <Button variant="secondary" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            <Button size="sm" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit
            </Button>
            <Button size="sm" variant="destructive" className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
            <Button size="sm" variant="ghost" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notify
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Interactive Demo
          </CardTitle>
          <CardDescription>
            Try clicking these buttons to see shadcn/ui in action
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => alert('Welcome to shadcn/ui!')} 
              className="flex items-center gap-2"
            >
              <Heart className="w-4 h-4" />
              Say Hello
            </Button>
            <Button 
              variant="outline" 
              onClick={() => alert('Check out the documentation!')}
              className="flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              View Source
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => alert('Built with ❤️ using shadcn/ui')}
              className="flex items-center gap-2"
            >
              <Twitter className="w-4 h-4" />
              Share Love
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}