import React, { useState, useEffect } from 'react';
import { Check, X, Forward, FileText, ShoppingCart, Calendar, Inbox } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { AuditService } from '../../lib/audit';
import { currentUser } from '../../store/authStore';

export const ApprovalInbox = () => {
  const [approvals, setApprovals] = useState<any[]>([]);

  useEffect(() => {
    // Mock approvals
    setApprovals([
      { id: 'APP-101', type: 'Purchase Request', requester: 'John Doe', dept: 'Engineering', amount: '₹ 1,50,000', desc: 'AWS Q3 Server Costs', date: 'Oct 14', status: 'Pending', icon: ShoppingCart, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
      { id: 'APP-102', type: 'Leave Request', requester: 'Sarah Smith', dept: 'Design', amount: '3 Days', desc: 'Annual Vacation', date: 'Oct 15', status: 'Pending', icon: Calendar, color: 'text-success', bg: 'bg-success/10', border: 'border-success/20' },
      { id: 'APP-103', type: 'Proposal Discount', requester: 'Tony Stark', dept: 'Sales', amount: '15% Off', desc: 'Acme Corp Renewal', date: 'Oct 16', status: 'Pending', icon: FileText, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
    ]);
  }, []);

  const handleAction = async (id: string, action: 'Approve' | 'Reject' | 'Delegate') => {
    const user = currentUser.get();
    if (action === 'Approve' || action === 'Reject') {
       await AuditService.log(action === 'Approve' ? 'APPROVE' : 'REJECT', 'Approvals', `${user?.name} ${action.toLowerCase()}d request ${id}`, id);
       setApprovals(prev => prev.filter(a => a.id !== id));
    } else {
       alert(`Delegation UI opened for ${id}`);
    }
  };

  if (approvals.length === 0) {
     return (
        <div className="bg-surface rounded-3xl border border-border p-12 shadow-sm flex flex-col items-center justify-center text-center">
           <div className="w-20 h-20 bg-surface-elevated rounded-full flex items-center justify-center text-muted mb-6 border border-border">
              <Inbox size={40} />
           </div>
           <h2 className="text-xl font-black uppercase tracking-tight text-foreground mb-2">All Caught Up!</h2>
           <p className="text-sm font-medium text-muted">You have no pending approvals in your inbox.</p>
        </div>
     );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">Approval Inbox</h2>
            <p className="text-xs font-bold text-muted mt-1">You have {approvals.length} requests pending review.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
         {approvals.map(req => {
            const Icon = req.icon;
            return (
               <GlassCard key={req.id} className="p-6 bg-surface border border-border flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md hover:border-primary/30 transition-all">
                  <div className="flex items-start gap-4">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${req.bg} ${req.color} ${req.border}`}>
                        <Icon size={24} />
                     </div>
                     <div>
                        <div className="flex items-center gap-2 mb-1">
                           <span className="text-[10px] font-black uppercase tracking-widest text-muted bg-surface-elevated border border-border px-2 py-0.5 rounded-md">{req.id}</span>
                           <span className="text-[10px] font-black uppercase tracking-widest text-muted">{req.date}</span>
                        </div>
                        <h3 className="text-base font-black text-foreground mb-1">{req.type}</h3>
                        <p className="text-xs font-medium text-muted mb-2">{req.desc}</p>
                        <div className="flex items-center gap-4 text-xs font-bold">
                           <span className="text-foreground">{req.requester}</span>
                           <span className="text-muted">•</span>
                           <span className="text-muted">{req.dept}</span>
                        </div>
                     </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end gap-4 shrink-0 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                     <div className="text-right">
                        <span className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1">Requested Value</span>
                        <span className="text-lg font-black text-foreground">{req.amount}</span>
                     </div>
                     
                     <div className="flex items-center gap-2">
                        <button onClick={() => handleAction(req.id, 'Approve')} className="flex items-center gap-1.5 px-4 py-2 bg-success text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-sm shadow-success/20">
                           <Check size={14}/> Approve
                        </button>
                        <button onClick={() => handleAction(req.id, 'Reject')} className="flex items-center gap-1.5 px-4 py-2 bg-critical/10 border border-critical/20 text-critical rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-critical/20 transition-all">
                           <X size={14}/> Reject
                        </button>
                        <button onClick={() => handleAction(req.id, 'Delegate')} className="flex items-center justify-center w-8 h-8 bg-surface-elevated border border-border text-muted rounded-xl hover:text-foreground transition-all">
                           <Forward size={14}/>
                        </button>
                     </div>
                  </div>
               </GlassCard>
            );
         })}
      </div>
    </div>
  );
};
