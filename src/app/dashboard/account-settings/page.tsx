"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  Lock,
  Edit,
  Building2,
  CreditCard,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Button, Input, Label } from "@/components/ui";
import { DashboardNavbar } from "@/components";

// Mock data for form values
const mockUserData = {
  firstName: "Anas",
  lastName: "Nakawa",
  email: "anas@shortpoint.com",
  password: "********",
};

export default function AccountSettingsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState(mockUserData);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Form state:", formData);
  };

  const handleSignOut = () => {
    router.push("/signin");
  };

  const handleDeleteAccount = () => {
    console.log("Deleted");
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      {/* Navigation Bar */}
      <DashboardNavbar />

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Panel - Vertical Menu */}
        <aside className="w-[15%] bg-white border-r border-[#DEEFFF] flex flex-col">
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-full flex items-center text-left px-3 py-3 text-sm transition-colors cursor-pointer text-[#5774A8] hover:bg-[#E7F5FF]/50 hover:text-[#3161D1]"
                >
                  <Building2 className="h-4 w-4 mr-3" />
                  Sites
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/dashboard/licensing")}
                  className="w-full flex items-center text-left px-3 py-3 text-sm transition-colors cursor-pointer text-[#5774A8] hover:bg-[#E7F5FF]/50 hover:text-[#3161D1]"
                >
                  <CreditCard className="h-4 w-4 mr-3" />
                  Licensing
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/dashboard/tenant-config")}
                  className="w-full flex items-center text-left px-3 py-3 text-sm transition-colors cursor-pointer bg-[#E7F5FF] text-[#3161D1]"
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Tenant Settings
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/dashboard/support")}
                  className="w-full flex items-center text-left px-3 py-3 text-sm transition-colors cursor-pointer text-[#5774A8] hover:bg-[#E7F5FF]/50 hover:text-[#3161D1]"
                >
                  <HelpCircle className="h-4 w-4 mr-3" />
                  Support
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-[#202224]">
              Account Settings
            </h1>
            <Button
              onClick={handleSave}
              className="bg-[#3161D1] hover:bg-[#3161D1]/90 text-white"
            >
              Save
            </Button>
          </div>

          {/* Account Form Cards */}
          <div className="mx-auto space-y-6" style={{ width: "440px" }}>
            {/* Input Fields Card */}
            <div
              className="bg-white p-8"
              style={{
                borderRadius: "14px",
                boxShadow:
                  "0px 1px 3px 0px #0000000D, 0px 10px 15px -5px #0000001A, 0px 7px 7px -5px #0000000A",
              }}
            >
              {/* Avatar Section */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-[#92F3CA] flex items-center justify-center text-white font-semibold text-2xl">
                    {formData.firstName[0]}
                    {formData.lastName[0]}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#3161D1] rounded-full flex items-center justify-center text-white hover:bg-[#3161D1]/90 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* First Name & Last Name - Two Column Layout */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="firstName"
                      className="text-[#5774A8] mb-2 block"
                    >
                      First name
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="lastName"
                      className="text-[#5774A8] mb-2 block"
                    >
                      Last name
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Email - Disabled */}
                <div>
                  <Label htmlFor="email" className="text-[#5774A8] mb-2 block">
                    Email
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      value={formData.email}
                      disabled
                      className="w-full bg-gray-50 text-gray-500"
                    />
                    <Edit className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Password - Masked */}
                <div>
                  <Label
                    htmlFor="password"
                    className="text-[#5774A8] mb-2 block"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className="w-full pl-10"
                    />
                    <Edit className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons Card */}
            <div
              className="bg-white p-8"
              style={{
                borderRadius: "14px",
                boxShadow:
                  "0px 1px 3px 0px #0000000D, 0px 10px 15px -5px #0000001A, 0px 7px 7px -5px #0000000A",
              }}
            >
              <div className="flex gap-4">
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="flex-1 border-none text-white bg-[#3161D1] hover:text-white"
                >
                  Sign Out
                </Button>
                <Button
                  onClick={handleDeleteAccount}
                  variant="ghost"
                  className="flex-1 bg-red-600/40 text-red-600"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
