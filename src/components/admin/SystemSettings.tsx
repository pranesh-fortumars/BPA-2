import React, { useState } from 'react';
import { Settings, ShieldCheck, Palette, Bell, Globe, Database, Save, Key, UserCheck, Smartphone } from 'lucide-react';
import { GlassCard } from '../GlassCard';

export const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('branding');

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Settings Navigation */}
      <div className="w-full md:w-64 shrink-0 space-y-2">
         <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 px-4">Global Configuration</h3>
         
         <SettingsTab active={activeTab === 'branding'} onClick={() => setActiveTab('branding')} icon={Palette} label="White-Label Branding" />
         <SettingsTab active={activeTab === 'security'} onClick={() => setActiveTab('security')} icon={ShieldCheck} label="Security & Access" />
         <SettingsTab active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} icon={Bell} label="Notification Rules" />
         <SettingsTab active={activeTab === 'regional'} onClick={() => setActiveTab('regional')} icon={Globe} label="Regional Settings" />
         <SettingsTab active={activeTab === 'database'} onClick={() => setActiveTab('database')} icon={Database} label="Data Management" />
      </div>

      {/* Settings Content */}
      <div className="flex-1 space-y-6">
         {activeTab === 'branding' && <BrandingSettings />}
         {activeTab === 'security' && <PlaceholderSettings title="Security & Access" icon={ShieldCheck} />}
         {activeTab === 'notifications' && <PlaceholderSettings title="Notification Rules" icon={Bell} />}
         {activeTab === 'regional' && <PlaceholderSettings title="Regional Settings" icon={Globe} />}
         {activeTab === 'database' && <PlaceholderSettings title="Data Management" icon={Database} />}
      </div>
    </div>
  );
};

/* --- TABS --- */

const BrandingSettings = () => (
   <GlassCard className="p-0 bg-white border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
         <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">White-Label Branding</h3>
            <p className="text-xs font-bold text-slate-500 mt-1">Customize the platform appearance for your clients and team.</p>
         </div>
         <button className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-violet-700 transition-colors shadow-xl shadow-violet-600/20">
            <Save size={16}/> Save Changes
         </button>
      </div>

      <div className="p-8 space-y-8">
         {/* Logo Section */}
         <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Agency Logo</h4>
            <div className="flex items-center gap-6">
               <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400 hover:border-violet-400 hover:bg-violet-50 transition-colors cursor-pointer">
                  <Palette size={24} className="mb-2"/>
                  <span className="text-[10px] font-bold">Upload</span>
               </div>
               <div>
                  <p className="text-sm font-bold text-slate-900 mb-1">Upload a high-res SVG or PNG</p>
                  <p className="text-xs text-slate-500 mb-4">Recommended size: 512x512px. Transparent background.</p>
                  <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-colors">
                     Choose File
                  </button>
               </div>
            </div>
         </div>

         <hr className="border-slate-100" />

         {/* Theme Colors */}
         <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Brand Colors</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Primary Color (Buttons, Links)</label>
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-violet-600 shadow-inner"></div>
                     <input type="text" defaultValue="#7C3AED" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-violet-500 font-mono" />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Accent Color (Highlights)</label>
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-emerald-500 shadow-inner"></div>
                     <input type="text" defaultValue="#10B981" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-violet-500 font-mono" />
                  </div>
               </div>
            </div>
         </div>

         <hr className="border-slate-100" />

         {/* Company Details */}
         <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Company Identity</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Agency Name</label>
                  <input type="text" defaultValue="BPA PRO Agency" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-violet-500" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Support Email</label>
                  <input type="email" defaultValue="support@agency.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-violet-500" />
               </div>
               <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-700">Custom Domain</label>
                  <div className="flex items-center">
                     <span className="px-4 py-3 bg-slate-100 border border-slate-200 border-r-0 rounded-l-xl text-sm font-bold text-slate-500">https://</span>
                     <input type="text" defaultValue="portal.myagency.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-r-xl text-sm font-bold focus:outline-none focus:border-violet-500" />
                  </div>
               </div>
            </div>
         </div>
         
         <hr className="border-slate-100" />

         {/* Feature Toggles */}
         <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Portal Features</h4>
            <div className="space-y-3">
               <ToggleRow label="Enable Client Portal Access" description="Allow clients to log in and view project progress." enabled={true} />
               <ToggleRow label="Show Invoices to Clients" description="Display billing and invoice history in the portal." enabled={true} />
               <ToggleRow label="Enable Support Ticketing" description="Allow clients to submit helpdesk tickets." enabled={false} />
            </div>
         </div>
      </div>
   </GlassCard>
);

const PlaceholderSettings = ({ title, icon: Icon }: any) => (
   <GlassCard className="p-12 bg-white border border-slate-200 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mb-6">
         <Icon size={40} />
      </div>
      <h3 className="text-lg font-black text-slate-900 mb-2">{title} Configuration</h3>
      <p className="text-sm font-bold text-slate-500 max-w-sm">This module is currently being provisioned. Settings will be available in the next deployment cycle.</p>
   </GlassCard>
);

/* --- UTILS --- */

const SettingsTab = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${active ? 'bg-violet-600 text-white shadow-xl shadow-violet-600/20 font-bold' : 'text-slate-600 font-bold hover:bg-slate-50'}`}
  >
    <Icon size={18} className={active ? 'text-white' : 'text-slate-400'}/> {label}
  </button>
);

const ToggleRow = ({ label, description, enabled }: any) => {
   const [isOn, setIsOn] = useState(enabled);
   
   return (
      <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setIsOn(!isOn)}>
         <div>
            <h5 className="text-sm font-bold text-slate-900">{label}</h5>
            <p className="text-[10px] font-bold text-slate-500 mt-0.5">{description}</p>
         </div>
         <div className={`w-12 h-6 rounded-full p-1 transition-colors ${isOn ? 'bg-emerald-500' : 'bg-slate-300'}`}>
            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isOn ? 'translate-x-6' : 'translate-x-0'}`}></div>
         </div>
      </div>
   );
};
