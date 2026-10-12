// Shape of a post in `public/news-posts.json`.
//
// News is a static, read-only page on GitHub Pages: there is no API and no
// authentication. Posts are added and edited by committing this data to the
// repository, so nothing here is ever written back from the browser.

export type NewsPost = {
  id: string;
  title: string;
  /** Short summary shown on the card. */
  excerpt: string;
  content: string;
  /** Absolute URL or a site-relative path such as "/news/cyber.jpg". */
  imageUrl: string;
  /** ISO date used for sorting and display. */
  publishedAt: string;
  /** Set to false to keep a post hidden while you draft it. */
  published: boolean;
  /** Total count to display, including any demo baseline. */
  likes: number;
  /**
   * True while `likes` includes seeded demo numbers rather than only genuine
   * visitor likes. Surfaced in the UI so demo figures are never presented as
   * real engagement.
   */
  demoLikeCount: boolean;
  /** The demo portion of `likes`, so the UI can label how much is not real. */
  demoBaseline: number;
};
