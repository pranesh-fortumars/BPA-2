import React, { useState, useEffect } from 'react';
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
  Inbox,
  Landmark,
  FileSignature,
  Send,
  Laptop,
  Cpu,
  Database,
  TerminalSquare,
  Scale,
  CloudCog,
  GanttChartSquare,
  ListTodo,
  Boxes
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { currentUser, logoutUser } from '../store/authStore';

// COMMAND CENTER
const commandCenterItems = [
  { icon: LayoutDashboard, label: 'Command Center', path: '/dashboard', color: 'text-violet-500' },
];

// PROCESS
const processItems = [
  { icon: BarChart3, label: 'Process Intelligence', path: '/analytics', color: 'text-blue-400' },
  { icon: Workflow, label: 'Process Designer', path: '/builder', color: 'text-emerald-500' },
  { icon: GanttChartSquare, label: 'Process Instances', path: '/instances', color: 'text-amber-500' },
  { icon: CheckSquare, label: 'Human Tasks & Approvals', path: '/tasks', color: 'text-rose-500' },
];

// AUTOMATION
const automationItems = [
  { icon: Zap, label: 'Automations', path: '/automations', color: 'text-violet-400' },
  { icon: Bot, label: 'AI Agents', path: '/agents', color: 'text-cyan-400' },
  { icon: Cpu, label: 'RPA Workforce', path: '/rpa', color: 'text-blue-500' },
  { icon: FileText, label: 'Document Intelligence', path: '/documents', color: 'text-amber-400' },
];

// BUILD & CONNECT
const buildItems = [
  { icon: Network, label: 'Integration Hub', path: '/integrations', color: 'text-rose-400' },
  { icon: TerminalSquare, label: 'API & Webhooks', path: '/api', color: 'text-emerald-400' },
  { icon: Scale, label: 'Rules & Decisions', path: '/rules', color: 'text-violet-500' },
  { icon: Calendar, label: 'Schedules', path: '/schedules', color: 'text-blue-400' },
];

// Hack for lucide icon
const BrainCircuit = CloudCog;

// INSIGHTS
const insightItems = [
  { icon: PieChart, label: 'Analytics & ROI', path: '/roi', color: 'text-emerald-500' },
  { icon: Activity, label: 'Performance Intelligence', path: '/performance', color: 'text-amber-500' },
  { icon: BrainCircuit, label: 'AI Copilot', path: '/copilot', color: 'text-violet-400' },
];

// GOVERNANCE
const governanceItems = [
  { icon: ClipboardList, label: 'Audit Center', path: '/audit', color: 'text-amber-500' },
  { icon: ShieldCheck, label: 'Security & Access', path: '/security', color: 'text-rose-500' },
  { icon: Database, label: 'Environments & Deployments', path: '/environments', color: 'text-cyan-500' },
  { icon: Settings, label: 'Administration', path: '/settings', color: 'text-slate-400' },
];

