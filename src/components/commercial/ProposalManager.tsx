import React from 'react';
import { Send, Eye, CheckCircle2, Clock, FileText, Search, Plus } from 'lucide-react';

export const ProposalManager = () => {
  const proposals = [
    { id: 'PRP-001', client: 'Oscorp Ind.', title: 'Enterprise Automation V2', value: '₹45,00,000', status: 'Accepted', date: 'Oct 12', icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
    { id: 'PRP-002', client: 'Daily Bugle', title: 'CMS Migration & SEO', value: '₹12,50,000', status: 'Viewed', date: 'Oct 14', icon: Eye, color: 'text-secondary', bg: 'bg-secondary/10' },
    { id: 'PRP-003', client: 'LexCorp', title: 'Data Warehouse Setup', value: '₹85,00,000', status: 'Sent', date: 'Oct 16', icon: Send, color: 'text-primary', bg: 'bg-primary/10' },
    { id: 'PRP-004', client: 'Pied Piper', title: 'App Maintenance Q4', value: '₹8,00,000', status: 'Draft', date: 'Oct 18', icon: Clock, color: 'text-muted', bg: 'bg-surface-elevated' },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
         <div className="bg-surface rounded-2xl p-4 border border-border shadow-sm flex items-center justify-between">
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-muted">Total Pipeline Value</p>
               <h3 className="text-xl font-black text-foreground mt-1">₹1,50,50,000</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20"><FileText size={20}/></div>
         </div>
         <div className="bg-surface rounded-2xl p-4 border border-border shadow-sm flex items-center justify-between">
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-muted">Win Rate</p>
               <h3 className="text-xl font-black text-success mt-1">64.5%</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center border border-success/20"><CheckCircle2 size={20}/></div>
         </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input 
               type="text" 
               placeholder="Search proposals..." 
               className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-xl text-sm font-bold text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors shadow-sm"
            />
         </div>
         <button className="flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-colors shadow-sm shadow-primary/20">
            <Plus size={16}/> Create Proposal
         </button>
      </div>

      <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr>
                     <th className="p-4 bg-surface-elevated border-b border-border text-[10px] font-black uppercase tracking-widest text-muted">Proposal ID</th>
                     <th className="p-4 bg-surface-elevated border-b border-border text-[10px] font-black uppercase tracking-widest text-muted">Client & Title</th>
                     <th className="p-4 bg-surface-elevated border-b border-border text-[10px] font-black uppercase tracking-widest text-muted">Value</th>
                     <th className="p-4 bg-surface-elevated border-b border-border text-[10px] font-black uppercase tracking-widest text-muted">Status</th>
                     <th className="p-4 bg-surface-elevated border-b border-border text-[10px] font-black uppercase tracking-widest text-muted text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border">
                  {proposals.map(prop => {
                     const Icon = prop.icon;
                     return (
                        <tr key={prop.id} className="hover:bg-surface-elevated transition-colors group">
                           <td className="p-4">
                              <span className="text-xs font-black text-muted bg-surface-elevated border border-border px-2 py-1 rounded-md">{prop.id}</span>
                           </td>
                           <td className="p-4">
                              <p className="text-sm font-black text-foreground">{prop.client}</p>
                              <p className="text-xs font-bold text-muted">{prop.title}</p>
                           </td>
                           <td className="p-4">
                              <span className="text-sm font-black text-foreground">{prop.value}</span>
                           </td>
                           <td className="p-4">
                              <div className="flex items-center gap-2">
                                 <div className={`w-6 h-6 rounded-md border border-border flex items-center justify-center ${prop.bg}`}>
                                    <Icon size={12} className={prop.color} />
                                 </div>
                                 <span className="text-xs font-bold text-foreground">{prop.status}</span>
                              </div>
                           </td>
                           <td className="p-4 text-right">
                              <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:brightness-110 opacity-0 group-hover:opacity-100 transition-opacity">View Detail</button>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};
