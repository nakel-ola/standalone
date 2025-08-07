"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, AtSign } from "lucide-react";
import { Button, Input, Label } from "@/components/ui";
import { useSessionStore } from "@/lib/useSessionStore";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { signInSchema, type SignInFormData } from "@/lib/schemas";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const login = useSessionStore((state) => state.login);

  const handleSubmit = async (values: SignInFormData) => {
    setIsLoading(true);

    // Mock login delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock login logic
    login(values.email);
    router.push("/dashboard");
  };

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

        {/* Login Card */}
        <div
          className="bg-white rounded p-8"
          style={{
            boxShadow:
              "0px 1px 3px 0px #0000000D, 0px 10px 15px -5px #0000001A, 0px 7px 7px -5px #0000000A",
          }}
        >
          <h1
            className="mb-6 text-left"
            style={{
              color: "#5774A8",
              fontFamily: "Roboto",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "18px",
              letterSpacing: "0%",
            }}
          >
            Login to Account
          </h1>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={toFormikValidationSchema(signInSchema)}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email*
                  </Label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="pl-10"
                      required
                    />
                  </div>
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">
                    Password*
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-xs">{errors.password}</p>
                  )}
                </div>

                {/* Forgot Password and Login Button */}
                <div className="flex items-center justify-between">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Forgot password?
                  </Link>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <span className="text-gray-600">Don&apos;t have an account? </span>
          <Link
            href="/signup"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
