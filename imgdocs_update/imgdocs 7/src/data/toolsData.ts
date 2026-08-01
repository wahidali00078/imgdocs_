/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ToolFAQ {
  q: string;
  a: string;
}

export interface ToolData {
  id: string;
  title: string;
  category: 'Convert to PDF' | 'Convert from PDF' | 'Optimize & Edit' | 'Security & Sign';
  shortDescription: string;
  description: string;
  stepByStep: string[];
  benefits: string[];
  faqs: ToolFAQ[];
  limits: string;
  formats: string;
}

export const toolsList: ToolData[] = [
  {
    id: 'jpg-to-pdf',
    title: 'JPG to PDF Converter',
    category: 'Convert to PDF',
    shortDescription: 'Convert JPG, JPEG, and PNG images into professionally structured PDF files instantly in your browser.',
    limits: 'Max 25 files per merge, up to 50MB per image. Safe, browser-based local compilation.',
    formats: 'JPG, JPEG, PNG, WEBP, BMP, GIF',
    benefits: [
      'Zero Server Uploads: All conversion happens directly in your browser using local CPU power. Your images never touch external servers.',
      'Custom Page Formats: Choose from letter size, A4, or dynamic fit page sizing depending on image aspect ratios.',
      'Smart Orientation & Margins: Apply automatic, portrait, or landscape orientation combined with customizable margins.',
      'Drag-and-Drop Organization: Reorder, rotate, or discard images easily with an interactive drag-and-drop editor before compiling.',
      'High Quality Vector Output: Preserves original image DPI without compressing your documents into blurry results.'
    ],
    stepByStep: [
      'Select or drag-and-drop your JPG, JPEG, or PNG images into the secure upload area.',
      'Reorder your pages by dragging them, rotate individual pages, or delete unwanted images in the editing interface.',
      'Choose your target PDF options: page size (A4, Letter, or Fit), orientation (Portrait or Landscape), and margin widths.',
      'Click the "Generate PDF" button to trigger the instant client-side compilation.',
      'Download your compiled, high-resolution PDF document immediately. Files are never stored anywhere!'
    ],
    faqs: [
      {
        q: 'Are my private photos and documents safe?',
        a: 'Absolutely. ImgDocs processes your files using local browser-native technologies (JsPDF). Your files are never uploaded to any remote backend server, guaranteeing absolute privacy and compliance with enterprise security directives.'
      },
      {
        q: 'Can I combine different image formats like PNG and JPG?',
        a: 'Yes, our smart compiler accepts mixed image formats. You can upload JPG, JPEG, PNG, and WEBP files simultaneously and compile them into a single cohesive PDF document in one action.'
      },
      {
        q: 'Is there a limit on the number of images I can compile?',
        a: 'To guarantee premium performance in local memory, we support up to 25 files per compilation. If you have more files, you can compile them in groups or use our Merge PDF tool afterwards.'
      }
    ],
    description: `ImgDocs provides a high-performance, browser-native JPG to PDF converter designed to bridge the gap between image management and professional document storage. In today's digital workflow, converting images to PDFs is essential for legal submissions, expense receipts, portfolio compilations, and administrative record-keeping. Standard online converters pose severe security risks by uploading your personal documents to unknown remote servers. ImgDocs resolves this structural security vulnerability by executing all file parsing and document construction locally within your browser's secure local environment.

Our technology leverages client-side Web Assembly and advanced Canvas drawing matrices to render your images with mathematical precision, embedding them into a precise vector PDF wrapper. This means whether you are compiling high-resolution scans of legal identity documents or low-latency screenshots of transaction receipts, the original pixel depth and aspect ratio are maintained. 

### Why Browser-Native Conversion Matters
By executing code directly in your local environment, ImgDocs bypasses typical web server bottlenecks. Traditional PDF conversion portals force you to wait for long uploads, queue behind other concurrent users, and then wait again to download the finished file. ImgDocs offers instant, zero-latency rendering. The minute you click "Generate PDF", your computer begins drafting the PDF layers using standard JsPDF instructions, returning a downloadable binary stream in less than a second.

### Advanced Image Configuration Options
Unlike generic tools, ImgDocs gives you granular control over your compiled output:
- **Aspect Ratio Locking (Fit Page)**: Automatically sizes each PDF page to exactly match the resolution of the source image, avoiding unwanted black borders or cropped corners.
- **Standard Printing Formats (A4 & Letter)**: Centers your images on standard printable dimensions, making your files ready for immediate distribution, archival, or printing.
- **Margin Padding Adjustments**: Add custom negative space around images (None, Small, or Large) to give your documents a clean, editorial look resembling official office templates.
- **Granular Angle Controls**: Instantly adjust orientation and apply individual rotations to misaligned images before initiating compilation. This eliminates the need for separate pre-editing steps.

### SEO Best Practices & AdSense Policy Compliance
At ImgDocs, we follow high-quality informational standards. This tool is free of deceptive CTA overlays, intrusive redirect scripts, or hidden payment walls. Our tool serves original administrative utility, adhering to the highest Google Search Quality Evaluator Guidelines. Experience a seamless utility built on solid security and high-speed modern web engineering.`
  },
  {
    id: 'pdf-to-jpg',
    title: 'PDF to JPG Extractor',
    category: 'Convert from PDF',
    shortDescription: 'Decompile PDF documents and extract every single page into separate high-resolution JPG images with zero upload lag.',
    limits: 'Max 100MB PDF files. 100% client-side rasterization. No data transmission to cloud.',
    formats: 'PDF (.pdf)',
    benefits: [
      'High-Speed Extraction: Extract pages directly using your local browser rendering pipeline.',
      'ZIP Archiving: Automatically packages multiple extracted pages into a single ZIP archive for convenient one-click download.',
      'Individual Page Download: Choose to download only specific pages as JPGs instead of the entire document.',
      'Secure Local Parsing: Uses PDF.js inside a local worker thread. No document scanning on remote servers.',
      'Aspect Ratio Fidelity: Retains the identical layout and pixel density of the original PDF pages.'
    ],
    stepByStep: [
      'Upload your PDF document by clicking the select button or dragging it in.',
      'Wait a split second as our browser-based parser reads and renders the page catalog.',
      'Browse the interactive grid previews of all the pages contained in the PDF.',
      'Click "Download All as ZIP" to bundle all page images, or select "Download JPG" on individual pages.',
      'All temporary memory allocations are instantly cleared when you close the tab.'
    ],
    faqs: [
      {
        q: 'How does local PDF to JPG extraction work?',
        a: 'We use a browser-native implementation of Mozilla\'s PDF.js library. It parses the PDF structure directly in your browser and draws each page onto an HTML5 Canvas, which is then exported as a high-quality JPEG data URL.'
      },
      {
        q: 'Is my document content kept confidential?',
        a: 'Yes. Since no network requests are sent containing your document data, your confidential contracts, financial statements, or personal certificates are completely secure from interception or server leakage.'
      }
    ],
    description: `The ImgDocs PDF to JPG Extractor represents the pinnacle of browser-based document rasterization. In many professional circumstances, you need to share a page of a PDF document as an image—whether to embed it in a slideshow, post it on social media, or include it in an email body. Traditional software requires expensive licenses, and online services demand that you submit your private PDFs to their cloud processors. ImgDocs provides an elegant, fast, and entirely offline-capable alternative.

By deploying powerful web worker threads, ImgDocs decodes the PDF elements, loads the appropriate fonts, and draws the vector shapes directly onto a local canvas block. This ensures that the resulting JPG files are sharp, readable, and free of typical raster artifacts.

### Enterprise Security & Compliance
For corporate environments, data protection is paramount. Employees uploading sensitive company documents to external servers is a primary cause of compliance violations under GDPR and HIPAA. ImgDocs is built from the ground up to prevent data leakage. Because all computation is confined to the client side, our tool acts as a secure, local, private office assistant.

### Crisp Page Rendering Core
Our engine leverages Mozilla's robust PDF.js rendering framework, which features:
- **Font Rendering Engine**: Reads embedded TrueType or OpenType fonts directly from the binary stream to ensure exact textual replication.
- **Vector Path Rendering**: Scalable vector paths are calculated and drawn in real-time, matching the original PDF coordinates.
- **Color Correction**: Accurately maps device colors to RGB values to ensure your output JPG looks identical to the original PDF presentation.`
  },
  {
    id: 'compress-pdf',
    title: 'Compress PDF & Image',
    category: 'Optimize & Edit',
    shortDescription: 'Compress PDF and image file sizes by optimizing quality, dimensions, and compression ratios locally.',
    limits: 'Max 100MB per file. Select from Low, Medium, or High compression levels with instant size previews.',
    formats: 'PDF, JPG, JPEG, PNG, WEBP',
    benefits: [
      'Instant Size Preview: See the exact calculated file size reduction before downloading.',
      'Multi-Format Support: Works seamlessly for both documents (PDFs) and image media.',
      'Custom Resolution Settings: Choose scale percentages and quality values dynamically.',
      'Private Computation: Your confidential contracts and media files never leave your device.',
      'Visual Inspector: Preview original vs compressed assets side-by-side to verify readability.'
    ],
    stepByStep: [
      'Select the PDF or image files you wish to compress.',
      'Choose your target compression level: Low (High Quality), Medium (Balanced), or High (Minimum Size).',
      'Optionally adjust width/height dimensions or scaling factors to further reduce resolution weight.',
      'Click the "Compress" button and watch the live byte reduction status tracker.',
      'Save your optimized file. Keep your email attachments lightweight and web-ready!'
    ],
    faqs: [
      {
        q: 'Does compressing my files reduce their readability?',
        a: 'Our balanced "Medium" compression uses intelligent structural optimization that reduces files by up to 70% while keeping text fully sharp and readable. "High" compression is optimized for minimal bytes.'
      },
      {
        q: 'Can I compress files that contain secret financial data?',
        a: 'Yes, ImgDocs is completely private. Since the compression logic runs in local memory, your bank statements, tax files, or medical records are never exposed to any cloud server.'
      }
    ],
    description: `ImgDocs Compress is an essential tool for digital efficiency. Large PDFs and high-resolution images are difficult to email, upload to government portals, or share over mobile networks. Traditional converters run heavy server-side scripts that compress your documents into blurry, unreadable files. ImgDocs uses browser-native image resizing engines and advanced document stream refactoring to reduce byte weight while maintaining exceptional clarity.

Our optimization pipeline inspects the inner compression trees, lowering the DPI of heavy embedded photographic blocks while leaving text nodes intact. This results in incredibly compact PDFs that still print and display beautifully.

### The Science of Browser-Based Compression
Web optimization relies on finding the perfect equilibrium between image resolution and file weight. ImgDocs handles this through multi-tiered algorithms:
1. **Dynamic Canvas Downsampling**: Reduces raw image dimensions while applying bicubic filtering to avoid pixelation.
2. **Quantized JPEG Compression**: Compresses visual elements using adjusted JPEG quantization tables, shaving off unnecessary metadata and subtle color details.
3. **Stream Compression Hooks**: For PDFs, we target heavy image streams, optimizing their binary format in local memory.`
  },
  {
    id: 'pdf-to-word',
    title: 'PDF to Word Converter',
    category: 'Convert from PDF',
    shortDescription: 'Convert PDF documents into editable Word files (.docx) with structured layouts, paragraphs, and tables preserved.',
    limits: 'Max 50MB. Text layers are dynamically extracted into formatted docx frameworks.',
    formats: 'PDF (.pdf)',
    benefits: [
      'Editable Layouts: Convert PDF text blocks into real Word paragraphs instead of uneditable screenshots.',
      'Table Reconstruction: Detects grid coordinates to convert PDF tables back into native Word grids.',
      '100% Privacy: Financial statements or resumes are processed entirely locally.',
      'No Subscriptions: Completely free, no registration, and no daily conversion limits.',
      'Font Style Mapping: Matches standard PDF fonts with system-compatible equivalents.'
    ],
    stepByStep: [
      'Drop your PDF file into the browser converter.',
      'Our engine reads the structural layout, text flow, and document boundaries.',
      'Click "Convert to Word" to assemble the editable docx file structure.',
      'Download your finished Word document and edit immediately inside MS Word, Pages, or Google Docs.'
    ],
    faqs: [
      {
        q: 'Will the formatting of my tables be preserved?',
        a: 'Yes. Our advanced extractor analyzes the horizontal and vertical coordinate lines to map tabular grids directly into Word table nodes, preserving cells and alignment.'
      },
      {
        q: 'Does this require uploading my documents to Microsoft or Adobe?',
        a: 'No. The conversion is performed locally in your browser, protecting your proprietary corporate data from any cloud exposure.'
      }
    ],
    description: `Converting PDFs back into editable Word documents has historically been a complex administrative challenge. Standard converters often return poorly organized documents with broken sentences and overlapping text boxes. The ImgDocs PDF to Word converter utilizes intelligent text-flow extraction to reassemble your documents. It reads character layout vectors, clusters them into sensible paragraphs, detects headers and footers, and maps tables back into standard editable grids.`
  },
  {
    id: 'word-to-pdf',
    title: 'Word to PDF Converter',
    category: 'Convert to PDF',
    shortDescription: 'Convert MS Word documents (.docx, .doc) into high-fidelity PDF files with consistent formatting across all platforms.',
    limits: 'Max 50MB. Local docx parsing and styling reproduction.',
    formats: 'DOCX, DOC',
    benefits: [
      'Universal Layout: Lock in your formatting, fonts, and page layouts so they look identical on any device.',
      'Instant Conversion: Standard Microsoft Word files convert in milliseconds.',
      'Hyperlink Integrity: Keeps all nested hyperlinks active and clickable in the resulting PDF.',
      'Confidentiality Guaranteed: Sensitive business proposals are kept local to your machine.',
      'Clean PDF Standards: Generates modern PDF/A compliant documents optimized for archiving.'
    ],
    stepByStep: [
      'Select your MS Word (.docx) file from your local storage.',
      'Let our parser structure the layout, headers, footnotes, and styles.',
      'Choose your PDF parameters and click "Generate PDF".',
      'Save your completed PDF to your machine. Ready to share or submit immediately.'
    ],
    faqs: [
      {
        q: 'Does it support images embedded in the Word file?',
        a: 'Yes, images and figures embedded in your Word file are parsed, structured, and compiled directly into the resulting PDF with their original dimensions and layouts.'
      }
    ],
    description: `Sharing raw Word files is risky because fonts, alignments, and page numbers can shift drastically depending on the recipient\'s office software. Converting to PDF guarantees that your document will render exactly as you designed it. The ImgDocs Word to PDF converter parses your docx file structure, rebuilding paragraphs, lists, page breaks, and embedded assets into a standard, rock-solid PDF file.`
  },
  {
    id: 'merge-pdf',
    title: 'Merge PDF',
    category: 'Optimize & Edit',
    shortDescription: 'Combine multiple PDF documents into a single, organized PDF file with custom page ordering.',
    limits: 'Max 20 files, up to 100MB total size. Inter-page compilation with quick reordering.',
    formats: 'PDF (.pdf)',
    benefits: [
      'Visual Drag-and-Drop: Easily rearrange, sort, or add files to the list before merging.',
      'Multi-Page Interweaving: Mix and match files in any order to form a unified presentation.',
      'No Data Upload: Your merged contracts, bank books, and portfolios are compiled purely in memory.',
      'Fast Merging: Joins heavy documents in seconds with advanced stream combining.',
      'Page Selection: Select only specific pages from each input file to include in the final PDF.'
    ],
    stepByStep: [
      'Upload the multiple PDF documents you want to merge.',
      'Drag and drop the file cards to arrange them in your preferred sequence.',
      'Click the "Merge PDF" button to execute local binary concatenation.',
      'Download the single, perfectly ordered PDF document immediately.'
    ],
    faqs: [
      {
        q: 'Is there a size limit for files being merged?',
        a: 'We support files up to 100MB in total size to ensure your browser memory stays fast and responsive during the compilation process.'
      }
    ],
    description: `Combining corporate files, monthly bank statements, or academic chapters into a single PDF shouldn\'t require expensive software. The ImgDocs Merge PDF tool provides a drag-and-drop client interface to concatenate document binary streams. By working directly with raw PDF blocks, we join your files in seconds, maintaining all nested resources, fonts, and vector layers without quality loss.`
  },
  {
    id: 'split-pdf',
    title: 'Split PDF',
    category: 'Optimize & Edit',
    shortDescription: 'Divide a multi-page PDF into separate documents or extract specific page ranges easily.',
    limits: 'Max 100MB. Interactive split controls and instant page mapping.',
    formats: 'PDF (.pdf)',
    benefits: [
      'Visual Page Selector: Click directly on the pages you want to split or extract.',
      'Custom Ranges: Extract specific ranges (e.g., pages 3-7) into individual files.',
      'Split All Pages: Automatically convert a 20-page PDF into 20 separate single-page files.',
      'Secure Local Session: No server logging means confidential reports stay 100% private.',
      'ZIP Packaging: Bundles split documents into a clean, downloadable ZIP folder.'
    ],
    stepByStep: [
      'Upload your multi-page PDF file.',
      'Select your splitting mode: extract specific pages, or split into equal page ranges.',
      'Select pages directly via the visual thumbnails.',
      'Click "Split PDF" and download your customized output files as a ZIP or single PDF.'
    ],
    faqs: [
      {
        q: 'Can I split password-protected PDFs?',
        a: 'You will need to unlock the PDF using our "Unlock PDF" tool first, after which you can split it seamlessly.'
      }
    ],
    description: `When dealing with massive legal agreements, books, or bank statements, you often need to share only a single page or section. The ImgDocs Split PDF tool reads the catalog entries of your document and splits the document structure at exact binary boundaries. This keeps file sizes small and ensures that extracted pages contain only their specific graphics, keeping metadata clean.`
  },
  {
    id: 'protect-pdf',
    title: 'Protect PDF with Password',
    category: 'Security & Sign',
    shortDescription: 'Encrypt your PDF documents with a strong password using industrial AES-256 standards directly on your device.',
    limits: 'Max 100MB. Client-side cryptographic salting and key derivation.',
    formats: 'PDF (.pdf)',
    benefits: [
      'AES-256 Encryption: Secures your PDF using advanced state-of-the-art encryption algorithms.',
      'Granular Permissions: Choose whether to restrict printing, editing, or copying content.',
      'Zero Server Exposure: Your security passwords are never sent over the internet.',
      'Highly Compatible: Protected PDFs will open in any standard PDF reader like Adobe Acrobat.',
      'Anti-Tampering Wrapper: Prevents unauthorized modification of legal files.'
    ],
    stepByStep: [
      'Upload the PDF document you need to protect.',
      'Enter a strong secure password and confirm it.',
      'Select the permissions you want to restrict (e.g. disable printing, copying, or editing).',
      'Click "Apply Password" to encrypt the document locally.',
      'Save your secure PDF. Only password holders will be able to read its contents.'
    ],
    faqs: [
      {
        q: 'What happens if I lose my password?',
        a: 'Because ImgDocs doesn\'t store passwords or keep files on servers, we cannot recover lost passwords. Be sure to keep a secure record of your password.'
      }
    ],
    description: `Protecting financial, personal, or corporate information is critical before email transmission. The ImgDocs Protect PDF tool secures your files with advanced AES encryption. By compiling the password key locally using secure hashing algorithms, we lock your file streams, making it impossible for unauthorized interceptors to inspect or manipulate your information.`
  },
  {
    id: 'unlock-pdf',
    title: 'Unlock PDF',
    category: 'Security & Sign',
    shortDescription: 'Remove password protection and decryption locks from PDF files to make them easily shareable.',
    limits: 'Max 100MB. Instant offline decryption (owner authorization password required).',
    formats: 'PDF (.pdf)',
    benefits: [
      'Unlock Instantly: Strip away annoying password prompts from files you own.',
      'Print & Copy Restored: Instantly unlocks copying, typing, and printing restrictions.',
      'Secure Browser Execution: Decryption key stays inside your device memory.',
      'Clean PDF Export: Outputs standard unprotected PDF streams ready for standard usage.',
      'No Quality Alterations: Keeps formatting, attachments, and imagery intact.'
    ],
    stepByStep: [
      'Select the protected PDF document.',
      'Enter the password of the document to authorize decryption.',
      'Click "Unlock PDF" to strip all password blocks and permission restrictions.',
      'Download your unlocked PDF file with password requests permanently removed.'
    ],
    faqs: [
      {
        q: 'Does this tool hack or crack PDF passwords?',
        a: 'No. This is a secure authorization utility. To unlock a file, you must enter its current password. It then strips the security wrapper so you don\'t have to enter it every time you open it.'
      }
    ],
    description: `Typing your security credentials every time you open a recurring document like a bank ledger or utilities report is tedious. If you are authorized to manage these files, the ImgDocs Unlock PDF tool parses the security headers, decrypts the contents using your password, and writes out a clean, unencrypted PDF stream. This makes the file easy to compile or archive without losing password records.`
  },
  {
    id: 'rotate-pdf',
    title: 'Rotate PDF',
    category: 'Optimize & Edit',
    shortDescription: 'Permanently rotate PDF pages that were scanned upside down or sideways, instantly saving the updated angles.',
    limits: 'Max 100MB. Interactive angle adjusters with 90, 180, and 270 degree configurations.',
    formats: 'PDF (.pdf)',
    benefits: [
      'Visual Page Selector: Select individual pages or rotate all pages simultaneously.',
      'Permanent Angle Saving: Ensures pages stay rotated in all PDF viewers permanently.',
      'Lightweight Rendering: View page thumbnails instantly using client-side canvas buffers.',
      'Highly Intuitive Controls: Click clockwise or counter-clockwise to align scans.',
      'No File Storage: Local processing protects your secure office records.'
    ],
    stepByStep: [
      'Drop your PDF into the rotation zone.',
      'Look at the generated page previews in our visual grid layout.',
      'Click the rotation buttons to align individual pages or the entire document.',
      'Click "Save PDF" to compile the new rotation matrices.',
      'Download your perfectly aligned PDF file.'
    ],
    faqs: [
      {
        q: 'Will the rotation affect the layout of the text?',
        a: 'No, rotating pages updates the standard PDF rotation metadata wrapper. This means text and vector elements remain intact and selectable, just aligned perfectly.'
      }
    ],
    description: `Scanned documents frequently arrive with some pages rotated sideways or completely upside down. The ImgDocs Rotate PDF tool provides a user-friendly workspace to adjust page angles. Instead of struggling with complex premium desktop suites, you can rotate pages in a flash, updating the internal PDF coordinate map without re-compressing or degrading the document.`
  },
  {
    id: 'organize-pdf',
    title: 'Organize PDF',
    category: 'Optimize & Edit',
    shortDescription: 'Rearrange pages, delete unwanted sheets, or insert blank sections in your PDF documents visually.',
    limits: 'Max 100MB. Dynamic canvas layout reordering with drag-and-drop support.',
    formats: 'PDF (.pdf)',
    benefits: [
      'Interactive Storyboard: See all your pages laid out visually like a storyboard.',
      'Delete with One Click: Hover over any page and click the trash icon to discard it.',
      'Add Blank Pages: Insert clean space or blank templates anywhere in the document flow.',
      'Private Local Editing: Secure financial ledgers are parsed only in memory.',
      'Preserve Meta Tags: Keeps original links, outlines, and form fields intact.'
    ],
    stepByStep: [
      'Upload the PDF document you want to organize.',
      'Drag any page thumbnail to position it in a new order in the document layout.',
      'Use the trash bin icon on individual page tiles to delete them.',
      'Click "Compile PDF" to reorder and save the document metadata stream.',
      'Download your clean, perfectly organized PDF file.'
    ],
    faqs: [
      {
        q: 'Can I organize pages from multiple PDFs at once?',
        a: 'Yes, you can merge multiple files using our "Merge PDF" tool and then use this organizer to arrange their pages perfectly.'
      }
    ],
    description: `When compiling project summaries, reports, or brochures, some pages may be in the wrong order or contain draft notes. The ImgDocs Organize PDF tool reads the page node tree, presenting them as draggable cards. You can delete extra sheets, shuffle chapters, and compile a clean document without any server-side dependencies.`
  },
  {
    id: 'add-watermark',
    title: 'Add Watermark to PDF',
    category: 'Security & Sign',
    shortDescription: 'Stamp a secure text or image watermark over your PDF pages to assert ownership and prevent plagiarism.',
    limits: 'Max 100MB. Customizable transparency, position, and font size settings.',
    formats: 'PDF (.pdf), Images (.png, .jpg)',
    benefits: [
      'Custom Text Watermarks: Type "CONFIDENTIAL", "DRAFT", or your name over every page.',
      'Image Stamps: Upload your company logo as a watermark overlay.',
      'Opacity & Scale Controls: Fine-tune transparency and size so text remains fully readable.',
      'Angle Customization: Rotate your watermark text across a clean diagonal axis.',
      'Secure Brand Protection: Runs in local memory so your proprietary assets stay safe.'
    ],
    stepByStep: [
      'Upload the PDF file that needs watermarking.',
      'Choose between text or image watermark types.',
      'Set your watermark properties: text content, font size, opacity level, position, and angle.',
      'Preview the placement overlay live on the document thumbnail.',
      'Click "Apply Watermark" and download your branded PDF document.'
    ],
    faqs: [
      {
        q: 'Can the watermark be easily deleted by recipients?',
        a: 'Our tool embeds watermarks directly into the PDF content stream as a flattened layout layer, making them extremely difficult to remove without advanced PDF editor tools.'
      }
    ],
    description: `Securing proprietary intellectual property, design drafts, or legal contracts is crucial before sharing them online. The ImgDocs Add Watermark tool overlays a translucent branding stamp onto your PDF. You can style the watermark angle, change opacity settings, or upload your vector logo, establishing ownership while maintaining text readability.`
  },
  {
    id: 'remove-pages',
    title: 'Remove Pages from PDF',
    category: 'Optimize & Edit',
    shortDescription: 'Quickly delete unwanted pages from your PDF file and save a clean, compact version.',
    limits: 'Max 100MB PDF. Fast page-level stream pruning.',
    formats: 'PDF (.pdf)',
    benefits: [
      'Visual Pruning Tool: See page content previews and click to discard in a flash.',
      'Batch Removal: Specify ranges or page lists to delete (e.g. page 2, pages 5-10).',
      'Instant File Reduction: Smaller files are easier to email or store.',
      'Confidential and Clean: Ensure private draft sections are fully erased before distribution.',
      'No Content Re-encoding: Maintains 100% of original graphics and font vector quality.'
    ],
    stepByStep: [
      'Upload your PDF document into the page removal utility.',
      'Click the "Remove" button on each page card you want to delete.',
      'Double check your page lineup in the visual preview area.',
      'Click "Save PDF" to prune the document structure and download the compiled file.'
    ],
    faqs: [
      {
        q: 'Does this re-compress my PDF and make it look blurry?',
        a: 'No. Our pruner works directly on the PDF node catalog. It discards unwanted page pointers and nested assets without touch-editing the remaining page streams, keeping quality high.'
      }
    ],
    description: `Many official files come with extra instructions, terms, or blank index cards that are irrelevant for your final submission. The ImgDocs Remove Pages tool lets you prune these pages visually. It deletes their entries from the PDF document catalog, lowering the file size and cleaning up presentation without re-encoding your graphics.`
  },
  {
    id: 'ocr-pdf',
    title: 'OCR PDF Text Extractor',
    category: 'Convert from PDF',
    shortDescription: 'Extract text from scanned PDFs or images using advanced optical character recognition (OCR) directly in your browser.',
    limits: 'Max 25MB. Real-time client-side character recognition. No data uploads.',
    formats: 'PDF, JPG, JPEG, PNG',
    benefits: [
      'Local OCR Engine: Uses browser-native character recognition, ensuring total document privacy.',
      'Copy with One Click: Click a button to copy all extracted text to your clipboard.',
      'Searchable Output: Export recognized text as a TXT file or searchable PDF layer.',
      'Multi-Language Support: Highly accurate character matching algorithms.',
      'Saves Hours of Typing: Instantly convert manual paper scans into editable text.'
    ],
    stepByStep: [
      'Upload your scanned PDF document or image file.',
      'Select the primary language of the document text.',
      'Click "Start OCR" and monitor the character reading bar.',
      'Review and edit the recognized text in our interactive text workspace.',
      'Click "Copy to Clipboard" or save the output as a text file.'
    ],
    faqs: [
      {
        q: 'How does browser-based OCR keep my files secure?',
        a: 'Unlike services that send images of your documents to cloud-based neural networks, ImgDocs runs its OCR models locally inside your browser, so no sensitive text ever crosses the network.'
      }
    ],
    description: `Scanned paperwork, invoice images, or photocopied contracts are locked formats where text cannot be selected or edited. The ImgDocs OCR Text Extractor scans the image grid, detects character structures, and re-compiles them into a selectable text layer. By hosting lightweight character models locally, we make text extraction immediate, safe, and completely private.`
  },
  {
    id: 'html-to-pdf',
    title: 'HTML to PDF Converter',
    category: 'Convert to PDF',
    shortDescription: 'Convert web pages, HTML snippets, or raw source code into formatted PDF documents.',
    limits: 'Max 10MB HTML files or live URL conversion references.',
    formats: 'HTML, HTM, URL, Code files',
    benefits: [
      'Live Web Archiving: Compile websites into standard PDFs to capture clean records.',
      'Responsive Rendering: Adapts modern styles, flex layouts, and fonts for printing.',
      'Code Previewer: View raw HTML and rendered nodes side-by-side before compilation.',
      'Safe Sandbox: Scripts and tracking cookies are completely disabled during parsing.',
      'Hyperlink Retention: Keeps web links active in the resulting PDF.'
    ],
    stepByStep: [
      'Input the live website URL, or copy and paste your raw HTML code block.',
      'Customize print stylesheet configurations like margins, scales, and background images.',
      'Click "Generate PDF" to compile the HTML nodes into vector coordinates.',
      'Save your web page capture to your local storage.'
    ],
    faqs: [
      {
        q: 'Does it support modern CSS layouts like Flexbox or Grid?',
        a: 'Yes, our HTML parser replicates modern CSS layout matrices to render accurate representations of web pages.'
      }
    ],
    description: `Capturing digital articles, online receipts, or invoice dashboards as PDFs is crucial for archival purposes. The ImgDocs HTML to PDF converter compiles HTML structures, parses nested styles, and draws layouts into printable PDF sheets. We strip away annoying web tracker scripts, cookies, and popups, giving you a clean document.`
  },
  {
    id: 'excel-to-pdf',
    title: 'Excel to PDF Converter',
    category: 'Convert to PDF',
    shortDescription: 'Convert Excel spreadsheets (.xlsx, .xls) into crisp, perfectly aligned PDF reports.',
    limits: 'Max 50MB. Direct tabular layout parsing and page margin fitting.',
    formats: 'XLSX, XLS',
    benefits: [
      'Fit to Page Columns: Automatically fits wide spreadsheets into standard portrait/landscape columns.',
      'Multi-Sheet Support: Convert single sheets or entire Excel workbooks in one run.',
      'Formula Locking: Renders calculated spreadsheet formulas as solid, unalterable text numbers.',
      'Private Computation: Keeps corporate financial ledgers and data confidential.',
      'Clean Visual Gridlines: Custom options to display or hide grid boundaries.'
    ],
    stepByStep: [
      'Select your Excel (.xlsx or .xls) workbook file.',
      'Choose whether to convert the active sheet or all worksheets.',
      'Set fit-to-page settings and grid line preferences.',
      'Click "Convert to PDF" and watch the spreadsheet compile into a structured report.',
      'Download your secure, printable PDF file immediately.'
    ],
    faqs: [
      {
        q: 'What happens to spreadsheets that are very wide?',
        a: 'Our converter uses intelligent dynamic scaling, automatically shifting orientation to landscape or scaling font size so columns fit within the margins.'
      }
    ],
    description: `Spreadsheets look different depending on the viewer\'s screen size, and equations can be altered accidentally. Converting Excel to PDF locks in your calculations and numbers into a permanent format. The ImgDocs Excel to PDF tool renders cells, text styles, and tables, creating polished documents ready for presentations.`
  },
  {
    id: 'powerpoint-to-pdf',
    title: 'PowerPoint to PDF Converter',
    category: 'Convert to PDF',
    shortDescription: 'Convert PowerPoint slide decks (.pptx, .ppt) into standard PDF presentations.',
    limits: 'Max 75MB. Dynamic presentation structure parsing and scale matching.',
    formats: 'PPTX, PPT',
    benefits: [
      'Pixel-Perfect Slides: Slide layouts and text overlays map perfectly to standard presentation formats.',
      'Instant Rendering: Quickly processes slide catalogs in a fraction of a second.',
      'Hyperlinks Preserved: Keeps links, table of contents pointers, and web references active.',
      'Safe client workspace: Protects proprietary marketing and company roadmap ideas.',
      'Optimized Size: High-resolution slide graphics are optimized to save email space.'
    ],
    stepByStep: [
      'Select your MS PowerPoint (.pptx) presentation file.',
      'Wait as our layout engine reads the slides, drawings, and text frames.',
      'Select custom orientation and click "Generate PDF".',
      'Download your presentation slides compiled as a compact, shareable PDF.'
    ],
    faqs: [
      {
        q: 'Does it support PowerPoint transition animations in the PDF?',
        a: 'PDF is a static vector format, so slide animations and transitions are converted into clean, static pages. This is standard for distributing slides.'
      }
    ],
    description: `Sharing slide decks in PPTX format can result in misplaced text fields and broken layouts if the recipient doesn\'t have the same fonts or software. Converting your PowerPoint to PDF ensures that your design elements, graphics, and text will display exactly as you intended on any screen.`
  },
  {
    id: 'esign-pdf',
    title: 'eSign PDF Document',
    category: 'Security & Sign',
    shortDescription: 'Draw, type, or upload your signature to sign contracts and documents online.',
    limits: 'Max 50MB. Secure cryptographic canvas drawing. No cloud storage of signatures.',
    formats: 'PDF (.pdf)',
    benefits: [
      'Interactive Signature Pad: Draw your signature using a trackpad, mouse, or touch screen.',
      'Typed Signatures: Choose from beautiful cursive fonts to type your signature.',
      'Secure Overlay Placing: Drag, resize, and position your signature on any page.',
      'Zero Cloud Footprint: Signatures are flattened into PDF layers locally on your device.',
      'Saves Ink and Paper: Complete contracts in seconds without printing or scanning.'
    ],
    stepByStep: [
      'Upload the PDF contract or agreement document.',
      'Choose your signature method: draw freehand, type with custom cursive, or upload a signature image.',
      'Place, scale, and adjust the signature overlay on the target signature line.',
      'Click "Apply Signature" to flatten the image directly into the vector file.',
      'Download your completed, signed PDF document instantly.'
    ],
    faqs: [
      {
        q: 'Is my digital signature secure with ImgDocs?',
        a: 'Yes. Since our app runs inside your local browser memory, your signatures are never transmitted over the web. The final PDF is compiled locally, making it secure.'
      }
    ],
    description: `Signing leases, agreements, or NDA documents shouldn\'t involve printing, signing, and scanning paper. The ImgDocs eSign PDF tool offers an offline-first signature pad. Draw or type your signature, drag it onto any signature box, and flatten it directly into the PDF. This secures your signature within the document, creating a compliant paperless transaction.`
  },
  {
    id: 'crop-image',
    title: 'Crop Image & Photo Editor',
    category: 'Optimize & Edit',
    shortDescription: 'Crop JPG, PNG, WEBP, and GIF images with interactive aspect ratio presets (1:1, 16:9, 4:3, 9:16, Freeform) completely locally in your browser memory.',
    limits: 'Max 50MB per photo. 100% local HTML5 Canvas cropping. Unlimited free crops.',
    formats: 'JPG, JPEG, PNG, WEBP, BMP, GIF, SVG',
    benefits: [
      'Interactive Aspect Ratios: Instant 1:1, 16:9, 4:3, 9:16, 3:2, and freeform cropping frames.',
      'Fine Controls: Drag handles, pan, zoom, rotate, and flip photos with pixel-perfect accuracy.',
      'Output Format Choice: Save as JPG, PNG, WEBP, or compile directly into a clean PDF document.',
      'Zero Cloud Uploads: Your sensitive photos and identity scans are cropped entirely in browser RAM.',
      '100% Free: Unlimited image cropping without watermarks, registration, or paywalls.'
    ],
    stepByStep: [
      'Upload your image or photo into the cropping area.',
      'Select a preset aspect ratio (1:1, 16:9, 4:3, 9:16) or drag handles for a custom freeform crop.',
      'Adjust zoom, orientation, or rotate controls to frame your subject perfectly.',
      'Choose your desired export format (JPG, PNG, WEBP, or PDF) and quality.',
      'Click "Crop & Export Image" to save your cropped image instantly.'
    ],
    faqs: [
      {
        q: 'Is my photo uploaded to any server during cropping?',
        a: 'No. All cropping calculations are processed locally inside your browser memory using HTML5 Canvas rendering. Your private photos never leave your device.'
      },
      {
        q: 'Can I convert my cropped photo directly to PDF?',
        a: 'Yes! ImgDocs lets you export your cropped result as a high-resolution JPG, PNG, WEBP, or compile it into a standard PDF file with one click.'
      },
      {
        q: 'Are there any watermarks added to cropped images?',
        a: 'No, ImgDocs never adds watermarks or restricts free tier cropping.'
      }
    ],
    description: `The ImgDocs Crop Image tool provides an interactive, browser-native photo cropper designed for social media creators, web developers, document preparers, and photographers. Whether you need a 1:1 square avatar for LinkedIn, a 16:9 header banner for YouTube, a 9:16 vertical crop for Instagram Reels/TikTok, or custom dimensions for official passport photos, our tool handles it seamlessly in seconds.

### 100% Client-Side Privacy
Unlike conventional online photo editors that upload your private photos to remote cloud servers, ImgDocs executes all pixel operations directly in your browser's RAM using client-side HTML5 Canvas. Your raw photos never cross any network, guaranteeing zero data leakage and 100% compliance with GDPR and PDPA directives.

### Advanced Formatting & Multi-Export
ImgDocs allows you to export your cropped creation as a high-res PNG, compressed JPG, WEBP, or compile it directly into a vector PDF document ready for printing or administrative archival.`
  }
];
