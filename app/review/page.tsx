import type { Metadata } from "next";
import { ReviewWorkspace } from "./ReviewWorkspace";

export const metadata: Metadata = {
  title: "Get Feedback",
  description:
    "Share your writing with betaReadr and get thoughtful, structured feedback in the style of your choice.",
};

export default function ReviewPage() {
  return <ReviewWorkspace />;
}
