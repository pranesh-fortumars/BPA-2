import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Users, RefreshCw, ChevronLeft, ChevronRight, AlertCircle, Clock } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { DataService } from '../../lib/db';

export const ResourcePlanner = () => {
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    const loadResources = async () => {
      let stored = await DataService.getAll<any>('resources');
      if (stored.length === 0) {
        const initial = [
          { id: 'E1', name: 'Praneeth K.', role: 'Lead Engineer', load: 85, schedule: [1, 1, 1, 0.5, 0] },
          { id: 'E2', name: 'Anita S.', role: 'Developer', load: 100, schedule: [1, 1, 1, 1, 1] },
          { id: 'E3', name: 'Karthik V.', role: 'Designer', load: 40, schedule: [0.5, 0.5, 1, 1, 0] },
          { id: 'E4', name: 'Vikram R.', role: 'Developer', load: 120, schedule: [1, 1, 1, 1, 1] }, 
        ];
        for (const emp of initial) await DataService.save('resources', emp);
        stored = initial;
      }
      setEmployees(stored);
    };
    loadResources();
  }, []);

  const days = ['Mon, 14th', 'Tue, 15th', 'Wed, 16th', 'Thu, 17th', 'Fri, 18th'];

  return (
    <div className="space-y-6 text-foreground">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface p-4 rounded-2xl border border-border shadow-sm">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center">
               <CalendarIcon size={20} />
            </div>
            <div>
               <h2 className="text-sm font-black uppercase tracking-widest text-foreground">Resource Planner</h2>
               <p className="text-[10px] font-bold text-muted">Oct 14 - Oct 18, 2026</p>
            </div>
         </div>
         
         <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-surface-elevated border border-border text-muted rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-surface hover:text-foreground transition-colors">
               <RefreshCw size={12} /> Sync External
            </button>
            <div className="flex items-center gap-1 bg-surface-elevated border border-border rounded-lg p-1">
               <button className="p-1 hover:bg-surface rounded shadow-sm text-muted hover:text-foreground"><ChevronLeft size={16}/></button>
               <span className="text-[10px] font-black uppercase tracking-widest px-2 text-foreground">This Week</span>
               <button className="p-1 hover:bg-surface rounded shadow-sm text-muted hover:text-foreground"><ChevronRight size={16}/></button>
            </div>
         </div>
      </div>

      <GlassCard className="p-0 bg-surface border border-border overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
               <thead>
                  <tr>
                     <th className="p-4 bg-surface-elevated border-b border-border w-64">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted flex items-center gap-2">
                           <Users size={14}/> Team Member
                        </span>
                     </th>
                     <th className="p-4 bg-surface-elevated border-b border-l border-border w-32">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted">Utilization</span>
                     </th>
                     {days.map(day => (
                        <th key={day} className="p-4 bg-surface-elevated border-b border-l border-border text-center">
                           <span className="text-[10px] font-black uppercase tracking-widest text-muted">{day}</span>
                        </th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {employees.map(emp => (
                     <tr key={emp.id} className="group hover:bg-surface-elevated transition-colors">
                        <td className="p-4 border-b border-border">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-surface-elevated border border-border flex items-center justify-center text-xs font-black text-muted shadow-sm">
                                 {emp.name.charAt(0)}
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-foreground">{emp.name}</p>
                                 <p className="text-[10px] font-medium text-muted">{emp.role}</p>
                              </div>
                           </div>
                        </td>
                        <td className="p-4 border-b border-l border-border">
                           <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                                 <div className={`h-full ${emp.load > 100 ? 'bg-critical' : emp.load > 80 ? 'bg-warning' : 'bg-success'}`} style={{ width: `${Math.min(emp.load, 100)}%` }}></div>
                              </div>
                              <span className={`text-[10px] font-black ${emp.load > 100 ? 'text-critical' : 'text-foreground'}`}>{emp.load}%</span>
                           </div>
                           {emp.load > 100 && (
                              <p className="text-[9px] font-bold text-critical mt-1 flex items-center gap-1"><AlertCircle size={10}/> Overloaded</p>
                           )}
                        </td>
                        {emp.schedule.map((val: number, idx: number) => (
                           <td key={idx} className="p-2 border-b border-l border-border text-center">
                              {val === 1 ? (
                                 <div className="mx-auto w-12 h-8 bg-primary/10 border border-primary/20 rounded flex items-center justify-center">
                                    <span className="text-[9px] font-black text-primary">8h</span>
                                 </div>
                              ) : val === 0.5 ? (
                                 <div className="mx-auto w-12 h-8 bg-warning/10 border border-warning/20 rounded flex items-center justify-center">
                                    <span className="text-[9px] font-black text-warning">4h</span>
                                 </div>
                              ) : (
                                 <div className="mx-auto w-12 h-8 bg-surface-elevated border border-border rounded flex items-center justify-center border-dashed">
                                    <span className="text-[9px] font-black text-muted">Off</span>
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
         <GlassCard className="p-6 bg-surface border border-border">
            <h3 className="text-xs font-black text-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
               <Clock size={16} className="text-primary" /> Google Calendar Sync
            </h3>
            <p className="text-[11px] text-muted font-medium mb-4">
               Your internal resource planner is currently synced with Google Workspace. Meetings and Out-of-Office events automatically reduce available capacity.
            </p>
            <div className="p-3 bg-success/10 border border-success/20 rounded-xl flex items-center justify-between">
               <span className="text-xs font-bold text-success">Status: Active (Last synced 2m ago)</span>
               <button className="text-[10px] font-black uppercase tracking-widest text-success hover:brightness-110">Manage</button>
            </div>
         </GlassCard>
      </div>
    </div>
  );
};
