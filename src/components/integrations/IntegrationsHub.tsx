import React from 'react';
import { Network, Activity, Search, Server, Shield, CheckCircle2, AlertTriangle, Settings } from 'lucide-react';

export const IntegrationsHub = () => {
  return (
    <div className="space-y-8">
      {/* API Health Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="flex items-center gap-4 relative z-10">
           <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
              <Activity className="text-emerald-400" size={24} />
           </div>
           <div>
              <h3 className="text-lg font-black uppercase tracking-widest text-slate-100">API Health Status</h3>
              <p className="text-xs text-slate-400 font-bold">All enterprise connectors are operating nominally.</p>
           </div>
        </div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="text-right">
              <p className="text-2xl font-black text-slate-100 tracking-tighter">99.99%</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Uptime</p>
           </div>
           <div className="text-right">
              <p className="text-2xl font-black text-slate-100 tracking-tighter">124ms</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Avg Latency</p>
           </div>
           <div className="h-10 w-px bg-white/10"></div>
           <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black uppercase tracking-widest transition-colors border border-white/10">
             View Webhooks
           </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Marketplace Sidebar */}
        <div className="w-full md:w-64 shrink-0 space-y-4">
           <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm relative">
              <Search className="absolute left-7 top-7 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search Integrations..." 
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 pl-10 pr-4 text-xs font-bold outline-none focus:border-violet-300 transition-colors"
              />
           </div>
           
           <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 px-2">Categories</h4>
              <nav className="space-y-1">
                 <CategoryBtn label="All Integrations" active count={24} />
                 <CategoryBtn label="Communication" count={3} />
                 <CategoryBtn label="DevOps" count={8} />
                 <CategoryBtn label="Finance" count={5} />
                 <CategoryBtn label="HR & Talent" count={2} />
              </nav>
           </div>
        </div>

        {/* Integration Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
           <IntegrationCard 
             name="Slack" 
             category="Communication" 
             desc="Send automated alerts, project updates, and approval workflows directly to Slack channels."
             status="connected"
             iconColor="bg-rose-50 text-rose-600"
             iconText="S"
           />
           <IntegrationCard 
             name="GitHub" 
             category="DevOps" 
             desc="Sync repositories, track pull requests, and trigger CI/CD pipelines from the OS."
             status="connected"
             iconColor="bg-slate-100 text-slate-800"
             iconText="G"
           />
           <IntegrationCard 
             name="Jira" 
             category="DevOps" 
             desc="Bi-directional sync of bugs, stories, and epics with your engineering workspaces."
             status="disconnected"
             iconColor="bg-blue-50 text-blue-600"
             iconText="J"
           />
           <IntegrationCard 
             name="Razorpay" 
             category="Finance" 
             desc="Process payments, handle subscriptions, and automate invoicing reconciliation."
             status="error"
             iconColor="bg-indigo-50 text-indigo-600"
             iconText="R"
           />
           <IntegrationCard 
             name="Salesforce" 
             category="CRM" 
             desc="Push qualified leads and synchronize client data to your Salesforce instance."
             status="disconnected"
             iconColor="bg-sky-50 text-sky-600"
             iconText="SF"
           />
           <IntegrationCard 
             name="Workday" 
             category="HR" 
             desc="Sync employee onboarding, payroll, and performance metrics securely."
             status="connected"
             iconColor="bg-amber-50 text-amber-600"
             iconText="W"
           />
        </div>
      </div>
    </div>
  );
};

const CategoryBtn = ({ label, count, active }: any) => (
  <button className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${active ? 'bg-violet-50 text-violet-700' : 'text-slate-600 hover:bg-slate-50'}`}>
     {label}
     <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${active ? 'bg-violet-200 text-violet-800' : 'bg-slate-100 text-slate-500'}`}>{count}</span>
  </button>
);

const IntegrationCard = ({ name, category, desc, status, iconColor, iconText }: any) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
      <div>
         <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black ${iconColor}`}>
              {iconText}
            </div>
            
            {status === 'connected' && (
              <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg">
                <CheckCircle2 size={12} /> Connected
              </span>
            )}
            {status === 'disconnected' && (
              <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-slate-50 text-slate-500 border border-slate-200 rounded-lg">
                Not Connected
              </span>
            )}
            {status === 'error' && (
              <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-rose-50 text-rose-600 border border-rose-100 rounded-lg animate-pulse">
                <AlertTriangle size={12} /> Sync Error
              </span>
            )}
         </div>
         
         <h4 className="text-sm font-bold text-slate-900 mb-1">{name}</h4>
         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">{category}</p>
         <p className="text-xs text-slate-600 font-medium leading-relaxed">{desc}</p>
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
         {status === 'connected' || status === 'error' ? (
           <>
             <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><Settings size={16}/></button>
             <button className="px-4 py-2 bg-slate-50 text-rose-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 transition-colors border border-slate-200">
               Revoke
             </button>
           </>
         ) : (
           <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-colors w-full">
             Install Integration
           </button>
         )}
      </div>
    </div>
  );
};
