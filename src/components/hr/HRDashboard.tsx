import React, { useState } from 'react';
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
  const [showModal, setShowModal] = useState(false);
  const [newCandidate, setNewCandidate] = useState({ name: '', exp: '', match: 85, status: 'Screening' });

  React.useEffect(() => {
    const loadCandidates = async () => {
      let storedCandidates = await DataService.getAll<any>('candidates');
      if (storedCandidates.length === 0) {
        const initial = [
          { id: '1', name: 'Alex Johnson', exp: '6 Yrs', match: 94, status: 'Interview 2' },
          { id: '2', name: 'Maria Garcia', exp: '8 Yrs', match: 88, status: 'Technical Test' },
          { id: '3', name: 'David Chen', exp: '4 Yrs', match: 76, status: 'Screening' },
          { id: '4', name: 'Sarah Miller', exp: '5 Yrs', match: 65, status: 'Rejected' }
        ];
        for (const c of initial) await DataService.save('candidates', c);
        storedCandidates = initial;
      }
      setCandidates(storedCandidates);
    };
    loadCandidates();
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
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
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
          {activeTab === 'onboarding' && <OnboardingView />}
          {activeTab === 'lms' && <LMSView />}
        </motion.div>
      </AnimatePresence>

      {/* New Candidate Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900">Add Candidate</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-900 transition-colors"><X size={24}/></button>
            </div>
            
            <form onSubmit={handleAddCandidate} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Candidate Name</label>
                <input required value={newCandidate.name} onChange={e => setNewCandidate({...newCandidate, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Years of Experience</label>
                <input required type="number" value={newCandidate.exp} onChange={e => setNewCandidate({...newCandidate, exp: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. 5" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">AI Match Score (%)</label>
                <input required type="number" value={newCandidate.match} onChange={e => setNewCandidate({...newCandidate, match: Number(e.target.value)})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. 85" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Initial Status</label>
                <select value={newCandidate.status} onChange={e => setNewCandidate({...newCandidate, status: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-violet-500 transition-colors">
                  <option value="Screening">Screening</option>
                  <option value="Technical Test">Technical Test</option>
                  <option value="Interview 2">Interview 2</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              
              <button type="submit" className="w-full mt-6 py-4 bg-violet-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-violet-700 transition-colors shadow-xl shadow-violet-600/20 active:scale-95">
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
    <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Active Candidates</h3>
          <p className="text-[10px] font-bold text-slate-500 mt-1">Senior Frontend Engineer Role</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-colors">
            <Plus size={14}/> Add Candidate
          </button>
          <button className="px-4 py-2 bg-white text-slate-900 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">
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

    <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/30 blur-[60px] rounded-full pointer-events-none"></div>
      <div>
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-100 mb-6 flex items-center gap-2 relative z-10">
           <BrainCircuit size={18} className="text-violet-400"/> AI Resume Screening
        </h3>
        
        <div className="space-y-4 relative z-10">
           <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-2">Insight: Alex Johnson</p>
              <p className="text-xs font-bold text-slate-300 leading-relaxed">
                "Strong match for React and TypeScript. Lacks deep experience in WebGL as requested, but shows high adaptability score based on past role transitions."
              </p>
           </div>
           
           <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Automated Action</p>
              <p className="text-xs font-bold text-slate-300 leading-relaxed">
                Sent technical assessment link to 4 candidates scoring above 85% match rate.
              </p>
           </div>
        </div>
      </div>
      <button className="w-full mt-6 py-3 bg-violet-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-500 transition-colors relative z-10">
        Review Full Analysis
      </button>
    </div>
  </div>
);

const OnboardingView = () => (
  <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">Employee Onboarding Pipeline</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       <OnboardingCard name="Jessica Alba" role="Product Manager" progress={80} nextTask="Security Compliance Training" />
       <OnboardingCard name="Tom Holland" role="Junior Developer" progress={45} nextTask="Hardware Setup Form" />
       <OnboardingCard name="Zendaya" role="UX Designer" progress={10} nextTask="Sign Offer Letter" />
    </div>
  </div>
);

const LMSView = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">Active Learning Paths</h3>
        <div className="space-y-4">
           <CourseRow title="Enterprise React Patterns" enrolled={42} rating="4.9" modules={12} />
           <CourseRow title="AI Prompt Engineering 101" enrolled={128} rating="4.7" modules={8} />
           <CourseRow title="Cloud Architecture Fundamentals" enrolled={36} rating="4.8" modules={15} />
        </div>
      </div>
    </div>
    
    <div className="space-y-6">
      <div className="bg-emerald-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/30 blur-[60px] rounded-full pointer-events-none"></div>
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-100 mb-6 flex items-center gap-2 relative z-10">
           <Video size={18} className="text-emerald-400"/> Mock Interviews
        </h3>
        <div className="space-y-4 relative z-10">
           <div className="p-4 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-between">
              <div>
                 <p className="text-xs font-bold text-white mb-1">System Design Test</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Scheduled: 2 PM</p>
              </div>
              <button className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                 <Video size={14}/>
              </button>
           </div>
           <p className="text-[10px] font-bold text-slate-300 italic">AI evaluates posture, confidence, and technical accuracy in real-time.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
         <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Certifications Issued</h3>
         <div className="flex items-center gap-4 text-3xl font-black text-slate-900 tracking-tighter">
            <Award className="text-amber-500" size={32}/>
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
    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${active ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}
  >
    <Icon size={16} /> {label}
  </button>
);

const CandidateRow = ({ name, exp, match, status }: any) => (
  <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors group">
    <div className="flex items-center gap-4">
       <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-black text-slate-600 shadow-sm">
         {name.charAt(0)}
       </div>
       <div>
         <p className="text-sm font-bold text-slate-900 group-hover:text-violet-600 transition-colors">{name}</p>
         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">{exp} Experience</p>
       </div>
    </div>
    <div className="flex items-center gap-8">
       <div className="text-right">
         <p className="text-sm font-black text-slate-900 flex items-center gap-1 justify-end">
           <Star size={14} className={match >= 90 ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}/> {match}%
         </p>
         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">AI Match</p>
       </div>
       <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg w-28 text-center ${status === 'Rejected' ? 'bg-rose-50 text-rose-600' : status === 'Interview 2' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
         {status}
       </span>
    </div>
  </div>
);

const OnboardingCard = ({ name, role, progress, nextTask }: any) => (
  <div className="p-5 border border-slate-100 rounded-2xl hover:shadow-md transition-shadow">
     <h4 className="text-sm font-bold text-slate-900">{name}</h4>
     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1 mb-4">{role}</p>
     
     <div className="flex justify-between items-center mb-2">
       <span className="text-[10px] font-bold text-slate-500">Progress</span>
       <span className="text-[10px] font-black text-violet-600">{progress}%</span>
     </div>
     <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
       <motion.div 
         initial={{ width: 0 }}
         animate={{ width: `${progress}%` }}
         transition={{ duration: 1 }}
         className="h-full bg-violet-500 rounded-full"
       ></motion.div>
     </div>
     
     <div className="pt-4 border-t border-slate-100">
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Up Next</p>
        <p className="text-xs font-bold text-slate-700 flex items-center gap-2">
           <Calendar size={12} className="text-violet-500"/> {nextTask}
        </p>
     </div>
  </div>
);

const CourseRow = ({ title, enrolled, rating, modules }: any) => (
  <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
     <div>
        <p className="text-sm font-bold text-slate-900">{title}</p>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{modules} Modules</p>
     </div>
     <div className="flex items-center gap-6">
        <div className="text-right">
           <p className="text-sm font-black text-slate-900">{enrolled}</p>
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Enrolled</p>
        </div>
        <div className="text-right">
           <p className="text-sm font-black text-slate-900 flex items-center justify-end gap-1">
              <Star size={12} className="text-amber-500 fill-amber-500"/> {rating}
           </p>
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Rating</p>
        </div>
     </div>
  </div>
);
