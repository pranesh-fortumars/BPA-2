import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Globe, 
  Mail, 
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  CreditCard,
  MessageSquare,
  Plus
} from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { DataService } from '../../lib/db';

export const ClientPortalOverview = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [milestones, setMilestones] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      // Milestones
      let storedMilestones = await DataService.getAll<any>('client_projects');
      if (storedMilestones.length === 0) {
        const initialMilestones = [
          { id: 'm1', title: 'Phase 1: Design System', status: 'Completed', date: 'Oct 15, 2026' },
          { id: 'm2', title: 'Phase 2: Frontend Development', status: 'In Progress', date: 'Nov 10, 2026', progress: 65 },
          { id: 'm3', title: 'Phase 3: CMS Integration', status: 'Pending', date: 'Dec 05, 2026', progress: 0 }
        ];
        for (const m of initialMilestones) await DataService.save('client_projects', m);
        storedMilestones = initialMilestones;
      }
      setMilestones(storedMilestones);

      // Invoices
      let storedInvoices = await DataService.getAll<any>('client_invoices');
      if (storedInvoices.length === 0) {
        const initialInvoices = [
          { id: 'INV-089', amount: '₹4,50,000', date: 'Oct 01, 2026', due: 'Oct 15, 2026', status: 'Overdue' },
          { id: 'INV-075', amount: '₹2,00,000', date: 'Sep 01, 2026', due: 'Sep 15, 2026', status: 'Paid' }
        ];
        for (const i of initialInvoices) await DataService.save('client_invoices', i);
        storedInvoices = initialInvoices;
      }
      setInvoices(storedInvoices);

      // Tickets
      let storedTickets = await DataService.getAll<any>('client_tickets');
      if (storedTickets.length === 0) {
        const initialTickets = [
          { id: 'TKT-102', title: 'API Rate Limit Error', status: 'Open', priority: 'High', date: '2 hours ago' },
          { id: 'TKT-095', title: 'Update Billing Address', status: 'Resolved', priority: 'Low', date: '3 days ago' }
        ];
        for (const t of initialTickets) await DataService.save('client_tickets', t);
        storedTickets = initialTickets;
      }
      setTickets(storedTickets);
    };
    loadData();
  }, []);

  return (
    <div className="space-y-6 text-foreground">
      {/* Client Header */}
      <div className="bg-surface-elevated border border-border text-foreground rounded-3xl p-8 relative overflow-hidden shadow-xl">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none"></div>
         
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 bg-surface rounded-2xl flex items-center justify-center shadow-lg text-primary border border-border">
                  <Building2 size={32} />
               </div>
               <div>
                  <h2 className="text-2xl font-black tracking-tight mb-2">Acme Corporation</h2>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-muted">
                     <span className="flex items-center gap-1"><MapPin size={14}/> New York, NY</span>
                     <span className="flex items-center gap-1"><Globe size={14}/> acmecorp.com</span>
                  </div>
               </div>
            </div>
            
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 px-4 py-2 bg-surface hover:brightness-110 text-foreground rounded-xl text-xs font-black uppercase tracking-widest transition-colors shadow-sm border border-border">
                  <Mail size={16} /> Contact Account Manager
               </button>
            </div>
         </div>
      </div>

      <div className="flex items-center gap-2 p-1.5 bg-surface-elevated border border-border rounded-2xl w-fit mb-6">
        <TabButton active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} label="Active Projects" icon={Calendar} />
        <TabButton active={activeTab === 'invoices'} onClick={() => setActiveTab('invoices')} label="Invoices & Billing" icon={FileText} />
        <TabButton active={activeTab === 'support'} onClick={() => setActiveTab('support')} label="Support Tickets" icon={MessageSquare} />
      </div>

      {activeTab === 'projects' && <ProjectsTab milestones={milestones} />}
      {activeTab === 'invoices' && <InvoicesTab invoices={invoices} />}
      {activeTab === 'support' && <SupportTab tickets={tickets} />}
    </div>
  );
};

/* --- TABS --- */

const ProjectsTab = ({ milestones }: { milestones: any[] }) => (
   <div className="space-y-6">
      <GlassCard className="p-6 bg-surface border border-border">
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Website Redesign 2026</h3>
            <span className="bg-success/10 text-success border border-success/20 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-1"><CheckCircle2 size={14}/> On Track</span>
         </div>
         <p className="text-sm font-bold text-muted mb-6 max-w-2xl">Complete overhaul of the corporate website including headless CMS integration and modern UI system.</p>
         
         <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted">Milestones</h4>
            <div className="space-y-3">
               {milestones.map(m => (
                 <Milestone key={m.id} title={m.title} status={m.status} date={m.date} progress={m.progress} />
               ))}
            </div>
         </div>
      </GlassCard>
   </div>
);

