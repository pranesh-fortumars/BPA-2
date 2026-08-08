import React from 'react';
import { Calendar as CalendarIcon, Users, RefreshCw, ChevronLeft, ChevronRight, AlertCircle, Clock } from 'lucide-react';
import { GlassCard } from '../GlassCard';

export const ResourcePlanner = () => {
  const employees = [
    { id: 'E1', name: 'Praneeth K.', role: 'Lead Engineer', load: 85, schedule: [1, 1, 1, 0.5, 0] }, // 1 = full day, 0.5 = half, 0 = off/leave
    { id: 'E2', name: 'Anita S.', role: 'Developer', load: 100, schedule: [1, 1, 1, 1, 1] },
    { id: 'E3', name: 'Karthik V.', role: 'Designer', load: 40, schedule: [0.5, 0.5, 1, 1, 0] },
    { id: 'E4', name: 'Vikram R.', role: 'Developer', load: 120, schedule: [1, 1, 1, 1, 1] }, // Overloaded
  ];

  const days = ['Mon, 14th', 'Tue, 15th', 'Wed, 16th', 'Thu, 17th', 'Fri, 18th'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center">
               <CalendarIcon size={20} />
            </div>
            <div>
               <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">Resource Planner</h2>
               <p className="text-[10px] font-bold text-slate-500">Oct 14 - Oct 18, 2026</p>
            </div>
         </div>
         
         <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors">
               <RefreshCw size={12} /> Sync External
            </button>
            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
               <button className="p-1 hover:bg-white rounded shadow-sm text-slate-600"><ChevronLeft size={16}/></button>
               <span className="text-[10px] font-black uppercase tracking-widest px-2">This Week</span>
               <button className="p-1 hover:bg-white rounded shadow-sm text-slate-600"><ChevronRight size={16}/></button>
            </div>
         </div>
      </div>

      <GlassCard className="p-0 bg-white border border-slate-200 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
               <thead>
                  <tr>
                     <th className="p-4 bg-slate-50 border-b border-slate-200 w-64">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                           <Users size={14}/> Team Member
                        </span>
                     </th>
                     <th className="p-4 bg-slate-50 border-b border-l border-slate-200 w-32">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Utilization</span>
                     </th>
                     {days.map(day => (
                        <th key={day} className="p-4 bg-slate-50 border-b border-l border-slate-200 text-center">
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{day}</span>
                        </th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {employees.map(emp => (
                     <tr key={emp.id} className="group hover:bg-slate-50 transition-colors">
                        <td className="p-4 border-b border-slate-100">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-black text-slate-600">
                                 {emp.name.charAt(0)}
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-slate-900">{emp.name}</p>
                                 <p className="text-[10px] font-medium text-slate-500">{emp.role}</p>
                              </div>
                           </div>
                        </td>
                        <td className="p-4 border-b border-l border-slate-100">
                           <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                 <div className={`h-full ${emp.load > 100 ? 'bg-rose-500' : emp.load > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(emp.load, 100)}%` }}></div>
                              </div>
                              <span className={`text-[10px] font-black ${emp.load > 100 ? 'text-rose-600' : 'text-slate-600'}`}>{emp.load}%</span>
                           </div>
                           {emp.load > 100 && (
                              <p className="text-[9px] font-bold text-rose-500 mt-1 flex items-center gap-1"><AlertCircle size={10}/> Overloaded</p>
                           )}
                        </td>
                        {emp.schedule.map((val, idx) => (
                           <td key={idx} className="p-2 border-b border-l border-slate-100 text-center">
                              {val === 1 ? (
                                 <div className="mx-auto w-12 h-8 bg-violet-100 border border-violet-200 rounded flex items-center justify-center">
                                    <span className="text-[9px] font-black text-violet-700">8h</span>
                                 </div>
                              ) : val === 0.5 ? (
                                 <div className="mx-auto w-12 h-8 bg-amber-50 border border-amber-200 rounded flex items-center justify-center">
                                    <span className="text-[9px] font-black text-amber-700">4h</span>
                                 </div>
                              ) : (
                                 <div className="mx-auto w-12 h-8 bg-slate-100 border border-slate-200 rounded flex items-center justify-center border-dashed">
                                    <span className="text-[9px] font-black text-slate-400">Off</span>
                                 </div>
                              )}
                           </td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </GlassCard>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <GlassCard className="p-6 bg-white border border-slate-200">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
               <Clock size={16} className="text-violet-600" /> Google Calendar Sync
            </h3>
            <p className="text-[11px] text-slate-500 font-medium mb-4">
               Your internal resource planner is currently synced with Google Workspace. Meetings and Out-of-Office events automatically reduce available capacity.
            </p>
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between">
               <span className="text-xs font-bold text-emerald-700">Status: Active (Last synced 2m ago)</span>
               <button className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-800">Manage</button>
            </div>
         </GlassCard>
      </div>
    </div>
  );
};
