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
    <div className="space-y-8 relative font-sans">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Active Leads" value="1,248" trend="+12%" icon={Users} color="text-secondary" bg="bg-secondary/10" border="border-secondary/20" />
        <MetricCard title="Pipeline Value" value="₹2.4M" trend="+5.4%" icon={TrendingUp} color="text-success" bg="bg-success/10" border="border-success/20" />
        <MetricCard title="Proposals Sent" value="84" trend="-2%" icon={FileText} color="text-warning" bg="bg-warning/10" border="border-warning/20" />
        <MetricCard title="Win Rate" value="68%" trend="+4%" icon={CheckCircle2} color="text-primary" bg="bg-primary/10" border="border-primary/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Pipeline Kanban */}
        <div className="lg:col-span-2 bg-surface rounded-3xl border border-border shadow-sm p-6 overflow-x-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-6 min-w-[700px]">
            <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Sales Pipeline</h3>
            <button 
               onClick={() => setShowModal(true)}
               className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-xl text-xs font-bold hover:brightness-110 transition-colors"
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
          <div className="bg-surface-elevated rounded-3xl p-6 border border-border shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 blur-[60px] rounded-full pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
                <Brain className="text-primary" size={20} />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-foreground">AI Lead Scoring</h3>
                <p className="text-[10px] text-muted font-bold">Real-time prediction model</p>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              {leads.sort((a, b) => b.score - a.score).slice(0, 3).map((lead) => (
                <div key={lead.id} className="p-3 bg-surface rounded-2xl border border-border flex items-center justify-between hover:border-primary/30 transition-colors cursor-pointer">
                  <div>
                    <p className="text-xs font-bold text-foreground">{lead.name}</p>
                    <p className="text-[10px] text-muted font-bold">{lead.value}</p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <span className={`text-xs font-black px-2 py-1 rounded-lg ${lead.score >= 90 ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                      {lead.score}% Win Prob.
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 bg-primary hover:brightness-110 text-primary-foreground rounded-xl text-xs font-black uppercase tracking-widest transition-colors relative z-10 shadow-sm shadow-primary/20">
              View Detailed Analytics
            </button>
          </div>

          {/* Proposal Generator Quick Action */}
          <div className="bg-surface rounded-3xl p-6 border border-border shadow-sm">
             <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-4">Quick Actions</h3>
             <div className="grid grid-cols-2 gap-3">
                <ActionBtn icon={FileText} label="Generate Proposal" color="text-primary" bg="bg-primary/10" border="border-primary/20" />
                <ActionBtn icon={Mail} label="Email Sequence" color="text-secondary" bg="bg-secondary/10" border="border-secondary/20" />
                <ActionBtn icon={Phone} label="Log Call" color="text-success" bg="bg-success/10" border="border-success/20" />
                <ActionBtn icon={Calendar} label="Schedule Meeting" color="text-warning" bg="bg-warning/10" border="border-warning/20" />
             </div>
          </div>

          {/* Interaction History */}
          <div className="bg-surface rounded-3xl p-6 border border-border shadow-sm">
             <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-6 flex items-center gap-2">
                <Clock size={16} className="text-primary" /> Recent Interactions
             </h3>
             <div className="space-y-4">
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-secondary/10 border border-secondary/20 text-secondary flex items-center justify-center shrink-0">
                      <Mail size={14} />
                   </div>
                   <div>
                      <p className="text-xs font-bold text-foreground">Email sent to Tony Stark</p>
                      <p className="text-[10px] text-muted font-medium mt-0.5">Subject: Proposal Revision v2</p>
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted mt-1">10 mins ago</p>
                   </div>
                </div>
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-success/10 border border-success/20 text-success flex items-center justify-center shrink-0">
                      <Phone size={14} />
                   </div>
                   <div>
                      <p className="text-xs font-bold text-foreground">Call with Sarah Smith</p>
                      <p className="text-[10px] text-muted font-medium mt-0.5">Discussed tech requirements.</p>
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted mt-1">2 hours ago</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* New Lead Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface rounded-[2rem] p-8 max-w-md w-full shadow-2xl border border-border"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black uppercase tracking-tighter text-foreground">Add New Lead</h3>
              <button onClick={() => setShowModal(false)} className="text-muted hover:text-foreground transition-colors"><X size={24}/></button>
            </div>
            
            <form onSubmit={handleAddLead} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-muted uppercase tracking-widest mb-2">Company Name</label>
                <input required value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 transition-colors" placeholder="e.g. Stark Industries" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-muted uppercase tracking-widest mb-2">Contact Person</label>
                <input required value={newLead.contact} onChange={e => setNewLead({...newLead, contact: e.target.value})} className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 transition-colors" placeholder="e.g. Tony Stark" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-muted uppercase tracking-widest mb-2">Pipeline Value (₹)</label>
                <input required type="number" value={newLead.value} onChange={e => setNewLead({...newLead, value: e.target.value})} className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 transition-colors" placeholder="e.g. 150000" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-muted uppercase tracking-widest mb-2">Initial Stage</label>
                <select value={newLead.stage} onChange={e => setNewLead({...newLead, stage: e.target.value})} className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 transition-colors">
                  <option value="lead">Lead</option>
                  <option value="opportunity">Opportunity</option>
                  <option value="proposal">Proposal</option>
                  <option value="negotiation">Negotiation</option>
                </select>
              </div>
              
              <button type="submit" className="w-full mt-6 py-4 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-colors shadow-xl shadow-primary/20 active:scale-95">
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
const MetricCard = ({ title, value, trend, icon: Icon, color, bg, border }: any) => (
  <div className="bg-surface p-5 rounded-3xl border border-border shadow-sm flex items-center gap-4 hover:-translate-y-1 hover:border-primary/30 transition-all">
    <div className={`w-12 h-12 rounded-2xl ${bg} ${color} border ${border} flex items-center justify-center flex-shrink-0`}>
      <Icon size={24} />
    </div>
    <div>
      <h4 className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">{title}</h4>
      <div className="flex items-center gap-3">
        <p className="text-2xl font-black text-foreground tracking-tighter">{value}</p>
        <span className={`text-[10px] font-black uppercase tracking-widest ${trend.startsWith('+') ? 'text-success' : 'text-critical'}`}>{trend}</span>
      </div>
    </div>
  </div>
);

const PipelineColumn = ({ title, leads }: { title: string, leads: any[] }) => (
  <div className="flex-1 min-w-[200px] bg-surface-elevated/50 rounded-2xl p-3 border border-border">
    <div className="flex items-center justify-between mb-4 px-2">
      <h4 className="text-[11px] font-black text-foreground uppercase tracking-widest">{title}</h4>
      <span className="text-[10px] font-black text-muted bg-surface px-2 py-0.5 rounded-lg border border-border">{leads.length}</span>
    </div>
    <div className="space-y-3">
      {leads.map(lead => (
        <motion.div 
          key={lead.id} 
          layoutId={lead.id}
          className="bg-surface p-4 rounded-xl shadow-sm border border-border hover:border-primary/50 hover:shadow-md transition-all cursor-grab"
        >
          <div className="flex justify-between items-start mb-2">
            <h5 className="text-sm font-bold text-foreground">{lead.name}</h5>
            <button className="text-muted hover:text-foreground"><MoreVertical size={14}/></button>
          </div>
          <p className="text-xs text-muted font-medium mb-1">{lead.contact}</p>
          <p className="text-[9px] font-black uppercase tracking-widest text-muted mb-3 flex items-center gap-1">
             <Users size={10} /> {lead.assignee}
          </p>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
             <span className="text-xs font-black text-success">{lead.value}</span>
             <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-muted">
               <Brain size={12} className={lead.score >= 90 ? 'text-primary' : 'text-warning'}/>
               {lead.score}
             </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const ActionBtn = ({ icon: Icon, label, color, bg, border }: any) => (
  <button className="flex flex-col items-center justify-center p-4 rounded-2xl border border-border hover:bg-surface-elevated transition-colors group text-center gap-2">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${border} ${bg} ${color} group-hover:scale-110 transition-transform`}>
      <Icon size={20} />
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest text-muted group-hover:text-foreground leading-tight transition-colors">{label}</span>
  </button>
);
