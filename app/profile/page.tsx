import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Manage your account settings and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="offline-mode">Offline Mode</Label>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Enable offline access to your photos
              </p>
              <Switch id="offline-mode" defaultChecked />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="auto-upload">Auto Upload</Label>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Automatically upload new photos from your device
              </p>
              <Switch id="auto-upload" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="high-quality">High Quality Storage</Label>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Store photos in original quality (uses more storage)
              </p>
              <Switch id="high-quality" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
          <CardDescription>
            Monitor your storage usage and manage your plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Used Storage</span>
              <span className="text-sm text-muted-foreground">
                1.2 GB / 5 GB
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="bg-primary h-full" style={{ width: "24%" }} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Upgrade Storage</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
