# Blockchain-Based Land Transfer Tracking System Using Genesis Block

**Visvesvaraya Technological University (VTU)**  
**Subject:** Blockchain Technology  
**Subject Code:** BIC702  
**Activity:** Activity Based Learning – Activity 2 (Activity Number: 21)  
**Assigned Topic:** Land Transfer Tracking System  

---

## 1. Student Details
- **Student Name:** Sanjai Shanmuga Prabu
- **USN:** 1SP23IC047
- **Degree:** Bachelor of Engineering (B.E.)
- **Semester:** 7th Semester

---

## 2. Project Title
**"Blockchain-Based Land Transfer Tracking System Using Genesis Block"**

---

## 3. Project Objective
To design, implement, and demonstrate a lightweight blockchain from scratch using SHA-256 cryptographic hashing that begins with a Genesis Block (Block 0) and records sequential land ownership transfers as linked blocks with real-time tamper detection and integrity verification.

Key demonstration aspects:
1. Creation of Genesis Block (Block 0) with `previous_hash = "0"`.
2. Real cryptographic SHA-256 calculation on block attributes.
3. Cryptographic chaining via previous hash references.
4. Recording land transfer transactions (Land ID, survey number, seller, buyer).
5. Mathematical verification of chain integrity.
6. Demonstration of tamper detection when historical data is altered.

---

## 4. Problem Statement
Traditional centralized land registry and deed recording mechanisms face persistent vulnerabilities:
- Risk of unauthorized modification or deletion of ownership records by malicious actors or rogue administrators.
- Lack of cryptographic audit trails to prove historical authenticity.
- Difficulty in proving that previous ownership records have remained intact.

A blockchain architecture solves this through an immutable, chronologically linked cryptographic structure where any retroactive modification breaks subsequent block hashes.

> *Academic Note:* This project is an educational proof-of-concept for VTU BIC702 and does not confer legal ownership or replace statutory government land registries.

---

## 5. Proposed Solution
The proposed system implements a blockchain from scratch in Python:
- Starts with an initial **Genesis Block (Block 0)**.
- Every subsequent land transfer is encapsulated into a new block containing:
  - Block Index
  - Timestamp
  - Land Transfer Parameters (Land ID, Survey Number, Location, Previous Owner, New Owner, Transfer Date, Transfer Type)
  - Previous Block SHA-256 Hash
  - Current Block SHA-256 Hash
- Provides a verification function that checks both hash recalculation and previous hash linkage.
- Includes an academic **Tamper Detection Demo** showing how modifying an owner's name breaks the chain, alongside a **Restore Original Data** mechanism.

---

## 6. Technologies Used
- **Programming Language:** Python 3
- **Web Framework:** Flask
- **Cryptographic Library:** Python `hashlib` (SHA-256 standard)
- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap 5
- **Storage:** In-memory ledger with snapshot capabilities for academic demonstrations

---

## 7. System Architecture
```text
USER / LAND ADMIN
        ↓
LAND TRANSFER DATA ENTRY (Land ID, Survey Number, Seller, Buyer, Date)
        ↓
TRANSACTION CREATION
        ↓
NEW BLOCK (Index = N, Timestamp)
        ↓
PREVIOUS HASH LINK (Fetch Hash of Block N-1)
        ↓
SHA-256 HASH COMPUTATION (hashlib.sha256)
        ↓
BLOCKCHAIN LIST APPEND
        ↓
CONTINUOUS VALIDATION & TAMPER AUDITING
        ↓
LAND TRANSFER VERIFICATION / SEARCH
```

---

## 8. Genesis Block Explanation
The **Genesis Block** is Block 0—the foundational anchor of the entire blockchain:
- **Block Index:** `0`
- **Timestamp:** Initialization timestamp (`2026-09-18 09:00:00`)
- **Data:** `"Genesis Block / Blockchain Initialization - VTU BIC702"`
- **Previous Hash:** `"0"` (Because it is the initial block with no predecessor)
- **Current Hash:** Computed via `SHA256(index + timestamp + data + previous_hash)`

Every subsequent block (Block 1, Block 2, Block 3) links back to Block 0 through an unbroken cryptographic chain.

---

## 9. Blockchain Structure
```text
+-------------------------------------------------------------+
| Block 0: GENESIS BLOCK                                      |
| Index: 0 | Timestamp: 2026-09-18 09:00:00                   |
| Data: "Genesis Block / Blockchain Initialization"           |
| Previous Hash: "0"                                          |
| Current Hash: 55118da89c1c7b0f6d1836b0e835df5007c0...       |
+-------------------------------------------------------------+
                              |
                              v (Previous Hash = Hash(Block 0))
+-------------------------------------------------------------+
| Block 1: LAND TRANSFER 1                                    |
| Index: 1 | Land ID: LAND001 | Survey: SURV1001              |
| Previous Owner: Ravi Kumar -> New Owner: Arjun Kumar        |
| Previous Hash: 55118da89c1c7b0f6d1836b0e835df5007c0...       |
| Current Hash: 8fa2b109...                                   |
+-------------------------------------------------------------+
                              |
                              v (Previous Hash = Hash(Block 1))
+-------------------------------------------------------------+
| Block 2: LAND TRANSFER 2                                    |
| Index: 2 | Land ID: LAND002 | Survey: SURV1002              |
| Previous Owner: Priya Sharma -> New Owner: Ananya Rao       |
| Previous Hash: 8fa2b109...                                  |
| Current Hash: c714e820...                                   |
+-------------------------------------------------------------+
```

