import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar, TrendingUp, BookOpen, Search } from 'lucide-react';
import { blogPosts } from '../data/blogData';

/* ─── SEO head updater ──────────────────────────────────────────────────── */
const useSEO = ({ title, description }) => {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = description;
    let og = document.querySelector('meta[property="og:title"]');
    if (!og) { og = document.createElement('meta'); og.setAttribute('property', 'og:title'); document.head.appendChild(og); }
    og.content = title;
  }, [title, description]);
};

/* ─── Data ──────────────────────────────────────────────────────────────── */
const categories = ['All', 'Paid Ads', 'Funnels', 'Automation', 'Personal Brand', 'Brand Building'];

/* ─── Card hover link wrapper ───────────────────────────────────────────── */
const CardLink = ({ to, children, style = {}, className = '' }) => (
  <Link
    to={to}
    className={`blog-card-link ${className}`}
    style={{ textDecoration: 'none', color: 'inherit', display: 'block', ...style }}
  >
    {children}
  </Link>
);

/* ─── Featured hero card ────────────────────────────────────────────────── */
const FeaturedCard = ({ post }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    style={{ marginBottom: '3rem' }}
  >
    <CardLink to={`/blog/${post.id}`}>
      <div className="featured-card">
        {/* Image */}
        <div className="featured-img-wrap">
          <img src={post.cover} alt={post.title} className="featured-img" loading="lazy" />
          <div className="featured-img-overlay" />
          <span className="featured-badge">✦ Featured</span>
        </div>
        {/* Copy */}
        <div className="featured-copy">
          <div className="meta-row">
            <span className="cat-pill" style={{ background: post.categoryColor + '1a', color: post.categoryColor, border: `1px solid ${post.categoryColor}40` }}>
              {post.category}
            </span>
            <span className="meta-item"><Clock size={13} />{post.readTime}</span>
            <span className="meta-item"><Calendar size={13} />{post.date}</span>
          </div>
          <h2 className="featured-title">{post.title}</h2>
          <p className="featured-excerpt">{post.excerpt}</p>
          <div className="read-cta">
            Read Full Article <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </CardLink>
  </motion.article>
);