export const Sidebar = ({ currentPath: initialPath = '' }: { currentPath?: string }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = useStore(currentUser);
  
  const [currentPath, setCurrentPath] = useState(typeof window !== 'undefined' ? window.location.pathname : initialPath);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    document.addEventListener('astro:page-load', handleLocationChange);

    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('astro:page-load', handleLocationChange);
    };
  }, []);
  
  const getActiveItem = () => {
    const allItems = [
      ...commandCenterItems,
      ...processItems,
      ...automationItems,
      ...buildItems,
      ...insightItems,
      ...governanceItems
    ];
    
    const normalizedPath = currentPath.replace(/\/$/, "");
    let match = allItems.find(item => {
      const normalizedItemPath = (item.path || "").replace(/\/$/, "");
      return normalizedPath === normalizedItemPath;
    });
    
    if (!match) {
      match = allItems.find(item => {
        const normalizedItemPath = (item.path || "").replace(/\/$/, "");
        return normalizedItemPath !== "" && normalizedPath.startsWith(normalizedItemPath);
      });
    }
    
    return match ? match.label : 'Command Center';
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
      className="fixed left-0 top-0 h-screen bg-background border-r border-border text-foreground flex flex-col z-50 transition-all duration-300 ease-in-out"
    >
      {/* Brand area */}
      <div className="h-16 flex items-center px-6 relative border-b border-border bg-surface">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
             <div className="grid grid-cols-2 gap-[2px]">
               <div className="w-3 h-3 bg-primary rounded-tl-sm rounded-br-sm"></div>
               <div className="w-3 h-3 bg-primary/40 rounded-tr-sm rounded-bl-sm"></div>
               <div className="w-3 h-3 bg-primary/70 rounded-tr-sm rounded-bl-sm"></div>
               <div className="w-3 h-3 bg-primary rounded-tl-sm rounded-br-sm"></div>
             </div>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col"
              >
                <span className="font-bold text-sm tracking-tight text-foreground whitespace-nowrap uppercase">Cognithorz</span>
                <span className="text-[9px] text-muted uppercase tracking-widest">Enterprise Automation Platform</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-5 w-6 h-6 bg-surface rounded-full flex items-center justify-center text-muted border border-border shadow-md hover:text-primary transition-colors z-50"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Main navigation */}
      <div className="flex-1 py-6 overflow-y-auto custom-scrollbar px-3 space-y-6">
        
        <SidebarSection title="COMMAND CENTER" items={commandCenterItems} activeItem={activeItem} isCollapsed={isCollapsed} />
        <SidebarSection title="PROCESS" items={processItems} activeItem={activeItem} isCollapsed={isCollapsed} />
        <SidebarSection title="AUTOMATION" items={automationItems} activeItem={activeItem} isCollapsed={isCollapsed} />
        <SidebarSection title="BUILD & CONNECT" items={buildItems} activeItem={activeItem} isCollapsed={isCollapsed} />
        <SidebarSection title="INSIGHTS" items={insightItems} activeItem={activeItem} isCollapsed={isCollapsed} />
        <SidebarSection title="GOVERNANCE" items={governanceItems} activeItem={activeItem} isCollapsed={isCollapsed} />
        
      </div>

      {/* Footer Area - Collapse Toggle (Optional) */}
      <div className="p-4 border-t border-border bg-surface">
         <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center gap-3 px-3 py-2 text-muted hover:text-foreground transition-colors rounded-lg hover:bg-surface-elevated"
         >
            <ChevronLeft size={18} className={isCollapsed ? "rotate-180 transition-transform" : "transition-transform"} />
            {!isCollapsed && <span className="text-sm font-medium">Collapse</span>}
         </button>
      </div>
    </motion.div>
  );
};

interface SidebarSectionProps {
  title: string;
  items: any[];
  activeItem: string;
  isCollapsed: boolean;
}

const SidebarSection = ({ title, items, activeItem, isCollapsed }: SidebarSectionProps) => {
   if (items.length === 0) return null;
   
   return (
      <div className="mb-2">
         {!isCollapsed && <p className="px-3 text-[10px] font-bold text-primary uppercase tracking-widest mb-3">{title}</p>}
         <div className="space-y-1">
            {items.map((item: any) => (
               <SidebarItem 
                  key={item.label}
                  {...item}
                  isActive={activeItem === item.label}
                  isCollapsed={isCollapsed}
               />
            ))}
         </div>
      </div>
   );
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  color?: string;
  path?: string;
}

const SidebarItem = ({ icon: Icon, label, isActive, isCollapsed, color = "", path = "#" }: SidebarItemProps) => {
  return (
    <a
      href={path}
      className={`
        group relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200
        ${isActive ? 'bg-primary text-primary-foreground' : 'text-muted hover:text-foreground hover:bg-surface-elevated'}
        ${isCollapsed ? 'justify-center' : ''}
      `}
    >
      <Icon size={18} className={`${isActive ? 'text-primary-foreground' : `${color || 'text-muted'}`} transition-colors duration-200`} />
      
      {!isCollapsed && (
        <span className={`text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis ${isActive ? 'text-primary-foreground' : 'text-foreground'}`}>
          {label}
        </span>
      )}

      {/* Tooltip for collapsed view */}
      {isCollapsed && (
        <div className="absolute left-full ml-4 px-3 py-1.5 bg-surface-elevated text-foreground border border-border rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </a>
  );
};
