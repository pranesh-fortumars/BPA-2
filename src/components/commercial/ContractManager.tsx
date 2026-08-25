import React from 'react';
import { FileSignature, Download, Search, Plus, ExternalLink, Calendar, HelpCircle } from 'lucide-react';
import { GlassCard } from '../GlassCard';

export const ContractManager = () => {
  const contracts = [
    { id: 'MSA-2026-001', client: 'Acme Corp', type: 'Master Services Agreement', status: 'Active', value: '₹1,50,00,000', expiry: 'Dec 31, 2027', iconColor: 'text-success', bg: 'bg-success/10' },
    { id: 'SOW-2026-042', client: 'Stark Industries', type: 'Statement of Work', status: 'Pending Sign', value: '₹28,00,000', expiry: 'N/A', iconColor: 'text-warning', bg: 'bg-warning/10' },
    { id: 'NDA-2026-088', client: 'Wayne Ent.', type: 'Non-Disclosure', status: 'Active', value: 'N/A', expiry: 'Jan 15, 2028', iconColor: 'text-secondary', bg: 'bg-secondary/10' },
    { id: 'MSA-2025-019', client: 'Globex', type: 'Master Services Agreement', status: 'Expired', value: '₹45,00,000', expiry: 'Sep 30, 2026', iconColor: 'text-critical', bg: 'bg-critical/10' },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input 
               type="text" 
               placeholder="Search contracts, MSAs, or clients..." 
               className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-xl text-sm font-bold text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors shadow-sm"
            />
         </div>
         <button className="flex items-center gap-2 px-5 py-3 bg-foreground text-background rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-colors shadow-sm shadow-foreground/10">
            <Plus size={16}/> New Contract
         </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
         {contracts.map(contract => (
            <GlassCard key={contract.id} className="p-6 bg-surface border border-border hover:border-primary/30 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer">
               <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-border ${contract.bg}`}>
                     <FileSignature size={24} className={contract.iconColor} />
                  </div>
                  <div>
                     <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted bg-surface-elevated border border-border px-2 py-0.5 rounded-md">{contract.id}</span>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${contract.status === 'Active' ? 'bg-success/10 text-success border-success/20' : contract.status === 'Pending Sign' ? 'bg-warning/10 text-warning border-warning/20' : 'bg-critical/10 text-critical border-critical/20'}`}>
                           {contract.status}
                        </span>
                     </div>
                     <h3 className="text-base font-black text-foreground">{contract.client}</h3>
                     <p className="text-xs font-bold text-muted mt-1">{contract.type}</p>
                  </div>
               </div>
               
               <div className="flex items-center gap-8 md:ml-auto">
                  <div className="text-right hidden sm:block">
                     <span className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1">Total Value</span>
                     <span className="text-sm font-black text-foreground">{contract.value}</span>
                  </div>
                  <div className="text-right hidden md:block">
                     <span className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1">Expires On</span>
                     <span className="text-sm font-bold text-muted flex items-center gap-1.5 justify-end"><Calendar size={14} className="text-muted"/> {contract.expiry}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <button className="w-10 h-10 rounded-xl bg-surface-elevated border border-border text-muted flex items-center justify-center hover:bg-border hover:text-primary transition-colors">
                        <Download size={18} />
                     </button>
                     <button className="w-10 h-10 rounded-xl bg-surface-elevated border border-border text-muted flex items-center justify-center hover:bg-border hover:text-primary transition-colors">
                        <ExternalLink size={18} />
                     </button>
                  </div>
               </div>
            </GlassCard>
         ))}
      </div>
    </div>
  );
};
