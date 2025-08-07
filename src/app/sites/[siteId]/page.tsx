"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSessionStore } from "@/lib/useSessionStore";
import { SiteNavbar, SiteSidebar } from "@/components";


// Mock site data
const mockSiteData = {
  1: { 
    name: "HR Portal", 
    url: "hr-portal.shortpoint.com", 
    description: "Human Resources management and employee portal",
    status: "published",
    lastModified: "2024-01-15",
    totalPages: 12,
    totalVisits: 2543,
    teamMembers: 8,
    image: "https://uploads-ssl.webflow.com/609271b0da3e568608217f2c/61f2c2dbd5800353cc2324ef_D-Intranet%20layout%201-min.png"
  },
  2: { 
    name: "Finance Dashboard", 
    url: "finance.company.com", 
    description: "Financial reporting and budget management",
    status: "published",
    lastModified: "2024-01-14",
    totalPages: 18,
    totalVisits: 1876,
    teamMembers: 5,
    image: "https://uploads-ssl.webflow.com/609271b0da3e568608217f2c/61f26f25d6560ebee90709f3_D-Together-min.png"
  },
  3: { 
    name: "Development Team", 
    url: "dev-team.shortpoint.com", 
    description: "Developer resources and project management",
    status: "draft",
    lastModified: "2024-01-16",
    totalPages: 25,
    totalVisits: 3421,
    teamMembers: 12,
    image: "https://uploads-ssl.webflow.com/609271b0da3e568608217f2c/61f7255f8cc1ed833a0cacd3_Education%205-min.png"
  },
  4: { 
    name: "Sales Team", 
    url: "sales.company.com", 
    description: "Sales tracking and customer relationship management",
    status: "published",
    lastModified: "2024-01-13",
    totalPages: 15,
    totalVisits: 4567,
    teamMembers: 15,
    image: "https://uploads-ssl.webflow.com/609271b0da3e568608217f2c/61f711fcc6a3ac5c9457473e_Airlines%202-min.png"
  },
  5: { 
    name: "Marketing Hub", 
    url: "marketing-hub.shortpoint.com", 
    description: "Marketing campaigns and brand management",
    status: "published",
    lastModified: "2024-01-12",
    totalPages: 22,
    totalVisits: 6789,
    teamMembers: 10,
    image: "https://uploads-ssl.webflow.com/609271b0da3e568608217f2c/61f70ea80602e381f93abaca_Social%20Layout%201-min.png"
  },
  6: { 
    name: "Customer Support", 
    url: "support.company.com", 
    description: "Help desk and customer service portal",
    status: "published",
    lastModified: "2024-01-11",
    totalPages: 35,
    totalVisits: 8901,
    teamMembers: 18,
    image: "https://www.shortpoint.com/wp-content/uploads/2021/09/healthcare-4.png"
  }
};

export default function SiteDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated } = useSessionStore();
  const [siteData, setSiteData] = useState<any>(null);

  const siteId = params.siteId as string;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // Mock API call to fetch site data
    const fetchSiteData = () => {
      // Convert string siteId to number for object key lookup
      const numericSiteId = parseInt(siteId, 10);
      
      // Check if the conversion resulted in a valid number
      if (isNaN(numericSiteId)) {
        console.error("Invalid site ID:", siteId);
        router.push("/dashboard");
        return;
      }
      
      const data = mockSiteData[numericSiteId as keyof typeof mockSiteData];
      if (data) {
        setSiteData(data);
      } else {
        // Site not found, redirect to dashboard
        console.warn("Site not found:", numericSiteId);
        router.push("/dashboard");
      }
    };

    if (siteId) {
      fetchSiteData();
    }
  }, [siteId, router]);

  if (!isAuthenticated) {
    return null;
  }

  if (!siteData) {
    return (
      <div className="min-h-screen bg-[#F5F6FA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3161D1] mx-auto mb-4"></div>
          <p className="text-[#5774A8]">Loading site...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      {/* Navigation Bar */}
      <SiteNavbar siteName={siteData.name} siteUrl={siteData.url} />

      {/* Main Layout - Two Panel */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Panel - Site Menu */}
        <SiteSidebar siteId={siteId} siteName={siteData.name} />

        {/* Right Panel - Site Image */}
        <main className="flex-1 overflow-hidden">
          {/* Site Image */}
          <img 
            src={siteData.image} 
            alt={siteData.name}
            className="w-full h-full object-cover"
          />
        </main>
      </div>
    </div>
  );
}
