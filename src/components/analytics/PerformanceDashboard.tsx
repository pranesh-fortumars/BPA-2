import React, { useState, useEffect } from 'react';
import { DataService } from '../../lib/db';
import { GlassCard } from '../GlassCard';
import { Activity, Server, Cpu, HardDrive, Network, Globe } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const PerformanceDashboard = () => {
    const [telemetry, setTelemetry] = useState<any>(null);

    useEffect(() => {
        const initData = async () => {
            let data = await DataService.getAll<any>('telemetry');
            if (data.length === 0) {
                const initial = {
                    id: 'sys-perf',
                    cpu: 42,
                    memory: 68,
                    latency: 125, // ms
                    activeNodes: 12,
                    latencyHistory: Array.from({length: 20}, (_, i) => ({
                        time: `-${20-i}m`,
                        value: Math.floor(Math.random() * 50) + 100
                    }))
                };
                await DataService.save('telemetry', initial);
                data = [initial];
            }
            setTelemetry(data[0]);
        };
        initData();
    }, []);

    if (!telemetry) return null;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Performance Intelligence</h1>
                    <p className="text-sm text-muted mt-1">Monitor system latency, throughput, and cluster health</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <GlassCard className="p-5 bg-surface border border-border shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <Cpu size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Global CPU Load</p>
                        <h3 className="text-xl font-black text-foreground">{telemetry.cpu}%</h3>
                    </div>
                </GlassCard>
                <GlassCard className="p-5 bg-surface border border-border shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                        <HardDrive size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Memory Usage</p>
                        <h3 className="text-xl font-black text-foreground">{telemetry.memory}%</h3>
                    </div>
                </GlassCard>
                <GlassCard className="p-5 bg-surface border border-border shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-info/10 text-info flex items-center justify-center">
                        <Network size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Avg Latency</p>
                        <h3 className="text-xl font-black text-foreground">{telemetry.latency}ms</h3>
                    </div>
                </GlassCard>
                <GlassCard className="p-5 bg-surface border border-border shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-success/10 text-success flex items-center justify-center">
                        <Server size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Active Nodes</p>
                        <h3 className="text-xl font-black text-foreground">{telemetry.activeNodes}</h3>
                    </div>
                </GlassCard>
            </div>

            <GlassCard className="p-6 bg-surface border border-border shadow-sm h-80 flex flex-col">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Globe size={16} className="text-primary" /> Global Request Latency (ms)
                </h3>
                <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={telemetry.latencyHistory} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dx={-10} />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                            <Area type="step" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorLatency)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </GlassCard>
        </div>
    );
};
