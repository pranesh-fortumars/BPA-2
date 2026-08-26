import React, { useState, useEffect } from 'react';
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
import { DataService } from '../../lib/db';

export const ExecutiveOverview = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [wins, setWins] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      // Alerts
      let storedAlerts = await DataService.getAll<any>('executive_alerts');
      if (storedAlerts.length === 0) {
        const initialAlerts = [
          { id: 'a1', title: 'Project Risk: Client Portal', severity: 'High', desc: 'Delayed by 2 weeks due to resource shortage.' },
          { id: 'a2', title: 'Invoice Overdue', severity: 'Medium', desc: 'Stark Industries invoice INV-001 is 5 days late.' },
          { id: 'a3', title: 'Server Costs Spike', severity: 'Low', desc: 'AWS billing exceeded threshold by 15%.' }
        ];
        for (const a of initialAlerts) await DataService.save('executive_alerts', a);
        storedAlerts = initialAlerts;
      }
      setAlerts(storedAlerts);

      // Wins
      let storedWins = await DataService.getAll<any>('executive_wins');
      if (storedWins.length === 0) {
        const initialWins = [
          { id: 'w1', title: 'New Contract Signed', client: 'Acme Corp', value: '₹1.5Cr' },
          { id: 'w2', title: 'Milestone Reached', client: 'Wayne Ent.', value: 'Phase 1 Delivered' },
          { id: 'w3', title: 'Proposal Accepted', client: 'Oscorp', value: '₹45L' }
        ];
        for (const w of initialWins) await DataService.save('executive_wins', w);
        storedWins = initialWins;
      }
      setWins(storedWins);
    };
    loadData();
  }, []);

  return (
    <div className="space-y-6 text-foreground">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <StatCard title="Annual Run Rate (ARR)" value="₹3,20,50,000" trend="+15%" isUp={true} icon={DollarSign} color="success" />
         <StatCard title="Active Clients" value="142" trend="+12 this month" isUp={true} icon={Users} color="secondary" />
         <StatCard title="Active Projects" value="48" trend="3 at risk" isUp={false} icon={Briefcase} color="warning" />
         <StatCard title="Employee Utilization" value="82%" trend="Optimal range" isUp={true} icon={Activity} color="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6 bg-surface border border-border">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Q4 Revenue Forecast</h3>
                <span className="text-[10px] font-bold text-muted">Based on active contracts</span>
             </div>
             <div className="h-64 flex items-end justify-between gap-2">
                {[55, 60, 65, 50, 75, 80, 85, 95, 90, 105, 100, 115].map((val, i) => (
                   <div key={i} className="w-full bg-surface-elevated rounded-t-xl relative group border border-border border-b-0">
                      <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-xl transition-all" style={{ height: `${val}%` }}></div>
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-black py-1 px-2 rounded-lg pointer-events-none transition-opacity z-10 whitespace-nowrap shadow-xl">
                         ₹{(val * 20000).toLocaleString()}
                      </div>
                   </div>
                ))}
             </div>
             <div className="flex justify-between mt-4 text-[10px] font-bold text-muted">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
             </div>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-6 bg-surface border border-border">
               <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-4">Department Health</h3>
               <div className="space-y-4">
                  <HealthBar dept="Engineering" health={92} />
                  <HealthBar dept="Sales & Marketing" health={85} />
                  <HealthBar dept="Design" health={78} />
                  <HealthBar dept="HR & Ops" health={95} />
               </div>
            </GlassCard>

            <GlassCard className="p-6 bg-surface border border-border">
               <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-4 flex items-center gap-2">
                  <PieChart size={16} className="text-primary" /> Automation Savings
               </h3>
               <div className="flex items-end gap-4 mb-4">
                  <h4 className="text-4xl font-black text-foreground">420<span className="text-lg text-muted font-bold">hrs</span></h4>
               </div>
               <p className="text-xs font-bold text-success mb-4 flex items-center gap-1">
                  <TrendingUp size={14}/> Saved this month via workflows
               </p>
               <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                  <div className="w-[75%] h-full bg-primary"></div>
               </div>
               <p className="text-[9px] font-black uppercase tracking-widest text-muted mt-2 text-right">Target: 500 hrs</p>
            </GlassCard>
          </div>
        </div>
        
        <div className="space-y-6">
          <GlassCard className="p-6 bg-surface-elevated text-foreground border border-border shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-critical/10 blur-2xl rounded-full"></div>
             <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-6 flex items-center gap-2">
                <AlertTriangle size={16} className="text-critical" /> Executive Alerts
             </h3>
             <div className="space-y-3 relative z-10">
                {alerts.map(a => (
                   <AlertRow key={a.id} title={a.title} severity={a.severity} desc={a.desc} />
                ))}
             </div>
          </GlassCard>

          <GlassCard className="p-6 bg-surface border border-border">
             <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-6">Recent Wins</h3>
             <div className="space-y-4">
                {wins.map(w => (
                   <WinRow key={w.id} title={w.title} client={w.client} value={w.value} />
                ))}
             </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

/* --- UTILS --- */

const StatCard = ({ title, value, trend, isUp, icon: Icon, color }: any) => {
  const colorMap: Record<string, string> = {
     success: 'bg-success/10 text-success border border-success/20',
     warning: 'bg-warning/10 text-warning border border-warning/20',
     secondary: 'bg-secondary/10 text-secondary border border-secondary/20',
     primary: 'bg-primary/10 text-primary border border-primary/20'
  };

  return (
    <GlassCard className="p-6 bg-surface border border-border hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color] || colorMap.primary}`}>
          <Icon size={20} />
        </div>
        <span className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-md border ${isUp ? 'bg-success/10 text-success border-success/20' : 'bg-critical/10 text-critical border-critical/20'}`}>
          {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trend}
        </span>
      </div>
      <div>
        <p className="text-[11px] font-black uppercase tracking-widest text-muted mb-1">{title}</p>
        <h4 className="text-2xl font-black text-foreground tracking-tight">{value}</h4>
      </div>
    </GlassCard>
  );
};

const HealthBar = ({ dept, health }: any) => (
   <div>
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1">
         <span className="text-foreground">{dept}</span>
         <span className={health > 90 ? 'text-success' : health > 80 ? 'text-warning' : 'text-critical'}>{health}%</span>
      </div>
      <div className="w-full h-1.5 bg-surface-elevated rounded-full overflow-hidden">
         <div className={`h-full ${health > 90 ? 'bg-success' : health > 80 ? 'bg-warning' : 'bg-critical'}`} style={{ width: `${health}%` }}></div>
      </div>
   </div>
);

const AlertRow = ({ title, severity, desc }: any) => (
   <div className="p-3 bg-surface border border-border rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-1">
         <h4 className="text-xs font-bold text-foreground">{title}</h4>
         <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${severity === 'High' ? 'bg-critical/10 text-critical border-critical/20' : severity === 'Medium' ? 'bg-warning/10 text-warning border-warning/20' : 'bg-secondary/10 text-secondary border-secondary/20'}`}>{severity}</span>
      </div>
      <p className="text-[10px] text-muted leading-snug font-medium">{desc}</p>
   </div>
);

const WinRow = ({ title, client, value }: any) => (
   <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-success/10 text-success border border-success/20 flex items-center justify-center shrink-0">
         <CheckCircle2 size={16} />
      </div>
      <div>
         <h4 className="text-xs font-bold text-foreground">{title}</h4>
         <p className="text-[10px] text-muted font-bold">{client} • <span className="text-success">{value}</span></p>
      </div>
   </div>
);
