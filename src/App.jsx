import React, { useState, useEffect } from 'react';
import { Clock, Mail, Copy, Check, ArrowUpRight, PartyPopper, ChevronDown, Heart } from 'lucide-react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

export default function BirthdayReminderDashboard() {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [isBirthday, setIsBirthday] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ 
    width: window.innerWidth, 
    height: window.innerHeight 
  });

  useEffect(() => {
    const handleResize = () => setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const emailData = {
    to: "aditya02bisht@gmail.com",
    subject: "Reminder: Madhur's Birthday at Midnight!",
    body: "Hey Aditya,\n\nJust a quick heads-up to remind you that Madhur's birthday is in half an hour (12 Midnight, 14th July). Don't forget to wish him!\n\nBest,"
  };

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      // Target is exactly midnight 14th July 2026
      const target = new Date(2026, 6, 14, 0, 0, 0);
      const difference = target - now;

      if (difference <= 0) {
        setIsBirthday(true);
        return;
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };

    const timer = setInterval(calculateCountdown, 1000);
    calculateCountdown();
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = () => {
    const textToCopy = `To: ${emailData.to}\nSubject: ${emailData.subject}\n\n${emailData.body}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // -------------------------------------------------------------
  // THE LONG-SCROLL CELEBRATION PAGE
  // -------------------------------------------------------------
  if (isBirthday) {
    return (
      <div className="w-full bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-pink-500/30">
        
        {/* Persistent Confetti */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <Confetti 
            width={windowDimensions.width} 
            height={windowDimensions.height} 
            recycle={true}
            numberOfPieces={windowDimensions.width < 768 ? 150 : 350}
            gravity={0.12}
            colors={['#FF1493', '#00FFFF', '#FFD700', '#FF4500', '#7FFF00']}
          />
        </div>

        {/* SECTION 1: HERO */}
        <section className="min-h-[100dvh] relative flex flex-col items-center justify-center p-6 text-center">
          {/* Ambient Glows */}
          <div className="absolute top-[-10%] left-[-20%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-pink-600/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-20%] w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] bg-cyan-600/20 blur-[100px] rounded-full pointer-events-none" />

          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mb-8 z-10"
          >
            <PartyPopper className="w-20 h-20 md:w-32 md:h-32 text-yellow-400 drop-shadow-[0_0_30px_rgba(253,224,71,0.6)]" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="text-[12vw] sm:text-[9vw] md:text-8xl lg:text-9xl font-black bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-6 drop-shadow-2xl leading-[1.1] uppercase z-10"
          >
            Happy<br/>Birthday<br/>Madhur!
          </motion.h1>

          <div className="text-xl md:text-4xl font-bold text-white/90 h-16 z-10">
            <Typewriter
              words={[
                "Hope you have a wonderful day!",
                "Filled with joy and happiness.",
                "Let's celebrate like crazy! 🎉",
                "Wishing you all the success!"
              ]}
              loop={0}
              cursor
              cursorStyle='|'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </div>

          <motion.div 
            animate={{ y: [0, 20, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 z-10 flex flex-col items-center text-white/50"
          >
            <span className="text-xs uppercase tracking-widest mb-2 font-bold">Scroll Down</span>
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </section>

        {/* SECTION 2: POLAROID MEMORIES */}
        <section className="min-h-screen py-24 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#050505] to-[#1a0b2e] relative z-10">
          <motion.h2 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-16 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 text-center uppercase tracking-wider"
          >
            Golden Memories ✨
          </motion.h2>

          <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center justify-center max-w-6xl w-full">
            {/* Photo 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -50, rotate: -10 }}
              whileInView={{ opacity: 1, x: 0, rotate: -3 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
              viewport={{ once: true }}
              className="bg-white p-4 pb-16 md:pb-24 rounded-sm shadow-2xl w-full max-w-sm cursor-pointer transition-shadow hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            >
              <div className="overflow-hidden bg-gray-200 aspect-square rounded-sm">
                <img src="/IMG-20260118-WA0000.jpg" alt="Memory 1" className="w-full h-full object-cover" />
              </div>
              <p className="text-black text-center mt-6 text-2xl font-bold font-serif opacity-80">Good times!</p>
            </motion.div>

            {/* Photo 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 50, rotate: 10 }}
              whileInView={{ opacity: 1, x: 0, rotate: 4 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
              viewport={{ once: true }}
              className="bg-white p-4 pb-16 md:pb-24 rounded-sm shadow-2xl w-full max-w-sm cursor-pointer transition-shadow hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            >
              <div className="overflow-hidden bg-gray-200 aspect-square rounded-sm">
                <img src="/IMG-20260201-WA0018.jpg" alt="Memory 2" className="w-full h-full object-cover" />
              </div>
              <p className="text-black text-center mt-6 text-2xl font-bold font-serif opacity-80">Unforgettable</p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: VIDEO MESSAGE */}
        <section className="min-h-screen py-24 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#1a0b2e] to-black relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-center uppercase tracking-wider"
          >
            A Special Message 🎥
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="relative p-2 md:p-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl shadow-[0_0_60px_rgba(0,255,255,0.2)] max-w-4xl w-full"
          >
            <div className="bg-black rounded-2xl overflow-hidden aspect-video">
              <video 
                src="/VID-20260112-WA0009.mp4" 
                controls 
                autoPlay 
                loop 
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="mt-20 flex flex-col items-center"
          >
            <Heart className="w-12 h-12 text-rose-500 mb-6 animate-pulse" fill="currentColor" />
            <p className="text-xl md:text-4xl text-center font-bold text-white/90 max-w-4xl leading-relaxed px-4">
              Wishing you all the happiness, success, and amazing moments in the year ahead! 
              Let's make this year the best one yet! 🎉🎂
            </p>
          </motion.div>
        </section>

      </div>
    );
  }

  // -------------------------------------------------------------
  // PREMIUM ORIGINAL UI (The Reminder Dashboard)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen w-full bg-[#050505] text-slate-200 flex flex-col items-center justify-center p-4 sm:p-6 font-sans antialiased relative overflow-hidden">
      
      {/* Premium Ambient Glowing Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] md:w-[30vw] md:h-[30vw] bg-rose-600/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-lg bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 border-b border-white/10">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Task Automator
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 font-medium">Scheduled dispatch helper</p>
          </div>
          <span className="self-start sm:self-auto px-3 py-1.5 text-xs font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            Pending
          </span>
        </div>

        {/* Live Countdown Timer */}
        <div className="bg-black/40 border border-white/5 rounded-2xl p-6 mb-6 text-center shadow-inner relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400/80 mb-3 relative z-10">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>Countdown to 14 July Midnight</span>
          </div>
          <div className="text-4xl md:text-5xl font-mono font-black tracking-tighter text-white relative z-10 tabular-nums drop-shadow-md">
            {timeLeft}
          </div>
        </div>

        {/* Email Payload Box */}
        <div className="space-y-4 w-full">
          <div className="flex items-center justify-between gap-3">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-400" />
              Prepared Payload
            </label>
            <button 
              onClick={copyToClipboard}
              className="flex items-center justify-center gap-2 text-xs font-bold text-indigo-300 hover:text-white transition-all bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-2 rounded-lg border border-indigo-500/20 active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-black/30 border border-white/5 rounded-xl p-5 space-y-3 font-mono text-xs md:text-sm shadow-inner overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:gap-4 w-full">
              <span className="text-slate-500 font-bold min-w-[3rem]">TO:</span>
              <span className="text-indigo-300 selection:bg-indigo-500/30 break-all">{emailData.to}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-4 w-full">
              <span className="text-slate-500 font-bold min-w-[3rem]">SUBJ:</span>
              <span className="text-slate-200 selection:bg-indigo-500/30 break-words">{emailData.subject}</span>
            </div>
            <hr className="border-white/5 my-3" />
            <div className="text-slate-400 leading-relaxed whitespace-pre-line selection:bg-indigo-500/30 break-words">
              {emailData.body}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 w-full">
          <a 
            href={`mailto:${emailData.to}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`}
            className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-slate-200 font-bold text-sm md:text-base py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transform transition-all active:scale-[0.98] text-center"
          >
            Launch Client & Pre-fill Mail
            <ArrowUpRight className="w-5 h-5 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}
