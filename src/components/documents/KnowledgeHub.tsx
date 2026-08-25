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
    <div className="space-y-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-elevated p-6 rounded-[2rem] shadow-sm relative overflow-hidden border border-border">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none"></div>
         <div className="relative z-10 w-full max-w-xl">
            <h2 className="text-sm font-black uppercase tracking-widest text-foreground mb-4 flex items-center gap-2">
               <Brain size={18} className="text-primary" /> Neural Search
            </h2>
            <div className="relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
               <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Ask a question or search semantically (e.g., 'How do I onboard a new client?')" 
                  className="w-full pl-11 pr-24 py-4 bg-surface border border-border rounded-2xl text-sm font-bold text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors shadow-sm"
               />
               <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-colors">
                  Ask AI
               </button>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="md:col-span-1 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-2">Categories</h3>
            <div className="space-y-2">
               {categories.map((cat, i) => (
                  <button key={i} className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors text-sm font-bold ${i === 0 ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted hover:bg-surface-elevated hover:text-foreground'}`}>
                     <span className="flex items-center gap-2">
                        {cat.icon === 'book' ? <FileText size={16}/> : <Folder size={16}/>} {cat.name}
                     </span>
                     <span className="text-[10px] font-black bg-surface px-2 py-0.5 rounded-md text-muted border border-border">{cat.count}</span>
                  </button>
               ))}
            </div>
         </div>

         <div className="md:col-span-3">
            <GlassCard className="p-0 bg-surface border border-border overflow-hidden shadow-sm">
               <div className="p-4 border-b border-border flex items-center justify-between bg-surface-elevated">
                  <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Recent Documents</h3>
                  <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-colors shadow-sm shadow-primary/20">
                     <Plus size={14}/> New Doc
                  </button>
               </div>
               <div className="divide-y divide-border">
                  {documents.map((doc, i) => (
                     <div key={i} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-elevated transition-colors group cursor-pointer">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                              <FileText size={20} />
                           </div>
                           <div>
                              <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{doc.title}</h4>
                              <div className="flex items-center gap-3 mt-1">
                                 <span className="text-[10px] font-black uppercase tracking-widest text-muted bg-surface-elevated border border-border px-2 py-0.5 rounded-md">{doc.category}</span>
                                 <span className="text-[10px] font-bold text-muted flex items-center gap-1"><Clock size={12}/> {doc.updated}</span>
                                 <span className="text-[10px] font-bold text-muted">v{doc.version}</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="flex items-center gap-2 text-[10px] font-bold text-muted hidden md:flex">
                              <div className="w-6 h-6 rounded-full border border-border bg-surface-elevated flex items-center justify-center text-[10px] font-bold text-foreground">{doc.author.charAt(0)}</div>
                              <span>{doc.author}</span>
                           </div>
                           <button className="w-8 h-8 rounded-lg bg-surface border border-border text-muted flex items-center justify-center hover:bg-surface-elevated hover:text-primary transition-colors">
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
