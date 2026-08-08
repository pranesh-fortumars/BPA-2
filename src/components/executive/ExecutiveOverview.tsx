import React, { useState } from 'react';
import { 
  Activity, 
  TrendingUp, 
  Users, 
  Briefcase, 
  DollarSign, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  PieChart
} from 'lucide-react';
import { GlassCard } from '../GlassCard';

export const ExecutiveOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <StatCard title="Annual Run Rate (ARR)" value="₹3,20,50,000" trend="+15%" isUp={true} icon={DollarSign} color="emerald" />
         <StatCard title="Active Clients" value="142" trend="+12 this month" isUp={true} icon={Users} color="blue" />
         <StatCard title="Active Projects" value="48" trend="3 at risk" isUp={false} icon={Briefcase} color="amber" />
         <StatCard title="Employee Utilization" value="82%" trend="Optimal range" isUp={true} icon={Activity} color="violet" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6 bg-white border border-slate-200">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Q4 Revenue Forecast</h3>
                <span className="text-[10px] font-bold text-slate-500">Based on active contracts</span>
             </div>
             <div className="h-64 flex items-end justify-between gap-2">
                {[55, 60, 65, 50, 75, 80, 85, 95, 90, 105, 100, 115].map((val, i) => (
                   <div key={i} className="w-full bg-slate-100 rounded-t-xl relative group">
                      <div className="absolute bottom-0 left-0 right-0 bg-violet-600 rounded-t-xl transition-all" style={{ height: `${val}%` }}></div>
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black py-1 px-2 rounded-lg pointer-events-none transition-opacity z-10 whitespace-nowrap">
                         ₹{(val * 20000).toLocaleString()}
                      </div>
                   </div>
                ))}
             </div>
             <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
             </div>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-6 bg-white border border-slate-200">
               <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Department Health</h3>
               <div className="space-y-4">
                  <HealthBar dept="Engineering" health={92} />
                  <HealthBar dept="Sales & Marketing" health={85} />
                  <HealthBar dept="Design" health={78} />
                  <HealthBar dept="HR & Ops" health={95} />
               </div>
            </GlassCard>

            <GlassCard className="p-6 bg-white border border-slate-200">
               <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
                  <PieChart size={16} className="text-violet-500" /> Automation Savings
               </h3>
               <div className="flex items-end gap-4 mb-4">
                  <h4 className="text-4xl font-black text-slate-900">420<span className="text-lg text-slate-400 font-bold">hrs</span></h4>
               </div>
               <p className="text-xs font-bold text-emerald-600 mb-4 flex items-center gap-1">
                  <TrendingUp size={14}/> Saved this month via workflows
               </p>
               <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[75%] h-full bg-violet-500"></div>
               </div>
               <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-2 text-right">Target: 500 hrs</p>
            </GlassCard>
          </div>
        </div>
        
        <div className="space-y-6">
          <GlassCard className="p-6 bg-slate-900 text-white border-0 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 blur-2xl rounded-full"></div>
             <h3 className="text-sm font-black uppercase tracking-widest text-slate-100 mb-6 flex items-center gap-2">
                <AlertTriangle size={16} className="text-rose-400" /> Executive Alerts
             </h3>
             <div className="space-y-3 relative z-10">
                <AlertRow title="Project Risk: Client Portal" severity="High" desc="Delayed by 2 weeks due to resource shortage." />
                <AlertRow title="Invoice Overdue" severity="Medium" desc="Stark Industries invoice INV-001 is 5 days late." />
                <AlertRow title="Server Costs Spike" severity="Low" desc="AWS billing exceeded threshold by 15%." />
             </div>
          </GlassCard>

          <GlassCard className="p-6 bg-white border border-slate-200">
             <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">Recent Wins</h3>
             <div className="space-y-4">
                <WinRow title="New Contract Signed" client="Acme Corp" value="₹1.5Cr" />
                <WinRow title="Milestone Reached" client="Wayne Ent." value="Phase 1 Delivered" />
                <WinRow title="Proposal Accepted" client="Oscorp" value="₹45L" />
             </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

/* --- UTILS --- */

const StatCard = ({ title, value, trend, isUp, icon: Icon, color }: any) => {
  const colorMap: any = {
     emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
     amber: 'bg-amber-50 text-amber-600 border-amber-100',
     blue: 'bg-blue-50 text-blue-600 border-blue-100',
     violet: 'bg-violet-50 text-violet-600 border-violet-100'
  };

  return (
    <GlassCard className="p-6 bg-white border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          <Icon size={20} />
        </div>
        <span className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-md ${isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trend}
        </span>
      </div>
      <div>
        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">{title}</p>
        <h4 className="text-2xl font-black text-slate-900 tracking-tight">{value}</h4>
      </div>
    </GlassCard>
  );
};

const HealthBar = ({ dept, health }: any) => (
   <div>
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1">
         <span className="text-slate-700">{dept}</span>
         <span className={health > 90 ? 'text-emerald-500' : health > 80 ? 'text-amber-500' : 'text-rose-500'}>{health}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
         <div className={`h-full ${health > 90 ? 'bg-emerald-500' : health > 80 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${health}%` }}></div>
      </div>
   </div>
);

const AlertRow = ({ title, severity, desc }: any) => (
   <div className="p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
      <div className="flex justify-between items-center mb-1">
         <h4 className="text-xs font-bold text-slate-100">{title}</h4>
         <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${severity === 'High' ? 'bg-rose-500/20 text-rose-400' : severity === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>{severity}</span>
      </div>
      <p className="text-[10px] text-slate-400 leading-snug font-medium">{desc}</p>
   </div>
);

const WinRow = ({ title, client, value }: any) => (
   <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
         <CheckCircle2 size={16} />
      </div>
      <div>
         <h4 className="text-xs font-bold text-slate-900">{title}</h4>
         <p className="text-[10px] text-slate-500 font-bold">{client} • <span className="text-emerald-600">{value}</span></p>
      </div>
   </div>
);
