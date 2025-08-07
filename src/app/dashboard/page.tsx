"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Building2, CreditCard, Settings, HelpCircle, Search } from "lucide-react";
import { useSessionStore } from "@/lib/useSessionStore";
import { DashboardNavbar } from "@/components";

// Mock data for sites
const mockSites = [
  {
    id: 1,
    name: "HR Portal",
    url: "hr-portal.shortpoint.com",
    image: "https://uploads-ssl.webflow.com/609271b0da3e568608217f2c/61f2c2dbd5800353cc2324ef_D-Intranet%20layout%201-min.png",
    description: "Human Resources management and employee portal"
  },
  {
    id: 2,
    name: "Finance Dashboard", 
    url: "finance.company.com",
    image: "https://uploads-ssl.webflow.com/609271b0da3e568608217f2c/61f26f25d6560ebee90709f3_D-Together-min.png",
    description: "Financial reporting and budget management"
  },
  {
    id: 3,
    name: "Development Team",
    url: "dev-team.shortpoint.com", 
    image: "https://uploads-ssl.webflow.com/609271b0da3e568608217f2c/61f7255f8cc1ed833a0cacd3_Education%205-min.png",
    description: "Developer resources and project management"
  },
  {
    id: 4,
    name: "Sales Team",
    url: "sales.company.com",
    image: "https://uploads-ssl.webflow.com/609271b0da3e568608217f2c/61f711fcc6a3ac5c9457473e_Airlines%202-min.png",
    description: "Sales tracking and customer relationship management"
  },
  {
    id: 5,
    name: "Marketing Hub",
    url: "marketing-hub.shortpoint.com",
    image: "https://uploads-ssl.webflow.com/609271b0da3e568608217f2c/61f70ea80602e381f93abaca_Social%20Layout%201-min.png",
    description: "Marketing campaigns and brand management"
  },
  {
    id: 6,
    name: "Customer Support",
    url: "support.company.com",
    image: "https://www.shortpoint.com/wp-content/uploads/2021/09/healthcare-4.png",
    description: "Help desk and customer service portal"
  }
];

export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useSessionStore();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleSiteClick = (siteId: number) => {
    router.push(`/sites/${siteId}`);
  };

  const handleCreateSiteClick = () => {
    console.log("Create new site clicked");
    // TODO: Navigate to create site page or open modal
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      {/* Navigation Bar */}
      <DashboardNavbar />
      
      {/* Main Layout - Two Panel */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Panel - Vertical Menu */}
        <aside className="w-[15%] bg-white border-r border-[#DEEFFF] flex flex-col">
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              <li>
                <button 
                  onClick={() => handleNavigation('/dashboard')}
                  className={`w-full flex items-center text-left px-3 py-3 text-sm transition-colors cursor-pointer ${
                    pathname === '/dashboard' 
                      ? 'bg-[#E7F5FF] text-[#3161D1]' 
                      : 'text-[#5774A8] hover:bg-[#E7F5FF]/50 hover:text-[#3161D1]'
                  }`}
                >
                  <Building2 className="h-4 w-4 mr-3 flex-shrink-0" />
                  Sites
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/dashboard/licensing')}
                  className={`w-full flex items-center text-left px-3 py-3 text-sm transition-colors cursor-pointer ${
                    pathname === '/dashboard/licensing' 
                      ? 'bg-[#E7F5FF] text-[#3161D1]' 
                      : 'text-[#5774A8] hover:bg-[#E7F5FF]/50 hover:text-[#3161D1]'
                  }`}
                >
                  <CreditCard className="h-4 w-4 mr-3 flex-shrink-0" />
                  Licensing
                </button>
              </li>
            </ul>
            
            {/* Horizontal separator */}
            <hr className="my-4 border-t border-[#E0E0E0]" />
            
            <ul className="space-y-1">
              <li>
                <button 
                  onClick={() => handleNavigation('/dashboard/tenant-config')}
                  className={`w-full flex items-center text-left px-3 py-3 text-sm transition-colors cursor-pointer ${
                    pathname === '/dashboard/tenant-config' 
                      ? 'bg-[#E7F5FF] text-[#3161D1]' 
                      : 'text-[#5774A8] hover:bg-[#E7F5FF]/50 hover:text-[#3161D1]'
                  }`}
                >
                  <Settings className="h-4 w-4 mr-3 flex-shrink-0" />
                  Tenant Settings
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/dashboard/support')}
                  className={`w-full flex items-center text-left px-3 py-3 text-sm transition-colors cursor-pointer ${
                    pathname === '/dashboard/support' 
                      ? 'bg-[#E7F5FF] text-[#3161D1]' 
                      : 'text-[#5774A8] hover:bg-[#E7F5FF]/50 hover:text-[#3161D1]'
                  }`}
                >
                  <HelpCircle className="h-4 w-4 mr-3 flex-shrink-0" />
                  Support
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Right Panel - Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* First Section - My Sites Header and Search Bar */}
          <div className="flex justify-between items-center mb-8">
            {/* Left Column - My Sites Header */}
            <h1 className="text-4xl font-semibold text-[#202224]">
              My Sites
            </h1>

            {/* Right Column - Search Bar */}
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#ADB5BD]" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-[#EAEAEA] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3161D1] focus:border-[#3161D1]"
              />
            </div>
          </div>

          {/* Second Section - Site Cards Grid */}
          <div className="flex flex-wrap gap-6">
            {/* Create New Site Card */}
            <div 
              onClick={handleCreateSiteClick}
              className="w-64 bg-white rounded-lg border border-[#EAEAEA] hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="p-4">
                <div className="h-48 bg-[#F9F9F9] border border-[#EAEAEA] rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#5774A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-lg font-semibold text-[#202224] mb-2">Create new site</h3>
              </div>
            </div>

            {/* Dynamic Site Cards */}
            {mockSites.map((site) => (
              <div 
                key={site.id}
                onClick={() => handleSiteClick(site.id)}
                className="w-64 bg-white rounded-lg border border-[#EAEAEA] hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="p-4">
                  <div className="h-48 overflow-hidden rounded-lg">
                    <img 
                      src={site.image} 
                      alt={site.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-lg font-semibold text-[#202224] mb-1">{site.name}</h3>
                  <p className="text-sm text-[#607CAD]">{site.url}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
