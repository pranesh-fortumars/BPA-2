import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  CreditCard, 
  PieChart, 
  ArrowUpRight,
  Download,
  AlertCircle
} from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { DataService } from '../../lib/db';

export const FinanceDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [invoices, setInvoices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      // Invoices
      let storedInvoices = await DataService.getAll<any>('invoices');
      if (storedInvoices.length === 0) {
        const initial = [
          { id: 'INV-001', client: 'Stark Industries', amount: '₹12,00,000', due: 'Oct 20, 2026', status: 'Pending' },
          { id: 'INV-002', client: 'Wayne Ent.', amount: '₹8,50,000', due: 'Oct 25, 2026', status: 'Pending' }
        ];
        for (const i of initial) await DataService.save('invoices', i);
        storedInvoices = initial;
      }
      setInvoices(storedInvoices);

      // Projects Profitability
      let storedProjects = await DataService.getAll<any>('projects');
      if (storedProjects.length === 0) {
         const pData = [
            { id: 'p1', name: "Acme Corp Rebranding", revenue: 1500000, cost: 450000, margin: 70 },
            { id: 'p2', name: "Stark Tech Mobile App", revenue: 2800000, cost: 1200000, margin: 57 },
            { id: 'p3', name: "Wayne Ent. Dashboard", revenue: 950000, cost: 800000, margin: 15 },
         ];
         for (const p of pData) await DataService.save('projects', p);
         storedProjects = pData;
      }
      setProjects(storedProjects);
    };
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <StatCard title="Total MRR" value="₹24,50,000" trend="+12.5%" isUp={true} icon={TrendingUp} color="success" />
         <StatCard title="Outstanding Invoices" value="₹8,20,000" trend="5 Pending" isUp={false} icon={FileText} color="warning" />
         <StatCard title="Cash-flow (30d)" value="₹12,40,000" trend="+5.2%" isUp={true} icon={DollarSign} color="secondary" />
         <StatCard title="Project Profit Margin" value="68%" trend="+2.1%" isUp={true} icon={PieChart} color="primary" />
      </div>

      <div className="flex items-center gap-2 p-1.5 bg-surface-elevated rounded-2xl w-fit border border-border">
        <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} label="Financial Overview" />
        <TabButton active={activeTab === 'profitability'} onClick={() => setActiveTab('profitability')} label="Project Profitability" />
        <TabButton active={activeTab === 'invoices'} onClick={() => setActiveTab('invoices')} label="Invoicing & Payments" />
      </div>

      {activeTab === 'overview' && <FinancialOverview />}
      {activeTab === 'profitability' && <ProjectProfitability projects={projects} />}
      {activeTab === 'invoices' && <InvoicesTab invoices={invoices} />}
    </div>
  );
};

/* --- TABS --- */

const FinancialOverview = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2 space-y-6">
      <GlassCard className="p-6 bg-surface border border-border">
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Revenue Forecast</h3>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-surface-elevated text-muted rounded-lg text-[10px] font-black uppercase tracking-widest hover:text-foreground transition-colors border border-border">
               <Download size={14}/> Export
            </button>
         </div>
         <div className="h-64 flex items-end justify-between gap-2">
            {[40, 55, 45, 60, 75, 65, 80, 90, 85, 100, 95, 110].map((val, i) => (
               <div key={i} className="w-full bg-surface-elevated rounded-t-xl relative group border border-border border-b-0">
                  <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-xl transition-all" style={{ height: `${val}%` }}></div>
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-black py-1 px-2 rounded-lg pointer-events-none transition-opacity z-10 whitespace-nowrap shadow-xl">
                     ₹{(val * 10000).toLocaleString()}
                  </div>
               </div>
            ))}
         </div>
         <div className="flex justify-between mt-4 text-[10px] font-bold text-muted">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
         </div>
      </GlassCard>
    </div>
    
    <div className="space-y-6">
      <GlassCard className="p-6 bg-surface-elevated text-foreground border border-border shadow-xl overflow-hidden relative">
         <div className="absolute -top-12 -right-12 w-32 h-32 bg-warning/20 blur-2xl rounded-full"></div>
         <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-6">Cash Flow Alert</h3>
         <div className="p-4 bg-surface rounded-2xl border border-warning/30 mb-4 shadow-sm relative z-10">
            <div className="flex items-center gap-3 mb-2">
               <AlertCircle size={16} className="text-warning" />
               <span className="text-xs font-bold text-warning">Payment Overdue</span>
            </div>
            <p className="text-sm font-bold leading-relaxed mb-4 text-foreground">Invoice #INV-2026-89 for "Acme Corp" is 15 days overdue. (₹4,50,000)</p>
            <button className="w-full py-2 bg-warning text-warning-foreground rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-colors shadow-lg shadow-warning/20">
               Send Reminder
            </button>
         </div>
      </GlassCard>
    </div>
  </div>
);

