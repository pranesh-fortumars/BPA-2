import React, { useState } from 'react';
import { Server, Cpu, Database, Network, Power, Settings2, RefreshCw, AlertTriangle, ArrowRight } from 'lucide-react';
import { GlassCard } from '../GlassCard';

export const RPADashboard = () => {
    const bots = [
        { id: 'BOT-942', type: 'Unattended', server: 'Node-East-01', status: 'Executing', job: 'ERP Sync (Job-104)', cpu: 84, mem: 62 },
        { id: 'BOT-104', type: 'Unattended', server: 'Node-East-01', status: 'Idle', job: 'None', cpu: 2, mem: 14 },
        { id: 'BOT-881', type: 'Attended', server: 'Workstation-HR', status: 'Paused', job: 'Onboarding Docs', cpu: 15, mem: 42 },
        { id: 'BOT-522', type: 'Unattended', server: 'Node-West-04', status: 'Error', job: 'Invoice Scrape', cpu: 99, mem: 98 },
    ];

    const getStatusStyle = (status: string) => {
        switch(status) {
            case 'Executing': return 'text-success bg-success/10 border-success/20';
            case 'Idle': return 'text-muted bg-surface-elevated border-border';
            case 'Paused': return 'text-warning bg-warning/10 border-warning/20';
            case 'Error': return 'text-critical bg-critical/10 border-critical/20';
            default: return 'text-muted bg-surface border-border';
        }
    };

    return (
        <div className="space-y-6 font-sans">
            {/* Cluster Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="p-6 bg-surface border-border hover:border-primary/30 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                            <Server size={24} />
                        </div>
                        <span className="px-2.5 py-1 bg-success/10 text-success text-[10px] font-black uppercase tracking-widest rounded border border-success/20">Healthy</span>
                    </div>
                    <h3 className="text-sm font-black text-muted uppercase tracking-widest mb-1">Server Clusters</h3>
                    <div className="text-3xl font-black text-foreground">12/12 <span className="text-lg text-muted">Nodes Online</span></div>
                </GlassCard>
                <GlassCard className="p-6 bg-surface border-border hover:border-primary/30 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center text-success border border-success/20">
                            <Cpu size={24} />
                        </div>
                        <span className="px-2.5 py-1 bg-warning/10 text-warning text-[10px] font-black uppercase tracking-widest rounded border border-warning/20">Peak Load</span>
                    </div>
                    <h3 className="text-sm font-black text-muted uppercase tracking-widest mb-1">Total Active Bots</h3>
                    <div className="text-3xl font-black text-foreground">48/120 <span className="text-lg text-muted">Licenses</span></div>
                </GlassCard>
                <GlassCard className="p-6 bg-surface border-border hover:border-primary/30 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-critical/10 rounded-xl flex items-center justify-center text-critical border border-critical/20">
                            <AlertTriangle size={24} />
                        </div>
                        <span className="px-2.5 py-1 bg-critical/10 text-critical text-[10px] font-black uppercase tracking-widest rounded border border-critical/20">Requires Action</span>
                    </div>
                    <h3 className="text-sm font-black text-muted uppercase tracking-widest mb-1">Failed Jobs (24h)</h3>
                    <div className="text-3xl font-black text-foreground">14 <span className="text-lg text-muted">Interventions</span></div>
                </GlassCard>
            </div>

            {/* Bot Grid */}
            <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <h2 className="text-xl font-black text-foreground">Bot Fleet Grid</h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-surface-elevated border border-border text-foreground text-sm font-bold rounded-lg hover:bg-border transition-colors">
                        <Settings2 size={16} /> Orchestrator Settings
                    </button>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {bots.map(bot => (
                        <div key={bot.id} className="p-5 border border-border rounded-xl bg-surface-elevated hover:border-primary/50 transition-colors group relative overflow-hidden">
                            {bot.status === 'Executing' && (
                                <div className="absolute top-0 left-0 right-0 h-1 bg-success animate-pulse shadow-[0_0_10px_#10b981]"></div>
                            )}
                            {bot.status === 'Error' && (
                                <div className="absolute top-0 left-0 right-0 h-1 bg-critical shadow-[0_0_10px_#ef4444]"></div>
                            )}
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-sm font-black text-foreground">{bot.id}</h3>
                                    <div className="text-[10px] font-bold text-muted uppercase tracking-widest">{bot.type}</div>
                                </div>
                                <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded border ${getStatusStyle(bot.status)}`}>
                                    {bot.status}
                                </span>
                            </div>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-2 text-xs text-muted font-medium">
                                    <Server size={14} className="text-primary"/> {bot.server}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted font-medium">
                                    <Network size={14} className="text-secondary"/> {bot.job}
                                </div>
                            </div>

                            <div className="space-y-2 pt-4 border-t border-border">
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted">
                                    <span>CPU</span>
                                    <span className={bot.cpu > 90 ? 'text-critical' : 'text-foreground'}>{bot.cpu}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-surface border border-border rounded-full overflow-hidden">
                                    <div className={`h-full ${bot.cpu > 90 ? 'bg-critical' : 'bg-primary'}`} style={{width: `${bot.cpu}%`}}></div>
                                </div>
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted mt-2">
                                    <span>RAM</span>
                                    <span className={bot.mem > 90 ? 'text-critical' : 'text-foreground'}>{bot.mem}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-surface border border-border rounded-full overflow-hidden">
                                    <div className={`h-full ${bot.mem > 90 ? 'bg-critical' : 'bg-secondary'}`} style={{width: `${bot.mem}%`}}></div>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-2">
                                <button className="flex-1 py-2 bg-surface border border-border text-foreground hover:bg-border rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5">
                                    <RefreshCw size={12} /> Restart
                                </button>
                                <button className="flex-1 py-2 bg-surface border border-border text-critical hover:bg-critical/10 hover:border-critical/30 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5">
                                    <Power size={12} /> Stop
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
