import React, { useState, useEffect } from 'react';
import { Bell, ShieldAlert, CheckCircle, Clock, X } from 'lucide-react';
import { DataService } from '../../lib/db';
import { currentUser } from '../../store/authStore';

export const AlertCenter = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadAlerts = async () => {
      let storedAlerts = await DataService.getAll<any>('notifications');
      if (storedAlerts.length === 0) {
        const initialAlerts = [
          { id: '1', title: 'Project Risk Detected', msg: 'API Integration is 3 days behind schedule.', type: 'critical', time: '10m ago' },
          { id: '2', title: 'Invoice Approved', msg: 'Finance manager approved INV-001.', type: 'success', time: '1h ago' },
          { id: '3', title: 'New Lead Assigned', msg: 'Acme Corp was assigned to you.', type: 'info', time: '2h ago' }
        ];
        for (const a of initialAlerts) await DataService.save('notifications', a);
        storedAlerts = initialAlerts;
      }
      setAlerts(storedAlerts);
    };
    loadAlerts();

    // Listen to our custom Audit events
    const handleAudit = async (e: any) => {
       const log = e.detail;
       
       if (log.action === 'DELETE') {
          const newAlert = {
            id: Date.now().toString(),
            title: 'Record Deleted',
            msg: `${log.userName} deleted a record from ${log.resource}.`,
            type: 'warning',
            time: 'Just now'
          };
          await DataService.save('notifications', newAlert);
          setAlerts(prev => [newAlert, ...prev]);
       }
    };

    window.addEventListener('bpa_audit_alert', handleAudit);
    return () => window.removeEventListener('bpa_audit_alert', handleAudit);
  }, []);

  const clearAlerts = async () => {
    for (const a of alerts) {
      await DataService.delete('notifications', a.id);
    }
    setAlerts([]);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-xl bg-surface-elevated border border-border flex items-center justify-center text-muted hover:text-foreground hover:bg-surface transition-colors relative"
      >
        <Bell size={20} />
        {alerts.length > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-critical rounded-full animate-ping"></span>
        )}
        {alerts.length > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-critical rounded-full"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-14 right-0 w-80 bg-surface rounded-2xl border border-border shadow-2xl overflow-hidden z-50">
          <div className="p-4 border-b border-border flex items-center justify-between bg-surface-elevated">
             <h3 className="text-xs font-black uppercase tracking-widest text-foreground">Notifications</h3>
             <button onClick={clearAlerts} className="text-[10px] font-black uppercase tracking-widest text-primary hover:brightness-110">Clear All</button>
          </div>
          
          <div className="max-h-96 overflow-y-auto custom-scrollbar">
             {alerts.length === 0 ? (
               <div className="p-6 text-center text-sm font-medium text-muted">
                  No new notifications.
               </div>
             ) : (
               alerts.map(alert => (
                 <div key={alert.id} className="p-4 border-b border-border hover:bg-surface-elevated transition-colors flex gap-3 items-start">
                    <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-full border flex items-center justify-center ${
                       alert.type === 'critical' ? 'bg-critical/10 text-critical border-critical/20' :
                       alert.type === 'success' ? 'bg-success/10 text-success border-success/20' :
                       alert.type === 'warning' ? 'bg-warning/10 text-warning border-warning/20' :
                       'bg-primary/10 text-primary border-primary/20'
                    }`}>
                       {alert.type === 'critical' || alert.type === 'warning' ? <ShieldAlert size={14} /> :
                        alert.type === 'success' ? <CheckCircle size={14} /> : <Clock size={14} />}
                    </div>
                    <div>
                       <h4 className="text-xs font-bold text-foreground">{alert.title}</h4>
                       <p className="text-[11px] text-muted font-medium leading-relaxed mt-0.5">{alert.msg}</p>
                       <p className="text-[9px] font-black uppercase tracking-widest text-muted mt-2">{alert.time}</p>
                    </div>
                 </div>
               ))
             )}
          </div>
        </div>
      )}
    </div>
  );
};
