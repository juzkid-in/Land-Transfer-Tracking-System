import React, { useState } from 'react';
import { PlusCircle, Shield, CheckCircle2, ArrowRight, AlertCircle, Info } from 'lucide-react';
import { LandTransferData } from '../types';

interface AddTransferViewProps {
  onAddTransfer: (data: LandTransferData) => void;
  latestBlockHash: string;
  nextBlockIndex: number;
}

export const AddTransferView: React.FC<AddTransferViewProps> = ({
  onAddTransfer,
  latestBlockHash,
  nextBlockIndex,
}) => {
  const [landId, setLandId] = useState('');
  const [surveyNumber, setSurveyNumber] = useState('');
  const [location, setLocation] = useState('');
  const [previousOwner, setPreviousOwner] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [transferDate, setTransferDate] = useState('2026-09-18');
  const [transferType, setTransferType] = useState<LandTransferData['transferType']>('Ownership Transfer');
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!landId.trim()) {
      setError('Land ID is required (e.g. LAND004).');
      return;
    }
    if (!surveyNumber.trim()) {
      setError('Survey Number is required (e.g. SURV1004).');
      return;
    }
    if (!location.trim()) {
      setError('Location is required (e.g. Bengaluru).');
      return;
    }
    if (!previousOwner.trim()) {
      setError('Previous Owner is required.');
      return;
    }
    if (!newOwner.trim()) {
      setError('New Owner is required.');
      return;
    }
    if (previousOwner.trim().toLowerCase() === newOwner.trim().toLowerCase()) {
      setError('New Owner cannot be identical to Previous Owner in a transfer.');
      return;
    }
    if (!transferDate) {
      setError('Transfer Date is required.');
      return;
    }

    const newTransfer: LandTransferData = {
      landId: landId.trim().toUpperCase(),
      surveyNumber: surveyNumber.trim().toUpperCase(),
      location: location.trim(),
      previousOwner: previousOwner.trim(),
      newOwner: newOwner.trim(),
      transferDate,
      transferType,
      remarks: remarks.trim() || undefined
    };

    onAddTransfer(newTransfer);
    setSuccessMessage(`Land transfer recorded successfully into Block #${nextBlockIndex}! SHA-256 hash computed and chain updated.`);

    // Clear form
    setLandId('');
    setSurveyNumber('');
    setLocation('');
    setPreviousOwner('');
    setNewOwner('');
    setRemarks('');
  };

  const handleFillQuickSample = () => {
    setLandId('LAND004');
    setSurveyNumber('SURV1004');
    setLocation('Bengaluru East, Whitefield');
    setPreviousOwner('Sunil Gowda');
    setNewOwner('Meera Varma');
    setTransferDate('2026-09-18');
    setTransferType('Sale');
    setRemarks('Academic demo land deed verification');
    setError(null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg sm:text-xl font-bold">Add Land Transfer</h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Record a land ownership change transaction as a cryptographically linked block.
            </p>
          </div>
          <button
            type="button"
            onClick={handleFillQuickSample}
            className="text-xs font-semibold px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition"
          >
            Auto-Fill Demo Parcel
          </button>
        </div>

        {/* Cryptographic Pre-link Notice */}
        <div className="bg-blue-50/70 border-b border-blue-200 p-4 text-xs text-slate-700">
          <div className="flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-blue-900 block mb-1">
                Blockchain Target: Block #{nextBlockIndex}
              </span>
              <p className="text-slate-600 mb-1">
                This transaction will automatically bind to the current latest block hash:
              </p>
              <div className="font-mono bg-white px-2.5 py-1 rounded border border-blue-200 text-blue-700 break-all text-[11px]">
                previous_hash: {latestBlockHash}
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Land ID */}
            <div>
              <label htmlFor="landId" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Land ID <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="landId"
                value={landId}
                onChange={(e) => setLandId(e.target.value)}
                placeholder="e.g. LAND001"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Unique parcel identifier code</span>
            </div>

            {/* Survey Number */}
            <div>
              <label htmlFor="surveyNumber" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Survey Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="surveyNumber"
                value={surveyNumber}
                onChange={(e) => setSurveyNumber(e.target.value)}
                placeholder="e.g. SURV1001"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Revenue authority survey index</span>
            </div>

            {/* Location */}
            <div className="sm:col-span-2">
              <label htmlFor="location" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Location / Jurisdiction <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bengaluru"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Previous Owner */}
            <div>
              <label htmlFor="previousOwner" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Previous Owner (Seller) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="previousOwner"
                value={previousOwner}
                onChange={(e) => setPreviousOwner(e.target.value)}
                placeholder="e.g. Ravi Kumar"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* New Owner */}
            <div>
              <label htmlFor="newOwner" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                New Owner (Buyer) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="newOwner"
                value={newOwner}
                onChange={(e) => setNewOwner(e.target.value)}
                placeholder="e.g. Arjun Kumar"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Transfer Date */}
            <div>
              <label htmlFor="transferDate" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Transfer Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                id="transferDate"
                value={transferDate}
                onChange={(e) => setTransferDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Transfer Type */}
            <div>
              <label htmlFor="transferType" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Transfer Type <span className="text-rose-500">*</span>
              </label>
              <select
                id="transferType"
                value={transferType}
                onChange={(e) => setTransferType(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Ownership Transfer">Ownership Transfer</option>
                <option value="Sale">Sale</option>
                <option value="Gift">Gift</option>
                <option value="Inheritance">Inheritance</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center text-xs text-slate-500 gap-1.5">
              <Info className="w-4 h-4 text-slate-400" />
              <span>Uses SHA256(index + timestamp + land_data + previous_hash)</span>
            </div>

            <button
              type="submit"
              id="record-transfer-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-xs"
            >
              <span>Record Land Transfer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
