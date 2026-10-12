import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CalendarDays, ExternalLink, Heart, MessageSquare, Play, Share2, Video } from "lucide-react";

import PageHero from "../components/PageHero.jsx";
import { getCommunityPosts, readLocalLikes, toggleLocalLike } from "../lib/community/posts";

function formatDate(value) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

const COMMUNITY_VIDEOS = [
  { id: "JNIudfkfPvk", title: "Cybersecurity Fundamentals" },
  { id: "Ea7Pu9KCoS4", title: "Security Awareness Training" },
  { id: "ljWNdEwQe4s", title: "Linux & Networking Basics" },
  { id: "l10Uzd5OJO8", title: "Ethical Hacking Techniques" },
  { id: "A4v3WBPApfQ", title: "Web Application Security" },
  { id: "pPO6CIlN0Ts", title: "Phishing & Social Engineering Defense" },
];

const FACEBOOK_LINKS = [
  { label: "Visit Facebook Page", url: "https://www.facebook.com/Stratosphere1/", icon: "facebook" },
  { label: "All Posts", url: "https://www.facebook.com/Stratosphere1/posts", icon: "posts" },
  { label: "Videos", url: "https://www.facebook.com/Stratosphere1/videos", icon: "video" },
  { label: "Community", url: "https://www.facebook.com/Stratosphere1/community", icon: "community" },
];

