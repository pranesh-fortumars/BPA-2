import React, { useState } from 'react';
import { Settings, Play, Filter, Zap, Plus, ArrowDown, Save, FileText, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../GlassCard';

export const WorkflowBuilder = () => {
  const [trigger, setTrigger] = useState('new_lead');
  const [condition, setCondition] = useState('value_gt_100k');
  const [action, setAction] = useState('notify_sales_director');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
     // In a real app, this would serialize the workflow logic and save it to DataService.save('workflows', json)
     setIsSaved(true);
     setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-violet-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-violet-600/20">
               <Settings size={20} />
            </div>
            <div>
               <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">Linear Workflow Builder</h2>
               <p className="text-[10px] font-bold text-slate-500">Define simple Trigger ➔ Condition ➔ Action automation rules.</p>
            </div>
         </div>
         
         <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors shrink-0">
            {isSaved ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Save size={16} />}
            {isSaved ? 'Saved to DB' : 'Save Workflow'}
         </button>
      </div>

      <div className="max-w-2xl mx-auto space-y-4 py-8 relative">
         {/* TRIGGER NODE */}
         <GlassCard className="p-6 bg-white border-2 border-slate-200 hover:border-violet-300 transition-colors relative z-10">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Play size={16} />
               </div>
               <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">1. Trigger Event</h3>
            </div>
            <select 
               value={trigger} 
               onChange={e => setTrigger(e.target.value)}
               className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-violet-500 transition-colors"
            >
               <option value="new_lead">When a New Lead is Created</option>
               <option value="invoice_paid">When an Invoice is Paid</option>
               <option value="leave_requested">When Leave is Requested</option>
               <option value="task_blocked">When a Task is Blocked</option>
            </select>
         </GlassCard>

         <div className="flex justify-center -my-2 relative z-0 text-slate-300">
            <ArrowDown size={32} />
         </div>

         {/* CONDITION NODE */}
         <GlassCard className="p-6 bg-white border-2 border-slate-200 hover:border-amber-300 transition-colors relative z-10">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Filter size={16} />
               </div>
               <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">2. Condition (Optional)</h3>
            </div>
            <select 
               value={condition} 
               onChange={e => setCondition(e.target.value)}
               className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-amber-500 transition-colors"
            >
               <option value="none">Always run (No condition)</option>
               <option value="value_gt_100k">Only if Value &gt; ₹1,00,000</option>
               <option value="dept_is_eng">Only if Department is Engineering</option>
               <option value="time_gt_48h">Only if Pending &gt; 48 hours</option>
            </select>
         </GlassCard>

         <div className="flex justify-center -my-2 relative z-0 text-slate-300">
            <ArrowDown size={32} />
         </div>

         {/* ACTION NODE */}
         <GlassCard className="p-6 bg-white border-2 border-slate-200 hover:border-emerald-300 transition-colors relative z-10">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Zap size={16} />
               </div>
               <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">3. Action</h3>
            </div>
            <select 
               value={action} 
               onChange={e => setAction(e.target.value)}
               className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 transition-colors"
            >
               <option value="notify_sales_director">Notify Sales Director</option>
               <option value="create_task">Create Follow-up Task</option>
               <option value="request_approval">Send to Approval Inbox</option>
               <option value="send_email">Send Email Template</option>
               <option value="webhook">Trigger External Webhook</option>
            </select>
         </GlassCard>
         
         <div className="pt-6 flex justify-center">
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors border border-slate-200 border-dashed">
               <Plus size={14}/> Add Another Action
            </button>
         </div>
      </div>
    </div>
  );
};
