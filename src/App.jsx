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
  // THE CRAZY CELEBRATION UI (Triggered at Midnight)
  // -------------------------------------------------------------
  if (isBirthday) {
    return (
      <div className="min-h-screen bg-black overflow-hidden relative flex flex-col items-center justify-center p-4 md:p-8 font-sans">
        
        {/* Confetti Explosion */}
        <Confetti 
          width={windowDimensions.width} 
          height={windowDimensions.height} 
          recycle={true}
          numberOfPieces={800}
          gravity={0.2}
          colors={['#FF1493', '#00FFFF', '#FFD700', '#FF4500', '#7FFF00']}
        />
        
        {/* Floating GIFs in Background (Now responsive) */}
        <motion.img 
          initial={{ opacity: 0, x: -300, y: -200 }}
          animate={{ opacity: 0.85, x: 0, y: [0, -40, 0], rotate: [-15, 15, -15] }}
          transition={{ duration: 2, y: { repeat: Infinity, duration: 3.5 }, rotate: { repeat: Infinity, duration: 4.5 } }}
          src="https://media.giphy.com/media/26FPpSuhgHvU6hCPe/giphy.gif" 
          alt="Minions Party"
          className="absolute top-4 left-4 md:top-10 md:left-10 w-24 h-24 sm:w-40 sm:h-40 md:w-64 md:h-64 object-cover rounded-full shadow-2xl shadow-purple-500/60 z-0"
        />
        
        <motion.img 
          initial={{ opacity: 0, x: 300, y: 200 }}
          animate={{ opacity: 0.85, x: 0, y: [0, 40, 0], rotate: [15, -15, 15] }}
          transition={{ duration: 2.5, y: { repeat: Infinity, duration: 4 }, rotate: { repeat: Infinity, duration: 5.5 } }}
          src="https://media.giphy.com/media/3o6MbhYjXivpejLs39/giphy.gif" 
          alt="Spongebob Party"
          className="absolute bottom-4 right-4 md:bottom-10 md:right-10 w-32 h-32 sm:w-48 sm:h-48 md:w-80 md:h-80 object-cover rounded-[2rem] shadow-2xl shadow-pink-500/60 z-0"
        />

        {/* Center Celebration Card */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 12 }}
          className="relative z-10 bg-white/5 backdrop-blur-3xl border border-white/20 p-6 sm:p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] text-center shadow-[0_0_150px_rgba(236,72,153,0.5)] max-w-[95vw] md:max-w-4xl w-full"
        >
          <motion.div
            animate={{ scale: [1, 1.25, 1], rotate: [0, 20, -20, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="mb-4 md:mb-8 flex justify-center text-yellow-300 drop-shadow-[0_0_20px_rgba(253,224,71,0.8)]"
          >
            <PartyPopper size={windowDimensions.width < 768 ? 60 : 100} />
          </motion.div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400 mb-4 md:mb-6 drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)] leading-tight">
            HAPPY BIRTHDAY
            <br className="hidden sm:block" /> MADHUR!
          </h1>
          
          <p className="text-lg sm:text-2xl md:text-3xl text-white/90 font-bold tracking-widest mb-8 md:mb-10 drop-shadow-lg uppercase">
            It's midnight! Let's goooo 🎉
          </p>

          <div className="flex justify-center">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(236,72,153,1)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 text-white font-black py-3 px-6 sm:py-4 sm:px-10 rounded-full shadow-[0_0_30px_rgba(236,72,153,0.8)] text-base sm:text-xl flex items-center gap-2 sm:gap-3 transition-all border border-white/20"
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" /> 
              Time to Celebrate! 
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
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
    <div className="min-h-screen bg-[#050505] text-slate-200 flex flex-col items-center justify-center p-4 sm:p-6 font-sans antialiased relative overflow-hidden">
      
      {/* Premium Ambient Glowing Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-rose-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl ring-1 ring-white/5">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Task Automator
            </h1>
            <p className="text-sm text-slate-400 mt-1 font-medium">Scheduled dispatch helper</p>
          </div>
          <span className="self-start sm:self-auto px-3 py-1.5 text-xs font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            Pending Action
          </span>
        </div>

        {/* Live Countdown Timer */}
        <div className="bg-black/40 border border-white/5 rounded-2xl p-6 mb-8 text-center shadow-inner relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400/80 mb-3 relative z-10">
            <Clock className="w-4 h-4 text-indigo-400" />
            Countdown to 14 July Midnight
          </div>
          <div className="text-4xl sm:text-5xl font-mono font-black tracking-tighter text-white relative z-10 tabular-nums drop-shadow-md">
            {timeLeft}
          </div>
        </div>

        {/* Email Payload Box */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-400" />
              Prepared Email Payload
            </label>
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 text-xs font-bold text-indigo-300 hover:text-white transition-all bg-indigo-500/10 hover:bg-indigo-500/20 px-4 py-2 rounded-xl border border-indigo-500/20 active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-black/30 border border-white/5 rounded-2xl p-5 sm:p-6 space-y-4 font-mono text-xs sm:text-sm shadow-inner group transition-all hover:border-white/10">
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <span className="text-slate-500 font-bold min-w-[3rem]">TO:</span>
              <span className="text-indigo-300 selection:bg-indigo-500/30 break-all">{emailData.to}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <span className="text-slate-500 font-bold min-w-[3rem]">SUBJ:</span>
              <span className="text-slate-200 selection:bg-indigo-500/30">{emailData.subject}</span>
            </div>
            <hr className="border-white/5 my-3" />
            <div className="text-slate-400 leading-relaxed whitespace-pre-line selection:bg-indigo-500/30 mt-2">
              {emailData.body}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <a 
            href={`mailto:${emailData.to}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`}
            className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-slate-200 font-bold text-sm sm:text-base py-4 px-6 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transform transition-all active:scale-[0.98]"
          >
            Launch Client & Pre-fill Mail
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