export default function Community() {
  const posts = useMemo(() => getCommunityPosts(), []);
  const [openId, setOpenId] = useState(null);
  const [liked, setLiked] = useState({});

  useEffect(() => {
    setLiked(readLocalLikes());
  }, []);

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

  const likeCount = (post) => (post.likes ?? 0) + (liked[post.id] ? 1 : 0);

  function handleLike(post) {
    setLiked((current) => toggleLocalLike(current, post.id));
  }

  return (
    <>
      <PageHero
        eyebrow="Community Hub"
        title="Community"
        subtitle="Posts, videos, and updates from our Facebook community at Stratosphere Aeronautics."
      />

      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container">
          <div className="community-toolbar">
            <div className="community-toolbar-meta">
              <MessageSquare size={16} aria-hidden="true" />
              <span>
                {posts.length} {posts.length === 1 ? "post" : "posts"}
              </span>
              <Video size={16} aria-hidden="true" style={{ marginLeft: 12 }} />
              <span>{COMMUNITY_VIDEOS.length} videos</span>
              {hasDemoCounts ? <span className="community-demo-tag">Demo like counts</span> : null}
            </div>
            <div className="community-toolbar-actions">
              <a
                href="https://www.facebook.com/Stratosphere1/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <ExternalLink size={15} aria-hidden="true" />
                Visit Facebook Page
              </a>
            </div>
          </div>

          {/* Videos Section */}
          <div className="community-videos-section">
            <h2 className="community-section-title">
              <Video size={20} aria-hidden="true" />
              Featured Videos
            </h2>
            <div className="videos-embed-grid">
              {COMMUNITY_VIDEOS.map((vid, i) => (
                <motion.div
                  className="video-embed-card glass-card"
                  key={vid.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                >
                  <div className="video-embed-wrap">
                    <iframe
                      src={`https://www.youtube.com/embed/${vid.id}`}
                      title={vid.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="video-embed-body">
                    <Play size={16} color="#f87171" />
                    <h3>{vid.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Posts Section */}
          <div className="community-posts-section">
            <h2 className="community-section-title">
              <MessageSquare size={20} aria-hidden="true" />
              Community Posts
            </h2>

            {posts.length === 0 ? (
              <div className="community-state glass-card">
                <MessageSquare size={22} aria-hidden="true" />
                <p>No posts published yet. Check back soon.</p>
                <a
                  href="https://www.facebook.com/Stratosphere1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ marginTop: 16 }}
                >
                  <ExternalLink size={15} aria-hidden="true" />
                  Visit Facebook Page
                </a>
              </div>
            ) : (
              <div className="community-grid">
                {posts.map((post, i) => (
                  <motion.article
                    className="community-card glass-card"
                    key={post.id}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                  >
                    <div className="community-card-media">
                      {post.imageUrl ? (
                        <img src={post.imageUrl} alt="" loading="lazy" />
                      ) : (
                        <div className="community-card-media-fallback" aria-hidden="true">
                          <MessageSquare size={26} />
                        </div>
                      )}
                      {post.source === "facebook" && (
                        <span className="source-badge facebook">
                          <ExternalLink size={12} aria-hidden="true" />
                          Facebook
                        </span>
                      )}
                    </div>
                    <div className="community-card-body">
                      <span className="community-card-date">
                        <CalendarDays size={13} aria-hidden="true" />
                        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                      </span>
                      <h3>{post.title}</h3>
                      {post.excerpt ? <p className="community-card-excerpt">{post.excerpt}</p> : null}
                      <div className="community-card-actions">
                        <button
                          type="button"
                          className="btn btn-ghost community-btn-sm"
                          onClick={() => setOpenId(post.id)}
                        >
                          Read more
                        </button>
                        <button
                          type="button"
                          className={`community-like${liked[post.id] ? " liked" : ""}`}
                          onClick={() => handleLike(post)}
                          aria-pressed={Boolean(liked[post.id])}
                          aria-label={`Like ${post.title}`}
                        >
                          <Heart size={15} aria-hidden="true" />
                          <span>{likeCount(post).toLocaleString()}</span>
                        </button>
                        {post.facebookUrl && (
                          <a
                            href={post.facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="community-facebook-link"
                            aria-label={`View on Facebook: ${post.title}`}
                          >
                            <ExternalLink size={14} aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}

            <motion.div
              className="cta-band glass-card community-cta"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="hp-cta-glow" />
              <h2>Join the Conversation on Facebook</h2>
              <p>
                Follow Stratosphere Aeronautics for daily updates, live sessions, and community discussions.
              </p>
              <div className="hp-cta-actions">
                {FACEBOOK_LINKS.map((link) => (
                  <a
                    key={link.url}
                    className="hp-btn hp-btn-ghost"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={18} color="#f87171" />
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="community-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpenId(null)}
          >
            <motion.article
              className="community-modal glass-card"
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
                className="community-modal-close"
                onClick={() => setOpenId(null)}
                aria-label="Close post"
              >
                <ArrowLeft size={20} />
              </button>
              {active.imageUrl ? <img className="community-modal-media" src={active.imageUrl} alt="" /> : null}
              <div className="community-modal-body">
                <span className="community-card-date">
                  <CalendarDays size={13} aria-hidden="true" />
                  <time dateTime={active.publishedAt}>{formatDate(active.publishedAt)}</time>
                </span>
                {active.source === "facebook" && (
                  <span className="source-badge facebook">
                    <ExternalLink size={12} aria-hidden="true" />
                    Facebook
                  </span>
                )}
                <h2>{active.title}</h2>
                <div className="community-modal-content">
                  {String(active.content ?? "")
                    .split(/\n{2,}/)
                    .map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                </div>
                <div className="community-modal-actions">
                  <button
                    type="button"
                    className={`community-like${liked[active.id] ? " liked" : ""}`}
                    onClick={() => handleLike(active)}
                    aria-pressed={Boolean(liked[active.id])}
                    aria-label={`Like ${active.title}`}
                  >
                    <Heart size={16} aria-hidden="true" />
                    <span>{likeCount(active).toLocaleString()}</span>
                  </button>
                  {active.facebookUrl && (
                    <a
                      href={active.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <ExternalLink size={15} aria-hidden="true" />
                      View on Facebook
                    </a>
                  )}
                  <button
                    type="button"
                    className="btn btn-ghost community-btn-sm"
                    onClick={() => setOpenId(null)}
                  >
                    <ArrowLeft size={15} aria-hidden="true" />
                    Back to community
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