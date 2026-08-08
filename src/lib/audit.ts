import { DataService } from './db';
import { currentUser } from '../store/authStore';

export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'VIEW' | 'APPROVE' | 'REJECT';

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: AuditAction;
  resource: string;
  resourceId?: string;
  details: string;
  timestamp: string;
}

export const AuditService = {
  async log(action: AuditAction, resource: string, details: string, resourceId?: string) {
    // Only log on the client side
    if (typeof window === 'undefined') return;
    
    const user = currentUser.get();
    if (!user) return; // Don't log if no user is authenticated (except maybe login attempts, but handled separately)

    const auditEntry: AuditLog = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      userId: user.id,
      userName: user.name,
      action,
      resource,
      resourceId,
      details,
      timestamp: new Date().toISOString()
    };

    try {
      // Use the raw IndexedDB save to prevent infinite loops if we ever audit the DataService itself
      await DataService.saveRaw('audit_logs', auditEntry);
      
      // Optionally dispatch an event for the AlertCenter to pick up if it's high priority
      if (['DELETE', 'APPROVE', 'REJECT'].includes(action)) {
         window.dispatchEvent(new CustomEvent('bpa_audit_alert', { detail: auditEntry }));
      }
    } catch (e) {
      console.error("Failed to write audit log", e);
    }
  },

  async getRecentLogs(limit: number = 50): Promise<AuditLog[]> {
    try {
      const logs = await DataService.getAll<AuditLog>('audit_logs');
      return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, limit);
    } catch (e) {
      return [];
    }
  }
};
