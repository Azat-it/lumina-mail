import { Separator } from "@workspace/ui/components/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { ThemeSelector } from "./theme-selector";
import { LogoutButton } from "./logout-button";

export default async function SettingsPage() {
  return (
    <div className="container max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Settings</h3>
          <p className="text-sm text-muted-foreground">
            Customize your application experience.
          </p>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
      <Separator />
      <Tabs defaultValue="appearance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger className="relative" disabled value="application">
            Application
          </TabsTrigger>
          <TabsTrigger disabled value="notifications">Notifications</TabsTrigger>
          <TabsTrigger disabled value="email">Email</TabsTrigger>
        </TabsList>
        <TabsContent value="appearance" className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Appearance</h3>
            <p className="text-sm text-muted-foreground">
              Customize how Lumina Mail looks on your device.
            </p>
          </div>
          <Separator />
          <div className="space-y-4 max-w-[400px]">
            <h3 className="text-lg font-medium">Theme</h3>
            <p className="text-sm text-muted-foreground">
              Select the theme for your dashboard.
            </p>
            <ThemeSelector />
          </div>
        </TabsContent>
      </Tabs>
    </div >
  );
} 