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
    <div className="space-y-6">
      {/* Header Profile */}
      <GlassCard className="p-8 bg-slate-900 border border-slate-800 text-white shadow-xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 blur-[80px] rounded-full pointer-events-none"></div>
         <div className="flex flex-col md:flex-row items-start justify-between gap-6 relative z-10">
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 bg-violet-600/20 border border-violet-500/30 rounded-2xl flex items-center justify-center text-violet-400">
                  <Building2 size={40} />
               </div>
               <div>
                  <h2 className="text-3xl font-black tracking-tight">{mockClient.companyName}</h2>
                  <div className="flex items-center gap-4 mt-2">
                     <span className="text-sm text-slate-400 font-medium">{mockClient.industry}</span>
                     <span className="text-slate-600 text-xs">•</span>
                     <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-emerald-500/20">
                        {mockClient.status}
                     </span>
                  </div>
               </div>
            </div>
            
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 min-w-[200px]">
               <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-1">Lifetime Value</p>
               <p className="text-2xl font-black text-emerald-400">{mockClient.totalValue}</p>
            </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-3 text-slate-300 text-sm">
               <Mail size={16} className="text-slate-500" /> {mockClient.contact.email}
            </div>
            <div className="flex items-center gap-3 text-slate-300 text-sm">
               <Phone size={16} className="text-slate-500" /> {mockClient.contact.phone}
            </div>
            <div className="flex items-center gap-3 text-slate-300 text-sm">
               <Globe size={16} className="text-slate-500" /> www.acmecorp.com
            </div>
         </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Projects */}
         <GlassCard className="p-6 bg-white border border-slate-200">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
               <FileText size={16} className="text-violet-600" /> Associated Projects
            </h3>
            <div className="space-y-4">
               {mockClient.projects.map(proj => (
                  <div key={proj.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                     <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">{proj.name}</h4>
                        <div className="flex items-center gap-2">
                           <div className="w-32 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-violet-500" style={{ width: `${proj.progress}%` }}></div>
                           </div>
                           <span className="text-[10px] font-black text-slate-500">{proj.progress}%</span>
                        </div>
                     </div>
                     <span className={`px-2 py-1 text-[9px] font-black uppercase tracking-widest rounded ${proj.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {proj.status}
                     </span>
                  </div>
               ))}
            </div>
         </GlassCard>

         {/* Invoices */}
         <GlassCard className="p-6 bg-white border border-slate-200">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
               <DollarSign size={16} className="text-violet-600" /> Billing History
            </h3>
            <div className="space-y-3">
               {mockClient.invoices.map(inv => (
                  <div key={inv.id} className="flex items-center justify-between p-3 border-b border-slate-100 last:border-0">
                     <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                           {inv.status === 'Paid' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                        </div>
                        <div>
                           <p className="text-xs font-bold text-slate-900">{inv.id}</p>
                           <p className="text-[10px] font-medium text-slate-500">Due: {inv.date}</p>
                        </div>
                     </div>
                     <p className="text-sm font-black text-slate-900">{inv.amount}</p>
                  </div>
               ))}
            </div>
         </GlassCard>
      </div>
    </div>
  );
};
