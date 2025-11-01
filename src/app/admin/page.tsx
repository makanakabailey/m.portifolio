'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Lock, Unlock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DailyPostsAdmin } from "@/components/admin/DailyPostsAdmin";
import { CasesAdmin } from "@/components/admin/CasesAdmin";
import { ContactInquiriesAdmin } from "@/components/admin/ContactInquiriesAdmin";

const AdminPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("posts");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    // Check if already authenticated
    const savedPin = localStorage.getItem('adminPin');
    if (savedPin === '7653') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '7653') {
      localStorage.setItem('adminPin', pin);
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid PIN. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminPin');
    setIsAuthenticated(false);
    setPin("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Lock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Admin Access</h1>
            <p className="text-muted-foreground">Enter your PIN to access the admin panel</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <Label htmlFor="pin">Admin PIN</Label>
              <Input
                id="pin"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter 4-digit PIN"
                maxLength={4}
                className="text-center text-lg tracking-widest"
                autoFocus
              />
            </div>

            {authError && (
              <p className="text-red-600 text-sm text-center">{authError}</p>
            )}

            <Button type="submit" className="w-full">
              Access Admin Panel
            </Button>
          </form>

          <div className="mt-8 text-center">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Site
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <Unlock className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl md:text-4xl font-black">Admin Panel</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Site
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="posts">Daily Posts</TabsTrigger>
            <TabsTrigger value="cases">Case Studies</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts">
            <DailyPostsAdmin />
          </TabsContent>
          
          <TabsContent value="cases">
            <CasesAdmin />
          </TabsContent>
          
          <TabsContent value="inquiries">
            <ContactInquiriesAdmin />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;