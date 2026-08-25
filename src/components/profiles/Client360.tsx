import React from 'react';
import { Building2, Globe, FileText, CheckCircle2, Clock, Phone, MapPin, Mail, DollarSign } from 'lucide-react';
import { GlassCard } from '../GlassCard';

export const Client360 = ({ clientId }: { clientId: string }) => {
  // In a real scenario, this fetches from DataService
  const mockClient = {
    id: clientId,
    companyName: 'Acme Corp Enterprise',
    industry: 'Financial Technology',
    status: 'Active Client',
    totalValue: '₹ 45,00,000',
    contact: {
      name: 'Michael Scott',
      email: 'mscott@acmecorp.com',
      phone: '+1 555-0192'
    },
    projects: [
      { id: 1, name: 'Q4 Fintech Dashboard', status: 'In Progress', progress: 75 },
      { id: 2, name: 'API Gateway Migration', status: 'Completed', progress: 100 }
    ],
    invoices: [
      { id: 'INV-001', amount: '₹ 15,00,000', status: 'Paid', date: '01 Aug' },
      { id: 'INV-002', amount: '₹ 5,00,000', status: 'Pending', date: '15 Aug' }
    ]
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Profile */}
      <GlassCard className="p-8 bg-surface-elevated border border-border text-foreground shadow-xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none"></div>
         <div className="flex flex-col md:flex-row items-start justify-between gap-6 relative z-10">
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary">
                  <Building2 size={40} />
               </div>
               <div>
                  <h2 className="text-3xl font-black tracking-tight">{mockClient.companyName}</h2>
                  <div className="flex items-center gap-4 mt-2">
                     <span className="text-sm text-muted font-medium">{mockClient.industry}</span>
                     <span className="text-muted text-xs">•</span>
                     <span className="px-3 py-1 bg-success/10 text-success text-[10px] font-black uppercase tracking-widest rounded-lg border border-success/20">
                        {mockClient.status}
                     </span>
                  </div>
               </div>
            </div>
            
            <div className="bg-surface p-4 rounded-2xl border border-border min-w-[200px]">
               <p className="text-[10px] text-muted uppercase tracking-widest font-black mb-1">Lifetime Value</p>
               <p className="text-2xl font-black text-success">{mockClient.totalValue}</p>
            </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-6 border-t border-border">
            <div className="flex items-center gap-3 text-muted text-sm font-medium">
               <Mail size={16} className="text-muted" /> {mockClient.contact.email}
            </div>
            <div className="flex items-center gap-3 text-muted text-sm font-medium">
               <Phone size={16} className="text-muted" /> {mockClient.contact.phone}
            </div>
            <div className="flex items-center gap-3 text-muted text-sm font-medium">
               <Globe size={16} className="text-muted" /> www.acmecorp.com
            </div>
         </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Projects */}
         <GlassCard className="p-6 bg-surface border border-border shadow-sm">
            <h3 className="text-xs font-black text-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
               <FileText size={16} className="text-primary" /> Associated Projects
            </h3>
            <div className="space-y-4">
               {mockClient.projects.map(proj => (
                  <div key={proj.id} className="p-4 bg-surface-elevated rounded-xl border border-border flex items-center justify-between hover:border-primary/30 transition-colors">
                     <div>
                        <h4 className="text-sm font-bold text-foreground mb-1">{proj.name}</h4>
                        <div className="flex items-center gap-2">
                           <div className="w-32 h-1.5 bg-surface rounded-full overflow-hidden border border-border">
                              <div className="h-full bg-primary" style={{ width: `${proj.progress}%` }}></div>
                           </div>
                           <span className="text-[10px] font-black text-muted">{proj.progress}%</span>
                        </div>
                     </div>
                     <span className={`px-2 py-1 text-[9px] font-black uppercase tracking-widest rounded border ${proj.status === 'Completed' ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20'}`}>
                        {proj.status}
                     </span>
                  </div>
               ))}
            </div>
         </GlassCard>

         {/* Invoices */}
         <GlassCard className="p-6 bg-surface border border-border shadow-sm">
            <h3 className="text-xs font-black text-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
               <DollarSign size={16} className="text-primary" /> Billing History
            </h3>
            <div className="space-y-3">
               {mockClient.invoices.map(inv => (
                  <div key={inv.id} className="flex items-center justify-between p-3 border-b border-border last:border-0">
                     <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${inv.status === 'Paid' ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20'}`}>
                           {inv.status === 'Paid' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                        </div>
                        <div>
                           <p className="text-xs font-bold text-foreground">{inv.id}</p>
                           <p className="text-[10px] font-medium text-muted">Due: {inv.date}</p>
                        </div>
                     </div>
                     <p className="text-sm font-black text-foreground">{inv.amount}</p>
                  </div>
               ))}
            </div>
         </GlassCard>
      </div>
    </div>
  );
};
