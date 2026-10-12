import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CalendarDays, Heart, Newspaper, X } from "lucide-react";

import PageHero from "../components/PageHero.jsx";
import { getPosts, readLocalLikes, toggleLocalLike } from "../lib/news/posts";

function formatDate(value) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

/**
 * News is a normal, read-only page on GitHub Pages.
 *
 * Posts come from the committed `src/data/news-posts.json` and are baked into
 * the prerendered HTML; there is no API, no sign-in, and no server-side
 * administration. Likes are stored in this visitor's own browser and are
 * labelled as demo figures, never presented as real readership.
 */
export default function News() {
  const posts = useMemo(() => getPosts(), []);
  const [openId, setOpenId] = useState(null);
  const [liked, setLiked] = useState({});

  // Read after hydration so the prerendered markup matches on first paint and
  // the visitor's own likes apply without a hydration mismatch.
  useEffect(() => {
    setLiked(readLocalLikes());
  }, []);

  // Close the reader with Escape, matching the usual dialog convention.
  useEffect(() => {
    if (!openId) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openId]);

  const hasDemoCounts = useMemo(() => posts.some((post) => post.demoLikeCount), [posts]);

  const active = useMemo(() => posts.find((post) => post.id === openId) ?? null, [posts, openId]);

  /**
   * The number shown on the heart. A visitor's own browser likes are added on
   * top of the stored count; when the stored count is seeded demo data the UI
   * labels it as such instead of implying real readership.
   */
  const likeCount = (post) => (post.likes ?? 0) + (liked[post.id] ? 1 : 0);

  function handleLike(post) {
    setLiked((current) => toggleLocalLike(current, post.id));
  }

  return (
    <>
      <PageHero
        eyebrow="Latest Updates"
        title="News"
        subtitle="Announcements, course updates, and security write-ups from FIKRADO Security."
      />

      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container">
          <div className="news-toolbar">
            <div className="news-toolbar-meta">
              <Newspaper size={16} aria-hidden="true" />
              <span>
                {posts.length} {posts.length === 1 ? "post" : "posts"}
              </span>
              {hasDemoCounts ? <span className="news-demo-tag">Demo like counts</span> : null}
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="news-state glass-card">
              <Newspaper size={22} aria-hidden="true" />
              <p>No posts published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="news-grid">
              {posts.map((post, i) => (
                <motion.article
                  className="news-card glass-card"
                  key={post.id}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                >
                  <div className="news-card-media">
                    {post.imageUrl ? (
                      <img src={post.imageUrl} alt="" loading="lazy" />
                    ) : (
                      <div className="news-card-media-fallback" aria-hidden="true">
                        <Newspaper size={26} />
                      </div>
                    )}
                  </div>
                  <div className="news-card-body">
                    <span className="news-card-date">
                      <CalendarDays size={13} aria-hidden="true" />
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    </span>
                    <h3>{post.title}</h3>
                    {post.excerpt ? <p className="news-card-excerpt">{post.excerpt}</p> : null}
                    <div className="news-card-actions">
                      <button
                        type="button"
                        className="btn btn-ghost news-btn-sm"
                        onClick={() => setOpenId(post.id)}
                      >
                        Read more
                      </button>
                      <button
                        type="button"
                        className={`news-like${liked[post.id] ? " liked" : ""}`}
                        onClick={() => handleLike(post)}
                        aria-pressed={Boolean(liked[post.id])}
                        aria-label={`Like ${post.title}`}
                      >
                        <Heart size={15} aria-hidden="true" />
                        <span>{likeCount(post).toLocaleString()}</span>
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="news-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpenId(null)}
          >
            <motion.article
              className="news-modal glass-card"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="news-modal-close"
                onClick={() => setOpenId(null)}
                aria-label="Close post"
              >
                <X size={20} />
              </button>
              {active.imageUrl ? <img className="news-modal-media" src={active.imageUrl} alt="" /> : null}
              <div className="news-modal-body">
                <span className="news-card-date">
                  <CalendarDays size={13} aria-hidden="true" />
                  <time dateTime={active.publishedAt}>{formatDate(active.publishedAt)}</time>
                </span>
                <h2>{active.title}</h2>
                <div className="news-modal-content">
                  {String(active.content ?? "")
                    .split(/\n{2,}/)
                    .map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                </div>
                <div className="news-modal-actions">
                  <button
                    type="button"
                    className={`news-like${liked[active.id] ? " liked" : ""}`}
                    onClick={() => handleLike(active)}
                    aria-pressed={Boolean(liked[active.id])}
                    aria-label={`Like ${active.title}`}
                  >
                    <Heart size={16} aria-hidden="true" />
                    <span>{likeCount(active).toLocaleString()}</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost news-btn-sm"
                    onClick={() => setOpenId(null)}
                  >
                    <ArrowLeft size={15} aria-hidden="true" />
                    Back to news
                  </button>
                </div>
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}