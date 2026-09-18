import React from 'react';
import { 
  Boxes, 
  FileText, 
  Dna, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  PlusCircle, 
  ShieldCheck, 
  BookOpen, 
  User, 
  IdCard, 
  BookmarkCheck,
  Hash
} from 'lucide-react';
import { Block, BlockchainValidationResult } from '../types';
import { TabType } from './Navbar';

interface DashboardViewProps {
  chain: Block[];
  validation: BlockchainValidationResult;
  setActiveTab: (tab: TabType) => void;
  onLoadSampleData: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  chain,
  validation,
  setActiveTab,
  onLoadSampleData,
}) => {
  const totalBlocks = chain.length;
  const landTransfers = Math.max(0, totalBlocks - 1);
  const genesisBlock = chain.length > 0 ? chain[0] : null;
  const genesisStatus = genesisBlock && genesisBlock.isGenesis ? 'PRESENT' : 'MISSING';
  const isValid = validation.isValid;

  return (
    <div className="space-y-6">
      {/* Hero / Academic Header Banner */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-3">
            <BookmarkCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>VTU BIC702 – Activity Based Learning</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Blockchain-Based Land Transfer Tracking System
          </h1>
          <p className="text-sm text-slate-600 mb-4 max-w-2xl">
            An academic demonstration of an immutable land registration ledger built from scratch using 
            <strong> Genesis Block (Block 0)</strong>, sequential cryptographic <strong>SHA-256</strong> hashing, 
            and real-time tamper-evident verification.
          </p>

          {/* Student Profile Card in Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <div className="p-1.5 rounded bg-slate-100 text-blue-600">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] uppercase font-bold">Student Name</span>
                <span className="font-semibold text-slate-800">Sanjai Shanmuga Prabu</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-700">
              <div className="p-1.5 rounded bg-slate-100 text-amber-600">
                <IdCard className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] uppercase font-bold">University Seat No (USN)</span>
                <span className="font-mono font-bold text-slate-800">1SP23IC047</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-700">
              <div className="p-1.5 rounded bg-slate-100 text-emerald-600">
                <BookmarkCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] uppercase font-bold">Assigned Topic</span>
                <span className="font-semibold text-slate-800">Activity 2 – Land Transfer (No. 21)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Main Dashboard Statistics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Blocks */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 border-t-4 border-t-blue-600 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Blocks</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1 font-mono">{totalBlocks}</h3>
              <p className="text-xs text-slate-500 mt-1">Index 0 to {totalBlocks - 1}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Boxes className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Metric 2: Land Transfer Transactions */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 border-t-4 border-t-sky-600 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Land Transfers</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1 font-mono">{landTransfers}</h3>
              <p className="text-xs text-slate-500 mt-1">Recorded Transactions</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Metric 3: Genesis Block Status */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 border-t-4 border-t-amber-500 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Genesis Block</p>
              <h3 className="text-2xl font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                {genesisStatus}
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-mono">Block 0 (prev: "0")</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Dna className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Metric 4: Blockchain Status */}
        <div className={`bg-white rounded-xl p-5 border border-slate-200 border-t-4 ${
          isValid ? 'border-t-emerald-600' : 'border-t-rose-600'
        } shadow-xs`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Blockchain Status</p>
              <h3 className={`text-2xl font-bold mt-1 ${isValid ? 'text-emerald-700' : 'text-rose-700'}`}>
                {isValid ? 'VALID' : 'INVALID'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isValid ? 'No tampering detected' : 'Tampering detected!'}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isValid ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
            }`}>
              {isValid ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
            </div>
          </div>
        </div>
      </div>

      {/* Genesis Block Spotlight Feature */}
      {genesisBlock && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <span className="bg-amber-500 text-white font-bold text-xs px-2.5 py-1 rounded">
                BLOCK 0
              </span>
              <h3 className="font-bold text-slate-900 text-base">
                GENESIS BLOCK (Immutable Anchor of Trust)
              </h3>
            </div>
            <span className="text-xs font-mono bg-white px-2.5 py-1 rounded border border-amber-200 text-slate-600">
              Timestamp: {genesisBlock.timestamp}
            </span>
          </div>

          <p className="text-xs text-slate-600 mb-3">
            <strong>Core Requirement:</strong> The Genesis Block is the very first block in the blockchain. 
            Because it has no preceding block, its <code>previous_hash</code> is permanently set to <code>"0"</code>. 
            All subsequent land transfers bind their cryptographic integrity back to this block.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
            <div className="bg-white p-3 rounded-lg border border-amber-200">
              <span className="text-slate-400 block text-[11px] uppercase font-bold mb-1">Previous Hash (Block 0)</span>
              <span className="text-amber-800 font-bold text-sm bg-amber-100 px-2 py-0.5 rounded">0</span>
              <span className="text-slate-500 text-[11px] block mt-1">(Hardcoded 0 - No predecessor)</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-amber-200">
              <span className="text-slate-400 block text-[11px] uppercase font-bold mb-1">Current SHA-256 Hash</span>
              <span className="text-blue-700 font-bold break-all text-xs">{genesisBlock.hash}</span>
            </div>
          </div>
        </div>
      )}

      {/* Grid: Quick Navigation & Live Blockchain Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: Blockchain Chaining Visual Preview */}
        <div className="lg:col-span-7 bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Hash className="w-4 h-4 text-blue-600" />
                <span>Sequential Block Chain Linkage</span>
              </h3>
              <button
                onClick={() => setActiveTab('blockchain')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <span>View Full Cards</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Cryptographic chain demonstrating how each block references the SHA-256 hash of its predecessor:
            </p>

            {/* Visual Chain Diagram */}
            <div className="space-y-2">
              {chain.slice(0, 4).map((block, idx) => (
                <div key={block.index} className="relative">
                  <div className={`p-3 rounded-lg border text-xs ${
                    block.isGenesis 
                      ? 'bg-amber-50/50 border-amber-200' 
                      : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                          block.isGenesis ? 'bg-amber-400 text-slate-900' : 'bg-blue-600 text-white'
                        }`}>
                          Block {block.index}
                        </span>
                        <strong className="text-slate-800">
                          {block.isGenesis 
                            ? 'GENESIS BLOCK' 
                            : `${(block.data as any).landId} - ${(block.data as any).transferType}`
                          }
                        </strong>
                      </div>
                      <span className="font-mono text-[11px] text-slate-500">
                        {block.timestamp.split(' ')[0]}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200/60 font-mono text-[11px]">
                      <div>
                        <span className="text-slate-400">prev: </span>
                        <span className="text-slate-600 truncate inline-block max-w-[140px] align-bottom">
                          {block.previousHash === '0' ? '0' : `${block.previousHash.substring(0, 10)}...`}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400">hash: </span>
                        <span className="text-blue-600 font-semibold truncate inline-block max-w-[140px] align-bottom">
                          {block.hash.substring(0, 10)}...
                        </span>
                      </div>
                    </div>
                  </div>

                  {idx < Math.min(chain.length - 1, 3) && (
                    <div className="flex items-center justify-center py-1">
                      <span className="text-blue-500 text-xs font-mono font-bold">↓ previous_hash link</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Showing {Math.min(4, chain.length)} of {chain.length} blocks
            </span>
            <button
              onClick={() => setActiveTab('blockchain')}
              className="text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition"
            >
              Examine All Hashes
            </button>
          </div>
        </div>

        {/* Right 5 cols: Key Actions & Academic Viva Prep */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Actions Panel */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base mb-3">Academic Workflow</h3>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => setActiveTab('add-transfer')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition">
                    <PlusCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-800 text-xs">1. Add Land Transfer</strong>
                    <span className="text-slate-500 text-[11px]">Record new parcel transfer block</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
              </button>

              <button
                onClick={() => setActiveTab('verification')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-left transition group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-800 text-xs">2. Verify & Tamper Demo</strong>
                    <span className="text-slate-500 text-[11px]">Audit hashes & test tamper detection</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition" />
              </button>

              <button
                onClick={() => setActiveTab('genesis')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 text-left transition group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded bg-amber-100 text-amber-800 group-hover:bg-amber-500 group-hover:text-white transition">
                    <Dna className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-800 text-xs">3. Genesis Block Theory</strong>
                    <span className="text-slate-500 text-[11px]">Why previous_hash = 0 & initialization</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition" />
              </button>

              <button
                onClick={() => setActiveTab('python-viva')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-purple-400 hover:bg-purple-50/40 text-left transition group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded bg-purple-100 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-800 text-xs">4. Python Code & Viva Q&A</strong>
                    <span className="text-slate-500 text-[11px]">Source code & examiner questions</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
