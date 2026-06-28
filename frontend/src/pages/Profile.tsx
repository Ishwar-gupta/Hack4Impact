import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Building2, Shield } from "lucide-react"

export function Profile() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal information and platform preferences.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4">
              AU
            </div>
            <h3 className="font-semibold text-lg">Admin User</h3>
            <p className="text-sm text-muted-foreground">admin@ntibdp.gov.np</p>
            <Badge className="mt-3">System Administrator</Badge>
            <div className="mt-6 w-full space-y-3 text-sm text-left">
              <div className="flex items-center text-muted-foreground">
                <Building2 className="mr-2 h-4 w-4" />
                Government of Nepal
              </div>
              <div className="flex items-center text-muted-foreground">
                <Shield className="mr-2 h-4 w-4" />
                Full Access
              </div>
              <div className="flex items-center text-muted-foreground">
                <Mail className="mr-2 h-4 w-4" />
                admin@ntibdp.gov.np
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Edit Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="profile-first">First Name</Label>
                <Input id="profile-first" defaultValue="Admin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-last">Last Name</Label>
                <Input id="profile-last" defaultValue="User" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-email">Email</Label>
              <Input id="profile-email" type="email" defaultValue="admin@ntibdp.gov.np" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-phone">Phone</Label>
              <Input id="profile-phone" defaultValue="+977 9801234567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-bio">Bio</Label>
              <textarea
                id="profile-bio"
                rows={3}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                defaultValue="Platform administrator for the National Talent Intelligence System."
              />
            </div>
            <Button>Save Profile</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
