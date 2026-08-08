import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  FileText, 
  Plus, 
  Brain,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  X,
  Clock
} from 'lucide-react';
import { DataService } from '../../lib/db';

const initialLeads = [
  { id: '1', name: 'Acme Corp', contact: 'John Doe', stage: 'lead', score: 92, value: '₹12,000', assignee: 'Priya (Enterprise)' },
  { id: '2', name: 'Global Tech', contact: 'Sarah Smith', stage: 'opportunity', score: 78, value: '₹45,000', assignee: 'Ravi (Mid-Market)' },
  { id: '3', name: 'Stark Industries', contact: 'Tony Stark', stage: 'proposal', score: 95, value: '₹150,000', assignee: 'Priya (Enterprise)' },
  { id: '4', name: 'Wayne Ent', contact: 'Bruce Wayne', stage: 'negotiation', score: 88, value: '₹80,000', assignee: 'Ravi (Mid-Market)' },
];

export const CRMDashboard = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', contact: '', value: '', stage: 'lead', assignee: 'Auto-Routing...' });

  useEffect(() => {
    const loadData = async () => {
      let storedLeads = await DataService.getAll<any>('leads');
      if (storedLeads.length === 0) {
        // Seed initial data
        for (const lead of initialLeads) {
          await DataService.save('leads', lead);
        }
        storedLeads = initialLeads;
      }
      setLeads(storedLeads);
    };
    loadData();
  }, []);

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    const score = Math.floor(Math.random() * 40) + 50;
    const lead = {
      id: Math.random().toString(36).substr(2, 9),
      name: newLead.name,
      contact: newLead.contact,
      value: `₹${newLead.value}`,
      stage: newLead.stage,
      score,
      assignee: parseInt(newLead.value) > 100000 ? 'Priya (Enterprise)' : 'Ravi (SMB)'
    };
    await DataService.save('leads', lead);
    setLeads([...leads, lead]);
    setShowModal(false);
    setNewLead({ name: '', contact: '', value: '', stage: 'lead', assignee: 'Auto-Routing...' });
  };

  return (
    <div className="space-y-8 relative">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Active Leads" value="1,248" trend="+12%" icon={Users} color="text-blue-500" bg="bg-blue-50" />
        <MetricCard title="Pipeline Value" value="₹2.4M" trend="+5.4%" icon={TrendingUp} color="text-emerald-500" bg="bg-emerald-50" />
        <MetricCard title="Proposals Sent" value="84" trend="-2%" icon={FileText} color="text-amber-500" bg="bg-amber-50" />
        <MetricCard title="Win Rate" value="68%" trend="+4%" icon={CheckCircle2} color="text-violet-500" bg="bg-violet-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Pipeline Kanban */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 overflow-x-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-6 min-w-[700px]">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Sales Pipeline</h3>
            <button 
               onClick={() => setShowModal(true)}
               className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              <Plus size={16} /> New Lead
            </button>
          </div>
          
          <div className="flex gap-4 min-w-[700px]">
            <PipelineColumn title="Lead" leads={leads.filter(l => l.stage === 'lead')} />
            <PipelineColumn title="Opportunity" leads={leads.filter(l => l.stage === 'opportunity')} />
            <PipelineColumn title="Proposal" leads={leads.filter(l => l.stage === 'proposal')} />
            <PipelineColumn title="Negotiation" leads={leads.filter(l => l.stage === 'negotiation')} />
          </div>
        </div>

        {/* AI Copilot & Lead Scoring */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/30 blur-[60px] rounded-full pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 bg-violet-600/20 rounded-xl flex items-center justify-center border border-violet-500/30">
                <Brain className="text-violet-400" size={20} />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-100">AI Lead Scoring</h3>
                <p className="text-[10px] text-slate-400 font-bold">Real-time prediction model</p>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              {leads.sort((a, b) => b.score - a.score).slice(0, 3).map((lead) => (
                <div key={lead.id} className="p-3 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
                  <div>
                    <p className="text-xs font-bold text-white">{lead.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold">{lead.value}</p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <span className={`text-xs font-black px-2 py-1 rounded-lg ${lead.score >= 90 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {lead.score}% Win Prob.
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-colors relative z-10">
              View Detailed Analytics
            </button>
          </div>

          {/* Proposal Generator Quick Action */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
             <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Quick Actions</h3>
             <div className="grid grid-cols-2 gap-3">
                <ActionBtn icon={FileText} label="Generate Proposal" color="text-violet-600" bg="bg-violet-50" />
                <ActionBtn icon={Mail} label="Email Sequence" color="text-blue-600" bg="bg-blue-50" />
                <ActionBtn icon={Phone} label="Log Call" color="text-emerald-600" bg="bg-emerald-50" />
                <ActionBtn icon={Calendar} label="Schedule Meeting" color="text-amber-600" bg="bg-amber-50" />
             </div>
          </div>

          {/* Interaction History */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
             <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
                <Clock size={16} className="text-violet-600" /> Recent Interactions
             </h3>
             <div className="space-y-4">
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Mail size={14} />
                   </div>
                   <div>
                      <p className="text-xs font-bold text-slate-900">Email sent to Tony Stark</p>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">Subject: Proposal Revision v2</p>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">10 mins ago</p>
                   </div>
                </div>
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Phone size={14} />
                   </div>
                   <div>
                      <p className="text-xs font-bold text-slate-900">Call with Sarah Smith</p>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">Discussed tech requirements.</p>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">2 hours ago</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* New Lead Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900">Add New Lead</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-900 transition-colors"><X size={24}/></button>
            </div>
            
            <form onSubmit={handleAddLead} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Company Name</label>
                <input required value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. Stark Industries" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Contact Person</label>
                <input required value={newLead.contact} onChange={e => setNewLead({...newLead, contact: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. Tony Stark" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Pipeline Value (₹)</label>
                <input required type="number" value={newLead.value} onChange={e => setNewLead({...newLead, value: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. 150000" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Initial Stage</label>
                <select value={newLead.stage} onChange={e => setNewLead({...newLead, stage: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-violet-500 transition-colors">
                  <option value="lead">Lead</option>
                  <option value="opportunity">Opportunity</option>
                  <option value="proposal">Proposal</option>
                  <option value="negotiation">Negotiation</option>
                </select>
              </div>
              
              <button type="submit" className="w-full mt-6 py-4 bg-violet-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-violet-700 transition-colors shadow-xl shadow-violet-600/20 active:scale-95">
                Save Lead to Database
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Sub-components
const MetricCard = ({ title, value, trend, icon: Icon, color, bg }: any) => (
  <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:-translate-y-1 transition-transform">
    <div className={`w-12 h-12 rounded-2xl ${bg} ${color} flex items-center justify-center flex-shrink-0`}>
      <Icon size={24} />
    </div>
    <div>
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</h4>
      <div className="flex items-center gap-3">
        <p className="text-2xl font-black text-slate-900 tracking-tighter">{value}</p>
        <span className={`text-[10px] font-black uppercase tracking-widest ${trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{trend}</span>
      </div>
    </div>
  </div>
);

const PipelineColumn = ({ title, leads }: { title: string, leads: any[] }) => (
  <div className="flex-1 min-w-[200px] bg-slate-50/50 rounded-2xl p-3 border border-slate-100">
    <div className="flex items-center justify-between mb-4 px-2">
      <h4 className="text-[11px] font-black text-slate-600 uppercase tracking-widest">{title}</h4>
      <span className="text-[10px] font-black text-slate-400 bg-white px-2 py-0.5 rounded-lg border border-slate-200">{leads.length}</span>
    </div>
    <div className="space-y-3">
      {leads.map(lead => (
        <motion.div 
          key={lead.id} 
          layoutId={lead.id}
          className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-violet-300 hover:shadow-md transition-all cursor-grab"
        >
          <div className="flex justify-between items-start mb-2">
            <h5 className="text-sm font-bold text-slate-900">{lead.name}</h5>
            <button className="text-slate-400 hover:text-slate-900"><MoreVertical size={14}/></button>
          </div>
          <p className="text-xs text-slate-500 font-medium mb-1">{lead.contact}</p>
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1">
             <Users size={10} /> {lead.assignee}
          </p>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
             <span className="text-xs font-black text-emerald-600">{lead.value}</span>
             <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
               <Brain size={12} className={lead.score >= 90 ? 'text-violet-500' : 'text-amber-500'}/>
               {lead.score}
             </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const ActionBtn = ({ icon: Icon, label, color, bg }: any) => (
  <button className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors group text-center gap-2">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg} ${color} group-hover:scale-110 transition-transform`}>
      <Icon size={20} />
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 leading-tight">{label}</span>
  </button>
);
