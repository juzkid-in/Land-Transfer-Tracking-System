import React from 'react';
import { Dna, ArrowDown, Shield, Key, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Block } from '../types';

interface GenesisViewProps {
  genesisBlock: Block | null;
}

export const GenesisView: React.FC<GenesisViewProps> = ({ genesisBlock }) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-amber-600 mb-2">
          <Dna className="w-6 h-6" />
          <span className="text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
            VTU BIC702 Core Requirement
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Understanding the Genesis Block</h2>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl">
          The Genesis Block (Block 0) is the foundational cornerstone of any blockchain ledger. 
          It serves as the immutable anchor of trust from which every transaction subsequently descends.
        </p>
      </div>

      {/* Visual Linking Diagram (Section 12 requirement) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm mb-4">
          Genesis Block Hash Linkage Architecture
        </h3>

        <div className="max-w-xl mx-auto space-y-3">
          {/* Genesis Block Box */}
          <div className="p-4 rounded-xl border-2 border-amber-400 bg-amber-50/60 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded bg-amber-500 text-white font-bold text-xs">
                BLOCK 0: GENESIS BLOCK
              </span>
              <span className="text-xs font-mono text-slate-500">Root Node</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono mb-2">
              <div className="bg-white p-2 rounded border border-amber-200">
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Previous Hash</span>
                <span className="text-amber-800 font-bold text-sm">"0"</span>
                <span className="text-[10px] text-slate-500 block">(No prior block exists)</span>
              </div>
              <div className="bg-white p-2 rounded border border-amber-200">
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Data Payload</span>
                <span className="text-slate-700 truncate block text-xs">Blockchain Initialization</span>
                <span className="text-[10px] text-slate-500 block">VTU BIC702 Land System</span>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-200 p-2.5 rounded text-xs font-mono">
              <span className="text-amber-400 text-[10px] uppercase font-bold block">Current Hash:</span>
              <span className="text-sky-300 break-all text-[11px] font-bold">
                {genesisBlock ? genesisBlock.hash : 'Calculating...'}
              </span>
            </div>
          </div>

          {/* Linking Arrow 1 */}
          <div className="flex flex-col items-center justify-center py-0.5">
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-xs font-mono text-blue-700">
              <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
              <span>Block 1.previous_hash = Hash(Block 0)</span>
            </div>
          </div>

          {/* Block 1 Box */}
          <div className="p-4 rounded-xl border border-blue-300 bg-blue-50/40 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-xs">
                BLOCK 1: LAND TRANSFER 1
              </span>
              <span className="text-xs font-mono text-slate-500">LAND001</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono mb-2">
              <div className="bg-white p-2 rounded border border-blue-200">
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Previous Hash</span>
                <span className="text-blue-700 font-bold truncate block text-xs">
                  {genesisBlock ? `${genesisBlock.hash.substring(0, 16)}...` : 'ABC123...'}
                </span>
                <span className="text-[10px] text-emerald-600 block font-semibold">✓ Exact Match to Block 0</span>
              </div>
              <div className="bg-white p-2 rounded border border-blue-200">
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Data Payload</span>
                <span className="text-slate-700 truncate block text-xs">Ravi Kumar → Arjun Kumar</span>
                <span className="text-[10px] text-slate-500 block">Bengaluru (Ownership)</span>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-200 p-2.5 rounded text-xs font-mono">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Current Hash:</span>
              <span className="text-sky-300 break-all text-[11px]">
                8fa2b109... (Computed SHA-256)
              </span>
            </div>
          </div>

          {/* Linking Arrow 2 */}
          <div className="flex flex-col items-center justify-center py-0.5">
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-xs font-mono text-blue-700">
              <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
              <span>Block 2.previous_hash = Hash(Block 1)</span>
            </div>
          </div>

          {/* Block 2 Box */}
          <div className="p-4 rounded-xl border border-blue-300 bg-blue-50/40 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-xs">
                BLOCK 2: LAND TRANSFER 2
              </span>
              <span className="text-xs font-mono text-slate-500">LAND002</span>
            </div>
            <div className="bg-white p-2 rounded border border-blue-200 font-mono text-xs">
              <span className="text-slate-400 text-[10px] block uppercase font-bold">Previous Hash</span>
              <span className="text-blue-700 font-bold text-xs">8fa2b109... (From Block 1)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Key Academic Explanations (Prompt Section 12) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-blue-600">
            <HelpCircle className="w-5 h-5" />
            <h4 className="font-bold text-slate-900 text-sm">1. What is a Genesis Block?</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The Genesis Block is the very first block created in a blockchain. It serves as the starting point and common root ancestor for all subsequent blocks in the network. Every valid transaction ever performed can trace its genealogical line directly back to this first block.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-blue-600">
            <HelpCircle className="w-5 h-5" />
            <h4 className="font-bold text-slate-900 text-sm">2. Why is it the First Block (Block 0)?</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            In computing and blockchain theory, 0-based indexing is standard. Block 0 establishes the initial ledger state before any public transactions or user transfers take place. Without Block 0, Block 1 would have no predecessor hash to bind to.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-amber-600">
            <Key className="w-5 h-5" />
            <h4 className="font-bold text-slate-900 text-sm">3. Why is Previous Hash = "0"?</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Because Block 0 is the beginning of time for this blockchain, there is physically no preceding block. To satisfy the deterministic data structure where every block must possess a <code>previous_hash</code> attribute, the value is conventionally assigned to <code>"0"</code> (or a 64-character string of zeroes).
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-blue-600">
            <Shield className="w-5 h-5" />
            <h4 className="font-bold text-slate-900 text-sm">4. How does it Start the Blockchain?</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            When the system initializes, it generates Block 0 and computes its cryptographic SHA-256 hash. That resulting hash becomes the anchor value that Block 1 retrieves and embeds as its <code>previous_hash</code> when recording the first land transfer.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-blue-600">
            <CheckCircle2 className="w-5 h-5" />
            <h4 className="font-bold text-slate-900 text-sm">5. How are Subsequent Blocks Linked to It?</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Linkage is cryptographic, not just logical: each block calculates its own hash using the previous block's hash as an input parameter. Thus, altering Block 0 would invalidate Block 1's hash, which in turn invalidates Block 2's hash, rippling through the entire chain.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-blue-600">
            <Shield className="w-5 h-5" />
            <h4 className="font-bold text-slate-900 text-sm">6. Why is SHA-256 Hashing Important?</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            SHA-256 produces a fixed 256-bit (64 hex characters) digital fingerprint. It exhibits the <em>avalanche effect</em>: altering even a single comma or letter in the land owner's name produces a totally unrecognizable new hash, preventing silent fraud.
          </p>
        </div>
      </div>
    </div>
  );
};
