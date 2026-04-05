/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Send, 
  FileText, 
  Video, 
  BookOpen, 
  Wrench, 
  Link as LinkIcon,
  ChevronRight,
  X,
  Download,
  ExternalLink,
  Menu,
  Code,
  Sparkles,
  Search
} from 'lucide-react';

const frontPic = "https://i.postimg.cc/HW25TpWk/front-pic-jpg.jpg";
const secondPic = "https://i.postimg.cc/8ky2q4kG/Gemini-Generated-Image-yue0uryue0uryue0.png";
const thirdPic = "https://i.postimg.cc/ZqYVctk5/IMG-20250120-WA0026.jpg";

// --- Types ---
type MaterialCategory = 'PDFs' | 'YouTube Tutorials' | 'Notes' | 'Tools' | 'Resources';

interface Material {
  id: string;
  title: string;
  category: MaterialCategory;
  description: string;
  pdfUrl?: string;
  youtubeId?: string;
  externalLink?: string;
  icon: React.ReactNode;
}

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'Ongoing' | 'Completed';
  link?: string;
  buttonText?: string;
}

// --- Data ---
const MATERIALS: Material[] = [
  {
    id: '1',
    title: 'Note by tyz',
    category: 'Notes',
    description: 'A complete Bengali guide for students covering MS Word, Excel, Access, and PowerPoint basics.',
    externalLink: 'https://drive.google.com/file/d/118MMLrAnpcmNpdy-Tewg7X8YkaDidyJz/view?usp=drive_link',
    icon: <FileText className="w-6 h-6" />
  },
  {
    id: '2',
    title: 'Next.js 14 Crash Course',
    category: 'YouTube Tutorials',
    description: 'Learn App Router, Server Actions, and full-stack development with Next.js.',
    youtubeId: 'dQw4w9WgXcQ',
    icon: <Video className="w-6 h-6" />
  },
  {
    id: '3',
    title: 'SEO Fundamentals',
    category: 'Notes',
    description: 'Quick notes on on-page and off-page SEO strategies to rank higher on Google.',
    externalLink: '#',
    icon: <BookOpen className="w-6 h-6" />
  },
  {
    id: '4',
    title: 'AI Prompt Generator',
    category: 'Tools',
    description: 'A handy tool to generate optimized prompts for LLMs like ChatGPT and Claude.',
    externalLink: '#',
    icon: <Wrench className="w-6 h-6" />
  },
  {
    id: '5',
    title: 'Web Dev Roadmaps',
    category: 'Resources',
    description: 'Curated links and roadmaps for aspiring frontend and backend developers.',
    externalLink: '#',
    icon: <LinkIcon className="w-6 h-6" />
  },
  {
    id: '6',
    title: 'Note by NBSE',
    category: 'Notes',
    description: 'My computer notes for NBSE.',
    externalLink: 'https://drive.google.com/file/d/1-aISt8Ycv_s3eMogZeUXLSXp5qrlb1zF/view?usp=drive_link',
    icon: <BookOpen className="w-6 h-6" />
  }
];

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Ashu Chatbot',
    description: 'A smart conversational AI chatbot designed to assist users. Just interact with Ashu to experience seamless assistance and intelligent responses.',
    status: 'Ongoing',
    link: 'https://ashu-mocha.vercel.app/',
    buttonText: 'Interact with Ashu'
  },
  {
    id: '2',
    title: 'AI Content Optimizer',
    description: 'An AI-powered tool that analyzes and optimizes blog posts for SEO, ensuring higher rankings and better readability.',
    status: 'Ongoing'
  },
  {
    id: '3',
    title: 'DevPortfolio Template',
    description: 'A highly customizable, animated portfolio template for developers built with React, Tailwind CSS, and Framer Motion.',
    status: 'Completed'
  },
  {
    id: '4',
    title: 'SEO Tracker Dashboard',
    description: 'Dashboard to monitor keyword rankings, site performance metrics, and backlink profiles in real-time.',
    status: 'Ongoing'
  }
];