/* ─── Regular card ──────────────────────────────────────────────────────── */
const PostCard = ({ post, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 28 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="post-card"
  >
    <CardLink to={`/blog/${post.id}`} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="post-card-img-wrap">
        <img src={post.cover} alt={post.title} className="post-card-img" loading="lazy" />
        <span className="cat-pill post-cat-pill" style={{ background: post.categoryColor + '1a', color: post.categoryColor, border: `1px solid ${post.categoryColor}40` }}>
          {post.category}
        </span>
      </div>
      <div className="post-card-body">
        <div className="meta-row" style={{ marginBottom: '0.7rem' }}>
          <span className="meta-item"><Clock size={12} />{post.readTime}</span>
          <span className="meta-item"><Calendar size={12} />{post.date}</span>
        </div>
        <h3 className="post-card-title">{post.title}</h3>
        <p className="post-card-excerpt">{post.excerpt}</p>
        <div className="read-cta read-cta-sm" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
          Read More <ArrowRight size={14} />
        </div>
      </div>
    </CardLink>
  </motion.article>
);

/* ─── Page ──────────────────────────────────────────────────────────────── */
const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useSEO({
    title: 'Blog — Growth Insights & Marketing Playbooks | GrowthApex',
    description: 'Proven growth strategies, ad playbooks, funnel blueprints, and automation guides from the GrowthApex team. Real results, no fluff.',
  });

  const filtered = blogPosts
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase()));

  const [featured, ...rest] = filtered;

  return (
    <>
      <style>{`
        /* ── Blog page styles ─────────────────────── */
        .blog-page-hero {
          padding: 9rem 0 4rem;
          background: linear-gradient(160deg, #fff 0%, #fdf2f4 55%, #f5f3ff 100%);
          position: relative; overflow: hidden;
        }
        .blog-page-hero::before {
          content: '';
          position: absolute; top: -30%; right: -10%;
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(162,21,39,0.06) 0%, transparent 65%);
          border-radius: 50%; pointer-events: none;
        }
        .blog-hero-inner { text-align: center; max-width: 780px; margin: 0 auto; }
        .blog-hero-title {
          font-family: var(--font-heading);
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 800; line-height: 1.1; letter-spacing: -1.5px;
          color: #1a1f2e; margin-bottom: 1rem;
        }
        .blog-hero-title span {
          background: linear-gradient(135deg, var(--primary) 0%, #ff6b6b 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .blog-hero-sub { color: #64748b; font-size: 1.1rem; line-height: 1.7; margin-bottom: 2rem; }
        /* Stats strip */
        .blog-stats-strip {
          display: flex; gap: 2rem; justify-content: center;
          flex-wrap: wrap; margin-top: 2.5rem;
        }
        .blog-stat { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; font-weight: 600; color: #475569; }
        .blog-stat svg { color: var(--primary); }
        /* Search */
        .blog-search-wrap {
          position: relative; max-width: 480px; margin: 2rem auto 0;
        }
        .blog-search {
          width: 100%; padding: 0.875rem 1rem 0.875rem 3rem;
          border-radius: 99px;
          border: 1.5px solid rgba(0,0,0,0.1);
          background: #fff;
          font-size: 0.95rem;
          font-family: var(--font-body);
          color: #1e293b;
          outline: none;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .blog-search:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(162,21,39,0.1); }
        .blog-search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94a3b8; }
        /* Category chips */
        .cat-chips { display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center; margin-bottom: 3rem; }
        .cat-chip {
          padding: 0.5rem 1.2rem; border-radius: 99px; font-size: 0.82rem; font-weight: 700;
          cursor: pointer; border: 1.5px solid transparent; transition: all 0.22s ease; white-space: nowrap;
          font-family: var(--font-body);
        }
        /* Pills */
        .cat-pill {
          display: inline-flex; align-items: center;
          padding: 0.22rem 0.7rem; border-radius: 99px;
          font-size: 0.75rem; font-weight: 700; line-height: 1;
        }
        .meta-row { display: flex; align-items: center; gap: 0.9rem; flex-wrap: wrap; margin-bottom: 0.9rem; }
        .meta-item { display: flex; align-items: center; gap: 0.3rem; font-size: 0.8rem; color: #94a3b8; font-weight: 500; }
        /* Featured card */
        .featured-card {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          border-radius: 1.5rem; overflow: hidden;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 20px 60px rgba(0,0,0,0.07);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .featured-card:hover { transform: translateY(-5px); box-shadow: 0 30px 70px rgba(162,21,39,0.1); }
        .featured-img-wrap { position: relative; overflow: hidden; min-height: 340px; }
        .featured-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; display: block; }
        .featured-card:hover .featured-img { transform: scale(1.04); }
        .featured-img-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,0.12) 0%, transparent 100%); }
        .featured-badge {
          position: absolute; top: 1.25rem; left: 1.25rem;
          background: var(--primary); color: #fff;
          padding: 0.3rem 0.9rem; border-radius: 99px;
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.5px;
        }
        .featured-copy {
          padding: 2.75rem; display: flex; flex-direction: column; justify-content: center;
        }
        .featured-title {
          font-family: var(--font-heading);
          font-size: clamp(1.4rem, 2.2vw, 2rem);
          font-weight: 800; line-height: 1.25; color: #1a1f2e; margin-bottom: 1rem;
        }
        .featured-excerpt { color: #64748b; line-height: 1.75; font-size: 0.97rem; margin-bottom: 1.75rem; }
        .read-cta {
          display: inline-flex; align-items: center; gap: 0.5rem;
          color: var(--primary); font-weight: 700; font-size: 0.9rem;
          transition: gap 0.2s ease;
        }
        .read-cta:hover { gap: 0.75rem; }
        .read-cta-sm { font-size: 0.845rem; }
        /* Post cards grid */
        .posts-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }
        .post-card {
          background: #fff;
          border-radius: 1.25rem;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 6px 24px rgba(0,0,0,0.04);
          display: flex; flex-direction: column;
          transition: transform 0.28s ease, box-shadow 0.28s ease;
        }
        .post-card:hover { transform: translateY(-7px); box-shadow: 0 20px 48px rgba(162,21,39,0.09); }
        .post-card-img-wrap { position: relative; overflow: hidden; height: 200px; flex-shrink: 0; }
        .post-card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.45s ease; display: block; }
        .post-card:hover .post-card-img { transform: scale(1.05); }
        .post-cat-pill { position: absolute; top: 0.85rem; left: 0.85rem; }
        .post-card-body { padding: 1.4rem 1.5rem; display: flex; flex-direction: column; flex: 1; }
        .post-card-title {
          font-family: var(--font-heading); font-size: 1.05rem;
          font-weight: 700; line-height: 1.35; color: #1a1f2e; margin-bottom: 0.6rem;
        }
        .post-card-excerpt {
          color: #64748b; font-size: 0.87rem; line-height: 1.65;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
        }
        /* Empty state */
        .empty-state { text-align: center; padding: 5rem 0; color: #94a3b8; }
        .empty-state svg { margin: 0 auto 1rem; display: block; opacity: 0.4; }

        @media (max-width: 900px) {
          .featured-card { grid-template-columns: 1fr; }
          .featured-img-wrap { min-height: 240px; }
          .posts-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 580px) {
          .posts-grid { grid-template-columns: 1fr; }
          .featured-copy { padding: 1.75rem; }
        }
      `}</style>

      {/* ── Hero ── */}
      <div className="blog-page-hero">
        <div className="container">
          <motion.div
            className="blog-hero-inner"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="badge" style={{ marginBottom: '1.25rem', fontWeight: 700 }}>✦ THE GROWTHAPEX BLOG</div>
            <h1 className="blog-hero-title">
              Growth Playbooks &{' '}
              <span>Marketing Insights</span>
            </h1>
            <p className="blog-hero-sub">
              Real strategies from managing ₹9Cr+ in ad spend across 250+ campaigns.<br />
              No theory. No fluff. Only what actually works.
            </p>

            {/* Search */}
            <div className="blog-search-wrap">
              <Search size={17} className="blog-search-icon" />
              <input
                className="blog-search"
                type="search"
                placeholder="Search articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search blog articles"
              />
            </div>

            {/* Stats */}
            <div className="blog-stats-strip">
              <span className="blog-stat"><TrendingUp size={15} />{blogPosts.length} Articles</span>
              <span className="blog-stat"><BookOpen size={15} />₹9Cr+ Ad Spend Experience</span>
              <span className="blog-stat"><Clock size={15} />Updated Weekly</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main content ── */}
      <main style={{ padding: '4rem 0 7rem', background: '#f8fafc' }}>
        <div className="container">

          {/* Category filter */}
          <div className="cat-chips">
            {categories.map(cat => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  className="cat-chip"
                  onClick={() => { setActiveCategory(cat); setSearch(''); }}
                  style={{
                    background: active ? 'var(--primary)' : '#fff',
                    color: active ? '#fff' : '#475569',
                    borderColor: active ? 'var(--primary)' : 'rgba(0,0,0,0.1)',
                    boxShadow: active ? '0 4px 16px rgba(162,21,39,0.22)' : '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                  aria-pressed={active}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeCategory + search} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>

              {filtered.length === 0 ? (
                <div className="empty-state">
                  <BookOpen size={48} />
                  <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>No articles found. Try a different search.</p>
                </div>
              ) : (
                <>
                  {/* Featured */}
                  {featured && <FeaturedCard post={featured} />}

                  {/* Grid */}
                  {rest.length > 0 && (
                    <section aria-label="More articles">
                      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>
                        More Articles
                      </h2>
                      <div className="posts-grid">
                        {rest.map((post, i) => <PostCard key={post.id} post={post} index={i} />)}
                      </div>
                    </section>
                  )}
                </>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </>
  );
};

export default BlogPage;
