/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Instagram, 
  Send, 
  Sparkles, 
  Code, 
  Terminal, 
  GraduationCap, 
  Sun, 
  Moon, 
  Phone, 
  ChevronRight, 
  Cpu, 
  Globe, 
  ShoppingCart, 
  CheckCircle, 
  MessageSquare, 
  User, 
  Zap, 
  Layers, 
  ArrowUp,
  Volume2,
  VolumeX,
  ExternalLink,
  Users,
  Eye,
  Heart,
  Flame,
  Github,
  Laptop
} from 'lucide-react';

// SMM Pricing and Service Data
interface SMMService {
  id: string;
  name: string;
  ratePer1000: number; // in IDR
  minQty: number;
  maxQty: number;
  refSpeed: string;
}

const smmServices: Record<string, SMMService[]> = {
  instagram: [
    { id: 'ig-fol-speed', name: 'Instagram Followers (Super Fast / Permanent Refill)', ratePer1000: 12000, minQty: 100, maxQty: 50000, refSpeed: '10K - 20K per Day' },
    { id: 'ig-likes-hq', name: 'Instagram Likes (Real HQ Profiles / Instant)', ratePer1000: 4500, minQty: 100, maxQty: 25000, refSpeed: 'Instant Delivery' },
    { id: 'ig-views-reels', name: 'Instagram Reels Views Limitless (Viral Boost)', ratePer1000: 2000, minQty: 200, maxQty: 100000, refSpeed: 'Super Instant (V-Launch)' }
  ],
  tiktok: [
    { id: 'tt-fol-active', name: 'TikTok Followers (Aktif Indo / No Drop)', ratePer1000: 18000, minQty: 100, maxQty: 30000, refSpeed: 'Organic Velocity' },
    { id: 'tt-likes-instant', name: 'TikTok Likes (Super Instant & Safe)', ratePer1000: 7000, minQty: 100, maxQty: 50000, refSpeed: 'Instant 24/7' },
    { id: 'tt-views-rekom', name: 'TikTok Views FYP Booster (Extreme Traffic)', ratePer1000: 1500, minQty: 500, maxQty: 500000, refSpeed: '1M views / Day' }
  ],
  shopee: [
    { id: 'sp-fol-store', name: 'Shopee Followers Toko (Naikin Penjualan!)', ratePer1000: 24000, minQty: 100, maxQty: 10000, refSpeed: 'Safe Drip-feed' },
    { id: 'sp-live-boost', name: 'Shopee Live Streaming Views (Stay 30 Min)', ratePer1000: 38000, minQty: 50, maxQty: 1000, refSpeed: 'Fast Join Session' }
  ],
  youtube: [
    { id: 'yt-sub-perm', name: 'YouTube Subscribers Permanent (Garansi 30 Hari)', ratePer1000: 125000, minQty: 50, maxQty: 5000, refSpeed: '100 - 300 per Day' },
    { id: 'yt-views-seot', name: 'YouTube Views SEO Targeted (Monetization Safe)', ratePer1000: 22000, minQty: 500, maxQty: 100000, refSpeed: 'High Watch-time' }
  ],
  telegram: [
    { id: 'tg-sub-chan', name: 'Telegram Channel/Group Members (Non-Drop)', ratePer1000: 9500, minQty: 100, maxQty: 100000, refSpeed: 'Fast Feed' },
    { id: 'tg-post-v', name: 'Telegram Post Views (Auto Boost Last 5 Posts)', ratePer1000: 3000, minQty: 200, maxQty: 50000, refSpeed: 'Instant Setup' }
  ],
};

const codingProjects = [
  {
    title: 'FidzSMM Panel API Integration Router',
    descriptionID: 'Sistem integrasi API panel SMM multi-provider dengan sistem routing pintar untuk menyalurkan pesanan ke server termurah secara otomatis.',
    descriptionEN: 'Multi-provider SMM panel API integration system with smart routing system to distribute orders automatically to the cheapest tier.',
    tech: ['Node.js', 'Express', 'Aesthetic WebSocket', 'MongoDB'],
    codeSnippet: `// SMM Routing Algorithm v3.1\nconst routeOrder = async (orderData) => {\n  const providers = await Provider.find({ active: true });\n  const optimalProvider = providers.reduce((prev, curr) => \n    (prev.baseCost < curr.baseCost) ? prev : curr\n  );\n  console.log(\`⚡ Order routed to: \${optimalProvider.name}\`);\n  return await pushAPIToSMM(optimalProvider.endpoint, orderData);\n};`
  },
  {
    title: 'Instagram Auto-Interaction Engine',
    descriptionID: 'Bot otomasi pencarian hashtag dan auto-comment cerdas berbasis headless browser yang aman dari shadowban.',
    descriptionEN: 'Headless browser automation engine for research hashtags and secure auto-interactions constructed to prevent flags.',
    tech: ['Puppeteer', 'JavaScript', 'Node-Scheduler'],
    codeSnippet: `// Node anti-ban mouse humanization factor\nasync function humanMove(page, element) {\n  const rect = await element.boundingBox();\n  const x = rect.x + rect.width / 2 + (Math.random() - 0.5) * 5;\n  const y = rect.y + rect.height / 2 + (Math.random() - 0.5) * 5;\n  await page.mouse.move(x, y, { steps: 25 });\n  await page.mouse.down();\n  await page.mouse.up();\n}`
  },
  {
    title: 'Universitas Ma\'arif Lampung Campus Community Web',
    descriptionID: 'Portal web kolaboratif interaktif mahasiswa UMALA untuk bertarung dalam kompetisi pemrograman lokal dan berbagi tips teknologi.',
    descriptionEN: 'Interactive collaborative community web for UMALA students to compete in local code contests and share tech portfolios.',
    tech: ['React', 'TailwindCSS', 'Firebase Auth', 'Firestore'],
    codeSnippet: `// Real-time campus challenge listeners\nexport function useUMALAChallenges() {\n  const [challenges, setChallenges] = useState([]);\n  useEffect(() => {\n    const q = query(collection(db, "umala-events"), orderBy("date", "desc"));\n    return onSnapshot(q, (snapshot) => {\n      setChallenges(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));\n    });\n  }, []);\n  return challenges;\n}`
  }
];

