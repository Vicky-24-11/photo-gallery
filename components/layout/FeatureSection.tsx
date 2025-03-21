import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Smartphone, Upload } from "lucide-react";

export function FeatureSection() {
  const features = [
    {
      icon: <Upload className="h-10 w-10 mb-4 text-primary" />,
      title: "Easy Uploads",
      description:
        "Upload photos from your device or take pictures directly with your camera.",
    },
    {
      icon: <Cloud className="h-10 w-10 mb-4 text-primary" />,
      title: "Cloud Sync",
      description:
        "All your photos are automatically synced to the cloud for safe keeping.",
    },
    {
      icon: <Smartphone className="h-10 w-10 mb-4 text-primary" />,
      title: "Offline Access",
      description:
        "Access your favorite photos even when you're offline. Perfect for travel.",
    },
  ];

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border bg-card text-card-foreground">
              <CardHeader className="flex flex-col items-center text-center">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
