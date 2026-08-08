import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Activity, Download, Filter, TrendingUp, TrendingDown, Users, PieChart as PieChartIcon } from 'lucide-react';
import { GlassCard } from '../GlassCard';

export const ProcessAnalytics = () => {
  const conversionData = [
    { name: 'Jan', rate: 24 },
    { name: 'Feb', rate: 28 },
    { name: 'Mar', rate: 32 },
    { name: 'Apr', rate: 35 },
    { name: 'May', rate: 31 },
    { name: 'Jun', rate: 42 },
  ];

  const profitData = [
    { name: 'Q1', web: 45, mobile: 32, design: 55 },
    { name: 'Q2', web: 52, mobile: 38, design: 58 },
    { name: 'Q3', web: 61, mobile: 45, design: 62 },
    { name: 'Q4', web: 75, mobile: 55, design: 70 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-xl shadow-slate-900/10 flex items-center gap-2">
               Last 30 Days
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-colors flex items-center gap-2">
               <Filter size={14}/> Filters
            </button>
         </div>
         <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-colors">
            <Download size={14}/> Export Report
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <GlassCard className="p-6 bg-white border border-slate-200">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Sales Conversion Rate</h3>
                  <p className="text-[10px] font-bold text-slate-400 mt-1">Lead to Deal Won (%)</p>
               </div>
               <div className="flex items-center gap-2 text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-lg text-xs font-black">
                  <TrendingUp size={16} /> +12.5%
               </div>
            </div>
            <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={conversionData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} dx={-10} />
                     <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        cursor={{ stroke: '#f1f5f9', strokeWidth: 2 }}
                     />
                     <Line type="monotone" dataKey="rate" stroke="#8b5cf6" strokeWidth={4} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </GlassCard>

         <GlassCard className="p-6 bg-white border border-slate-200">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Project Profitability</h3>
                  <p className="text-[10px] font-bold text-slate-400 mt-1">Margin by Department (%)</p>
               </div>
               <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                  <PieChartIcon size={20} />
               </div>
            </div>
            <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={profitData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} dx={-10} />
                     <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        cursor={{ fill: '#f8fafc' }}
                     />
                     <Bar dataKey="web" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Web Dev" />
                     <Bar dataKey="mobile" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Mobile" />
                     <Bar dataKey="design" fill="#10b981" radius={[4, 4, 0, 0]} name="Design" />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </GlassCard>
      </div>

      <GlassCard className="p-0 bg-white border border-slate-200 overflow-hidden">
         <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
               <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Departmental Health Overview</h3>
               <p className="text-xs font-bold text-slate-500 mt-1">KPI tracking across all units</p>
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50">Department</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50">Score</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50">Active Projects</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50">Utilization</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50">Trend</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {[
                     { dept: 'Engineering', score: 94, projects: 24, util: 88, trend: 'up' },
                     { dept: 'Design', score: 82, projects: 15, util: 75, trend: 'down' },
                     { dept: 'Sales', score: 88, projects: 12, util: 92, trend: 'up' },
                     { dept: 'Marketing', score: 76, projects: 8, util: 65, trend: 'down' },
                  ].map((row, i) => (
                     <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                           <span className="text-sm font-bold text-slate-900">{row.dept}</span>
                        </td>
                        <td className="p-4">
                           <div className="flex items-center gap-2">
                              <span className={`text-sm font-black ${row.score >= 90 ? 'text-emerald-600' : row.score >= 80 ? 'text-amber-500' : 'text-rose-500'}`}>{row.score}</span>
                           </div>
                        </td>
                        <td className="p-4">
                           <span className="text-sm font-bold text-slate-700">{row.projects}</span>
                        </td>
                        <td className="p-4">
                           <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-slate-100 rounded-full w-24">
                                 <div className={`h-full rounded-full ${row.util >= 85 ? 'bg-violet-500' : 'bg-slate-400'}`} style={{ width: `${row.util}%` }}></div>
                              </div>
                              <span className="text-xs font-black text-slate-700">{row.util}%</span>
                           </div>
                        </td>
                        <td className="p-4">
                           {row.trend === 'up' ? <TrendingUp size={16} className="text-emerald-500"/> : <TrendingDown size={16} className="text-rose-500"/>}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </GlassCard>
    </div>
  );
};
