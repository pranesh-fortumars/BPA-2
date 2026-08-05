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
  Video
} from 'lucide-react';

export const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState('recruitment'); // recruitment, onboarding, lms

  return (
    <div className="space-y-6">
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
          {activeTab === 'recruitment' && <RecruitmentView />}
          {activeTab === 'onboarding' && <OnboardingView />}
          {activeTab === 'lms' && <LMSView />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* --- TAB COMPONENTS --- */

const RecruitmentView = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Active Candidates</h3>
          <p className="text-[10px] font-bold text-slate-500 mt-1">Senior Frontend Engineer Role</p>
        </div>
        <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-colors">
          Parse New Resumes
        </button>
      </div>
      
      <div className="space-y-4">
        <CandidateRow name="Alex Johnson" exp="6 Yrs" match={94} status="Interview 2" />
        <CandidateRow name="Maria Garcia" exp="8 Yrs" match={88} status="Technical Test" />
        <CandidateRow name="David Chen" exp="4 Yrs" match={76} status="Screening" />
        <CandidateRow name="Sarah Miller" exp="5 Yrs" match={65} status="Rejected" />
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
