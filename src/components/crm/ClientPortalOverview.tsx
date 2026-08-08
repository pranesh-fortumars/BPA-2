import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Globe, 
  Mail, 
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  CreditCard,
  MessageSquare,
  Plus
} from 'lucide-react';
import { GlassCard } from '../GlassCard';

export const ClientPortalOverview = () => {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="space-y-6">
      {/* Client Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-xl">
         <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 blur-[80px] rounded-full pointer-events-none"></div>
         
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg text-slate-900">
                  <Building2 size={32} />
               </div>
               <div>
                  <h2 className="text-2xl font-black tracking-tight mb-2">Acme Corporation</h2>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300">
                     <span className="flex items-center gap-1"><MapPin size={14}/> New York, NY</span>
                     <span className="flex items-center gap-1"><Globe size={14}/> acmecorp.com</span>
                  </div>
               </div>
            </div>
            
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-colors backdrop-blur-sm border border-white/10">
                  <Mail size={16} /> Contact Account Manager
               </button>
            </div>
         </div>
      </div>

      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit mb-6">
        <TabButton active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} label="Active Projects" icon={Calendar} />
        <TabButton active={activeTab === 'invoices'} onClick={() => setActiveTab('invoices')} label="Invoices & Billing" icon={FileText} />
        <TabButton active={activeTab === 'support'} onClick={() => setActiveTab('support')} label="Support Tickets" icon={MessageSquare} />
      </div>

      {activeTab === 'projects' && <ProjectsTab />}
      {activeTab === 'invoices' && <InvoicesTab />}
      {activeTab === 'support' && <SupportTab />}
    </div>
  );
};

/* --- TABS --- */

const ProjectsTab = () => (
   <div className="space-y-6">
      <GlassCard className="p-6 bg-white border border-slate-200">
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Website Redesign 2026</h3>
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-1"><CheckCircle2 size={14}/> On Track</span>
         </div>
         <p className="text-sm font-bold text-slate-500 mb-6 max-w-2xl">Complete overhaul of the corporate website including headless CMS integration and modern UI system.</p>
         
         <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Milestones</h4>
            <div className="space-y-3">
               <Milestone title="Phase 1: Design System" status="Completed" date="Oct 15, 2026" />
               <Milestone title="Phase 2: Frontend Development" status="In Progress" date="Nov 10, 2026" progress={65} />
               <Milestone title="Phase 3: CMS Integration" status="Pending" date="Dec 05, 2026" progress={0} />
            </div>
         </div>
      </GlassCard>
   </div>
);

const InvoicesTab = () => (
   <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
         <GlassCard className="p-6 bg-white border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Outstanding Balance</p>
            <h4 className="text-2xl font-black text-slate-900">₹4,50,000</h4>
         </GlassCard>
      </div>
      
      <GlassCard className="p-0 bg-white border border-slate-200 overflow-hidden">
         <div className="divide-y divide-slate-100">
            <InvoiceRow id="INV-089" amount="₹4,50,000" date="Oct 01, 2026" due="Oct 15, 2026" status="Overdue" />
            <InvoiceRow id="INV-075" amount="₹2,00,000" date="Sep 01, 2026" due="Sep 15, 2026" status="Paid" />
         </div>
      </GlassCard>
   </div>
);

const SupportTab = () => (
   <div className="space-y-6">
      <div className="flex justify-end">
         <button className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-xl shadow-slate-900/10">
            <Plus size={16}/> New Ticket
         </button>
      </div>
      <GlassCard className="p-0 bg-white border border-slate-200 overflow-hidden">
         <div className="divide-y divide-slate-100">
            <TicketRow id="TKT-102" title="API Rate Limit Error" status="Open" priority="High" date="2 hours ago" />
            <TicketRow id="TKT-095" title="Update Billing Address" status="Resolved" priority="Low" date="3 days ago" />
         </div>
      </GlassCard>
   </div>
);

/* --- UTILS --- */

const TabButton = ({ active, onClick, label, icon: Icon }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${active ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}
  >
    <Icon size={14}/> {label}
  </button>
);

const Milestone = ({ title, status, date, progress }: any) => (
   <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
      <div className="flex justify-between items-center mb-2">
         <h5 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            {status === 'Completed' ? <CheckCircle2 size={16} className="text-emerald-500"/> : <Clock size={16} className="text-amber-500"/>}
            {title}
         </h5>
         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{date}</span>
      </div>
      {status === 'In Progress' && progress !== undefined && (
         <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
               <div className="h-full bg-violet-500 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="text-xs font-black text-slate-500">{progress}%</span>
         </div>
      )}
   </div>
);

const InvoiceRow = ({ id, amount, date, due, status }: any) => (
   <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-4">
         <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
            <FileText size={18} />
         </div>
         <div>
            <h4 className="text-sm font-bold text-slate-900">{id}</h4>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Billed: {date}</p>
         </div>
      </div>
      <div className="flex items-center gap-6">
         <div className="text-right">
            <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Due {due}</span>
            <span className="text-sm font-black text-slate-900">{amount}</span>
         </div>
         {status === 'Paid' ? (
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-24 justify-center"><CheckCircle2 size={12}/> Paid</span>
         ) : (
            <button className="bg-slate-900 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:bg-slate-800 transition-colors w-24 justify-center"><CreditCard size={12}/> Pay Now</button>
         )}
      </div>
   </div>
);

const TicketRow = ({ id, title, status, priority, date }: any) => (
   <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer">
      <div className="flex items-center gap-4">
         <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
            <MessageSquare size={18} />
         </div>
         <div>
            <div className="flex items-center gap-2 mb-1">
               <span className="text-[10px] font-black bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md">{id}</span>
               <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${status === 'Open' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{status}</span>
               <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>{priority}</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">{title}</h4>
         </div>
      </div>
      <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
         <Clock size={12}/> {date}
      </div>
   </div>
);
