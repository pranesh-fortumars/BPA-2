import React, { useState, useEffect } from 'react';
import { DataService } from '../../lib/db';
import { GlassCard } from '../GlassCard';
import { PieChart, TrendingUp, DollarSign, Clock, Users } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const RoiDashboard = () => {
    const [metrics, setMetrics] = useState<any>(null);

    useEffect(() => {
        const initData = async () => {
            let data = await DataService.getAll<any>('roi_metrics');
            if (data.length === 0) {
                const initial = {
                    id: 'roi-current',
                    totalSavings: 4500000, // ₹45L
                    hoursSaved: 12500,
                    fteEquivalent: 15,
                    trend: 24, // 24% increase
                    monthlySavings: [
                        { name: 'Jan', value: 3.2 }, { name: 'Feb', value: 3.8 }, { name: 'Mar', value: 4.1 },
                        { name: 'Apr', value: 4.5 }, { name: 'May', value: 5.2 }, { name: 'Jun', value: 5.8 }
                    ],
                    deptSavings: [
                        { name: 'Finance', value: 1.8 }, { name: 'HR', value: 1.2 },
                        { name: 'IT Ops', value: 0.9 }, { name: 'Sales', value: 0.6 }
                    ]
                };
                await DataService.save('roi_metrics', initial);
                data = [initial];
            }
            setMetrics(data[0]);
        };
        initData();
    }, []);

    if (!metrics) return null;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Analytics & ROI</h1>
                    <p className="text-sm text-muted mt-1">Track automation value, cost savings, and investment returns</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="p-6 bg-surface border border-border shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-success/10 text-success flex items-center justify-center">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-muted uppercase tracking-widest">Total Value Generated</p>
                            <h3 className="text-2xl font-black text-foreground">₹{metrics.totalSavings / 100000}L</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold">
                        <TrendingUp size={14} className="text-success" />
                        <span className="text-success">+{metrics.trend}%</span>
                        <span className="text-muted">vs last quarter</span>
                    </div>
                </GlassCard>

                <GlassCard className="p-6 bg-surface border border-border shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-info/10 text-info flex items-center justify-center">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-muted uppercase tracking-widest">Human Hours Saved</p>
                            <h3 className="text-2xl font-black text-foreground">{metrics.hoursSaved.toLocaleString()}h</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold">
                        <TrendingUp size={14} className="text-success" />
                        <span className="text-success">+12%</span>
                        <span className="text-muted">vs last quarter</span>
                    </div>
                </GlassCard>

                <GlassCard className="p-6 bg-surface border border-border shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-muted uppercase tracking-widest">FTE Capacity Recovered</p>
                            <h3 className="text-2xl font-black text-foreground">{metrics.fteEquivalent} Full-Time</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-muted">
                        <span>Reallocated to strategic initiatives</span>
                    </div>
                </GlassCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard className="p-6 bg-surface border border-border shadow-sm h-96 flex flex-col">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
                        <TrendingUp size={16} className="text-primary" /> Monthly Value Trend (₹ Lakhs)
                    </h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={metrics.monthlySavings} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dx={-10} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                <GlassCard className="p-6 bg-surface border border-border shadow-sm h-96 flex flex-col">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
                        <PieChart size={16} className="text-primary" /> Value by Department
                    </h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={metrics.deptSavings} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--foreground)', fontWeight: 'bold' }} width={80} />
                                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};
