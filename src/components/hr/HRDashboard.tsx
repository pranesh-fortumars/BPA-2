import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  GraduationCap, 
  FileText, 
  BrainCircuit, 
  Star,
  CheckCircle2,
  Calendar,
  Award,
  Video,
  Plus,
  X
} from 'lucide-react';
import { DataService } from '../../lib/db';

export const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState('recruitment'); // recruitment, onboarding, lms
  const [candidates, setCandidates] = useState<any[]>([]);
  const [onboardingTasks, setOnboardingTasks] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newCandidate, setNewCandidate] = useState({ name: '', exp: '', match: 85, status: 'Screening' });

  useEffect(() => {
    const initializeData = async () => {
      // Candidates
      let storedCandidates = await DataService.getAll<any>('candidates');
      if (storedCandidates.length === 0) {
        const initialCandidates = [
          { id: '1', name: 'Alex Johnson', exp: '6 Yrs', match: 94, status: 'Interview 2' },
          { id: '2', name: 'Maria Garcia', exp: '8 Yrs', match: 88, status: 'Technical Test' },
          { id: '3', name: 'David Chen', exp: '4 Yrs', match: 76, status: 'Screening' },
          { id: '4', name: 'Sarah Miller', exp: '5 Yrs', match: 65, status: 'Rejected' }
        ];
        for (const c of initialCandidates) await DataService.save('candidates', c);
        storedCandidates = initialCandidates;
      }
      setCandidates(storedCandidates);

      // Onboarding
      let storedOnboarding = await DataService.getAll<any>('onboarding');
      if (storedOnboarding.length === 0) {
        const initialOnboarding = [
          { id: 'o1', name: 'Jessica Alba', role: 'Product Manager', progress: 80, nextTask: 'Security Compliance Training' },
          { id: 'o2', name: 'Tom Holland', role: 'Junior Developer', progress: 45, nextTask: 'Hardware Setup Form' },
          { id: 'o3', name: 'Zendaya', role: 'UX Designer', progress: 10, nextTask: 'Sign Offer Letter' }
        ];
        // using dynamic 'onboarding' store mapping
        for (const o of initialOnboarding) await DataService.saveRaw('onboarding', o);
        storedOnboarding = initialOnboarding;
      }
      setOnboardingTasks(storedOnboarding);

      // LMS
      let storedCourses = await DataService.getAll<any>('lms_courses');
      if (storedCourses.length === 0) {
        const initialCourses = [
          { id: 'c1', title: 'Enterprise React Patterns', enrolled: 42, rating: '4.9', modules: 12 },
          { id: 'c2', title: 'AI Prompt Engineering 101', enrolled: 128, rating: '4.7', modules: 8 },
          { id: 'c3', title: 'Cloud Architecture Fundamentals', enrolled: 36, rating: '4.8', modules: 15 }
        ];
        for (const c of initialCourses) await DataService.saveRaw('lms_courses', c);
        storedCourses = initialCourses;
      }
      setCourses(storedCourses);
    };
    initializeData();
  }, []);

  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    const candidate = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCandidate.name,
      exp: `${newCandidate.exp} Yrs`,
      match: newCandidate.match,
      status: newCandidate.status
    };
    await DataService.save('candidates', candidate);
    setCandidates([...candidates, candidate]);
    setShowModal(false);
    setNewCandidate({ name: '', exp: '', match: 85, status: 'Screening' });
  };

  return (
    <div className="space-y-6 relative">
      {/* Top Nav Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-surface-elevated rounded-2xl w-fit border border-border">
        <TabButton active={activeTab === 'recruitment'} onClick={() => setActiveTab('recruitment')} icon={Users} label="Recruitment (ATS)" />
        <TabButton active={activeTab === 'onboarding'} onClick={() => setActiveTab('onboarding')} icon={FileText} label="Onboarding" />
        <TabButton active={activeTab === 'lms'} onClick={() => setActiveTab('lms')} icon={GraduationCap} label="Learning (LMS)" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'recruitment' && <RecruitmentView candidates={candidates} onAdd={() => setShowModal(true)} />}
          {activeTab === 'onboarding' && <OnboardingView tasks={onboardingTasks} />}
          {activeTab === 'lms' && <LMSView courses={courses} />}
        </motion.div>
      </AnimatePresence>

      {/* New Candidate Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface rounded-[2rem] p-8 max-w-md w-full shadow-2xl border border-border"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black uppercase tracking-tighter text-foreground">Add Candidate</h3>
              <button onClick={() => setShowModal(false)} className="text-muted hover:text-foreground transition-colors"><X size={24}/></button>
            </div>
            
            <form onSubmit={handleAddCandidate} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-muted uppercase tracking-widest mb-2">Candidate Name</label>
                <input required value={newCandidate.name} onChange={e => setNewCandidate({...newCandidate, name: e.target.value})} className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 transition-colors" placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-muted uppercase tracking-widest mb-2">Years of Experience</label>
                <input required type="number" value={newCandidate.exp} onChange={e => setNewCandidate({...newCandidate, exp: e.target.value})} className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 transition-colors" placeholder="e.g. 5" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-muted uppercase tracking-widest mb-2">AI Match Score (%)</label>
                <input required type="number" value={newCandidate.match} onChange={e => setNewCandidate({...newCandidate, match: Number(e.target.value)})} className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 transition-colors" placeholder="e.g. 85" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-muted uppercase tracking-widest mb-2">Initial Status</label>
                <select value={newCandidate.status} onChange={e => setNewCandidate({...newCandidate, status: e.target.value})} className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 transition-colors">
                  <option value="Screening">Screening</option>
                  <option value="Technical Test">Technical Test</option>
                  <option value="Interview 2">Interview 2</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              
              <button type="submit" className="w-full mt-6 py-4 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-colors shadow-xl shadow-primary/20 active:scale-95">
                Save Candidate to Database
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

/* --- TAB COMPONENTS --- */

const RecruitmentView = ({ candidates, onAdd }: any) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2 bg-surface rounded-3xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Active Candidates</h3>
          <p className="text-[10px] font-bold text-muted mt-1">Senior Frontend Engineer Role</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-colors">
            <Plus size={14}/> Add Candidate
          </button>
          <button className="px-4 py-2 bg-surface-elevated text-foreground border border-border rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-border transition-colors">
            Parse Resumes
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {candidates.map((c: any) => (
          <CandidateRow key={c.id} name={c.name} exp={c.exp} match={c.match} status={c.status} />
        ))}
      </div>
    </div>

    <div className="bg-surface-elevated border border-border rounded-3xl p-6 text-foreground shadow-xl relative overflow-hidden flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 blur-[60px] rounded-full pointer-events-none"></div>
      <div>
        <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-6 flex items-center gap-2 relative z-10">
           <BrainCircuit size={18} className="text-primary"/> AI Resume Screening
        </h3>
        
        <div className="space-y-4 relative z-10">
           <div className="p-4 bg-surface border border-border rounded-2xl">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Insight: Alex Johnson</p>
              <p className="text-xs font-bold text-muted leading-relaxed">
                "Strong match for React and TypeScript. Lacks deep experience in WebGL as requested, but shows high adaptability score based on past role transitions."
              </p>
           </div>
           
           <div className="p-4 bg-surface border border-border rounded-2xl">
              <p className="text-[10px] font-black uppercase tracking-widest text-success mb-2">Automated Action</p>
              <p className="text-xs font-bold text-muted leading-relaxed">
                Sent technical assessment link to 4 candidates scoring above 85% match rate.
              </p>
           </div>
        </div>
      </div>
      <button className="w-full mt-6 py-3 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-colors relative z-10">
        Review Full Analysis
      </button>
    </div>
  </div>
);

const OnboardingView = ({ tasks }: { tasks: any[] }) => (
  <div className="bg-surface rounded-3xl border border-border p-6 shadow-sm">
    <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-6">Employee Onboarding Pipeline</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {tasks.map(t => (
         <OnboardingCard key={t.id} name={t.name} role={t.role} progress={t.progress} nextTask={t.nextTask} />
       ))}
    </div>
  </div>
);

