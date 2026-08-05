import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { currentUser, mockUsers, loginUser } from '../../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, User, Key, ArrowRight, Activity, Brain } from 'lucide-react';

export const MockLoginOverlay = () => {
  const user = useStore(currentUser);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid rendering on server

  if (user) return null; // Don't render if logged in

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900 flex flex-col items-center justify-center overflow-y-auto">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl p-8 py-16">
         
         <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-md mb-2">
               <Brain className="text-violet-400" size={32} />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">Enterprise OS</h1>
            <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto">
               Secure Neural Access Gateway. Select a mock user identity to proceed into the system environment and explore role-based routing.
            </p>
         </div>

         <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
               <h3 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                 <Key className="text-emerald-400" size={24} />
                 Identity Selection
               </h3>
               <span className="px-4 py-1.5 bg-violet-500/20 text-violet-300 text-[10px] font-black uppercase tracking-widest rounded-xl border border-violet-500/30">
                 15 Available Roles
               </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
               {mockUsers.map((u, i) => (
                 <motion.button
                   key={u.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.05 }}
                   onClick={() => loginUser(u)}
                   className="flex flex-col items-center text-center p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/50 rounded-3xl transition-all group active:scale-95"
                 >
                    <div className={`w-16 h-16 rounded-[1.5rem] ${u.avatarColor} flex items-center justify-center text-white shadow-xl mb-4 group-hover:scale-110 transition-transform ring-4 ring-white/5`}>
                       <span className="text-xl font-black">{u.name.charAt(0)}</span>
                    </div>
                    <h4 className="text-white font-black text-sm uppercase tracking-tight mb-1">{u.name}</h4>
                    <p className="text-violet-400 text-[10px] font-black uppercase tracking-widest">{u.role}</p>
                    <p className="text-slate-500 text-[9px] font-bold mt-2 uppercase tracking-widest">{u.department}</p>
                 </motion.button>
               ))}
            </div>
         </div>

      </div>
    </div>
  );
};
