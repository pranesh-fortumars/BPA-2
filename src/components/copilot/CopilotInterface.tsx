import React, { useState, useEffect, useRef } from 'react';
import { DataService } from '../../lib/db';
import { GlassCard } from '../GlassCard';
import { Bot, User, Send, Sparkles } from 'lucide-react';

export const CopilotInterface = () => {
    const initialMessages = [
        { id: 'msg-1', sender: 'ai', text: 'Hello! I am your Enterprise Automation Copilot. I can help you analyze processes, generate workflows, or troubleshoot bots. How can I assist you today?' },
        { id: 'msg-2', sender: 'user', text: 'Can you show me the ROI for the Finance Invoice process?' },
        { id: 'msg-3', sender: 'ai', text: 'Certainly! The Finance Invoice Routing process has generated **₹1.8L** in savings this quarter, recovering approximately **120 hours** of manual work. Would you like to see a breakdown by step?' }
    ];

    const [messages, setMessages] = useState<any[]>(initialMessages);
    const [input, setInput] = useState('');
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initData = async () => {
            let data = await DataService.getAll<any>('copilot_chat');
            if (data.length > 0) {
                setMessages(data);
            } else {
                for (const m of initialMessages) await DataService.save('copilot_chat', m).catch(() => {});
            }
        };
        initData();
    }, []);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const newMsg = { id: `msg-${Date.now()}`, sender: 'user', text: input };
        await DataService.save('copilot_chat', newMsg);
        setMessages(prev => [...prev, newMsg]);
        setInput('');

        setTimeout(async () => {
            const reply = { id: `msg-${Date.now()+1}`, sender: 'ai', text: "I'm analyzing your request. As a mock Copilot, I'm currently unable to execute live commands, but this interface will connect to the LLM agent soon!" };
            await DataService.save('copilot_chat', reply);
            setMessages(prev => [...prev, reply]);
        }, 1000);
    };

    return (
        <div className="space-y-6 flex flex-col h-[calc(100vh-140px)]">
            <div className="flex items-end justify-between gap-6 pb-2">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-3">
                        AI Copilot <Sparkles className="text-primary" size={24} />
                    </h1>
                    <p className="text-sm text-muted mt-1">Chat with your enterprise data and generate automations</p>
                </div>
            </div>

            <GlassCard className="flex-1 bg-surface border border-border shadow-sm flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex gap-4 max-w-[80%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}>
                                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                            </div>
                            <div className={`p-4 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-secondary text-secondary-foreground rounded-tr-none' : 'bg-surface-elevated text-foreground border border-border rounded-tl-none'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={endRef} />
                </div>
                
                <div className="p-4 border-t border-border bg-surface-elevated">
                    <div className="flex items-center gap-2 relative">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask Copilot anything..." 
                            className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                        />
                        <button 
                            onClick={handleSend}
                            className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary text-primary-foreground hover:brightness-110 transition-all shadow-md shadow-primary/20"
                        >
                            <Send size={18} className="ml-1" />
                        </button>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
};
