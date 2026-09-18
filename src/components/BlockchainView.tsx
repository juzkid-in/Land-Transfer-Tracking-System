import React from 'react';
import { 
  Dna, 
  FileText, 
  ArrowDown, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  UserCheck, 
  UserX, 
  Hash, 
  ShieldAlert,
  Copy,
  Check
} from 'lucide-react';
import { Block, BlockchainValidationResult, LandTransferData } from '../types';

interface BlockchainViewProps {
  chain: Block[];
  validation: BlockchainValidationResult;
  onTamperDemo: (blockIndex: number) => void;
}

export const BlockchainView: React.FC<BlockchainViewProps> = ({
  chain,
  validation,
  onTamperDemo,
}) => {
  const [copiedHash, setCopiedHash] = React.useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Ledger Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Hash className="w-5 h-5 text-blue-600" />
            <span>Blockchain Ledger & Sequential Blocks</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Complete cryptographic chain of custody for registered land parcel ownership records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono ${
            validation.isValid 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300' 
              : 'bg-rose-50 text-rose-700 border border-rose-300'
          }`}>
            {validation.isValid ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            )}
            <span>{validation.isValid ? 'BLOCKCHAIN VALID' : 'TAMPER DETECTED'}</span>
          </span>
          <span className="text-xs font-mono bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 font-semibold">
            {chain.length} Blocks
          </span>
        </div>
      </div>

      {/* Sequential Chain of Block Cards */}
      <div className="space-y-4 relative">
        {chain.map((block, index) => {
          const isGenesis = block.isGenesis;
          const isBroken = validation.brokenBlockIndex !== null && index >= validation.brokenBlockIndex;
          const landData = !isGenesis ? (block.data as LandTransferData) : null;
          const prevBlock = index > 0 ? chain[index - 1] : null;
          const prevHashMatches = prevBlock ? block.previousHash === prevBlock.hash : block.previousHash === '0';

          return (
            <React.Fragment key={block.index}>
              {/* Block Card */}
              <div 
                id={`block-card-${block.index}`}
                className={`bg-white rounded-xl border transition-all duration-200 shadow-xs overflow-hidden ${
                  isBroken
                    ? 'border-rose-400 ring-2 ring-rose-200'
                    : isGenesis
                    ? 'border-amber-300 ring-1 ring-amber-100'
                    : 'border-slate-200'
                }`}
              >
                {/* Block Header Banner */}
                <div className={`px-5 py-3.5 flex flex-wrap items-center justify-between gap-2 border-b ${
                  isBroken
                    ? 'bg-rose-50/80 border-rose-200 text-rose-950'
                    : isGenesis
                    ? 'bg-amber-50 border-amber-200 text-amber-950'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold font-mono ${
                      isBroken
                        ? 'bg-rose-600 text-white'
                        : isGenesis
                        ? 'bg-amber-500 text-white'
                        : 'bg-blue-600 text-white'
                    }`}>
                      BLOCK {block.index}
                    </span>

                    <span className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                      {isGenesis ? (
                        <>
                          <Dna className="w-4 h-4 text-amber-600" />
                          <span className="text-amber-900">GENESIS BLOCK</span>
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span>LAND TRANSFER: {landData?.landId}</span>
                        </>
                      )}
                    </span>

                    {block.isTampered && (
                      <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">
                        RECORD TAMPERED
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{block.timestamp}</span>
                    </span>

                    {!isGenesis && (
                      <button
                        onClick={() => onTamperDemo(block.index)}
                        className="text-[11px] font-semibold text-rose-600 hover:text-rose-800 hover:underline flex items-center gap-1"
                        title="Simulate data modification to test cryptographic tamper detection"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Tamper Test</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Block Content Body */}
                <div className="p-5 space-y-4">
                  {isGenesis ? (
                    /* Genesis Block Body */
                    <div className="bg-amber-50/40 rounded-lg p-4 border border-amber-200/60">
                      <div className="text-xs font-semibold text-amber-900 uppercase tracking-wider mb-1">
                        Initial Blockchain Information:
                      </div>
                      <p className="font-mono text-xs text-slate-800 font-medium mb-2">
                        {String(block.data)}
                      </p>
                      <p className="text-[11px] text-slate-600">
                        <strong>Genesis Block Concept:</strong> This is the premier block of the blockchain ledger. 
                        Because it has no preceding block, its previous hash is explicitly set to <code>"0"</code>. 
                        It establishes the root hash from which the land ledger originates.
                      </p>
                    </div>
                  ) : (
                    /* Land Transfer Data Grid */
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        <span className="text-slate-400 block text-[11px] font-semibold">Land ID:</span>
                        <strong className="text-blue-700 font-mono text-sm">{landData?.landId}</strong>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        <span className="text-slate-400 block text-[11px] font-semibold">Survey Number:</span>
                        <strong className="text-slate-800 font-mono text-sm">{landData?.surveyNumber}</strong>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        <span className="text-slate-400 block text-[11px] font-semibold flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>Location:</span>
                        </span>
                        <strong className="text-slate-800">{landData?.location}</strong>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        <span className="text-slate-400 block text-[11px] font-semibold">Transfer Type:</span>
                        <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold text-[11px]">
                          {landData?.transferType}
                        </span>
                      </div>

                      <div className="col-span-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        <span className="text-slate-400 block text-[11px] font-semibold flex items-center gap-1">
                          <UserX className="w-3 h-3 text-rose-500" />
                          <span>Previous Owner (Seller):</span>
                        </span>
                        <strong className="text-rose-700 font-medium text-xs">{landData?.previousOwner}</strong>
                      </div>

                      <div className={`col-span-2 p-2.5 rounded-lg border ${
                        block.isTampered ? 'bg-rose-100 border-rose-300' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <span className="text-slate-400 block text-[11px] font-semibold flex items-center gap-1">
                          <UserCheck className="w-3 h-3 text-emerald-500" />
                          <span>New Owner (Buyer):</span>
                        </span>
                        <strong className={`font-semibold text-xs ${block.isTampered ? 'text-rose-800' : 'text-emerald-700'}`}>
                          {landData?.newOwner}
                          {block.isTampered && ' [TAMPERED VALUE]'}
                        </strong>
                      </div>
                    </div>
                  )}

                  {/* Cryptographic Hashes Container */}
                  <div className="bg-slate-900 text-slate-200 p-3.5 rounded-lg font-mono text-xs space-y-2">
                    {/* Previous Hash */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-[11px] uppercase font-bold tracking-wider">
                          Previous Hash:
                        </span>
                        {prevHashMatches ? (
                          <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-800 font-sans">
                            LINK VALID
                          </span>
                        ) : (
                          <span className="text-[10px] bg-rose-950 text-rose-400 px-1.5 py-0.2 rounded border border-rose-800 font-sans">
                            LINK BROKEN
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[11px] break-all ${
                          isGenesis ? 'text-amber-400 font-bold' : 'text-slate-300'
                        }`}>
                          {block.previousHash}
                        </span>
                        {block.previousHash !== '0' && (
                          <button
                            onClick={() => handleCopy(block.previousHash)}
                            className="p-1 hover:text-white text-slate-500 transition"
                            title="Copy previous hash"
                          >
                            {copiedHash === block.previousHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-slate-800 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 text-[11px] uppercase font-bold tracking-wider">
                          Current SHA-256 Hash:
                        </span>
                        <span className="text-[10px] text-slate-400 font-sans">
                          (Index + Time + Data + PrevHash)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sky-300 font-bold text-[11px] break-all">
                          {block.hash}
                        </span>
                        <button
                          onClick={() => handleCopy(block.hash)}
                          className="p-1 hover:text-white text-slate-500 transition"
                          title="Copy block hash"
                        >
                          {copiedHash === block.hash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cryptographic Link Indicator Arrow between blocks */}
              {index < chain.length - 1 && (
                <div className="flex flex-col items-center justify-center py-1 relative">
                  <div className="w-px h-3 bg-blue-300"></div>
                  <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-[11px] font-mono text-blue-700 shadow-2xs">
                    <ArrowDown className="w-3 h-3 text-blue-600" />
                    <span>Block {index + 1}.previous_hash = Block {index}.hash</span>
                  </div>
                  <div className="w-px h-3 bg-blue-300"></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
