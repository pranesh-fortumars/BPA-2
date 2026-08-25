import React, { useState } from 'react';
import { Bot, Play, Square, Settings, Activity, Plus, Database, Clock, RefreshCw } from 'lucide-react';
import { GlassCard } from '../GlassCard';

export const AgentFleetManager = () => {
  const [agents, setAgents] = useState([
    { id: 'AGT-01', name: 'Lead Scorer Alpha', status: 'Running', type: 'Data Processor', lastRun: '2m ago', successRate: 98, iconColor: 'text-success', bg: 'bg-success/10', border: 'border-success/20' },
    { id: 'AGT-02', name: 'Invoice Chaser', status: 'Idle', type: 'Communication', lastRun: '1h ago', successRate: 100, iconColor: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
    { id: 'AGT-03', name: 'Nightly QA Tester', status: 'Scheduled', type: 'Testing', lastRun: '14h ago', successRate: 92, iconColor: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/20' },
    { id: 'AGT-04', name: 'Competitor Intel', status: 'Failed', type: 'Web Scraper', lastRun: '4h ago', successRate: 45, iconColor: 'text-critical', bg: 'bg-critical/10', border: 'border-critical/20' },
  ]);

  const toggleStatus = (id: string) => {
    setAgents(prev => prev.map(a => {
      if (a.id === id) {
        if (a.status === 'Running') return { ...a, status: 'Idle' };
        if (a.status === 'Idle' || a.status === 'Failed' || a.status === 'Scheduled') return { ...a, status: 'Running' };
      }
      return a;
    }));
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="flex items-center gap-4 p-4 bg-surface border border-border rounded-2xl w-fit shadow-sm">
            <div className="w-10 h-10 bg-success/20 text-success rounded-xl flex items-center justify-center border border-success/30">
               <Activity size={20} />
            </div>
            <div>
               <h2 className="text-sm font-black uppercase tracking-widest text-foreground">Fleet Status</h2>
               <p className="text-[10px] font-bold text-muted">1 Running • 3 Standby</p>
            </div>
         </div>
         
         <button className="flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-sm shadow-primary/20">
            <Plus size={16}/> Deploy New Agent
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {agents.map(agent => (
            <GlassCard key={agent.id} className="p-6 bg-surface border border-border hover:border-primary/30 transition-all relative overflow-hidden group shadow-sm">
               {agent.status === 'Running' && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-success animate-pulse shadow-[0_0_10px_#10b981]"></div>
               )}
               {agent.status === 'Failed' && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-critical shadow-[0_0_10px_#ef4444]"></div>
               )}
               
               <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${agent.bg} ${agent.border}`}>
                        <Bot size={24} className={agent.iconColor} />
                     </div>
                     <div>
                        <div className="flex items-center gap-2 mb-1">
                           <span className="text-[10px] font-black uppercase tracking-widest text-muted bg-surface-elevated border border-border px-2 py-0.5 rounded-md">{agent.id}</span>
                           <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${agent.status === 'Running' ? 'bg-success/10 text-success border-success/20 flex items-center gap-1' : agent.status === 'Idle' || agent.status === 'Scheduled' ? 'bg-surface-elevated text-muted border-border' : 'bg-critical/10 text-critical border-critical/20'}`}>
                              {agent.status === 'Running' && <RefreshCw size={10} className="animate-spin" />}
                              {agent.status}
                           </span>
                        </div>
                        <h3 className="text-base font-black text-foreground">{agent.name}</h3>
                        <p className="text-xs font-bold text-muted mt-0.5">{agent.type}</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-2">
                     <button 
                        onClick={() => toggleStatus(agent.id)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors border ${agent.status === 'Running' ? 'bg-critical/10 text-critical border-critical/20 hover:bg-critical/20' : 'bg-success/10 text-success border-success/20 hover:bg-success/20'}`}
                     >
                        {agent.status === 'Running' ? <Square size={16} fill="currentColor"/> : <Play size={16} fill="currentColor"/>}
                     </button>
                     <button className="w-10 h-10 rounded-xl bg-surface-elevated border border-border text-muted flex items-center justify-center hover:text-foreground transition-colors">
                        <Settings size={16} />
                     </button>
                  </div>
               </div>

               <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div>
                     <span className="block text-[9px] font-black uppercase tracking-widest text-muted mb-1 flex items-center gap-1"><Clock size={10}/> Last Run</span>
                     <span className="text-xs font-bold text-foreground">{agent.lastRun}</span>
                  </div>
                  <div>
                     <span className="block text-[9px] font-black uppercase tracking-widest text-muted mb-1 flex items-center gap-1"><Database size={10}/> Records Processed</span>
                     <span className="text-xs font-bold text-foreground">1,204</span>
                  </div>
                  <div>
                     <span className="block text-[9px] font-black uppercase tracking-widest text-muted mb-1">Success Rate</span>
                     <div className="flex items-center gap-2">
                        <span className={`text-xs font-black ${agent.successRate > 90 ? 'text-success' : 'text-critical'}`}>{agent.successRate}%</span>
                        <div className="flex-1 h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                           <div className={`h-full ${agent.successRate > 90 ? 'bg-success shadow-[0_0_10px_#10b981]' : 'bg-critical shadow-[0_0_10px_#ef4444]'}`} style={{ width: `${agent.successRate}%` }}></div>
                        </div>
                     </div>
                  </div>
               </div>
            </GlassCard>
         ))}
      </div>
    </div>
  );
};
