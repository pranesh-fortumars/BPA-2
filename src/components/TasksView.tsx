import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  User, 
  MoreVertical,
  Filter,
  Search,
  Plus,
  LayoutGrid,
  List,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  Trash2,
  CheckCircle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { DataService } from '../lib/db';

const initialTasks = [
  { id: '1', title: 'Invoice Approval: HR Q1 Benefits', dept: 'HR', status: 'Pending', priority: 'High', delay: '2h overdue', assignee: 'Praneeth K.' },
  { id: '2', title: 'Vendor Onboarding: TechStack Inc', dept: 'Ops', status: 'In Review', priority: 'Medium', delay: '4h remaining', assignee: 'Praneeth K.' },
  { id: '3', title: 'Audit Log: Finance Review v2.1', dept: 'Finance', status: 'Blocked', priority: 'Critical', delay: 'AI Alert: Delay Expected', assignee: 'Praneeth K.' },
  { id: '4', title: 'Onboarding: Sarah J. (Dev)', dept: 'HR', status: 'Pending', priority: 'Medium', delay: '1d remaining', assignee: 'Praneeth K.' },
  { id: '5', title: 'Procurement: Laptops (Batch 4)', dept: 'Ops', status: 'Approved', priority: 'Low', delay: 'Completed', assignee: 'Praneeth K.' },
];

