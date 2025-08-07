import React from "react";
import Image from "next/image";

interface AuthCardProps {
  title: string;
  children: React.ReactNode;
}

export function AuthCard({ title, children }: AuthCardProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full" style={{ minWidth: "440px", maxWidth: "440px" }}>
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/shortpoint-logo.svg"
            alt="ShortPoint"
            width={258.39}
            height={44}
            priority
          />
        </div>

        {/* Auth Card */}
        <div
          className="bg-white rounded p-8"
          style={{
            boxShadow:
              "0px 1px 3px 0px #0000000D, 0px 10px 15px -5px #0000001A, 0px 7px 7px -5px #0000000A",
          }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-left">
            {title}
          </h1>

          {children}
        </div>
      </div>
    </div>
  );
}
