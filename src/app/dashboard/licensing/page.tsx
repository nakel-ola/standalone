"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Building2,
  CreditCard,
  Settings,
  HelpCircle,
  Search,
  Edit,
  Save,
} from "lucide-react";
import { useSessionStore } from "@/lib/useSessionStore";
import { DashboardNavbar } from "@/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock data
const license = {
  plan: "Active Trial",
  price: "$5325 USD/Year",
  expires: "17th Dec, 2024",
  card: {
    type: "Master Card",
    last4: "4002",
    expiry: "20/2024",
  },
  designers: [
    { name: "Den Matliak", email: "den@shortpoint.com" },
    { name: "Anas Nakawa", email: "anas@shortpoint.com" },
    { name: "Mohamad Yahia", email: "yahia@shortpoint.com" },
  ],
};

export default function LicensingPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useSessionStore();
  const [designers, setDesigners] = useState(license.designers);
  const [editingEmail, setEditingEmail] = useState<number | null>(null);
  const [emailValues, setEmailValues] = useState<{ [key: number]: string }>({});

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleBuyLicense = () => {
    console.log("Buy license clicked");
  };

  const handleChangeCard = () => {
    console.log("Change card clicked");
  };

  const handleAddDesigners = () => {
    console.log("Add more designers clicked");
  };

  const handleSave = () => {
    console.log("Save clicked", { designers, emailValues });
  };

  const handleEditEmail = (index: number) => {
    setEditingEmail(index);
    setEmailValues((prev) => ({
      ...prev,
      [index]: designers[index].email,
    }));
  };

  const handleSaveEmail = (index: number) => {
    if (emailValues[index]) {
      setDesigners((prev) =>
        prev.map((designer, i) =>
          i === index ? { ...designer, email: emailValues[index] } : designer
        )
      );
    }
    setEditingEmail(null);
  };

  const handleCancelEdit = () => {
    setEditingEmail(null);
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
            <h1 className="text-4xl font-semibold text-[#202224]">Licensing</h1>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save
            </Button>
          </div>

          {/* Cards Container */}
          <div className="flex justify-center">
            <div
              className="space-y-6"
              style={{ minWidth: "440px", maxWidth: "440px" }}
            >
              {/* Plan Section */}
              <Card className="w-full bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {license.price}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded">
                          {license.plan}
                        </span>
                      </div>
                    </div>
                    <Button onClick={handleBuyLicense} variant="default">
                      Buy license
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Expires on {license.expires}
                  </p>
                </CardContent>
              </Card>

              {/* Billing Information */}
              <Card className="w-full bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    Billing Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-6 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">
                          MC
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          **** **** **** {license.card.last4}
                        </p>
                        <p className="text-sm text-gray-600">
                          Expires {license.card.expiry}
                        </p>
                      </div>
                    </div>
                    <Button onClick={handleChangeCard} variant="secondary">
                      Change
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Designers */}
              <Card className="w-full bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    Designers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {designers.map((designer, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {designer.name}
                          </p>
                          {editingEmail === index ? (
                            <div className="flex items-center gap-2 mt-1">
                              <Input
                                value={emailValues[index] || ""}
                                onChange={(e) =>
                                  setEmailValues((prev) => ({
                                    ...prev,
                                    [index]: e.target.value,
                                  }))
                                }
                                className="flex-1"
                              />
                              <Button
                                size="sm"
                                onClick={() => handleSaveEmail(index)}
                                variant="default"
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                onClick={handleCancelEdit}
                                variant="secondary"
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-sm text-gray-600">
                                {designer.email}
                              </p>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEditEmail(index)}
                                className="h-6 w-6 p-0"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={handleAddDesigners}
                    variant="secondary"
                    className="w-full"
                  >
                    Add more Designers
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
