import React from 'react';
import { Send, Eye, CheckCircle2, Clock, FileText, Search, Plus } from 'lucide-react';
import { GlassCard } from '../GlassCard';

export const ProposalManager = () => {
  const proposals = [
    { id: 'PRP-001', client: 'Oscorp Ind.', title: 'Enterprise Automation V2', value: '₹45,00,000', status: 'Accepted', date: 'Oct 12', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'PRP-002', client: 'Daily Bugle', title: 'CMS Migration & SEO', value: '₹12,50,000', status: 'Viewed', date: 'Oct 14', icon: Eye, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'PRP-003', client: 'LexCorp', title: 'Data Warehouse Setup', value: '₹85,00,000', status: 'Sent', date: 'Oct 16', icon: Send, color: 'text-violet-500', bg: 'bg-violet-50' },
    { id: 'PRP-004', client: 'Pied Piper', title: 'App Maintenance Q4', value: '₹8,00,000', status: 'Draft', date: 'Oct 18', icon: Clock, color: 'text-slate-400', bg: 'bg-slate-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
         <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Pipeline Value</p>
               <h3 className="text-xl font-black text-slate-900 mt-1">₹1,50,50,000</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center"><FileText size={20}/></div>
         </div>
         <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Win Rate</p>
               <h3 className="text-xl font-black text-emerald-600 mt-1">64.5%</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckCircle2 size={20}/></div>
         </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
               type="text" 
               placeholder="Search proposals..." 
               className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-violet-500 transition-colors shadow-sm"
            />
         </div>
         <button className="flex items-center gap-2 px-5 py-3 bg-violet-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-violet-700 transition-colors shadow-xl shadow-violet-600/20">
            <Plus size={16}/> Create Proposal
         </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr>
                     <th className="p-4 bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">Proposal ID</th>
                     <th className="p-4 bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">Client & Title</th>
                     <th className="p-4 bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">Value</th>
                     <th className="p-4 bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                     <th className="p-4 bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {proposals.map(prop => {
                     const Icon = prop.icon;
                     return (
                        <tr key={prop.id} className="hover:bg-slate-50 transition-colors group">
                           <td className="p-4">
                              <span className="text-xs font-black text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{prop.id}</span>
                           </td>
                           <td className="p-4">
                              <p className="text-sm font-black text-slate-900">{prop.client}</p>
                              <p className="text-xs font-bold text-slate-500">{prop.title}</p>
                           </td>
                           <td className="p-4">
                              <span className="text-sm font-black text-slate-900">{prop.value}</span>
                           </td>
                           <td className="p-4">
                              <div className="flex items-center gap-2">
                                 <div className={`w-6 h-6 rounded-md flex items-center justify-center ${prop.bg}`}>
                                    <Icon size={12} className={prop.color} />
                                 </div>
                                 <span className="text-xs font-bold text-slate-700">{prop.status}</span>
                              </div>
                           </td>
                           <td className="p-4 text-right">
                              <button className="text-[10px] font-black uppercase tracking-widest text-violet-600 hover:text-violet-800 opacity-0 group-hover:opacity-100 transition-opacity">View Detail</button>
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
