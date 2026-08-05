import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  FileText, 
  Sparkles, 
  Folder, 
  BookOpen, 
  FileCode2, 
  MoreVertical,
  Clock,
  ArrowRight,
  Plus,
  X
} from 'lucide-react';
import { DataService } from '../../lib/db';

export const KnowledgeHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [documents, setDocuments] = useState<any[]>([]);
  const [newDoc, setNewDoc] = useState({ title: '', type: 'Wiki', emoji: '📄' });

  React.useEffect(() => {
    const loadDocs = async () => {
      let stored = await DataService.getAll<any>('documents');
      if (stored.length === 0) {
        const initialDocs = [
          { id: '1', title: 'Q4 Marketing Strategy', type: 'Wiki', date: '2 hours ago', emoji: '🚀' },
          { id: '2', title: 'Frontend Architecture Guidelines', type: 'Tech', date: '1 day ago', emoji: '⚛️' },
          { id: '3', title: 'Client Onboarding SOP', type: 'SOP', date: '3 days ago', emoji: '🤝' },
          { id: '4', title: 'Design System Tokens v2', type: 'Tech', date: '1 week ago', emoji: '🎨' },
          { id: '5', title: 'Expense Reimbursement Policy', type: 'SOP', date: '2 weeks ago', emoji: '💰' },
          { id: '6', title: 'All-Hands Meeting Notes (Oct)', type: 'Wiki', date: '3 weeks ago', emoji: '🎙️' }
        ];
        for (const doc of initialDocs) await DataService.save('documents', doc);
        stored = initialDocs;
      }
      setDocuments(stored.reverse());
    };
    loadDocs();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
    }
  };

  const handleAddDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    const doc = {
      id: Date.now().toString(),
      title: newDoc.title,
      type: newDoc.type,
      date: 'Just now',
      emoji: newDoc.emoji
    };
    await DataService.save('documents', doc);
    setDocuments([doc, ...documents]);
    setShowModal(false);
    setNewDoc({ title: '', type: 'Wiki', emoji: '📄' });
  };

  return (
    <div className="space-y-8">
      {/* AI Semantic Search */}
      <div className="relative z-20">
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 rounded-3xl blur-md opacity-25"></div>
        <form onSubmit={handleSearch} className="relative bg-white rounded-3xl shadow-xl flex items-center p-2 border border-white/50">
           <div className="pl-6 text-violet-500">
              <Sparkles size={24} />
           </div>
           <input 
             type="text"
             value={searchQuery}
             onChange={(e) => {
               setSearchQuery(e.target.value);
               if (e.target.value === '') setIsSearching(false);
             }}
             placeholder="Ask the AI about any company policy, API, or project..."
             className="w-full bg-transparent border-none outline-none px-4 py-4 text-slate-800 font-bold placeholder:text-slate-400 placeholder:font-medium"
           />
           <button type="submit" className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-md">
             Search
           </button>
        </form>
      </div>

      <AnimatePresence mode="wait">
        {isSearching ? (
          <motion.div 
            key="search-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden border border-slate-700"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 blur-[100px] rounded-full pointer-events-none"></div>
            
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
               <Sparkles size={16} className="text-violet-400"/> AI Synthesized Answer
            </h3>
            
            <p className="text-lg font-medium leading-relaxed text-slate-100 mb-8">
              Based on the <span className="text-violet-400">Employee Handbook (v3)</span> and the <span className="text-emerald-400">2026 Remote Work Policy</span>, employees are allowed to work fully remote for up to 30 days per calendar year without special approval. For periods exceeding 30 days, a formal request must be submitted via the HR portal at least 2 weeks in advance.
            </p>
            
            <div className="pt-6 border-t border-slate-800">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Referenced Documents</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DocumentRef title="Remote Work Policy 2026" type="SOP" match="98%" />
                  <DocumentRef title="Global Employee Handbook" type="Wiki" match="85%" />
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Document Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CategoryCard title="Company Wikis" icon={BookOpen} count={42} color="text-blue-500" bg="bg-blue-50" border="border-blue-100" />
              <CategoryCard title="Standard Operating Procs" icon={FileText} count={128} color="text-amber-500" bg="bg-amber-50" border="border-amber-100" />
              <CategoryCard title="Engineering & APIs" icon={FileCode2} count={84} color="text-emerald-500" bg="bg-emerald-50" border="border-emerald-100" />
            </div>

            {/* Notion-style Document Grid */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-lg font-black text-slate-900 tracking-tight">Recent Documents</h3>
                 <div className="flex items-center gap-3">
                   <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-colors shadow-lg shadow-violet-600/20 active:scale-95">
                     <Plus size={14} /> Upload
                   </button>
                   <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-widest transition-colors">
                     View All <ArrowRight size={14} />
                   </button>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {documents.map((doc: any) => (
                    <DocCard key={doc.id} title={doc.title} type={doc.type} date={doc.date} emoji={doc.emoji} />
                 ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Document Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900">Upload Document</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-900 transition-colors"><X size={24}/></button>
            </div>
            
            <form onSubmit={handleAddDoc} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Document Title</label>
                <input required value={newDoc.title} onChange={e => setNewDoc({...newDoc, title: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. Q1 Marketing Plan" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Document Type</label>
                <select value={newDoc.type} onChange={e => setNewDoc({...newDoc, type: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-violet-500 transition-colors">
                  <option value="Wiki">Wiki / Notes</option>
                  <option value="SOP">Standard Operating Procedure</option>
                  <option value="Tech">Technical Spec</option>
                  <option value="Policy">Company Policy</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Icon Emoji</label>
                <input required value={newDoc.emoji} onChange={e => setNewDoc({...newDoc, emoji: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-violet-500 transition-colors" placeholder="🚀" />
              </div>
              
              <button type="submit" className="w-full mt-6 py-4 bg-violet-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-violet-700 transition-colors shadow-xl shadow-violet-600/20 active:scale-95">
                Save Document
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

/* --- SUB COMPONENTS --- */

const CategoryCard = ({ title, icon: Icon, count, color, bg, border }: any) => (
  <div className={`p-6 rounded-3xl border shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white ${border}`}>
     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${bg} ${color}`}>
        <Icon size={24} />
     </div>
     <h4 className="text-sm font-bold text-slate-900 mb-1">{title}</h4>
     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{count} Documents</p>
  </div>
);

const DocCard = ({ title, type, date, emoji }: any) => (
  <div className="p-4 rounded-2xl border border-slate-100 hover:border-violet-300 hover:shadow-md transition-all cursor-pointer group bg-slate-50/50 hover:bg-white flex flex-col justify-between min-h-[140px]">
     <div className="flex items-start justify-between">
        <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform origin-bottom-left">{emoji}</span>
        <button className="text-slate-300 hover:text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
           <MoreVertical size={16} />
        </button>
     </div>
     <div>
        <h4 className="text-sm font-bold text-slate-900 leading-tight mb-2 group-hover:text-violet-600 transition-colors line-clamp-2">{title}</h4>
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
           <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-sm"><Folder size={10} /> {type}</span>
           <span className="flex items-center gap-1"><Clock size={10} /> {date}</span>
        </div>
     </div>
  </div>
);

const DocumentRef = ({ title, type, match }: any) => (
  <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
     <div className="flex items-center gap-3">
        <FileText size={16} className="text-slate-400" />
        <div>
           <p className="text-xs font-bold text-slate-200">{title}</p>
           <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-0.5">{type}</p>
        </div>
     </div>
     <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-violet-500/20 text-violet-300 rounded-lg border border-violet-500/20">
        {match} Match
     </span>
  </div>
);
