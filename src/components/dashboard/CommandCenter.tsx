import React, { useEffect, useState } from 'react';
import { KPICards } from './KPICards';
import { ProcessHealthTable } from './ProcessHealthTable';
import { CriticalAlerts } from './CriticalAlerts';
import { CommandCenterCharts } from './CommandCenterCharts';
import { RecentActivity } from './RecentActivity';
import { Calendar, Filter, Plus } from 'lucide-react';
import { DataService } from '../../lib/db';
import { useStore } from '@nanostores/react';
import { currentUser } from '../../store/authStore';

export const CommandCenter = () => {
    const user = useStore(currentUser);
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        // Fetch dashboard stats from IndexedDB
        DataService.get('kpi_data', 'dashboard-stats').then(data => {
            if (data) setStats(data);
        });
    }, []);

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">
                        Welcome back, {user?.name.split(' ')[0] || 'User'} <span className="text-2xl">👋</span>
                    </h1>
                    <p className="text-sm text-muted mt-1">Here's what's happening across your automation ecosystem</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-foreground text-sm font-medium hover:bg-surface-elevated transition-colors shadow-sm">
                        <span>19 Aug 2026</span>
                        <Calendar size={16} className="text-muted" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-foreground text-sm font-medium hover:bg-surface-elevated transition-colors shadow-sm">
                        <Filter size={16} className="text-muted" />
                        <span>Filters</span>
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                        <Plus size={16} />
                        <span>New Automation</span>
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <KPICards stats={stats} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-6">
                    <ProcessHealthTable />
                </div>
                <div className="lg:col-span-4 space-y-6">
                    <LiveProcessActivity />
                </div>
            </div>

            {/* Bottom Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-3 space-y-6">
                    <CriticalAlerts />
                </div>
                <div className="lg:col-span-6 space-y-6">
                    <CommandCenterCharts />
                </div>
                <div className="lg:col-span-3 space-y-6">
                    <RecentActivity />
                </div>
            </div>
        </div>
    );
};

const LiveProcessActivity = () => {
    const [instances, setInstances] = useState<any[]>([]);

    useEffect(() => {
        DataService.getAll('process_instances').then(data => {
            // Sort by latest startedAt
            const sorted = data.sort((a: any, b: any) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
            setInstances(sorted.slice(0, 5));
        });
    }, []);

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Running': return 'text-secondary';
            case 'Waiting': return 'text-warning';
            case 'Completed': return 'text-success';
            case 'Failed': return 'text-critical';
            default: return 'text-muted';
        }
    };

    return (
        <div className="bg-surface border border-border rounded-xl p-5 h-full">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Live Process Activity</h3>
                <a href="/instances" className="text-xs font-medium text-primary hover:underline">View all instances &rarr;</a>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="text-muted border-b border-border">
                            <th className="pb-3 font-medium">Time</th>
                            <th className="pb-3 font-medium">Process & Instance</th>
                            <th className="pb-3 font-medium">Status</th>
                            <th className="pb-3 font-medium text-right">Current Step</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {instances.map(inst => {
                            const date = new Date(inst.startedAt);
                            const timeString = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
                            
                            return (
                                <tr key={inst.id} onClick={() => window.location.href = '/instances'} className="group hover:bg-surface-elevated transition-colors cursor-pointer">
                                    <td className="py-3 text-muted text-xs whitespace-nowrap">{timeString}</td>
                                    <td className="py-3">
                                        <div className="font-medium text-foreground">{inst.processName}</div>
                                        <div className="text-xs text-muted">#{inst.id} &middot; {inst.department}</div>
                                    </td>
                                    <td className="py-3">
                                        <div className="flex items-center gap-1.5">
                                            <div className={`w-1.5 h-1.5 rounded-full bg-current ${getStatusColor(inst.status)}`}></div>
                                            <span className={`${getStatusColor(inst.status)} text-xs font-medium`}>{inst.status}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 text-right text-xs text-muted">{inst.currentStep}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
