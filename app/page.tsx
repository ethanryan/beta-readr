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
    "A virtual writing workshop with thoughtful readers and distinct perspectives. Discover what works, what does not, and where your writing could grow—without rewriting your work.",
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
