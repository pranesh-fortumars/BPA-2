import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
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
  Download,
  Share2,
  RefreshCw,
  Cpu,
  Activity,
  ChevronRight
} from 'lucide-react';

const throughputData = [
  { name: 'Jan', processed: 4000, optimized: 2400 },
  { name: 'Feb', processed: 3000, optimized: 1398 },
  { name: 'Mar', processed: 2000, optimized: 9800 },
  { name: 'Apr', processed: 2780, optimized: 3908 },
  { name: 'May', processed: 1890, optimized: 4800 },
  { name: 'Jun', processed: 2390, optimized: 3800 },
];

const departmentUsage = [
  { name: 'HR', value: 400 },
  { name: 'Finance', value: 300 },
  { name: 'Ops', value: 300 },
  { name: 'Support', value: 200 },
];

const COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b'];

export const AnalyticsHub = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [stats, setStats] = useState(throughputData);
    const [selectedMetric, setSelectedMetric] = useState('Throughput');

    const refreshData = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setStats(prev => prev.map(d => ({
                ...d,
                processed: Math.floor(d.processed + (Math.random() * 500 - 250)),
                optimized: Math.floor(d.optimized + (Math.random() * 500 - 250))
            })));
            setIsRefreshing(false);
        }, 1200);
    };

    return (
        <div className="space-y-8 pb-32">
            {/* Action Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-center bg-white/40 p-5 rounded-3xl border border-slate-100 gap-6">
               <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-600 flex items-center gap-2">
                     <Calendar size={14} /> Full Q1 Report
                  </div>
                  <div className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-600 flex items-center gap-2">
                     <Target size={14} /> KPI Set: Corporate v2.0
                  </div>
                  <button 
                    onClick={refreshData}
                    className={`px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-bold text-violet-400 flex items-center gap-2 hover:bg-slate-700 transition-all ${isRefreshing ? 'animate-pulse' : ''}`}
                  >
                     <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} /> 
                     {isRefreshing ? 'Recalculating...' : 'Refresh Intelligence'}
                  </button>
               </div>
               <div className="flex gap-2 w-full lg:w-auto">
                  <button className="flex-1 lg:flex-none p-2.5 bg-white hover:bg-slate-700 rounded-xl text-white border border-slate-100 transition-all shadow-xl shadow-slate-900/50">
                     <Share2 size={18} />
                  </button>
                  <button className="flex-[2] lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-violet-600 hover:bg-violet-500 rounded-xl text-sm font-bold text-white shadow-xl shadow-violet-600/30 transition-all">
                     <Download size={18} /> Export Data
                  </button>
               </div>
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <GlassCard className="p-8 h-[500px]">
                  <div className="flex justify-between items-center mb-10">
                     <div>
                        <h3 className="text-xl font-black text-slate-900">Throughput Velocity</h3>
                        <div className="flex gap-4 mt-2">
                           {['Throughput', 'Accuracy', 'Latency'].map(m => (
                             <button 
                                key={m}
                                onClick={() => setSelectedMetric(m)}
                                className={`text-xs font-black uppercase tracking-widest transition-all ${selectedMetric === m ? 'text-violet-400 border-b-2 border-violet-400 pb-1' : 'text-slate-700 hover:text-slate-300'}`}
                             >
                               {m}
                             </button>
                           ))}
                        </div>
                     </div>
                     <TrendingUp className="text-emerald-500" />
                  </div>
                  <div className="h-[320px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats}>
                           <defs>
                              <linearGradient id="colorProcAnalytics" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                                 <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                           <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                           <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                           <Tooltip 
                             contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                             itemStyle={{ fontWeight: 'black', textTransform: 'uppercase', fontSize: '10px' }}
                           />
                           <Area type="monotone" dataKey="processed" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorProcAnalytics)" />
                           <Area type="monotone" dataKey="optimized" stroke="#0ea5e9" strokeWidth={2} fillOpacity={0} />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
               </GlassCard>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <GlassCard className="p-8">
                     <h3 className="text-lg font-black text-slate-900 mb-6">Execution Mix</h3>
                     <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                              <Pie
                                 data={departmentUsage}
                                 cx="50%"
                                 cy="50%"
                                 innerRadius={70}
                                 outerRadius={100}
                                 paddingAngle={10}
                                 dataKey="value"
                              >
                                 {departmentUsage.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                 ))}
                              </Pie>
                              <Tooltip />
                           </PieChart>
                        </ResponsiveContainer>
                     </div>
                     <div className="grid grid-cols-2 gap-4 mt-6">
                        {departmentUsage.map((entry, index) => (
                           <div key={entry.name} className="flex items-center gap-2">
                              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                              <span className="text-xs font-bold text-slate-600">{entry.name}</span>
                           </div>
                        ))}
                     </div>
                  </GlassCard>

                  <GlassCard className="p-8 bg-violet-600/5 border-violet-500/20">
                     <div className="flex flex-col h-full justify-between">
                        <div>
                           <div className="w-14 h-14 bg-violet-600/20 rounded-2xl flex items-center justify-center text-violet-400 mb-6 border border-violet-500/30">
                              <Cpu size={28} fill="currentColor" />
                           </div>
                           <h3 className="text-2xl font-black text-slate-900 leading-tight mb-3">AI Cluster Prediction</h3>
                           <p className="text-slate-700 text-sm leading-relaxed">System neural network suggests <span className="text-violet-400 font-black">8.4%</span> additional overhead optimization with current node configurations.</p>
                        </div>
                        <div className="space-y-4 pt-8">
                           <div className="flex justify-between items-end mb-2">
                              <span className="text-[10px] uppercase font-black tracking-widest text-slate-700">Node Entropy</span>
                              <span className="text-lg font-black text-slate-900">82%</span>
                           </div>
                           <div className="h-2.5 w-full bg-white rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '82%' }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-violet-500 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                              ></motion.div>
                           </div>
                        </div>
                     </div>
                  </GlassCard>
               </div>
            </div>

            {/* Detailed Metrics Table */}
            <GlassCard className="p-0 overflow-hidden border-slate-100">
               <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white/20">
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
                     <Activity className="text-violet-500" />
                     Workflow Performance Matrix
                  </h2>
                  <div className="p-2.5 bg-white rounded-xl text-slate-600 hover:text-slate-900 cursor-pointer transition-all">
                     <MoreVertical size={18} />
                  </div>
               </div>
               <div className="w-full overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-white/50 text-[10px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-100">
                           <th className="px-8 py-5">Process Identity</th>
                           <th className="px-8 py-5">Avg Cycle</th>
                           <th className="px-8 py-5">Reliability</th>
                           <th className="px-8 py-5">System Health</th>
                           <th className="px-8 py-5 text-right">Navigation</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-800/40">
                        {['Invoice Processing', 'Lead Qualification', 'Employee Onboarding', 'Refund Dispatch', 'System Health Check'].map((name, i) => (
                           <motion.tr 
                             key={name}
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             transition={{ delay: i * 0.1 }}
                             className="hover:bg-white/30 transition-all group cursor-pointer"
                           >
                              <td className="px-8 py-6 font-black text-slate-900 group-hover:text-violet-400 transition-colors uppercase tracking-tight text-sm flex items-center gap-3">
                                 <div className={`w-1.5 h-1.5 rounded-full ${i === 2 ? 'bg-amber-500' : 'bg-violet-500'}`}></div>
                                 {name}
                              </td>
                              <td className="px-8 py-6 text-slate-600 font-bold font-mono text-xs italic">{(3.2 + i * 0.4).toFixed(1)} hrs</td>
                              <td className="px-8 py-6">
                                 <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                                    <span className="text-slate-300 font-black text-xs">99.{9 - i}%</span>
                                 </div>
                              </td>
                              <td className="px-8 py-6">
                                 <div className={`px-4 py-1.5 rounded-lg font-black text-[10px] inline-block border ${i === 2 ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-violet-500/10 border-violet-500/20 text-violet-400'}`}>
                                    {i === 2 ? 'REQUIRES ATTENTION' : 'A+ OPTIMIZED'}
                                 </div>
                              </td>
                              <td className="px-8 py-6 text-right">
                                 <button className="text-violet-400 font-black text-[10px] hover:text-slate-900 transition-all uppercase tracking-widest flex items-center gap-1 ml-auto">
                                   Inspect <ChevronRight size={12} />
                                 </button>
                              </td>
                           </motion.tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </GlassCard>
        </div>
    );
};





