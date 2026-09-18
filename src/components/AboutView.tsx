import React from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Terminal, 
  Table, 
  Layers, 
  Shield, 
  FileText
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const testCases = [
    {
      id: 'TC-01',
      desc: 'Genesis Block creation',
      action: 'Initialize blockchain instance',
      expected: 'Genesis Block created with previous hash = "0"',
      observed: 'Block 0 created with prev_hash = "0" and valid SHA-256 hash',
      status: 'Pass'
    },
    {
      id: 'TC-02',
      desc: 'Add first land transfer',
      action: 'Enter LAND001 parcel data',
      expected: 'New Block 1 created and linked to Block 0',
      observed: 'Block 1 created; prev_hash matches Block 0 hash exactly',
      status: 'Pass'
    },
    {
      id: 'TC-03',
      desc: 'Add second land transfer',
      action: 'Enter LAND002 parcel data',
      expected: 'Block 2 linked to Block 1',
      observed: 'Block 2 created; prev_hash matches Block 1 hash exactly',
      status: 'Pass'
    },
    {
      id: 'TC-04',
      desc: 'Add third land transfer',
      action: 'Enter LAND003 parcel data',
      expected: 'Block 3 linked to Block 2',
      observed: 'Block 3 created; prev_hash matches Block 2 hash exactly',
      status: 'Pass'
    },
    {
      id: 'TC-05',
      desc: 'Verify blockchain',
      action: 'Trigger validation function',
      expected: 'Blockchain Status: VALID',
      observed: 'All recalculations match; Status confirmed VALID',
      status: 'Pass'
    },
    {
      id: 'TC-06',
      desc: 'Tamper detection test',
      action: 'Simulate changing New Owner in Block 1',
      expected: 'Blockchain Status: INVALID; Tampering detected',
      observed: 'Hash mismatch detected at Block 1; Status INVALID',
      status: 'Pass'
    },
    {
      id: 'TC-07',
      desc: 'Restore original data',
      action: 'Trigger Restore Original Data action',
      expected: 'Blockchain Status: VALID',
      observed: 'Original record snapshot restored; Status VALID',
      status: 'Pass'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Card: Student & Project Details */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <GraduationCap className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">VTU Academic Submission</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Blockchain-Based Land Transfer Tracking System Using Genesis Block
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Academic Mini-Project for 7th Semester B.E. Degree Examination
            </p>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs space-y-1">
            <div><span className="text-slate-500">Student:</span> <strong>Sanjai Shanmuga Prabu</strong></div>
            <div><span className="text-slate-500">USN:</span> <strong className="font-mono text-blue-700">1SP23IC047</strong></div>
            <div><span className="text-slate-500">Subject:</span> <strong>Blockchain Technology (BIC702)</strong></div>
            <div><span className="text-slate-500">Activity:</span> <strong>Activity 2 – Activity No: 21</strong></div>
          </div>
        </div>

        {/* 1. Problem Statement & 2. Proposed Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              <span>1. Problem Statement</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Traditional paper-based and centralized database land registries suffer from single-point failure, unauthorized record alteration, lack of historical provenance, and absence of independent cryptographic audit trails. In centralized systems, an administrator or intruder can modify property ownership records without leaving an indelible mathematical trace.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>2. Proposed Solution</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The proposed solution implements a Python-based blockchain from scratch initialized with a <strong>Genesis Block (Block 0)</strong> with <code>previous_hash = "0"</code>. Successive land transfers are bundled into discrete blocks, hashed with <strong>SHA-256</strong>, and cryptographically chained. Any retroactive alteration breaks the downstream hash chain and triggers instant invalidation.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Objectives */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-600" />
          <span>3. Project Objectives (1 to 7)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
          <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
            <strong>Objective 1:</strong> Construct a Genesis Block (Block 0) as the foundation of the chain.
          </div>
          <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
            <strong>Objective 2:</strong> Implement SHA-256 cryptographic hashing on block attributes.
          </div>
          <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
            <strong>Objective 3:</strong> Record land transfers (Land ID, survey no, seller, buyer) into blocks.
          </div>
          <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
            <strong>Objective 4:</strong> Establish strict cryptographic linkage using previous hash pointers.
          </div>
          <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
            <strong>Objective 5:</strong> Implement a verification algorithm auditing full chain integrity.
          </div>
          <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
            <strong>Objective 6:</strong> Demonstrate tamper detection by simulating unauthorized data alteration.
          </div>
          <div className="sm:col-span-2 p-2.5 rounded bg-slate-50 border border-slate-200">
            <strong>Objective 7:</strong> Deliver a clean, intuitive web interface suitable for academic presentation and viva.
          </div>
        </div>
      </div>

      {/* 4. Algorithm */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-600" />
          <span>4. Academic Algorithm (Steps 1 to 17)</span>
        </h3>

        <div className="p-4 bg-slate-900 text-slate-200 rounded-lg font-mono text-xs space-y-1 overflow-x-auto">
          <div><span className="text-amber-400">Step 1:</span> Start.</div>
          <div><span className="text-amber-400">Step 2:</span> Create Genesis Block.</div>
          <div><span className="text-amber-400">Step 3:</span> Set Genesis Block previous hash to "0".</div>
          <div><span className="text-amber-400">Step 4:</span> Calculate Genesis Block SHA-256 hash.</div>
          <div><span className="text-amber-400">Step 5:</span> Accept land transfer details (Land ID, survey no, seller, buyer, date).</div>
          <div><span className="text-amber-400">Step 6:</span> Create a new land transfer block candidate.</div>
          <div><span className="text-amber-400">Step 7:</span> Obtain the previous block hash from the end of the chain.</div>
          <div><span className="text-amber-400">Step 8:</span> Store the previous hash into the new block.</div>
          <div><span className="text-amber-400">Step 9:</span> Calculate the new block SHA-256 hash.</div>
          <div><span className="text-amber-400">Step 10:</span> Add the block to the blockchain list.</div>
          <div><span className="text-amber-400">Step 11:</span> Repeat for additional land transfers.</div>
          <div><span className="text-amber-400">Step 12:</span> Validate the blockchain integrity.</div>
          <div><span className="text-amber-400">Step 13:</span> Compare each block's hash with its recalculated hash.</div>
          <div><span className="text-amber-400">Step 14:</span> Compare each block's previous hash with the predecessor block's hash.</div>
          <div><span className="text-amber-400">Step 15:</span> Display VALID if all checks pass.</div>
          <div><span className="text-amber-400">Step 16:</span> Display INVALID if any check fails.</div>
          <div><span className="text-amber-400">Step 17:</span> Stop.</div>
        </div>
      </div>

      {/* 5. Testing Table (Section 29) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Table className="w-4 h-4 text-blue-600" />
          <span>5. Test Cases & Experimental Results (TC-01 through TC-07)</span>
        </h3>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-900 text-slate-200 font-semibold uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Test ID</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3">Input / Action</th>
                <th className="py-2.5 px-3">Expected Result</th>
                <th className="py-2.5 px-3">Observed Result</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {testCases.map((tc) => (
                <tr key={tc.id} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-700">{tc.id}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">{tc.desc}</td>
                  <td className="py-2.5 px-3 text-slate-600">{tc.action}</td>
                  <td className="py-2.5 px-3 text-slate-700">{tc.expected}</td>
                  <td className="py-2.5 px-3 text-slate-600">{tc.observed}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                      {tc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Result, Advantages, Limitations, Future Scope */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <h4 className="font-bold text-emerald-800 text-sm flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>6. Result</span>
          </h4>
          <p className="text-slate-600 leading-relaxed">
            The implemented system successfully demonstrates Genesis Block generation, land transfer transaction recording, real SHA-256 cryptographic hashing, sequential previous-hash linkage, blockchain formation, mathematical validation, and instant tamper detection.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <h4 className="font-bold text-blue-800 text-sm flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-blue-600" />
            <span>7. Advantages</span>
          </h4>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>Tamper-evident linked list data structure</li>
            <li>Complete transparent historical traceability of parcels</li>
            <li>Cryptographic SHA-256 integrity assurance</li>
            <li>Independent verification without proprietary tools</li>
          </ul>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <h4 className="font-bold text-rose-800 text-sm flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>8. Limitations</span>
          </h4>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>Academic demonstration using in-memory state.</li>
            <li>Not integrated with statutory government registries.</li>
            <li>Does not establish legal real-world land title.</li>
            <li>Single-node prototype without distributed P2P consensus.</li>
          </ul>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <h4 className="font-bold text-purple-800 text-sm flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>9. Future Scope</span>
          </h4>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>Transition to permissioned distributed networks (Hyperledger Fabric).</li>
            <li>Digital signatures using asymmetric public-private key pairs (ECDSA).</li>
            <li>Smart contracts for automated escrow and tax clearance.</li>
            <li>Integration with government GIS land survey databases.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
