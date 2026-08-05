import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  Zap,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Activity,
  Calendar,
  Filter
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';


const initialChartData = [
  { name: '00:00', load: 45, optimized: 32 },
  { name: '04:00', load: 52, optimized: 38 },
  { name: '08:00', load: 85, optimized: 65 },
  { name: '12:00', load: 78, optimized: 60 },
  { name: '16:00', load: 92, optimized: 75 },
  { name: '20:00', load: 65, optimized: 50 },
];

const distributionData = [
  { name: 'HR', value: 45 },
  { name: 'Ops', value: 92 },
  { name: 'Fin', value: 68 },
  { name: 'Dev', value: 95 },
];

interface StatCardProps {
  title: string;
  value: string | number;
  trend: number;
  icon: React.ElementType;
  color: string;
}

export const StatCard = ({ title, value, trend, icon: Icon, color }: StatCardProps) => (
  <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-2 h-16 bg-current opacity-5 rounded-bl-full group-hover:h-full transition-all duration-500"></div>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 border border-current border-opacity-20`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold ${trend >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
        {trend >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {Math.abs(trend)}%
      </div>
    </div>
    <div>
      <p className="text-slate-800 text-[13px] font-black uppercase tracking-widest mb-2">{title}</p>
      <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{value}</h3>
    </div>
  </div>
);

export const DashboardWidgets = () => {
  const [activeRange, setActiveRange] = useState('24h');
  const [chartData, setChartData] = useState(initialChartData);
  const [liveStats, setLiveStats] = useState({
    active: 124,
    completed: 1482,
    savings: 12.4,
    uptime: 99.98
  });

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        active: prev.active + (Math.random() > 0.5 ? 1 : -1),
        completed: prev.completed + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRangeChange = (range: string) => {
    setActiveRange(range);
    // Simulate data morphing
    setChartData(prev => prev.map(d => ({
      ...d,
      load: Math.max(10, Math.min(100, d.load + (Math.random() * 20 - 10))),
      optimized: Math.max(5, Math.min(90, d.optimized + (Math.random() * 20 - 10)))
    })));
  };

  return (
    <div className="space-y-8">
      {/* Stats Cluster */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Automations" value={liveStats.active} trend={12} icon={Zap} color="bg-violet-600" />
        <StatCard title="Total Completed" value={liveStats.completed.toLocaleString()} trend={8} icon={Activity} color="bg-emerald-600" />
        <StatCard title="Operational Savings" value={`$${liveStats.savings}k`} trend={15} icon={TrendingUp} color="bg-amber-600" />
        <StatCard title="System Reliability" value={`${liveStats.uptime}%`} trend={0.02} icon={Clock} color="bg-violet-600" />
      </div>

      {/* Main Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-1 uppercase tracking-tight">Process Throughput</h3>
              <p className="text-slate-700 text-sm font-medium">System load vs AI-optimized execution paths</p>
            </div>
            <div className="flex bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
              {['24h', '7d', '30d'].map(r => (
                <button
                  key={r}
                  onClick={() => handleRangeChange(r)}
                  className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeRange === r ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-600 hover:text-slate-900 hover:bg-white'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12, fontWeight: 800 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12, fontWeight: 800 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 25px 30px -5px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}
                />
                <Area type="monotone" dataKey="load" stroke="#8b5cf6" strokeWidth={4} fillOpacity={1} fill="url(#colorLoad)" />
                <Area type="monotone" dataKey="optimized" stroke="#10b981" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dept Distribution */}
        <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Dept Velocity</h3>
            <button className="p-2 bg-white border border-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors shadow-sm">
              <MoreVertical size={16} />
            </button>
          </div>

          <div className="space-y-8">
            {distributionData.map((dept, index) => (
              <div key={dept.name} className="space-y-4">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                  <span className="text-slate-600">{dept.name} Load Velocity</span>
                  <span className="text-violet-600 font-black">{dept.value}%</span>
                </div>
                <div className="h-2 w-full bg-white rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${dept.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-violet-600 rounded-full shadow-[0_0_8px_rgba(124,58,237,0.2)]"
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-[2.5rem] bg-violet-50/20 border border-violet-100/50 text-center relative overflow-hidden group shadow-inner">
            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/5 rounded-bl-full -mr-12 -mt-12 group-hover:scale-150 transition-transform"></div>
            <p className="text-[11px] text-violet-600 font-black uppercase tracking-widest mb-3 relative z-10">Neural Advisory</p>
            <p className="text-xs text-slate-700 font-bold leading-relaxed relative z-10">System suggests increasing compute nodes in Ops Module to maintain 99.9% reliability.</p>
          </div>
        </div>
      </div>
    </div>
  );
};





