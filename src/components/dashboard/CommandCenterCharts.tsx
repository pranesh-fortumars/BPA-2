import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Info } from 'lucide-react';
import { DataService } from '../../lib/db';

export const CommandCenterCharts = () => {
    const [throughput, setThroughput] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState('24H');

    useEffect(() => {
        DataService.get<any>('kpi_data', `throughput-${activeTab.toLowerCase()}`).then(doc => {
            if (doc && doc.data) {
                setThroughput(doc.data);
            } else {
                const data = generateMockData(activeTab);
                DataService.save('kpi_data', { id: `throughput-${activeTab.toLowerCase()}`, data });
                setThroughput(data);
            }
        });
    }, [activeTab]);

    const generateMockData = (period: string) => {
        const data = [];
        const count = period === '24H' ? 7 : period === '7D' ? 7 : 30;
        const labels = period === '24H' ? ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'] : 
                       period === '7D' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] :
                       Array.from({length: 30}, (_, i) => `Day ${i+1}`);
                       
        for(let i=0; i<count; i++) {
            data.push({
                time: labels[i],
                started: Math.floor(Math.random() * 500) + 200,
                completed: Math.floor(Math.random() * 400) + 100
            });
        }
        return data;
    };

    const donutData = [
        { name: 'API Workflows', value: 42, color: '#8b5cf6' },
        { name: 'AI Agents', value: 28, color: '#3b82f6' },
        { name: 'RPA Bots', value: 18, color: '#10b981' },
        { name: 'Human Tasks', value: 8, color: '#f59e0b' },
        { name: 'Others', value: 4, color: '#64748b' }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            {/* Process Throughput */}
            <div className="bg-surface border border-border rounded-xl p-5 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Process Throughput</h3>
                        <Info size={14} className="text-muted cursor-help" />
                    </div>
                    <div className="flex gap-1">
                        {['24H', '7D', '30D'].map(t => (
                            <button 
                                key={t} 
                                onClick={() => setActiveTab(t)}
                                className={`px-2 py-0.5 text-[10px] font-bold rounded ${t === activeTab ? 'bg-primary text-primary-foreground' : 'text-muted hover:text-foreground'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="flex-1 min-h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={throughput} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorStarted" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dx={-10} />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                            <Area type="monotone" dataKey="started" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorStarted)" />
                            <Area type="monotone" dataKey="completed" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorCompleted)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex items-center gap-4 mt-2 justify-center">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-primary"></div><span className="text-[10px] text-muted font-medium uppercase">Total Started</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-secondary"></div><span className="text-[10px] text-muted font-medium uppercase">Total Completed</span></div>
                </div>
            </div>

            {/* Automation Distribution */}
            <div className="bg-surface border border-border rounded-xl p-5 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Automation Distribution</h3>
                    <a href="/analytics" className="text-[10px] text-primary hover:underline">View full analytics &rarr;</a>
                </div>
                
                <div className="flex-1 flex items-center justify-center relative min-h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={donutData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {donutData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} itemStyle={{ color: '#fff' }} />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Inner Label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-xl font-bold text-foreground">1,284</span>
                        <span className="text-[10px] text-muted font-medium uppercase">Total</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
