import React, { useState, useEffect } from 'react';
import { Network, Activity, Search, Server, Shield, CheckCircle2, AlertTriangle, Settings, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DataService } from '../../lib/db';

export const IntegrationsHub = () => {
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newInt, setNewInt] = useState({ name: '', category: 'Communication', desc: '', iconText: 'A' });

  useEffect(() => {
    const loadInts = async () => {
      let stored = await DataService.getAll<any>('integrations');
      if (stored.length === 0) {
        const initial = [
           { id: '1', name: "Slack", category: "Communication", desc: "Send automated alerts, project updates, and approval workflows directly to Slack channels.", status: "connected", iconColor: "bg-critical/10 text-critical border-critical/20", iconText: "S" },
           { id: '2', name: "GitHub", category: "DevOps", desc: "Sync repositories, track pull requests, and trigger CI/CD pipelines from the OS.", status: "connected", iconColor: "bg-foreground/10 text-foreground border-foreground/20", iconText: "G" },
           { id: '3', name: "Jira", category: "DevOps", desc: "Bi-directional sync of bugs, stories, and epics with your engineering workspaces.", status: "disconnected", iconColor: "bg-secondary/10 text-secondary border-secondary/20", iconText: "J" },
           { id: '4', name: "Razorpay", category: "Finance", desc: "Process payments, handle subscriptions, and automate invoicing reconciliation.", status: "error", iconColor: "bg-primary/10 text-primary border-primary/20", iconText: "R" }
        ];
        for (const i of initial) await DataService.save('integrations', i);
        stored = initial;
      }
      setIntegrations(stored);
    };
    loadInts();
  }, []);

  const handleAddIntegration = async (e: React.FormEvent) => {
    e.preventDefault();
    const item = {
      id: Date.now().toString(),
      name: newInt.name,
      category: newInt.category,
      desc: newInt.desc,
      status: 'disconnected',
      iconColor: 'bg-primary/10 text-primary border-primary/20',
      iconText: newInt.iconText
    };
    await DataService.save('integrations', item);
    setIntegrations([...integrations, item]);
    setShowModal(false);
    setNewInt({ name: '', category: 'Communication', desc: '', iconText: 'A' });
  };

  return (
    <div className="space-y-8 font-sans">
      {/* API Health Banner */}
      <div className="bg-surface-elevated rounded-3xl p-6 text-foreground border border-border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-success/10 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="flex items-center gap-4 relative z-10">
           <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center border border-success/20">
              <Activity className="text-success" size={24} />
           </div>
           <div>
              <h3 className="text-lg font-black uppercase tracking-widest text-foreground">API Health Status</h3>
              <p className="text-xs text-muted font-bold">All enterprise connectors are operating nominally.</p>
           </div>
        </div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="text-right">
              <p className="text-2xl font-black text-foreground tracking-tighter">99.99%</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted">Uptime</p>
           </div>
           <div className="text-right">
              <p className="text-2xl font-black text-foreground tracking-tighter">124ms</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted">Avg Latency</p>
           </div>
           <div className="h-10 w-px bg-border"></div>
           <button className="px-5 py-2.5 bg-surface hover:bg-border rounded-xl text-xs font-black uppercase tracking-widest transition-colors border border-border text-foreground">
             View Webhooks
           </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Marketplace Sidebar */}
        <div className="w-full md:w-64 shrink-0 space-y-4">
           <div className="bg-surface rounded-3xl p-4 border border-border shadow-sm relative">
              <Search className="absolute left-7 top-7 text-muted" size={16} />
              <input 
                type="text" 
                placeholder="Search Integrations..." 
                className="w-full bg-surface-elevated border border-border rounded-xl py-2 pl-10 pr-4 text-xs font-bold text-foreground outline-none focus:border-primary/50 transition-colors"
              />
           </div>
           
           <div className="bg-surface rounded-3xl p-4 border border-border shadow-sm">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-muted mb-4 px-2">Categories</h4>
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
        <div className="flex-1 flex flex-col gap-4">
           <div className="flex justify-end mb-2">
             <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-6 py-3 bg-primary hover:brightness-110 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary-foreground shadow-sm shadow-primary/20 transition-all active:scale-95">
                <Plus size={16} /> New Integration
             </button>
           </div>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
             {integrations.map((item: any) => (
                <IntegrationCard key={item.id} {...item} />
             ))}
           </div>
        </div>
      </div>

      {/* New Integration Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface rounded-[2rem] p-8 max-w-md w-full shadow-2xl border border-border"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black uppercase tracking-tighter text-foreground">Add Integration</h3>
              <button onClick={() => setShowModal(false)} className="text-muted hover:text-foreground transition-colors"><X size={24}/></button>
            </div>
            
            <form onSubmit={handleAddIntegration} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-muted uppercase tracking-widest mb-2">App Name</label>
                <input required value={newInt.name} onChange={e => setNewInt({...newInt, name: e.target.value})} className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 transition-colors" placeholder="e.g. Asana" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-muted uppercase tracking-widest mb-2">Category</label>
                <select value={newInt.category} onChange={e => setNewInt({...newInt, category: e.target.value})} className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 transition-colors">
                  <option value="Communication">Communication</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Finance">Finance</option>
                  <option value="CRM">CRM</option>
                  <option value="HR">HR & Talent</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-muted uppercase tracking-widest mb-2">Icon Text (1-2 Chars)</label>
                <input required maxLength={2} value={newInt.iconText} onChange={e => setNewInt({...newInt, iconText: e.target.value.toUpperCase()})} className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 transition-colors" placeholder="AS" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-muted uppercase tracking-widest mb-2">Description</label>
                <textarea required value={newInt.desc} onChange={e => setNewInt({...newInt, desc: e.target.value})} className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 transition-colors min-h-[80px]" placeholder="Brief description of capabilities..." />
              </div>
              
              <button type="submit" className="w-full mt-6 py-4 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-colors shadow-xl shadow-primary/20 active:scale-95">
                Register Integration
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const CategoryBtn = ({ label, count, active }: any) => (
  <button className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${active ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted hover:bg-surface-elevated hover:text-foreground'}`}>
     {label}
     <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${active ? 'bg-primary/20 text-primary border-primary/30' : 'bg-surface-elevated text-muted border-border'}`}>{count}</span>
  </button>
);

const IntegrationCard = ({ name, category, desc, status, iconColor, iconText }: any) => {
  return (
    <div className="bg-surface p-6 rounded-3xl border border-border shadow-sm hover:border-primary/50 transition-all group flex flex-col justify-between">
      <div>
         <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black border ${iconColor}`}>
              {iconText}
            </div>
            
            {status === 'connected' && (
              <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-success/10 text-success border border-success/20 rounded-lg">
                <CheckCircle2 size={12} /> Connected
              </span>
            )}
            {status === 'disconnected' && (
              <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-surface-elevated text-muted border border-border rounded-lg">
                Not Connected
              </span>
            )}
            {status === 'error' && (
              <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-critical/10 text-critical border border-critical/20 rounded-lg animate-pulse">
                <AlertTriangle size={12} /> Sync Error
              </span>
            )}
         </div>
         
         <h4 className="text-sm font-bold text-foreground mb-1">{name}</h4>
         <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-3">{category}</p>
         <p className="text-xs text-muted font-medium leading-relaxed">{desc}</p>
      </div>
      
      <div className="mt-6 pt-4 border-t border-border flex items-center justify-end gap-2">
         {status === 'connected' || status === 'error' ? (
           <>
             <button className="p-2 text-muted hover:text-foreground transition-colors"><Settings size={16}/></button>
             <button className="px-4 py-2 bg-surface-elevated text-critical rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-critical/10 border border-border transition-colors">
               Revoke
             </button>
           </>
         ) : (
           <button className="px-4 py-2 bg-foreground text-background rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-colors w-full shadow-sm">
             Install Integration
           </button>
         )}
      </div>
    </div>
  );
};
