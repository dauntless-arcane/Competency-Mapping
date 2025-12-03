'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    class: "",
    section: "",
    rollNo: "",
    dob: ""
  });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        class: formData.class,
        section: formData.section,
        rollNo: formData.rollNo,
        dob: formData.dob
      })
    });

    const data = await res.json();

    if (!res.ok) {
      // Username already exists → show suggestions
      if (data.Suggestions) {
        alert(`Username already exists. Try: ${data.Suggestions.join(", ")}`);
        return;
      }

      alert(data.Msg || "Something went wrong");
      return;
    }

    alert("Account created successfully!");
    router.push("/auth/login");

  } catch (error) {
    console.error(error);
    alert("Unable to connect to server. Please try again.");
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

          <CardTitle className="text-2xl font-bold text-[#032B61]">Create Your Account</CardTitle>
          <CardDescription className="text-[#6B86B4]">
            Join MindLMS to start your learning journey
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* USERNAME */}
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

            {/* FULL NAME */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#032B61]">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-[#6B86B4] focus:border-[#2E58A6]"
                placeholder="John Doe"
                required
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#032B61]">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border-[#6B86B4] focus:border-[#2E58A6]"
                placeholder="john@example.com"
                required
              />
            </div>

            {/* CLASS */}
            <div className="space-y-2">
              <Label htmlFor="class" className="text-[#032B61]">Class</Label>
              <Input
                id="class"
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                className="border-[#6B86B4] focus:border-[#2E58A6]"
                placeholder="6"
                required
              />
            </div>

            {/* SECTION */}
            <div className="space-y-2">
              <Label htmlFor="section" className="text-[#032B61]">Section</Label>
              <Input
                id="section"
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                className="border-[#6B86B4] focus:border-[#2E58A6]"
                placeholder="A"
                required
              />
            </div>

            {/* ROLL NO */}
            <div className="space-y-2">
              <Label htmlFor="rollNo" className="text-[#032B61]">Roll No</Label>
              <Input
                id="rollNo"
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                className="border-[#6B86B4] focus:border-[#2E58A6]"
                placeholder="12"
                required
              />
            </div>

            {/* DATE OF BIRTH */}
            <div className="space-y-2">
              <Label htmlFor="dob" className="text-[#032B61]">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="border-[#6B86B4] focus:border-[#2E58A6]"
                required
              />
            </div>

            {/* PASSWORD */}
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

            {/* CONFIRM PASSWORD */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#032B61]">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="border-[#6B86B4] focus:border-[#2E58A6]"
                placeholder="••••••••"
                required
              />
            </div>

            {/* SUBMIT BUTTON */}
            <Button 
              type="submit"
              className="w-full bg-[#2E58A6] hover:bg-[#032B61] text-white"
            >
              Create Account
            </Button>

            {/* SIGN IN LINK */}
            <div className="text-center text-sm text-[#6B86B4]">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-[#2E58A6] hover:underline">
                Sign in
              </Link>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}