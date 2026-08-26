import React, { useEffect, useState } from 'react';
import { DataService } from '../../lib/db';

export const RecentActivity = () => {
    const [activities, setActivities] = useState<any[]>([]);

    useEffect(() => {
        DataService.getAll('activities').then(data => {
            setActivities(data);
        });
    }, []);

    return (
        <div className="bg-surface border border-border rounded-xl p-5 h-full">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Recent Activity</h3>
                <a href="/audit" className="text-xs font-medium text-primary hover:underline">View all &rarr;</a>
            </div>
            
            <div className="space-y-4">
                {activities.map(act => (
                    <div key={act.id} className="flex gap-3 cursor-pointer group">
                        <div className="relative flex flex-col items-center">
                            <div className={`w-2 h-2 rounded-full bg-current ${act.color} z-10 ring-4 ring-surface`}></div>
                            <div className="w-px h-full bg-border absolute top-2 group-last:hidden"></div>
                        </div>
                        <div className="flex-1 pb-1">
                            <div className="flex items-center justify-between">
                                <h4 className="text-xs font-medium text-muted">
                                    <span className="text-foreground font-bold">{act.type}</span> '{act.title}'
                                </h4>
                                <span className="text-[10px] text-muted whitespace-nowrap ml-2">{act.time}</span>
                            </div>
                            <p className="text-[11px] text-muted mt-0.5">{act.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
