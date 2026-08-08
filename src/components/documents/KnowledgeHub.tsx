import React, { useState } from 'react';
import { FileText, Folder, Search, Plus, Brain, Clock, ChevronRight } from 'lucide-react';
import { GlassCard } from '../GlassCard';

export const KnowledgeHub = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [documents, setDocuments] = useState<any[]>([
    { id: '1', title: 'Q4 Marketing Strategy', category: 'Wiki', updated: '2 hours ago', version: '1.2', author: 'Alex' },
    { id: '2', title: 'Frontend Architecture Guidelines', category: 'Tech', updated: '1 day ago', version: '2.0', author: 'Sarah' },
    { id: '3', title: 'Client Onboarding SOP', category: 'SOP', updated: '3 days ago', version: '1.5', author: 'Mike' },
    { id: '4', title: 'Design System Tokens v2', category: 'Tech', updated: '1 week ago', version: '2.1', author: 'Alex' }
  ]);

  const categories = [
    { name: 'All Documents', count: 254, icon: 'folder' },
    { name: 'Company Wikis', count: 42, icon: 'book' },
    { name: 'Standard Operating Procs', count: 128, icon: 'file' },
    { name: 'Engineering & APIs', count: 84, icon: 'file' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-[2rem] shadow-xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 blur-[80px] rounded-full pointer-events-none"></div>
         <div className="relative z-10 w-full max-w-xl">
            <h2 className="text-sm font-black uppercase tracking-widest text-white mb-4 flex items-center gap-2">
               <Brain size={18} className="text-violet-400" /> Neural Search
            </h2>
            <div className="relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Ask a question or search semantically (e.g., 'How do I onboard a new client?')" 
                  className="w-full pl-11 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-sm font-bold text-white placeholder:text-slate-400 focus:outline-none focus:border-violet-500 transition-colors shadow-sm backdrop-blur-sm"
               />
               <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-violet-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-violet-700 transition-colors">
                  Ask AI
               </button>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="md:col-span-1 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-2">Categories</h3>
            <div className="space-y-2">
               {categories.map((cat, i) => (
                  <button key={i} className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors text-sm font-bold ${i === 0 ? 'bg-violet-50 text-violet-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                     <span className="flex items-center gap-2">
                        {cat.icon === 'book' ? <FileText size={16}/> : <Folder size={16}/>} {cat.name}
                     </span>
                     <span className="text-[10px] font-black bg-white px-2 py-0.5 rounded-md text-slate-400 border border-slate-100">{cat.count}</span>
                  </button>
               ))}
            </div>
         </div>

         <div className="md:col-span-3">
            <GlassCard className="p-0 bg-white border border-slate-200 overflow-hidden">
               <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Recent Documents</h3>
                  <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-colors">
                     <Plus size={14}/> New Doc
                  </button>
               </div>
               <div className="divide-y divide-slate-100">
                  {documents.map((doc, i) => (
                     <div key={i} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                              <FileText size={20} />
                           </div>
                           <div>
                              <h4 className="text-sm font-bold text-slate-900 group-hover:text-violet-600 transition-colors">{doc.title}</h4>
                              <div className="flex items-center gap-3 mt-1">
                                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{doc.category}</span>
                                 <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1"><Clock size={12}/> {doc.updated}</span>
                                 <span className="text-[10px] font-bold text-slate-500">v{doc.version}</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hidden md:flex">
                              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=A" className="w-6 h-6 rounded-full border border-slate-200 bg-white" alt="author" />
                              <span>{doc.author}</span>
                           </div>
                           <button className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-violet-100 hover:text-violet-600 transition-colors">
                              <ChevronRight size={16} />
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </GlassCard>
         </div>
      </div>
    </div>
  );
};
