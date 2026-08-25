import React, { useEffect, useState } from 'react';
import { DataService } from '../../lib/db';
import { PlaySquare, PauseCircle, XCircle, Search, Filter, RotateCcw, AlertCircle } from 'lucide-react';

export const ProcessInstancesTable = () => {
    const [instances, setInstances] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        DataService.getAll('process_instances').then(data => {
            // Sort by most recent
            const sorted = data.sort((a: any, b: any) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
            setInstances(sorted);
            setLoading(false);
        });
    }, []);

    const filteredInstances = instances.filter(i => filter === 'All' || i.status === filter);

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Running': return 'text-secondary bg-secondary/10 border-secondary/20';
            case 'Waiting': return 'text-warning bg-warning/10 border-warning/20';
            case 'Completed': return 'text-success bg-success/10 border-success/20';
            case 'Failed': return 'text-critical bg-critical/10 border-critical/20';
            default: return 'text-muted bg-surface border-border';
        }
    };

    if (loading) {
        return <div className="h-64 flex items-center justify-center text-muted animate-pulse">Loading instances...</div>;
    }

    return (
        <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden font-sans flex flex-col h-[calc(100vh-220px)]">
            <div className="p-6 border-b border-border flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                        <input 
                           type="text" 
                           placeholder="Search instances ID..." 
                           className="pl-9 pr-4 py-2 bg-surface-elevated border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50 w-64 transition-all"
                        />
                    </div>
                    <button className="px-4 py-2 bg-surface-elevated border border-border text-foreground text-sm font-medium rounded-lg hover:bg-border transition-colors flex items-center gap-2">
                        <Filter size={16} /> Filters
                    </button>
                </div>
                
                <div className="flex bg-surface-elevated p-1 rounded-xl border border-border">
                    {['All', 'Running', 'Waiting', 'Failed', 'Completed'].map(f => (
                        <button 
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${filter === f ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted hover:text-foreground'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <table className="w-full text-left">
                    <thead className="sticky top-0 bg-surface-elevated/90 backdrop-blur border-b border-border z-10 text-[10px] font-black text-muted uppercase tracking-widest">
                        <tr>
                            <th className="px-6 py-4">Instance ID</th>
                            <th className="px-6 py-4">Process Name</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Started At</th>
                            <th className="px-6 py-4">Current Step</th>
                            <th className="px-6 py-4">SLA Risk</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredInstances.map((inst) => (
                            <tr key={inst.id} className="hover:bg-surface-elevated transition-colors group cursor-pointer">
                                <td className="px-6 py-4 font-mono text-xs font-black text-foreground">{inst.id}</td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-bold text-foreground">{inst.processName}</div>
                                    <div className="text-xs text-muted font-medium">{inst.department}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-md border ${getStatusColor(inst.status)}`}>
                                        {inst.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-xs text-muted font-medium">
                                    {new Date(inst.startedAt).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-sm text-foreground font-medium">
                                    {inst.currentStep}
                                </td>
                                <td className="px-6 py-4">
                                    {inst.slaBreached ? (
                                        <div className="flex items-center gap-1.5 text-critical text-xs font-bold bg-critical/10 px-2 py-1 rounded w-max">
                                            <AlertCircle size={14} /> Breached
                                        </div>
                                    ) : (
                                        <div className="text-success text-xs font-bold">—</div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 text-muted hover:text-primary transition-colors bg-surface border border-border rounded-md shadow-sm" title="View Details">
                                            <PlaySquare size={14} />
                                        </button>
                                        <button className="p-1.5 text-muted hover:text-warning transition-colors bg-surface border border-border rounded-md shadow-sm" title="Suspend">
                                            <PauseCircle size={14} />
                                        </button>
                                        <button className="p-1.5 text-muted hover:text-secondary transition-colors bg-surface border border-border rounded-md shadow-sm" title="Retry">
                                            <RotateCcw size={14} />
                                        </button>
                                        <button className="p-1.5 text-muted hover:text-critical transition-colors bg-surface border border-border rounded-md shadow-sm" title="Terminate">
                                            <XCircle size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredInstances.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-muted">
                                    No process instances found matching the filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
