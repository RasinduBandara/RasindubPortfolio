import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion';

// Detect mobile once at module level
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler, { passive: true });
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}
import {
  Github, Linkedin, Mail, ExternalLink, Send, Heart,
  Code2, Server, Database, Layers, Wrench, ChevronDown,
  Briefcase, GraduationCap, Award, Download, Menu, X,
  MapPin, Phone, ArrowRight, Star, Zap, Globe
} from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'];

const SKILLS = [
  {
    category: 'Frontend Development',
    icon: <Code2 size={22} />,
    color: 'from-violet-500 to-purple-600',
    items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    category: 'Backend Development',
    icon: <Server size={22} />,
    color: 'from-blue-500 to-cyan-600',
    items: ['Node.js', 'Spring Boot', 'Django', 'Flask', 'Java', 'Python', 'REST APIs'],
  },
  {
    category: 'Databases',
    icon: <Database size={22} />,
    color: 'from-emerald-500 to-teal-600',
    items: ['MySQL', 'Firebase', 'MongoDB'],
  },
  {
    category: 'Tools & Technologies',
    icon: <Wrench size={22} />,
    color: 'from-orange-500 to-amber-600',
    items: ['Git', 'GitHub', 'VS Code', 'Figma', 'Postman', 'Vite'],
  },
  {
    category: 'Concepts & Architecture',
    icon: <Layers size={22} />,
    color: 'from-rose-500 to-pink-600',
    items: ['OOP', 'MVC', 'RESTful APIs', 'Multithreading', 'Concurrency', 'Responsive Design'],
  },
];

const EXPERIENCE = [
  {
    role: 'Software Engineer Intern',
    company: 'Sri Lanka Telecom (SLT)',
    period: 'Jul 2025 – Jun 2026',
    type: 'Internship',
    color: 'from-blue-500 to-cyan-500',
    highlights: [
      'Led frontend development for the SOCO project as Team Leader — attended client meetings at Sri Lanka Police HQ, translated stakeholder feedback into UI improvements, and coordinated a cross-functional team.',
      'Built and enhanced frontend interfaces across 5+ internal systems including an AI Chatbot frontend, 119 portal, Lost Phone Management System, and Seat Booking CRUD app.',
      'Developed 21 structured HTML forms for document digitalisation, enabling a paperless workflow for the police system.',
      'Delivered role-based access, biometric authentication, and QR attendance tracking for the Seat Booking system.',
    ],
    tech: ['React', 'HTML', 'CSS', 'JavaScript', 'REST APIs'],
  },
  // {
  //   role: 'Frontend Developer',
  //   company: 'DreamAuto — Group Project',
  //   period: 'Sep 2024 – Mar 2025',
  //   type: 'Project',
  //   color: 'from-violet-500 to-purple-500',
  //   highlights: [
  //     'Contributed to a full-stack ML-powered vehicle recommendation platform deployed at dreamautomart.com.',
  //     'Developed core frontend pages — Dashboard, User Profile, Vehicle Search, ML Recommendation Output, and Vehicle Comparison Tool.',
  //     'Designed and shipped a standalone marketing site for DreamAuto with a hero section, features overview, and contact form.',
  //     'Collaborated with a team of developers using Git to maintain code quality and meet milestones.',
  //   ],
  //   tech: ['Next.js', 'React', 'Flask', 'MySQL', 'TypeScript'],
  // },
  // {
  //   role: 'Backend Developer',
  //   company: 'Ticket Management System',
  //   period: 'Sep 2024 – Dec 2024',
  //   type: 'Project',
  //   color: 'from-emerald-500 to-teal-500',
  //   highlights: [
  //     'Built a real-time ticketing system using Spring Boot with robust concurrency handling.',
  //     'Applied multithreading and synchronization patterns to guarantee ticket consistency under high load.',
  //   ],
  //   tech: ['Spring Boot', 'Java', 'Multithreading'],
  // },
];

