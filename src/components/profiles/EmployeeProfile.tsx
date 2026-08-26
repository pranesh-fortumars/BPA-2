import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Briefcase, Calendar, Clock, Award, Shield } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { DataService } from '../../lib/db';

export const EmployeeProfile = ({ employeeId }: { employeeId: string }) => {
  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    const loadProfile = async () => {
      let storedEmployees = await DataService.getAll<any>('employee_profiles');
      if (storedEmployees.length === 0) {
         const initial = {
            id: employeeId || 'EMP-001',
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
         await DataService.save('employee_profiles', initial);
         storedEmployees = [initial];
      }
      
      const found = storedEmployees.find((e: any) => e.id === employeeId) || storedEmployees[0];
      setEmployee(found);
    };
    loadProfile();
  }, [employeeId]);

  if (!employee) return null;

  return (
    <div className="space-y-6 text-foreground">
      <GlassCard className="p-8 bg-surface border border-border shadow-sm">
         <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-4xl font-black shrink-0 shadow-inner">
               {employee.name.charAt(0)}
            </div>
            
            <div className="flex-1">
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <h2 className="text-3xl font-black text-foreground tracking-tight">{employee.name}</h2>
                     <p className="text-sm font-bold text-primary uppercase tracking-widest">{employee.role} • {employee.department}</p>
                  </div>
                  <span className="px-3 py-1 bg-success/10 text-success rounded-lg text-[10px] font-black uppercase tracking-widest border border-success/20">
                     {employee.status}
                  </span>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3 text-muted text-sm font-medium">
                     <Mail size={16} /> {employee.email}
                  </div>
                  <div className="flex items-center gap-3 text-muted text-sm font-medium">
                     <Phone size={16} /> {employee.phone}
                  </div>
                  <div className="flex items-center gap-3 text-muted text-sm font-medium">
                     <MapPin size={16} /> {employee.location}
                  </div>
                  <div className="flex items-center gap-3 text-muted text-sm font-medium">
                     <Calendar size={16} /> Joined {employee.joinDate}
                  </div>
               </div>
            </div>
         </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <GlassCard className="p-6 bg-surface border border-border lg:col-span-2 shadow-sm">
            <h3 className="text-xs font-black text-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
               <Briefcase size={16} className="text-primary" /> Workload & Capacity
            </h3>
            <div className="mb-8">
               <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-muted">Current Utilization</span>
                  <span className={employee.workload > 80 ? 'text-critical' : 'text-success'}>{employee.workload}%</span>
               </div>
               <div className="w-full bg-border rounded-full h-3 overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-1000 ${employee.workload > 80 ? 'bg-critical' : 'bg-success'}`} style={{ width: `${employee.workload}%` }}></div>
               </div>
               {employee.workload > 80 && (
                  <p className="text-[10px] text-critical mt-2 font-bold flex items-center gap-1">
                     <Shield size={12} /> High burnout risk detected. Consider delegating tasks.
                  </p>
               )}
            </div>
            
            <h3 className="text-xs font-black text-foreground uppercase tracking-widest mb-4">Core Competencies</h3>
            <div className="flex gap-2 flex-wrap">
               {employee.skills.map((skill: string) => (
                  <span key={skill} className="px-3 py-1.5 bg-surface-elevated border border-border rounded-lg text-[10px] font-black uppercase tracking-widest text-muted hover:bg-surface hover:text-foreground transition-colors cursor-default">
                     {skill}
                  </span>
               ))}
            </div>
         </GlassCard>
         
         <GlassCard className="p-6 bg-surface border border-border shadow-sm">
            <h3 className="text-xs font-black text-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
               <Clock size={16} className="text-primary" /> Recent Activity
            </h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
               {['Committed to backend repo', 'Resolved priority bug', 'Approved QA testing'].map((act, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                     <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-surface bg-surface-elevated text-muted shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                     <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] bg-surface-elevated p-3 rounded-xl border border-border shadow-sm hover:border-primary/50 transition-colors">
                        <p className="text-xs font-bold text-foreground">{act}</p>
                        <p className="text-[9px] text-muted mt-1 uppercase tracking-widest">{i + 1}h ago</p>
                     </div>
                  </div>
               ))}
            </div>
         </GlassCard>
      </div>
    </div>
  );
};
