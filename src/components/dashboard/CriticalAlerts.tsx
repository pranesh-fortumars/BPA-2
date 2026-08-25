import React, { useEffect, useState } from 'react';
import { AlertCircle, FileWarning, Clock, ServerCrash } from 'lucide-react';
import { DataService } from '../../lib/db';

export const CriticalAlerts = () => {
    const [alerts, setAlerts] = useState<any[]>([]);

    useEffect(() => {
        DataService.getAll('alerts').then(data => {
            setAlerts(data);
        });
    }, []);

    const getAlertIcon = (type: string, severity: string) => {
        const colorClass = severity === 'high' || severity === 'critical' ? 'text-critical' : 'text-warning';
        
        switch (type) {
            case 'SLA Breach': return <Clock size={16} className={colorClass} />;
            case 'Automation Failed': return <ServerCrash size={16} className={colorClass} />;
            case 'High Failure Rate': return <FileWarning size={16} className={colorClass} />;
            default: return <AlertCircle size={16} className={colorClass} />;
        }
    };

    const getBgColor = (severity: string) => {
        return severity === 'high' || severity === 'critical' ? 'bg-critical/10 border-critical/20' : 'bg-warning/10 border-warning/20';
    };

    return (
        <div className="bg-surface border border-border rounded-xl p-5 h-full">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Critical Alerts</h3>
                    <span className="w-5 h-5 rounded bg-critical text-white flex items-center justify-center text-[10px] font-bold">
                        {alerts.length}
                    </span>
                </div>
                <a href="/alerts" className="text-xs font-medium text-primary hover:underline">View all &rarr;</a>
            </div>
            
            <div className="space-y-3">
                {alerts.map(alert => (
                    <div key={alert.id} className={`p-3 rounded-lg border ${getBgColor(alert.severity)} flex gap-3 cursor-pointer hover:brightness-110 transition-all`}>
                        <div className="mt-0.5">{getAlertIcon(alert.type, alert.severity)}</div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <h4 className="text-xs font-bold text-foreground">{alert.type}</h4>
                                <span className="text-[10px] text-muted">{alert.time}</span>
                            </div>
                            <p className="text-[11px] font-medium text-foreground mt-0.5">{alert.title}</p>
                            <p className="text-[10px] text-muted leading-tight mt-0.5">{alert.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