const PROJECTS = [
  {
    title: 'SOCO — Scene of Crime Operations System',
    subtitle: 'Sri Lanka Police · Live Government Project',
    description:
      'A live case management platform built for the Sri Lanka Police SOCO division. Digitises field operations with a Crime Visit Registry, Officer Management, Reports dashboard, and real-time compliance tracking. Led the UI as Team Leader, attending client meetings at SOCO HQ and iterating the interface based on direct stakeholder feedback.',
    image: '/SOCO.png',
    tags: ['React', 'HTML', 'CSS', 'JavaScript', 'REST APIs'],
    liveUrl: null,
    highlights: ['Crime Visit Registry', 'Officer Management', 'Reports Dashboard', 'Role-Based Access'],
    color: 'from-blue-700 to-cyan-700',
  },
  {
    title: 'ML-Powered Vehicle Recommendation Platform',
    subtitle: 'DreamAuto — Group Project',
    description:
      'A full-stack web application that recommends the best vehicle based on user budget and preferences. Users get personalized results through a machine learning engine, guided by an AI chatbot for finance and insurance, and can compare vehicles side by side.',
    image: '/DreamAuto.png',
    tags: ['Next.js', 'React', 'Flask', 'MySQL', 'TypeScript'],
    liveUrl: 'https://dreamautomart.com',
    highlights: ['ML Recommendation Engine', 'AI Finance Chatbot', 'Vehicle Comparison Tool', 'Buy/Sell Marketplace'],
    color: 'from-violet-600 to-blue-600',
  },
  {
    title: 'Estate Agent Property Search SPA',
    subtitle: 'Client-Side Web Application',
    description:
      'A React-based single-page application for property search and browsing. Users can filter listings by type, price, and location, save favourites to local storage, and view properties on an embedded Google Map.',
    image: '/Property.png',
    tags: ['React', 'Google Maps API', 'Local Storage', 'JSON'],
    highlights: ['Dynamic Filters', 'Favourites with LocalStorage', 'Google Maps Integration', 'Responsive Design'],
    color: 'from-emerald-600 to-teal-600',
  },
  {
    title: 'DreamAuto Marketing Site',
    subtitle: 'Responsive Landing Page',
    description:
      'A clean, responsive marketing website built for the DreamAuto platform. Features an animated hero section, features showcase, and a contact form — designed to convert visitors into platform users.',
    image: '/MarketingSite.png',
    tags: ['React', 'CSS', 'Responsive Design'],
    highlights: ['Animated Hero', 'Features Showcase', 'Contact Form', 'Mobile-First'],
    color: 'from-orange-600 to-rose-600',
  },
];

const EDUCATION = [
  {
    degree: 'BSc (Hons) in Computer Science',
    institution: 'University of Westminster — at IIT, Sri Lanka',
    period: 'Sep 2023 – Present',
    icon: <GraduationCap size={20} />,
    color: 'from-violet-500 to-purple-600',
    modules: [
      { name: 'Database Systems', grade: 81 },
      { name: 'Software Development I (Python)', grade: 64 },
      { name: 'Client-Server Architecture', grade: 61 },
      { name: 'Machine Learning & Data Mining', grade: 61 },
      { name: 'Software Development II (Java)', grade: 59 },
      { name: 'Object Oriented Programming', grade: 58 },
    ],
  },
  {
    degree: 'G.C.E Advanced Level — Physical Science',
    institution: "St. Joseph's College, Bandarawela",
    period: 'Completed 2022',
    icon: <Star size={20} />,
    color: 'from-blue-500 to-cyan-600',
    modules: [
      { name: 'Combined Mathematics', grade: null },
      { name: 'Physics', grade: null },
      { name: 'Chemistry', grade: null },
    ],
  },
];

const CERTIFICATIONS = [
  { title: 'Java OOP', issuer: 'LinkedIn Learning', icon: <Award size={18} />, color: 'text-orange-400' },
  { title: 'Spring Boot', issuer: 'LinkedIn Learning', icon: <Award size={18} />, color: 'text-green-400' },
  { title: 'React.js', issuer: 'LinkedIn Learning', icon: <Award size={18} />, color: 'text-blue-400' },
  { title: 'Object-Oriented Design', issuer: 'LinkedIn Learning', icon: <Award size={18} />, color: 'text-violet-400' },
];

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
  }),
};

