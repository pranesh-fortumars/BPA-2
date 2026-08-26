import React, { useState, useEffect } from 'react';
import { DataService } from '../../lib/db';
import { GlassCard } from '../GlassCard';
import { TerminalSquare, Webhook, Key, Activity, CheckCircle2, AlertTriangle, ShieldCheck, Copy, Plus } from 'lucide-react';

export const ApiManager = () => {
    const [webhooks, setWebhooks] = useState<any[]>([]);
    const [apiKeys, setApiKeys] = useState<any[]>([]);

    useEffect(() => {
        const initData = async () => {
            let storedWebhooks = await DataService.getAll<any>('webhooks');
            let storedKeys = await DataService.getAll<any>('api_keys');
            
            if (storedWebhooks.length === 0) {
                const initialWebhooks = [
                    { id: 'wh-001', name: 'ERP Sync Target', endpoint: 'https://erp.internal/api/v2/webhook', status: 'Healthy', lastTriggered: '10 mins ago', events: 4280 },
                    { id: 'wh-002', name: 'HRIS Onboarding', endpoint: 'https://hr.internal/api/webhook/new-hire', status: 'Warning', lastTriggered: '1 hour ago', events: 145 },
                    { id: 'wh-003', name: 'Slack Notifications', endpoint: 'https://hooks.slack.com/services/T0000/B0000/XXX', status: 'Healthy', lastTriggered: '2 mins ago', events: 12500 }
                ];
                for (const w of initialWebhooks) await DataService.save('webhooks', w);
                storedWebhooks = initialWebhooks;
            }
            if (storedKeys.length === 0) {
                const initialKeys = [
                    { id: 'key-001', name: 'Frontend Client App', keyPreview: 'bpa_live_*******************', role: 'Read/Write', lastUsed: 'Just now' },
                    { id: 'key-002', name: 'Reporting Service', keyPreview: 'bpa_test_*******************', role: 'Read Only', lastUsed: '2 days ago' }
                ];
                for (const k of initialKeys) await DataService.save('api_keys', k);
                storedKeys = initialKeys;
            }
            
            setWebhooks(storedWebhooks);
            setApiKeys(storedKeys);
        };
        initData();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">API & Webhooks</h1>
                    <p className="text-sm text-muted mt-1">Manage external connections and data payloads</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                        <Plus size={16} />
                        <span>Create Webhook</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="p-6 bg-surface border border-border shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-success/10 text-success flex items-center justify-center">
                        <Activity size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted uppercase tracking-widest">Total Requests</p>
                        <h3 className="text-2xl font-black text-foreground">1.2M</h3>
                    </div>
                </GlassCard>
                <GlassCard className="p-6 bg-surface border border-border shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Webhook size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted uppercase tracking-widest">Active Webhooks</p>
                        <h3 className="text-2xl font-black text-foreground">{webhooks.length}</h3>
                    </div>
                </GlassCard>
                <GlassCard className="p-6 bg-surface border border-border shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-warning/10 text-warning flex items-center justify-center">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted uppercase tracking-widest">API Keys</p>
                        <h3 className="text-2xl font-black text-foreground">{apiKeys.length}</h3>
                    </div>
                </GlassCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard className="p-6 bg-surface border border-border shadow-sm">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Webhook size={16} className="text-primary" /> Active Webhooks
                    </h3>
                    <div className="space-y-4">
                        {webhooks.map(wh => (
                            <div key={wh.id} className="p-4 rounded-xl border border-border bg-surface-elevated hover:border-primary/50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="font-bold text-foreground">{wh.name}</div>
                                    <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${wh.status === 'Healthy' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                                        {wh.status}
                                    </div>
                                </div>
                                <div className="text-xs font-mono text-muted truncate mb-3 bg-background p-2 rounded border border-border">
                                    {wh.endpoint}
                                </div>
                                <div className="flex justify-between text-xs text-muted font-medium">
                                    <span>{wh.events.toLocaleString()} events</span>
                                    <span>Last: {wh.lastTriggered}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard className="p-6 bg-surface border border-border shadow-sm">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Key size={16} className="text-primary" /> API Keys
                    </h3>
                    <div className="space-y-4">
                        {apiKeys.map(key => (
                            <div key={key.id} className="p-4 rounded-xl border border-border bg-surface-elevated hover:border-primary/50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="font-bold text-foreground">{key.name}</div>
                                    <div className="text-[10px] text-muted uppercase tracking-widest font-bold">
                                        {key.role}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="text-xs font-mono text-foreground flex-1 bg-background p-2 rounded border border-border">
                                        {key.keyPreview}
                                    </div>
                                    <button className="p-2 rounded bg-surface border border-border text-muted hover:text-primary transition-colors">
                                        <Copy size={14} />
                                    </button>
                                </div>
                                <div className="text-xs text-muted font-medium">
                                    Last used: {key.lastUsed}
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};
