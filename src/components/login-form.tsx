"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import loginAnimation from "@/animations/login-animation.json";
import { Mail, Grid2X2 } from "lucide-react";
import { useState } from "react";
import { users, User } from "@/lib/data";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Find user by email
    const user = users.find((u: User) => u.email === email);

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    // Check password (all accounts use 'test' as per request)
    if (password !== "test") {
      setError("Invalid email or password");
      return;
    }

    // Store user in sessionStorage
    sessionStorage.setItem("user", JSON.stringify(user));

    // Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div
      className={cn("flex flex-col gap-6 bg-white", className)}
      {...props}
    >
      <Card className="overflow-hidden p-0 bg-white">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* FORM */}
          <form
            className="px-6 md:p-8 bg-white flex flex-col"
            onSubmit={handleSubmit}
          >
            {/* Logo & Brand */}
            <div className="flex items-center justify-center md:justify-start">
              <Image
                src="/auxilium-logo.png"
                alt="Auxilium"
                width={420}
                height={420}
                className="h-32 w-auto"
              />
            </div>

            <div className="flex flex-col gap-6">
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <div className="grid gap-3">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-foreground">
                    Password
                  </Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline text-primary"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Login
              </Button>

              <div className="relative text-center text-sm before:absolute before:inset-x-0 before:top-1/2 before:border-t before:border-border">
                <span className="bg-white px-2 text-muted-foreground relative">
                  Or continue with
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Gmail */}
                <Button
                  variant="outline"
                  type="button"
                  className="w-full text-foreground border-border"
                >
                  <Mail className="h-6 w-6 mx-auto" />
                  <span className="sr-only">Login with Gmail</span>
                </Button>
                {/* Outlook */}
                <Button
                  variant="outline"
                  type="button"
                  className="w-full text-foreground border-border"
                >
                  <Grid2X2 className="h-6 w-6 mx-auto" />
                  <span className="sr-only">Login with Outlook</span>
                </Button>
              </div>

              <div className="text-center text-sm">
                <span className="text-foreground">
                  Don&apos;t have an account?{" "}
                </span>
                <a
                  href="#"
                  className="underline underline-offset-4 text-primary"
                >
                  Sign up
                </a>
              </div>
            </div>
          </form>

          {/* ANIMATION PANEL */}
          <div className="relative hidden md:block bg-teal-50 overflow-hidden">
            <div className="absolute inset-0 z-0 blur-sm">
              <div
                className="absolute top-10 left-10 w-20 h-20 bg-primary/20 animate-float"
                style={{
                  clipPath:
                    "polygon(0% 50%,10%55%,20%45%,30%60%,40%40%,50%60%,60%45%,70%55%,80%50%,90%60%,100%50%,100%100%,0%100%)",
                }}
              />
              <div
                className="absolute top-40 right-20 w-16 h-16 bg-secondary/20 animate-float-slow"
                style={{
                  clipPath:
                    "polygon(0%60%,15%50%,30%65%,45%45%,60%60%,75%40%,90%55%,100%50%,100%100%,0%100%)",
                }}
              />
              <div
                className="absolute bottom-20 left-20 w-24 h-24 bg-accent/20 animate-float-fast"
                style={{
                  clipPath:
                    "polygon(0%55%,20%45%,40%60%,60%40%,80%55%,100%45%,100%100%,0%100%)",
                }}
              />
              <div
                className="absolute bottom-10 right-10 w-12 h-12 bg-primary/10 animate-float"
                style={{
                  clipPath:
                    "polygon(0%50%,25%60%,50%40%,75%55%,100%45%,100%100%,0%100%)",
                }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Lottie
                animationData={loginAnimation}
                loop
                className="w-3/4 h-3/4"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}