import { Hero } from "@/components/marketing/hero";
import { ServicesOverview } from "@/components/marketing/services-overview";
import { WhatsAppDemo } from "@/components/marketing/whatsapp-demo";
import { Cta } from "@/components/marketing/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhatsAppDemo />
      <Cta />
    </>
  );
}
