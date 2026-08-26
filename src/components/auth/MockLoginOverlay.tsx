import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { currentUser, mockUsers, loginUser } from '../../store/authStore';
import { motion } from 'framer-motion';
import { Key, Brain } from 'lucide-react';

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
    <div className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-y-auto">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl p-8 py-16">
         
         <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-surface-elevated border border-border rounded-[2rem] shadow-2xl mb-2">
               <Brain className="text-primary" size={32} />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-foreground uppercase tracking-tighter">Enterprise OS</h1>
            <p className="text-muted text-lg font-medium max-w-2xl mx-auto">
               Secure Neural Access Gateway. Select a mock user identity to proceed into the system environment and explore role-based routing.
            </p>
         </div>

         <div className="bg-surface border border-border p-10 rounded-[3rem] shadow-2xl">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
               <h3 className="text-xl font-black text-foreground uppercase tracking-tighter flex items-center gap-3">
                 <Key className="text-secondary" size={24} />
                 Identity Selection
               </h3>
               <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-xl border border-primary/20">
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
                   className="flex flex-col items-center text-center p-6 bg-surface-elevated hover:bg-surface border border-border hover:border-primary/50 rounded-3xl transition-all group active:scale-95 shadow-sm"
                 >
                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl mb-4 group-hover:scale-110 transition-transform border border-border`} style={{ backgroundColor: u.avatarColor.replace('bg-', '') || '#6366f1' }}>
                       <span className="text-xl font-black">{u.name.charAt(0)}</span>
                    </div>
                    <h4 className="text-foreground font-black text-sm uppercase tracking-tight mb-1">{u.name}</h4>
                    <p className="text-primary text-[10px] font-black uppercase tracking-widest">{u.role}</p>
                    <p className="text-muted text-[9px] font-bold mt-2 uppercase tracking-widest">{u.department}</p>
                 </motion.button>
               ))}
            </div>
         </div>

      </div>
    </div>
  );
};
