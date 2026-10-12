import { createFileRoute } from "@tanstack/react-router";
import Community from "../pages/Community.jsx";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community | FIKRADO Security" },
      {
        name: "description",
        content:
          "Join the FIKRADO Security community - posts, videos, and updates from Stratosphere Aeronautics Facebook page. Cybersecurity discussions, training announcements, and tech education.",
      },
      { property: "og:title", content: "Community | FIKRADO Security" },
      {
        property: "og:description",
        content:
          "Posts, videos, and updates from the FIKRADO Security community at Stratosphere Aeronautics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Community,
});