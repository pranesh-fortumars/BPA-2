import React, { useState, useEffect } from 'react';
import { Laptop, Monitor, Cloud, Server, Search, Plus, Filter, AlertCircle, Wrench, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { DataService } from '../../lib/db';

export const AssetManager = () => {
  const [activeTab, setActiveTab] = useState('hardware'); // hardware, software
  const [hardware, setHardware] = useState<any[]>([]);
  const [software, setSoftware] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      // Hardware
      let storedHardware = await DataService.getAll<any>('hardware_assets');
      if (storedHardware.length === 0) {
        const initialHardware = [
          { id: 'AST-1042', type: 'MacBook Pro M2', assignee: 'John Doe', status: 'Assigned', condition: 'Good', iconName: 'Laptop', color: 'text-primary', bg: 'bg-primary/10' },
          { id: 'AST-1045', type: 'Dell UltraSharp 27"', assignee: 'Sarah Smith', status: 'Assigned', condition: 'Good', iconName: 'Monitor', color: 'text-secondary', bg: 'bg-secondary/10' },
          { id: 'AST-1088', type: 'Lenovo ThinkPad X1', assignee: 'Unassigned', status: 'In Storage', condition: 'New', iconName: 'Laptop', color: 'text-success', bg: 'bg-success/10' },
          { id: 'AST-0992', type: 'MacBook Air M1', assignee: 'Tony Stark', status: 'Maintenance', condition: 'Repair', iconName: 'Wrench', color: 'text-warning', bg: 'bg-warning/10' },
        ];
        for (const h of initialHardware) await DataService.save('hardware_assets', h);
        storedHardware = initialHardware;
      }
      setHardware(storedHardware);

      // Software
      let storedSoftware = await DataService.getAll<any>('software_assets');
      if (storedSoftware.length === 0) {
        const initialSoftware = [
          { id: 'LIC-001', name: 'Adobe Creative Cloud', type: 'Subscription', seats: '15/20 Used', cost: '₹85,000/yr', status: 'Active', iconName: 'Cloud', color: 'text-critical', bg: 'bg-critical/10' },
          { id: 'LIC-002', name: 'AWS Organization', type: 'Infrastructure', seats: 'Unlimited', cost: '₹1,50,000/mo', status: 'Active', iconName: 'Server', color: 'text-warning', bg: 'bg-warning/10' },
          { id: 'LIC-003', name: 'Figma Enterprise', type: 'Subscription', seats: '25/25 Used', cost: '₹1,20,000/yr', status: 'Warning', iconName: 'AlertCircle', color: 'text-critical', bg: 'bg-critical/10' },
        ];
        for (const s of initialSoftware) await DataService.save('software_assets', s);
        storedSoftware = initialSoftware;
      }
      setSoftware(storedSoftware);
    };
    loadData();
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Laptop': return Laptop;
      case 'Monitor': return Monitor;
      case 'Wrench': return Wrench;
      case 'Cloud': return Cloud;
      case 'Server': return Server;
      case 'AlertCircle': return AlertCircle;
      default: return Laptop;
    }
  };

  return (
    <div className="space-y-6 text-foreground">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="flex items-center gap-2 p-1.5 bg-surface-elevated rounded-2xl w-fit border border-border">
            <button 
               onClick={() => setActiveTab('hardware')}
               className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'hardware' ? 'bg-surface text-primary shadow-sm border border-border' : 'text-muted hover:text-foreground'}`}
            >
               <Laptop size={14}/> Hardware
            </button>
            <button 
               onClick={() => setActiveTab('software')}
               className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'software' ? 'bg-surface text-primary shadow-sm border border-border' : 'text-muted hover:text-foreground'}`}
            >
               <Cloud size={14}/> Software & Cloud
            </button>
         </div>

         <div className="flex items-center gap-2">
            <div className="relative w-64 hidden md:block">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={14} />
               <input 
                  type="text" 
                  placeholder="Search assets..." 
                  className="w-full pl-9 pr-4 py-2 bg-surface-elevated border border-border rounded-xl text-xs font-bold text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors"
               />
            </div>
            <button className="w-10 h-10 bg-surface-elevated border border-border text-muted rounded-xl flex items-center justify-center hover:bg-surface transition-colors">
               <Filter size={16}/>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-colors shadow-lg shadow-primary/20">
               <Plus size={14}/> Add Asset
            </button>
         </div>
      </div>

      <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr>
                     <th className="p-4 bg-surface-elevated border-b border-border text-[10px] font-black uppercase tracking-widest text-muted">Asset ID</th>
                     <th className="p-4 bg-surface-elevated border-b border-border text-[10px] font-black uppercase tracking-widest text-muted">Name & Type</th>
                     <th className="p-4 bg-surface-elevated border-b border-border text-[10px] font-black uppercase tracking-widest text-muted">{activeTab === 'hardware' ? 'Assignee' : 'Seats/Usage'}</th>
                     <th className="p-4 bg-surface-elevated border-b border-border text-[10px] font-black uppercase tracking-widest text-muted">{activeTab === 'hardware' ? 'Condition' : 'Cost'}</th>
                     <th className="p-4 bg-surface-elevated border-b border-border text-[10px] font-black uppercase tracking-widest text-muted">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border">
                  {activeTab === 'hardware' && hardware.map(item => {
                     const Icon = getIcon(item.iconName);
                     return (
                        <tr key={item.id} className="hover:bg-surface-elevated transition-colors cursor-pointer">
                           <td className="p-4">
                              <span className="text-xs font-black text-muted bg-surface-elevated border border-border px-2 py-1 rounded-md">{item.id}</span>
                           </td>
                           <td className="p-4">
                              <div className="flex items-center gap-3">
                                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-border ${item.bg}`}>
                                    <Icon size={14} className={item.color} />
                                 </div>
                                 <span className="text-sm font-bold text-foreground">{item.type}</span>
                              </div>
                           </td>
                           <td className="p-4">
                              <span className={`text-xs font-bold ${item.assignee === 'Unassigned' ? 'text-muted italic' : 'text-foreground'}`}>{item.assignee}</span>
                           </td>
                           <td className="p-4">
                              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${item.condition === 'Repair' ? 'bg-warning/10 text-warning border-warning/20' : 'bg-surface-elevated text-muted border-border'}`}>
                                 {item.condition}
                              </span>
                           </td>
                           <td className="p-4">
                              <div className="flex items-center gap-1.5">
                                 {item.status === 'Assigned' && <CheckCircle2 size={14} className="text-success" />}
                                 {item.status === 'In Storage' && <Server size={14} className="text-secondary" />}
                                 {item.status === 'Maintenance' && <Wrench size={14} className="text-warning" />}
                                 <span className="text-xs font-bold text-foreground">{item.status}</span>
                              </div>
                           </td>
                        </tr>
                     );
                  })}

                  {activeTab === 'software' && software.map(item => {
                     const Icon = getIcon(item.iconName);
                     return (
                        <tr key={item.id} className="hover:bg-surface-elevated transition-colors cursor-pointer">
                           <td className="p-4">
                              <span className="text-xs font-black text-muted bg-surface-elevated border border-border px-2 py-1 rounded-md">{item.id}</span>
                           </td>
                           <td className="p-4">
                              <div className="flex items-center gap-3">
                                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-border ${item.bg}`}>
                                    <Icon size={14} className={item.color} />
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold text-foreground">{item.name}</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted mt-0.5">{item.type}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="p-4">
                              <span className={`text-xs font-bold ${item.seats.includes('25/25') ? 'text-critical' : 'text-foreground'}`}>{item.seats}</span>
                           </td>
                           <td className="p-4">
                              <span className="text-xs font-bold text-foreground">{item.cost}</span>
                           </td>
                           <td className="p-4">
                              <div className="flex items-center gap-1.5">
                                 {item.status === 'Active' ? <CheckCircle2 size={14} className="text-success" /> : <AlertCircle size={14} className="text-critical" />}
                                 <span className={`text-xs font-bold ${item.status === 'Warning' ? 'text-critical' : 'text-foreground'}`}>{item.status}</span>
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