const InvoicesTab = ({ invoices }: { invoices: any[] }) => (
   <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
         <GlassCard className="p-6 bg-surface border border-border shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Outstanding Balance</p>
            <h4 className="text-2xl font-black text-foreground">₹4,50,000</h4>
         </GlassCard>
      </div>
      
      <GlassCard className="p-0 bg-surface border border-border overflow-hidden">
         <div className="divide-y divide-border">
            {invoices.map(inv => (
              <InvoiceRow key={inv.id} id={inv.id} amount={inv.amount} date={inv.date} due={inv.due} status={inv.status} />
            ))}
         </div>
      </GlassCard>
   </div>
);

const SupportTab = ({ tickets }: { tickets: any[] }) => (
   <div className="space-y-6">
      <div className="flex justify-end">
         <button className="flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-colors shadow-xl shadow-primary/20">
            <Plus size={16}/> New Ticket
         </button>
      </div>
      <GlassCard className="p-0 bg-surface border border-border overflow-hidden">
         <div className="divide-y divide-border">
            {tickets.map(t => (
               <TicketRow key={t.id} id={t.id} title={t.title} status={t.status} priority={t.priority} date={t.date} />
            ))}
         </div>
      </GlassCard>
   </div>
);

/* --- UTILS --- */

const TabButton = ({ active, onClick, label, icon: Icon }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${active ? 'bg-surface text-foreground shadow-sm border border-border' : 'text-muted hover:text-foreground hover:bg-surface'}`}
  >
    <Icon size={14}/> {label}
  </button>
);

const Milestone = ({ title, status, date, progress }: any) => (
   <div className="p-4 bg-surface-elevated rounded-xl border border-border">
      <div className="flex justify-between items-center mb-2">
         <h5 className="text-sm font-bold text-foreground flex items-center gap-2">
            {status === 'Completed' ? <CheckCircle2 size={16} className="text-success"/> : <Clock size={16} className="text-warning"/>}
            {title}
         </h5>
         <span className="text-[10px] font-black uppercase tracking-widest text-muted">{date}</span>
      </div>
      {status === 'In Progress' && progress !== undefined && (
         <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
               <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="text-xs font-black text-muted">{progress}%</span>
         </div>
      )}
   </div>
);

const InvoiceRow = ({ id, amount, date, due, status }: any) => (
   <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-elevated transition-colors">
      <div className="flex items-center gap-4">
         <div className="w-10 h-10 rounded-xl bg-surface-elevated border border-border text-muted flex items-center justify-center shrink-0">
            <FileText size={18} />
         </div>
         <div>
            <h4 className="text-sm font-bold text-foreground">{id}</h4>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted mt-1">Billed: {date}</p>
         </div>
      </div>
      <div className="flex items-center gap-6">
         <div className="text-right">
            <span className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1">Due {due}</span>
            <span className="text-sm font-black text-foreground">{amount}</span>
         </div>
         {status === 'Paid' ? (
            <span className="bg-success/10 text-success border border-success/20 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-24 justify-center"><CheckCircle2 size={12}/> Paid</span>
         ) : (
            <button className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:brightness-110 transition-colors w-24 justify-center shadow-lg shadow-primary/20"><CreditCard size={12}/> Pay Now</button>
         )}
      </div>
   </div>
);

const TicketRow = ({ id, title, status, priority, date }: any) => (
   <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-elevated transition-colors cursor-pointer">
      <div className="flex items-center gap-4">
         <div className="w-10 h-10 rounded-xl bg-surface-elevated border border-border text-muted flex items-center justify-center shrink-0">
            <MessageSquare size={18} />
         </div>
         <div>
            <div className="flex items-center gap-2 mb-1">
               <span className="text-[10px] font-black bg-surface-elevated border border-border text-muted px-2 py-0.5 rounded-md">{id}</span>
               <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${status === 'Open' ? 'bg-warning/10 text-warning border-warning/20' : 'bg-success/10 text-success border-success/20'}`}>{status}</span>
               <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${priority === 'High' ? 'bg-critical/10 text-critical border-critical/20' : 'bg-surface text-muted border-border'}`}>{priority}</span>
            </div>
            <h4 className="text-sm font-bold text-foreground">{title}</h4>
         </div>
      </div>
      <div className="text-[10px] font-bold text-muted flex items-center gap-1">
         <Clock size={12}/> {date}
      </div>
   </div>
);
