import React, { useState, useEffect } from 'react';
import { Bell, ShieldAlert, CheckCircle, Clock, X } from 'lucide-react';
import { DataService } from '../../lib/db';
import { currentUser } from '../../store/authStore';

export const AlertCenter = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Mocking initial notifications. In a real scenario, this would query DataService.getAll('notifications')
    const initialAlerts = [
      { id: 1, title: 'Project Risk Detected', msg: 'API Integration is 3 days behind schedule.', type: 'critical', time: '10m ago' },
      { id: 2, title: 'Invoice Approved', msg: 'Finance manager approved INV-001.', type: 'success', time: '1h ago' },
      { id: 3, title: 'New Lead Assigned', msg: 'Acme Corp was assigned to you.', type: 'info', time: '2h ago' }
    ];
    setAlerts(initialAlerts);

    // Listen to our custom Audit events
    const handleAudit = (e: any) => {
       const log = e.detail;
       const user = currentUser.get();
       
       // Only show relevant alerts (for now, show all DELETEs as warnings)
       if (log.action === 'DELETE') {
          const newAlert = {
            id: Date.now(),
            title: 'Record Deleted',
            msg: `${log.userName} deleted a record from ${log.resource}.`,
            type: 'warning',
            time: 'Just now'
          };
          setAlerts(prev => [newAlert, ...prev]);
       }
    };

    window.addEventListener('bpa_audit_alert', handleAudit);
    return () => window.removeEventListener('bpa_audit_alert', handleAudit);
  }, []);

  const clearAlerts = () => setAlerts([]);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors relative"
      >
        <Bell size={20} />
        {alerts.length > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
        )}
        {alerts.length > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-14 right-0 w-80 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-50">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
             <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Notifications</h3>
             <button onClick={clearAlerts} className="text-[10px] font-black uppercase tracking-widest text-violet-600 hover:text-violet-700">Clear All</button>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
             {alerts.length === 0 ? (
               <div className="p-6 text-center text-sm font-medium text-slate-500">
                  No new notifications.
               </div>
             ) : (
               alerts.map(alert => (
                 <div key={alert.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex gap-3 items-start">
                    <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                       alert.type === 'critical' ? 'bg-rose-50 text-rose-600' :
                       alert.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                       alert.type === 'warning' ? 'bg-amber-50 text-amber-600' :
                       'bg-blue-50 text-blue-600'
                    }`}>
                       {alert.type === 'critical' || alert.type === 'warning' ? <ShieldAlert size={14} /> :
                        alert.type === 'success' ? <CheckCircle size={14} /> : <Clock size={14} />}
                    </div>
                    <div>
                       <h4 className="text-xs font-bold text-slate-900">{alert.title}</h4>
                       <p className="text-[11px] text-slate-600 font-medium leading-relaxed mt-0.5">{alert.msg}</p>
                       <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-2">{alert.time}</p>
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
