"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useSessionStore } from "@/lib/useSessionStore";
import Image from "next/image";

export const DashboardNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useSessionStore();
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    router.push("/signin");
  };

  const handleProfile = () => {
    console.log("Navigate to profile");
    setIsDropdownOpen(false);
  };

  const handleSettings = () => {
    console.log("Navigate to settings");
    setIsDropdownOpen(false);
  };

  const getUserInitials = () => {
    if (!user?.firstName) return "U";
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return user.firstName[0].toUpperCase();
  };

  const getUserName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.firstName || "User";
  };

  const getUserEmail = () => {
    return user?.email || "user@example.com";
  };

  return (
    <header className="h-16 bg-white border-b border-[#DEEFFF] flex items-center justify-between px-6">
      {/* Left side - Logo */}
      <div className="flex items-center space-x-4">
        <Image 
          src="/shortpoint-logo.svg" 
          alt="ShortPoint Logo" 
          width={160} 
          height={32}
          className="h-8 w-auto"
        />
      </div>

      {/* Right side - User Profile */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors cursor-pointer"
          aria-label="User menu"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleDropdown();
            }
          }}
        >
          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#92F3CA] flex items-center justify-center text-white font-semibold text-sm">
            {getUserInitials()}
          </div>

          {/* Dropdown Icon */}
          <ChevronDown 
            className={`h-4 w-4 text-[#5774A8] transition-transform duration-200 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsDropdownOpen(false)}
            />
            
            {/* Dropdown Content */}
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
              {/* User Info Section */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#92F3CA] flex items-center justify-center text-white font-semibold text-sm">
                    {getUserInitials()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {getUserName()}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {getUserEmail()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button
                  onClick={handleProfile}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User className="h-4 w-4 mr-3 text-gray-400" />
                  Profile
                </button>
                
                <button
                  onClick={handleSettings}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="h-4 w-4 mr-3 text-gray-400" />
                  Settings
                </button>
                
                <hr className="my-1 border-gray-100" />
                
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-3 text-red-500" />
                  Sign out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
