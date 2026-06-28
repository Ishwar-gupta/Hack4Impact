import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Database, ShieldCheck } from "lucide-react"

export function Settings() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account, organization details, and AI API configurations.
        </p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-semibold">Account Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Admin User" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" defaultValue="admin@ntibdp.gov.np" />
              </div>
            </div>
            <Button>Save Changes</Button>
          </div>
        </TabsContent>
        <TabsContent value="organization">
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-semibold">Organization Config</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input id="orgName" defaultValue="Government of Nepal" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" defaultValue="Ministry of Labour" />
              </div>
            </div>
            <Button>Save Changes</Button>
          </div>
        </TabsContent>
        <TabsContent value="api">
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-semibold">AI Configuration</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai">OpenAI API Key (For Simulation & Chatbot)</Label>
                <Input id="openai" type="password" defaultValue="sk-..." />
              </div>
            </div>
            <Button>Update Keys</Button>
          </div>
        </TabsContent>
        <TabsContent value="operations">
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-semibold">Operational Preferences</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  label: "Risk alerts",
                  description: "Notify analysts when district scores cross threshold.",
                  icon: Bell,
                },
                {
                  label: "Auto refresh",
                  description: "Refresh dashboards and heatmap layers every 30 seconds.",
                  icon: Database,
                },
                {
                  label: "Verified exports",
                  description: "Attach integrity metadata to generated reports.",
                  icon: ShieldCheck,
                },
              ].map((setting) => (
                <div
                  key={setting.label}
                  className="rounded-lg border border-border/50 bg-secondary/30 p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <setting.icon className="h-4 w-4 text-accent" />
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm font-medium">{setting.label}</p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {setting.description}
                  </p>
                </div>
              ))}
            </div>
            <Button>Save Operational Settings</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
