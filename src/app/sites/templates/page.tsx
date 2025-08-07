import { Card, CardContent, CardFooter, AspectRatio } from "@/components/ui";
import { X } from "lucide-react";

// Mock data for templates
const templates = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  name: `Template name`,
  image:
    "https://images.unsplash.com/photo-1754415267107-8a1f75a6a366?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}));

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      {/* Navbar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/shortpoint-logo.svg"
              alt="ShortPoint"
              className="h-8 w-auto"
            />
          </div>

          {/* Close Icon */}
          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Choose a Template
          </h1>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="overflow-hidden transition-shadow duration-200 hover:shadow-lg cursor-pointer bg-white border-0 shadow-md"
            >
              <CardContent className="p-0">
                <AspectRatio ratio={4 / 3} className="w-full">
                  <img
                    src={template.image}
                    alt={`${template.name} preview`}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </CardContent>
              <CardFooter className="p-4">
                <p className="text-sm font-medium text-gray-700">
                  {template.name}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
