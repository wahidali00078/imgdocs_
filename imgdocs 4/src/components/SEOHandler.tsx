/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { toolsList } from '../data/toolsData';
import { blogPosts } from '../data/blogData';

interface SEOHandlerProps {
  activeTab: string;
  activeBlogSlug: string | null;
}

export default function SEOHandler({ activeTab, activeBlogSlug }: SEOHandlerProps) {
  useEffect(() => {
    const siteUrl = 'https://www.imgdocs.me';
    let title = 'ImgDocs | Secure Client-Side PDF Tools & Free Converter';
    let description = 'Optimize, compress, convert, merge, split, rotate, and eSign PDF files 100% locally in your browser memory. No server uploads, absolute file privacy and security.';
    let canonical = siteUrl;
    let keywords = 'PDF converter, local PDF tools, secure PDF editor, client-side PDF, convert PDF to JPG, compress PDF, browser OCR, eSign PDF, split PDF, merge PDF';
    let schemas: any[] = [];

    // Base organization and Website schemas (always present)
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      'name': 'ImgDocs Technologies',
      'url': siteUrl,
      'logo': `${siteUrl}/logo.png`,
      'sameAs': [
        'https://twitter.com/imgdocs',
        'https://github.com/imgdocs'
      ]
    };

    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      'name': 'ImgDocs',
      'url': siteUrl,
      'potentialAction': {
        '@type': 'SearchAction',
        'target': `${siteUrl}/?search={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };

    schemas.push(orgSchema, websiteSchema);

    // Normalize specific tabs/tools
    if (activeTab === 'home') {
      title = 'ImgDocs | Secure Client-Side PDF Converter & Document Suite';
      description = 'Free high-quality PDF tools running entirely in your browser session. Compress, merge, split, and convert files safely without cloud uploads.';
      canonical = siteUrl;
      keywords = 'PDF converter, local PDF tools, secure PDF editor, client-side PDF, convert PDF to JPG, compress PDF, browser OCR, eSign PDF, split PDF, merge PDF, offline pdf converter';
    } else if (activeTab === 'blog') {
      title = 'ImgDocs Blog | Expert PDF & Document Productivity Tutorials';
      description = 'Read our comprehensive guides, safety instructions, and expert tips on document compression, encryption standards, and digital workflows.';
      canonical = `${siteUrl}/?page=blog`;
      keywords = 'pdf tutorials, secure document workflow, compression guides, local pdf encryption, how to convert pdf, docx editing safety';
      
      // Add Breadcrumb
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': siteUrl },
          { '@type': 'ListItem', 'position': 2, 'name': 'Blog Library', 'item': `${siteUrl}/?page=blog` }
        ]
      });
    } else if (activeTab === 'blog-post' && activeBlogSlug) {
      const post = blogPosts.find(p => p.slug === activeBlogSlug);
      if (post) {
        title = `${post.title} | ImgDocs Library`;
        description = post.summary;
        canonical = `${siteUrl}/?blog=${post.slug}`;
        keywords = `pdf guide, ${post.title.toLowerCase()}, secure file processing, document productivity tutorial`;

        // Blog Posting Schema
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          'headline': post.title,
          'description': post.summary,
          'datePublished': post.date,
          'author': {
            '@type': 'Organization',
            'name': 'ImgDocs Editorial Team',
            'url': siteUrl
          },
          'publisher': orgSchema,
          'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': canonical
          }
        });

        // Breadcrumb
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': siteUrl },
            { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': `${siteUrl}/?page=blog` },
            { '@type': 'ListItem', 'position': 3, 'name': post.title, 'item': canonical }
          ]
        });
      }
    } else if (activeTab === 'pricing') {
      title = 'Premium Subscription Pricing Plans | ImgDocs Pro & Business';
      description = 'Secure browser-native PDF tools. Choose ImgDocs Pro or Business to unlock unlimited document editing, high-fidelity OCR, and advanced collaborative features starting at just ₹249/mo.';
      canonical = `${siteUrl}/?page=pricing`;
      keywords = 'imgdocs subscription, pdf suite pricing, document tools price, enterprise docx tools cost, team doc workspace, pro features';

      // Product Pricing Schema
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': 'ImgDocs Premium Subscription',
        'description': 'Advanced secure document productivity suite with client-side conversions and smart team tools.',
        'brand': {
          '@type': 'Brand',
          'name': 'ImgDocs'
        },
        'offers': {
          '@type': 'AggregateOffer',
          'priceCurrency': 'INR',
          'lowPrice': '299',
          'highPrice': '7990',
          'offerCount': '4',
          'offers': [
            {
              '@type': 'Offer',
              'name': 'Pro Monthly',
              'price': '299',
              'priceCurrency': 'INR',
              'url': `${siteUrl}/?page=pricing`
            },
            {
              '@type': 'Offer',
              'name': 'Pro Yearly',
              'price': '2499',
              'priceCurrency': 'INR',
              'url': `${siteUrl}/?page=pricing`
            }
          ]
        }
      });

      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': siteUrl },
          { '@type': 'ListItem', 'position': 2, 'name': 'Pricing Plans', 'item': canonical }
        ]
      });
    } else if (['about', 'contact', 'feature-requests', 'help', 'releases', 'api', 'careers'].includes(activeTab)) {
      const displayNames: Record<string, string> = {
        'about': 'About Us',
        'contact': 'Contact Us',
        'feature-requests': 'Feature Requests Board',
        'help': 'Help Center',
        'releases': 'Release Notes',
        'api': 'API Documentation',
        'careers': 'Careers & Opportunities'
      };
      const displayName = displayNames[activeTab] || 'Info Page';
      title = `${displayName} | ImgDocs Free PDF Suite`;
      description = `Learn more about our ${displayName.toLowerCase()} policies. ImgDocs provides browser-native tools to keep document conversions safe and instant.`;
      canonical = `${siteUrl}/?page=${activeTab}`;
      keywords = `imgdocs ${displayName.toLowerCase()}, pdf support, free document suite help, contact imgdocs`;

      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': siteUrl },
          { '@type': 'ListItem', 'position': 2, 'name': displayName, 'item': canonical }
        ]
      });
    } else if (['privacy', 'terms', 'cookie', 'disclaimer', 'dmca'].includes(activeTab)) {
      const displayNames: Record<string, string> = {
        'privacy': 'Privacy Policy',
        'terms': 'Terms of Service',
        'cookie': 'Cookie Policy',
        'disclaimer': 'Legal Disclaimer',
        'dmca': 'DMCA Take-Down Compliance'
      };
      const displayName = displayNames[activeTab] || 'Legal Compliance';
      title = `${displayName} | ImgDocs Compliance Hub`;
      description = `Review the official ImgDocs ${displayName.toLowerCase()}. We process files entirely in your browser session, storing zero user data on remote systems.`;
      canonical = `${siteUrl}/?page=${activeTab}`;
      keywords = `imgdocs ${displayName.toLowerCase()}, gdpr compliance, local file privacy, zero server storage, dmca safe harbor`;

      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': siteUrl },
          { '@type': 'ListItem', 'position': 2, 'name': displayName, 'item': canonical }
        ]
      });
    } else {
      // It is a specific PDF tool
      const normalizedTab = activeTab.replace('_', '-');
      const tool = toolsList.find(t => t.id === activeTab || t.id === normalizedTab);
      if (tool) {
        const toolSeoData: Record<string, { title: string; description: string; keywords: string }> = {
          'jpg-to-pdf': {
            title: 'Convert JPG to PDF Online - 100% Secure & Free Image Converter | ImgDocs',
            description: 'Convert JPG, JPEG, and PNG images into professionally structured PDF files instantly in your browser. Zero server uploads, absolute privacy, and custom page formatting.',
            keywords: 'convert jpg to pdf, jpeg to pdf, png to pdf, convert image to pdf online, secure pdf converter, local image compilation, web assembly image converter'
          },
          'pdf-to-jpg': {
            title: 'PDF to JPG Extractor - Convert PDF Pages to Images Offline | ImgDocs',
            description: 'Decompile PDF documents and extract every single page into separate high-resolution JPG images with zero upload lag. 100% client-side rasterization via PDF.js.',
            keywords: 'pdf to jpg extractor, convert pdf to jpg, extract pdf pages as images, pdf to jpeg converter, secure local pdf rendering, canvas rasterization'
          },
          'compress-pdf': {
            title: 'Compress PDF Online - Reduce PDF File Size Without Quality Loss | ImgDocs',
            description: 'Compress PDF and image file sizes by optimizing quality, dimensions, and compression ratios locally. Instant size previews and visual comparison of optimized assets.',
            keywords: 'compress pdf, reduce pdf size, optimize pdf, compress image size, pdf compressor online, secure local document optimizer, dynamic bitrate compression'
          },
          'pdf-to-word': {
            title: 'PDF to Word Converter - Transform PDFs into Editable DOCX | ImgDocs',
            description: 'Convert PDF documents into editable Word files (.docx) with structured layouts, paragraphs, and tables preserved. Fully offline, private browser conversion.',
            keywords: 'pdf to word converter, convert pdf to docx, editable word document, pdf text extractor, secure word conversion, local layout mapping'
          },
          'word-to-pdf': {
            title: 'Word to PDF Converter - Secure DOCX to PDF Online | ImgDocs',
            description: 'Convert MS Word documents (.docx, .doc) into high-fidelity PDF files with consistent formatting across all platforms. Private computation and compliance.',
            keywords: 'word to pdf converter, convert docx to pdf, word doc to pdf online, locked formatting pdf, secure local docx compilation, pdfa compliance'
          },
          'merge-pdf': {
            title: 'Merge PDF Files - Combine Multiple PDFs Online | ImgDocs',
            description: 'Combine multiple PDF documents into a single, organized PDF file with custom page ordering. Visual drag-and-drop arranger running purely in local memory.',
            keywords: 'merge pdf, combine pdf files, join pdf pages, pdf merger tool, organize pdf pages, client-side pdf joiner, local stream concatenation'
          },
          'split-pdf': {
            title: 'Split PDF Online - Extract Pages & Ranges Customly | ImgDocs',
            description: 'Divide a multi-page PDF into separate documents or extract specific page ranges easily. Visual page selector and secure offline split processing.',
            keywords: 'split pdf, extract pdf pages, split multi-page pdf, pdf splitter tool, custom pdf page ranges, secure page extraction, zip download splitting'
          },
          'protect-pdf': {
            title: 'Protect PDF - Encrypt PDF with AES-256 Password Online | ImgDocs',
            description: 'Encrypt your PDF documents with a strong password using industrial AES-256 standards directly on your device. Set custom print and edit permissions safely.',
            keywords: 'protect pdf with password, encrypt pdf, secure pdf, aes-256 pdf encryption, restrict pdf printing, password lock pdf, secure key derivation'
          },
          'unlock-pdf': {
            title: 'Unlock PDF - Remove Password & Printing Restrictions | ImgDocs',
            description: 'Remove password protection and decryption locks from PDF files to make them easily shareable. Restore full printing, copying, and text editing controls locally.',
            keywords: 'unlock pdf, decrypt pdf, remove pdf password, unlock printing permissions, owner password bypass, local pdf decrypt'
          },
          'rotate-pdf': {
            title: 'Rotate PDF Pages Online - Permanently Align Upside Down Pages | ImgDocs',
            description: 'Permanently rotate PDF pages that were scanned upside down or sideways. Interactive angle adjusters with instant clockwise/counter-clockwise saves.',
            keywords: 'rotate pdf pages, align scanned pdf, flip pdf pages, permanent pdf rotation, rotate upside down pages, local coordinate orientation'
          },
          'organize-pdf': {
            title: 'Organize PDF Pages - Drag, Reorder & Delete PDF Sheets | ImgDocs',
            description: 'Rearrange pages, delete unwanted sheets, or insert blank sections in your PDF documents visually. Drag-and-drop storyboard layout running purely in browser memory.',
            keywords: 'organize pdf pages, rearrange pdf sheets, delete pdf pages, insert blank page pdf, pdf storyboard reorder, local document shuffle'
          },
          'add-watermark': {
            title: 'Add Watermark to PDF - Stamp Text or Images on PDF Pages | ImgDocs',
            description: 'Stamp a secure text or image watermark over your PDF pages to assert ownership and prevent plagiarism. Customize transparency, position, and angle.',
            keywords: 'add watermark to pdf, stamp pdf pages, confidential stamp, pdf opacity transparency, vector image watermark, copyright overlay protection'
          },
          'remove-pages': {
            title: 'Remove Pages from PDF - Delete Sheets Instantly | ImgDocs',
            description: 'Quickly delete unwanted pages from your PDF file and save a clean, compact version. Fast page-level stream pruning with visual previews.',
            keywords: 'remove pages from pdf, delete pdf sheets, prune pdf, select pages to erase, pdf file size reduction, catalog stream cleaning'
          },
          'ocr-pdf': {
            title: 'OCR PDF Text Extractor - Convert Scans to Editable Text | ImgDocs',
            description: 'Extract text from scanned PDFs or images using advanced optical character recognition (OCR) directly in your browser. Complete document privacy.',
            keywords: 'ocr pdf text extractor, optical character recognition pdf, extract text from scanned pdf, browser-native ocr, image to text converter, tesseract local ocr'
          },
          'html-to-pdf': {
            title: 'HTML to PDF Converter - Save Webpages & Code Snippets | ImgDocs',
            description: 'Convert web pages, HTML snippets, or raw source code into formatted PDF documents. Captured cleanly with active links, styling, and offline sandbox protection.',
            keywords: 'html to pdf converter, convert url to pdf, save web page as pdf, html styling to print, code snapshot pdf, local print engine'
          },
          'excel-to-pdf': {
            title: 'Excel to PDF Converter - Fit Spreadsheet Grids on PDF Pages | ImgDocs',
            description: 'Convert Excel spreadsheets (.xlsx, .xls) into crisp, perfectly aligned PDF reports. Automatically fits wide columns and locks spreadsheet formulas.',
            keywords: 'excel to pdf converter, convert xlsx to pdf, spreadsheet to pdf, fit excel columns to page, secure financial ledger converter, gridline drawing'
          },
          'powerpoint-to-pdf': {
            title: 'PowerPoint to PDF Converter - Convert Slides to PPT Presentation | ImgDocs',
            description: 'Convert PowerPoint slide decks (.pptx, .ppt) into standard PDF presentations. Retains full vector shapes, fonts, slide sizes, and hyperlink structures.',
            keywords: 'powerpoint to pdf converter, convert pptx to pdf, slides presentation to pdf, lock slide formatting, secure roadmap sharing, vector shape layout'
          },
          'esign-pdf': {
            title: 'eSign PDF Online - Draw or Type Cursive Signatures Securely | ImgDocs',
            description: 'Draw, type, or upload your signature to sign contracts and documents online. Signatures are flattened into secure PDF layers locally on your device.',
            keywords: 'esign pdf document, sign contracts online, digital signature pdf, sign agreement, draw cursive signature pad, paperless workflow consent'
          }
        };

        const seo = toolSeoData[tool.id];
        if (seo) {
          title = seo.title;
          description = seo.description;
          keywords = seo.keywords;
        } else {
          title = `${tool.title} | Free Client-Side Tool | ImgDocs`;
          description = tool.shortDescription;
          keywords = `${tool.title.toLowerCase()}, client side pdf, secure pdf tool, free pdf converter`;
        }
        canonical = `${siteUrl}/?tool=${tool.id}`;

        // SoftwareApplication Schema
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          'name': tool.title,
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'Web, Windows, macOS, Android, iOS',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          },
          'description': tool.shortDescription,
          'browserRequirements': 'Requires HTML5, WebAssembly and modern browser support.'
        });

        // FAQ Schema from tool.faqs
        if (tool.faqs && tool.faqs.length > 0) {
          schemas.push({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': tool.faqs.map(faq => ({
              '@type': 'Question',
              'name': faq.q,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.a
              }
            }))
          });
        }

        // Breadcrumb
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': siteUrl },
            { '@type': 'ListItem', 'position': 2, 'name': tool.title, 'item': canonical }
          ]
        });
      }
    }

    // Apply basic meta tags to the HTML head
    document.title = title;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    // Meta Robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'index, follow');

    // Meta Author
    let metaAuthor = document.querySelector('meta[name="author"]');
    if (!metaAuthor) {
      metaAuthor = document.createElement('meta');
      metaAuthor.setAttribute('name', 'author');
      document.head.appendChild(metaAuthor);
    }
    metaAuthor.setAttribute('content', 'ImgDocs Technologies');

    // Meta Theme Color
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.setAttribute('name', 'theme-color');
      document.head.appendChild(metaTheme);
    }
    metaTheme.setAttribute('content', '#ef4444');

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    // Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // Open Graph Image
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', `${siteUrl}/og-image.png`);

    // Open Graph URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', canonical);

    // Open Graph Type
    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      document.head.appendChild(ogType);
    }
    ogType.setAttribute('content', activeTab === 'blog-post' ? 'article' : 'website');

    // Open Graph Site Name
    let ogSiteName = document.querySelector('meta[property="og:site_name"]');
    if (!ogSiteName) {
      ogSiteName = document.createElement('meta');
      ogSiteName.setAttribute('property', 'og:site_name');
      document.head.appendChild(ogSiteName);
    }
    ogSiteName.setAttribute('content', 'ImgDocs');

    // Twitter Card
    let twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
      twitterCard = document.createElement('meta');
      twitterCard.setAttribute('name', 'twitter:card');
      document.head.appendChild(twitterCard);
    }
    twitterCard.setAttribute('content', 'summary_large_image');

    // Twitter Title
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', title);

    // Twitter Description
    let twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDesc) {
      twitterDesc = document.createElement('meta');
      twitterDesc.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDesc);
    }
    twitterDesc.setAttribute('content', description);

    // Twitter Image
    let twitterImg = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImg) {
      twitterImg = document.createElement('meta');
      twitterImg.setAttribute('name', 'twitter:image');
      document.head.appendChild(twitterImg);
    }
    twitterImg.setAttribute('content', `${siteUrl}/og-image.png`);

    // Remove old schema scripts
    const oldScripts = document.querySelectorAll('script[id^="jsonld-schema-"]');
    oldScripts.forEach(s => s.remove());

    // Append new schema scripts
    schemas.forEach((schema, idx) => {
      const script = document.createElement('script');
      script.id = `jsonld-schema-${idx}`;
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);
    });

  }, [activeTab, activeBlogSlug]);

  return null; // Side effect component
}
