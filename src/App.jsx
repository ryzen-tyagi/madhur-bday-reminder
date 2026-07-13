import React, { useState, useEffect } from 'react';
import { Clock, Mail, Copy, Check, ArrowUpRight, PartyPopper, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

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
      // Target is exactly 10:27 PM for local testing
      const target = new Date(2026, 6, 13, 22, 27, 0);
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
  // THE CRAZY CELEBRATION UI (Triggered at Midnight)
  // -------------------------------------------------------------
  if (isBirthday) {
    return (
      <div className="min-h-screen w-full bg-[#050505] overflow-hidden relative flex flex-col items-center justify-center p-4 font-sans">
        
        {/* Confetti Explosion */}
        <div className="absolute inset-0 pointer-events-none z-50">
          <Confetti 
            width={windowDimensions.width} 
            height={windowDimensions.height} 
            recycle={true}
            numberOfPieces={windowDimensions.width < 768 ? 200 : 500}
            gravity={0.15}
            colors={['#FF1493', '#00FFFF', '#FFD700', '#FF4500', '#7FFF00']}
          />
        </div>
        
        {/* Floating GIFs in Background - Positioned Further Out */}
        <motion.img 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1, y: [0, -30, 0], rotate: [-10, 10, -10] }}
          transition={{ duration: 2, y: { repeat: Infinity, duration: 4 }, rotate: { repeat: Infinity, duration: 5 } }}
          src="https://media.giphy.com/media/26FPpSuhgHvU6hCPe/giphy.gif" 
          alt="Minions Party"
          className="absolute top-[5%] left-[5%] sm:top-[10%] sm:left-[10%] w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 object-cover rounded-full shadow-2xl shadow-purple-500/60 z-20 pointer-events-none opacity-90"
        />
        
        <motion.img 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1, y: [0, 30, 0], rotate: [10, -10, 10] }}
          transition={{ duration: 2.5, y: { repeat: Infinity, duration: 4.5 }, rotate: { repeat: Infinity, duration: 5.5 } }}
          src="https://media.giphy.com/media/3o6MbhYjXivpejLs39/giphy.gif" 
          alt="Spongebob Party"
          className="absolute bottom-[5%] right-[5%] sm:bottom-[10%] sm:right-[10%] w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 object-cover rounded-[2rem] shadow-2xl shadow-pink-500/60 z-20 pointer-events-none opacity-90"
        />

        {/* Center Celebration Card - Much cleaner sizing for desktop */}
        <motion.div 
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-[2rem] text-center shadow-[0_0_100px_rgba(236,72,153,0.3)] w-full max-w-sm sm:max-w-lg md:max-w-2xl mx-auto flex flex-col items-center justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mb-6 flex justify-center text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.8)]"
          >
            <PartyPopper className="w-16 h-16 sm:w-20 sm:h-20" />
          </motion.div>
          
          <h1 className="w-full text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 mb-4 drop-shadow-md leading-tight uppercase tracking-tight">
            Happy <br /> Birthday <br /> Madhur!
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-bold tracking-widest mb-8 uppercase w-full">
            It's midnight! Let's goooo 🎉
          </p>

          <div className="flex justify-center w-full">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(236,72,153,0.8)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.6)] text-sm sm:text-lg flex items-center justify-center gap-2 transition-all border border-white/20 w-full sm:w-auto"
            >
              <Sparkles className="w-5 h-5 shrink-0" /> 
              <span>Time to Celebrate!</span>
              <Sparkles className="w-5 h-5 shrink-0" />
            </motion.button>
          </div>
        </motion.div>
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
