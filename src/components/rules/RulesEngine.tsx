import React, { useState, useEffect } from 'react';
import { DataService } from '../../lib/db';
import { GlassCard } from '../GlassCard';
import { Scale, Network, GitBranch, Plus, Play, CheckCircle2, AlertCircle } from 'lucide-react';

export const RulesEngine = () => {
    const [rules, setRules] = useState<any[]>([]);

    useEffect(() => {
        const initData = async () => {
            let storedRules = await DataService.getAll<any>('business_rules');
            
            if (storedRules.length === 0) {
                const initial = [
                    { id: 'rule-001', name: 'Invoice Routing Matrix', category: 'Finance', status: 'Active', executions: 45210, lastUpdated: '2 days ago', version: 'v2.4' },
                    { id: 'rule-002', name: 'High-Risk Approval Chain', category: 'Compliance', status: 'Active', executions: 1205, lastUpdated: '1 week ago', version: 'v1.1' },
                    { id: 'rule-003', name: 'Support Ticket Triaging', category: 'CRM', status: 'Draft', executions: 0, lastUpdated: '4 hours ago', version: 'v3.0-draft' },
                    { id: 'rule-004', name: 'Vendor Onboarding Checks', category: 'Operations', status: 'Active', executions: 890, lastUpdated: '3 weeks ago', version: 'v1.0' }
                ];
                for (const r of initial) await DataService.save('business_rules', r);
                storedRules = initial;
            }
            setRules(storedRules);
        };
        initData();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Rules & Decisions</h1>
                    <p className="text-sm text-muted mt-1">Configure business logic, decision matrices, and routing rules</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                        <Plus size={16} />
                        <span>New Rule</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="p-6 bg-surface border border-border shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Scale size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted uppercase tracking-widest">Active Rules</p>
                        <h3 className="text-2xl font-black text-foreground">{rules.filter(r => r.status === 'Active').length}</h3>
                    </div>
                </GlassCard>
                <GlassCard className="p-6 bg-surface border border-border shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-success/10 text-success flex items-center justify-center">
                        <Play size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted uppercase tracking-widest">Daily Executions</p>
                        <h3 className="text-2xl font-black text-foreground">18.4K</h3>
                    </div>
                </GlassCard>
                <GlassCard className="p-6 bg-surface border border-border shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-info/10 text-info flex items-center justify-center">
                        <Network size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted uppercase tracking-widest">Decision Nodes</p>
                        <h3 className="text-2xl font-black text-foreground">1,402</h3>
                    </div>
                </GlassCard>
            </div>

            <GlassCard className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="p-5 border-b border-border flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                        <GitBranch size={16} className="text-primary" /> Decision Matrices
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="text-muted border-b border-border bg-surface-elevated/50">
                                <th className="p-4 font-bold text-xs uppercase tracking-widest">Rule Name</th>
                                <th className="p-4 font-bold text-xs uppercase tracking-widest">Category</th>
                                <th className="p-4 font-bold text-xs uppercase tracking-widest">Status</th>
                                <th className="p-4 font-bold text-xs uppercase tracking-widest">Executions</th>
                                <th className="p-4 font-bold text-xs uppercase tracking-widest">Version</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {rules.map(rule => (
                                <tr key={rule.id} className="hover:bg-surface-elevated transition-colors">
                                    <td className="p-4">
                                        <div className="font-bold text-foreground">{rule.name}</div>
                                        <div className="text-[10px] text-muted">Updated {rule.lastUpdated}</div>
                                    </td>
                                    <td className="p-4 text-muted font-medium">{rule.category}</td>
                                    <td className="p-4">
                                        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${rule.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                                            {rule.status === 'Active' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                                            {rule.status}
                                        </div>
                                    </td>
                                    <td className="p-4 text-muted font-medium">{rule.executions.toLocaleString()}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-surface-elevated border border-border rounded text-[10px] font-mono text-muted">
                                            {rule.version}
                                        </span>
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
