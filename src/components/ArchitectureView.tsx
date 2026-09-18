import React from 'react';
import { 
  Network, 
  User, 
  FileEdit, 
  Layers, 
  Hash, 
  Link as LinkIcon, 
  Database, 
  ShieldCheck, 
  CheckCircle2,
  ArrowRight,
  ArrowDown
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const architectureStages = [
    {
      num: 1,
      title: 'USER / LAND ADMIN',
      sub: 'Sub-Registrar / Land Officer',
      icon: <User className="w-5 h-5 text-blue-600" />,
      color: 'border-blue-300 bg-blue-50/50 text-blue-900',
      badge: 'bg-blue-600'
    },
    {
      num: 2,
      title: 'LAND TRANSFER DATA ENTRY',
      sub: 'Land ID, Survey No, Owners, Date',
      icon: <FileEdit className="w-5 h-5 text-indigo-600" />,
      color: 'border-indigo-300 bg-indigo-50/50 text-indigo-900',
      badge: 'bg-indigo-600'
    },
    {
      num: 3,
      title: 'TRANSACTION CREATION',
      sub: 'JSON payload validation & bundling',
      icon: <Layers className="w-5 h-5 text-sky-600" />,
      color: 'border-sky-300 bg-sky-50/50 text-sky-900',
      badge: 'bg-sky-600'
    },
    {
      num: 4,
      title: 'NEW BLOCK FORMATION',
      sub: 'Assign Index = N, Capture timestamp',
      icon: <Layers className="w-5 h-5 text-teal-600" />,
      color: 'border-teal-300 bg-teal-50/50 text-teal-900',
      badge: 'bg-teal-600'
    },
    {
      num: 5,
      title: 'PREVIOUS HASH LINK',
      sub: 'Fetch Hash of Block (N-1) as previous_hash',
      icon: <LinkIcon className="w-5 h-5 text-amber-600" />,
      color: 'border-amber-300 bg-amber-50/50 text-amber-900',
      badge: 'bg-amber-600'
    },
    {
      num: 6,
      title: 'SHA-256 HASH COMPUTATION',
      sub: 'SHA256(Index + Time + Data + PrevHash)',
      icon: <Hash className="w-5 h-5 text-rose-600" />,
      color: 'border-rose-300 bg-rose-50/50 text-rose-900',
      badge: 'bg-rose-600'
    },
    {
      num: 7,
      title: 'BLOCKCHAIN STORAGE',
      sub: 'Append to sequentially linked ledger list',
      icon: <Database className="w-5 h-5 text-purple-600" />,
      color: 'border-purple-300 bg-purple-50/50 text-purple-900',
      badge: 'bg-purple-600'
    },
    {
      num: 8,
      title: 'VALIDATION ENGINE',
      sub: 'Audit hash recalculations & pointer chain',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      color: 'border-emerald-300 bg-emerald-50/50 text-emerald-900',
      badge: 'bg-emerald-600'
    },
    {
      num: 9,
      title: 'LAND TRANSFER VERIFICATION',
      sub: 'Public provenance query & title search',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-700" />,
      color: 'border-emerald-400 bg-emerald-100/50 text-emerald-950',
      badge: 'bg-emerald-700'
    },
  ];

  const workingSteps = [
    { step: 1, title: 'Genesis Block Initialization', desc: 'The blockchain system starts by creating the Genesis Block (Block 0).' },
    { step: 2, title: 'Previous Hash Zeroing', desc: 'The Genesis Block has previous hash = "0" as no prior block exists.' },
    { step: 3, title: 'Land Transfer Input', desc: 'The administrator enters land transfer information (Land ID, survey no, buyer/seller).' },
    { step: 4, title: 'Transaction Packaging', desc: 'The system validates parameters and creates the land transfer transaction.' },
    { step: 5, title: 'Candidate Block Assembly', desc: 'The transaction is placed into a new block candidate with index N.' },
    { step: 6, title: 'Previous Hash Binding', desc: 'The block stores the cryptographic SHA-256 hash of the previous block.' },
    { step: 7, title: 'SHA-256 Cryptographic Minting', desc: 'SHA-256 generates the current block hash: SHA256(index + timestamp + data + prev_hash).' },
    { step: 8, title: 'Chain Append', desc: 'The block is added to the blockchain list in memory.' },
    { step: 9, title: 'Sequential Growth', desc: 'Additional land transfers create additional blocks, each pointing to its immediate ancestor.' },
    { step: 10, title: 'Integrity Verification', desc: 'The system verifies all hash relationships by re-computing every block.' },
    { step: 11, title: 'Valid State Confirmation', desc: 'If the records are unchanged, the blockchain confirms status: VALID.' },
    { step: 12, title: 'Tamper Detection Alert', desc: 'If any stored data is modified, the hash mismatches and blockchain becomes INVALID.' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-blue-600 mb-1">
          <Network className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">System Pipeline</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">System Architecture & Execution Flow</h2>
        <p className="text-xs text-slate-500 mt-1">
          End-to-end data processing lifecycle from user entry to cryptographic validation.
        </p>
      </div>

      {/* Visual System Architecture Diagram (Section 13) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center justify-between">
          <span>End-to-End Visual Architecture Pipeline</span>
          <span className="text-[11px] font-mono text-slate-400">VTU BIC702 Design Specification</span>
        </h3>

        {/* Diagram Flow Container */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {architectureStages.map((stage, idx) => (
              <React.Fragment key={stage.num}>
                <div className={`p-4 rounded-xl border ${stage.color} shadow-xs relative flex flex-col justify-between`}>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded ${stage.badge}`}>
                        STAGE {stage.num}
                      </span>
                      <div className="p-1 rounded bg-white shadow-2xs">
                        {stage.icon}
                      </div>
                    </div>
                    <h4 className="font-bold text-xs uppercase tracking-tight mb-1">
                      {stage.title}
                    </h4>
                    <p className="text-[11px] text-slate-600">
                      {stage.sub}
                    </p>
                  </div>
                </div>

                {/* Arrow connector between stages for larger screens */}
                {idx < architectureStages.length - 1 && (
                  <div className="hidden md:flex items-center justify-center -my-2 text-slate-400">
                    <span className="text-[11px] font-mono font-bold text-blue-600 flex items-center gap-1">
                      <span>↓</span>
                    </span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Working of the System (Section 14: Steps 1 through 12) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-2">
          Working of the System (Step-by-Step Academic Breakdown)
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          Standard operational workflow of the Land Transfer Tracking System as evaluated in student viva:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {workingSteps.map((ws) => (
            <div 
              key={ws.step}
              className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-300 transition"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                  {ws.step}
                </span>
                <strong className="text-slate-800 text-xs">{ws.title}</strong>
              </div>
              <p className="text-slate-600 pl-8 text-[11px] leading-relaxed">
                {ws.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
