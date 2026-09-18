import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Bug, 
  RefreshCw, 
  Database,
  ArrowRight,
  HelpCircle,
  FileEdit
} from 'lucide-react';
import { Block, BlockchainValidationResult, LandTransferData } from '../types';

interface VerifyViewProps {
  chain: Block[];
  validation: BlockchainValidationResult;
  onVerify: () => void;
  onTamper: (blockIndex: number, field: keyof LandTransferData, newValue: string) => void;
  onRestore: (blockIndex: number) => void;
}

export const VerifyView: React.FC<VerifyViewProps> = ({
  chain,
  validation,
  onVerify,
  onTamper,
  onRestore,
}) => {
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number>(1);
  const [tamperedOwnerName, setTamperedOwnerName] = useState('Unauthorized Imposter / Hacker');
  const [isTampered, setIsTampered] = useState(false);

  // Available transfer blocks to tamper
  const editableBlocks = chain.filter((b) => !b.isGenesis);

  const handleTamperSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBlockIndex <= 0 || selectedBlockIndex >= chain.length) return;
    onTamper(selectedBlockIndex, 'newOwner', tamperedOwnerName);
    setIsTampered(true);
  };

  const handleRestoreSubmit = () => {
    onRestore(selectedBlockIndex);
    setIsTampered(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <span>Cryptographic Blockchain Verification & Auditing</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time SHA-256 hash recalculation and sequential pointer integrity check across all blocks.
          </p>
        </div>

        <button
          onClick={onVerify}
          id="verify-chain-btn"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Verify Blockchain</span>
        </button>
      </div>

      {/* Main Status Hero Alert */}
      <div className={`p-6 rounded-xl border ${
        validation.isValid 
          ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' 
          : 'bg-rose-50/80 border-rose-300 text-rose-950'
      }`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl shrink-0 ${
            validation.isValid ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
          }`}>
            {validation.isValid ? (
              <CheckCircle2 className="w-7 h-7" />
            ) : (
              <AlertTriangle className="w-7 h-7" />
            )}
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded font-mono ${
                validation.isValid ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
              }`}>
                {validation.isValid ? 'BLOCKCHAIN VALID' : 'BLOCKCHAIN INVALID'}
              </span>
              <span className="text-xs text-slate-500">
                Audit checked at: <span className="font-mono">{validation.verifiedAt}</span>
              </span>
            </div>

            <h3 className="text-lg font-bold">
              {validation.isValid ? 'No Tampering Detected' : 'Tampering Detected in Ledger!'}
            </h3>

            <p className="text-xs text-slate-700 leading-relaxed">
              {validation.message}
            </p>
          </div>
        </div>
      </div>

      {/* 4 Core Verification Status Indicators (Section 17 requirement) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Genesis Block Status */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 block text-[11px] font-bold uppercase tracking-wider">Genesis Block:</span>
          <div className="flex items-center gap-2 mt-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <strong className="text-emerald-800 text-base">PRESENT</strong>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">Index = 0 | Previous Hash = "0"</span>
        </div>

        {/* Total Blocks */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 block text-[11px] font-bold uppercase tracking-wider">Total Blocks:</span>
          <div className="flex items-center gap-2 mt-1">
            <Database className="w-5 h-5 text-blue-600" />
            <strong className="text-slate-900 text-base font-mono">{validation.totalBlocks} Blocks</strong>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">Genesis + {validation.totalBlocks - 1} Transfers</span>
        </div>

        {/* Hash Links */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 block text-[11px] font-bold uppercase tracking-wider">Hash Links:</span>
          <div className="flex items-center gap-2 mt-1">
            {validation.hashLinksValid ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <strong className="text-emerald-800 text-base">VALID</strong>
              </>
            ) : (
              <>
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <strong className="text-rose-800 text-base">BROKEN</strong>
              </>
            )}
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">Sequential pointer consistency</span>
        </div>

        {/* Data Integrity */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 block text-[11px] font-bold uppercase tracking-wider">Data Integrity:</span>
          <div className="flex items-center gap-2 mt-1">
            {validation.dataIntegrityValid ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <strong className="text-emerald-800 text-base">VALID</strong>
              </>
            ) : (
              <>
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <strong className="text-rose-800 text-base">TAMPERED</strong>
              </>
            )}
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">Cryptographic hash equality</span>
        </div>
      </div>

      {/* Grid: Tamper Detection Interactive Demo & Audit Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 cols: Tamper Detection Demo (Section 11) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-rose-200 shadow-xs overflow-hidden">
          <div className="bg-rose-600 text-white p-4">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Bug className="w-4 h-4 text-amber-300" />
              <span>Tamper Detection Demo (Academic Simulation)</span>
            </h3>
            <p className="text-[11px] text-rose-100 mt-1">
              Demonstrates why a blockchain prevents undetected alterations in property registries.
            </p>
          </div>

          <div className="p-5 space-y-4">
            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <strong>How It Works:</strong> In a traditional database, an unauthorized admin could change the owner field. 
              Here, modifying an owner alters the block's content, which causes its recalculated SHA-256 hash to mismatch 
              the stored hash, instantly flagging the chain as <strong>INVALID</strong>.
            </div>

            {editableBlocks.length > 0 ? (
              <form onSubmit={handleTamperSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Select Block to Tamper:
                  </label>
                  <select
                    value={selectedBlockIndex}
                    onChange={(e) => setSelectedBlockIndex(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-rose-500"
                  >
                    {editableBlocks.map((b) => (
                      <option key={b.index} value={b.index}>
                        Block #{b.index} - {(b.data as LandTransferData).landId} (Current Owner: {(b.data as LandTransferData).newOwner})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Simulate Malicious New Owner:
                  </label>
                  <input
                    type="text"
                    value={tamperedOwnerName}
                    onChange={(e) => setTamperedOwnerName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-rose-700 focus:ring-2 focus:ring-rose-500"
                    required
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Modifies in-memory record without recalculating hash
                  </span>
                </div>

                <button
                  type="submit"
                  id="tamper-btn"
                  className="w-full py-2 px-4 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-xs"
                >
                  <FileEdit className="w-4 h-4" />
                  <span>Tamper Land Transfer Record</span>
                </button>
              </form>
            ) : (
              <p className="text-xs text-slate-500">Add a land transfer block first to test tampering.</p>
            )}

            {/* Restore Original Data Button */}
            <div className="pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={handleRestoreSubmit}
                id="restore-btn"
                className="w-full py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restore Original Data</span>
              </button>
              <span className="text-[11px] text-slate-500 mt-1 block text-center">
                Reverts block data back to authentic snapshot & restores "BLOCKCHAIN VALID".
              </span>
            </div>
          </div>
        </div>

        {/* Right 7 cols: Detailed Block Audit Table */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Block-by-Block Cryptographic Audit</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Detailed breakdown of stored hash vs. recalculated SHA-256 for each block in memory:
            </p>

            <div className="space-y-3">
              {validation.details.map((detail) => (
                <div
                  key={detail.blockIndex}
                  className={`p-3 rounded-lg border text-xs ${
                    !detail.isValid
                      ? 'bg-rose-50 border-rose-300'
                      : detail.blockType === 'GENESIS'
                      ? 'bg-amber-50/50 border-amber-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                        !detail.isValid
                          ? 'bg-rose-600 text-white'
                          : detail.blockType === 'GENESIS'
                          ? 'bg-amber-500 text-white'
                          : 'bg-blue-600 text-white'
                      }`}>
                        Block {detail.blockIndex}
                      </span>
                      <strong className="text-slate-800">
                        {detail.blockType === 'GENESIS' ? 'GENESIS BLOCK' : `Transfer Block #${detail.blockIndex}`}
                      </strong>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      detail.isValid
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {detail.isValid ? 'PASSED' : 'FAILED'}
                    </span>
                  </div>

                  <div className="font-mono text-[11px] space-y-1 text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Stored Hash:</span>
                      <span className="truncate max-w-[200px] text-slate-700">{detail.storedHash}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Recalculated:</span>
                      <span className={`truncate max-w-[200px] font-semibold ${
                        detail.hashMatch ? 'text-emerald-700' : 'text-rose-700'
                      }`}>
                        {detail.calculatedHash}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200/60 pt-1">
                      <span className="text-slate-400">Prev Hash Match:</span>
                      <span className={detail.prevHashMatch ? 'text-emerald-700' : 'text-rose-700'}>
                        {detail.prevHashMatch ? 'True (Matches Block N-1)' : 'False (Broken Link)'}
                      </span>
                    </div>
                  </div>

                  {detail.failureReason && (
                    <div className="mt-2 text-rose-700 text-[11px] font-semibold bg-rose-100/80 p-1.5 rounded">
                      Error: {detail.failureReason}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Formula: SHA256(index + timestamp + data + previous_hash)</span>
            <span className="font-semibold text-slate-700">Strict Cryptographic Equality</span>
          </div>
        </div>
      </div>
    </div>
  );
};