const ProjectProfitability = ({ projects }: { projects: any[] }) => {
   return (
      <GlassCard className="p-0 bg-surface border border-border overflow-hidden">
         <div className="p-6 border-b border-border flex items-center justify-between">
            <div>
               <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Project Profitability Tracker</h3>
               <p className="text-xs font-bold text-muted mt-1">Contract Value vs. Internal Resource Costs</p>
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted bg-surface-elevated border-b border-border">Project Name</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted bg-surface-elevated border-b border-border text-right">Contract Value</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted bg-surface-elevated border-b border-border text-right">Resource Cost</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted bg-surface-elevated border-b border-border text-right">Net Profit</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted bg-surface-elevated border-b border-border">Margin</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border">
                  {projects.map((p, i) => (
                     <tr key={i} className="hover:bg-surface-elevated transition-colors">
                        <td className="p-4">
                           <span className="text-sm font-bold text-foreground">{p.name}</span>
                        </td>
                        <td className="p-4 text-right">
                           <span className="text-sm font-bold text-success">₹{(p.revenue).toLocaleString()}</span>
                        </td>
                        <td className="p-4 text-right">
                           <span className="text-sm font-bold text-critical">₹{(p.cost).toLocaleString()}</span>
                        </td>
                        <td className="p-4 text-right">
                           <span className="text-sm font-black text-foreground">₹{(p.revenue - p.cost).toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                           <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-border rounded-full overflow-hidden w-24">
                                 <div className={`h-full ${p.margin > 50 ? 'bg-success' : p.margin > 30 ? 'bg-warning' : 'bg-critical'}`} style={{ width: `${p.margin}%` }}></div>
                              </div>
                              <span className="text-xs font-black text-foreground">{p.margin}%</span>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </GlassCard>
   );
};

const InvoicesTab = ({ invoices }: { invoices: any[] }) => {
   const [showGateway, setShowGateway] = useState(false);
   const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

   const handlePay = (invoice: any) => {
      setSelectedInvoice(invoice);
      setShowGateway(true);
   };

   return (
      <div className="space-y-6 relative">
         <GlassCard className="p-0 bg-surface border border-border overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
               <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Outstanding Invoices</h3>
            </div>
            <div className="p-4 grid gap-4">
               {invoices.map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between p-4 border border-border bg-surface-elevated rounded-2xl hover:border-primary/50 transition-all">
                     <div>
                        <div className="flex items-center gap-2 mb-1">
                           <span className="text-[10px] font-black bg-surface text-muted px-2 py-0.5 rounded-md border border-border">{inv.id}</span>
                           <span className="text-[10px] font-bold text-muted">Due: {inv.due}</span>
                        </div>
                        <h4 className="text-base font-bold text-foreground">{inv.client}</h4>
                     </div>
                     <div className="flex items-center gap-6">
                        <div className="text-right">
                           <span className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1">Amount</span>
                           <span className="text-lg font-black text-foreground">{inv.amount}</span>
                        </div>
                        <button onClick={() => handlePay(inv)} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-colors shadow-lg shadow-primary/20">
                           <CreditCard size={14} /> Pay Now
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </GlassCard>

         {/* Mock Payment Gateway Overlay */}
         {showGateway && selectedInvoice && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
               <div className="bg-surface rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative overflow-hidden border border-border">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-secondary"></div>
                  
                  <div className="text-center mb-8">
                     <div className="w-16 h-16 bg-surface-elevated rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
                        <CreditCard size={24} className="text-muted" />
                     </div>
                     <h3 className="text-xl font-black text-foreground tracking-tight">Secure Payment</h3>
                     <p className="text-sm font-medium text-muted mt-1">Simulated Gateway Integration</p>
                  </div>

                  <div className="bg-surface-elevated p-4 rounded-xl border border-border mb-6 flex justify-between items-center">
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Paying To</p>
                        <p className="text-sm font-bold text-foreground">BPA PRO Platform</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Amount</p>
                        <p className="text-lg font-black text-primary">{selectedInvoice.amount}</p>
                     </div>
                  </div>

                  <div className="space-y-4 mb-8">
                     <button className="w-full py-4 border-2 border-border hover:border-primary bg-surface rounded-xl text-sm font-bold text-foreground transition-colors flex items-center justify-center gap-2">
                        Pay via UPI
                     </button>
                     <button className="w-full py-4 border-2 border-border hover:border-primary bg-surface rounded-xl text-sm font-bold text-foreground transition-colors flex items-center justify-center gap-2">
                        Pay via Credit Card
                     </button>
                  </div>

                  <div className="flex gap-4">
                     <button onClick={() => setShowGateway(false)} className="flex-1 py-3 bg-surface-elevated text-foreground border border-border rounded-xl text-xs font-black uppercase tracking-widest hover:bg-border transition-colors">
                        Cancel
                     </button>
                     <button onClick={() => {
                        alert(`Payment of ${selectedInvoice.amount} simulated successfully!`);
                        setShowGateway(false);
                     }} className="flex-1 py-3 bg-success text-primary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-colors shadow-lg shadow-success/20">
                        Simulate Success
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

/* --- UTILS --- */

const StatCard = ({ title, value, trend, isUp, icon: Icon, color }: any) => {
  const colorMap: Record<string, string> = {
     success: 'bg-success/10 text-success border-success/20',
     warning: 'bg-warning/10 text-warning border-warning/20',
     secondary: 'bg-secondary/10 text-secondary border-secondary/20',
     primary: 'bg-primary/10 text-primary border-primary/20'
  };

  return (
    <GlassCard className="p-6 bg-surface border border-border hover:border-primary/30 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorMap[color] || colorMap.primary}`}>
          <Icon size={20} />
        </div>
        <span className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-md border ${isUp ? 'bg-success/10 text-success border-success/20' : 'bg-critical/10 text-critical border-critical/20'}`}>
          {isUp ? <ArrowUpRight size={12} /> : <TrendingDown size={12} />}
          {trend}
        </span>
      </div>
      <div>
        <p className="text-[11px] font-black uppercase tracking-widest text-muted mb-1">{title}</p>
        <h4 className="text-2xl font-black text-foreground tracking-tight">{value}</h4>
      </div>
    </GlassCard>
  );
};

const TabButton = ({ active, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${active ? 'bg-surface text-foreground shadow-sm border border-border' : 'text-muted hover:text-foreground hover:bg-surface'}`}
  >
    {label}
  </button>
);
