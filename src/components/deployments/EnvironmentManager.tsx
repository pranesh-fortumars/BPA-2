import React, { useState, useEffect } from 'react';
import { DataService } from '../../lib/db';
import { GlassCard } from '../GlassCard';
import { Database, CheckCircle2, History, GitCommit, GitMerge } from 'lucide-react';

export const EnvironmentManager = () => {
    const [envs, setEnvs] = useState<any[]>([]);

    useEffect(() => {
        const initData = async () => {
            let data = await DataService.getAll<any>('environments');
            if (data.length === 0) {
                const initial = [
                    { id: 'env-prod', name: 'Production Cluster', region: 'us-east-1', status: 'Healthy', version: 'v2.4.1', nodes: 8 },
                    { id: 'env-stg', name: 'Staging Environment', region: 'us-east-1', status: 'Healthy', version: 'v2.5.0-rc', nodes: 3 },
                    { id: 'env-dev', name: 'Development Sandbox', region: 'eu-west-1', status: 'Warning', version: 'v2.5.0-dev', nodes: 2 }
                ];
                for (const e of initial) await DataService.save('environments', e);
                data = initial;
            }
            setEnvs(data);
        };
        initData();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Environments & Deployments</h1>
                    <p className="text-sm text-muted mt-1">Manage staging, production clusters, and deployment history</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {envs.map(env => (
                    <GlassCard key={env.id} className="p-6 bg-surface border border-border shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${env.status === 'Healthy' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                                    <Database size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground">{env.name}</h3>
                                    <p className="text-xs text-muted">{env.region}</p>
                                </div>
                            </div>
                            <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${env.status === 'Healthy' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                                {env.status}
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-6 p-3 rounded-lg border border-border bg-surface-elevated">
                            <div className="text-muted font-medium">Nodes: <span className="text-foreground font-bold">{env.nodes}</span></div>
                            <div className="text-muted font-medium">Version: <span className="text-foreground font-bold">{env.version}</span></div>
                        </div>
                    </GlassCard>
                ))}
            </div>

            <GlassCard className="p-6 bg-surface border border-border shadow-sm">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
                    <History size={16} className="text-primary" /> Recent Deployments
                </h3>
                <div className="space-y-4">
                    {[
                        { id: 1, action: 'Promoted to Production', target: 'Production Cluster', version: 'v2.4.1', author: 'System', time: '2 hours ago', icon: <GitMerge size={14}/>, color: 'text-success' },
                        { id: 2, action: 'Deployed to Staging', target: 'Staging Environment', version: 'v2.5.0-rc', author: 'Jane Doe', time: '5 hours ago', icon: <GitCommit size={14}/>, color: 'text-primary' },
                        { id: 3, action: 'Rollback triggered', target: 'Production Cluster', version: 'v2.4.0', author: 'Admin', time: '1 day ago', icon: <History size={14}/>, color: 'text-warning' }
                    ].map(dep => (
                        <div key={dep.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface-elevated">
                            <div className={`w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center ${dep.color}`}>
                                {dep.icon}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-foreground">{dep.action}</p>
                                <p className="text-xs text-muted">{dep.target} &bull; {dep.author}</p>
                            </div>
                            <div className="text-right">
                                <span className="px-2 py-1 bg-surface border border-border rounded text-[10px] font-mono text-muted block mb-1">
                                    {dep.version}
                                </span>
                                <span className="text-xs text-muted font-medium">{dep.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </div>
    );
};