export const TasksView = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('My Tasks');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', dept: 'Ops', priority: 'Medium' });

  React.useEffect(() => {
    const loadTasks = async () => {
      let stored = await DataService.getAll<any>('tasks');
      if (stored.length === 0) {
        for (const t of initialTasks) await DataService.save('tasks', t);
        stored = initialTasks;
      }
      setTasks(stored);
    };
    loadTasks();
  }, []);

  const filteredTasks = useMemo(() => {
     let result = tasks;
     if (activeTab !== 'My Tasks' && activeTab !== 'Archive') {
       result = tasks.filter(t => t.dept.toLowerCase() === activeTab.replace(' Queue', '').toLowerCase());
     }
     if (searchQuery) {
       result = result.filter(t => 
         t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
         t.dept.toLowerCase().includes(searchQuery.toLowerCase())
       );
     }
     return result;
  }, [tasks, activeTab, searchQuery]);

  const completeTask = async (id: string) => {
     await DataService.delete('tasks', id);
     setTasks(prev => prev.filter(t => t.id !== id));
  };

  const addTask = async (e: React.FormEvent) => {
     e.preventDefault();
     const task = {
       id: Date.now().toString(),
       title: newTask.title,
       dept: newTask.dept,
       status: 'Pending',
       priority: newTask.priority,
       delay: 'Just Arrival',
       assignee: 'Current User'
     };
     await DataService.save('tasks', task);
     setTasks(prev => [task, ...prev]);
     setShowModal(false);
     setNewTask({ title: '', dept: 'Ops', priority: 'Medium' });
  };

  return (
    <div className="space-y-6 text-foreground">
      {/* Filtering and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-surface p-5 rounded-2xl border border-border shadow-sm gap-4">
        <div className="flex bg-surface-elevated p-1 rounded-xl border border-border whitespace-nowrap overflow-x-auto no-scrollbar">
           {['My Tasks', 'HR Queue', 'Finance Queue', 'Ops Queue', 'Archive'].map((tab) => (
             <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === tab ? 'bg-surface text-primary shadow-md border border-border translate-y-[-1px]' : 'text-muted hover:text-foreground'}`}
             >
               {tab}
             </button>
           ))}
        </div>

        <div className="flex items-center gap-3">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
              <input 
                type="text" 
                placeholder="Find specific task..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-surface-elevated border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary/50 focus:bg-surface transition-all w-64 font-medium"
              />
           </div>
           <button 
             onClick={() => setShowModal(true)}
             className="flex items-center gap-2 px-6 py-3 bg-primary hover:brightness-110 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/20 transition-all active:scale-95"
           >
              <Plus size={16} /> New Process
           </button>
        </div>
      </div>

      {/* Task List / Grid & Collaboration Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-4 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassCard className="p-0 border-border bg-surface overflow-hidden hover:border-primary/30 transition-all group shadow-sm hover:shadow-xl">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className={`w-1.5 self-stretch ${task.priority === 'Critical' ? 'bg-critical' : task.priority === 'High' ? 'bg-warning' : 'bg-primary'}`}></div>
                        
                        <div className="flex-1 p-6 flex flex-col md:flex-row items-center gap-8">
                           <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                 <span className="px-2.5 py-1 rounded bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                    {task.dept}
                                 </span>
                                 <span className="text-muted text-xs font-bold leading-none">•</span>
                                 <span className={`text-[10px] font-black uppercase tracking-widest ${task.status === 'Blocked' ? 'text-critical' : 'text-foreground'}`}>
                                    {task.status}
                                 </span>
                              </div>
                              <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors truncate tracking-tight uppercase">
                                 {task.title}
                              </h3>
                           </div>

                           <div className="flex items-center gap-12 w-full md:w-auto">
                              <div className="flex flex-col items-start min-w-[120px]">
                                 <span className="text-[10px] text-muted font-black uppercase tracking-widest mb-1.5 leading-none">TIME SENSITIVITY</span>
                                 <div className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-widest ${task.delay.includes('overdue') ? 'text-critical' : task.delay.includes('AI') ? 'text-primary' : 'text-foreground'}`}>
                                    {task.delay.includes('AI') ? <ShieldAlert size={14} className="animate-pulse" /> : <Clock size={14} />}
                                    {task.delay}
                                 </div>
                              </div>

                              <div className="flex-1 md:flex-initial flex items-center justify-end gap-3">
                                 <button 
                                    onClick={() => completeTask(task.id)}
                                    className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-primary/20 whitespace-nowrap flex items-center gap-2 group/btn"
                                 >
                                    <CheckCircle size={16} /> Complete
                                 </button>
                                 <button className="p-3 rounded-xl bg-surface-elevated text-muted hover:text-foreground border border-border transition-all">
                                    <MoreVertical size={18} />
                                 </button>
                              </div>
                           </div>
                        </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-20 bg-surface rounded-[40px] border border-border border-dashed">
                 <div className="w-20 h-20 rounded-3xl bg-surface-elevated flex items-center justify-center text-primary mb-6 shadow-inner border border-border">
                    <CheckCircle2 size={32} />
                 </div>
                 <h4 className="text-2xl font-black text-foreground mb-2 uppercase tracking-tighter">Queue is Clear</h4>
                 <p className="text-muted font-medium">No tasks found matching your current filter.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Activity & Collaboration Sidebar */}
        <div className="xl:col-span-1">
           <GlassCard className="p-8 h-full border-border bg-surface sticky top-24 shadow-xl">
              <h3 className="text-[10px] font-black text-foreground uppercase tracking-widest mb-8 flex items-center gap-3">
                 <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_#6366f1]"></div>
                 Live Synchronization
              </h3>
              
              <div className="space-y-8">
                 {[
                   { user: 'Sarah J.', msg: '@Praneeth Invoice v2 check?', time: '2m', color: 'bg-success/10 text-success border border-success/20' },
                   { user: 'AI Assistant', msg: 'Bottleneck detected in HR.', time: '10m', ai: true, color: 'bg-primary/10 text-primary border border-primary/20' },
                   { user: 'Mike R.', msg: 'Approved the tech laptops.', time: '1h', color: 'bg-warning/10 text-warning border border-warning/20' }
                 ].map((chat, i) => (
                   <div key={i} className="flex gap-4 group">
                      <div className={`w-10 h-10 rounded-2xl ${chat.color} flex items-center justify-center text-xs font-black uppercase flex-shrink-0 shadow-sm`}>
                         {chat.user.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-baseline mb-1">
                            <p className="text-xs font-black text-foreground truncate">{chat.user}</p>
                            <span className="text-[9px] font-black text-muted uppercase ml-2">{chat.time} ago</span>
                         </div>
                         <p className={`text-xs ${chat.ai ? 'text-primary italic font-medium' : 'text-muted font-medium'} leading-relaxed`}>{chat.msg}</p>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                 <div className="relative">
                    <textarea 
                       placeholder="Mention @team member..." 
                       className="w-full bg-surface-elevated border border-border rounded-2xl p-4 pr-12 text-xs text-foreground focus:outline-none focus:border-primary/50 focus:bg-surface min-h-[120px] resize-none font-medium shadow-inner"
                    ></textarea>
                    <button className="absolute bottom-4 right-4 p-2.5 bg-primary rounded-xl text-primary-foreground shadow-lg shadow-primary/30 hover:scale-105 transition-all">
                       <ArrowRight size={16} />
                    </button>
                 </div>
              </div>
           </GlassCard>
        </div>
      </div>

      {/* AI Performance Insight Section */}
      <div className="mt-12 p-10 rounded-[40px] bg-surface-elevated border border-border flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
         <div className="flex gap-8 items-center relative z-10">
            <div className="w-20 h-20 rounded-[28px] bg-primary flex items-center justify-center shadow-2xl shadow-primary/30 border border-primary/20">
               <ShieldAlert size={36} className="text-primary-foreground" />
            </div>
            <div>
               <h3 className="text-2xl font-black text-foreground mb-1 uppercase tracking-tighter">Neural Optimization Active</h3>
               <p className="text-muted text-base font-medium max-w-lg leading-relaxed">Our AI has predicted 4 more tasks arriving shortly. Suggesting early delegation to optimize your workload and prevent Q3 bottlenecks.</p>
            </div>
         </div>
         <button className="px-10 py-4 bg-primary hover:brightness-110 text-primary-foreground rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary/30 transition-all active:scale-95 flex items-center gap-3 relative z-10">
            Review Recommendations <ArrowRight size={18} />
         </button>
      </div>

      {/* New Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface rounded-[2rem] p-8 max-w-md w-full shadow-2xl border border-border"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black uppercase tracking-tighter text-foreground">Create Task</h3>
              <button onClick={() => setShowModal(false)} className="text-muted hover:text-foreground transition-colors"><X size={24}/></button>
            </div>
            
            <form onSubmit={addTask} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-muted uppercase tracking-widest mb-2">Task Title</label>
                <input required value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 transition-colors" placeholder="e.g. Approve Q4 Budget" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-muted uppercase tracking-widest mb-2">Department Queue</label>
                <select value={newTask.dept} onChange={e => setNewTask({...newTask, dept: e.target.value})} className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 transition-colors">
                  <option value="Ops">Operations</option>
                  <option value="HR">Human Resources</option>
                  <option value="Finance">Finance</option>
                  <option value="Tech">Engineering</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-muted uppercase tracking-widest mb-2">Priority</label>
                <select value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value})} className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 transition-colors">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              
              <button type="submit" className="w-full mt-6 py-4 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-colors shadow-xl shadow-primary/20 active:scale-95">
                Add to Queue
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
