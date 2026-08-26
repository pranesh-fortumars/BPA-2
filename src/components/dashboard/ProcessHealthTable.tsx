import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { DataService } from '../../lib/db';

export const ProcessHealthTable = () => {
    const [processes, setProcesses] = useState<any[]>([]);

    useEffect(() => {
        DataService.getAll('processes').then(data => {
            setProcesses(data.slice(0, 5)); // show top 5
        });
    }, []);

    const getHealthColor = (health: string) => {
        if (health === 'Healthy') return 'text-success bg-success';
        if (health === 'Warning') return 'text-warning bg-warning';
        return 'text-critical bg-critical';
    };

    const getTrendPath = (health: string) => {
        // Simple SVG path generation based on health
        if (health === 'Healthy') return "M0 10 L10 5 L20 8 L30 2 L40 6 L50 0";
        if (health === 'Warning') return "M0 10 L10 8 L20 12 L30 6 L40 8 L50 6";
        return "M0 2 L10 8 L20 6 L30 12 L40 10 L50 14";
    };

    return (
        <div className="bg-surface border border-border rounded-xl p-5 h-full">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Process Health Overview</h3>
                    <Info size={14} className="text-muted cursor-help" />
                </div>
                <a href="/processes" className="text-xs font-medium text-primary hover:underline">View all processes &rarr;</a>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="text-muted border-b border-border">
                            <th className="pb-3 font-medium">Process</th>
                            <th className="pb-3 font-medium">Instances</th>
                            <th className="pb-3 font-medium">SLA</th>
                            <th className="pb-3 font-medium">Health</th>
                            <th className="pb-3 font-medium text-right">Trend</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {processes.map(proc => (
                            <tr key={proc.id} onClick={() => window.location.href = '/analytics'} className="group hover:bg-surface-elevated transition-colors cursor-pointer">
                                <td className="py-3">
                                    <div className="font-medium text-foreground">{proc.name}</div>
                                    <div className="text-xs text-muted">{proc.department}</div>
                                </td>
                                <td className="py-3 text-muted text-sm">{proc.instances.toLocaleString()}</td>
                                <td className="py-3 text-muted text-sm">{proc.sla}%</td>
                                <td className="py-3">
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-1.5 h-1.5 rounded-full ${getHealthColor(proc.health).split(' ')[1]}`}></div>
                                        <span className={`${getHealthColor(proc.health).split(' ')[0]} text-xs font-medium`}>{proc.health}</span>
                                    </div>
                                </td>
                                <td className="py-3 text-right">
                                    <div className="inline-block w-12 h-4">
                                        <svg viewBox="0 0 50 15" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                            <path 
                                                d={getTrendPath(proc.health)} 
                                                fill="none" 
                                                stroke="currentColor" 
                                                strokeWidth="1.5"
                                                className={getHealthColor(proc.health).split(' ')[0]}
                                                vectorEffect="non-scaling-stroke"
                                            />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
