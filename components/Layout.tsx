"use client";

import React, { useMemo } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface LayoutProp {
  children: React.ReactNode;
  title?: string;
  rightContainer?: React.ReactNode;
  backBtnOff?: boolean;
}

const Layout = ({
  children,
  title,
  rightContainer,
  backBtnOff = false,
}: LayoutProp) => {
  const router = useRouter();
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }, []);

  // Android Chrome/Google browser detection
  const isAndroidChromeBrowser = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      /Android/i.test(navigator.userAgent) &&
      /Chrome|Google/i.test(navigator.userAgent)
    );
  }, []);

  // iOS Chrome/Google browser detection
  const isIOSChromeBrowser = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      /(iPhone|iPad|iPod)/i.test(navigator.userAgent) &&
      /CriOS/i.test(navigator.userAgent)
    );
  }, []);

  // General mobile Chrome browser detection (both Android and iOS)
  const isMobileChromeBrowser = useMemo(() => {
    return isAndroidChromeBrowser || isIOSChromeBrowser;
  }, [isAndroidChromeBrowser, isIOSChromeBrowser]);

  // Generic mobile browser detection (Safari, Firefox, etc.)
  const isMobileSafariBrowser = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      isMobile && /Safari/i.test(navigator.userAgent) && !isMobileChromeBrowser
    );
  }, [isMobile, isMobileChromeBrowser]);

  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="flex py-4 fixed top-0 left-0 right-0 z-10  backdrop-blur-xs ">
        <div
          className={`flex items-center w-full justify-between ${
            isMobile && "max-sm:mt-10"
          } pr-2`}
        >
          {!backBtnOff && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full basis-15"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-2xl font-bold w-full max-sm:text-center basis-60 ">
            {title}
          </h1>
          <div className="basis-15">{rightContainer}</div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
