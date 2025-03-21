import { Camera } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-6 md:py-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Camera className="h-5 w-5" />
          <span className="text-sm font-semibold">Photo Gallery</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy
          </a>
          <span>© {new Date().getFullYear()} Photo Gallery</span>
        </div>
      </div>
    </footer>
  );
}
