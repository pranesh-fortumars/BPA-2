import React, { useState } from 'react';
import { Settings, ShieldCheck, Palette, Bell, Globe, Database, Save, Key, UserCheck, Smartphone } from 'lucide-react';
import { GlassCard } from '../GlassCard';

export const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('branding');

  return (
    <div className="flex flex-col md:flex-row gap-8 font-sans">
      {/* Settings Navigation */}
      <div className="w-full md:w-64 shrink-0 space-y-2">
         <h3 className="text-[10px] font-black uppercase tracking-widest text-muted mb-4 px-4">Global Configuration</h3>
         
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
   <GlassCard className="p-0 bg-surface border border-border overflow-hidden shadow-sm">
      <div className="p-6 border-b border-border flex items-center justify-between bg-surface-elevated">
         <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-foreground">White-Label Branding</h3>
            <p className="text-xs font-bold text-muted mt-1">Customize the platform appearance for your clients and team.</p>
         </div>
         <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-colors shadow-sm shadow-primary/20">
            <Save size={16}/> Save Changes
         </button>
      </div>

      <div className="p-8 space-y-8">
         {/* Logo Section */}
         <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted">Agency Logo</h4>
            <div className="flex items-center gap-6">
               <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-border bg-surface-elevated flex flex-col items-center justify-center text-muted hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer">
                  <Palette size={24} className="mb-2"/>
                  <span className="text-[10px] font-bold">Upload</span>
               </div>
               <div>
                  <p className="text-sm font-bold text-foreground mb-1">Upload a high-res SVG or PNG</p>
                  <p className="text-xs text-muted mb-4">Recommended size: 512x512px. Transparent background.</p>
                  <button className="px-4 py-2 bg-surface-elevated text-foreground rounded-lg text-xs font-black uppercase tracking-widest hover:bg-border transition-colors border border-border">
                     Choose File
                  </button>
               </div>
            </div>
         </div>

         <hr className="border-border" />

         {/* Theme Colors */}
         <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted">Brand Colors</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground">Primary Color (Buttons, Links)</label>
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-primary shadow-inner border border-border"></div>
                     <input type="text" defaultValue="#7C3AED" className="w-full px-4 py-2 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 font-mono" />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground">Accent Color (Highlights)</label>
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-success shadow-inner border border-border"></div>
                     <input type="text" defaultValue="#10B981" className="w-full px-4 py-2 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 font-mono" />
                  </div>
               </div>
            </div>
         </div>

         <hr className="border-border" />

         {/* Company Details */}
         <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted">Company Identity</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground">Agency Name</label>
                  <input type="text" defaultValue="BPA PRO Agency" className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground">Support Email</label>
                  <input type="email" defaultValue="support@agency.com" className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50" />
               </div>
               <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-foreground">Custom Domain</label>
                  <div className="flex items-center">
                     <span className="px-4 py-3 bg-surface border border-border border-r-0 rounded-l-xl text-sm font-bold text-muted">https://</span>
                     <input type="text" defaultValue="portal.myagency.com" className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-r-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary/50" />
                  </div>
               </div>
            </div>
         </div>
         
         <hr className="border-border" />

         {/* Feature Toggles */}
         <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted">Portal Features</h4>
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
   <GlassCard className="p-12 bg-surface border border-border flex flex-col items-center justify-center text-center shadow-sm">
      <div className="w-20 h-20 bg-surface-elevated border border-border rounded-3xl flex items-center justify-center text-muted mb-6">
         <Icon size={40} />
      </div>
      <h3 className="text-lg font-black text-foreground mb-2">{title} Configuration</h3>
      <p className="text-sm font-bold text-muted max-w-sm">This module is currently being provisioned. Settings will be available in the next deployment cycle.</p>
   </GlassCard>
);

/* --- UTILS --- */

const SettingsTab = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all border ${active ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20 font-bold border-transparent' : 'bg-transparent text-muted font-bold hover:bg-surface-elevated hover:text-foreground border-transparent'}`}
  >
    <Icon size={18} className={active ? 'text-primary-foreground' : 'text-muted'}/> {label}
  </button>
);

const ToggleRow = ({ label, description, enabled }: any) => {
   const [isOn, setIsOn] = useState(enabled);
   
   return (
      <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-surface hover:bg-surface-elevated transition-colors cursor-pointer" onClick={() => setIsOn(!isOn)}>
         <div>
            <h5 className="text-sm font-bold text-foreground">{label}</h5>
            <p className="text-[10px] font-bold text-muted mt-0.5">{description}</p>
         </div>
         <div className={`w-12 h-6 rounded-full p-1 transition-colors ${isOn ? 'bg-success' : 'bg-surface-elevated border border-border'}`}>
            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isOn ? 'translate-x-6' : 'translate-x-0'}`}></div>
         </div>
      </div>
   );
};
