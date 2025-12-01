'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brain } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { setAccessToken } from "@/lib/auth/tokenManager";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [apiError, setApiError] = useState("");


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setApiError("");

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      credentials: "include", // needed for refreshToken cookie
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (!data.Status) {
      setApiError(data.Msg || "Login failed");
      return;
    }

    // ⭐ STORE ACCESS TOKEN IN MEMORY ONLY
    setAccessToken(data.Token);
    Cookies.set("accessToken", data.Token, {
  path: "/",
  sameSite: "lax",
  secure: false,
});

    // Store user info if needed
    sessionStorage.setItem("user", JSON.stringify(data.User));

    // REDIRECT BASED ON ROLES
    if (data.User.roles.includes("admin")) router.push("/admin");
    else router.push("/dashboard");

  } catch (err) {
    setApiError("Server not responding");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2E5D8] to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-[#2E58A6] rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
          </div>

          <CardTitle className="text-2xl font-bold text-[#032B61]">Welcome to MindLMS</CardTitle>
          <CardDescription className="text-[#6B86B4]">
            Sign in to access your personalized learning platform
          </CardDescription>
        </CardHeader>

        <CardContent>
          {apiError && (
            <p className="text-red-600 text-sm mb-2 text-center">{apiError}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-2">
              <Label htmlFor="username" className="text-[#032B61]">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="border-[#6B86B4] focus:border-[#2E58A6]"
                placeholder="john123"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#032B61]">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="border-[#6B86B4] focus:border-[#2E58A6]"
                placeholder="••••••••"
                required
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-[#2E58A6] hover:bg-[#032B61] text-white"
              disabled={!formData.username || !formData.password}
            >
              Sign In
            </Button>

            <div className="text-center text-sm text-[#6B86B4]">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-[#2E58A6] hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
