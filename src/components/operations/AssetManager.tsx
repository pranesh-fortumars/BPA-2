import React, { useState } from 'react';
import { Laptop, Monitor, Cloud, Server, Search, Plus, Filter, AlertCircle, Wrench, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../GlassCard';

export const AssetManager = () => {
  const [activeTab, setActiveTab] = useState('hardware'); // hardware, software

  const hardware = [
    { id: 'AST-1042', type: 'MacBook Pro M2', assignee: 'John Doe', status: 'Assigned', condition: 'Good', icon: Laptop, color: 'text-violet-500', bg: 'bg-violet-50' },
    { id: 'AST-1045', type: 'Dell UltraSharp 27"', assignee: 'Sarah Smith', status: 'Assigned', condition: 'Good', icon: Monitor, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'AST-1088', type: 'Lenovo ThinkPad X1', assignee: 'Unassigned', status: 'In Storage', condition: 'New', icon: Laptop, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'AST-0992', type: 'MacBook Air M1', assignee: 'Tony Stark', status: 'Maintenance', condition: 'Repair', icon: Wrench, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  const software = [
    { id: 'LIC-001', name: 'Adobe Creative Cloud', type: 'Subscription', seats: '15/20 Used', cost: '₹85,000/yr', status: 'Active', icon: Cloud, color: 'text-rose-500', bg: 'bg-rose-50' },
    { id: 'LIC-002', name: 'AWS Organization', type: 'Infrastructure', seats: 'Unlimited', cost: '₹1,50,000/mo', status: 'Active', icon: Server, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'LIC-003', name: 'Figma Enterprise', type: 'Subscription', seats: '25/25 Used', cost: '₹1,20,000/yr', status: 'Warning', icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50' }, // Warning due to full seats
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
            <button 
               onClick={() => setActiveTab('hardware')}
               className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'hardware' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
               <Laptop size={14}/> Hardware
            </button>
            <button 
               onClick={() => setActiveTab('software')}
               className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'software' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
               <Cloud size={14}/> Software & Cloud
            </button>
         </div>

         <div className="flex items-center gap-2">
            <div className="relative w-64 hidden md:block">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
               <input 
                  type="text" 
                  placeholder="Search assets..." 
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-violet-500 transition-colors"
               />
            </div>
            <button className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors">
               <Filter size={16}/>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
               <Plus size={14}/> Add Asset
            </button>
         </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr>
                     <th className="p-4 bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">Asset ID</th>
                     <th className="p-4 bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">Name & Type</th>
                     <th className="p-4 bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">{activeTab === 'hardware' ? 'Assignee' : 'Seats/Usage'}</th>
                     <th className="p-4 bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">{activeTab === 'hardware' ? 'Condition' : 'Cost'}</th>
                     <th className="p-4 bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {activeTab === 'hardware' && hardware.map(item => {
                     const Icon = item.icon;
                     return (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                           <td className="p-4">
                              <span className="text-xs font-black text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{item.id}</span>
                           </td>
                           <td className="p-4">
                              <div className="flex items-center gap-3">
                                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.bg}`}>
                                    <Icon size={14} className={item.color} />
                                 </div>
                                 <span className="text-sm font-bold text-slate-900">{item.type}</span>
                              </div>
                           </td>
                           <td className="p-4">
                              <span className={`text-xs font-bold ${item.assignee === 'Unassigned' ? 'text-slate-400 italic' : 'text-slate-700'}`}>{item.assignee}</span>
                           </td>
                           <td className="p-4">
                              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${item.condition === 'Repair' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                                 {item.condition}
                              </span>
                           </td>
                           <td className="p-4">
                              <div className="flex items-center gap-1.5">
                                 {item.status === 'Assigned' && <CheckCircle2 size={14} className="text-emerald-500" />}
                                 {item.status === 'In Storage' && <Server size={14} className="text-blue-500" />}
                                 {item.status === 'Maintenance' && <Wrench size={14} className="text-amber-500" />}
                                 <span className="text-xs font-bold text-slate-700">{item.status}</span>
                              </div>
                           </td>
                        </tr>
                     );
                  })}

                  {activeTab === 'software' && software.map(item => {
                     const Icon = item.icon;
                     return (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                           <td className="p-4">
                              <span className="text-xs font-black text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{item.id}</span>
                           </td>
                           <td className="p-4">
                              <div className="flex items-center gap-3">
                                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.bg}`}>
                                    <Icon size={14} className={item.color} />
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold text-slate-900">{item.name}</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">{item.type}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="p-4">
                              <span className={`text-xs font-bold ${item.seats.includes('25/25') ? 'text-rose-600' : 'text-slate-700'}`}>{item.seats}</span>
                           </td>
                           <td className="p-4">
                              <span className="text-xs font-bold text-slate-900">{item.cost}</span>
                           </td>
                           <td className="p-4">
                              <div className="flex items-center gap-1.5">
                                 {item.status === 'Active' ? <CheckCircle2 size={14} className="text-emerald-500" /> : <AlertCircle size={14} className="text-rose-500" />}
                                 <span className={`text-xs font-bold ${item.status === 'Warning' ? 'text-rose-600' : 'text-slate-700'}`}>{item.status}</span>
                              </div>
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
