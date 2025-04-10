"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";

// Define Zod schema for validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    console.log("Logging in with:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setErrorMessage("Invalid credentials!"); // Simulate login failure
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-sm rounded-lg p-6 shadow-lg border border-white text-white m-5">
        <h2 className="text-2xl font-semibold text-center text-white">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-4">
          {/* Email Field */}
          <div>
            <Label className="mb-3" htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="mt-2"
              
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mt-4">
            <Label className="mb-3" htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="mt-2"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-sm text-red-500 text-center mt-4">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-white text-black font-bold mt-4 text-md" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Submit"}
          </Button>
        </form>
        <div className="text-lg mt-4">
          Ready to dive in? 
          <Link href="/signup" className="text-blue-600 ps-1">
            Create a new account
          </Link>
        </div>
      </div>
    </div>
  );
}