export default function App() {
  // Application Modes and State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [currentLang, setCurrentLang] = useState<'ID' | 'EN'>('ID');
  
  // SMM Calculator Parameters
  const [selectedPlatform, setSelectedPlatform] = useState<string>('instagram');
  const [servicesList, setServicesList] = useState<SMMService[]>(smmServices.instagram);
  const [selectedService, setSelectedService] = useState<SMMService>(smmServices.instagram[0]);
  const [boostQty, setBoostQty] = useState<number>(1000);
  
  // Custom Live System Simulation variables
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'System: fidz.net dev console initialized.',
    'System: Looking for Universitas Ma\'arif Lampung secure servers...',
    'System: All nodes operational. (Vite HMR: disabled)'
  ]);
  const [activeCodeTab, setActiveCodeTab] = useState<number>(0);
  const [isRunningCode, setIsRunningCode] = useState<boolean>(false);
  
  // AI Chat Bot Integration States
  const [chatInput, setChatInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'bot'; text: string; time: string }[]>([
    {
      sender: 'bot',
      text: 'Halo! Saya Fidz AI, asisten cerdas virtual Ahmad Hafidz. Ada yang bisa saya bantu tentang layanan Tembak Followers semua social media, perkuliahan di Universitas Ma\'arif Lampung (UMALA), atau pembuatan website kustom Javascript & Node.js?\n\n(Hello! I am Fidz AI, Ahmad Hafidzs virtual assistant. How can I assist you with follower boosters, his campus life at UMALA, or JavaScript/Node.js web development?)',
      time: '05:09'
    }
  ]);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [showFloatingAi, setShowFloatingAi] = useState<boolean>(true);

  // Live Statistics Simulation (Ticking Counters for authentic modern look)
  const [totalBoosted, setTotalBoosted] = useState<number>(1482924);
  const [activeThreads, setActiveThreads] = useState<number>(12);
  const [apiConnections, setApiConnections] = useState<number>(54);

  // Particle Canvas Settings
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto Scroll Chat to Bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Synchronize platform changes with service dropdown initial selection
  useEffect(() => {
    const list = smmServices[selectedPlatform] || [];
    setServicesList(list);
    if (list.length > 0) {
      setSelectedService(list[0]);
      setBoostQty(list[0].minQty);
    }
  }, [selectedPlatform]);

  // Toggle Dark/Light Mode
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Incremental Statistics Tick Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalBoosted(prev => prev + Math.floor(Math.random() * 5) + 1);
      if (Math.random() > 0.8) {
        setActiveThreads(prev => {
          const delta = Math.random() > 0.5 ? 1 : -1;
          const newVal = prev + delta;
          return newVal >= 8 && newVal <= 18 ? newVal : prev;
        });
      }
      if (Math.random() > 0.95) {
        setApiConnections(prev => prev + (Math.random() > 0.5 ? 2 : -2));
      }
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // 3D/2D Mesh Particle Node Net Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width = canvas.parentElement?.clientWidth || 800;
    let height = canvas.height = canvas.parentElement?.clientHeight || 500;

    // Handle canvas resizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Particle nodes properties
    const numParticles = 45;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];

    const colors = isDarkMode 
      ? ['#a78bfa', '#60a5fa', '#c084fc', '#8b5cf6', '#3b82f6'] // Glowing purples/blues
      : ['#8b5cf6', '#3b82f6', '#7c3aed', '#2563eb', '#9333ea'];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Mouse movement interactive trigger
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Render aesthetic background grid line mesh on dark mode
      if (isDarkMode) {
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.05)';
        ctx.lineWidth = 1;
        const gridSize = 40;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // Draw and move points
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on borders
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle representation
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Glow effects around particle
        ctx.shadowBlur = p.radius * 2;
        ctx.shadowColor = p.color;
      });

      // Draw active connections
      ctx.shadowBlur = 0;
      for (let i = 0; i < numParticles; i++) {
        for (let j = i + 1; j < numParticles; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Dynamic transparency based on node proximity
            const alpha = (1 - dist / 110) * (isDarkMode ? 0.25 : 0.15);
            ctx.strokeStyle = isDarkMode ? `rgba(139, 92, 246, ${alpha})` : `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Mouse interactive linkages
      if (mouse.x > -1000) {
        particles.forEach(p => {
          const mDist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (mDist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            const mAlpha = (1 - mDist / 140) * 0.45;
            ctx.strokeStyle = `rgba(59, 130, 246, ${mAlpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Connect mouse aura with secondary visual ring
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#60a5fa';
            ctx.fill();
          }
        });
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDarkMode]);

  // Execute Mock Programming Code in the sandbox terminal emulator
  const triggerCodeExecution = () => {
    if (isRunningCode) return;
    setIsRunningCode(true);
    const selectedProj = codingProjects[activeCodeTab];
    
    setTerminalOutput(prev => [
      ...prev,
      `> node index.js --project="${selectedProj.title.substring(0, 15)}"`,
      `[info] Compiling ${selectedProj.title} source code.`,
      '[loader] Transpiling structures...',
    ]);

    let step = 0;
    const steps = [
      () => `[info] Binding local SMM API network triggers at Universitas Ma'arif Lampung pipeline...`,
      () => `[debug] Connecting secure web sockets. Node state: OK. Active listeners: ${activeThreads}`,
      () => `[trace] Running micro-benchmarks for custom JS callbacks... Done in 32ms.`,
      () => `✔ Success! System script for "${selectedProj.title}" executed cleanly. Status: Live.`,
    ];

    const timer = setInterval(() => {
      if (step < steps.length) {
        setTerminalOutput(prev => [...prev, steps[step]()]);
        step++;
      } else {
        clearInterval(timer);
        setIsRunningCode(false);
      }
    }, 1200);
  };

  // Chat Submission handler to backend server API proxy
  const submitChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isAiLoading) return;

    const userMsg = chatInput;
    setChatInput('');

    // Append user's chat message to local state
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newHistory = [...chatMessages, { sender: 'user' as const, text: userMsg, time: timeStr }];
    setChatMessages(newHistory);
    setIsAiLoading(true);

    try {
      // Reformat message history safely as expected by backend chat wrapper
      const historyPayload = chatMessages.slice(-8).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: historyPayload
        })
      });

      const data = await res.json();
      const botTime = new Date();
      const botTimeStr = `${String(botTime.getHours()).padStart(2, '0')}:${String(botTime.getMinutes()).padStart(2, '0')}`;

      if (data.response) {
        setChatMessages(prev => [...prev, { sender: 'bot', text: data.response, time: botTimeStr }]);
      } else {
        setChatMessages(prev => [
          ...prev, 
          { 
            sender: 'bot', 
            text: 'Maaf, server AI sedang diproses. Silakan hubungi Ahmad Hafidz langsung ya via WhatsApp!', 
            time: botTimeStr 
          }
        ]);
      }
    } catch (err) {
      console.error(err);
      const errTimeStr = `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`;
      setChatMessages(prev => [
        ...prev, 
        { 
          sender: 'bot', 
          text: 'Oops, koneksi server terputus. Pastikan server lokal Anda aktif. Hubungi Ahmad Hafidz di WhatsApp +62831-6821-3786 untuk perbaikan.', 
          time: errTimeStr 
        }
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Prefilled SMM chip simulation helper
  const handleChipSelection = (chipQuestion: string) => {
    setChatInput(chipQuestion);
  };

  // Formats price values nicely to Indonesian Rupiah IDR and roughly USD
  const pricingIDR = (selectedService.ratePer1000 / 1000) * boostQty;
  const pricingUSD = pricingIDR / 15000;

  // Compile WhatsApp URL dynamically and securely
  const getWhatsAppURL = () => {
    const messageText = `Halo Ahmad Hafidz (fidz.net), saya ingin order jasa SMM berikut:\n\n` +
      `- Platform: ${selectedPlatform.toUpperCase()}\n` +
      `- Layanan: ${selectedService.name}\n` +
      `- Jumlah: ${boostQty} Followers/Views\n` +
      `- Estimasi Harga: Rp ${pricingIDR.toLocaleString('id-ID')} (~$${pricingUSD.toFixed(2)})\n\n` +
      `Silakan infokan instruksi pembayaran selanjutnya ya mas Hafidz!`;
    return `https://api.whatsapp.com/send?phone=6283168213786&text=${encodeURIComponent(messageText)}`;
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${isDarkMode ? 'bg-[#0b0816] text-[#dad6ef]' : 'bg-[#f5f4fc] text-[#2c2744]'}`}>
      
      {/* 3D Wireframe Floating Particles Backdrop in Hero */}
      <div className="absolute top-0 left-0 w-full h-[650px] pointer-events-none z-0 overflow-hidden opacity-85">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0816]/30 to-inherit pointer-events-none" />
      </div>

      {/* Aesthetic Top Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 border-violet-500/15 bg-[#0b0816]/75 dark:bg-[#0b0816]/75 light:bg-[#f5f4fc]/85">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo Brand: Icon and Name "fidz.net" */}
          <a href="#" className="flex items-center gap-2.5 group cursor-pointer" id="logo-branding-link">
            <div className="relative w-11 h-11 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform duration-300 bg-slate-950/40 border border-violet-500/25 backdrop-blur-md overflow-hidden" id="custom-logo-container">
              {/* Glowing background highlights */}
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/20 via-violet-600/20 to-fuchsia-500/25 blur-sm opacity-80" />
              
              {/* Glass reflection shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
              
              {/* Styled Cyber Lettering for 'FS' */}
              <div className="relative font-mono font-extrabold text-sm sm:text-base tracking-tighter flex items-center justify-center select-none" id="logo-letters">
                <span className="text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]">F</span>
                <span className="text-fuchsia-500 drop-shadow-[0_0_6px_rgba(217,70,239,0.7)] -ml-0.5">S</span>
              </div>
              
              {/* Sleek cyber border brackets */}
              <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-cyan-400/70" />
              <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-fuchsia-500/70" />
              
              {/* Pulsing neon frame */}
              <div className="absolute inset-0 border border-violet-500/20 rounded-xl group-hover:border-violet-400/40 transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="font-['Space_Grotesk'] font-bold text-xl tracking-tight bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent group-hover:text-blue-300 transition-colors">
                fidz.net
              </span>
              <span className="text-[10px] tracking-wider opacity-60 uppercase font-mono">By Hafidz</span>
            </div>
          </a>

          {/* Nav items */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
            <a href="#services" className="hover:text-violet-400 transition-colors">SMM Booster</a>
            <a href="#coding" className="hover:text-blue-400 transition-colors">Coding Lab</a>
            <a href="#academic" className="hover:text-violet-400 transition-colors">UMALA Profile</a>
            <a href="#ai-assistant" className="hover:text-blue-400 transition-colors">Fidz AI</a>
            <a href="#about" className="hover:text-violet-400 transition-colors">About</a>
          </nav>

          {/* Right Accessories: Lang and Mode toggles */}
          <div className="flex items-center gap-3">
            {/* Bilingual toggle */}
            <button 
              onClick={() => setCurrentLang(prev => prev === 'ID' ? 'EN' : 'ID')}
              className="p-1 px-2.5 rounded-lg text-xs font-bold font-mono transition-colors border border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/15"
              id="lang-toggle-btn"
              title="Ganti Bahasa / Switch Language"
            >
              🌐 {currentLang === 'ID' ? 'BAHASA' : 'ENGLISH'}
            </button>

            {/* Dark/Light mode switch */}
            <button
              onClick={() => setIsDarkMode(prev => !prev)}
              aria-label="Toggle Theme Mode"
              className="p-2 rounded-xl border transition-all duration-300 border-violet-500/20 hover:border-violet-500/40 bg-violet-500/5 hover:bg-violet-500/10"
              id="theme-toggle-btn"
            >
              {isDarkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-violet-600" />}
            </button>

            {/* Quick Contact Primary CTA */}
            <a 
              href="https://api.whatsapp.com/send?phone=6283168213786"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-xs font-bold px-4 h-9 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white shadow-md shadow-violet-500/10 hover:shadow-violet-500/25 transition-all duration-300 hover:-translate-y-0.5"
              id="nav-quick-cta"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10">

        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="hero-block">
          
          {/* Hero Content Left */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col gap-6 text-left" 
            id="hero-description-block bg-opacity-20"
          >
            
            {/* Status Batch */}
            <div className="inline-flex self-start items-center gap-1.5 px-3 h-7 rounded-full text-xs font-medium border border-violet-500/25 bg-violet-500/10 text-violet-300 shadow-sm animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span>Universitas Ma'arif Lampung Computer Science Cadet</span>
            </div>

            {/* Main Header / Greet */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-wide text-blue-400">
                Hi, I'm Ahmad Hafidz
              </h2>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-['Space_Grotesk'] font-extrabold tracking-tight leading-none text-neon-glow">
                Welcome to <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">fidz.net</span>
              </h1>
            </div>

            {/* Aesthetic Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg opacity-85 leading-relaxed font-sans max-w-xl">
              {currentLang === 'ID' 
                ? 'Web Portofolio interaktif & SMM panel termurah untuk boost reputasi digital Anda. Saya mahasiswa Universitas Ma\'arif Lampung yang fokus mengawinkan teknik optimasi media sosial (Instagram, TikTok, Shopee, YT etc.) dengan kodingan Javascript, Node.js serta sistem otomatisasi cerdas!'
                : 'Interactive Portfolio Web & leading high-speed SMM booster to supercharge your digital authority. Engineering student at Universitas Ma\'arif Lampung focused on merging absolute social platform boosting (Instagram, TikTok, YT etc.) with high-level JS coding operations!'}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#services" 
                className="px-6 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 font-bold text-sm tracking-wide text-white shadow-lg shadow-violet-600/35 hover:shadow-violet-600/50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                id="hero-boost-btn"
              >
                <ShoppingCart className="w-4.5 h-4.5" />
                <span>{currentLang === 'ID' ? 'Tembak Followers Sekarang' : 'Launch Followers Booster'}</span>
              </a>

              <a 
                href="#ai-assistant" 
                className="px-6 h-12 rounded-xl border border-violet-500/25 bg-violet-500/5 hover:bg-violet-500/10 font-bold text-sm tracking-wide transition-all duration-300 hover:border-violet-500/50 hover:-translate-y-1 flex items-center justify-center gap-2"
                id="hero-chat-btn"
              >
                <Sparkles className="w-4.5 h-4.5 text-blue-400" />
                <span>{currentLang === 'ID' ? 'Tanya Cerdas AI' : 'Talk with AI Coordinator'}</span>
              </a>
            </div>

            {/* Fast Features list */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-violet-500/10 text-xs font-mono">
              <div className="flex flex-col gap-1">
                <span className="text-violet-400 font-bold text-sm">✓ SECURE & FAST</span>
                <span className="opacity-60">{currentLang === 'ID' ? 'Tanpa Password' : 'No Password Needed'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-blue-400 font-bold text-sm">✓ NODE.JS BACKED</span>
                <span className="opacity-60">{currentLang === 'ID' ? 'Otomasi Lancar' : 'Robotic Automation'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-fuchsia-400 font-bold text-sm">✓ 24/7 CUSTOMER</span>
                <span className="opacity-60">{currentLang === 'ID' ? 'Konsultasi UMALA' : 'UMALA Campus Direct'}</span>
              </div>
            </div>

          </motion.div>

          {/* Hero Geometric 3D Responsive Cube Right */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="lg:col-span-5 flex justify-center py-6 relative" 
            id="hero-geometric-3d-cube"
          >
            
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 group">
              {/* Outer Glowing Gradients */}
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-600 via-[#8b5cf6]/20 to-blue-500 rounded-3xl blur-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-1000 -z-10" />

              {/* 3D Interactive Rotating Visual Representation Box */}
              <div className="absolute inset-0 bg-[#120a2a]/80 dark:bg-[#120a2a]/80 light:bg-white border border-violet-500/30 rounded-2xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden group-hover:border-violet-500/60 transition-all duration-500">
                
                {/* Simulated Server Card Header */}
                <div className="flex items-center justify-between border-b border-violet-500/10 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-mono text-xs font-bold tracking-wider uppercase">FidzCore VM Node_1</span>
                  </div>
                  <Cpu className="w-5 h-5 text-violet-400 animate-spin" style={{ animationDuration: '8s' }} />
                </div>

                {/* Simulated Holographic Graph Visuals */}
                <div className="flex-grow py-6 flex flex-col justify-center gap-4 relative">
                  
                  {/* Decorative orbital wireframe circles simulating 3D orbits */}
                  <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] w-48 h-48 rounded-full border border-violet-500/15 animate-spin" style={{ animationDuration: '12s' }} />
                  <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] w-36 h-36 rounded-full border border-blue-500/10 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
                  
                  {/* Digital Core Stat display */}
                  <div className="text-center z-10 flex flex-col gap-1">
                    <span className="text-[10px] tracking-widest font-mono text-blue-400 uppercase">Booster Throughput</span>
                    <span className="text-3xl font-['Space_Grotesk'] font-extrabold tracking-tight bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                      {totalBoosted.toLocaleString()}
                    </span>
                    <span className="text-[9px] font-mono opacity-50">REQ / SEC: 452.91</span>
                  </div>

                  {/* System visual bars */}
                  <div className="flex flex-col gap-2 z-10">
                    <div className="flex justify-between text-[9px] font-mono opacity-80">
                      <span>Server Load (SMM Node)</span>
                      <span>{Math.floor((totalBoosted % 20) + 45)}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-violet-950/40 relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-600 to-blue-500 transition-all duration-500" style={{ width: `${Math.floor((totalBoosted % 20) + 45)}%` }} />
                    </div>
                  </div>

                </div>

                {/* Footer simulation details */}
                <div className="border-t border-violet-500/10 pt-4 flex justify-between text-[10px] font-mono opacity-60">
                  <span>IP: 103.88.241.*</span>
                  <span>UMALA Net Proxy</span>
                </div>

              </div>

              {/* Orbital Badge "AI Integrated" */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-[10px] font-bold tracking-wider font-mono px-3.5 py-1.5 rounded-full shadow-lg border border-violet-400/20 flex items-center gap-1 hover:scale-105 transition-transform">
                <Sparkles className="w-3 h-3 text-amber-300 animate-bounce" />
                <span>AI INTEGRATED</span>
              </div>

              {/* Static Glowing Nodes decorative */}
              <div className="absolute bottom-2 -left-3 w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 animate-bounce" />
              <div className="absolute top-10 -right-2 w-3.5 h-3.5 rounded-full bg-violet-500 shadow-lg shadow-violet-500/50 animate-ping" style={{ animationDuration: '3s' }} />

            </div>

          </motion.div>

        </section>

        {/* CONTINOUS REALTIME METRIC DASHBAR (Dynamic indicators for aesthetic "rame") */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative w-full border-y border-violet-500/15 bg-violet-950/15 backdrop-blur-sm py-6 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="flex flex-col gap-1 items-center">
              <Users className="w-5 h-5 text-violet-400 mb-1" />
              <span className="text-xs font-mono opacity-60 uppercase">{currentLang === 'ID' ? 'Total Boost Sosmed' : 'Total Boost Delivery'}</span>
              <span className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-violet-400">{totalBoosted.toLocaleString()}+</span>
            </div>

            <div className="flex flex-col gap-1 items-center border-l border-violet-500/10">
              <CheckCircle className="w-5 h-5 text-emerald-400 mb-1" />
              <span className="text-xs font-mono opacity-60 uppercase">{currentLang === 'ID' ? 'Tingkat Keberhasilan' : 'Completion Rate'}</span>
              <span className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-emerald-400">99.98%</span>
            </div>

            <div className="flex flex-col gap-1 items-center border-l border-violet-500/10">
              <Cpu className="w-5 h-5 text-blue-400 mb-1" />
              <span className="text-xs font-mono opacity-60 uppercase">{currentLang === 'ID' ? 'Active Multi-Thread' : 'Active Multi-Threads'}</span>
              <span className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-blue-400">{activeThreads} Threads</span>
            </div>

            <div className="flex flex-col gap-1 items-center border-l border-violet-500/10">
              <Zap className="w-5 h-5 text-amber-400 mb-1" />
              <span className="text-xs font-mono opacity-60 uppercase">{currentLang === 'ID' ? 'Otomasi Server Proxy' : 'Automation APIs'}</span>
              <span className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-amber-400">{apiConnections} Sockets</span>
            </div>

          </div>
        </motion.div>

        {/* SECTION SMM PANEL PANEL BOOSTER (Tembak Followers) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-10" id="services">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.7, ease: "easeOut" }} 
            className="w-full flex flex-col"
          >
            <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-12">
            <span className="text-xs font-bold tracking-widest text-violet-400 uppercase font-mono bg-violet-500/10 px-3 py-1 rounded-full self-center">
              AUTOMATED BOOSTER HUB
            </span>
            <h2 className="text-3xl sm:text-4xl font-['Space_Grotesk'] font-extrabold tracking-tight">
              {currentLang === 'ID' ? 'Pusat Tembak Followers & Booster Sosmed' : 'Social Media Booster Panel & Followers Shot'}
            </h2>
            <p className="text-sm opacity-80">
              {currentLang === 'ID' 
                ? 'Layanan penambah followers, views, likes, dan shares instan untuk membangun kredibilitas profil toko online atau pribadi Anda. Tanpa memerlukan password akun, 100% aman dan permanen.'
                : 'Boost your digital visibility with rapid, premium automated followers, targeted views, and high impact social boosts. No credentials or password requested, absolutely secure and permanent.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Interactive SMM Calculator Form Area (Left) */}
            <div className="lg:col-span-7 neon-glass p-6 sm:p-8 rounded-2xl flex flex-col justify-between border-violet-500/20 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 blur-2xl rounded-full pointer-events-none" />
              
              <div className="flex flex-col gap-6">
                
                {/* Platform Selector Tabs */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono font-bold uppercase opacity-80">
                    1. {currentLang === 'ID' ? 'Pilih Platform Sosial Mediaku' : 'Select Destination Platform'}:
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                    
                    <button
                      onClick={() => setSelectedPlatform('instagram')}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all duration-300 ${
                        selectedPlatform === 'instagram'
                          ? 'bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white border-transparent shadow-lg shadow-fuchsia-500/20 scale-102'
                          : 'bg-violet-500/5 hover:bg-violet-500/10 border-violet-500/10'
                      }`}
                    >
                      <Instagram className="w-5 h-5 mb-1.5" />
                      <span>Instagram</span>
                    </button>

                    <button
                      onClick={() => setSelectedPlatform('tiktok')}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all duration-300 ${
                        selectedPlatform === 'tiktok'
                          ? 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white border-transparent shadow-lg shadow-blue-500/20 scale-102'
                          : 'bg-violet-500/5 hover:bg-violet-500/10 border-violet-500/10'
                      }`}
                    >
                      <Flame className="w-5 h-5 mb-1.5 text-orange-400" />
                      <span>TikTok</span>
                    </button>

                    <button
                      onClick={() => setSelectedPlatform('shopee')}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all duration-300 ${
                        selectedPlatform === 'shopee'
                          ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white border-transparent shadow-lg shadow-orange-500/20 scale-102'
                          : 'bg-violet-500/5 hover:bg-violet-500/10 border-violet-500/10'
                      }`}
                    >
                      <ShoppingCart className="w-5 h-5 mb-1.5" />
                      <span>Shopee</span>
                    </button>

                    <button
                      onClick={() => setSelectedPlatform('youtube')}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all duration-300 ${
                        selectedPlatform === 'youtube'
                          ? 'bg-gradient-to-br from-red-600 to-crimson-700 text-white border-transparent shadow-lg shadow-red-500/20 scale-102'
                          : 'bg-violet-500/5 hover:bg-violet-500/10 border-violet-500/10'
                      }`}
                    >
                      <Globe className="w-5 h-5 mb-1.5" />
                      <span>YouTube</span>
                    </button>

                    <button
                      onClick={() => setSelectedPlatform('telegram')}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all duration-300 ${
                        selectedPlatform === 'telegram'
                          ? 'bg-gradient-to-br from-blue-500 to-sky-600 text-white border-transparent shadow-lg shadow-sky-500/20 scale-102'
                          : 'bg-violet-500/5 hover:bg-violet-500/10 border-violet-500/10'
                      }`}
                    >
                      <Send className="w-5 h-5 mb-1.5 text-sky-300" />
                      <span>Telegram</span>
                    </button>

                  </div>
                </div>

                {/* Service Dropdown */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono font-bold uppercase opacity-80" htmlFor="smm-service-select">
                    2. {currentLang === 'ID' ? 'Pilih Paket Booster Termurah' : 'Choose Best Booster Service'}:
                  </label>
                  <select
                    id="smm-service-select"
                    value={selectedService?.id || ''}
                    onChange={(e) => {
                      const found = servicesList.find(s => s.id === e.target.value);
                      if (found) {
                        setSelectedService(found);
                        setBoostQty(found.minQty);
                      }
                    }}
                    className="w-full h-12 px-4 rounded-xl border focus:outline-none focus:ring-2 bg-[#0d091e] border-violet-500/20 text-[#dad6ef] focus:ring-violet-500/50 focus:border-violet-500"
                  >
                    {servicesList.map(item => (
                      <option key={item.id} value={item.id} className="bg-[#0b0816]">
                        {item.name} - Rp {(item.ratePer1000).toLocaleString('id-ID')} / 1K
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity Range slider with instant calculation */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-mono font-bold uppercase opacity-80" htmlFor="smm-quantity-slider">
                      3. {currentLang === 'ID' ? 'Setel Jumlah Followers / Views' : 'Adjust Target Quantity'}:
                    </label>
                    <span className="text-sm font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded">
                      {boostQty.toLocaleString()} items
                    </span>
                  </div>
                  <input
                    id="smm-quantity-slider"
                    type="range"
                    min={selectedService?.minQty || 100}
                    max={selectedService?.maxQty || 50000}
                    step={100}
                    value={boostQty}
                    onChange={(e) => setBoostQty(parseInt(e.target.value))}
                    className="w-full accent-violet-600 cursor-pointer h-2 bg-violet-950/40 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] font-mono opacity-60">
                    <span>Min: {(selectedService?.minQty || 100).toLocaleString()}</span>
                    <span>Max: {(selectedService?.maxQty || 50000).toLocaleString()}</span>
                  </div>
                </div>

                {/* Interactive pricing display */}
                <div className="p-4 rounded-xl bg-[#090615] border border-violet-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex flex-col gap-1 text-center sm:text-left">
                    <span className="text-[10px] font-mono opacity-60 uppercase">{currentLang === 'ID' ? 'Estimasi Harga Total' : 'Calculated Cost Estimation'}</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#9333ea] dark:text-[#a78bfa] light:text-[#7c3aed]">
                      Rp {pricingIDR.toLocaleString('id-ID')}
                    </span>
                  </div>
                  
                  {/* English Equivalent Equivalent card */}
                  <div className="flex items-center gap-2 bg-violet-500/5 p-3 rounded-lg border border-violet-500/10">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono opacity-50 uppercase">Bilingual Rate</span>
                      <span className="text-xs font-mono font-bold text-blue-300">~USD ${pricingUSD.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Instant WhatsApp Order Trigger */}
              <div className="pt-6">
                <a
                  href={getWhatsAppURL()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-14 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                  id="checkout-order-link"
                >
                  <Send className="w-5 h-5 text-white" />
                  <span>
                    {currentLang === 'ID' 
                      ? 'Tembak Followers via WhatsApp Fast Respon ⚡' 
                      : 'Purchase Follower Booster via WhatsApp Direct ⚡'}
                  </span>
                </a>
                <p className="text-center text-[10px] opacity-50 font-mono mt-3">
                  {currentLang === 'ID' 
                    ? '⚡ Proses otomatis 10-60 menit setelah pembayaran aman via DANA / QRIS / GoPay / Bank Transfer.'
                    : '⚡ Automated queues launch 10-60m post secured validation (QRIS, Crypto, PayPal, Wise, DANA, GoPay).'}
                </p>
              </div>

            </div>

            {/* SMM Feature Details & Client Grid (Right) */}
            <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6" id="smm-info-grid">
              
              {/* Features Card list */}
              <div className="neon-glass-blue p-6 rounded-2xl border-blue-500/20 flex flex-col gap-6">
                <h3 className="font-['Space_Grotesk'] font-bold text-lg text-blue-400 flex items-center gap-2 border-b border-blue-500/10 pb-3">
                  <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
                  <span>{currentLang === 'ID' ? 'Fitur & Keamanan Premium' : 'Premium Boost Architectures'}</span>
                </h3>

                <ul className="flex flex-col gap-4 text-xs font-sans">
                  
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-violet-600/20 flex items-center justify-center shrink-0 text-violet-400 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <strong className="text-sm">No Credentials Allowed (Sangat Aman)</strong>
                      <p className="opacity-70 mt-0.5">
                        {currentLang === 'ID'
                          ? 'Kami hanya membutuhkan username atau link postingan sosmed Anda. Jangan pernah memberikan password kepada siapa pun!'
                          : 'Only your social username or public post link is requested. Absolutely zero risk of profile breaches or warning flags.'}
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-blue-600/20 flex items-center justify-center shrink-0 text-blue-400 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <strong className="text-sm">Permanent High Quality Refill System</strong>
                      <p className="opacity-70 mt-0.5">
                        {currentLang === 'ID'
                          ? 'Sistem pemicu optimasi otomatis berbasis server Node.js memantau kestabilan followers Anda dan melakukan refill berkala garansi.'
                          : 'Proline Node-monitors observe client retention. Automated refills kick in instantly if platform purges occur.'}
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-purple-600/20 flex items-center justify-center shrink-0 text-purple-400 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <strong className="text-sm">Instant API Execution Queue</strong>
                      <p className="opacity-70 mt-0.5">
                        {currentLang === 'ID'
                          ? 'Setiap transfer pesanan langsung disubmit secara real-time melalui WebSocket gateway server kami.'
                          : 'Orders pipe automatically to active cluster queues instantly, minimizing starting latency to seconds.'}
                      </p>
                    </div>
                  </li>

                </ul>
              </div>

              {/* Interactive SMM Panel Real-time Status Card */}
              <div className="neon-glass p-6 rounded-2xl border-violet-500/20 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold font-mono tracking-widest text-[#a78bfa] uppercase mb-3">
                    SMM LIVE TELEMETRY
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono mb-4">
                    <div className="p-3 bg-violet-500/5 rounded-xl border border-violet-500/10">
                      <span className="opacity-60 block">IG Server 01</span>
                      <strong className="text-emerald-400">● 100% ONLINE</strong>
                    </div>
                    <div className="p-3 bg-violet-500/5 rounded-xl border border-violet-500/10">
                      <span className="opacity-60 block">TikTok API Gate</span>
                      <strong className="text-emerald-400">● STABLE</strong>
                    </div>
                  </div>
                  <p className="text-[10px] opacity-70 tracking-tight leading-normal">
                    {currentLang === 'ID'
                      ? 'Menghubungkan Universitas Ma\'arif Lampung IP cluster dengan 14 database provider optimasi global.'
                      : 'Bridging Lampung UMALA networks directly with premium global master distributor automated booster grids.'}
                  </p>
                </div>
              </div>

            </div>

          </div>
          </motion.div>

        </section>

        {/* SECTION ADVANCED PROGRAMMING PORTFOLIO (Coding sandbox & play) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 w-full scroll-mt-10" id="coding">
          <motion.div 
            initial={{ opacity: 0, y: 55 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.7, ease: "easeOut" }} 
            className="w-full flex flex-col"
          >
            <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-12">
            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase font-mono bg-blue-500/10 px-3 py-1 rounded-full self-center">
              AESTHETIC CODING ENVIRONMENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-['Space_Grotesk'] font-extrabold tracking-tight">
              {currentLang === 'ID' ? 'Kodingan JS, Node.js & Layanan Otomasi Web' : 'Developer Sandbox: JavaScript & Node.js Master'}
            </h2>
            <p className="text-sm opacity-80">
              {currentLang === 'ID' 
                ? 'Saya merancang sistem web kustom berkecepatan tinggi dengan integrasi API, database, sistem antrean background, scraping headless browser, dan interface modern yang eye-safe.'
                : 'I craft lightweight custom full-stack web applications, headless browser scripts, REST APIs, fast data scraping scrapers, and highly interactive premium front-ends.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Project List Explorer (Left Side) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <label className="text-xs font-mono font-bold uppercase opacity-80 px-2 tracking-widest text-violet-400 block">
                {currentLang === 'ID' ? 'Pilih Demo Projek Kodingan' : 'Click Project Target Logs'}:
              </label>

              {codingProjects.map((proj, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveCodeTab(idx);
                    setTerminalOutput(prev => [
                      ...prev,
                      `[ui] Tab switched to: ${proj.title}`
                    ]);
                  }}
                  className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col gap-2 relative ${
                    activeCodeTab === idx
                      ? 'bg-gradient-to-br from-[#120c27] to-[#0c0d23] border-violet-500/50 shadow-md shadow-violet-500/10 translate-x-1'
                      : 'bg-[#120a2a]/20 border-violet-500/10 hover:border-violet-500/25 hover:bg-[#120a2a]/40'
                  }`}
                  id={`code-tab-card-${idx}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-blue-400 flex items-center gap-1.5 font-bold">
                      <Code className="w-3.5 h-3.5" />
                      Project_{idx + 1}
                    </span>
                    <div className="flex gap-1.5">
                      {proj.tech.slice(0, 2).map((t, ti) => (
                        <span key={ti} className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="font-['Space_Grotesk'] font-bold text-base mt-1">
                    {proj.title}
                  </h3>

                  <p className="text-xs opacity-75 line-clamp-2">
                    {currentLang === 'ID' ? proj.descriptionID : proj.descriptionEN}
                  </p>
                </div>
              ))}
            </div>

            {/* Simulated Dynamic Code editor with Run script mock sandbox (Right Side) */}
            <div className="lg:col-span-7 flex flex-col neon-glass rounded-2xl overflow-hidden border-violet-500/20" id="terminal-mock-panel">
              
              {/* Window Header */}
              <div className="bg-[#0b0816] h-11 px-4 flex items-center justify-between border-b border-violet-500/15">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-xs font-mono ml-2 opacity-60">server.js — active_thread</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded">ESM Module</span>
                  <Laptop className="w-4 h-4 opacity-50" />
                </div>
              </div>

              {/* Code Visualizer Display */}
              <div className="flex-grow p-4 bg-[#080512] font-mono text-xs overflow-x-auto text-[#e9e6ff] min-h-[160px] leading-relaxed relative">
                <pre className="select-text whitespace-pre overflow-x-auto">
                  <code>{codingProjects[activeCodeTab].codeSnippet}</code>
                </pre>
                
                {/* Visual Overlay glow */}
                <div className="absolute top-2 right-2 p-2 rounded-lg bg-violet-600/5 border border-violet-500/10 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                  <span className="text-[9px] uppercase tracking-wide opacity-80">Reactive VM</span>
                </div>
              </div>

              {/* Control Action Bar */}
              <div className="p-3 bg-[#0d0a1f] border-t border-violet-500/15 flex items-center justify-between gap-4">
                <button
                  onClick={triggerCodeExecution}
                  disabled={isRunningCode}
                  className={`px-5 h-10 rounded-xl font-bold font-mono text-xs tracking-wider uppercase flex items-center gap-2 transition-all duration-300 ${
                    isRunningCode
                      ? 'bg-violet-950/40 text-violet-400 border border-violet-500/20 cursor-not-allowed'
                      : 'bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white shadow shadow-violet-500/20 hover:scale-103'
                  }`}
                  id="execute-script-btn"
                >
                  <Terminal className="w-4 h-4 animate-pulse" />
                  <span>{isRunningCode ? 'Compiling & Running...' : 'Execute Node.js Script'}</span>
                </button>

                <button 
                  onClick={() => setTerminalOutput(['Console cleared. Standard logs ready.'])}
                  className="text-[10px] font-mono opacity-60 hover:opacity-100 transition-opacity bg-violet-500/5 px-3 py-1.5 rounded"
                  title="Reset Logs"
                >
                  Clear Console
                </button>
              </div>

              {/* Live Terminal outputs */}
              <div className="bg-[#04020a] p-4 font-mono text-[10px] space-y-1.5 border-t border-violet-500/15 max-h-[160px] overflow-y-auto">
                <span className="text-[#a78bfa] block font-bold mb-1">=== CONSOLE LOG INTERACTIVE INTERFACE ===</span>
                {terminalOutput.map((log, index) => (
                  <div key={index} className="flex justify-between items-start gap-2 border-b border-violet-950/20 pb-0.5">
                    <span className="text-[#60a5fa] whitespace-normal">
                      {log}
                    </span>
                    <span className="text-[8px] opacity-40 shrink-0 select-none">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                ))}
                {isRunningCode && (
                  <div className="text-[#a78bfa] font-bold animate-pulse blink-cursor pb-1">
                    System processing active threads...
                  </div>
                )}
              </div>

            </div>

          </div>
          </motion.div>

        </section>

        {/* SECTION MAHASISWA UNIVERSITAS MA'ARIF LAMPUNG (Academic Timeline) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-10" id="academic">
          <motion.div 
            initial={{ opacity: 0, y: 55 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.7, ease: "easeOut" }} 
            className="w-full"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Campus details (Left) */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-left" id="umala-showcase">
              
              <div className="inline-flex self-start items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold border border-blue-500/25 bg-blue-500/10 text-blue-300">
                <GraduationCap className="w-4 h-4 text-blue-300" />
                <span>AKADEMI & MAHASISWA</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-[#Space_Grotesk] font-extrabold tracking-tight">
                {currentLang === 'ID' 
                  ? 'Kuliah di Universitas Ma\'arif Lampung' 
                  : "Studying at Universitas Ma'arif Lampung"}
              </h2>

              <p className="text-sm opacity-85 leading-relaxed font-sans">
                {currentLang === 'ID'
                  ? 'Saya adalah mahasiswa aktif di Universitas Ma\'arif Lampung (UMALA). Kampus Ma\'arif Lampung mengajarkan saya integritas akademis tinggi serta kompetensi dasar rekayasa sistem komputer. Di sini saya mengasah kemampuan pemrograman, algoritma jaringan sosial, serta pengolahan basis data yang kemudian menjadi fondasi vital dalam meluncurkan bisnis fidz.net.'
                  : "I am a dedicated Computer Science / Engineering student at Universitas Ma'arif Lampung (UMALA). Studying at UMALA provides key foundations in networking systems, database management, and structured programming. This academic rigor empowers my daily developments for fidz.net automatic modules."}
              </p>

              {/* UMALA Credentials Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1b153c] to-[#0e0a29] border border-violet-500/15 flex items-center gap-4 shadow shadow-violet-500/10">
                <div className="w-14 h-14 rounded-full bg-violet-600/20 flex items-center justify-center shrink-0 border border-violet-500/30 text-violet-400">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase scale-95 origin-left font-mono text-blue-300 tracking-wider">Universitas Terakreditasi Lampung</span>
                  <strong className="text-base font-semibold text-white mt-0.5">Ahmad Hafidz (Computer Science)</strong>
                  <span className="text-xs opacity-70">Universitas Ma'arif Lampung (UMALA)</span>
                </div>
              </div>

            </div>

            {/* Course & Work Balance Timeline (Right) */}
            <div className="lg:col-span-7 flex flex-col gap-6 relative" id="timeline-academic-smm">
              
              {/* Vertical line connector */}
              <div className="absolute left-4 sm:left-6 top-3 bottom-3 w-0.5 bg-gradient-to-b from-violet-600 via-blue-500 to-fuchsia-500 hidden sm:block pointer-events-none" />

              {/* Timeline item 1 */}
              <div className="flex gap-4 sm:gap-8 items-start relative group">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shrink-0 text-violet-400 shadow z-10 group-hover:scale-105 transition-transform">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
                </div>
                <div className="flex-grow p-5 rounded-2xl bg-violet-500/5 hover:bg-violet-500/10 border border-violet-500/10 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-violet-300 font-bold tracking-wider">YEAR 2024 - PRESENT</span>
                    <span className="text-[10px] bg-violet-500/10 px-2 py-0.5 rounded text-violet-300 font-bold uppercase font-mono">UMALA Studies</span>
                  </div>
                  <h4 className="font-['Space_Grotesk'] font-bold text-base mt-2">
                    {currentLang === 'ID' ? 'Kecerdasan Sistem Komputasi & Jaringan' : 'Computational Intelligence & Web Engineering'}
                  </h4>
                  <p className="text-xs opacity-75 mt-1">
                    {currentLang === 'ID'
                      ? 'Fokus mendalami mata kuliah basis data relational, protokol transfer HTTP, API RESTful untuk pertukaran data, serta efisiensi algoritma eksekusi.'
                      : 'Mastering backend engineering, data transfer REST architectures, structural algorithms, and network packet management.'}
                  </p>
                </div>
              </div>

              {/* Timeline item 2 */}
              <div className="flex gap-4 sm:gap-8 items-start relative group">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-400 shadow z-10 group-hover:scale-105 transition-transform">
                  <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                </div>
                <div className="flex-grow p-5 rounded-2xl bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/10 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-blue-300 font-bold tracking-wider">YEAR 2025</span>
                    <span className="text-[10px] bg-blue-500/10 px-2 py-0.5 rounded text-blue-300 font-bold uppercase font-mono">fidz.net Launch</span>
                  </div>
                  <h4 className="font-['Space_Grotesk'] font-bold text-base mt-2">
                    {currentLang === 'ID' ? 'Merilis Otomasi SMM Panel Terintegrasi' : 'Founding fidz.net Integrated SMM Panel'}
                  </h4>
                  <p className="text-xs opacity-75 mt-1">
                    {currentLang === 'ID'
                      ? 'Menghubungkan teori perkuliahan dengan kebutuhan praktis. Meluncurkan platform fidz.net yang melayani pendaftaran boosters sosial media 24 jam non-stop.'
                      : 'Translating academic concepts into live projects. Launched fidz.net delivering robust, high-availability booster networks.'}
                  </p>
                </div>
              </div>

              {/* Timeline item 3 */}
              <div className="flex gap-4 sm:gap-8 items-start relative group">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-fuchsia-600/20 border border-fuchsia-500/30 flex items-center justify-center shrink-0 text-fuchsia-400 shadow z-10 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-fuchsia-400" />
                </div>
                <div className="flex-grow p-5 rounded-2xl bg-fuchsia-500/5 hover:bg-fuchsia-500/10 border border-fuchsia-500/10 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-fuchsia-300 font-bold tracking-wider">STABLE ACTIVE</span>
                    <span className="text-[10px] bg-fuchsia-500/10 px-2 py-0.5 rounded text-fuchsia-300 font-bold uppercase font-mono">Bilingual Service</span>
                  </div>
                  <h4 className="font-['Space_Grotesk'] font-bold text-base mt-2">
                    {currentLang === 'ID' ? 'Integrasi Asisten Pintar Generatif AI' : 'Generative AI Intelligence Deployment'}
                  </h4>
                  <p className="text-xs opacity-75 mt-1">
                    {currentLang === 'ID'
                      ? 'Melengkapi sistem dengan chatbot AI interaktif (powered by Gemini 3.5 Flash) untuk menjawab pesanan pembeli lokal & internasional secara dinamis.'
                      : 'Deploying custom LLM integrations on-site. Visitors get automated interactive responses for swift pre-sale calculations.'}
                  </p>
                </div>
              </div>

            </div>

          </div>
          </motion.div>

        </section>

        {/* SECTION BUILT-IN AI ASSISTANT PANEL */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent scroll-mt-10" id="ai-assistant">
          <motion.div 
            initial={{ opacity: 0, y: 55 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.7, ease: "easeOut" }} 
            className="w-full"
          >
            <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-10">
            <span className="text-xs font-bold tracking-widest text-violet-400 uppercase font-mono bg-violet-500/10 px-3 py-1 rounded-full self-center">
              SECURE BACKEND AI
            </span>
            <h2 className="text-3xl sm:text-4xl font-['Space_Grotesk'] font-extrabold tracking-tight">
              {currentLang === 'ID' ? 'Kecerdasan Buatan AI di Web Saya' : 'Built-In AI Knowledge Interface (Gemini Backed)'}
            </h2>
            <p className="text-sm opacity-80">
              {currentLang === 'ID'
                ? 'Tanyakan apa saja kepada Fidz AI! Asisten pintar saya dapat merekomendasikan paket Followers terbaik, menerangkan ilmu Node.js, atau menjelaskan info seputar Universitas Ma\'arif Lampung secara cerdas.'
                : 'Query anything about SMM operations, server structures, or Ahmad Hafidz\'s studies. Back-end powered by Google Gemini ensures instant contextual insights.'}
            </p>
          </div>

          <div className="max-w-4xl mx-auto neon-glass rounded-2xl overflow-hidden border-violet-500/25 shadow-2xl flex flex-col h-[520px]" id="built-in-ai-dashboard">
            
            {/* Header */}
            <div className="bg-[#0f0b20] h-14 px-4 sm:px-6 flex items-center justify-between border-b border-violet-500/15 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-blue-500 flex items-center justify-center text-white">
                    <Sparkles className="w-4.5 h-4.5 animate-pulse" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0f0b20]" />
                </div>
                <div className="flex flex-col text-left">
                  <h3 className="font-['Space_Grotesk'] font-bold text-sm tracking-wide text-white">Fidz AI Client Executive</h3>
                  <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest text-[#a78bfa]">Cluster Node OK — Gemini 3.5</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 opacity-60">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                <span className="text-[10px] font-mono">Bilingual (Indo / Eng)</span>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-grow p-4 sm:p-6 bg-[#090615] overflow-y-auto space-y-4 text-left font-sans text-sm">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                >
                  {/* Sender indicator */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white ${
                    msg.sender === 'user' ? 'bg-blue-600' : 'bg-gradient-to-tr from-purple-700 to-[#8b5cf6]'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className={`p-4 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-[#150f2f]/80 text-[#dad6ef] border border-violet-500/10 rounded-tl-none shadow'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] opacity-40 font-mono tracking-widest self-end">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {isAiLoading && (
                <div className="flex gap-3 max-w-[85%] mr-auto">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-700 to-[#8b5cf6] flex items-center justify-center text-white shrink-0 font-bold">
                    AI
                  </div>
                  <div className="bg-[#150f2f]/80 p-4 rounded-2xl rounded-tl-none border border-violet-500/10 text-xs text-[#a78bfa] font-mono animate-pulse flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span>Fidz AI sedang menyusun algoritma respon...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* AI Chip Helpers */}
            <div className="px-4 sm:px-6 py-2.5 bg-[#0b0816] border-t border-violet-500/15 flex gap-2 overflow-x-auto shrink-0 select-none scrollbar-none">
              <button 
                onClick={() => handleChipSelection('Berapa harga 1000 Followers Instagram?')}
                className="text-[11px] font-medium p-1 w-max block h-7 shrink-0 px-3 rounded-lg border border-violet-500/10 bg-violet-500/5 hover:bg-violet-500/15 transition-all text-[#dad6ef] whitespace-nowrap"
              >
                💰 Harga 1K Followers
              </button>
              <button 
                onClick={() => handleChipSelection('Apakah butuh enter password akun saya?')}
                className="text-[11px] font-medium p-1 w-max block h-7 shrink-0 px-3 rounded-lg border border-violet-500/10 bg-violet-500/5 hover:bg-violet-500/15 transition-all text-[#dad6ef] whitespace-nowrap"
              >
                🔒 Keamanan Profil
              </button>
              <button 
                onClick={() => handleChipSelection('Bagaimana kehidupan Ahmad Hafidz di Universitas Ma\'arif Lampung (UMALA)?')}
                className="text-[11px] font-medium p-1 w-max block h-7 shrink-0 px-3 rounded-lg border border-violet-500/10 bg-violet-500/5 hover:bg-violet-500/15 transition-all text-[#dad6ef] whitespace-nowrap"
              >
                🏫 Profil Kuliah UMALA
              </button>
              <button 
                onClick={() => handleChipSelection('Teknologi pemrograman apa saja yang dikuasai mas Hafidz?')}
                className="text-[11px] font-medium p-1 w-max block h-7 shrink-0 px-3 rounded-lg border border-violet-500/10 bg-violet-500/5 hover:bg-violet-500/15 transition-all text-[#dad6ef] whitespace-nowrap"
              >
                💻 Skill Programmer
              </button>
            </div>

            {/* Input Form */}
            <form 
              onSubmit={submitChatMessage}
              className="p-3 sm:p-4 bg-[#110c27] border-t border-violet-500/15 flex items-center gap-3 shrink-0"
              id="ai-prompt-form"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={currentLang === 'ID' ? 'Ketik pesan tanyakan harga, profil UMALA, atau js coding...' : 'Type message about SMM booster, Node.js development...'}
                className="flex-grow h-11 px-4 rounded-xl border focus:outline-none focus:ring-2 bg-[#080512] border-violet-500/20 text-[#dad6ef] text-sm focus:ring-violet-500/50 focus:border-violet-500"
                id="ai-prompt-input-field"
              />
              <button
                type="submit"
                disabled={isAiLoading || !chatInput.trim()}
                className="w-12 h-11 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white flex items-center justify-center shrink-0 disabled:opacity-40 transition-all shadow shadow-violet-500/20"
                id="ai-prompt-send-submit"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>

          </div>
          </motion.div>

        </section>

        {/* BRIGHT CUSTOM SELECTION: TESTIMONIAL FEEDBACK BOX */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="about">
          <motion.div 
            initial={{ opacity: 0, y: 55 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.7, ease: "easeOut" }} 
            className="w-full"
          >
            <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-12">
            <h3 className="text-2xl sm:text-3xl font-['Space_Grotesk'] font-extrabold tracking-tight">
              {currentLang === 'ID' ? 'Apa Kata Pembeli fidz.net?' : 'Satisfied Clients & Boost Testimony'}
            </h3>
            <p className="text-xs opacity-70">
              {currentLang === 'ID' ? 'Telah dipercaya oleh puluhan toko online dari Lampung hingga luar daerah Jawa.' : 'Trusted by social marketers and business profiles across Indonesia.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            
            <div className="p-6 rounded-2xl bg-[#120a2a]/40 border border-violet-500/10 flex flex-col justify-between">
              <p className="italic text-xs opacity-80 leading-relaxed">
                "My clothing store's Shopee followers leaped by 5,000 in a single day! Daily orders are skyrocketing and buyers are showing deep trust in our brand. Thank you Ahmad Hafidz from Universitas Ma'arif Lampung, your service is an absolute masterpiece!"
              </p>
              <div className="mt-4 pt-4 border-t border-violet-500/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-violet-600/30 flex items-center justify-center text-xs font-bold font-mono">
                  AN
                </div>
                <div>
                  <strong className="text-xs block">Ayunda Nita</strong>
                  <span className="text-[10px] opacity-60">Shopee Fashion Store Owner</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#120a2a]/40 border border-violet-500/10 flex flex-col justify-between">
              <p className="italic text-xs opacity-80 leading-relaxed">
                "Pure high-quality Node.js market-scraping scripts built by fidz.net are executing 100% seamlessly on the servers without any memory leaks or downtime. Wishing you endless success in your Computer Science major at UMALA!"
              </p>
              <div className="mt-4 pt-4 border-t border-violet-500/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600/30 flex items-center justify-center text-xs font-bold font-mono">
                  DR
                </div>
                <div>
                  <strong className="text-xs block">Dedi Rahmat</strong>
                  <span className="text-[10px] opacity-60">SaaS Platform Engineer</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#120a2a]/40 border border-violet-500/10 flex flex-col justify-between">
              <p className="italic text-xs opacity-80 leading-relaxed">
                "Astonishing delivery speed on target TikTok followers! Ordered 2,000 video likes and received supplementary bonus views as well. Incredibly recommended SMM provider, do not think twice to place orders at fidz.net!"
              </p>
              <div className="mt-4 pt-4 border-t border-violet-500/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-fuchsia-600/30 flex items-center justify-center text-xs font-bold font-mono">
                  IK
                </div>
                <div>
                  <strong className="text-xs block">Irfan Kurniawan</strong>
                  <span className="text-[10px] opacity-60">TikTok Content Creator</span>
                </div>
              </div>
            </div>

          </div>
          </motion.div>

        </section>

        {/* ACCORDION FAQ BLOCK */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 55 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.7, ease: "easeOut" }} 
            className="w-full"
          >
            <h3 className="font-['Space_Grotesk'] font-bold text-xl sm:text-2xl text-center mb-8">
            {currentLang === 'ID' ? 'Pertanyaan yang Sering Diajukan' : 'Frequently Answered Questions'}
          </h3>

          <div className="space-y-4 text-left text-xs font-sans">
            
            <div className="p-5 rounded-xl border border-violet-500/10 bg-[#120a2a]/15">
              <strong className="text-sm block text-violet-300">Apakah tembak followers di fidz.net membutuhkan password akun saya?</strong>
              <p className="opacity-80 mt-1.5 leading-relaxed">
                {currentLang === 'ID'
                  ? 'Sama sekali tidak! Keamanan Anda prioritas utama Ahmad Hafidz. Kami 100% hanya memerlukan Username akun sosial media atau link postingan yang ingin diboost.'
                  : 'Never! We strictly adhere to no-passwords safety guidelines. All orders run smoothly with only public handles or targeting post URLs.'}
              </p>
            </div>

            <div className="p-5 rounded-xl border border-violet-500/10 bg-[#120a2a]/15">
              <strong className="text-sm block text-blue-300">Bagaimana jika jumlah followers berkurang atau drop di masa depan?</strong>
              <p className="opacity-80 mt-1.5 leading-relaxed">
                {currentLang === 'ID'
                  ? 'Kami menyediakan paket bergaransi refill otomatis 30 hari. Jika sistem kami mendeteksi penurunan di luar batas wajar, server Node.js otomatis melakukan boost ulang tanpa biaya tambahan.'
                  : 'We offer dedicated refill warranty options. Our automatic scheduler checks values periodically and injects replenishments automatically if dropping occurs.'}
              </p>
            </div>

            <div className="p-5 rounded-xl border border-violet-500/10 bg-[#120a2a]/15">
              <strong className="text-sm block text-fuchsia-300">Berapa lama estimasi pengerjaan jasa pembuatan website mas Hafidz?</strong>
              <p className="opacity-80 mt-1.5 leading-relaxed">
                {currentLang === 'ID'
                  ? 'Tergantung kompleksitas fitur yang diinginkan. Untuk landing page portofolio kustom memakan waktu 2-4 hari, sedangkan untuk aplikasi full-stack terintegrasi database membutuhkan kisaran 1-2 minggu.'
                  : 'Aesthetic responsive web pages take 2-4 days. Complex custom full-stack installations with backend automated APIs take roughly 1-2 weeks.'}
              </p>
            </div>

            <div className="p-5 rounded-xl border border-violet-500/10 bg-[#120a2a]/15">
              <strong className="text-sm block text-violet-300">Bagaimana cara membayar pesanan atau order kodingan kustom?</strong>
              <p className="opacity-80 mt-1.5 leading-relaxed">
                {currentLang === 'ID'
                  ? 'Kami menerima pembayaran yang cepat dan aman melalui QRIS instan, e-wallet (DANA, OVO, GoPay, LinkAja) serta transfer bank lokal.'
                  : 'Fast checkouts are supported using automated QRIS codes, major e-wallets, bank transfers, or standard web payment protocols.'}
              </p>
            </div>

          </div>
          </motion.div>

        </section>

      </main>

      {/* FOOTER & BRAND HUB */}
      <footer className="border-t border-violet-500/15 bg-[#070510] text-[#8e8a9f]">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo & UMALA info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <div className="flex items-center gap-2">
              <span className="font-['Space_Grotesk'] font-bold text-lg text-white tracking-widest uppercase">
                fidz.net
              </span>
              <span className="bg-violet-500/15 text-violet-400 text-[9px] font-mono font-bold px-2 py-0.5 rounded border border-violet-500/25">
                V3.5 PRODUCTION
              </span>
            </div>
            <p className="text-xs opacity-70 max-w-sm">
              Premium Followers shot ecosystem & custom automation softwares. Created and operated by Ahmad Hafidz, Universitas Ma'arif Lampung.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-xl bg-violet-500/5 hover:bg-violet-500/15 border border-violet-500/10 flex items-center justify-center hover:text-white transition-colors"
              title="Ahmad Hafidz Github Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-xl bg-violet-500/5 hover:bg-violet-500/15 border border-violet-500/10 flex items-center justify-center hover:text-white transition-colors"
              title="Ahmad Hafidz Instagram Profile"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://api.whatsapp.com/send?phone=6283168213786" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-xl bg-emerald-500/5 hover:bg-[#10b981]/15 border border-[#10b981]/10 flex items-center justify-center text-emerald-400 hover:text-emerald-300 transition-colors"
              title="Contact WhatsApp"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>

        </div>

        {/* Bottom credits */}
        <div className="bg-[#030207] py-6 border-t border-violet-500/5 text-center text-[10px] tracking-wide opacity-50 font-mono flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
          <span>&copy; {new Date().getFullYear()} fidz.net. All rights reserved.</span>
          <span className="hidden sm:inline-block">|</span>
          <span>Designed with Purple-Blue Neon Cosmic Aesthetics</span>
          <span className="hidden sm:inline-block">|</span>
          <span>Universitas Ma'arif Lampung (UMALA) Engineering</span>
        </div>

      </footer>

      {/* Floating Widget Action: AI Chat Helper Overlay (Bottom Right) */}
      {showFloatingAi && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans shrink-0">
          
          {/* Quick Chat Bubble trigger */}
          <div className="flex items-center gap-2">
            <div className="bg-violet-950 text-[#dad6ef] px-4 py-2 rounded-2xl border border-violet-500/30 text-xs shadow-xl max-w-xs text-left animate-bounce hidden md:block">
              <span className="font-bold text-violet-400 block mb-0.5">Fidz AI Online!</span>
              Tembak Followers Instagram/TikTok? Tanyakan harga di sini!
            </div>
            
            <a
              href="#ai-assistant"
              className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white flex items-center justify-center shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-105 active:scale-95 transition-all duration-305 shrink-0"
              title="Tanya Cerdas AI Assistant"
            >
              <MessageSquare className="w-6 h-6 animate-pulse" />
            </a>
          </div>

          {/* Dismiss button */}
          <button 
            onClick={() => setShowFloatingAi(false)}
            className="text-[10px] font-mono opacity-50 hover:opacity-100 transition-opacity bg-violet-500/5 px-2 py-1 rounded"
          >
            Sembunyikan Overlay
          </button>
        </div>
      )}

    </div>
  );
}
