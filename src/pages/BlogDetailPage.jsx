import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Calendar, Share2, BookOpen, Twitter, Linkedin, Link2, CheckCheck } from 'lucide-react';
import { blogPosts } from '../data/blogData';

/* ─── SEO updater ───────────────────────────────────────────────────────── */
const updateSEO = ({ title, description, image }) => {
  document.title = title;

  const setMeta = (selector, attr, value) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      if (selector.includes('property')) el.setAttribute('property', selector.match(/\[property="(.+?)"\]/)?.[1]);
      else el.setAttribute('name', selector.match(/\[name="(.+?)"\]/)?.[1]);
      document.head.appendChild(el);
    }
    el[attr] = value;
  };

  setMeta('meta[name="description"]', 'content', description);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[property="og:image"]', 'content', image);
  setMeta('meta[property="og:type"]', 'content', 'article');
};

/* ─── Reading progress bar ──────────────────────────────────────────────── */
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', zIndex: 200, background: 'rgba(255,255,255,0.06)' }}>
      <motion.div
        style={{ height: '100%', background: 'linear-gradient(90deg,var(--primary),#04BE96)', transformOrigin: 'left' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1, ease: 'linear' }}
      />
    </div>
  );
};

/* ─── Share button ──────────────────────────────────────────────────────── */
const ShareBar = ({ post }) => {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Share</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`}
        target="_blank" rel="noreferrer"
        style={shareBtnStyle('#1da1f2')} title="Share on Twitter"
      >
        <Twitter size={15} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank" rel="noreferrer"
        style={shareBtnStyle('#0a66c2')} title="Share on LinkedIn"
      >
        <Linkedin size={15} />
      </a>
      <button onClick={copyLink} style={{ ...shareBtnStyle(copied ? '#16a34a' : '#64748b'), cursor: 'pointer' }} title="Copy link">
        {copied ? <CheckCheck size={15} /> : <Link2 size={15} />}
      </button>
    </div>
  );
};
const shareBtnStyle = (color) => ({
  width: '34px', height: '34px', borderRadius: '50%', border: `1.5px solid ${color}30`,
  background: `${color}12`, color, display: 'inline-flex', alignItems: 'center',
  justifyContent: 'center', textDecoration: 'none', transition: 'background 0.2s',
});

/* ─── Related card ──────────────────────────────────────────────────────── */
const RelatedCard = ({ post }) => (
  <Link
    to={`/blog/${post.id}`}
    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
  >
    <div className="related-card">
      <div style={{ overflow: 'hidden', height: '160px', borderRadius: '0.875rem 0.875rem 0 0' }}>
        <img src={post.cover} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }} className="related-img" loading="lazy" />
      </div>
      <div style={{ padding: '1.1rem 1.15rem 1.25rem' }}>
        <span style={{ background: post.categoryColor + '1a', color: post.categoryColor, border: `1px solid ${post.categoryColor}40`, borderRadius: '99px', padding: '0.18rem 0.65rem', fontSize: '0.72rem', fontWeight: 700, display: 'inline-block', marginBottom: '0.55rem' }}>
          {post.category}
        </span>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.35, color: '#1a1f2e', marginBottom: '0.5rem' }}>
          {post.title}
        </h3>
        <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
          Read <ArrowRight size={13} />
        </span>
      </div>
    </div>
  </Link>
);

/* ─── Body renderer ─────────────────────────────────────────────────────── */
const BodyRenderer = ({ body }) => (
  <div className="article-body">
    {body.map((block, i) => {
      if (block.type === 'paragraph') return <p key={i}>{block.text}</p>;
      if (block.type === 'heading') return <h2 key={i}>{block.text}</h2>;
      return null;
    })}
  </div>
);

/* ─── Main page ─────────────────────────────────────────────────────────── */
const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const articleRef = useRef(null);
  const post = blogPosts.find(p => p.id === id);

  const related = post
    ? [...blogPosts.filter(p => p.id !== post.id && p.category === post.category),
       ...blogPosts.filter(p => p.id !== post.id && p.category !== post.category)].slice(0, 3)
    : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (post) {
      updateSEO({
        title: `${post.title} | GrowthApex Blog`,
        description: post.excerpt,
        image: post.cover,
      });
    }
  }, [id, post]);

  if (!post) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '8rem', gap: '1rem' }}>
        <BookOpen size={48} style={{ color: '#cbd5e1' }} />
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: '#1a1f2e' }}>Article not found</h1>
        <Link to="/blog" style={{ color: 'var(--primary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(22, 78, 170,0.1)', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress />

      <style>{`
        /* ─ Detail page ─ */
        .article-cover-wrap { position: relative; height: clamp(340px, 50vh, 560px); overflow: hidden; }
        .article-cover-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .article-cover-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(9,9,15,1) 100%);
        }
        .article-cover-content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: clamp(1.5rem, 4vw, 3.25rem);
        }
        .article-cover-content-inner { max-width: 860px; margin: 0 auto; }
        .article-h1 {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3.5vw, 2.9rem);
          font-weight: 800; line-height: 1.2; color: #fff; letter-spacing: -0.5px;
          margin-top: 0.75rem;
        }
        .back-btn {
          display: inline-flex; align-items: center; gap: 0.45rem;
          background: rgba(255,255,255,0.15); backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.28); border-radius: 99px;
          padding: 0.5rem 1.1rem; color: #fff; font-weight: 600; font-size: 0.85rem;
          cursor: pointer; text-decoration: none; transition: background 0.2s;
          position: absolute; top: 6.5rem; left: clamp(1rem, 3vw, 3rem);
        }
        .back-btn:hover { background: rgba(255,255,255,0.25); border-color: var(--primary); }
        /* Layout */
        .detail-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 3.5rem;
          align-items: flex-start;
          padding: 3.5rem 0 6rem;
        }
        /* Author card */
        .author-card {
          display: flex; align-items: center; gap: 1rem;
          padding: 1.5rem 1.75rem;
          background: rgba(255,255,255,0.03); border-radius: 1.25rem;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          margin-bottom: 3rem;
        }
        .author-avatar {
          width: 50px; height: 50px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 1rem; color: #fff;
        }
        /* Article body */
        .article-body p {
          color: #94a3b8; font-size: 1.15rem; line-height: 1.85;
          margin-bottom: 1.8rem; font-family: var(--font-body);
        }
        .article-body h2 {
          font-family: var(--font-heading);
          font-size: 1.75rem; font-weight: 900; color: #f1f5f9;
          margin: 3.5rem 0 1.5rem;
          padding-left: 1.25rem;
          border-left: 5px solid var(--primary);
          line-height: 1.2;
        }
        .article-body h3 {
          font-family: var(--font-heading);
          font-size: 1.4rem; font-weight: 800; color: #f1f5f9;
          margin: 2.5rem 0 1rem;
        }
        /* Excerpt pull quote */
        .article-excerpt {
          font-size: 1.25rem; font-style: italic; line-height: 1.8;
          color: #94a3b8; border-left: 4px solid var(--primary);
          padding: 1.25rem 2rem; margin-bottom: 3.5rem;
          background: rgba(22, 78, 170,0.05); border-radius: 0 1rem 1rem 0;
          box-shadow: inset 0 0 40px rgba(0,0,0,0.2);
        }
        /* Share + divider */
        .article-divider { border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 3rem 0; }
        /* CTA box */
        .article-cta {
          background: linear-gradient(135deg, rgba(22, 78, 170,0.1) 0%, rgba(167,139,250,0.05) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 2rem;
          padding: 3rem;
          text-align: center;
          margin-top: 4rem;
        }
        .article-cta h2 {
          font-family: var(--font-heading); font-size: 1.75rem; font-weight: 900;
          color: #f1f5f9; margin-bottom: 1rem; border: none; padding: 0;
        }
        /* Sidebar */
        .sidebar { position: sticky; top: 110px; }
        .sidebar-card {
          background: rgba(255,255,255,0.03); border-radius: 1.5rem;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          padding: 1.75rem;
          margin-bottom: 2rem;
        }
        .sidebar-title { font-family: var(--font-heading); font-size: 0.82rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 1rem; }
        /* Related cards */
        .related-card {
          background: rgba(255,255,255,0.03); border-radius: 1.25rem; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
        }
        .related-card:hover { transform: translateY(-7px); box-shadow: 0 25px 50px rgba(0,0,0,0.5); border-color: rgba(22, 78, 170,0.3); }
        .related-card:hover .related-img { transform: scale(1.05); }
        /* Related grid */
        .related-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; margin-top: 1.5rem; }
        /* Meta pill */
        .cat-pill { display: inline-flex; align-items: center; padding: 0.22rem 0.7rem; border-radius: 99px; font-size: 0.75rem; font-weight: 700; }
        .meta-row { display: flex; align-items: center; gap: 0.9rem; flex-wrap: wrap; }
        .meta-item { display: flex; align-items: center; gap: 0.3rem; font-size: 0.82rem; color: rgba(255,255,255,0.75); font-weight: 500; }

        @media (max-width: 1024px) {
          .detail-layout { grid-template-columns: 1fr; }
          .sidebar { position: static; }
          .related-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 580px) {
          .related-grid { grid-template-columns: 1fr; }
          .article-cta { padding: 1.75rem 1.25rem; }
        }
      `}</style>

      {/* ── Cover ── */}
      <header className="article-cover-wrap">
        <img className="article-cover-img" src={post.cover} alt={post.title} />
        <div className="article-cover-overlay" />

        {/* Back button */}
        <Link to="/blog" className="back-btn">
          <ArrowLeft size={15} /> All Posts
        </Link>

        {/* Title overlay */}
        <div className="article-cover-content">
          <div className="article-cover-content-inner">
            <div className="meta-row" style={{ marginBottom: '0.9rem' }}>
              <span className="cat-pill" style={{ background: post.categoryColor + '33', color: '#fff', border: `1px solid rgba(255,255,255,0.3)` }}>
                {post.category}
              </span>
              <span className="meta-item"><Clock size={13} />{post.readTime}</span>
              <span className="meta-item"><Calendar size={13} />{post.date}</span>
            </div>
            <h1 className="article-h1">{post.title}</h1>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <main style={{ background: 'var(--bg-color)' }}>
        <div className="container">
          <div className="detail-layout">

            {/* ── Left: article ── */}
            <div>
              {/* Author */}
              <div className="author-card">
                <div className="author-avatar" style={{ background: post.authorGradient }}>
                  {post.authorInitials}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '1rem' }}>{post.author}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Published {post.date}</div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <ShareBar post={post} />
                </div>
              </div>

              {/* Pull quote */}
              <blockquote className="article-excerpt">{post.excerpt}</blockquote>

              {/* Article content */}
              <article ref={articleRef}>
                <BodyRenderer body={post.body} />
              </article>

              <hr className="article-divider" />

              {/* Bottom share row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <span className="cat-pill" style={{ background: post.categoryColor + '1a', color: post.categoryColor, border: `1px solid ${post.categoryColor}40`, fontSize: '0.82rem' }}>
                  {post.category}
                </span>
                <ShareBar post={post} />
              </div>

              {/* CTA */}
              <div className="article-cta">
                <h2>Ready to implement this for your business?</h2>
                <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '1.75rem', fontSize: '0.97rem' }}>
                  Book a free strategy call and get a custom growth plan tailored to your goals.
                </p>
                <Link
                  to="/#contact"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                    background: 'var(--primary)', color: '#fff',
                    borderRadius: '99px', padding: '0.9rem 2.1rem',
                    fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(22, 78, 170,0.28)',
                    transition: 'opacity 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  🚀 Book Free Strategy Call <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* ── Right: sidebar ── */}
            <aside className="sidebar" aria-label="Sidebar">

              {/* About */}
              <div className="sidebar-card">
                <div className="sidebar-title">About GrowthApex</div>
                <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '1rem' }}>
                  Performance marketing team specialising in Meta Ads, sales funnels, and automation for service businesses.
                </p>
                <Link
                  to="/#contact"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--primary)', color: '#fff', borderRadius: '0.75rem', padding: '0.75rem', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}
                >
                  Book a Free Call <ArrowRight size={14} />
                </Link>
              </div>

              {/* Article info */}
              <div className="sidebar-card">
                <div className="sidebar-title">Article Info</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { label: 'Category', value: post.category },
                    { label: 'Read Time', value: post.readTime },
                    { label: 'Published', value: post.date },
                    { label: 'Author', value: post.author },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span style={{ color: '#64748b', fontWeight: 600 }}>{label}</span>
                      <span style={{ color: '#f1f5f9', fontWeight: 700, textAlign: 'right', maxWidth: '60%' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="sidebar-card">
                <div className="sidebar-title">Share this Article</div>
                <ShareBar post={post} />
              </div>

            </aside>
          </div>

          {/* ── Related posts ── */}
          {related.length > 0 && (
            <section aria-label="Related articles" style={{ paddingBottom: '5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 900, color: '#f1f5f9' }}>
                  You Might Also Like
                </h2>
              </div>
              <div className="related-grid">
                {related.map(p => <RelatedCard key={p.id} post={p} />)}
              </div>
            </section>
          )}

        </div>
      </main>
    </>
  );
};

export default BlogDetailPage;
