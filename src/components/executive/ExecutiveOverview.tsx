import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Briefcase, 
  Users, 
  Target, 
  TrendingUp, 
  Activity, 
  Award, 
  AlertTriangle 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, LineChart, Line
} from 'recharts';
import { DataService } from '../../lib/db';

const revenueData = [
  { name: 'Mon', current: 4000, target: 2400 },
  { name: 'Tue', current: 3000, target: 1398 },
  { name: 'Wed', current: 2000, target: 9800 },
  { name: 'Thu', current: 2780, target: 3908 },
  { name: 'Fri', current: 1890, target: 4800 },
  { name: 'Sat', current: 2390, target: 3800 },
  { name: 'Sun', current: 3490, target: 4300 },
];

const resourceData = [
  { dept: 'Engineering', capacity: 95, allocated: 88 },
  { dept: 'Design', capacity: 60, allocated: 55 },
  { dept: 'Marketing', capacity: 40, allocated: 38 },
  { dept: 'Sales', capacity: 50, allocated: 45 },
];

export const ExecutiveOverview = () => {
  const [loading, setLoading] = useState(true);

  // Example of using the new local-first DB abstraction
  useEffect(() => {
    const initData = async () => {
      try {
        await DataService.save('kpi_data', { id: 'revenue', value: 240500 });
        const revenue = await DataService.get('kpi_data', 'revenue');
        console.log("Offline-first data initialized", revenue);
      } catch (e) {
        console.error("Local DB Error", e);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Revenue (Week)" 
          value="$240.5K" 
          trend="+14.2%" 
          trendUp={true} 
          icon={DollarSign} 
          color="text-emerald-500" 
          bg="bg-emerald-50" 
        />
        <KPICard 
          title="Active Projects" 
          value="34" 
          trend="+2" 
          trendUp={true} 
          icon={Briefcase} 
          color="text-violet-500" 
          bg="bg-violet-50" 
        />
        <KPICard 
          title="Team Utilization" 
          value="92%" 
          trend="-3%" 
          trendUp={false} 
          icon={Users} 
          color="text-amber-500" 
          bg="bg-amber-50" 
        />
        <KPICard 
          title="Client Satisfaction" 
          value="4.9/5" 
          trend="+0.1" 
          trendUp={true} 
          icon={Award} 
          color="text-rose-500" 
          bg="bg-rose-50" 
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Revenue Trajectory</h3>
              <p className="text-xs text-slate-500 font-bold mt-1">Current vs Target (7 Days)</p>
            </div>
            <button className="px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 transition-colors">
              Export Report
            </button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e2e8f0" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#e2e8f0" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#94a3b8'}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 800 }}
                  labelStyle={{ fontWeight: 800, color: '#64748b', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="target" stroke="#cbd5e1" strokeWidth={2} fillOpacity={1} fill="url(#colorTarget)" />
                <Area type="monotone" dataKey="current" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorCurrent)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Health Scores */}
        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-900/10 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 blur-[80px] rounded-full pointer-events-none"></div>
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-100 mb-6 relative z-10">Business Health</h3>
          
          <div className="space-y-6 flex-1 relative z-10">
            <HealthMetric label="AI Productivity Score" value={94} color="bg-emerald-500" />
            <HealthMetric label="Employee Performance" value={88} color="bg-violet-500" />
            <HealthMetric label="Department Health" value={92} color="bg-blue-500" />
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800 relative z-10">
            <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
              <span className="text-slate-400">Overdue Tasks</span>
              <span className="text-rose-400 flex items-center gap-1"><AlertTriangle size={14}/> 12</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Allocation */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">Resource Allocation Heatmap</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={resourceData} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#94a3b8'}} />
              <YAxis dataKey="dept" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#64748b'}} />
              <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 700, paddingTop: '20px' }}/>
              <Bar dataKey="capacity" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={12} />
              <Bar dataKey="allocated" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const KPICard = ({ title, value, trend, trendUp, icon: Icon, color, bg }: any) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-2xl ${bg} ${color} flex items-center justify-center`}>
        <Icon size={24} />
      </div>
      <div className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {trend}
      </div>
    </div>
    <div>
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</h4>
      <p className="text-3xl font-black text-slate-900 tracking-tighter">{value}</p>
    </div>
  </motion.div>
);

const HealthMetric = ({ label, value, color }: any) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <span className="text-xs font-bold text-slate-300">{label}</span>
      <span className="text-xs font-black text-white">{value}%</span>
    </div>
    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full ${color} rounded-full`}
      ></motion.div>
    </div>
  </div>
);
