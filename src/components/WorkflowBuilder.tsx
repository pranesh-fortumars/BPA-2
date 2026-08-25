import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  useNodesState, 
  useEdgesState, 
  addEdge,
  Handle,
  Position,
  Panel,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  Zap, 
  Clock, 
  UserCheck, 
  Mail, 
  Database, 
  Plus, 
  Save, 
  Settings, 
  ShieldCheck, 
  Bot, 
  Sparkles,
  Timer,
  AlertTriangle,
  FileSearch,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- Advanced Custom Node Types ---
const CustomNode = ({ data }: any) => (
  <div className={`p-4 rounded-2xl bg-surface border-2 ${data.type === 'Trigger' ? 'border-primary/30' : data.type === 'AI' ? 'border-primary/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'border-border'} shadow-2xl min-w-[200px] group transition-all hover:border-primary/50`}>
    <Handle type="target" position={Position.Top} className="!bg-primary !w-2.5 !h-2.5 !border-none" />
    <div className="flex items-center gap-3 mb-2">
      <div className={`p-2 rounded-lg bg-surface-elevated border border-border ${data.type === 'Trigger' ? 'text-primary' : data.type === 'AI' ? 'text-primary' : 'text-muted'}`}>
        <data.icon size={18} />
      </div>
      <div>
        <p className="text-[9px] font-black uppercase tracking-widest text-muted">{data.type}</p>
        <h4 className="text-sm font-black text-foreground">{data.label}</h4>
      </div>
    </div>
    <p className="text-[11px] text-muted font-medium leading-relaxed">{data.description}</p>
    
    {data.sla && (
       <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-[10px] font-black uppercase tracking-tight">
          <span className="text-muted flex items-center gap-1.5"><Timer size={12} className="text-warning" /> SLA: {data.sla}</span>
          <span className="text-critical animate-pulse">Escalation Path</span>
       </div>
    )}

    <Handle type="source" position={Position.Bottom} className="!bg-primary !w-2.5 !h-2.5 !border-none" />
  </div>
);

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  { 
    id: '1', 
    type: 'custom', 
    data: { 
      label: 'Invoice Reception', 
      type: 'Trigger', 
      description: 'Triggered on new PDF arrival in Finance S3 Bucket', 
      icon: Database 
    }, 
    position: { x: 250, y: 0 } 
  },
  { 
    id: '2', 
    type: 'custom', 
    data: { 
      label: 'AI OCR Extraction', 
      type: 'AI', 
      description: 'Extracting Vendor, Amount, and Tax data using Neural OCR', 
      icon: Sparkles 
    }, 
    position: { x: 250, y: 150 } 
  }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' } }
];

