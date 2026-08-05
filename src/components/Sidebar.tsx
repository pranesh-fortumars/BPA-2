import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Workflow, 
  CheckSquare, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Briefcase,
  HelpCircle,
  Bot,
  FileText,
  Network,
  ClipboardList,
  Activity,
  DollarSign,
  PieChart,
  UserCheck,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const executiveItems = [
  { icon: Activity, label: 'Executive Center', path: '/executive', color: 'text-rose-500' },
];

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', color: 'text-violet-500' },
  { icon: Workflow, label: 'Orchestration Studio', path: '/builder', color: 'text-purple-500' },
  { icon: Bot, label: 'AI Agent Fleets', path: '/agents', color: 'text-emerald-500' },
  { icon: FileText, label: 'Neural Documents', path: '/documents', color: 'text-amber-500' },
  { icon: Network, label: 'Integration Hub', path: '/integrations', color: 'text-rose-500' },
  { icon: CheckSquare, label: 'My Tasks', path: '/tasks', color: 'text-blue-500' },
];

const analyticItems = [
  { icon: BarChart3, label: 'Process Intelligence', path: '/analytics', color: 'text-violet-400' },
  { icon: Layers, label: 'Departmental', path: '/departments', color: 'text-slate-600' },
];

const adminItems = [
  { icon: ShieldCheck, label: 'Security & Access', path: '/security' },
  { icon: ClipboardList, label: 'Compliance Audit', path: '/audit' },
  { icon: Settings, label: 'System Settings', path: '/settings' },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Dynamically determine active item from URL path
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  
  const getActiveItem = () => {
    const allItems = [...executiveItems, ...menuItems, ...analyticItems, ...adminItems];
    // Robust path normalization for dynamic matching
    const normalizedPath = currentPath.replace(/\/$/, "");
    let match = allItems.find(item => {
      const normalizedItemPath = (item.path || "").replace(/\/$/, "");
      return normalizedPath === normalizedItemPath;
    });
    
    // Parent boundary matching for deep routes
    if (!match) {
      match = allItems.find(item => {
        const normalizedItemPath = (item.path || "").replace(/\/$/, "");
        return normalizedItemPath !== "" && normalizedPath.startsWith(normalizedItemPath);
      });
    }
    
    return match ? match.label : 'Dashboard';
  };

  const activeItem = getActiveItem();

  const containerVariants = {
    expanded: { width: '280px' },
    collapsed: { width: '88px' }
  };

  return (
    <motion.div 
      initial="expanded"
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={containerVariants}
      className="fixed left-0 top-0 h-screen bg-white border-r border-slate-100 text-slate-600 flex flex-col z-50 transition-all duration-300 ease-in-out"
    >
      {/* Brand area */}
      <div className="h-20 flex items-center px-6 relative border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-600/20 flex-shrink-0">
            <Zap className="text-slate-900 w-6 h-6 fill-current" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-bold text-xl tracking-tight text-slate-900 whitespace-nowrap"
              >
                BPA <span className="text-violet-600">PRO</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-7 w-6 h-6 bg-white rounded-full flex items-center justify-center text-slate-600 border border-slate-200 shadow-md hover:text-violet-600 transition-colors z-50"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Main navigation */}
      <div className="flex-1 py-8 overflow-y-auto custom-scrollbar px-4 space-y-2">
        <div className="mb-4">
          {!isCollapsed && <p className="px-3 text-[12px] font-black text-slate-800 uppercase tracking-widest mb-5 opacity-100">Executive</p>}
          <div className="space-y-1">
            {executiveItems.map((item) => (
              <SidebarItem 
                key={item.label}
                {...item}
                isActive={activeItem === item.label}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 mt-4">
          {!isCollapsed && <p className="px-3 text-[12px] font-black text-slate-800 uppercase tracking-widest mb-5 opacity-100">Workspace Hub</p>}
          <div className="space-y-1">
            {menuItems.map((item) => (
              <SidebarItem 
                key={item.label}
                {...item}
                isActive={activeItem === item.label}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 mt-4">
          {!isCollapsed && <p className="px-3 text-[12px] font-black text-slate-800 uppercase tracking-widest mb-5 opacity-100">Neural Assets</p>}
          <div className="space-y-1">
            {analyticItems.map((item) => (
              <SidebarItem 
                key={item.label}
                {...item}
                isActive={activeItem === item.label}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 mt-4">
          {!isCollapsed && <p className="px-3 text-[12px] font-black text-slate-800 uppercase tracking-widest mb-5 opacity-100">Sovereign Control</p>}
          <div className="space-y-1">
            {adminItems.map((item) => (
              <SidebarItem 
                key={item.label}
                {...item}
                isActive={activeItem === item.label}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </div>
      </div>

      {/* User profile & Footer */}
      <div className="p-4 border-t border-slate-100">
        <div className={`flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-white cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-full border-2 border-violet-500/10 overflow-hidden bg-white flex-shrink-0">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">Praneeth Kumar</p>
              <p className="text-[11px] text-slate-700 font-black uppercase tracking-widest truncate">System Architect</p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button className="w-full mt-4 flex items-center justify-center gap-2 p-3 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-transparent transition-all">
            <LogOut size={18} />
            <span className="text-sm font-bold">Log out</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
  color?: string;
  path?: string;
}

const SidebarItem = ({ icon: Icon, label, isActive, isCollapsed, color = "", path = "#" }: SidebarItemProps) => {
  return (
    <a
      href={path}
      className={`
        group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-300
        ${isActive ? 'bg-violet-600 text-white shadow-2xl shadow-violet-600/30 ring-1 ring-violet-400/20' : 'text-slate-700 hover:text-violet-600 hover:bg-slate-50'}
        ${isCollapsed ? 'justify-center' : ''}
      `}
    >
      <Icon size={20} className={`${isActive ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'} transition-colors duration-200`} />
      
      {!isCollapsed && (
        <span className={`text-[15px] font-bold whitespace-nowrap overflow-hidden text-ellipsis ${isActive ? 'text-slate-900' : 'text-slate-900 group-hover:text-violet-600'}`}>
          {label}
        </span>
      )}

      {/* Tooltip for collapsed view */}
      {isCollapsed && (
        <div className="absolute left-full ml-6 px-4 py-2 bg-white text-white rounded-lg text-[11px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl shadow-slate-900/20 whitespace-nowrap z-50">
          <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
          {label}
        </div>
      )}
    </a>
  );
};






