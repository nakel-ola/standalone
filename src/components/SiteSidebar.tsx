"use client";

import { useRouter, usePathname } from "next/navigation";
import { FileText, Navigation, Image, Users, Settings, Palette } from "lucide-react";

interface SiteSidebarProps {
  siteId: string;
  siteName?: string;
}

export const SiteSidebar = ({ siteId, siteName = "Site" }: SiteSidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const menuItems = [
    {
      id: 'navigation',
      label: 'Navigation',
      icon: Navigation,
      path: `/sites/${siteId}/navigation`,
    },
    {
      id: 'pages',
      label: 'Pages',
      icon: FileText,
      path: `/sites/${siteId}/pages`,
    },
    {
      id: 'assets',
      label: 'Assets Library',
      icon: Image,
      path: `/sites/${siteId}/assets`,
    },
  ];

  const settingsItems = [
    {
      id: 'team',
      label: 'Site Team',
      icon: Users,
      path: `/sites/${siteId}/team`,
    },
    {
      id: 'theme',
      label: 'Theme',
      icon: Palette,
      path: `/sites/${siteId}/theme`,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: `/sites/${siteId}/settings`,
    },
  ];

  const isActiveMenu = (path: string) => {
    // For site base path, check if we're on the main site page or navigation page
    if (path === `/sites/${siteId}/navigation`) {
      return pathname === `/sites/${siteId}` || pathname === `/sites/${siteId}/navigation`;
    }
    return pathname.startsWith(path);
  };

  return (
    <aside className="w-[15%] bg-white border-r border-[#DEEFFF] flex flex-col">
      {/* Site Header */}
      <div className="p-4 border-b border-[#DEEFFF]">
        <h2 className="text-lg font-semibold text-[#202224] truncate">
          {siteName}
        </h2>
        <p className="text-sm text-[#5774A8]">Site Dashboard</p>
      </div>

      <nav className="flex-1 p-4">
        {/* Main Menu Items */}
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center text-left px-3 py-3 text-sm transition-colors cursor-pointer ${
                    isActiveMenu(item.path)
                      ? 'bg-[#E7F5FF] text-[#3161D1]'
                      : 'text-[#5774A8] hover:bg-[#E7F5FF]/50 hover:text-[#3161D1]'
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-3 flex-shrink-0" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Horizontal separator */}
        <hr className="my-4 border-t border-[#E0E0E0]" />

        {/* Settings Menu Items */}
        <ul className="space-y-1">
          {settingsItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center text-left px-3 py-3 text-sm transition-colors cursor-pointer ${
                    isActiveMenu(item.path)
                      ? 'bg-[#E7F5FF] text-[#3161D1]'
                      : 'text-[#5774A8] hover:bg-[#E7F5FF]/50 hover:text-[#3161D1]'
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-3 flex-shrink-0" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
