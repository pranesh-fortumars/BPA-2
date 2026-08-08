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
  Layers,
  Users2,
  FolderKanban,
  GraduationCap,
  Calendar,
  Inbox
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { currentUser, logoutUser } from '../store/authStore';

const executiveItems = [
  { icon: Activity, label: 'Executive Center', path: '/executive', color: 'text-rose-500' },
];

const crmItems = [
  { icon: Users2, label: 'CRM & Sales', path: '/crm', color: 'text-blue-500' },
];

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', color: 'text-violet-500' },
  { icon: FolderKanban, label: 'Project Delivery', path: '/projects', color: 'text-blue-600' },
  { icon: Workflow, label: 'Orchestration Studio', path: '/builder', color: 'text-purple-500' },
  { icon: Bot, label: 'AI Agent Fleets', path: '/agents', color: 'text-emerald-500' },
  { icon: FileText, label: 'Neural Documents', path: '/documents', color: 'text-amber-500' },
  { icon: Network, label: 'Integration Hub', path: '/integrations', color: 'text-rose-500' },
  { icon: CheckSquare, label: 'My Tasks', path: '/tasks', color: 'text-blue-500' },
];

const hrItems = [
  { icon: GraduationCap, label: 'HR & Talent', path: '/hr', color: 'text-emerald-500' },
  { icon: Calendar, label: 'Resource Planner', path: '/planner', color: 'text-amber-500' },
  { icon: Inbox, label: 'Approval Inbox', path: '/approvals', color: 'text-rose-500' },
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
  const user = useStore(currentUser);
  
  // Dynamically determine active item from URL path
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  
  const getActiveItem = () => {
    const allItems = [...executiveItems, ...crmItems, ...menuItems, ...hrItems, ...analyticItems, ...adminItems];
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

  const hasAccess = (section: string) => {
    if (!user) return false;
    const role = user.role;
    if (role === 'CEO') return true; // CEO sees all

    switch (section) {
      case 'Executive':
        return ['Finance Manager'].includes(role);
      case 'CRM':
        return ['Sales Director'].includes(role);
      case 'Workspace':
        return ['Sales Director', 'HR Admin', 'Lead Engineer', 'Developer', 'Project Manager', 'Client', 'Designer', 'Finance Manager'].includes(role);
      case 'HR':
        return ['HR Admin', 'Project Manager'].includes(role);
      case 'Analytics':
        return ['Sales Director', 'Finance Manager'].includes(role);
      case 'Admin':
        return false;
      default:
        return false;
    }
  };

  const filteredMenuItems = menuItems.filter(item => {
    if (!user) return false;
    const role = user.role;
    if (role === 'CEO') return true;
    if (['Lead Engineer', 'Developer'].includes(role)) {
      return ['Project Delivery', 'Orchestration Studio', 'AI Agent Fleets', 'Integration Hub', 'My Tasks'].includes(item.label);
    }
    if (['HR Admin', 'Sales Director'].includes(role)) {
      return ['Dashboard', 'My Tasks'].includes(item.label);
    }
    if (['Project Manager'].includes(role)) {
      return ['Dashboard', 'Project Delivery', 'My Tasks'].includes(item.label);
    }
    if (['Finance Manager'].includes(role)) {
      return ['My Tasks'].includes(item.label);
    }
    if (['Client', 'Designer'].includes(role)) {
      return ['Neural Documents', 'My Tasks'].includes(item.label);
    }
    return false;
  });

  const filteredAnalyticItems = analyticItems.filter(item => {
    if (!user) return false;
    if (user.role === 'CEO') return true;
    if (user.role === 'Sales Director') return item.label === 'Process Intelligence';
    if (user.role === 'Finance Manager') return true;
    return false;
  });

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
        {hasAccess('Executive') && (
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
        )}

        {hasAccess('CRM') && (
          <div className="pt-4 border-t border-slate-100 mt-4">
            {!isCollapsed && <p className="px-3 text-[12px] font-black text-slate-800 uppercase tracking-widest mb-5 opacity-100">Client Ecosystem</p>}
            <div className="space-y-1">
              {crmItems.map((item) => (
                <SidebarItem 
                  key={item.label}
                  {...item}
                  isActive={activeItem === item.label}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
          </div>
        )}

        {hasAccess('Workspace') && filteredMenuItems.length > 0 && (
          <div className="pt-4 border-t border-slate-100 mt-4">
            {!isCollapsed && <p className="px-3 text-[12px] font-black text-slate-800 uppercase tracking-widest mb-5 opacity-100">Workspace Hub</p>}
            <div className="space-y-1">
              {filteredMenuItems.map((item) => (
                <SidebarItem 
                  key={item.label}
                  {...item}
                  isActive={activeItem === item.label}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
          </div>
        )}

        {hasAccess('HR') && (
          <div className="pt-4 border-t border-slate-100 mt-4">
            {!isCollapsed && <p className="px-3 text-[12px] font-black text-slate-800 uppercase tracking-widest mb-5 opacity-100">Operations Hub</p>}
            <div className="space-y-1">
              {hrItems.map((item) => (
                <SidebarItem 
                  key={item.label}
                  {...item}
                  isActive={activeItem === item.label}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
          </div>
        )}

        {hasAccess('Analytics') && filteredAnalyticItems.length > 0 && (
          <div className="pt-4 border-t border-slate-100 mt-4">
            {!isCollapsed && <p className="px-3 text-[12px] font-black text-slate-800 uppercase tracking-widest mb-5 opacity-100">Neural Assets</p>}
            <div className="space-y-1">
              {filteredAnalyticItems.map((item) => (
                <SidebarItem 
                  key={item.label}
                  {...item}
                  isActive={activeItem === item.label}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
          </div>
        )}

        {hasAccess('Admin') && (
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
        )}
      </div>

      {/* User profile & Footer */}
      <div className="p-4 border-t border-slate-100">
        <div className={`flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-slate-50 cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}>
          <div className={`w-10 h-10 rounded-[1rem] ${user?.avatarColor || 'bg-slate-200'} flex items-center justify-center text-white font-black overflow-hidden shadow-sm flex-shrink-0`}>
             {user ? user.name.charAt(0) : <UserCheck size={18}/>}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{user ? user.name : 'Unknown User'}</p>
              <p className="text-[10px] text-violet-500 font-black uppercase tracking-widest truncate mt-0.5">{user ? user.role : 'Guest'}</p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button 
            onClick={() => logoutUser()}
            className="w-full mt-4 flex items-center justify-center gap-2 p-3 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-transparent transition-all"
          >
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






