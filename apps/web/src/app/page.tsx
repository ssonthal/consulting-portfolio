import { Hero } from "@/components/marketing/hero";
import { WhatsAppDemo } from "@/components/marketing/whatsapp-demo";
import { AgentGrid } from "@/components/marketing/agent-grid";
import {
  CtaBanner,
  FeatureSections,
} from "@/components/marketing/feature-sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatsAppDemo />
      <AgentGrid />
      <FeatureSections />
      <CtaBanner />
    </>
  );
}
