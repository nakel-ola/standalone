"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Building2,
  CreditCard,
  Settings,
  HelpCircle,
  Search,
  Save,
} from "lucide-react";
import { useSessionStore } from "@/lib/useSessionStore";
import { DashboardNavbar } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock data
const tenantSettings = {
  domainUrl: "m365x501263.sharepoint.com",
};

export default function TenantSettingsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useSessionStore();
  const [domainUrl, setDomainUrl] = useState(tenantSettings.domainUrl);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleSave = () => {
    console.log("Updated domain URL:", domainUrl);
  };

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
                  onClick={() => handleNavigation("/dashboard")}
                  className={`w-full flex items-center text-left px-3 py-3 text-sm transition-colors cursor-pointer ${
                    pathname === "/dashboard"
                      ? "bg-[#E7F5FF] text-[#3161D1]"
                      : "text-[#5774A8] hover:bg-[#E7F5FF]/50 hover:text-[#3161D1]"
                  }`}
                >
                  <Building2 className="h-4 w-4 mr-3 flex-shrink-0" />
                  Sites
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/dashboard/licensing")}
                  className={`w-full flex items-center text-left px-3 py-3 text-sm transition-colors cursor-pointer ${
                    pathname === "/dashboard/licensing"
                      ? "bg-[#E7F5FF] text-[#3161D1]"
                      : "text-[#5774A8] hover:bg-[#E7F5FF]/50 hover:text-[#3161D1]"
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
                  onClick={() => handleNavigation("/dashboard/tenant-config")}
                  className={`w-full flex items-center text-left px-3 py-3 text-sm transition-colors cursor-pointer ${
                    pathname === "/dashboard/tenant-config"
                      ? "bg-[#E7F5FF] text-[#3161D1]"
                      : "text-[#5774A8] hover:bg-[#E7F5FF]/50 hover:text-[#3161D1]"
                  }`}
                >
                  <Settings className="h-4 w-4 mr-3 flex-shrink-0" />
                  Tenant Settings
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/dashboard/support")}
                  className={`w-full flex items-center text-left px-3 py-3 text-sm transition-colors cursor-pointer ${
                    pathname === "/dashboard/support"
                      ? "bg-[#E7F5FF] text-[#3161D1]"
                      : "text-[#5774A8] hover:bg-[#E7F5FF]/50 hover:text-[#3161D1]"
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
          {/* Header with Save Button */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-semibold text-[#202224]">
              Tenant Settings
            </h1>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save
            </Button>
          </div>

          {/* Domain URL Card */}
          <div className="flex justify-center">
            <Card className="w-[400px] bg-white border-0 shadow-sm rounded-xl">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Label
                    htmlFor="domainUrl"
                    className="text-sm font-medium text-gray-700"
                  >
                    Domain URL
                  </Label>
                  <Input
                    id="domainUrl"
                    type="text"
                    value={domainUrl}
                    onChange={(e) => setDomainUrl(e.target.value)}
                    className="w-full"
                    placeholder="Enter domain URL"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