---

## 10. Algorithm
```text
1. Start.
2. Create Genesis Block.
3. Set Genesis Block previous hash to "0".
4. Calculate Genesis Block SHA-256 hash.
5. Accept land transfer details.
6. Create a new land transfer block.
7. Obtain the previous block hash.
8. Store the previous hash in the new block.
9. Calculate the new block SHA-256 hash.
10. Add the block to the blockchain.
11. Repeat for additional transfers.
12. Validate the blockchain.
13. Compare each block's hash with its recalculated hash.
14. Compare each block's previous hash with the previous block's hash.
15. Display VALID if all checks pass.
16. Display INVALID if any check fails.
17. Stop.
```

---

## 11. Installation & Setup Instructions

### Prerequisites
- Python 3.8 or higher installed on the machine.
- Terminal / Command Prompt.

### Step 1: Clone or Navigate to the Folder
```bash
cd python-project
```

### Step 2: Create a Virtual Environment (Optional but Recommended)
```bash
python3 -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate
```

### Step 3: Install Required Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Run the Application
```bash
python app.py
```

### Step 5: Open in Web Browser
Open your browser and navigate to:
```text
http://127.0.0.1:5000
```

---

## 12. Step-by-Step Testing Instructions
1. **Launch App:** Start Flask and open the Dashboard.
2. **Verify Genesis Block:** Observe that Block 0 is initialized with `Previous Hash = "0"`.
3. **Load Sample Data:** Click "Load Sample Data" to populate Blocks 1, 2, and 3.
4. **Inspect Blockchain:** Navigate to the "Blockchain" page and inspect all SHA-256 hash links.
5. **Add New Transfer:** Go to "Add Transfer" and record a new land parcel (e.g. `LAND004`).
6. **Search Record:** Go to "Transfer History" and search for `LAND001` or `Bengaluru`.
7. **Perform Validation:** Navigate to "Verification" and click "Verify Blockchain" -> Status: **VALID**.
8. **Simulate Tampering:** Under "Tamper Detection Demo", select Block 1, alter the buyer's name, and submit.
9. **Observe Tamper Detection:** Notice the immediate alert: `BLOCKCHAIN INVALID` with broken block identification!
10. **Restore Authenticity:** Click "Restore Original Data" and re-verify -> Status: **VALID**.

---

## 13. Test Cases & Experimental Results

| Test Case | Description | Input / Action | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| TC-01 | Genesis Block Creation | App startup | Block 0 created with prev_hash = "0" | Block 0 created with prev_hash = "0" | Pass |
| TC-02 | Add 1st Land Transfer | LAND001 details | Block 1 created, linked to Block 0 | Block 1 linked via Block 0 hash | Pass |
| TC-03 | Add 2nd Land Transfer | LAND002 details | Block 2 created, linked to Block 1 | Block 2 linked via Block 1 hash | Pass |
| TC-04 | Add 3rd Land Transfer | LAND003 details | Block 3 created, linked to Block 2 | Block 3 linked via Block 2 hash | Pass |
| TC-05 | Blockchain Validation | Trigger validation | Blockchain Status: VALID | Recalculated hashes match; VALID | Pass |
| TC-06 | Tamper Detection Demo | Modify owner in Block 1 | Blockchain Status: INVALID | Hash mismatch detected; INVALID | Pass |
| TC-07 | Restore Data | Restore snapshot | Blockchain Status: VALID | Restored to genuine hash; VALID | Pass |

---

## 14. Advantages
- **Tamper-Evident:** Any modification immediately invalidates the entire subsequent chain.
- **Traceability:** Full provenance and chronological history of all land parcels.
- **Independence:** Integrity can be checked mathematically without trusting a single central authority.
- **Transparency:** All stakeholders have a consistent view of the transaction history.

---

## 15. Limitations
- Single-node academic demonstration (in-memory state).
- Not connected to statutory government revenue/land registries.
- Does not establish real-world legal ownership titles.
- Lacks distributed consensus mechanisms (PoW, PoS, or PBFT).

---

## 16. Future Scope
- Integration with permissioned networks like Hyperledger Fabric.
- Implementation of asymmetric digital signatures (ECDSA) for seller authorization.
- Smart contracts for automated stamp duty calculation and conditional escrow payments.
- Decentralized GIS mapping for land polygon boundaries.

---

## 17. Conclusion
The "Blockchain-Based Land Transfer Tracking System Using Genesis Block" fulfills all academic requirements of VTU BIC702 (Activity 2). It provides a technically sound, transparent, and easy-to-understand demonstration of blockchain fundamentals, proving the power of Genesis Blocks, cryptographic hashing, and chained linkages in preventing unauthorized tampering.
