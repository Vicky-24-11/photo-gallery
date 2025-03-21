import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/layout/HeroSection";
import { FeatureSection } from "@/components/layout/FeatureSection";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout backBtnOff={true}>
      <HeroSection />
      <FeatureSection />
      <div className="flex justify-center pb-8">
        <Link href="/gallery">
          <Button size="lg">Explore Gallery</Button>
        </Link>
      </div>
    </Layout>
  );
}
