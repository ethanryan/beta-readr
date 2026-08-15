import type { Metadata } from "next";
import { Hero } from "@/components/landing/Hero";
import { InteractiveExamples } from "@/components/landing/InteractiveExamples";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { WhatWeReview } from "@/components/landing/WhatWeReview";
import { Philosophy } from "@/components/landing/Philosophy";
import { FeedbackIncludes } from "@/components/landing/FeedbackIncludes";
import { Personas } from "@/components/landing/Personas";
import { Faq } from "@/components/landing/Faq";
import { ClosingCta } from "@/components/landing/ClosingCta";

export const metadata: Metadata = {
  title: "betaReadr | AI Feedback Without AI Ghostwriting",
  description:
    "Get thoughtful, workshop-style feedback on your writing. betaReadr identifies strengths, weaknesses, reader reactions, and revision priorities without rewriting your work.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <InteractiveExamples />
      <HowItWorks />
      <WhatWeReview />
      <Philosophy />
      <FeedbackIncludes />
      <Personas />
      <Faq />
      <ClosingCta />
    </>
  );
}
