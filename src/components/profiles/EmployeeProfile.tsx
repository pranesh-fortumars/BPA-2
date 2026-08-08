import React from 'react';
import { Mail, Phone, MapPin, Briefcase, Calendar, Clock, Award, Shield } from 'lucide-react';
import { GlassCard } from '../GlassCard';

export const EmployeeProfile = ({ employeeId }: { employeeId: string }) => {
  // In a real scenario, this would fetch from DataService.getAll('employees') filtering by employeeId
  const mockEmployee = {
    id: employeeId,
    name: 'Sarah Jenkins',
    role: 'Senior Developer',
    department: 'Engineering',
    manager: 'Praneeth K.',
    joinDate: '12 Jan 2024',
    email: 'sarah.j@bpa-pro.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, IN',
    skills: ['React', 'Node.js', 'System Design'],
    workload: 85,
    status: 'Active'
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-8 bg-white border border-slate-200">
         <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 rounded-3xl bg-violet-100 flex items-center justify-center text-violet-600 text-4xl font-black shrink-0">
               {mockEmployee.name.charAt(0)}
            </div>
            
            <div className="flex-1">
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <h2 className="text-3xl font-black text-slate-900 tracking-tight">{mockEmployee.name}</h2>
                     <p className="text-sm font-bold text-violet-600 uppercase tracking-widest">{mockEmployee.role} • {mockEmployee.department}</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                     {mockEmployee.status}
                  </span>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                     <Mail size={16} className="text-slate-400" /> {mockEmployee.email}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                     <Phone size={16} className="text-slate-400" /> {mockEmployee.phone}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                     <MapPin size={16} className="text-slate-400" /> {mockEmployee.location}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                     <Calendar size={16} className="text-slate-400" /> Joined {mockEmployee.joinDate}
                  </div>
               </div>
            </div>
         </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <GlassCard className="p-6 bg-white border border-slate-200 lg:col-span-2">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
               <Briefcase size={16} className="text-violet-600" /> Workload & Capacity
            </h3>
            <div className="mb-8">
               <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-600">Current Utilization</span>
                  <span className={mockEmployee.workload > 80 ? 'text-rose-600' : 'text-emerald-600'}>{mockEmployee.workload}%</span>
               </div>
               <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-1000 ${mockEmployee.workload > 80 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${mockEmployee.workload}%` }}></div>
               </div>
               {mockEmployee.workload > 80 && (
                  <p className="text-[10px] text-rose-500 mt-2 font-bold flex items-center gap-1">
                     <Shield size={12} /> High burnout risk detected. Consider delegating tasks.
                  </p>
               )}
            </div>
            
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">Core Competencies</h3>
            <div className="flex gap-2 flex-wrap">
               {mockEmployee.skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-600">
                     {skill}
                  </span>
               ))}
            </div>
         </GlassCard>
         
         <GlassCard className="p-6 bg-white border border-slate-200">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
               <Clock size={16} className="text-violet-600" /> Recent Activity
            </h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
               {['Committed to backend repo', 'Resolved priority bug', 'Approved QA testing'].map((act, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                     <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-slate-200 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                     <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                        <p className="text-xs font-bold text-slate-700">{act}</p>
                        <p className="text-[9px] text-slate-400 mt-1 uppercase tracking-widest">{i + 1}h ago</p>
                     </div>
                  </div>
               ))}
            </div>
         </GlassCard>
      </div>
    </div>
  );
};
