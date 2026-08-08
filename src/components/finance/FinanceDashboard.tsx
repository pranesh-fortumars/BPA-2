import React, { useState } from 'react';
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

export const FinanceDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <StatCard title="Total MRR" value="₹24,50,000" trend="+12.5%" isUp={true} icon={TrendingUp} color="emerald" />
         <StatCard title="Outstanding Invoices" value="₹8,20,000" trend="5 Pending" isUp={false} icon={FileText} color="amber" />
         <StatCard title="Cash-flow (30d)" value="₹12,40,000" trend="+5.2%" isUp={true} icon={DollarSign} color="blue" />
         <StatCard title="Project Profit Margin" value="68%" trend="+2.1%" isUp={true} icon={PieChart} color="violet" />
      </div>

      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
        <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} label="Financial Overview" />
        <TabButton active={activeTab === 'profitability'} onClick={() => setActiveTab('profitability')} label="Project Profitability" />
        <TabButton active={activeTab === 'invoices'} onClick={() => setActiveTab('invoices')} label="Invoicing & Payments" />
      </div>

      {activeTab === 'overview' && <FinancialOverview />}
      {activeTab === 'profitability' && <ProjectProfitability />}
      {activeTab === 'invoices' && <InvoicesTab />}
    </div>
  );
};

/* --- TABS --- */

const FinancialOverview = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2 space-y-6">
      <GlassCard className="p-6 bg-white border border-slate-200">
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Revenue Forecast</h3>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors">
               <Download size={14}/> Export
            </button>
         </div>
         <div className="h-64 flex items-end justify-between gap-2">
            {[40, 55, 45, 60, 75, 65, 80, 90, 85, 100, 95, 110].map((val, i) => (
               <div key={i} className="w-full bg-slate-100 rounded-t-xl relative group">
                  <div className="absolute bottom-0 left-0 right-0 bg-violet-500 rounded-t-xl transition-all" style={{ height: `${val}%` }}></div>
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black py-1 px-2 rounded-lg pointer-events-none transition-opacity z-10 whitespace-nowrap">
                     ₹{(val * 10000).toLocaleString()}
                  </div>
               </div>
            ))}
         </div>
         <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
         </div>
      </GlassCard>
    </div>
    
    <div className="space-y-6">
      <GlassCard className="p-6 bg-slate-900 text-white border-0 shadow-xl overflow-hidden relative">
         <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/20 blur-2xl rounded-full"></div>
         <h3 className="text-sm font-black uppercase tracking-widest text-slate-100 mb-6">Cash Flow Alert</h3>
         <div className="p-4 bg-white/10 rounded-2xl border border-white/10 mb-4 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
               <AlertCircle size={16} className="text-amber-400" />
               <span className="text-xs font-bold text-amber-400">Payment Overdue</span>
            </div>
            <p className="text-sm font-bold leading-relaxed mb-4">Invoice #INV-2026-89 for "Acme Corp" is 15 days overdue. (₹4,50,000)</p>
            <button className="w-full py-2 bg-amber-500 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-400 transition-colors">
               Send Reminder
            </button>
         </div>
      </GlassCard>
    </div>
  </div>
);