const SOCIALS = [
  { name: 'YouTube', icon: <Youtube className="w-6 h-6" />, link: '#', color: 'hover:text-red-500 hover:shadow-red-500/50' },
  { name: 'Instagram', icon: <Instagram className="w-6 h-6" />, link: '#', color: 'hover:text-pink-500 hover:shadow-pink-500/50' },
  { name: 'LinkedIn', icon: <Linkedin className="w-6 h-6" />, link: '#', color: 'hover:text-blue-500 hover:shadow-blue-500/50' },
  { name: 'GitHub', icon: <Github className="w-6 h-6" />, link: '#', color: 'hover:text-white hover:shadow-white/50' },
  { name: 'Twitter (X)', icon: <Twitter className="w-6 h-6" />, link: '#', color: 'hover:text-sky-400 hover:shadow-sky-400/50' },
  { name: 'Telegram', icon: <Send className="w-6 h-6" />, link: '#', color: 'hover:text-blue-400 hover:shadow-blue-400/50' },
];

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Materials', href: '#materials' },
    { name: 'Projects', href: '#projects' },
    { name: 'Socials', href: '#socials' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          ashistyz
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-white/10 py-6 px-6 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  const [heroImages, setHeroImages] = useState([frontPic, secondPic, thirdPic]);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  // For the reflection/glare effect
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "-100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "-100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      // Swipe right: move last item to front
      setHeroImages(prev => [prev[2], prev[0], prev[1]]);
    } else if (info.offset.x < -threshold) {
      // Swipe left: move first item to back
      setHeroImages(prev => [prev[1], prev[2], prev[0]]);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 px-6 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-16 md:gap-12 w-full">
        
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 md:mb-6">
              Hi, I'm <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Ashish Mandal (ashistyz)</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-400 mb-8 md:mb-10 font-light"
          >
            Creative Developer <span className="text-indigo-500 mx-1 md:mx-2">|</span> AI Enthusiast <br className="hidden md:block" /> SEO Learner
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
          >
            <a href="#projects" className="px-6 py-3 md:px-8 md:py-4 rounded-full bg-white text-slate-950 font-semibold hover:bg-slate-200 transition-colors w-full sm:w-auto text-center shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
              View Projects
            </a>
            <a href="#materials" className="px-6 py-3 md:px-8 md:py-4 rounded-full bg-white/5 text-white font-semibold backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors w-full sm:w-auto text-center hover:border-white/30">
              Study Materials
            </a>
          </motion.div>
        </div>

        {/* Ultra-Premium Animated Photo Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex justify-center items-center relative mt-12 mb-8 md:mt-0 md:mb-0 w-full max-w-[100vw]"
          style={{ perspective: 1200 }}
        >
          {/* Core Glowing Background Blob */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[260px] h-[360px] sm:w-[320px] sm:h-[420px] md:w-[450px] md:h-[550px] bg-gradient-to-tr from-indigo-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-[80px] md:blur-[100px]"
          />
          
          {/* 3D Tilt Container */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d", touchAction: "none" }}
            className="relative w-[220px] h-[300px] sm:w-[280px] sm:h-[380px] md:w-[340px] md:h-[480px] cursor-grab active:cursor-grabbing group"
          >
            {/* Background Photo 2 */}
            <div 
              className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-700 ease-out group-hover:rotate-[18deg] group-hover:translate-x-16 group-hover:-translate-y-6 group-hover:scale-105"
              style={{ transform: "translateZ(-60px) translateX(30px) translateY(-15px) rotate(12deg) scale(0.9)" }}
            >
              <img src={heroImages[2]} alt="Background 2" className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-indigo-900/40 mix-blend-overlay" />
            </div>

            {/* Background Photo 1 */}
            <div 
              className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-700 ease-out group-hover:rotate-[-15deg] group-hover:-translate-x-16 group-hover:-translate-y-4 group-hover:scale-105"
              style={{ transform: "translateZ(-30px) translateX(-30px) translateY(-10px) rotate(-10deg) scale(0.95)" }}
            >
              <img src={heroImages[1]} alt="Background 1" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-purple-900/30 mix-blend-overlay" />
            </div>

            {/* Main Front Photo Container */}
            <div 
              className="absolute inset-0 rounded-[2rem] p-[2px] bg-gradient-to-br from-indigo-400/50 via-purple-400/20 to-pink-400/50 shadow-[0_30px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(99,102,241,0.2)] transition-transform duration-700 ease-out"
              style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
            >
              <div className="w-full h-full rounded-[1.85rem] overflow-hidden bg-slate-900 relative" style={{ transformStyle: "preserve-3d" }}>
                {/* Image */}
                <img 
                  src={heroImages[0]} 
                  alt="Ashish Mandal" 
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                
                {/* Dynamic Lighting Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 via-transparent to-purple-900/40 mix-blend-overlay" />
                
                {/* Interactive Glare/Reflection */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 pointer-events-none mix-blend-overlay"
                  style={{ x: glareX, y: glareY }}
                />
                
                {/* Hover Shine Effect (Sweep) */}
                <div className="absolute inset-0 overflow-hidden rounded-[1.85rem] pointer-events-none">
                  <div className="absolute top-0 left-[-150%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:left-[150%] transition-all duration-1500 ease-in-out" />
                </div>

                {/* Inner Border Glow */}
                <div className="absolute inset-0 rounded-[1.85rem] border border-white/10 group-hover:border-white/30 transition-colors duration-500 pointer-events-none" />
              </div>
            </div>

            {/* Floating Particles around the frame */}
            <motion.div animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-4 -left-4 w-2 h-2 bg-indigo-400 rounded-full blur-[2px]" style={{ transform: "translateZ(50px)" }} />
            <motion.div animate={{ y: [10, -10, 10], opacity: [0.5, 1, 0.5] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute top-1/4 -right-6 w-3 h-3 bg-pink-400 rounded-full blur-[2px]" style={{ transform: "translateZ(70px)" }} />
            <motion.div animate={{ y: [-15, 15, -15], opacity: [0.5, 1, 0.5] }} transition={{ duration: 6, repeat: Infinity, delay: 2 }} className="absolute -bottom-8 left-1/3 w-2 h-2 bg-purple-400 rounded-full blur-[2px]" style={{ transform: "translateZ(60px)" }} />

            {/* Floating Badge 1 - Top Right */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "translateZ(80px)" }}
              className="absolute -top-6 -right-4 sm:-top-8 sm:-right-8 md:-right-12 bg-slate-900/60 backdrop-blur-xl border border-white/20 px-3 py-2 sm:px-5 sm:py-3 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center gap-2 sm:gap-4 group-hover:border-indigo-400/50 transition-colors duration-500"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 blur-md opacity-50 rounded-full" />
                <span className="text-xl sm:text-3xl relative z-10">🚀</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] sm:text-[10px] text-indigo-300 font-bold uppercase tracking-widest">Creative</span>
                <span className="text-xs sm:text-base text-white font-black tracking-tight">Developer</span>
              </div>
            </motion.div>

            {/* Floating Badge 2 - Bottom Left */}
            <motion.div 
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              style={{ transform: "translateZ(100px)" }}
              className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 md:-left-12 bg-slate-900/60 backdrop-blur-xl border border-white/20 px-3 py-2 sm:px-5 sm:py-3 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center gap-2 sm:gap-4 group-hover:border-purple-400/50 transition-colors duration-500"
            >
              <div className="relative p-1.5 sm:p-2 bg-gradient-to-br from-purple-500/30 to-indigo-500/30 rounded-xl border border-white/10">
                <div className="absolute inset-0 bg-purple-500 blur-md opacity-40 rounded-xl" />
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-purple-300 relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] sm:text-[10px] text-purple-300 font-bold uppercase tracking-widest">AI & SEO</span>
                <span className="text-xs sm:text-base text-white font-black tracking-tight">Enthusiast</span>
              </div>
            </motion.div>
            
            {/* Floating Badge 3 - Middle Right (Small) */}
            <motion.div 
              animate={{ y: [-8, 8, -8], x: [0, 8, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
              style={{ transform: "translateZ(60px)" }}
              className="absolute top-1/2 -right-3 sm:-right-6 md:-right-8 bg-slate-900/80 backdrop-blur-xl border border-pink-500/30 p-2 sm:p-4 rounded-full shadow-[0_10px_30px_rgba(236,72,153,0.3)] group-hover:border-pink-400/80 transition-colors duration-500"
            >
              <Code className="w-4 h-4 sm:w-6 sm:h-6 text-pink-400" />
            </motion.div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
              <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                I'm Ashish Mandal, also known online as <strong className="text-white">ashistyz</strong>. I'm a passionate developer exploring the intersection of modern web technologies, artificial intelligence, and search engine optimization. I love building digital experiences that are not only visually stunning but also highly performant and discoverable.
              </p>
              <p className="text-slate-300 leading-relaxed text-lg">
                Currently, I'm focused on expanding my knowledge in AI tools to streamline development workflows and mastering SEO to ensure the content I build reaches the right audience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center gap-3 hover:bg-slate-800/50 transition-colors">
                <Code className="w-8 h-8 text-indigo-400" />
                <h3 className="font-semibold text-white">Web Development</h3>
                <p className="text-sm text-slate-400">React, Tailwind, Next.js</p>
              </div>
              <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center gap-3 hover:bg-slate-800/50 transition-colors">
                <Sparkles className="w-8 h-8 text-purple-400" />
                <h3 className="font-semibold text-white">AI Tools</h3>
                <p className="text-sm text-slate-400">Prompt Engineering, LLMs</p>
              </div>
              <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center gap-3 hover:bg-slate-800/50 transition-colors sm:col-span-2">
                <Search className="w-8 h-8 text-pink-400" />
                <h3 className="font-semibold text-white">SEO Basics</h3>
                <p className="text-sm text-slate-400">On-page, Performance, Analytics</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const MaterialModal = ({ material, onClose }: { material: Material, onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-white/10 rounded-2xl p-5 md:p-8 max-w-2xl w-full shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
            {material.icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{material.title}</h3>
            <span className="text-sm text-indigo-400 font-medium">{material.category}</span>
          </div>
        </div>

        <p className="text-slate-300 mb-8 text-lg">{material.description}</p>

        {material.youtubeId && (
          <div className="aspect-video w-full rounded-xl overflow-hidden mb-8 border border-white/10">
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${material.youtubeId}`} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          {material.pdfUrl && (
            <a href={material.pdfUrl} download className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors">
              <Download className="w-4 h-4" /> Download PDF
            </a>
          )}
          {material.externalLink && (
            <a href={material.externalLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors">
              <ExternalLink className="w-4 h-4" /> Visit Link
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const StudyMaterials = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  return (
    <section id="materials" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Study Materials</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Curated resources, notes, and tools to help you learn and grow in tech.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MATERIALS.map((material, index) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedMaterial(material)}
              className="group cursor-pointer bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(99,102,241,0.15)]"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-xl text-slate-300 group-hover:text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                  {material.icon}
                </div>
                <span className="text-xs font-medium px-3 py-1 bg-white/5 rounded-full text-slate-400">
                  {material.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">{material.title}</h3>
              <p className="text-slate-400 text-sm line-clamp-2">{material.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMaterial && (
          <MaterialModal material={selectedMaterial} onClose={() => setSelectedMaterial(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-16 md:py-24 relative bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Ongoing Projects</h2>
            <p className="text-slate-400 text-lg max-w-2xl">A glimpse into what I'm currently building and experimenting with.</p>
          </div>
        </div>

        <div className="space-y-6">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{project.title}</h3>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    project.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-slate-400 text-lg">{project.description}</p>
              </div>
              
              {project.link && (
                <a 
                  href={project.link}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-colors whitespace-nowrap"
                >
                  {project.buttonText || 'View Details'} <ChevronRight className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Socials = () => {
  return (
    <section id="socials" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Connect With Me</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Find me across the web. Let's build something amazing together.</p>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4 md:gap-8">
          {SOCIALS.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`flex flex-col items-center gap-3 p-4 sm:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl w-full sm:w-32 md:w-40 transition-all duration-300 hover:-translate-y-2 ${social.color}`}
            >
              <div className="p-4 bg-white/5 rounded-full">
                {social.icon}
              </div>
              <span className="font-medium text-sm text-slate-300">{social.name}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">ashistyz</span>
          <p className="text-slate-500 text-sm mt-2">© {new Date().getFullYear()} Ashish Mandal (ashistyz). All rights reserved.</p>
        </div>
        
        <div className="flex gap-6 text-sm font-medium text-slate-400">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#materials" className="hover:text-white transition-colors">Materials</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
        </div>
        
        <div className="text-sm text-slate-400">
          <a href="mailto:hello@ashistyz.site" className="hover:text-white transition-colors">hello@ashistyz.site</a>
        </div>
      </div>
    </footer>
  );
};

const LoadingScreen = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[200] bg-slate-950 flex items-center justify-center"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"
      />
    </motion.div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans overflow-x-hidden">
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <main>
            <Hero />
            <About />
            <StudyMaterials />
            <Projects />
            <Socials />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
