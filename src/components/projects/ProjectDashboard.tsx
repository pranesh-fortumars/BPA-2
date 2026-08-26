import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  AlertTriangle, 
  GitPullRequest, 
  Bug, 
  Terminal, 
  Kanban,
  BrainCircuit,
  MessageSquare,
  Clock,
  MoreVertical,
  Play,
  Plus,
  X,
  Flag,
  ArrowRight
} from 'lucide-react';
import { DataService } from '../../lib/db';

export const ProjectDashboard = () => {
  const [activeTab, setActiveTab] = useState('board'); // board, milestones, engineering, ai
  const [tasks, setTasks] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', type: 'task', priority: 'medium', status: 'To Do' });

  React.useEffect(() => {
    const loadTasks = async () => {
      let storedTasks = await DataService.getAll<any>('project_tasks');
      if (storedTasks.length === 0) {
        const initial = [
          { id: 'BPA-101', title: 'Setup Authentication Flow', type: 'task', priority: 'high', status: 'To Do' },
          { id: 'BPA-104', title: 'Design System Migration', type: 'story', priority: 'medium', status: 'To Do' },
          { id: 'BPA-102', title: 'Integrate Razorpay API', type: 'task', priority: 'critical', user: 'S', status: 'In Progress' },
          { id: 'BPA-105', title: 'Data Abstraction Layer', type: 'story', priority: 'high', user: 'J', status: 'In Progress' },
          { id: 'BPA-99', title: 'Fix Header Alignment', type: 'bug', priority: 'low', user: 'A', status: 'Code Review' },
          { id: 'BPA-95', title: 'Initialize Repository', type: 'task', priority: 'medium', status: 'Done' }
        ];
        for (const t of initial) await DataService.save('project_tasks', t);
        storedTasks = initial;
      }
      setTasks(storedTasks);
    };
    loadTasks();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const task = {
      id: `BPA-${Math.floor(Math.random() * 900) + 100}`,
      title: newTask.title,
      type: newTask.type,
      priority: newTask.priority,
      status: newTask.status,
      user: 'P' // default user
    };
    await DataService.save('project_tasks', task);
    setTasks([...tasks, task]);
    setShowModal(false);
    setNewTask({ title: '', type: 'task', priority: 'medium', status: 'To Do' });
  };

  return (
    <div className="space-y-6 relative">
      {/* Top Nav Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-surface-elevated rounded-2xl w-fit border border-border">
        <TabButton active={activeTab === 'board'} onClick={() => setActiveTab('board')} icon={Kanban} label="Sprint Board" />
        <TabButton active={activeTab === 'milestones'} onClick={() => setActiveTab('milestones')} icon={Flag} label="Milestones" />
        <TabButton active={activeTab === 'engineering'} onClick={() => setActiveTab('engineering')} icon={Terminal} label="Engineering" />
        <TabButton active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} icon={BrainCircuit} label="AI Manager" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'board' && <SprintBoard tasks={tasks} onAdd={() => setShowModal(true)} />}
          {activeTab === 'milestones' && <MilestoneTracker />}
          {activeTab === 'engineering' && <EngineeringWorkspace />}
          {activeTab === 'ai' && <AIManager />}
        </motion.div>
      </AnimatePresence>

      {/* New Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface rounded-[2rem] p-8 max-w-md w-full shadow-2xl border border-border"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black uppercase tracking-tighter text-foreground">Add Sprint Task</h3>
              <button onClick={() => setShowModal(false)} className="text-muted hover:text-foreground transition-colors"><X size={24}/></button>
            </div>
            
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-muted uppercase tracking-widest mb-2">Task Title</label>
                <input required value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 transition-colors" placeholder="e.g. Implement Webhooks" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-muted uppercase tracking-widest mb-2">Task Type</label>
                <select value={newTask.type} onChange={e => setNewTask({...newTask, type: e.target.value})} className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 transition-colors">
                  <option value="task">Task</option>
                  <option value="story">Story</option>
                  <option value="bug">Bug</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-muted uppercase tracking-widest mb-2">Priority</label>
                <select value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value})} className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 transition-colors">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-muted uppercase tracking-widest mb-2">Status</label>
                <select value={newTask.status} onChange={e => setNewTask({...newTask, status: e.target.value})} className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 transition-colors">
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Code Review">Code Review</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              
              <button type="submit" className="w-full mt-6 py-4 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-colors shadow-xl shadow-primary/20 active:scale-95">
                Save Task to Sprint
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

/* --- TAB COMPONENTS --- */

const SprintBoard = ({ tasks, onAdd }: any) => {
  const todo = tasks.filter((t: any) => t.status === 'To Do');
  const inProgress = tasks.filter((t: any) => t.status === 'In Progress');
  const review = tasks.filter((t: any) => t.status === 'Code Review');
  const done = tasks.filter((t: any) => t.status === 'Done');

  return (
    <div className="bg-surface rounded-3xl border border-border p-6 shadow-sm overflow-x-auto custom-scrollbar">
      <div className="flex items-center justify-between mb-8 min-w-[800px]">
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Sprint 42: Foundation</h3>
          <p className="text-[10px] font-bold text-muted mt-1">Oct 14 - Oct 28 • 14 days remaining</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
             <img className="w-8 h-8 rounded-full border-2 border-surface bg-surface-elevated" src="https://api.dicebear.com/7.x/avataaars/svg?seed=J" alt="Team" />
             <img className="w-8 h-8 rounded-full border-2 border-surface bg-surface-elevated" src="https://api.dicebear.com/7.x/avataaars/svg?seed=S" alt="Team" />
             <img className="w-8 h-8 rounded-full border-2 border-surface bg-surface-elevated" src="https://api.dicebear.com/7.x/avataaars/svg?seed=A" alt="Team" />
             <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-elevated flex items-center justify-center text-[9px] font-black text-foreground">+4</div>
          </div>
          <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-colors">
            <Plus size={14}/> Add Task
          </button>
          <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-colors">
            Complete Sprint
          </button>
        </div>
      </div>
      
      <div className="flex gap-4 min-w-[800px]">
        <KanbanColumn title="To Do" count={todo.length} items={todo} />
        <KanbanColumn title="In Progress" count={inProgress.length} items={inProgress} />
        <KanbanColumn title="Code Review" count={review.length} items={review} />
        <KanbanColumn title="Done" count={done.length} items={done} />
      </div>
    </div>
  );
};

const MilestoneTracker = () => {
  const milestones = [
    { id: 'M1', title: 'Foundation Architecture', status: 'Completed', progress: 100, date: 'Oct 1' },
    { id: 'M2', title: 'Core Workflows API', status: 'In Progress', progress: 65, date: 'Oct 15' },
    { id: 'M3', title: 'Client Portal MVP', status: 'Blocked', progress: 20, date: 'Oct 30' },
    { id: 'M4', title: 'Beta Launch', status: 'Not Started', progress: 0, date: 'Nov 15' },
  ];

  return (
    <div className="bg-surface rounded-3xl border border-border p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Project Milestones & Dependencies</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-surface-elevated text-muted rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-foreground transition-colors border border-border">
          <Plus size={14}/> Add Milestone
        </button>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-border before:to-transparent">
        {milestones.map((m, i) => (
          <div key={m.id} className="relative flex items-center gap-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border-2 border-surface z-10 ${m.status === 'Completed' ? 'bg-primary text-primary-foreground' : m.status === 'In Progress' ? 'bg-secondary text-secondary-foreground' : m.status === 'Blocked' ? 'bg-critical text-critical-foreground' : 'bg-surface-elevated text-muted border-border'}`}>
               <Flag size={18} />
            </div>
            
            <div className="flex-1 bg-surface-elevated border border-border p-5 rounded-2xl flex items-center justify-between shadow-sm">
               <div>
                  <h4 className="text-sm font-bold text-foreground">{m.title}</h4>
                  <div className="flex items-center gap-3 mt-2">
                     <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${m.status === 'Completed' ? 'bg-success/10 text-success border-success/20' : m.status === 'In Progress' ? 'bg-secondary/10 text-secondary border-secondary/20' : m.status === 'Blocked' ? 'bg-critical/10 text-critical border-critical/20' : 'bg-surface text-muted border-border'}`}>
                        {m.status}
                     </span>
                     <span className="text-[10px] font-bold text-muted flex items-center gap-1"><Clock size={12}/> Due {m.date}</span>
                  </div>
               </div>
               
               <div className="w-48 text-right hidden md:block">
                  <div className="flex items-center justify-between mb-1">
                     <span className="text-[10px] font-black text-muted uppercase tracking-widest">Progress</span>
                     <span className="text-xs font-bold text-foreground">{m.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                     <div className={`h-full ${m.status === 'Blocked' ? 'bg-critical' : 'bg-primary'}`} style={{ width: `${m.progress}%` }}></div>
                  </div>
               </div>
            </div>
            
            {i < milestones.length - 1 && (
               <div className="hidden lg:flex items-center text-border absolute -bottom-6 left-5 translate-x-4 z-0">
                  <ArrowRight size={14} className="rotate-90" />
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const EngineeringWorkspace = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2 space-y-6">
      {/* Code Review Queue */}
      <div className="bg-surface rounded-3xl border border-border p-6 shadow-sm">
        <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-6 flex items-center gap-2">
           <GitPullRequest size={18} className="text-primary"/> Code Review Queue
        </h3>
        <div className="space-y-3">
           <PRRow id="PR #42" title="feat: implement AI lead scoring" author="Sarah" status="changes requested" comments={4} />
           <PRRow id="PR #43" title="fix: resolve infinite loop in CRM" author="John" status="approved" comments={1} />
           <PRRow id="PR #44" title="refactor: migrate to new data layer" author="Praneeth" status="pending review" comments={0} />
        </div>
      </div>
      
      {/* Build Status */}
      <div className="bg-surface-elevated border border-border rounded-3xl p-6 text-foreground shadow-xl flex items-center justify-between relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-success/10 blur-[40px] rounded-full pointer-events-none"></div>
         <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center border border-success/30">
               <CheckCircle2 className="text-success" size={24} />
            </div>
            <div>
               <h4 className="text-sm font-bold text-foreground">Production Build Passed</h4>
               <p className="text-[10px] text-muted font-bold font-mono mt-1">bpa-pro/main • deployed 12m ago</p>
            </div>
         </div>
         <button className="px-4 py-2 bg-surface hover:brightness-110 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 border border-border relative z-10">
            <Play size={14}/> Run Pipeline
         </button>
      </div>
    </div>

    {/* Bug Tracker */}
    <div className="bg-surface rounded-3xl border border-border p-6 shadow-sm">
      <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-6 flex items-center gap-2">
         <Bug size={18} className="text-critical"/> Active Issues
      </h3>
      <div className="space-y-4">
         <BugRow id="ISSUE-88" title="Memory leak in Safari" severity="critical" />
         <BugRow id="ISSUE-92" title="404 on Client Portal login" severity="high" />
         <BugRow id="ISSUE-95" title="Tooltip overflow on mobile" severity="low" />
      </div>
    </div>
  </div>
);

const AIManager = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div className="bg-surface-elevated border border-border rounded-3xl p-8 text-foreground shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-critical/10 blur-[80px] rounded-full pointer-events-none"></div>
      
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="w-12 h-12 bg-critical/20 rounded-2xl flex items-center justify-center border border-critical/30">
          <AlertTriangle className="text-critical" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-black uppercase tracking-widest text-foreground">Predictive Alerts</h3>
          <p className="text-xs text-muted font-bold">AI Project Risk Analysis</p>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="p-4 bg-surface border border-critical/20 rounded-2xl shadow-sm">
           <div className="flex items-center justify-between mb-2">
             <span className="text-xs font-black text-critical uppercase tracking-widest">78% Probability</span>
             <span className="text-[10px] font-bold text-muted">High Risk</span>
           </div>
           <p className="text-sm font-bold text-foreground leading-snug">
             "Module 4 is likely to miss the Friday deadline due to pending Razorpay API integration."
           </p>
           <button className="mt-4 px-4 py-2 bg-critical text-critical-foreground rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-colors w-full shadow-lg shadow-critical/20">
             Suggest Mitigation Plan
           </button>
        </div>
        
        <div className="p-4 bg-surface border border-warning/30 rounded-2xl shadow-sm">
           <div className="flex items-center justify-between mb-2">
             <span className="text-xs font-black text-warning uppercase tracking-widest">Resource Conflict</span>
             <span className="text-[10px] font-bold text-muted">Medium Risk</span>
           </div>
           <p className="text-sm font-bold text-foreground leading-snug">
             "Sarah is assigned to 3 critical bugs simultaneously. Suggest reallocating ISSUE-92 to John."
           </p>
           <button className="mt-4 px-4 py-2 bg-warning text-warning-foreground rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-colors w-full shadow-lg shadow-warning/20">
             Apply Reallocation
           </button>
        </div>
      </div>
    </div>

    <div className="bg-surface rounded-3xl border border-border p-8 shadow-sm flex flex-col justify-between">
       <div>
         <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-6 flex items-center gap-2">
            <BrainCircuit size={18} className="text-primary"/> Automated Summaries
         </h3>
         <p className="text-xs font-bold text-muted mb-4 bg-surface-elevated p-4 rounded-xl border border-border italic leading-relaxed">
           "Yesterday, the engineering team completed 14 story points. The CRM dashboard was deployed successfully. 
           We are slightly behind on the Client Portal QA testing. I have rescheduled the automated test suite to run at 2 PM today."
         </p>
       </div>
       <button className="w-full py-4 bg-primary text-primary-foreground rounded-2xl text-[11px] font-black uppercase tracking-widest hover:brightness-110 transition-colors flex items-center justify-center gap-2 shadow-xl shadow-primary/20">
          Generate Weekly Client Report
       </button>
    </div>
  </div>
);

/* --- UTILS --- */

const TabButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${active ? 'bg-surface text-foreground shadow-sm border border-border' : 'text-muted hover:text-foreground hover:bg-surface-elevated'}`}
  >
    <Icon size={16} /> {label}
  </button>
);

const KanbanColumn = ({ title, count, items }: any) => (
  <div className="flex-1 min-w-[250px] bg-surface-elevated rounded-2xl p-3 border border-border">
    <div className="flex items-center justify-between mb-4 px-2">
      <h4 className="text-[11px] font-black text-muted uppercase tracking-widest">{title}</h4>
      <span className="text-[10px] font-black text-muted bg-surface px-2 py-0.5 rounded-lg border border-border shadow-sm">{count}</span>
    </div>
    <div className="space-y-3">
      {items.map((item: any) => (
        <div key={item.id} className="bg-surface p-4 rounded-xl shadow-sm border border-border hover:border-primary/50 transition-all cursor-grab">
           <div className="flex items-center justify-between mb-2">
             <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${item.type === 'bug' ? 'bg-critical/10 text-critical border-critical/20' : item.type === 'story' ? 'bg-success/10 text-success border-success/20' : 'bg-secondary/10 text-secondary border-secondary/20'}`}>{item.id}</span>
             <button className="text-muted hover:text-foreground"><MoreVertical size={14}/></button>
           </div>
           <p className="text-xs font-bold text-foreground mb-4">{item.title}</p>
           <div className="flex items-center justify-between border-t border-border pt-3">
              <span className={`w-2 h-2 rounded-full ${item.priority === 'critical' ? 'bg-critical' : item.priority === 'high' ? 'bg-warning' : item.priority === 'medium' ? 'bg-secondary' : 'bg-muted'}`}></span>
              {item.user && (
                 <div className="w-5 h-5 rounded-full bg-surface-elevated border-2 border-border flex items-center justify-center text-[8px] font-black text-muted">{item.user}</div>
              )}
           </div>
        </div>
      ))}
    </div>
  </div>
);

const PRRow = ({ id, title, author, status, comments }: any) => (
  <div className="p-3 border border-border rounded-xl bg-surface-elevated hover:border-primary/30 transition-colors flex flex-col gap-2 shadow-sm">
     <div className="flex justify-between items-start">
        <p className="text-xs font-bold text-foreground">{title}</p>
        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md whitespace-nowrap border ${status === 'approved' ? 'bg-success/10 text-success border-success/20' : status === 'changes requested' ? 'bg-critical/10 text-critical border-critical/20' : 'bg-warning/10 text-warning border-warning/20'}`}>
          {status}
        </span>
     </div>
     <div className="flex items-center justify-between text-[10px] text-muted font-bold">
        <span>{id} by {author}</span>
        <span className="flex items-center gap-1"><MessageSquare size={12}/> {comments}</span>
     </div>
  </div>
);

const BugRow = ({ id, title, severity }: any) => (
  <div className="flex justify-between items-center p-3 border border-border bg-surface-elevated rounded-xl hover:border-primary/30 transition-colors shadow-sm">
     <div>
        <p className="text-xs font-bold text-foreground">{title}</p>
        <p className="text-[9px] font-black uppercase tracking-widest text-muted mt-1">{id}</p>
     </div>
     <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${severity === 'critical' ? 'bg-critical/10 text-critical border-critical/20' : severity === 'high' ? 'bg-warning/10 text-warning border-warning/20' : 'bg-surface text-muted border-border'}`}>
       {severity}
     </span>
  </div>
);
