import React, { useState } from 'react';
import { Search, History, FileText, ArrowRight, Filter, Download } from 'lucide-react';
import { Block, LandTransferData } from '../types';

interface HistoryViewProps {
  chain: Block[];
}

export const HistoryView: React.FC<HistoryViewProps> = ({ chain }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');

  // Filter out genesis block, only show transfer blocks
  const transferBlocks = chain.filter((b) => !b.isGenesis);

  const filteredBlocks = transferBlocks.filter((block) => {
    const data = block.data as LandTransferData;
    const query = searchQuery.trim().toLowerCase();

    const matchesQuery =
      !query ||
      data.landId.toLowerCase().includes(query) ||
      data.surveyNumber.toLowerCase().includes(query) ||
      data.location.toLowerCase().includes(query) ||
      data.previousOwner.toLowerCase().includes(query) ||
      data.newOwner.toLowerCase().includes(query);

    const matchesType = selectedType === 'ALL' || data.transferType === selectedType;

    return matchesQuery && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <History className="w-5 h-5 text-blue-600" />
              <span>Land Transfer History & Public Registry</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Historical ledger of all parcel transfers recorded across the blockchain.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-300 font-semibold">
              {filteredBlocks.length} Records Shown
            </span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 py-4">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Land ID (e.g. LAND001), Survey Number, Owner, or City..."
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="sm:col-span-4 flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Transfer Types</option>
              <option value="Ownership Transfer">Ownership Transfer</option>
              <option value="Sale">Sale</option>
              <option value="Gift">Gift</option>
              <option value="Inheritance">Inheritance</option>
            </select>
          </div>
        </div>

        {/* Transfer History Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-900 text-slate-200 font-semibold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-3">Block No.</th>
                <th className="py-3 px-3">Land ID</th>
                <th className="py-3 px-3">Survey Number</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Previous Owner</th>
                <th className="py-3 px-3">New Owner</th>
                <th className="py-3 px-3">Transfer Date</th>
                <th className="py-3 px-3">Transfer Type</th>
                <th className="py-3 px-3">Current Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredBlocks.length > 0 ? (
                filteredBlocks.map((block) => {
                  const data = block.data as LandTransferData;
                  return (
                    <tr key={block.index} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-3 font-mono font-bold text-blue-700">
                        Block #{block.index}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">
                        {data.landId}
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-700">
                        {data.surveyNumber}
                      </td>
                      <td className="py-3 px-3 text-slate-800">
                        {data.location}
                      </td>
                      <td className="py-3 px-3 text-rose-700 font-medium">
                        {data.previousOwner}
                      </td>
                      <td className="py-3 px-3 text-emerald-700 font-semibold">
                        {data.newOwner}
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-mono">
                        {data.transferDate}
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px] border border-slate-200">
                          {data.transferType}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-500" title={block.hash}>
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 text-slate-700 font-mono">
                          {block.hash.substring(0, 8)}...{block.hash.substring(block.hash.length - 6)}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-500">
                    <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-700">No matching land transfers found.</p>
                    <p className="text-xs text-slate-400 mt-1">Try searching with a different Land ID or Survey Number.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Academic Note */}
        <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-500 text-[11px] flex items-center justify-between">
          <span>
            <strong>Academic Note:</strong> In this blockchain ledger, property rights are verified by tracing the parcel ID through historical blocks back to the Genesis Block.
          </span>
          <span className="font-mono text-slate-400">Total Transfers: {transferBlocks.length}</span>
        </div>
      </div>
    </div>
  );
};
