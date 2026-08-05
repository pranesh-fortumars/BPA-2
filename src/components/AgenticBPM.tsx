import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Cpu, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight,
  Database,
  Search,
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from './GlassCard';

const agents = [
  { id: 1, name: 'Procurement Agent', status: 'Active', tasks: 12, efficiency: 98.4, color: 'text-violet-400', icon: Database },
  { id: 2, name: 'HR Onboarding Bot', status: 'Idle', tasks: 0, efficiency: 96.2, color: 'text-emerald-600', icon: Users },
  { id: 3, name: 'Finance Auditor (AI)', status: 'Monitoring', tasks: 154, efficiency: 99.8, color: 'text-amber-600', icon: ShieldCheck },
  { id: 4, name: 'IT Provisioner', status: 'Active', tasks: 5, efficiency: 92.1, color: 'text-blue-400', icon: Cpu },
];

export const AgenticBPM = () => {
  const [selectedAgent, setSelectedAgent] = useState(agents[2]);
  const [logs, setLogs] = useState([
    { id: 1, time: '10:52:01', msg: 'Analyzing vendor quotation for Q3 Hardware batch.' },
    { id: 2, time: '10:52:05', msg: 'Risk detected: Delivery SLA > 14 days. Initiating re-negotiation.' },
    { id: 3, time: '10:52:10', msg: 'Comparing 24 market providers for competitive pricing.' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        msg: `Agent ${selectedAgent.name} performing autonomous audit step #${Math.floor(Math.random() * 1000)}...`
      };
      setLogs(prev => [newLog, ...prev].slice(0, 5));
    }, 4000);
    return () => clearInterval(interval);
  }, [selectedAgent]);

  return (
    <div className="space-y-8">
      {/* Agent Overview Stats */}
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {agents.map((agent) => (
          <GlassCard 
            key={agent.id}
            onClick={() => setSelectedAgent(agent)}
            className={`p-6 cursor-pointer border-2 transition-all ${selectedAgent.id === agent.id ? 'border-violet-500/50 bg-violet-500/5 shadow-[0_0_20px_rgba(79,70,229,0.1)]' : 'border-slate-100 hover:border-slate-100'}`}
          >
             <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-white border border-slate-100 ${agent.color}`}>
                   <agent.icon size={24} />
                </div>
                <div>
                   <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">{agent.name}</h3>
                   <div className="flex items-center gap-2 mt-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`}></div>
                      <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">{agent.status}</span>
                   </div>
                </div>
             </div>
             <div className="mt-6 flex justify-between items-end border-t border-slate-100 pt-4">
                <div>
                   <p className="text-[10px] text-slate-700 font-bold uppercase mb-1">Efficiency Index</p>
                   <p className="text-lg font-black text-slate-900">{agent.efficiency}%</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] text-slate-700 font-bold uppercase mb-1">Queue</p>
                   <p className="text-lg font-black text-violet-400">{agent.tasks}</p>
                </div>
             </div>
          </GlassCard>
        ))}
      </div>

      {/* Main Agent Console */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         {/* Live Execution Stream */}
         <GlassCard className="xl:col-span-2 p-8">
            <div className="flex justify-between items-center mb-10">
               <div>
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-2">
                     <Zap className="text-violet-500" />
                     {selectedAgent.name} Console
                  </h2>
                  <p className="text-slate-700 text-sm mt-1">Autonomous decision stream and agentic logic flow</p>
               </div>
               <div className="px-4 py-2 bg-violet-600/10 border border-violet-500/20 rounded-xl text-[10px] font-black text-violet-400 uppercase tracking-widest flex items-center gap-2">
                  <Bot size={14} /> Neural-Agent Core v4
               </div>
            </div>

            <div className="space-y-4">
               <AnimatePresence mode="popLayout">
                  {logs.map((log) => (
                    <motion.div 
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-white/50 border border-slate-100 rounded-xl flex gap-6"
                    >
                       <span className="text-violet-500 font-mono text-[10px] shrink-0 mt-1">[{log.time}]</span>
                       <p className="text-xs text-slate-300 font-medium leading-relaxed">{log.msg}</p>
                    </motion.div>
                  ))}
               </AnimatePresence>
            </div>

            <div className="mt-12 p-6 bg-white/50 border border-slate-100 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-2xl">
                      <Sparkles size={32} />
                   </div>
                   <div>
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Predictive Re-routing Proposed</h4>
                      <p className="text-xs text-slate-700 max-w-sm mt-1">Agent recommends skipping Level 2 Approval for low-risk vendor (Score: 99.4/100).</p>
                   </div>
                </div>
                <div className="flex gap-2">
                   <button className="px-5 py-2.5 bg-white hover:bg-slate-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Audit Reason</button>
                   <button className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-violet-600/20">Auto-Apply</button>
                </div>
            </div>
         </GlassCard>

         {/* Knowledge Base & Integrations */}
         <div className="space-y-8">
            <GlassCard className="p-8">
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Database size={16} className="text-violet-400" />
                  Agent Knowledge Matrix
               </h3>
               <div className="space-y-4">
                  {[
                    { label: 'SAP ERP Connector', status: 'Synchronized', color: 'text-emerald-600' },
                    { label: 'Market Quotation API', status: 'Real-time', color: 'text-violet-400' },
                    { label: 'Legal Compliance 2026', status: 'Up to date', color: 'text-emerald-600' },
                    { label: 'Corporate SLA DB', status: 'Index Ready', color: 'text-violet-400' },
                  ].map(kb => (
                    <div key={kb.label} className="p-3 bg-white border border-slate-100 rounded-xl flex justify-between items-center group hover:border-slate-100 transition-all">
                       <span className="text-xs font-bold text-slate-600 group-hover:text-slate-200 transition-colors">{kb.label}</span>
                       <span className={`text-[10px] font-black uppercase tracking-widest ${kb.color}`}>{kb.status}</span>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-6 py-3 bg-white/50 hover:bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-600 hover:text-slate-900 uppercase tracking-widest transition-all">
                  Sync All Sources
               </button>
            </GlassCard>

            <GlassCard className="p-8 bg-amber-500/5 border-amber-500/20">
               <div className="flex items-center gap-4 mb-4">
                  <AlertTriangle className="text-amber-500" size={24} />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">SLA Vulnerability</h3>
               </div>
               <p className="text-xs text-slate-700 leading-relaxed mb-6">Agent detected that 12% of <span className="text-amber-500 font-bold">Procurement</span> workflows hit warning thresholds last 72 hours.</p>
               <div className="space-y-2">
                  <div className="flex justify-between items-end">
                     <span className="text-[10px] font-bold text-slate-700 uppercase">Warning Severity</span>
                     <span className="text-sm font-black text-amber-500">Critical Heat</span>
                  </div>
                  <div className="h-2 w-full bg-white rounded-full overflow-hidden">
                     <div className="h-full w-[65%] bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]"></div>
                  </div>
               </div>
               <button className="w-full mt-6 flex items-center justify-center gap-2 py-3 bg-white text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-slate-100">
                  Generate Remediation Plan <ArrowRight size={14} />
               </button>
            </GlassCard>
         </div>
      </div>
    </div>
  );
};