export const WorkflowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const addNode = (type: string = 'Action') => {
     const id = Math.random().toString(36).substr(2, 9);
     const newNode = {
        id,
        type: 'custom',
        data: { 
          label: `New ${type} Step`, 
          type, 
          description: `Configuring ${type.toLowerCase()} execution protocols`, 
          icon: type === 'Trigger' ? Clock : type === 'Approval' ? UserCheck : type === 'AI' ? Sparkles : type === 'SLA' ? Timer : Zap 
        },
        position: { x: 250, y: nodes.length * 150 + 50 }
     };
     setNodes((nds) => nds.concat(newNode));
  };

  const handleAiGeneration = () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    
    setTimeout(() => {
      const generatedNodes = [
        { id: 'ai-1', type: 'custom', data: { label: 'Doc Upload', type: 'Trigger', description: 'Monitor incoming channel', icon: FileSearch }, position: { x: 400, y: 0 } },
        { id: 'ai-2', type: 'custom', data: { label: 'OCR Extract', type: 'AI', description: 'Automated field mapping', icon: Sparkles }, position: { x: 400, y: 150 } },
        { id: 'ai-3', type: 'custom', data: { label: 'Dup Check', type: 'Logic', description: 'Cross-reference DB records', icon: ShieldCheck }, position: { x: 400, y: 300 } },
        { id: 'ai-4', type: 'custom', data: { label: 'SLA Timer', type: 'SLA', sla: '4h', description: 'Emergency escalation route', icon: Timer }, position: { x: 400, y: 450 } },
      ];
      
      const generatedEdges = [
        { id: 'gae1', source: 'ai-1', target: 'ai-2', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' } },
        { id: 'gae2', source: 'ai-2', target: 'ai-3', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' } },
        { id: 'gae3', source: 'ai-3', target: 'ai-4', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' } },
      ];

      setNodes(generatedNodes);
      setEdges(generatedEdges as any);
      setIsGenerating(false);
      setAiPrompt('');
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] gap-6 font-sans">
      {/* AI Orchestration Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface border border-border p-4 rounded-3xl flex items-center gap-4 shadow-sm"
      >
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_15px_rgba(124,58,237,0.1)]">
             <Bot size={28} />
          </div>
          <div className="flex-1 relative">
             <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 w-4 h-4" />
             <input 
               type="text" 
               placeholder="Describe your workflow (e.g., 'Build an automated invoice approval flow...')" 
               value={aiPrompt}
               onChange={(e) => setAiPrompt(e.target.value)}
               className="w-full bg-surface-elevated border border-border rounded-2xl pl-12 pr-40 py-3.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted"
               onKeyDown={(e) => e.key === 'Enter' && handleAiGeneration()}
             />
             <button 
                onClick={handleAiGeneration}
                disabled={isGenerating}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-primary hover:brightness-110 disabled:opacity-50 text-primary-foreground rounded-xl text-xs font-black uppercase tracking-widest transition-all h-[calc(100%-8px)] flex items-center gap-2"
             >
                {isGenerating ? <RefreshCw className="animate-spin w-3 h-3" /> : <Sparkles size={14} />}
                {isGenerating ? 'Synthesizing...' : 'AI Generate'}
             </button>
          </div>
      </motion.div>

      <div className="flex-1 rounded-3xl border border-border bg-surface overflow-hidden relative group">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background color="#334155" gap={20} variant="dots" />
          <Controls className="!bg-surface-elevated !border-border !fill-foreground shadow-2xl" />
          <MiniMap 
              className="!bg-surface-elevated !border-border !rounded-2xl" 
              maskColor="rgba(15, 23, 42, 0.6)"
              nodeColor={(n: any) => n.data.type === 'AI' ? '#8b5cf6' : '#7c3aed'}
          />
          
          <Panel position="top-right" className="flex gap-2">
             <button 
               onClick={() => addNode('AI')}
               className="flex items-center gap-2 px-4 py-2 bg-primary hover:brightness-110 rounded-xl text-xs font-bold text-primary-foreground shadow-xl shadow-primary/20 transition-all active:scale-95"
             >
                <Sparkles size={16} /> AI Logic
             </button>
             <button 
               onClick={() => addNode('SLA')}
               className="flex items-center gap-2 px-4 py-2 bg-warning hover:brightness-110 rounded-xl text-xs font-bold text-white shadow-xl shadow-warning/20 transition-all active:scale-95"
             >
                <Timer size={16} /> SLA Timer
             </button>
             <button 
               onClick={() => alert('Workflow configuration saved.')}
               className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-elevated rounded-xl text-xs font-bold text-foreground border border-border transition-all active:scale-95"
             >
                <Save size={16} /> Save
             </button>
          </Panel>

          <Panel position="top-left">
             <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 px-4 py-3 bg-surface border border-border rounded-xl text-xs text-foreground shadow-sm">
                   <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                   AI Agent Feedback: <span className="text-success font-black ml-1">Live Efficiency 98.4%</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-critical/10 border border-critical/20 rounded-xl max-w-xs shadow-sm">
                   <AlertTriangle className="text-critical shrink-0" size={16} />
                   <p className="text-[10px] font-bold text-muted">Bottleneck detected in "Manager Approval" stage.</p>
                </div>
             </div>
          </Panel>
        </ReactFlow>

        {/* Node Library Sidebar */}
        <div className="absolute right-6 top-24 bottom-6 w-20 flex flex-col gap-4 py-6 bg-surface border border-border rounded-2xl items-center overflow-y-auto z-50 shadow-lg">
           <PanelIconButton icon={Plus} label="Action" onClick={() => addNode('Action')} />
           <div className="w-8 h-[1px] bg-border mx-auto"></div>
           <PanelIconButton icon={Sparkles} label="AI Node" onClick={() => addNode('AI')} />
           <PanelIconButton icon={Cpu} label="Agent" onClick={() => addNode('Agent')} />
           <PanelIconButton icon={Clock} label="Trigger" onClick={() => addNode('Trigger')} />
           <PanelIconButton icon={UserCheck} label="Approval" onClick={() => addNode('Approval')} />
           <PanelIconButton icon={Mail} label="Email" onClick={() => addNode('Email')} />
           <PanelIconButton icon={Database} label="DB Connector" onClick={() => addNode('DB')} />
           <div className="mt-auto">
              <PanelIconButton icon={Settings} label="Engine Config" onClick={() => alert('Engine Config active.')} />
           </div>
        </div>
      </div>
    </div>
  );
};

interface PanelIconButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}

const PanelIconButton = ({ icon: Icon, label, onClick }: PanelIconButtonProps) => (
  <button 
    onClick={onClick}
    className="group relative w-12 h-12 flex items-center justify-center rounded-xl bg-surface border border-border text-muted hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm"
  >
    <Icon size={20} />
    <div className="absolute right-full mr-4 px-2 py-1 rounded bg-surface text-[10px] text-foreground font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-border shadow-lg z-[100]">
        Add {label}
    </div>
  </button>
);
