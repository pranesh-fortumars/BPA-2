import { atom } from 'nanostores';

export type UserRole = 'CEO' | 'HR Admin' | 'Lead Engineer' | 'Sales Director' | 'Finance Manager' | 'Developer' | 'Designer' | 'Project Manager' | 'Client';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatarColor: string;
  department: string;
  permissions: string[];
}

export const mockUsers: User[] = [
  { id: 'u1', name: 'Harish', role: 'CEO', avatarColor: 'bg-violet-600', department: 'Executive', permissions: ['ALL'] },
  { id: 'u2', name: 'Sathya', role: 'HR Admin', avatarColor: 'bg-rose-500', department: 'Human Resources', permissions: ['VIEW_HR', 'EDIT_HR', 'VIEW_EMPLOYEES', 'EDIT_EMPLOYEES'] },
  { id: 'u3', name: 'Praneeth', role: 'Lead Engineer', avatarColor: 'bg-blue-600', department: 'Engineering', permissions: ['VIEW_PROJECTS', 'EDIT_PROJECTS', 'VIEW_INTEGRATIONS', 'EDIT_INTEGRATIONS'] },
  { id: 'u4', name: 'Priya', role: 'Sales Director', avatarColor: 'bg-emerald-500', department: 'Sales & CRM', permissions: ['VIEW_CRM', 'EDIT_CRM', 'VIEW_CLIENTS', 'EDIT_CLIENTS'] },
  { id: 'u5', name: 'Rahul', role: 'Finance Manager', avatarColor: 'bg-amber-500', department: 'Finance', permissions: ['VIEW_FINANCE', 'EDIT_FINANCE', 'APPROVE_INVOICES'] },
  { id: 'u6', name: 'Anita', role: 'Developer', avatarColor: 'bg-cyan-500', department: 'Engineering', permissions: ['VIEW_PROJECTS', 'EDIT_TASKS'] },
  { id: 'u7', name: 'Karthik', role: 'Designer', avatarColor: 'bg-pink-500', department: 'Design', permissions: ['VIEW_PROJECTS', 'EDIT_TASKS'] },
  { id: 'u8', name: 'Sneha', role: 'Project Manager', avatarColor: 'bg-indigo-500', department: 'Operations', permissions: ['VIEW_PROJECTS', 'EDIT_PROJECTS', 'VIEW_TASKS', 'EDIT_TASKS'] },
  { id: 'u9', name: 'Vikram', role: 'Developer', avatarColor: 'bg-blue-400', department: 'Engineering', permissions: ['VIEW_PROJECTS', 'EDIT_TASKS'] },
  { id: 'u10', name: 'Meera', role: 'HR Admin', avatarColor: 'bg-rose-400', department: 'Human Resources', permissions: ['VIEW_HR', 'EDIT_HR'] },
  { id: 'u11', name: 'Arjun', role: 'Client', avatarColor: 'bg-slate-700', department: 'External', permissions: ['VIEW_OWN_PROJECTS'] },
  { id: 'u12', name: 'Ravi', role: 'Sales Director', avatarColor: 'bg-emerald-600', department: 'Sales & CRM', permissions: ['VIEW_CRM', 'EDIT_CRM'] },
  { id: 'u13', name: 'Kavya', role: 'Designer', avatarColor: 'bg-pink-600', department: 'Design', permissions: ['VIEW_PROJECTS', 'EDIT_TASKS'] },
  { id: 'u14', name: 'Sanjay', role: 'Project Manager', avatarColor: 'bg-indigo-600', department: 'Operations', permissions: ['VIEW_PROJECTS', 'EDIT_PROJECTS'] },
  { id: 'u15', name: 'Deepa', role: 'Client', avatarColor: 'bg-slate-800', department: 'External', permissions: ['VIEW_OWN_PROJECTS'] },
];

export const hasPermission = (permission: string) => {
  const user = currentUser.get();
  if (!user) return false;
  return user.permissions.includes('ALL') || user.permissions.includes(permission);
};

const getInitialUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('os_current_user');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

export const currentUser = atom<User | null>(getInitialUser());

export const loginUser = (user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('os_current_user', JSON.stringify(user));
  }
  currentUser.set(user);
};

export const logoutUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('os_current_user');
  }
  currentUser.set(null);
};
