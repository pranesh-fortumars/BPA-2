import React, { useState } from 'react';
import { Bot, Play, Square, Settings, Activity, Plus, Database, Clock, RefreshCw } from 'lucide-react';
import { GlassCard } from '../GlassCard';

export const AgentFleetManager = () => {
  const [agents, setAgents] = useState([
    { id: 'AGT-01', name: 'Lead Scorer Alpha', status: 'Running', type: 'Data Processor', lastRun: '2m ago', successRate: 98, iconColor: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'AGT-02', name: 'Invoice Chaser', status: 'Idle', type: 'Communication', lastRun: '1h ago', successRate: 100, iconColor: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'AGT-03', name: 'Nightly QA Tester', status: 'Scheduled', type: 'Testing', lastRun: '14h ago', successRate: 92, iconColor: 'text-violet-500', bg: 'bg-violet-50' },
    { id: 'AGT-04', name: 'Competitor Intel', status: 'Failed', type: 'Web Scraper', lastRun: '4h ago', successRate: 45, iconColor: 'text-rose-500', bg: 'bg-rose-50' },
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="flex items-center gap-4 p-4 bg-slate-900 rounded-2xl w-fit shadow-xl">
            <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/30">
               <Activity size={20} />
            </div>
            <div>
               <h2 className="text-sm font-black uppercase tracking-widest text-white">Fleet Status</h2>
               <p className="text-[10px] font-bold text-slate-400">1 Running • 3 Standby</p>
            </div>
         </div>
         
         <button className="flex items-center gap-2 px-5 py-3 bg-violet-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-violet-700 transition-colors shadow-xl shadow-violet-600/20">
            <Plus size={16}/> Deploy New Agent
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {agents.map(agent => (
            <GlassCard key={agent.id} className="p-6 bg-white border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden group">
               {agent.status === 'Running' && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500 animate-pulse"></div>
               )}
               {agent.status === 'Failed' && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500"></div>
               )}
               
               <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${agent.bg}`}>
                        <Bot size={24} className={agent.iconColor} />
                     </div>
                     <div>
                        <div className="flex items-center gap-2 mb-1">
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{agent.id}</span>
                           <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${agent.status === 'Running' ? 'bg-emerald-100 text-emerald-700 flex items-center gap-1' : agent.status === 'Idle' || agent.status === 'Scheduled' ? 'bg-slate-100 text-slate-600' : 'bg-rose-100 text-rose-700'}`}>
                              {agent.status === 'Running' && <RefreshCw size={10} className="animate-spin" />}
                              {agent.status}
                           </span>
                        </div>
                        <h3 className="text-base font-black text-slate-900">{agent.name}</h3>
                        <p className="text-xs font-bold text-slate-500 mt-0.5">{agent.type}</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-2">
                     <button 
                        onClick={() => toggleStatus(agent.id)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${agent.status === 'Running' ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}
                     >
                        {agent.status === 'Running' ? <Square size={16} fill="currentColor"/> : <Play size={16} fill="currentColor"/>}
                     </button>
                     <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-slate-100 transition-colors">
                        <Settings size={16} />
                     </button>
                  </div>
               </div>

               <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  <div>
                     <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1"><Clock size={10}/> Last Run</span>
                     <span className="text-xs font-bold text-slate-900">{agent.lastRun}</span>
                  </div>
                  <div>
                     <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1"><Database size={10}/> Records Processed</span>
                     <span className="text-xs font-bold text-slate-900">1,204</span>
                  </div>
                  <div>
                     <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Success Rate</span>
                     <div className="flex items-center gap-2">
                        <span className={`text-xs font-black ${agent.successRate > 90 ? 'text-emerald-600' : 'text-rose-600'}`}>{agent.successRate}%</span>
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                           <div className={`h-full ${agent.successRate > 90 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${agent.successRate}%` }}></div>
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
