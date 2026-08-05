import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  AlertTriangle, 
  GitPullRequest, 
  Bug, 
  Terminal, 
  Kanban,
  BrainCircuit,
  MessageSquare,
  Clock,
  MoreVertical,
  Play
} from 'lucide-react';

export const ProjectDashboard = () => {
  const [activeTab, setActiveTab] = useState('board'); // board, engineering, ai

  return (
    <div className="space-y-6">
      {/* Top Nav Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
        <TabButton active={activeTab === 'board'} onClick={() => setActiveTab('board')} icon={Kanban} label="Sprint Board" />
        <TabButton active={activeTab === 'engineering'} onClick={() => setActiveTab('engineering')} icon={Terminal} label="Engineering" />
        <TabButton active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} icon={BrainCircuit} label="AI Manager" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'board' && <SprintBoard />}
          {activeTab === 'engineering' && <EngineeringWorkspace />}
          {activeTab === 'ai' && <AIManager />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* --- TAB COMPONENTS --- */

const SprintBoard = () => (
  <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm overflow-x-auto">
    <div className="flex items-center justify-between mb-8 min-w-[800px]">
      <div>
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Sprint 42: Foundation</h3>
        <p className="text-[10px] font-bold text-slate-500 mt-1">Oct 14 - Oct 28 • 14 days remaining</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex -space-x-2">
           <img className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" src="https://api.dicebear.com/7.x/avataaars/svg?seed=J" alt="Team" />
           <img className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" src="https://api.dicebear.com/7.x/avataaars/svg?seed=S" alt="Team" />
           <img className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" src="https://api.dicebear.com/7.x/avataaars/svg?seed=A" alt="Team" />
           <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[9px] font-black">+4</div>
        </div>
        <button className="px-4 py-2 bg-violet-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-500 transition-colors">
          Complete Sprint
        </button>
      </div>
    </div>
    
    <div className="flex gap-4 min-w-[800px]">
      <KanbanColumn title="To Do" count={12} items={[
        { id: 'BPA-101', title: 'Setup Authentication Flow', type: 'task', priority: 'high' },
        { id: 'BPA-104', title: 'Design System Migration', type: 'story', priority: 'medium' }
      ]} />
      <KanbanColumn title="In Progress" count={4} items={[
        { id: 'BPA-102', title: 'Integrate Razorpay API', type: 'task', priority: 'critical', user: 'S' },
        { id: 'BPA-105', title: 'Data Abstraction Layer', type: 'story', priority: 'high', user: 'J' }
      ]} />
      <KanbanColumn title="Code Review" count={2} items={[
        { id: 'BPA-99', title: 'Fix Header Alignment', type: 'bug', priority: 'low', user: 'A' }
      ]} />
      <KanbanColumn title="Done" count={18} items={[
        { id: 'BPA-95', title: 'Initialize Repository', type: 'task', priority: 'medium' }
      ]} />
    </div>
  </div>
);

const EngineeringWorkspace = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2 space-y-6">
      {/* Code Review Queue */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
           <GitPullRequest size={18} className="text-violet-500"/> Code Review Queue
        </h3>
        <div className="space-y-3">
           <PRRow id="PR #42" title="feat: implement AI lead scoring" author="Sarah" status="changes requested" comments={4} />
           <PRRow id="PR #43" title="fix: resolve infinite loop in CRM" author="John" status="approved" comments={1} />
           <PRRow id="PR #44" title="refactor: migrate to new data layer" author="Praneeth" status="pending review" comments={0} />
        </div>
      </div>
      
      {/* Build Status */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
               <CheckCircle2 className="text-emerald-400" size={24} />
            </div>
            <div>
               <h4 className="text-sm font-bold text-slate-100">Production Build Passed</h4>
               <p className="text-[10px] text-slate-400 font-bold font-mono mt-1">bpa-pro/main • deployed 12m ago</p>
            </div>
         </div>
         <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 border border-white/10">
            <Play size={14}/> Run Pipeline
         </button>
      </div>
    </div>

    {/* Bug Tracker */}
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
      <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
         <Bug size={18} className="text-rose-500"/> Active Issues
      </h3>
      <div className="space-y-4">
         <BugRow id="ISSUE-88" title="Memory leak in Safari" severity="critical" />
         <BugRow id="ISSUE-92" title="404 on Client Portal login" severity="high" />
         <BugRow id="ISSUE-95" title="Tooltip overflow on mobile" severity="low" />
      </div>
    </div>
  </div>
);

const AIManager = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 blur-[80px] rounded-full pointer-events-none"></div>
      
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="w-12 h-12 bg-rose-500/20 rounded-2xl flex items-center justify-center border border-rose-500/30">
          <AlertTriangle className="text-rose-400" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-black uppercase tracking-widest text-slate-100">Predictive Alerts</h3>
          <p className="text-xs text-slate-400 font-bold">AI Project Risk Analysis</p>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
           <div className="flex items-center justify-between mb-2">
             <span className="text-xs font-black text-rose-400 uppercase tracking-widest">78% Probability</span>
             <span className="text-[10px] font-bold text-slate-400">High Risk</span>
           </div>
           <p className="text-sm font-bold text-slate-100 leading-snug">
             "Module 4 is likely to miss the Friday deadline due to pending Razorpay API integration."
           </p>
           <button className="mt-4 px-4 py-2 bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-400 transition-colors w-full">
             Suggest Mitigation Plan
           </button>
        </div>
        
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
           <div className="flex items-center justify-between mb-2">
             <span className="text-xs font-black text-amber-400 uppercase tracking-widest">Resource Conflict</span>
             <span className="text-[10px] font-bold text-slate-400">Medium Risk</span>
           </div>
           <p className="text-sm font-bold text-slate-100 leading-snug">
             "Sarah is assigned to 3 critical bugs simultaneously. Suggest reallocating ISSUE-92 to John."
           </p>
           <button className="mt-4 px-4 py-2 bg-amber-500/20 text-amber-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-500/30 border border-amber-500/20 transition-colors w-full">
             Apply Reallocation
           </button>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col justify-between">
       <div>
         <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
            <BrainCircuit size={18} className="text-violet-500"/> Automated Summaries
         </h3>
         <p className="text-xs font-bold text-slate-500 mb-4 bg-slate-50 p-4 rounded-xl border border-slate-100 italic leading-relaxed">
           "Yesterday, the engineering team completed 14 story points. The CRM dashboard was deployed successfully. 
           We are slightly behind on the Client Portal QA testing. I have rescheduled the automated test suite to run at 2 PM today."
         </p>
       </div>
       <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
          Generate Weekly Client Report
       </button>
    </div>
  </div>
);

/* --- UTILS --- */

const TabButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${active ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}
  >
    <Icon size={16} /> {label}
  </button>
);

const KanbanColumn = ({ title, count, items }: any) => (
  <div className="flex-1 min-w-[250px] bg-slate-50/80 rounded-2xl p-3 border border-slate-100">
    <div className="flex items-center justify-between mb-4 px-2">
      <h4 className="text-[11px] font-black text-slate-600 uppercase tracking-widest">{title}</h4>
      <span className="text-[10px] font-black text-slate-400 bg-white px-2 py-0.5 rounded-lg border border-slate-200 shadow-sm">{count}</span>
    </div>
    <div className="space-y-3">
      {items.map((item: any) => (
        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-violet-300 hover:shadow-md transition-all cursor-grab">
           <div className="flex items-center justify-between mb-2">
             <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${item.type === 'bug' ? 'bg-rose-50 text-rose-600' : item.type === 'story' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>{item.id}</span>
             <button className="text-slate-300 hover:text-slate-900"><MoreVertical size={14}/></button>
           </div>
           <p className="text-xs font-bold text-slate-800 mb-4">{item.title}</p>
           <div className="flex items-center justify-between border-t border-slate-50 pt-3">
              <span className={`w-2 h-2 rounded-full ${item.priority === 'critical' ? 'bg-rose-500' : item.priority === 'high' ? 'bg-amber-500' : item.priority === 'medium' ? 'bg-blue-500' : 'bg-slate-300'}`}></span>
              {item.user && (
                 <div className="w-5 h-5 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[8px] font-black text-slate-600">{item.user}</div>
              )}
           </div>
        </div>
      ))}
    </div>
  </div>
);

const PRRow = ({ id, title, author, status, comments }: any) => (
  <div className="p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors flex flex-col gap-2">
     <div className="flex justify-between items-start">
        <p className="text-xs font-bold text-slate-900">{title}</p>
        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md whitespace-nowrap ${status === 'approved' ? 'bg-emerald-50 text-emerald-600' : status === 'changes requested' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>
          {status}
        </span>
     </div>
     <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold">
        <span>{id} by {author}</span>
        <span className="flex items-center gap-1"><MessageSquare size={12}/> {comments}</span>
     </div>
  </div>
);

const BugRow = ({ id, title, severity }: any) => (
  <div className="flex justify-between items-center p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
     <div>
        <p className="text-xs font-bold text-slate-900">{title}</p>
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">{id}</p>
     </div>
     <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${severity === 'critical' ? 'bg-rose-50 text-rose-600 border border-rose-100' : severity === 'high' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-slate-50 text-slate-500 border border-slate-200'}`}>
       {severity}
     </span>
  </div>
);
