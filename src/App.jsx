import React, { useState, useEffect } from 'react';
import { Clock, Mail, Copy, Check, ArrowUpRight } from 'lucide-react';

export default function BirthdayReminderDashboard() {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

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
        setTimeLeft("It's midnight! Birthday time 🎉");
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
