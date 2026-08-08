import React, { useState } from 'react';
import { Search, Filter, CheckCircle2, XCircle, Settings, Plus, ExternalLink, Power, Cloud, Link2 } from 'lucide-react';
import { GlassCard } from '../GlassCard';

export const IntegrationHub = () => {
  const [activeTab, setActiveTab] = useState('all'); // all, connected, available

  const integrations = [
    { id: 'app_slack', name: 'Slack', category: 'Communication', status: 'connected', desc: 'Send workflow notifications and alerts directly to Slack channels.', icon: 'S', color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100' },
    { id: 'app_jira', name: 'Jira Software', category: 'Development', status: 'connected', desc: 'Sync project milestones, epics, and tasks two-way with Jira.', icon: 'J', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
    { id: 'app_qb', name: 'QuickBooks', category: 'Finance', status: 'connected', desc: 'Automatically push invoices and track payments in QuickBooks Online.', icon: 'QB', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { id: 'app_stripe', name: 'Stripe', category: 'Finance', status: 'available', desc: 'Accept credit card payments and manage subscriptions directly.', icon: 'St', color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-100' },
    { id: 'app_github', name: 'GitHub', category: 'Development', status: 'available', desc: 'Link commits and pull requests to internal project tasks.', icon: 'GH', color: 'text-slate-700', bg: 'bg-slate-100', border: 'border-slate-200' },
    { id: 'app_hubspot', name: 'HubSpot', category: 'CRM', status: 'available', desc: 'Sync leads and CRM data to keep marketing and sales aligned.', icon: 'H', color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' },
  ];

  const filtered = integrations.filter(app => {
     if (activeTab === 'connected') return app.status === 'connected';
     if (activeTab === 'available') return app.status === 'available';
     return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
            <TabButton active={activeTab === 'all'} onClick={() => setActiveTab('all')} label="All Apps" />
            <TabButton active={activeTab === 'connected'} onClick={() => setActiveTab('connected')} label="Connected" />
            <TabButton active={activeTab === 'available'} onClick={() => setActiveTab('available')} label="Available" />
         </div>

         <div className="flex items-center gap-2">
            <div className="relative w-64 hidden md:block">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
               <input 
                  type="text" 
                  placeholder="Search integrations..." 
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-violet-500 transition-colors"
               />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
               <Plus size={14}/> Custom Webhook
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filtered.map(app => (
            <GlassCard key={app.id} className="p-6 bg-white border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between group">
               <div>
                  <div className="flex items-start justify-between mb-4">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl border ${app.bg} ${app.color} ${app.border}`}>
                        {app.icon}
                     </div>
                     {app.status === 'connected' ? (
                        <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-1 rounded-lg">
                           <CheckCircle2 size={12}/> Connected
                        </span>
                     ) : (
                        <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-slate-50 text-slate-500 border border-slate-100 px-2 py-1 rounded-lg">
                           <Cloud size={12}/> Cloud App
                        </span>
                     )}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-1">{app.name}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">{app.category}</p>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed mb-6">{app.desc}</p>
               </div>
               
               <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                  {app.status === 'connected' ? (
                     <>
                        <button className="flex-1 py-2 bg-slate-50 text-rose-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200 hover:bg-rose-50 hover:border-rose-200 transition-colors flex items-center justify-center gap-2">
                           <Power size={14} /> Disconnect
                        </button>
                        <button className="w-10 h-10 bg-slate-50 text-slate-600 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors">
                           <Settings size={16} />
                        </button>
                     </>
                  ) : (
                     <button className="flex-1 py-2 bg-violet-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/20 flex items-center justify-center gap-2">
                        <Link2 size={14} /> Connect App
                     </button>
                  )}
               </div>
            </GlassCard>
         ))}
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${active ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}
  >
    {label}
  </button>
);
