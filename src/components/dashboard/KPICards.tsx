import React from 'react';
import { PlaySquare, CheckCircle2, AlertTriangle, XCircle, Zap, ShieldCheck } from 'lucide-react';

interface KPICardsProps {
    stats: any;
}

export const KPICards: React.FC<KPICardsProps> = ({ stats }) => {
    if (!stats) return <div className="h-24 bg-surface animate-pulse rounded-xl"></div>;

    const cards = [
        {
            title: 'Active Processes',
            value: stats.activeProcesses.toLocaleString(),
            trend: `↑ ${stats.activeTrend}%`,
            trendDesc: 'vs yesterday',
            trendColor: 'text-success',
            icon: <PlaySquare size={20} className="text-secondary" />,
            bg: 'bg-secondary/10'
        },
        {
            title: 'Completed (Today)',
            value: stats.completedToday.toLocaleString(),
            trend: `↑ ${stats.completedTrend}%`,
            trendDesc: 'vs yesterday',
            trendColor: 'text-success',
            icon: <CheckCircle2 size={20} className="text-success" />,
            bg: 'bg-success/10'
        },
        {
            title: 'At Risk',
            value: stats.atRisk.toLocaleString(),
            trend: `↑ ${stats.atRiskTrend}`,
            trendDesc: 'Require attention',
            trendColor: 'text-warning',
            icon: <AlertTriangle size={20} className="text-warning" />,
            bg: 'bg-warning/10'
        },
        {
            title: 'Failed',
            value: stats.failed.toLocaleString(),
            trend: `↓ ${Math.abs(stats.failedTrend)}`,
            trendDesc: 'vs yesterday',
            trendColor: 'text-critical',
            icon: <XCircle size={20} className="text-critical" />,
            bg: 'bg-critical/10'
        },
        {
            title: 'Automation Value (MTD)',
            value: `₹${stats.automationValue}L`,
            trend: `↑ ${stats.valueTrend}%`,
            trendDesc: 'vs last month',
            trendColor: 'text-success',
            icon: <Zap size={20} className="text-primary" />,
            bg: 'bg-primary/10'
        },
        {
            title: 'SLA Compliance',
            value: `${stats.slaCompliance}%`,
            trend: `↑ ${stats.slaTrend}%`,
            trendDesc: 'vs last month',
            trendColor: 'text-success',
            icon: <ShieldCheck size={20} className="text-success" />,
            bg: 'bg-success/10'
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cards.map((card, i) => (
                <div key={i} className="bg-surface border border-border rounded-xl p-4 hover:border-primary/30 transition-colors shadow-sm cursor-pointer group">
                    <div className="flex items-center gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                            {card.icon}
                        </div>
                        <h3 className="text-xs font-medium text-muted line-clamp-2 leading-tight">{card.title}</h3>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">{card.value}</div>
                    <div className="flex items-center gap-1.5 text-[10px]">
                        <span className={`${card.trendColor} font-bold`}>{card.trend}</span>
                        <span className="text-muted">{card.trendDesc}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
