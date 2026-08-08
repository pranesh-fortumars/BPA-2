import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { currentUser, logoutUser } from '../../store/authStore';
import { User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCenter } from '../notifications/AlertCenter';

export const TopbarUser = () => {
  const user = useStore(currentUser);
  const [mounted, setMounted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !user) {
    return (
      <div className="flex items-center gap-4 pl-8 border-l border-slate-100 ml-4">
        <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 animate-pulse">
           <User size={22} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center gap-4">
      <AlertCenter />
      
      <div 
        className="flex items-center gap-4 pl-4 lg:pl-8 border-l border-slate-100 ml-2 lg:ml-4 group cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      >
         <div className="text-right hidden xl:block">
            <p className="text-[12px] font-black text-slate-900 uppercase tracking-tighter leading-none mb-1.5 group-hover:text-violet-600 transition-colors">
               {user.name}
            </p>
            <p className={`text-[10px] ${user.avatarColor.replace('bg-', 'text-')} font-black uppercase tracking-widest leading-none opacity-80`}>
               {user.role}
            </p>
         </div>
         <div className={`w-11 h-11 rounded-2xl ${user.avatarColor} flex items-center justify-center text-white shadow-xl shadow-slate-900/10 ring-2 ring-white hover:scale-105 transition-all`}>
            <span className="font-black text-lg">{user.name.charAt(0)}</span>
         </div>
      </div>

      <AnimatePresence>
        {showMenu && (
           <motion.div
             initial={{ opacity: 0, y: 10, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 10, scale: 0.95 }}
             className="absolute right-0 top-full mt-4 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 z-50 overflow-hidden"
           >
             <div className="p-4 bg-slate-50 rounded-2xl mb-2 text-center">
                <div className={`w-16 h-16 mx-auto rounded-[1.5rem] ${user.avatarColor} flex items-center justify-center text-white shadow-xl mb-3`}>
                   <span className="font-black text-2xl">{user.name.charAt(0)}</span>
                </div>
                <h4 className="text-slate-900 font-black uppercase tracking-tight">{user.name}</h4>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">{user.department}</p>
             </div>
             
             <button 
               onClick={() => {
                 setShowMenu(false);
                 logoutUser();
               }}
               className="w-full flex items-center justify-center gap-2 p-3 text-xs font-black uppercase tracking-widest text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
             >
               <LogOut size={16} /> Log Out
             </button>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
