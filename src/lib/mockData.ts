import { DataService } from './db';

// Simple deterministic PRNG
function mulberry32(a: number) {
    return function() {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

let seed = 12345;
let random = mulberry32(seed);

export const MockGenerator = {
  resetSeed(newSeed = 12345) {
    seed = newSeed;
    random = mulberry32(seed);
  },

  async generateProcesses() {
    const existing = await DataService.getAll('processes');
    if (existing.length > 0) return;
    
    const processes = [
      { id: 'proc-1', name: 'Invoice Processing', department: 'Finance', instances: 842, sla: 94.2, health: 'Warning' },
      { id: 'proc-2', name: 'Customer Onboarding', department: 'Sales', instances: 317, sla: 99.1, health: 'Healthy' },
      { id: 'proc-3', name: 'Vendor Management', department: 'Procurement', instances: 96, sla: 87.4, health: 'Critical' },
      { id: 'proc-4', name: 'Employee Onboarding', department: 'HR', instances: 128, sla: 98.7, health: 'Healthy' },
      { id: 'proc-5', name: 'Leave Management', department: 'HR', instances: 76, sla: 96.3, health: 'Healthy' }
    ];
    
    for (const p of processes) {
      await DataService.save('processes', p);
    }
  },

  async generateProcessInstances() {
    const existing = await DataService.getAll('process_instances');
    if (existing.length > 0) return;

    const sampleSize = 50; 
    const processes = await DataService.getAll<any>('processes');
    if (processes.length === 0) return;
    
    const statuses = ['Running', 'Waiting', 'Completed', 'Failed'];
    
    for (let i = 0; i < sampleSize; i++) {
        const p = processes[Math.floor(random() * processes.length)];
        const status = statuses[Math.floor(random() * statuses.length)];
        
        await DataService.save('process_instances', {
            id: `inst-${i}`,
            processId: p.id,
            processName: p.name,
            status: status,
            department: p.department,
            startedAt: new Date(Date.now() - random() * 10000000).toISOString(),
            currentStep: status === 'Completed' ? 'Done' : 'Review',
            slaBreached: random() > 0.95
        });
    }
    
    // Save aggregated stats
    await DataService.save('kpi_data', {
       id: 'dashboard-stats',
       activeProcesses: 1284,
       activeTrend: 18.5,
       completedToday: 842,
       completedTrend: 22.1,
       atRisk: 47,
       atRiskTrend: 8,
       failed: 6,
       failedTrend: -2,
       automationValue: 18.6,
       valueTrend: 31.2,
       slaCompliance: 98.7,
       slaTrend: 2.4
    });
  },
  
  async generateThroughputData() {
    const data = [];
    for(let i=0; i<24; i+=4) {
        data.push({
            time: `${i < 10 ? '0'+i : i}:00`,
            started: Math.floor(random() * 800) + 200,
            completed: Math.floor(random() * 700) + 100
        });
    }
    await DataService.save('kpi_data', { id: 'throughput-24h', data });
  },

  async generateAlerts() {
     const existing = await DataService.getAll('alerts');
     if (existing.length > 0) return;

     const alerts = [
        { id: 'alert-1', type: 'SLA Breach', title: 'Invoice Processing', description: '12 instances breached SLA in last 1 hour', time: '10m ago', severity: 'high' },
        { id: 'alert-2', type: 'Automation Failed', title: 'Vendor Onboarding', description: 'ERP integration failed for 3 instances', time: '25m ago', severity: 'medium' },
        { id: 'alert-3', type: 'High Failure Rate', title: 'Document Verification', description: 'Failure rate crossed 15% threshold', time: '45m ago', severity: 'critical' },
        { id: 'alert-4', type: 'Human Tasks Overdue', title: 'Finance Approval', description: '18 tasks are overdue', time: '1h ago', severity: 'warning' },
     ];
     for (const a of alerts) {
         await DataService.save('alerts', a);
     }
  },

  async generateActivities() {
      const existing = await DataService.getAll('activities');
      if (existing.length > 0) return;

      const activities = [
          { id: 'act-1', type: 'AI Agent', title: 'Invoice Processor', description: 'Processed 47 invoices', time: '2m ago', color: 'text-violet-400' },
          { id: 'act-2', type: 'Process', title: 'Customer Onboarding', description: 'Completed for Customer #CUS-7720', time: '8m ago', color: 'text-emerald-400' },
          { id: 'act-3', type: 'RPA Bot', title: 'ERP Sync Bot', description: 'Synced 120 records to ERP', time: '15m ago', color: 'text-blue-400' },
          { id: 'act-4', type: 'Rule', title: 'Credit Policy v2.1', description: 'Updated by Sarah J.', time: '32m ago', color: 'text-amber-400' },
      ];
      for (const a of activities) {
          await DataService.save('activities', a);
      }
  },

  async initAll() {
    this.resetSeed();
    await this.generateProcesses();
    await this.generateProcessInstances();
    await this.generateThroughputData();
    await this.generateAlerts();
    await this.generateActivities();
  }
}
