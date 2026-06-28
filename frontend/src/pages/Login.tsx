import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.16),_transparent_30%),linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_100%)] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl overflow-hidden rounded-[28px] border border-border/70 bg-background/90 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.35)] backdrop-blur-xl">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-800 p-10 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(96,165,250,0.28),_transparent_35%)]" />
            <div className="relative z-10 space-y-8">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm backdrop-blur">
                <ShieldCheck className="h-4 w-4" />
                Secure National Intelligence Portal
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-semibold leading-tight">
                  Monitor migration risk with real-time insight.
                </h2>
                <p className="max-w-lg text-sm leading-7 text-slate-300">
                  NTIBDP brings together policy data, economic forecasting, and
                  migration analytics into one secure workspace for
                  decision-makers across Nepal.
                </p>
              </div>

              <div className="space-y-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                {[
                  "Live district-level forecasting",
                  "AI-powered risk and scenario modeling",
                  "Trusted access for government and partners",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-slate-200"
                  >
                    <Sparkles className="h-4 w-4 text-sky-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 text-sm text-slate-400">
              &copy; {new Date().getFullYear()} Government of Nepal
            </div>
          </div>

          <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <div className="mb-4 inline-flex rounded-full bg-primary/10 p-2 text-primary">
                  <Lock className="h-5 w-5" />
                </div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                  Welcome back
                </h1>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Sign in to continue exploring migration intelligence and
                  policy insights.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="admin@ntibdp.gov.np"
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 h-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-muted-foreground">
                    <input type="checkbox" className="rounded border-border" />
                    Remember me
                  </label>
                  <a
                    href="#"
                    className="font-medium text-primary transition hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                <Button className="w-full h-11" size="lg" type="submit">
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="mt-6 rounded-2xl border border-dashed border-border/80 bg-muted/30 p-4 text-center text-sm text-muted-foreground">
                New here?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-primary hover:underline"
                >
                  Request access
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