const ProjectProfitability = () => {
   const projects = [
      { name: "Acme Corp Rebranding", revenue: 1500000, cost: 450000, margin: 70 },
      { name: "Stark Tech Mobile App", revenue: 2800000, cost: 1200000, margin: 57 },
      { name: "Wayne Ent. Dashboard", revenue: 950000, cost: 800000, margin: 15 }, // Low margin
   ];

   return (
      <GlassCard className="p-0 bg-white border border-slate-200 overflow-hidden">
         <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
               <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Project Profitability Tracker</h3>
               <p className="text-xs font-bold text-slate-500 mt-1">Contract Value vs. Internal Resource Costs</p>
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50">Project Name</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 text-right">Contract Value</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 text-right">Resource Cost</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 text-right">Net Profit</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50">Margin</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {projects.map((p, i) => (
                     <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                           <span className="text-sm font-bold text-slate-900">{p.name}</span>
                        </td>
                        <td className="p-4 text-right">
                           <span className="text-sm font-bold text-emerald-600">₹{(p.revenue).toLocaleString()}</span>
                        </td>
                        <td className="p-4 text-right">
                           <span className="text-sm font-bold text-rose-500">₹{(p.cost).toLocaleString()}</span>
                        </td>
                        <td className="p-4 text-right">
                           <span className="text-sm font-black text-slate-900">₹{(p.revenue - p.cost).toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                           <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden w-24">
                                 <div className={`h-full ${p.margin > 50 ? 'bg-emerald-500' : p.margin > 30 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${p.margin}%` }}></div>
                              </div>
                              <span className="text-xs font-black text-slate-700">{p.margin}%</span>
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

const InvoicesTab = () => {
   const [showGateway, setShowGateway] = useState(false);
   const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

   const handlePay = (invoice: any) => {
      setSelectedInvoice(invoice);
      setShowGateway(true);
   };

   return (
      <div className="space-y-6 relative">
         <GlassCard className="p-0 bg-white border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
               <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Outstanding Invoices</h3>
            </div>
            <div className="p-4 grid gap-4">
               {[
                  { id: 'INV-001', client: 'Stark Industries', amount: '₹12,00,000', due: 'Oct 20, 2026', status: 'Pending' },
                  { id: 'INV-002', client: 'Wayne Ent.', amount: '₹8,50,000', due: 'Oct 25, 2026', status: 'Pending' }
               ].map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-2xl hover:border-violet-300 transition-all">
                     <div>
                        <div className="flex items-center gap-2 mb-1">
                           <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">{inv.id}</span>
                           <span className="text-[10px] font-bold text-slate-400">Due: {inv.due}</span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900">{inv.client}</h4>
                     </div>
                     <div className="flex items-center gap-6">
                        <div className="text-right">
                           <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Amount</span>
                           <span className="text-lg font-black text-slate-900">{inv.amount}</span>
                        </div>
                        <button onClick={() => handlePay(inv)} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-colors">
                           <CreditCard size={14} /> Pay Now
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </GlassCard>

         {/* Mock Payment Gateway Overlay */}
         {showGateway && selectedInvoice && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
               <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-violet-500 to-blue-500"></div>
                  
                  <div className="text-center mb-8">
                     <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                        <CreditCard size={24} className="text-slate-400" />
                     </div>
                     <h3 className="text-xl font-black text-slate-900 tracking-tight">Secure Payment</h3>
                     <p className="text-sm font-medium text-slate-500 mt-1">Simulated Gateway Integration</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 flex justify-between items-center">
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Paying To</p>
                        <p className="text-sm font-bold text-slate-900">BPA PRO Platform</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Amount</p>
                        <p className="text-lg font-black text-violet-600">{selectedInvoice.amount}</p>
                     </div>
                  </div>

                  <div className="space-y-4 mb-8">
                     <button className="w-full py-4 border-2 border-slate-200 hover:border-violet-500 rounded-xl text-sm font-bold text-slate-700 transition-colors flex items-center justify-center gap-2">
                        Pay via UPI
                     </button>
                     <button className="w-full py-4 border-2 border-slate-200 hover:border-violet-500 rounded-xl text-sm font-bold text-slate-700 transition-colors flex items-center justify-center gap-2">
                        Pay via Credit Card
                     </button>
                  </div>

                  <div className="flex gap-4">
                     <button onClick={() => setShowGateway(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-colors">
                        Cancel
                     </button>
                     <button onClick={() => {
                        alert(`Payment of ${selectedInvoice.amount} simulated successfully!`);
                        setShowGateway(false);
                     }} className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors">
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
  const colorMap: any = {
     emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
     amber: 'bg-amber-50 text-amber-600 border-amber-100',
     blue: 'bg-blue-50 text-blue-600 border-blue-100',
     violet: 'bg-violet-50 text-violet-600 border-violet-100'
  };
  const iconColorMap: any = {
     emerald: 'text-emerald-500',
     amber: 'text-amber-500',
     blue: 'text-blue-500',
     violet: 'text-violet-500'
  };

  return (
    <GlassCard className="p-6 bg-white border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          <Icon size={20} />
        </div>
        <span className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-md ${isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {isUp ? <ArrowUpRight size={12} /> : <TrendingDown size={12} />}
          {trend}
        </span>
      </div>
      <div>
        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">{title}</p>
        <h4 className="text-2xl font-black text-slate-900 tracking-tight">{value}</h4>
      </div>
    </GlassCard>
  );
};

const TabButton = ({ active, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${active ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}
  >
    {label}
  </button>
);