const LMSView = ({ courses }: { courses: any[] }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-surface rounded-3xl border border-border p-6 shadow-sm">
        <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-6">Active Learning Paths</h3>
        <div className="space-y-4">
           {courses.map(c => (
              <CourseRow key={c.id} title={c.title} enrolled={c.enrolled} rating={c.rating} modules={c.modules} />
           ))}
        </div>
      </div>
    </div>
    
    <div className="space-y-6">
      <div className="bg-success/10 border border-success/20 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-success/20 blur-[60px] rounded-full pointer-events-none"></div>
        <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-6 flex items-center gap-2 relative z-10">
           <Video size={18} className="text-success"/> Mock Interviews
        </h3>
        <div className="space-y-4 relative z-10">
           <div className="p-4 bg-surface border border-border rounded-2xl flex items-center justify-between shadow-sm">
              <div>
                 <p className="text-xs font-bold text-foreground mb-1">System Design Test</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-success">Scheduled: 2 PM</p>
              </div>
              <button className="w-8 h-8 bg-success rounded-full flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform shadow-lg shadow-success/20">
                 <Video size={14}/>
              </button>
           </div>
           <p className="text-[10px] font-bold text-muted italic">AI evaluates posture, confidence, and technical accuracy in real-time.</p>
        </div>
      </div>
      
      <div className="bg-surface rounded-3xl border border-border p-6 shadow-sm">
         <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-4">Certifications Issued</h3>
         <div className="flex items-center gap-4 text-3xl font-black text-foreground tracking-tighter">
            <Award className="text-warning" size={32}/>
            342
         </div>
      </div>
    </div>
  </div>
);

