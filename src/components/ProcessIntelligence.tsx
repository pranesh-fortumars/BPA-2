import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  ResponsiveContainer as ResponsiveContainer2,
  Tooltip as Tooltip2,
  Cell as Cell2
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Calendar,
  Activity,
  Layers,
  Search,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Workflow,
  AlertTriangle,
  History,
  Info,
  Users,
  Brain
} from 'lucide-react';

const workloadData = [
  { name: 'Invoice Hub', value: 850, risk: 'High' },
  { name: 'Finance Review', value: 420, risk: 'Medium' },
  { name: 'HR Data Relay', value: 310, success: 98.4, risk: 'Low' },
  { name: 'Legal Audit Pool', value: 184, success: 100, risk: 'Stable' },
  { name: 'ERP Post Pool', value: 640, processing: 85, risk: 'Heavy' },
];

const COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#f43f5e'];

export const ProcessIntelligence = () => {
    const [activeView, setActiveView] = useState('Cycle Time');

    return (
        <div className="space-y-10 pb-32">
            {/* Process Performance Cluster */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Avg Cycle Time', value: '1.4h', trend: -12.4, color: 'text-violet-400', icon: Clock },
                    { label: 'Delayed Approvals', value: '42 units', trend: +5.2, color: 'text-rose-600', icon: AlertTriangle },
                    { label: 'Failed Workflows', value: '0.04%', trend: -2.1, color: 'text-emerald-600', icon: ShieldCheck },
                    { label: 'Pending Escalations', value: '18', trend: +1.4, color: 'text-amber-600', icon: Activity },
                ].map((stat, i) => (
                    <GlassCard key={i} className="p-6 overflow-hidden relative">
                         <div className="flex justify-between items-start mb-6">
                            <div className="p-2.5 rounded-xl bg-white border border-slate-100 text-slate-600">
                               <stat.icon size={20} />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${stat.trend < 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                               {stat.trend}%
                            </div>
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
                         </div>
                    </GlassCard>
                ))}
            </div>

            {/* Workflow Intelligence Core */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Bottleneck Heatmap Simulation */}
               <GlassCard className="lg:col-span-2 p-10 h-[500px] overflow-hidden">
                  <div className="flex justify-between items-center mb-12">
                     <div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
                           <Activity className="text-rose-500" />
                           Bottleneck Heatmap & Workload
                        </h2>
                        <p className="text-slate-700 text-sm mt-1">Real-time identification of process congestion nodes</p>
                     </div>
                     <div className="flex bg-white/50 p-1 rounded-xl border border-slate-100">
                        {['Cycle Time', 'Deviation', 'Congestion'].map(v => (
                           <button 
                             key={v}
                             onClick={() => setActiveView(v)}
                             className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeView === v ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-slate-700'}`}
                           >
                              {v}
                           </button>
                        ))}
                     </div>
                  </div>

                  <div className="h-[320px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={workloadData}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                           <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }} />
                           <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }} />
                           <Tooltip 
                              cursor={{fill: 'rgba(99, 102, 241, 0.05)'}}
                              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                              itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'black', textTransform: 'uppercase' }}
                           />
                           <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={50}>
                              {workloadData.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.8} stroke={COLORS[index % COLORS.length]} strokeWidth={2} />
                              ))}
                           </Bar>
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </GlassCard>

               {/* Process Deviation Analysis */}
               <GlassCard className="p-10 space-y-10">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-2">
                     <TrendingUp className="text-violet-400" />
                     Deviation Analysis
                  </h3>
                  
                  <div className="space-y-8">
                     {[
                        { label: 'Unusual Flow Paths', value: '4.2%', risk: 'Low', color: 'text-violet-400' },
                        { label: 'Approval Bypass', value: '1.8%', risk: 'Medium', color: 'text-rose-600' },
                        { label: 'Duplicate Entry Attempt', value: '0.4%', risk: 'Low', color: 'text-emerald-600' },
                        { label: 'SLA Exceptions', value: '8.4%', risk: 'Heavy', color: 'text-amber-600' },
                     ].map((dev, i) => (
                        <div key={i} className="space-y-3">
                           <div className="flex justify-between items-end">
                              <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">{dev.label}</span>
                              <span className={`text-sm font-black ${dev.color}`}>{dev.value}</span>
                           </div>
                           <div className="h-1.5 w-full bg-white border border-slate-100 rounded-full overflow-hidden">
                              <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: dev.value }}
                                 className={`h-full ${dev.color.replace('text-', 'bg-')} shadow-[0_0_10px_currentColor]`}
                              ></motion.div>
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className="mt-auto pt-10 border-t border-slate-100">
                      <div className="flex items-center gap-4 p-4 bg-violet-600/5 border border-violet-500/20 rounded-2xl">
                         <Sparkles className="text-violet-400 animate-pulse" size={20} />
                         <p className="text-[10px] font-black text-slate-300 uppercase leading-relaxed tracking-tight">AI Agent suggests recalibrating <span className="text-violet-400">'Legal Audit Pool'</span> node to reduce 12% cycle delay.</p>
                      </div>
                  </div>
               </GlassCard>
            </div>

            {/* Employee Workload Overload Detection */}
            <GlassCard className="p-0 overflow-hidden shadow-2xl">
                <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-white/20">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-500/20">
                         <Users size={28} />
                      </div>
                      <div>
                         <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Workload Mapping Engine</h2>
                         <p className="text-slate-700 text-sm font-medium">Critical focus on under-resourced operational sectors</p>
                      </div>
                   </div>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-100 bg-white/50">
                               <th className="px-10 py-6">Operational Sector</th>
                               <th className="px-10 py-6">Resource Saturation</th>
                               <th className="px-10 py-6">Pending Load</th>
                               <th className="px-10 py-6">Efficiency Gap</th>
                               <th className="px-10 py-6 text-right">Action Needed</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/40">
                           {[
                              { sector: 'Finance Approval', sat: 92, load: 154, gap: 12, risk: 'High Risk' },
                              { sector: 'Procurement Audit', sat: 85, load: 42, gap: 4, risk: 'Moderate' },
                              { sector: 'Legal Review Board', sat: 41, load: 12, gap: 0, risk: 'Stable' },
                              { sector: 'HR Onboarding Pool', sat: 98, load: 210, gap: 18, risk: 'Critical' },
                           ].map(row => (
                              <tr key={row.sector} className="hover:bg-white/20 transition-all cursor-pointer group">
                                 <td className="px-10 py-8">
                                    <div className="flex items-center gap-4">
                                       <div className={`w-1.5 h-1.5 rounded-full ${row.risk === 'Critical' ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]' : 'bg-violet-500'}`}></div>
                                       <span className="text-base font-black text-slate-900 uppercase tracking-tight group-hover:text-violet-400 transition-colors">{row.sector}</span>
                                    </div>
                                 </td>
                                 <td className="px-10 py-8">
                                    <div className="flex items-center gap-6">
                                       <div className="w-24 h-2 bg-white border border-slate-100 rounded-full overflow-hidden shrink-0">
                                          <div className={`h-full ${row.sat > 90 ? 'bg-rose-500' : 'bg-violet-500'}`} style={{ width: `${row.sat}%` }}></div>
                                       </div>
                                       <span className="text-sm font-black text-slate-600 font-mono italic">{row.sat}%</span>
                                    </div>
                                 </td>
                                 <td className="px-10 py-8 text-slate-600 font-black font-mono text-sm">{row.load} queue</td>
                                 <td className="px-10 py-8 text-slate-700 font-black text-sm italic">{row.gap}% delay</td>
                                 <td className="px-10 py-8 text-right">
                                    <button className={`px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest border transition-all ${row.risk === 'Critical' ? 'bg-rose-500/10 border-rose-500/30 text-rose-500 shadow-xl shadow-rose-500/10' : 'bg-white border-slate-100 text-slate-600 hover:text-white'}`}>
                                       {row.risk === 'Critical' ? 'Deploy Aux Agent' : row.risk === 'Moderate' ? 'Monitor Flow' : 'Optimize Node'}
                                    </button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                    </table>
                </div>
            </GlassCard>

            {/* AI Suggestion Insight Banner */}
            <div className="mt-10 p-10 rounded-[3rem] bg-violet-600/5 border border-violet-500/20 flex flex-col md:flex-row items-center justify-between gap-10">
               <div className="flex items-center gap-8">
                  <div className="w-20 h-20 bg-violet-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-violet-600/30 border border-violet-500/50">
                     <Brain className="text-slate-900" size={40} />
                  </div>
                  <div>
                     <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Process Deviation Prediction Active</h3>
                     <p className="text-slate-700 text-sm max-w-xl font-medium mt-1">Our neural engine has detected a 14% drift in standard Operating Procedures. Proposing automated compliance rollback for audit cluster Alpha.</p>
                  </div>
               </div>
               <button className="px-10 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-violet-600/30 flex items-center gap-3 transition-all">
                  Inspect Deviations <ArrowRight size={20} />
               </button>
            </div>
        </div>
    );
};