// Mobile-friendly: no stagger delay, instant reveal
const fadeUpFast = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-950/90 backdrop-blur-md border-b border-white/5 shadow-xl' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.button
          onClick={() => scrollTo('hero')}
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent"
        >
          RB<span className="text-white">.</span>
        </motion.button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <motion.button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              whileHover={{ y: -2 }}
              className="text-sm text-gray-400 hover:text-white transition-colors font-medium tracking-wide"
            >
              {link}
            </motion.button>
          ))}
          <motion.a
            href="https://drive.google.com/uc?export=download&id=1QjgMnuAn_qjTGvY0XfozuLovnpF9SDfg"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm rounded-lg font-medium"
          >
            <Download size={14} /> Resume
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-300">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-950/95 backdrop-blur-md border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link.toLowerCase())}
                  className="text-left text-gray-300 hover:text-white py-2 border-b border-white/5 text-sm font-medium"
                >
                  {link}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function HeroSection() {
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, isMobile ? 0 : -80]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background — skip on mobile to save CPU/memory */}
      {!isMobile && (
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          src="/bkvideo3.mp4"
          autoPlay muted loop playsInline
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-950/50 to-gray-950" />

      {/* Ambient blobs — animated on desktop, static on mobile */}
      {!isMobile && !prefersReduced ? (
        <>
          <motion.div
            className="absolute top-1/4 -left-20 w-96 h-96 bg-violet-600 rounded-full blur-[120px] opacity-20"
            animate={{ scale: [1, 1.15, 1], x: [0, 40, 0] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          />
          <motion.div
            className="absolute bottom-1/3 -right-20 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20"
            animate={{ scale: [1.1, 1, 1.1], x: [0, -40, 0] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          />
        </>
      ) : (
        <>
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-violet-600 rounded-full blur-[100px] opacity-15 pointer-events-none" />
          <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-blue-600 rounded-full blur-[100px] opacity-15 pointer-events-none" />
        </>
      )}

      <motion.div style={{ y }} className="relative z-10 container mx-auto px-6 text-center">
        {/* Profile image */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'backOut' }}
          className="mb-8 inline-block"
        >
          <div className="relative w-36 h-36 mx-auto">
            <img
              src="/Profile.png"
              alt="Rasindu Bandara"
              className="w-full h-full rounded-full object-cover ring-4 ring-violet-500/40 shadow-2xl"
            />
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-gray-950" />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-sm mb-6 font-medium"
        >
          <Zap size={14} className="text-violet-400" />
          Open for Full-Time Opportunities
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight tracking-tight"
        >
          <span className="text-white">Rasindu</span>{' '}
          <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Bandara
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="text-xl md:text-2xl text-gray-300 mb-4 font-light"
        >
          Full Stack Developer &amp; Software Engineer Intern at{' '}
          <span className="text-blue-400 font-semibold">SLT</span>
        </motion.p>

        {/* Short bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="max-w-xl mx-auto text-gray-400 text-base md:text-lg mb-10 leading-relaxed"
        >
          CS student at IIT Sri Lanka building modern web experiences with React, Next.js, and Spring Boot.
          I write clean code, lead teams, and ship products.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139,92,246,0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl font-semibold text-sm shadow-lg"
          >
            <Globe size={16} /> View Projects
          </motion.button>
          <motion.a
            href="https://drive.google.com/uc?export=download&id=1QjgMnuAn_qjTGvY0XfozuLovnpF9SDfg"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-7 py-3.5 bg-white/5 border border-white/15 text-white rounded-xl font-semibold text-sm backdrop-blur-sm hover:bg-white/10 transition-colors"
          >
            <Download size={16} /> Download CV
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 px-7 py-3.5 bg-white/5 border border-white/15 text-white rounded-xl font-semibold text-sm backdrop-blur-sm hover:bg-white/10 transition-colors"
          >
            <Mail size={16} /> Contact Me
          </motion.button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-4"
        >
          {[
            { href: 'https://github.com/RasinduBandara/', icon: <Github size={18} />, label: 'GitHub' },
            { href: 'https://www.linkedin.com/in/rasindu-bandara-7130ab295/', icon: <Linkedin size={18} />, label: 'LinkedIn' },
            { href: 'mailto:samadith.r@gmail.com', icon: <Mail size={18} />, label: 'Email' },
          ].map(({ href, icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white text-sm transition-colors"
            >
              {icon} {label}
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  const isMobile = useIsMobile();
  return (
    <section id="about" className="py-28 bg-gray-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.06),transparent_60%)]" />
      <div className="container mx-auto px-6">
        <motion.div
          variants={isMobile ? staggerFast : stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px' }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Text */}
          <div>
            <motion.p variants={fadeUpFast} className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">
              About Me
            </motion.p>
            <motion.h2 variants={fadeUpFast} className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Developer. Problem Solver.
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Creative Thinker.
              </span>
            </motion.h2>
            <motion.p variants={fadeUpFast} className="text-gray-400 leading-relaxed mb-5 text-base">
              I'm a fourth-year Computer Science student at IIT Sri Lanka (University of Westminster),
              currently on my internship year at Sri Lanka Telecom where I work on real-world software
              systems used by government institutions.
            </motion.p>
            <motion.p variants={fadeUpFast} className="text-gray-400 leading-relaxed mb-5 text-base">
              I blend technical depth with a creative edge — shaped partly by my background as a musician.
              Whether I'm architecting a Spring Boot backend, crafting a pixel-perfect React interface,
              or leading a team through a client delivery, I bring the same focus: build something that
              works beautifully and matters to users.
            </motion.p>
            <motion.p variants={fadeUpFast} className="text-gray-400 leading-relaxed mb-8 text-base">
              My stack spans Java, Python, React, Next.js, Node.js, Django, and Spring Boot. I'm always
              learning — currently deepening expertise in system design and full-stack architecture.
            </motion.p>
            <motion.div variants={fadeUpFast} className="flex flex-wrap gap-3">
              {[
                { icon: <MapPin size={14} />, text: 'Ganemulla, Sri Lanka' },
                { icon: <GraduationCap size={14} />, text: 'IIT Sri Lanka' },
                { icon: <Briefcase size={14} />, text: 'Intern @ SLT' },
              ].map(({ icon, text }) => (
                <span
                  key={text}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-gray-400 rounded-lg text-sm"
                >
                  {icon} {text}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Stats grid */}
          <motion.div variants={staggerFast} className="grid grid-cols-2 gap-4">
            {[
              { label: 'Systems Built at SLT', value: '5+', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/20' },
              { label: 'Projects Delivered', value: '3+', color: 'from-violet-500/20 to-purple-500/20', border: 'border-violet-500/20' },
              { label: 'HTML Forms Created', value: '21', color: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/20' },
              { label: 'Certifications', value: '4', color: 'from-orange-500/20 to-amber-500/20', border: 'border-orange-500/20' },
            ].map(({ label, value, color, border }) => (
              <motion.div
                key={label}
                variants={fadeUpFast}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${color} border ${border} text-center`}
              >
                <div className="text-4xl font-extrabold text-white mb-1">{value}</div>
                <div className="text-gray-400 text-sm">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="py-28 bg-gray-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.06),transparent_60%)]" />
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px' }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Technical Skills
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white">
            What I Work With
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="bg-gray-800/60 border border-white/5 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r ${group.color} text-white text-sm font-semibold mb-5`}>
                {group.icon}
                {group.category}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-white/5 border border-white/8 text-gray-300 rounded-lg text-sm hover:border-white/20 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="py-28 bg-gray-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.06),transparent_60%)]" />
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px' }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Experience
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white">
            Where I've Worked
          </motion.h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative bg-gray-900/80 border border-white/5 rounded-2xl p-8 overflow-hidden"
            >
              {/* Accent bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b ${exp.color}`} />

              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <p className="text-gray-400 font-medium">{exp.company}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-gray-400 text-sm">{exp.period}</span>
                  <span className={`px-3 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r ${exp.color} text-white`}>
                    {exp.type}
                  </span>
                </div>
              </div>

              <ul className="space-y-2 mb-5">
                {exp.highlights.map((h, j) => (
                  <li key={j} className="flex items-start gap-2 text-gray-400 text-sm leading-relaxed">
                    <ArrowRight size={14} className="mt-1 text-violet-400 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 bg-white/5 border border-white/8 text-gray-400 rounded-md text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="py-28 bg-gray-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.05),transparent_70%)]" />
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px' }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Portfolio
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white">
            Featured Projects
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-gray-400 max-w-xl mx-auto">
            A selection of projects that showcase my technical range — from ML-powered platforms to polished SPAs.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="group bg-gray-800/60 border border-white/5 rounded-2xl overflow-hidden flex flex-col backdrop-blur-sm"
            >
              {/* Image with overlay */}
              <div className="relative overflow-hidden h-52">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

                {/* Live demo badge */}
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 bg-green-500/20 border border-green-500/40 text-green-300 rounded-full text-xs font-medium backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Globe size={10} /> Live
                  </motion.a>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <p className="text-violet-400 text-xs font-semibold uppercase tracking-wide mb-1">
                  {project.subtitle}
                </p>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-violet-300 transition-colors leading-snug">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-2 gap-1.5 mb-4">
                  {project.highlights.map((h) => (
                    <span key={h} className="flex items-center gap-1 text-gray-500 text-xs">
                      <span className="w-1 h-1 bg-violet-400 rounded-full" /> {h}
                    </span>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-white/5 border border-white/8 text-gray-400 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <motion.a
                    href="https://github.com/RasinduBandara/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-xl text-sm hover:bg-white/10 transition-colors"
                  >
                    <Code2 size={14} /> Code
                  </motion.a>
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 bg-gradient-to-r ${project.color} text-white rounded-xl text-sm font-medium`}
                    >
                      <ExternalLink size={14} /> Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section id="education" className="py-28 bg-gray-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.06),transparent_60%)]" />
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px' }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Education
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white">
            Academic Background
          </motion.h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-gray-900/80 border border-white/5 rounded-2xl p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${edu.color} text-white`}>
                    {edu.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                    <p className="text-gray-400">{edu.institution}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm bg-white/5 px-3 py-1 rounded-full">{edu.period}</span>
              </div>

              {edu.degree.includes('BSc') ? (
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-3 font-medium">Module Results</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {edu.modules.map((m) => (
                      <div key={m.name} className="flex items-center justify-between bg-white/3 border border-white/5 rounded-lg px-4 py-2">
                        <span className="text-gray-300 text-sm">{m.name}</span>
                        {m.grade !== null && (
                          <span className={`text-sm font-bold ${m.grade >= 70 ? 'text-green-400' : m.grade >= 60 ? 'text-blue-400' : 'text-gray-400'}`}>
                            {m.grade}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {edu.modules.map((m) => (
                    <span key={m.name} className="px-3 py-1 bg-white/5 border border-white/8 text-gray-400 rounded-lg text-sm">
                      {m.name}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto mt-8"
        >
          <div className="bg-gray-900/80 border border-white/5 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                <Award size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Certifications &amp; Training</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.title}
                  className="flex items-center gap-3 bg-white/3 border border-white/5 rounded-xl px-4 py-3"
                >
                  <span className={cert.color}>{cert.icon}</span>
                  <div>
                    <p className="text-white text-sm font-medium">{cert.title}</p>
                    <p className="text-gray-500 text-xs">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xovewpok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-28 bg-gray-900 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600 rounded-full blur-[160px] opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* ── Section Header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px' }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Get In Touch
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Connect
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 max-w-xl mx-auto text-base">
            I'm open to internship opportunities, freelance projects, and exciting collaborations.
            Drop me a message — I'll get back to you within 24 hours.
          </motion.p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-10">
          {/* ── Left: Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Contact info cards */}
            {[
              {
                icon: <Mail size={20} />,
                label: 'Email',
                value: 'samadith.r@gmail.com',
                href: 'mailto:samadith.r@gmail.com',
                color: 'from-rose-500 to-pink-600',
              },
              {
                icon: <Phone size={20} />,
                label: 'Phone',
                value: '+94 773 383 583',
                href: 'tel:+94773383583',
                color: 'from-green-500 to-emerald-600',
              },
              {
                icon: <MapPin size={20} />,
                label: 'Location',
                value: 'Ganemulla, Sri Lanka',
                href: null,
                color: 'from-blue-500 to-cyan-600',
              },
            ].map(({ icon, label, value, href, color }) => (
              <div
                key={label}
                className="flex items-center gap-4 bg-gray-800/60 border border-white/5 rounded-2xl p-5"
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white shrink-0`}>
                  {icon}
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">{label}</p>
                  {href ? (
                    <a href={href} className="text-white font-medium hover:text-violet-300 transition-colors text-sm">
                      {value}
                    </a>
                  ) : (
                    <p className="text-white font-medium text-sm">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="bg-gray-800/60 border border-white/5 rounded-2xl p-5">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Find me online</p>
              <div className="flex gap-3">
                {[
                  { href: 'https://github.com/RasinduBandara/', icon: <Github size={18} />, label: 'GitHub' },
                  { href: 'https://www.linkedin.com/in/rasindu-bandara-7130ab295/', icon: <Linkedin size={18} />, label: 'LinkedIn' },
                ].map(({ href, icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {icon} {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 bg-gray-800/60 border border-white/5 rounded-2xl p-8 backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-medium">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-gray-900/80 border border-white/8 text-white rounded-xl text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all placeholder:text-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-gray-900/80 border border-white/8 text-white rounded-xl text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all placeholder:text-gray-600"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-medium">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-900/80 border border-white/8 text-white rounded-xl text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all resize-none placeholder:text-gray-600"
                  required
                />
              </div>
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: status === 'sending' ? 1 : 1.02, boxShadow: '0 0 30px rgba(139,92,246,0.3)' }}
                whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl font-semibold text-sm disabled:opacity-60 transition-opacity"
              >
                <Send size={16} />
                {status === 'sending' ? 'Sending…' : status === 'sent' ? '✓ Message Sent!' : 'Send Message'}
              </motion.button>
              {status === 'error' && (
                <p className="text-red-400 text-sm text-center">Something went wrong. Try emailing me directly.</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-gray-950 border-t border-white/5">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="text-2xl font-extrabold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-3">
              RB.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Full Stack Developer &amp; CS Student. I write clean code and build meaningful products.
            </p>
            <p className="text-gray-600 text-xs mt-3 italic">
              "Code is poetry, and I write verses in React &amp; Python."
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {['about', 'skills', 'experience', 'projects', 'education', 'contact'].map((link) => (
                <li key={link}>
                  <motion.button
                    onClick={() => scrollTo(link)}
                    whileHover={{ x: 4 }}
                    className="text-gray-500 hover:text-gray-300 text-sm capitalize transition-colors"
                  >
                    {link}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:samadith.r@gmail.com" className="flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm transition-colors">
                  <Mail size={14} /> samadith.r@gmail.com
                </a>
              </li>
              <li>
                <a href="https://github.com/RasinduBandara/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm transition-colors">
                  <Github size={14} /> github.com/RasinduBandara
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/rasindu-bandara-7130ab295/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm transition-colors">
                  <Linkedin size={14} /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-sm flex items-center gap-1">
            Made with <Heart size={13} className="text-red-500" /> by Rasindu Bandara © {new Date().getFullYear()}
          </p>
          <p className="text-gray-700 text-xs">Built with React · TypeScript · Tailwind · Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      {/* <EducationSection /> */}
      <ContactSection />
      <Footer />
    </div>
  );
}


