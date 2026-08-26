import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { currentUser, logoutUser } from '../../store/authStore';
import { themeStore, setTheme, type Theme } from '../../store/themeStore';
import { User, LogOut, Moon, Sun, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCenter } from '../notifications/AlertCenter';

export const TopbarUser = () => {
  const user = useStore(currentUser);
  const theme = useStore(themeStore);
  const [mounted, setMounted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !user) {
    return (
      <div className="flex items-center gap-4 pl-8 border-l border-border ml-4">
        <div className="w-11 h-11 rounded-2xl bg-surface flex items-center justify-center text-muted animate-pulse">
           <User size={22} />
        </div>
      </div>
    );
  }

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  return (
    <div className="relative flex items-center gap-4">
      <button 
        onClick={toggleTheme}
        className="w-9 h-9 rounded-full hover:bg-surface-elevated flex items-center justify-center text-muted hover:text-foreground transition-colors relative"
        title="Toggle Theme"
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      
      <AlertCenter />
      
      <div 
        className="flex items-center gap-4 pl-4 lg:pl-8 border-l border-border ml-2 lg:ml-4 group cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      >
         <div className="text-right hidden xl:block">
            <p className="text-[12px] font-black text-foreground uppercase tracking-tighter leading-none mb-1.5 group-hover:text-primary transition-colors">
               {user.name}
            </p>
            <p className={`text-[10px] text-muted font-black uppercase tracking-widest leading-none opacity-80`}>
               {user.role}
            </p>
         </div>
         <div className={`w-11 h-11 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/10 ring-2 ring-primary/20 hover:scale-105 transition-all`}>
            <span className="font-black text-lg">{user.name.charAt(0)}</span>
         </div>
      </div>

      <AnimatePresence>
        {showMenu && (
           <motion.div
             initial={{ opacity: 0, y: 10, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 10, scale: 0.95 }}
             className="absolute right-0 top-full mt-4 w-64 bg-surface rounded-3xl shadow-2xl border border-border p-4 z-50 overflow-hidden"
           >
             <div className="p-4 bg-surface-elevated rounded-2xl mb-2 text-center">
                <div className={`w-16 h-16 mx-auto rounded-[1.5rem] bg-primary flex items-center justify-center text-primary-foreground shadow-xl mb-3`}>
                   <span className="font-black text-2xl">{user.name.charAt(0)}</span>
                </div>
                <h4 className="text-foreground font-black uppercase tracking-tight">{user.name}</h4>
                <p className="text-[9px] font-black uppercase tracking-widest text-muted mt-1">{user.department}</p>
             </div>
             
             <div className="flex gap-2 mb-2 p-2 bg-surface-elevated rounded-xl">
               <ThemeBtn current={theme} val="light" icon={Sun} onClick={() => setTheme('light')} />
               <ThemeBtn current={theme} val="dark" icon={Moon} onClick={() => setTheme('dark')} />
               <ThemeBtn current={theme} val="system" icon={Monitor} onClick={() => setTheme('system')} />
             </div>
             
             <button 
               onClick={() => {
                 setShowMenu(false);
                 logoutUser();
               }}
               className="w-full flex items-center justify-center gap-2 p-3 text-xs font-black uppercase tracking-widest text-critical hover:bg-critical/10 hover:text-critical rounded-xl transition-colors"
             >
               <LogOut size={16} /> Log Out
             </button>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ThemeBtn = ({ current, val, icon: Icon, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-2 flex justify-center items-center rounded-lg transition-colors ${current === val ? 'bg-primary text-primary-foreground' : 'text-muted hover:text-foreground hover:bg-surface'}`}
    title={`Set theme to ${val}`}
  >
    <Icon size={14} />
  </button>
);
