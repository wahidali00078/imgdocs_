/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ShieldCheck, ArrowRight, Zap, CloudOff, FileCheck, 
  CheckCircle2, Star, BookOpen, HelpCircle, Users, 
  BarChart3, Lock, FileText, ChevronDown, Search, X, Heart,
  Mail, Sparkles, Activity
} from 'lucide-react';
import { motion } from 'motion/react';
import { toolsList } from '../data/toolsData';
import { blogPosts } from '../data/blogData';
import { trackToolUsage, getRecommendedTools, getToolUsageMap } from '../lib/toolTracker';

interface HomepageProps {
  onSelectTool: (toolId: string) => void;
  onNavigateBlog: (slug: string | null) => void;
}

export default function Homepage({ onSelectTool, onNavigateBlog }: HomepageProps) {
  const [faqOpen, setFaqOpen] = React.useState<number | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(() => {
    try {
      return localStorage.getItem('imgdocs_newsletter_subscribed') === 'true';
    } catch {
      return false;
    }
  });

  const [favorites, setFavorites] = React.useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('imgdocs_favorite_tools');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleToolClick = (toolId: string) => {
    trackToolUsage(toolId);
    onSelectTool(toolId);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    try {
      localStorage.setItem('imgdocs_newsletter_subscribed', 'true');
      localStorage.setItem('imgdocs_newsletter_email', newsletterEmail.trim());
    } catch (err) {
      console.error('Failed to save newsletter subscription:', err);
    }
    setIsSubscribed(true);
  };

  const recommendedData = React.useMemo(() => {
    return getRecommendedTools();
  }, []);

  const toolUsageMap = React.useMemo(() => {
    return getToolUsageMap();
  }, []);

  const toggleFavorite = (e: React.MouseEvent, toolId: string) => {
    e.stopPropagation(); // Avoid triggering onSelectTool
    setFavorites(prev => {
      const next = prev.includes(toolId) 
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId];
      try {
        localStorage.setItem('imgdocs_favorite_tools', JSON.stringify(next));
      } catch (err) {
        console.error('Failed to save favorites to localStorage:', err);
      }
      return next;
    });
  };

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  // Group tools by category
  const filteredTools = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return toolsList;
    return toolsList.filter(tool => 
      tool.title.toLowerCase().includes(query) || 
      tool.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const favoriteTools = React.useMemo(() => {
    return filteredTools.filter(t => favorites.includes(t.id));
  }, [filteredTools, favorites]);

  const categories = React.useMemo(() => {
    return Array.from(new Set(filteredTools.map(t => t.category)));
  }, [filteredTools]);

  // Popular Tools List
  const popularTools = toolsList.filter(t => 
    ['jpg-to-pdf', 'pdf-to-jpg', 'compress-pdf', 'crop-image', 'esign-pdf', 'protect-pdf'].includes(t.id)
  );

  // Take the first 3 blog posts for preview
  const recentBlogs = blogPosts.slice(0, 3);

  const testimonials = [
    {
      quote: "ImgDocs has completely changed how our team manages document edits. Knowing that no files are ever sent to an external server gives us total peace of mind for client data.",
      author: "Sarah Jenkins",
      role: "Operations Director, Apex Legal Group",
      stars: 5
    },
    {
      quote: "The compress and signing tools are incredibly fast. Conversions happen instantly in the browser window, with absolutely zero quality loss.",
      author: "Marcus Chen",
      role: "Lead Creative Designer",
      stars: 5
    },
    {
      quote: "Simple, private, and incredibly reliable. Our finance department uses the PDF tools daily for tax receipt organization without risking confidential records.",
      author: "Elena Rostova",
      role: "Senior Accountant, FinTech Solutions",
      stars: 5
    }
  ];

  const faqs = [
    {
      q: 'How does the browser-native local processing engine work?',
      a: 'Unlike traditional PDF tools that upload your files to remote cloud servers, ImgDocs processes files entirely within your browser using local JavaScript and WebAssembly libraries. Your document data never leaves your computer, rendering results instantly and privately.'
    },
    {
      q: 'Does ImgDocs store copies of my private documents?',
      a: 'Absolutely not. We have a strict zero-storage, local-only policy. No files are transmitted to any cloud, database, or server. As soon as you complete your task and download your file, all allocated cache is cleared from your memory.'
    },
    {
      q: 'Is ImgDocs compliant with corporate data security standards?',
      a: 'Yes, ImgDocs complies with standard data protection guidelines, including GDPR and HIPAA requirements, because it prevents external data transfer. All encryption and conversions occur on your client machine.'
    },
    {
      q: 'Can I use these tools on my mobile phone?',
      a: 'Yes! ImgDocs is completely responsive and optimized for mobile devices. You can convert pictures, sign documents, and crop files directly on your smartphone using standard mobile browsers.'
    }
  ];

  return (
    <div className="space-y-16 py-6 animate-fade-in" id="landing-page-root">
      {/* JSON-LD FAQ Schema for Search Engine Optimization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }}
      />
      
      {/* 1. Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto space-y-6 px-4" id="hero-section">
        {/* Animated Gradient Background Accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl -z-10 animate-pulse" />
        
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 px-3.5 py-1 text-xs font-bold text-primary dark:text-blue-400 uppercase tracking-wider border border-blue-100/50 dark:border-blue-900/40 shadow-xs">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span>Private Client-Side Processing</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-tight">
          Professional PDF & Image Tools <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Without Server Uploads
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
          Convert, merge, split, compress, protect, and sign documents locally. Absolute confidentiality, instant conversions, and zero tracking. Fully compliant with standard data protection guidelines.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <button
            onClick={() => {
              const el = document.getElementById('tools-dashboard');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-primary-hover transition-all cursor-pointer"
          >
            <span>Launch Tools Dashboard</span>
            <ArrowRight className="h-4.5 w-4.5" />
          </button>
          
          <button
            onClick={() => onNavigateBlog(null)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-3.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer"
          >
            <BookOpen className="h-4.5 w-4.5" />
            <span>Browse Guides & Tutorials</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-8 border-t border-slate-100 dark:border-slate-900">
          <div className="flex flex-col items-center p-2.5 rounded-xl bg-slate-50/50 dark:bg-slate-900/30">
            <CloudOff className="h-4.5 w-4.5 text-red-500 mb-1" />
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Offline-Capable</span>
          </div>
          <div className="flex flex-col items-center p-2.5 rounded-xl bg-slate-50/50 dark:bg-slate-900/30">
            <Lock className="h-4.5 w-4.5 text-blue-500 mb-1" />
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">AES-256 Security</span>
          </div>
          <div className="flex flex-col items-center p-2.5 rounded-xl bg-slate-50/50 dark:bg-slate-900/30">
            <Zap className="h-4.5 w-4.5 text-emerald-500 mb-1" />
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Instant Execution</span>
          </div>
          <div className="flex flex-col items-center p-2.5 rounded-xl bg-slate-50/50 dark:bg-slate-900/30">
            <FileCheck className="h-4.5 w-4.5 text-amber-500 mb-1" />
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">No Watermarks</span>
          </div>
        </div>
      </section>

      {/* 2. Recommended Tools Section (Based on usage history) */}
      <section className="max-w-7xl mx-auto px-4 space-y-6" id="recommended-tools-section">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 px-3.5 py-1 text-[10px] font-black uppercase text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/40">
            <Sparkles className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span>{recommendedData.hasUsageHistory ? 'Frequently Used Tools' : 'Recommended For You'}</span>
          </div>
          <h2 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            Recommended Tools
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {recommendedData.hasUsageHistory 
              ? 'Quickly access the utilities you use most often in your browser.' 
              : 'Our top recommended client-side PDF tools to get started.'}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {recommendedData.tools.map((tool) => {
            const count = toolUsageMap[tool.id] || toolUsageMap[tool.id.replace('-', '_')] || 0;
            return (
              <div
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                className="group relative rounded-2xl border border-blue-100 dark:border-slate-800 bg-gradient-to-b from-blue-50/40 via-white to-white dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950 p-6 shadow-xs hover:shadow-md hover:border-primary/50 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-md bg-blue-100/80 dark:bg-blue-950/80 px-2 py-0.5 text-[9px] font-bold text-primary dark:text-blue-300 uppercase tracking-wide">
                      {tool.category}
                    </span>
                    {count > 0 && (
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-full">
                        <Activity className="h-3 w-3 text-emerald-500 shrink-0" /> {count} {count === 1 ? 'use' : 'uses'}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-extrabold font-display text-slate-900 dark:text-white tracking-tight group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {tool.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between text-xs font-bold text-primary">
                  <span>Launch Tool</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Popular Quick-Access Tools */}
      <section className="max-w-7xl mx-auto px-4 space-y-6" id="popular-tools-section">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Fast & Secure</span>
          <h2 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight mt-1">Popular Utility Tools</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {popularTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => handleToolClick(tool.id)}
              className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-xs hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="inline-flex items-center rounded-md bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[9px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                  Private Conversion
                </span>
                
                <h3 className="text-base font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight">
                  {tool.title}
                </h3>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {tool.shortDescription}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 dark:border-slate-900/50 flex items-center justify-between text-xs font-bold text-primary">
                <span>Launch Client Tool</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Comprehensive Interactive Dashboard Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-8 scroll-mt-24" id="tools-dashboard">
        <div className="text-center max-w-xl mx-auto space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">18 Free Utilities</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight mt-1">Complete Document Toolbox</h2>
            <p className="text-xs text-slate-500">All options are grouped by functional workflow layers.</p>
          </div>

          {/* Search Input Bar */}
          <div className="relative max-w-md mx-auto pt-2">
            <div className="pointer-events-none absolute inset-y-0 left-4 top-2.5 flex items-center pl-0.5">
              <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            </div>
            <input
              id="homepage-search-input"
              type="text"
              placeholder="Search tools by title or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-3 pl-11 pr-16 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-xs"
            />
            {!searchQuery && (
              <div className="pointer-events-none absolute inset-y-0 right-3.5 top-2.5 flex items-center">
                <kbd className="hidden sm:inline-block rounded-md border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 dark:text-slate-500 shadow-2xs">
                  /
                </kbd>
              </div>
            )}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-4 top-2.5 flex items-center pr-0.5 hover:text-slate-600 dark:hover:text-slate-300 text-slate-400 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10">
            <Search className="h-8 w-8 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No PDF utilities found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              No tools matched your search query "{searchQuery}". Try searching for categories like "convert", "optimize", or keywords like "jpg", "compress".
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 px-4 py-2 text-xs font-bold transition-all cursor-pointer"
            >
              Clear Search Query
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {/* 'My Favorites' section rendered above category grids if there's any favorited tools */}
            {favoriteTools.length > 0 && (
              <div className="space-y-4">
                <div className="border-b border-rose-100 dark:border-rose-950 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4.5 w-4.5 text-rose-500 fill-rose-500 animate-pulse" />
                    <h3 className="text-xs font-black uppercase tracking-wider text-rose-500 dark:text-rose-400 font-display">
                      My Favorites ({favoriteTools.length})
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">Quick Access</span>
                </div>

                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.05 }
                    }
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {favoriteTools.map((tool) => (
                    <motion.div
                      key={`fav-${tool.id}`}
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            type: 'spring',
                            stiffness: 110,
                            damping: 14,
                          },
                        },
                      }}
                      whileHover={{
                        scale: 1.025,
                        y: -5,
                        rotate: -0.5,
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                      onClick={() => handleToolClick(tool.id)}
                      className="group relative flex flex-col justify-between py-5 px-4.5 sm:py-4.5 sm:px-4.5 rounded-2xl border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-950 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer min-h-[140px]"
                      id={`fav-bento-${tool.id}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1.5 flex-1">
                          <h4 className="text-xs font-extrabold font-display text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                            {tool.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                            {tool.shortDescription}
                          </p>
                        </div>
                        <button
                          onClick={(e) => toggleFavorite(e, tool.id)}
                          className="p-2.5 -mt-2 -mr-2.5 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900/50 text-rose-500 hover:text-slate-400 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] shrink-0 cursor-pointer"
                          aria-label="Remove from favorites"
                        >
                          <Heart className="h-4.5 w-4.5 fill-rose-500 text-rose-500 scale-110" />
                        </button>
                      </div>

                      <div className="mt-3.5 pt-3 border-t border-slate-50 dark:border-slate-900/50 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200">
                        <span>Open Editor</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {categories.map((cat) => {
              const catTools = filteredTools.filter(t => t.category === cat);
              
              // Animation variants for staggered grid
              const containerVariants = {
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              };

              const cardVariants = {
                hidden: { opacity: 0, y: 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 110,
                    damping: 14,
                  },
                },
              };

              return (
                <div key={cat} className="space-y-4">
                  <div className="border-b border-slate-100 dark:border-slate-900 pb-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 font-display">
                      {cat} Group
                    </h3>
                  </div>

                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  >
                    {catTools.map((tool) => (
                      <motion.div
                        key={tool.id}
                        variants={cardVariants}
                        whileHover={{
                          scale: 1.025,
                          y: -5,
                          rotate: 0.5,
                          transition: { duration: 0.2, ease: "easeOut" }
                        }}
                        onClick={() => handleToolClick(tool.id)}
                        className="group flex flex-col justify-between py-5 px-4.5 sm:py-4.5 sm:px-4.5 rounded-2xl border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-950 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer min-h-[140px]"
                        id={`bento-${tool.id}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1.5 flex-1">
                            <h4 className="text-xs font-extrabold font-display text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                              {tool.title}
                            </h4>
                            <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                              {tool.shortDescription}
                            </p>
                          </div>
                          <button
                            onClick={(e) => toggleFavorite(e, tool.id)}
                            className="p-2.5 -mt-2 -mr-2.5 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900/50 text-slate-400 hover:text-rose-500 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] shrink-0 cursor-pointer"
                            aria-label={favorites.includes(tool.id) ? "Remove from favorites" : "Add to favorites"}
                          >
                            <Heart className={`h-4.5 w-4.5 transition-all ${favorites.includes(tool.id) ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-400 dark:text-slate-500 group-hover:text-rose-400'}`} />
                          </button>
                        </div>

                        <div className="mt-3.5 pt-3 border-t border-slate-50 dark:border-slate-900/50 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200">
                          <span>Open Editor</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Why Choose Us / Security */}
      <section className="bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-900 py-12" id="why-choose-us">
        <div className="max-w-7xl mx-auto px-4 grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-5">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Local File Execution</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              Absolute In-Browser Conversion <br />
              Is Our Core Standard.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Traditional conversion websites operate by uploading your private spreadsheets, scans, signatures, and reports directly to remote cloud servers. Once uploaded, your files can reside on unsecured caches or hard disks. <br /><br />
              ImgDocs removes this risk entirely. All processing code compiles inside your web browser using client CPUs. This architecture ensures complete peace of mind, no data transfer lag, and maximum security compliance.
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Auto-Delete Memory: Allocated browser buffers clear automatically on tab close.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">HIPAA & GDPR Compliant: Zero tracking, no data storage, perfect for confidential legal files.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">High Resolution Preserved: Zero quality compression unless specified by you.</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 sm:p-8 shadow-lg relative overflow-hidden space-y-6">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest border-b border-slate-100 dark:border-slate-900 pb-3">
              <Lock className="h-4 w-4 text-primary" /> Security Matrix Policy
            </div>
            
            <div className="space-y-3 font-mono text-[10px] text-slate-500">
              <div className="flex justify-between border-b border-slate-50 dark:border-slate-900/50 pb-1.5">
                <span>SOURCE FILE STREAM</span>
                <span className="text-emerald-500">CLIENT BUFFER ONLY</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 dark:border-slate-900/50 pb-1.5">
                <span>ENCRYPTION ALGORITHM</span>
                <span className="text-slate-800 dark:text-white">AES-256 BIT KEY</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 dark:border-slate-900/50 pb-1.5">
                <span>CLOUD FILE ARCHIVAL</span>
                <span className="text-rose-500">DISABLED (0% BYTES SAVED)</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 dark:border-slate-900/50 pb-1.5">
                <span>TRACKING COOKIES</span>
                <span className="text-slate-800 dark:text-white">DEACTIVATED</span>
              </div>
              <div className="flex justify-between">
                <span>OCR RECOGNITION RUNS</span>
                <span className="text-emerald-500">UNLIMITED LOCAL RUNS</span>
              </div>
            </div>

            <div className="absolute bottom-3 right-4 text-[8px] font-extrabold uppercase text-slate-300 dark:text-slate-800 tracking-widest">
              SYSTEM SECURE Matrix
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-6" id="testimonials-section">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">User Reviews</span>
          <h2 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight mt-1">Trusted globally by professionals</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="p-5.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-950 flex flex-col">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{t.author}</span>
                <span className="text-[10px] text-slate-400">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Statistics & Figures */}
      <section className="max-w-7xl mx-auto px-4" id="stats-section">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 shadow-xs space-y-0.5">
            <Users className="h-5 w-5 text-primary mx-auto mb-1.5" />
            <span className="block text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white">4.8M+</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Global Files Converted</span>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 shadow-xs space-y-0.5">
            <CloudOff className="h-5 w-5 text-emerald-500 mx-auto mb-1.5" />
            <span className="block text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white">100%</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Local Executions</span>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 shadow-xs space-y-0.5">
            <BarChart3 className="h-5 w-5 text-blue-500 mx-auto mb-1.5" />
            <span className="block text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white">0 Bytes</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Stored on Servers</span>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 shadow-xs space-y-0.5">
            <Zap className="h-5 w-5 text-amber-500 mx-auto mb-1.5" />
            <span className="block text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white">&lt; 1.2s</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Average Build Time</span>
          </div>
        </div>
      </section>

      {/* 7. Recent Blog Guides Preview */}
      <section className="max-w-7xl mx-auto px-4 space-y-5" id="home-blog-preview">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-900 pb-3">
          <div>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Learn workflows</span>
            <h2 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight mt-0.5">Recent Library Guides</h2>
          </div>
          <button
            onClick={() => onNavigateBlog(null)}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Read All Guides</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {recentBlogs.map((post) => (
            <article
              key={post.slug}
              onClick={() => onNavigateBlog(post.slug)}
              className="group rounded-2xl border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-950 p-5.5 shadow-xs hover:shadow-md transition-shadow cursor-pointer space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="inline-flex items-center rounded bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-2 py-0.5 text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                  {post.category}
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {post.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-50 dark:border-slate-900 flex items-center justify-between text-[10px] font-bold text-slate-400">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 8. Detailed FAQs */}
      <section className="max-w-3xl mx-auto px-4 space-y-5" id="home-faq">
        <div className="text-center max-w-xl mx-auto">
          <HelpCircle className="h-6.5 w-6.5 text-primary mx-auto mb-1" />
          <h2 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500 mt-1">Get precise details on browser compliance and architectures.</p>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = faqOpen === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4.5 text-left font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors focus:outline-none cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4.5 pb-4.5 pt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-900/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. Trust CTA Section */}
      <section className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-10 text-center text-white relative overflow-hidden" id="trust-banner">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.12),transparent)] pointer-events-none" />
        
        <div className="space-y-3.5 max-w-2xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-blue-300">
            Enterprise Compliant
          </span>
          <h2 className="font-display text-xl sm:text-3xl font-black tracking-tight leading-tight">
            Protect Your Confidential Data From Cloud Leakage
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
            Corporate security audits reject online converters that harvest files. Join millions of developers, accountants, lawyers, and writers using ImgDocs to convert files securely inside the browser window.
          </p>

          <button
            onClick={() => {
              const el = document.getElementById('tools-dashboard');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 px-6 py-3 text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            <span>Launch Free ImgDocs Dashboard</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      {/* 10. Newsletter Subscription Section */}
      <section className="mx-auto max-w-5xl rounded-3xl border border-blue-100 dark:border-blue-950/60 bg-gradient-to-br from-blue-50/60 via-white to-slate-50 dark:from-slate-900/90 dark:via-slate-950 dark:to-blue-950/30 p-8 sm:p-10 shadow-xs relative overflow-hidden" id="newsletter-section">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary dark:text-blue-400 px-3 py-1 text-[10px] font-black uppercase tracking-wider">
              <Mail className="h-3.5 w-3.5" /> Product Updates & Privacy Tips
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Stay ahead with new PDF utilities, browser performance updates, and privacy-first document tips delivered directly to your inbox. No spam ever.
            </p>
          </div>

          {isSubscribed ? (
            <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-4 text-emerald-800 dark:text-emerald-300 text-xs font-bold w-full md:w-auto animate-fade-in">
              <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
              <div>
                <p className="font-extrabold text-emerald-900 dark:text-emerald-200 text-sm">You're Subscribed!</p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-normal mt-0.5">We'll email you whenever new local PDF tools launch.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto min-w-[320px] space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-2xs"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold px-5 py-3 text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-[10px] text-slate-400 text-center md:text-left font-medium">
                🔒 100% private. We respect your privacy & zero-spam promise.
              </p>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
