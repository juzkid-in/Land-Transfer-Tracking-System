import React, { useState } from 'react';
import { 
  Code2, 
  HelpCircle, 
  Terminal, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  CheckCircle2,
  FileCode,
  Sparkles
} from 'lucide-react';

export const PythonSubmissionView: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'blockchain' | 'app' | 'commands'>('blockchain');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [expandedViva, setExpandedViva] = useState<number | null>(0);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const vivaQuestions = [
    {
      q: '1. What is a Genesis Block?',
      a: 'The Genesis Block is the very first block of a blockchain. In our land tracking project, it is Block 0. It serves as the common starting point for the entire ledger and has no preceding block.'
    },
    {
      q: '2. Why is the previous hash of the Genesis Block set to "0"?',
      a: 'Because the Genesis Block is the initial block in the blockchain, there is no previous block before it. To satisfy the requirement that every block must hold a previous_hash attribute, its value is hardcoded to "0".'
    },
    {
      q: '3. What data does the Genesis Block store in your project?',
      a: 'It stores: index = 0, timestamp, data = "Genesis Block / Blockchain Initialization - VTU BIC702", previous_hash = "0", and its calculated SHA-256 hash.'
    },
    {
      q: '4. How are blocks linked together in your blockchain?',
      a: 'Each new block retrieves the SHA-256 hash of the current latest block and stores it in its own previous_hash attribute. This forms an unbroken cryptographic chain of pointers.'
    },
    {
      q: '5. Which hashing algorithm did you use and why?',
      a: 'We used SHA-256 (Secure Hash Algorithm 256-bit) via Python\'s standard hashlib library. It produces a deterministic 64-character hexadecimal digest, is irreversible (one-way), and exhibits the avalanche effect.'
    },
    {
      q: '6. What inputs are used to calculate the hash of a block?',
      a: 'The hash calculation combines: Block Index + Timestamp + Block Data (Land ID, survey number, seller, buyer, etc.) + Previous Hash. All values are concatenated and passed through hashlib.sha256().'
    },
    {
      q: '7. How does your system detect tampering?',
      a: 'The validation function iterates through all blocks starting from index 1. For each block, it recalculates the SHA-256 hash from its contents and compares it to the stored hash, and also verifies that block.previous_hash equals the hash of the preceding block. If an owner is altered, the recalculated hash fails to match, flagging the chain as INVALID.'
    },
    {
      q: '8. What happens to the blockchain if someone changes the buyer name in Block 1?',
      a: 'Block 1\'s recalculated SHA-256 hash will no longer match its stored hash. Furthermore, Block 2\'s previous_hash would no longer link to Block 1\'s new hash. The verification algorithm instantly catches this discrepancy and identifies Block 1 as corrupted.'
    },
    {
      q: '9. Is your blockchain running in a centralized or decentralized environment?',
      a: 'For this academic mini-project, it is implemented as a single-node Python Flask application with an in-memory blockchain ledger. In a real-world enterprise deployment, it would run across a distributed peer-to-peer network using consensus protocols.'
    },
    {
      q: '10. Does this project replace a government land registry?',
      a: 'No. This is an academic proof-of-concept for VTU BIC702 to demonstrate the Genesis Block, cryptographic hashing, and immutability concepts. It uses fictional demo records and does not confer legal ownership titles.'
    }
  ];

  const blockchainPySnippet = `import hashlib
import json
from datetime import datetime

class Block:
    def __init__(self, index, timestamp, data, previous_hash):
        self.index = index
        self.timestamp = timestamp
        self.data = data
        self.previous_hash = previous_hash
        self.is_genesis = (index == 0)
        self.is_tampered = False
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        data_string = json.dumps(self.data, sort_keys=True) if isinstance(self.data, dict) else str(self.data)
        block_string = f"{self.index}{self.timestamp}{data_string}{self.previous_hash}"
        return hashlib.sha256(block_string.encode('utf-8')).hexdigest()

class Blockchain:
    def __init__(self):
        self.chain = []
        self.create_genesis_block()

    def create_genesis_block(self):
        genesis_block = Block(
            index=0,
            timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            data="Genesis Block / Blockchain Initialization - VTU BIC702",
            previous_hash="0"
        )
        self.chain.append(genesis_block)
        return genesis_block

    def get_latest_block(self):
        return self.chain[-1]

    def add_block(self, land_transfer_data):
        latest_block = self.get_latest_block()
        new_block = Block(
            index=len(self.chain),
            timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            data=land_transfer_data,
            previous_hash=latest_block.hash
        )
        self.chain.append(new_block)
        return new_block

    def validate_chain(self):
        # Full cryptographic audit
        for i in range(1, len(self.chain)):
            current = self.chain[i]
            previous = self.chain[i - 1]
            if current.hash != current.calculate_hash():
                return False, f"Tampering at Block #{current.index}"
            if current.previous_hash != previous.hash:
                return False, f"Broken link between Block #{previous.index} and #{current.index}"
        return True, "Blockchain is VALID"`;

  const appPySnippet = `from flask import Flask, render_template, request, redirect, url_for, flash
from blockchain import Blockchain

app = Flask(__name__)
app.secret_key = "vtu_bic702_academic_secret_key"

blockchain = Blockchain()

@app.route('/')
def dashboard():
    is_valid, message = blockchain.validate_chain()
    total_blocks = len(blockchain.chain)
    land_transfers = max(0, total_blocks - 1)
    return render_template(
        'dashboard.html',
        chain=blockchain.chain,
        total_blocks=total_blocks,
        land_transfers=land_transfers,
        is_valid=is_valid,
        message=message
    )

@app.route('/add_transfer', methods=['GET', 'POST'])
def add_transfer():
    if request.method == 'POST':
        transfer_data = {
            'land_id': request.form['land_id'].strip().upper(),
            'survey_number': request.form['survey_number'].strip().upper(),
            'location': request.form['location'].strip(),
            'previous_owner': request.form['previous_owner'].strip(),
            'new_owner': request.form['new_owner'].strip(),
            'transfer_date': request.form['transfer_date'],
            'transfer_type': request.form['transfer_type']
        }
        blockchain.add_block(transfer_data)
        flash("Land Transfer Block successfully minted and added to the chain!", "success")
        return redirect(url_for('blockchain_view'))
    return render_template('add_transfer.html', latest_block=blockchain.get_latest_block())

if __name__ == '__main__':
    app.run(debug=True, port=5000)`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-600 mb-1">
            <Code2 className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Project Assets</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Python Source Code & VTU Viva Examination Guide</h2>
          <p className="text-xs text-slate-500 mt-1">
            Standalone Python scripts ready for local execution along with academic viva questions and answers.
          </p>
        </div>

        <div className="text-xs font-mono bg-purple-50 text-purple-800 border border-purple-200 px-3 py-1.5 rounded-lg">
          Directory: <span className="font-bold">/python-project/</span>
        </div>
      </div>

      {/* Code Viewer Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-slate-900 p-3 px-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveCodeTab('blockchain')}
              className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition ${
                activeCodeTab === 'blockchain'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              blockchain.py
            </button>
            <button
              onClick={() => setActiveCodeTab('app')}
              className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition ${
                activeCodeTab === 'app'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              app.py (Flask)
            </button>
            <button
              onClick={() => setActiveCodeTab('commands')}
              className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition ${
                activeCodeTab === 'commands'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Run Commands
            </button>
          </div>

          <div>
            <button
              onClick={() => {
                const text = activeCodeTab === 'blockchain' ? blockchainPySnippet : appPySnippet;
                handleCopy(text, activeCodeTab);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition"
            >
              {copiedKey === activeCodeTab ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === activeCodeTab ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
        </div>

        <div className="p-4 bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto max-h-96">
          {activeCodeTab === 'blockchain' && (
            <pre className="text-slate-300">{blockchainPySnippet}</pre>
          )}
          {activeCodeTab === 'app' && (
            <pre className="text-slate-300">{appPySnippet}</pre>
          )}
          {activeCodeTab === 'commands' && (
            <div className="space-y-4 text-xs font-mono">
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block mb-1"># 1. Navigate to directory:</span>
                <span className="text-emerald-400 font-bold">cd python-project</span>
              </div>
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block mb-1"># 2. Install dependencies:</span>
                <span className="text-emerald-400 font-bold">pip install -r requirements.txt</span>
              </div>
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block mb-1"># 3. Launch Flask server:</span>
                <span className="text-emerald-400 font-bold">python app.py</span>
              </div>
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block mb-1"># 4. Open in browser:</span>
                <span className="text-sky-400 font-bold">http://127.0.0.1:5000</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* VTU Viva Questions and Answers Accordion (Section 37) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2 text-slate-900">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-base">VTU BIC702 Viva Questions & Answers</h3>
          </div>
          <span className="text-xs font-mono text-slate-500">10 Core Exam Questions</span>
        </div>

        <p className="text-xs text-slate-600">
          These questions directly test understanding of the Genesis Block, SHA-256 hashing, and tamper detection as evaluated in the BIC702 laboratory/viva examination:
        </p>

        <div className="space-y-2.5">
          {vivaQuestions.map((item, idx) => {
            const isExpanded = expandedViva === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-lg overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setExpandedViva(isExpanded ? null : idx)}
                  className="w-full text-left p-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-xs font-bold text-slate-800 transition"
                >
                  <span className="text-blue-900">{item.q}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                {isExpanded && (
                  <div className="p-3.5 bg-white text-xs text-slate-600 border-t border-slate-200 leading-relaxed">
                    <strong className="text-emerald-700 block mb-1">Answer for Examiner:</strong>
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
