"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { useSessionStore } from "@/lib/useSessionStore";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useSessionStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push("/signin");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              Logout
            </Button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              Welcome to ShortPoint!
            </h2>
            <div className="space-y-2 text-blue-800">
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              {user?.firstName && (
                <p>
                  <strong>Name:</strong> {user.firstName} {user.lastName}
                </p>
              )}
              <p>
                <strong>Status:</strong> Authenticated
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Mock Feature 1
              </h3>
              <p className="text-gray-600">
                This is a mock dashboard feature. In a real application, you
                would see actual data and functionality here.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Mock Feature 2
              </h3>
              <p className="text-gray-600">
                Another mock feature to demonstrate the dashboard layout and
                functionality.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Mock Feature 3
              </h3>
              <p className="text-gray-600">
                This demonstrates how the authentication flow works with the
                Zustand store.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
