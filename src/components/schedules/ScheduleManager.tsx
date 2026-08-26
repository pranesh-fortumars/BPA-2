import React, { useState, useEffect } from 'react';
import { DataService } from '../../lib/db';
import { GlassCard } from '../GlassCard';
import { Calendar, Clock, PlayCircle, Plus, CheckCircle2, AlertTriangle, Power } from 'lucide-react';

export const ScheduleManager = () => {
    const [schedules, setSchedules] = useState<any[]>([]);

    useEffect(() => {
        const initData = async () => {
            let stored = await DataService.getAll<any>('scheduled_jobs');
            if (stored.length === 0) {
                const initial = [
                    { id: 'sch-001', name: 'Nightly ERP Sync', type: 'Data Sync', cron: '0 2 * * *', status: 'Active', nextRun: 'in 4 hours', lastStatus: 'Success' },
                    { id: 'sch-002', name: 'Weekly Backup Archive', type: 'System', cron: '0 0 * * 0', status: 'Active', nextRun: 'in 2 days', lastStatus: 'Success' },
                    { id: 'sch-003', name: 'Invoice Processing Batch', type: 'Finance', cron: '*/30 * * * *', status: 'Paused', nextRun: 'Paused', lastStatus: 'Failed' },
                    { id: 'sch-004', name: 'HR Roster Update', type: 'HR', cron: '0 8 * * 1-5', status: 'Active', nextRun: 'Tomorrow 08:00', lastStatus: 'Success' }
                ];
                for (const s of initial) await DataService.save('scheduled_jobs', s);
                stored = initial;
            }
            setSchedules(stored);
        };
        initData();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Schedules</h1>
                    <p className="text-sm text-muted mt-1">Manage cron jobs, automated triggers, and scheduled tasks</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                        <Plus size={16} />
                        <span>New Schedule</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="p-6 bg-surface border border-border shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted uppercase tracking-widest">Active Jobs</p>
                        <h3 className="text-2xl font-black text-foreground">{schedules.filter(s => s.status === 'Active').length}</h3>
                    </div>
                </GlassCard>
                <GlassCard className="p-6 bg-surface border border-border shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-info/10 text-info flex items-center justify-center">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted uppercase tracking-widest">Next 24H Runs</p>
                        <h3 className="text-2xl font-black text-foreground">1,240</h3>
                    </div>
                </GlassCard>
                <GlassCard className="p-6 bg-surface border border-border shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-warning/10 text-warning flex items-center justify-center">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted uppercase tracking-widest">Failed Tasks</p>
                        <h3 className="text-2xl font-black text-foreground">1</h3>
                    </div>
                </GlassCard>
            </div>

            <GlassCard className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="text-muted border-b border-border bg-surface-elevated/50">
                                <th className="p-4 font-bold text-xs uppercase tracking-widest">Job Name</th>
                                <th className="p-4 font-bold text-xs uppercase tracking-widest">Cron / Frequency</th>
                                <th className="p-4 font-bold text-xs uppercase tracking-widest">Next Run</th>
                                <th className="p-4 font-bold text-xs uppercase tracking-widest">Last Status</th>
                                <th className="p-4 font-bold text-xs uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {schedules.map(job => (
                                <tr key={job.id} className="hover:bg-surface-elevated transition-colors">
                                    <td className="p-4">
                                        <div className="font-bold text-foreground flex items-center gap-2">
                                            {job.status === 'Active' ? <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div> : <div className="w-2 h-2 rounded-full bg-muted"></div>}
                                            {job.name}
                                        </div>
                                        <div className="text-[10px] text-muted uppercase tracking-widest mt-1">{job.type}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-surface-elevated border border-border rounded text-[10px] font-mono text-muted">
                                            {job.cron}
                                        </span>
                                    </td>
                                    <td className="p-4 text-muted font-medium">{job.nextRun}</td>
                                    <td className="p-4">
                                        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${job.lastStatus === 'Success' ? 'bg-success/10 text-success' : 'bg-critical/10 text-critical'}`}>
                                            {job.lastStatus === 'Success' ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                                            {job.lastStatus}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-1.5 text-muted hover:text-success hover:bg-surface-elevated rounded transition-colors" title="Run Now">
                                                <PlayCircle size={16} />
                                            </button>
                                            <button className={`p-1.5 hover:bg-surface-elevated rounded transition-colors ${job.status === 'Active' ? 'text-warning hover:text-warning' : 'text-success hover:text-success'}`} title={job.status === 'Active' ? 'Pause' : 'Resume'}>
                                                <Power size={16} />
                                            </button>
                                        </div>
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