/* --- UTILS --- */

const TabButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${active ? 'bg-surface text-foreground shadow-sm border border-border' : 'text-muted hover:text-foreground hover:bg-surface'}`}
  >
    <Icon size={16} /> {label}
  </button>
);

const CandidateRow = ({ name, exp, match, status }: any) => (
  <div className="flex items-center justify-between p-4 border border-border rounded-2xl hover:bg-surface-elevated transition-colors group">
    <div className="flex items-center gap-4">
       <div className="w-10 h-10 rounded-full bg-surface-elevated border-2 border-border flex items-center justify-center text-xs font-black text-foreground shadow-sm">
         {name.charAt(0)}
       </div>
       <div>
         <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{name}</p>
         <p className="text-[10px] font-black uppercase tracking-widest text-muted mt-0.5">{exp} Experience</p>
       </div>
    </div>
    <div className="flex items-center gap-8">
       <div className="text-right">
         <p className="text-sm font-black text-foreground flex items-center gap-1 justify-end">
           <Star size={14} className={match >= 90 ? 'text-warning fill-warning' : 'text-muted'}/> {match}%
         </p>
         <p className="text-[10px] font-black uppercase tracking-widest text-muted mt-0.5">AI Match</p>
       </div>
       <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg w-28 text-center border ${status === 'Rejected' ? 'bg-critical/10 text-critical border-critical/20' : status === 'Interview 2' ? 'bg-success/10 text-success border-success/20' : 'bg-secondary/10 text-secondary border-secondary/20'}`}>
         {status}
       </span>
    </div>
  </div>
);

const OnboardingCard = ({ name, role, progress, nextTask }: any) => (
  <div className="p-5 border border-border bg-surface-elevated rounded-2xl hover:border-primary/50 transition-all">
     <h4 className="text-sm font-bold text-foreground">{name}</h4>
     <p className="text-[10px] font-black uppercase tracking-widest text-muted mt-1 mb-4">{role}</p>
     
     <div className="flex justify-between items-center mb-2">
       <span className="text-[10px] font-bold text-muted">Progress</span>
       <span className="text-[10px] font-black text-primary">{progress}%</span>
     </div>
     <div className="h-1.5 w-full bg-border rounded-full overflow-hidden mb-4">
       <motion.div 
         initial={{ width: 0 }}
         animate={{ width: `${progress}%` }}
         transition={{ duration: 1 }}
         className="h-full bg-primary rounded-full"
       ></motion.div>
     </div>
     
     <div className="pt-4 border-t border-border">
        <p className="text-[9px] font-black uppercase tracking-widest text-muted mb-1">Up Next</p>
        <p className="text-xs font-bold text-foreground flex items-center gap-2">
           <Calendar size={12} className="text-primary"/> {nextTask}
        </p>
     </div>
  </div>
);

const CourseRow = ({ title, enrolled, rating, modules }: any) => (
  <div className="flex items-center justify-between p-4 border border-border rounded-2xl hover:bg-surface-elevated transition-colors">
     <div>
        <p className="text-sm font-bold text-foreground">{title}</p>
        <p className="text-[10px] font-black uppercase tracking-widest text-muted mt-1">{modules} Modules</p>
     </div>
     <div className="flex items-center gap-6">
        <div className="text-right">
           <p className="text-sm font-black text-foreground">{enrolled}</p>
           <p className="text-[10px] font-black uppercase tracking-widest text-muted mt-1">Enrolled</p>
        </div>
        <div className="text-right">
           <p className="text-sm font-black text-foreground flex items-center justify-end gap-1">
              <Star size={12} className="text-warning fill-warning"/> {rating}
           </p>
           <p className="text-[10px] font-black uppercase tracking-widest text-muted mt-1">Rating</p>
        </div>
     </div>
  </div>
);
