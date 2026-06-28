import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

export function Register() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-primary-foreground flex-col justify-between p-12">
        <div className="font-bold text-2xl tracking-tight">NTIBDP</div>
        <div>
          <h2 className="text-3xl font-bold leading-tight">
            Join the Intelligence Network
          </h2>
          <p className="mt-4 text-primary-foreground/70 max-w-md leading-relaxed">
            Request access to Nepal's most comprehensive brain drain analytics platform used by government agencies, universities, and research institutions.
          </p>
        </div>
        <p className="text-primary-foreground/50 text-sm">
          &copy; {new Date().getFullYear()} Government of Nepal
        </p>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
            <p className="text-muted-foreground mt-2">
              Fill in your details to request access to the platform.
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reg-first">First Name</Label>
                <Input id="reg-first" placeholder="Bikash" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-last">Last Name</Label>
                <Input id="reg-last" placeholder="Sharma" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-email">Official Email</Label>
              <Input id="reg-email" type="email" placeholder="name@organization.gov.np" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-org">Organization</Label>
              <Input id="reg-org" placeholder="Ministry of Labour" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-password">Password</Label>
              <div className="relative">
                <Input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button className="w-full" size="lg">Request Access</Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-[#2563EB] hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
