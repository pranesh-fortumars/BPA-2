import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  Download, 
  AlertCircle 
} from 'lucide-react';

export const ClientPortalOverview = () => {
  return (
    <div className="space-y-8">
      {/* Active Project Status */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Enterprise ERP Implementation</h3>
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mt-1">Project ID: PRJ-9284-X</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                On Track
             </div>
             <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Completion</p>
                <p className="text-xl font-black text-slate-900">65%</p>
             </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-8">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '65%' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-violet-600 rounded-full"
          />
        </div>

        {/* Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Milestone title="Phase 1: Discovery" status="completed" date="Oct 12, 2026" />
          <Milestone title="Phase 2: Design" status="completed" date="Nov 05, 2026" />
          <Milestone title="Phase 3: Development" status="active" date="In Progress" />
          <Milestone title="Phase 4: Launch" status="pending" date="Expected: Dec 20, 2026" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Invoices */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
             <FileText size={18} className="text-slate-400"/> Recent Invoices
          </h3>
          <div className="space-y-3">
             <InvoiceRow id="INV-2026-001" amount="₹12,500" status="Paid" date="Oct 15, 2026" />
             <InvoiceRow id="INV-2026-042" amount="₹8,200" status="Pending" date="Nov 10, 2026" highlight />
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-100 mb-6 flex items-center gap-2">
             <AlertCircle size={18} className="text-violet-400"/> Pending Approvals
          </h3>
          <div className="space-y-3">
             <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                <div>
                   <h4 className="text-xs font-bold text-white mb-1">UI/UX Design Sign-off</h4>
                   <p className="text-[10px] text-slate-400 font-bold">Please review the wireframes for the dashboard module.</p>
                </div>
                <button className="px-4 py-2 bg-violet-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-500 transition-colors">
                   Review
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Milestone = ({ title, status, date }: any) => {
  const isCompleted = status === 'completed';
  const isActive = status === 'active';
  
  return (
    <div className={`p-4 rounded-2xl border ${isActive ? 'bg-violet-50 border-violet-200' : 'bg-slate-50 border-slate-100'}`}>
      <div className="flex items-center gap-2 mb-3">
        {isCompleted ? <CheckCircle2 size={18} className="text-emerald-500"/> : isActive ? <Clock size={18} className="text-violet-600"/> : <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>}
        <h4 className={`text-xs font-bold ${isActive ? 'text-violet-900' : 'text-slate-700'}`}>{title}</h4>
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{date}</p>
    </div>
  );
}

const InvoiceRow = ({ id, amount, status, date, highlight }: any) => (
  <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
    <div className="flex items-center gap-4">
       <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${highlight ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
         <FileText size={18} />
       </div>
       <div>
         <p className="text-xs font-bold text-slate-900">{id}</p>
         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">{date}</p>
       </div>
    </div>
    <div className="flex items-center gap-6">
       <div className="text-right">
         <p className="text-sm font-black text-slate-900">{amount}</p>
         <p className={`text-[10px] font-black uppercase tracking-widest mt-0.5 ${status === 'Paid' ? 'text-emerald-500' : 'text-amber-500'}`}>{status}</p>
       </div>
       <button className="text-slate-300 hover:text-violet-600 transition-colors">
         <Download size={18} />
       </button>
    </div>
  </div>
);
