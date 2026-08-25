import React, { useState } from 'react';
import { Search, Filter, PlaySquare, MoreVertical, Zap, Activity, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AutomationsHub = () => {
    const automations = [
        { id: 'AUTO-01', name: 'Invoice Processing Pipeline', type: 'Hybrid', health: 98, activeRuns: 14, lastRun: '2m ago', status: 'Active' },
        { id: 'AUTO-02', name: 'Employee Onboarding Sync', type: 'API', health: 100, activeRuns: 2, lastRun: '15m ago', status: 'Active' },
        { id: 'AUTO-03', name: 'Legacy ERP Data Extract', type: 'RPA', health: 76, activeRuns: 8, lastRun: '5m ago', status: 'Warning' },
        { id: 'AUTO-04', name: 'Customer Support Triage', type: 'AI Agent', health: 94, activeRuns: 112, lastRun: 'Just now', status: 'Active' },
        { id: 'AUTO-05', name: 'Monthly Financial Close', type: 'Scheduled', health: 100, activeRuns: 0, lastRun: '4 days ago', status: 'Idle' },
    ];

    const getHealthColor = (health: number) => {
        if (health >= 95) return 'text-success bg-success/10';
        if (health >= 80) return 'text-warning bg-warning/10';
        return 'text-critical bg-critical/10';
    };

    return (
        <div className="space-y-6 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-surface border border-border p-6 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Zap size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-foreground">124</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted">Total Active</div>
                    </div>
                </div>
                <div className="bg-surface border border-border p-6 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-success">
                        <Activity size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-foreground">42.8k</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted">Runs Today</div>
                    </div>
                </div>
                <div className="bg-surface border border-border p-6 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center text-warning">
                        <Clock size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-foreground">12m</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted">Avg Execution</div>
                    </div>
                </div>
                <div className="bg-surface border border-border p-6 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-foreground">99.4%</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted">Success Rate</div>
                    </div>
                </div>
            </div>

            <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                        <input 
                           type="text" 
                           placeholder="Search automations..." 
                           className="pl-9 pr-4 py-2 bg-surface-elevated border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50 w-64 transition-all"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-surface-elevated border border-border text-foreground text-sm font-medium rounded-lg hover:bg-border transition-colors flex items-center gap-2">
                            <Filter size={16} /> Filters
                        </button>
                        <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-lg hover:brightness-110 transition-colors shadow-sm shadow-primary/20">
                            Create Automation
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-surface-elevated border-b border-border text-[10px] font-black text-muted uppercase tracking-widest">
                            <tr>
                                <th className="px-6 py-4">Automation</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Health</th>
                                <th className="px-6 py-4">Active Runs</th>
                                <th className="px-6 py-4">Last Run</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {automations.map(auto => (
                                <tr key={auto.id} className="hover:bg-surface-elevated transition-colors group cursor-pointer">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                                                <Zap size={16} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-foreground">{auto.name}</div>
                                                <div className="text-[10px] font-bold text-muted uppercase tracking-widest">{auto.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-[10px] font-bold text-muted bg-surface border border-border rounded uppercase">{auto.type}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                                                <div className={`h-full ${getHealthColor(auto.health).split(' ')[0].replace('text-', 'bg-')}`} style={{ width: `${auto.health}%` }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-foreground">{auto.health}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-foreground">{auto.activeRuns}</td>
                                    <td className="px-6 py-4 text-xs font-medium text-muted">{auto.lastRun}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <div className={`w-2 h-2 rounded-full ${auto.status === 'Active' ? 'bg-success animate-pulse' : auto.status === 'Warning' ? 'bg-warning' : 'bg-muted'}`}></div>
                                            <span className="text-xs font-bold text-foreground">{auto.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-muted hover:text-foreground hover:bg-surface-elevated rounded-lg transition-colors">
                                            <MoreVertical size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
