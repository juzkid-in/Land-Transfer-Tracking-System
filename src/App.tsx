import React, { useState, useCallback, useMemo } from 'react';
import { 
  Navbar, 
  TabType 
} from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { AddTransferView } from './components/AddTransferView';
import { BlockchainView } from './components/BlockchainView';
import { HistoryView } from './components/HistoryView';
import { VerifyView } from './components/VerifyView';
import { GenesisView } from './components/GenesisView';
import { ArchitectureView } from './components/ArchitectureView';
import { AboutView } from './components/AboutView';
import { PythonSubmissionView } from './components/PythonSubmissionView';
import { 
  Blockchain,
  calculateBlockHash, 
  SAMPLE_DATA
} from './blockchain/blockchainEngine';
import { Block, LandTransferData } from './types';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  
  // Single Blockchain Engine Instance
  const [engine] = useState(() => {
    const bc = new Blockchain();
    bc.loadSampleData();
    return bc;
  });

  // Blockchain Ledger State
  const [chain, setChain] = useState<Block[]>(() => [...engine.chain]);

  // Notification Toast State
  const [toast, setToast] = useState<{ type: 'success' | 'danger' | 'info'; message: string } | null>({
    type: 'info',
    message: 'Academic Mini-Project Ready: Blockchain initialized with Genesis Block (Block 0) & 3 Sample Transfers.'
  });

  const showToast = (type: 'success' | 'danger' | 'info', message: string) => {
    setToast({ type, message });
  };

  // Run validation whenever chain changes
  const validation = useMemo(() => {
    return engine.validate();
  }, [chain, engine]);

  // Handler: Load Sample Data
  const handleLoadSampleData = useCallback(() => {
    engine.loadSampleData();
    setChain([...engine.chain]);
    showToast('success', 'Sample data loaded successfully (LAND001, LAND002, LAND003) linked to Genesis Block.');
  }, [engine]);

  // Handler: Add New Land Transfer Block
  const handleAddTransfer = useCallback((data: LandTransferData) => {
    const newBlock = engine.addBlock(data);
    setChain([...engine.chain]);
    showToast('success', `Land Transfer Block #${newBlock.index} minted with SHA-256 and added to blockchain.`);
  }, [engine]);

  // Handler: Tamper with a Block
  const handleTamper = useCallback((blockIndex: number, field: keyof LandTransferData, newValue: string) => {
    engine.tamperBlock(blockIndex, field, newValue);
    setChain([...engine.chain]);
    showToast('danger', `Block #${blockIndex} tampered! Recalculated SHA-256 hash now mismatches stored hash. BLOCKCHAIN INVALID.`);
    setActiveTab('verification');
  }, [engine]);

  // Handler: Restore Original Block Data
  const handleRestore = useCallback((blockIndex: number) => {
    engine.restoreBlock(blockIndex);
    setChain([...engine.chain]);
    showToast('success', `Original data restored for Block #${blockIndex}. Blockchain integrity re-verified as VALID.`);
  }, [engine]);

  // Handler: Manual Verification Button
  const handleManualVerify = useCallback(() => {
    const result = engine.validate();
    if (result.isValid) {
      showToast('success', 'Blockchain audit completed: All SHA-256 hashes and previous hash pointers are VALID.');
    } else {
      showToast('danger', `Blockchain audit failed: Tampering or hash corruption detected at Block #${result.brokenBlockIndex}!`);
    }
  }, [engine]);

  const latestBlock = chain[chain.length - 1];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLoadSampleData={handleLoadSampleData}
        chainValid={validation.isValid}
        totalBlocks={chain.length}
      />

      {/* Global Toast Alert */}
      {toast && (
        <div className="max-w-7xl mx-auto px-4 w-full pt-4">
          <div className={`p-3 rounded-lg border text-xs flex items-center justify-between shadow-xs ${
            toast.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : toast.type === 'danger'
              ? 'bg-rose-50 border-rose-300 text-rose-900'
              : 'bg-blue-50 border-blue-300 text-blue-900'
          }`}>
            <div className="flex items-center gap-2">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
              {toast.type === 'danger' && <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-blue-600 shrink-0" />}
              <span className="font-medium">{toast.message}</span>
            </div>
            <button
              onClick={() => setToast(null)}
              className="p-1 hover:bg-black/5 rounded transition text-slate-500"
              title="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            chain={chain}
            validation={validation}
            setActiveTab={setActiveTab}
            onLoadSampleData={handleLoadSampleData}
          />
        )}

        {activeTab === 'add-transfer' && (
          <AddTransferView
            onAddTransfer={handleAddTransfer}
            latestBlockHash={latestBlock.hash}
            nextBlockIndex={chain.length}
          />
        )}

        {activeTab === 'blockchain' && (
          <BlockchainView
            chain={chain}
            validation={validation}
            onTamperDemo={(index) => {
              setActiveTab('verification');
              handleTamper(index, 'newOwner', 'Fraudulent Claimant / Hacker');
            }}
          />
        )}

        {activeTab === 'history' && (
          <HistoryView chain={chain} />
        )}

        {activeTab === 'verification' && (
          <VerifyView
            chain={chain}
            validation={validation}
            onVerify={handleManualVerify}
            onTamper={handleTamper}
            onRestore={handleRestore}
          />
        )}

        {activeTab === 'genesis' && (
          <GenesisView genesisBlock={chain.length > 0 ? chain[0] : null} />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureView />
        )}

        {activeTab === 'about' && (
          <AboutView />
        )}

        {activeTab === 'python-viva' && (
          <PythonSubmissionView />
        )}
      </main>

      {/* Academic Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-800">
              VTU BIC702: Blockchain Technology Mini-Project
            </span>
            <span className="mx-2 text-slate-300">|</span>
            <span>Activity 2: Land Transfer Tracking System (Activity No: 21)</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Student: <strong className="text-slate-700">Sanjai Shanmuga Prabu</strong></span>
            <span className="font-mono text-slate-400 font-semibold">(USN: 1SP23IC047)</span>
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] border border-slate-200">
              SHA-256 Engine
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
