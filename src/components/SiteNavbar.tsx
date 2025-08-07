"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, User, Settings, LogOut, ExternalLink } from "lucide-react";
import { useSessionStore } from "@/lib/useSessionStore";
import Image from "next/image";

interface SiteNavbarProps {
  siteName: string;
  siteUrl?: string;
}

export const SiteNavbar = ({ siteName, siteUrl }: SiteNavbarProps) => {
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

  const handleLogoClick = () => {
    router.push("/dashboard");
  };

  const handleEditClick = () => {
    console.log("Edit button clicked");
    // TODO: Navigate to edit mode or open edit modal
  };

  const handlePublishClick = () => {
    console.log("Publish button clicked");
    // TODO: Publish site or open publish dialog
  };

  const handleConnectDomainClick = () => {
    console.log("Connect Domain button clicked");
    // TODO: Open connect domain modal or navigate to domain settings
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

  const isDefaultUrl = (url: string) => {
    return url?.endsWith('.shortpoint.com') || false;
  };

  return (
    <header className="h-16 bg-white border-b border-[#DEEFFF] flex items-center px-6">
      {/* Left side - Logo */}
      <div className="flex items-center space-x-4 w-[15%]">
        <button
          onClick={handleLogoClick}
          className="hover:opacity-80 transition-opacity cursor-pointer"
          aria-label="Go to dashboard"
        >
          <Image 
            src="/shortpoint-logo.svg" 
            alt="ShortPoint Logo" 
            width={160} 
            height={32}
            className="h-8 w-auto"
          />
        </button>
      </div>

      {/* Right panel area with site URL */}
      <div className="flex-1 flex items-center justify-between">
        {/* Site URL and Connect Domain aligned to start of right panel */}
        {siteUrl && (
          <div className="flex items-center space-x-3">
            <a
              href={`https://${siteUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-[#F5F6FA] px-3 py-2 rounded-lg hover:bg-[#E7F5FF] transition-colors cursor-pointer"
              aria-label={`Visit ${siteUrl} in new tab`}
              tabIndex={0}
            >
              <span className="text-sm text-[#5774A8] font-medium">
                {siteUrl}
              </span>
              <ExternalLink className="h-4 w-4 text-[#5774A8]" />
            </a>
            
            {/* Connect Domain Button - Only show for default URLs */}
            {isDefaultUrl(siteUrl) && (
              <button
                onClick={handleConnectDomainClick}
                className="px-4 py-2 text-sm font-medium text-[#3161D1] bg-white rounded-lg hover:bg-[#F5F6FA] transition-colors cursor-pointer"
                aria-label="Connect custom domain"
                tabIndex={0}
              >
                Connect Domain
              </button>
            )}
          </div>
        )}

        {/* User Profile and Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* User Profile */}
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

          {/* Edit Button */}
          <button
            onClick={handleEditClick}
            className="px-4 py-2 text-sm font-medium text-[#5774A8] bg-white border border-[#EAEAEA] rounded-lg hover:bg-[#F5F6FA] transition-colors cursor-pointer"
            aria-label="Edit site"
            tabIndex={0}
          >
            Edit
          </button>

          {/* Publish Button */}
          <button
            onClick={handlePublishClick}
            className="px-4 py-2 text-sm font-medium text-white bg-[#3161D1] rounded-lg hover:bg-[#2651C1] transition-colors cursor-pointer"
            aria-label="Publish site"
            tabIndex={0}
          >
            Publish
          </button>
        </div>
      </div>
    </header>
  );
};
