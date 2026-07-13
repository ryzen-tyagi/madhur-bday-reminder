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
      // Target is midnight 14th July 2026
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
      <div className="min-h-screen bg-black overflow-hidden relative flex flex-col items-center justify-center p-6 font-sans">
        
        {/* Confetti Explosion */}
        <Confetti 
          width={windowDimensions.width} 
          height={windowDimensions.height} 
          recycle={true}
          numberOfPieces={600}
          gravity={0.15}
          colors={['#FF1493', '#00FFFF', '#FFD700', '#FF4500', '#7FFF00']}
        />
        
        {/* Floating GIFs in Background */}
        <motion.img 
          initial={{ opacity: 0, x: -300, y: -200 }}
          animate={{ opacity: 0.8, x: 0, y: [0, -30, 0], rotate: [-10, 10, -10] }}
          transition={{ duration: 2, y: { repeat: Infinity, duration: 3 }, rotate: { repeat: Infinity, duration: 4 } }}
          src="https://media.giphy.com/media/26FPpSuhgHvU6hCPe/giphy.gif" 
          alt="Minions Party"
          className="absolute top-10 left-10 w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-2xl shadow-purple-500/50 hidden sm:block z-0"
        />
        
        <motion.img 
          initial={{ opacity: 0, x: 300, y: 200 }}
          animate={{ opacity: 0.8, x: 0, y: [0, 30, 0], rotate: [10, -10, 10] }}
          transition={{ duration: 2.5, y: { repeat: Infinity, duration: 4 }, rotate: { repeat: Infinity, duration: 5 } }}
          src="https://media.giphy.com/media/3o6MbhYjXivpejLs39/giphy.gif" 
          alt="Spongebob Party"
          className="absolute bottom-10 right-10 w-56 h-56 md:w-80 md:h-80 object-cover rounded-3xl shadow-2xl shadow-pink-500/50 hidden sm:block z-0"
        />

        {/* Center Celebration Card */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 12 }}
          className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/30 p-8 md:p-16 rounded-[3rem] text-center shadow-[0_0_120px_rgba(236,72,153,0.6)] max-w-4xl w-full mx-4"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mb-8 flex justify-center text-yellow-400"
          >
            <PartyPopper size={100} />
          </motion.div>
          
          <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-6 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
            HAPPY BIRTHDAY
            <br className="hidden md:block" /> MADHUR!
          </h1>
          
          <p className="text-xl md:text-3xl text-white font-bold tracking-widest mb-10 drop-shadow-md">
            IT'S MIDNIGHT! LET'S GOOOO 🎉
          </p>

          <div className="flex justify-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(236,72,153,1)" }}
              whileTap={{ scale: 0.9 }}
              className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.8)] text-xl flex items-center gap-3 transition-all"
            >
              <Sparkles /> Time to Celebrate! <Sparkles />
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // ORIGINAL UI (The Reminder Dashboard)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 flex flex-col items-center justify-center p-6 font-sans antialiased">
      <div className="w-full max-w-xl bg-[#151D30]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-8 shadow-2xl">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800/60">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-white">Task Automator</h1>
            <p className="text-xs text-slate-400 mt-1">Scheduled dispatch helper</p>
          </div>
          <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
            Pending Action
          </span>
        </div>

        {/* Live Countdown Timer */}
        <div className="bg-[#0B0F19]/80 border border-slate-800 rounded-xl p-5 mb-6 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-400 mb-2">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            Countdown to 14 July Midnight
          </div>
          <div className="text-3xl font-mono font-bold tracking-tight text-white">
            {timeLeft}
          </div>
        </div>

        {/* Email Payload Box */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              Prepared Email Details
            </label>
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/5 hover:bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/10"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Payload</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Payload</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-[#0B0F19]/80 border border-slate-800 rounded-xl p-5 space-y-3 font-mono text-xs shadow-inner">
            <div>
              <span className="text-slate-500">TO:</span>{" "}
              <span className="text-indigo-300 selection:bg-indigo-500/30">{emailData.to}</span>
            </div>
            <div>
              <span className="text-slate-500">SUBJ:</span>{" "}
              <span className="text-slate-200 selection:bg-indigo-500/30">{emailData.subject}</span>
            </div>
            <hr className="border-slate-800/60 my-2" />
            <div className="text-slate-300 leading-relaxed whitespace-pre-line selection:bg-indigo-500/30">
              {emailData.body}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <a 
            href={`mailto:${emailData.to}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm py-3 px-4 rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/20 transform transition-all active:scale-[0.98]"
          >
            Launch Client & Pre-fill Mail
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
