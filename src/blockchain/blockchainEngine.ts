import { Block, LandTransferData, BlockchainValidationResult, ValidationCheckDetail } from '../types';
import { sha256 } from './sha256';

export const SAMPLE_DATA: LandTransferData[] = [
  {
    landId: 'LAND001',
    surveyNumber: 'SURV1001',
    location: 'Bengaluru',
    previousOwner: 'Ravi Kumar',
    newOwner: 'Arjun Kumar',
    transferDate: '2026-09-10',
    transferType: 'Ownership Transfer',
    remarks: 'Demonstration transfer record - Sub-Registrar Office Bengaluru North'
  },
  {
    landId: 'LAND002',
    surveyNumber: 'SURV1002',
    location: 'Mysuru',
    previousOwner: 'Priya Sharma',
    newOwner: 'Ananya Rao',
    transferDate: '2026-09-12',
    transferType: 'Sale',
    remarks: 'Demonstration transfer record - Chamundi Zone Mysuru'
  },
  {
    landId: 'LAND003',
    surveyNumber: 'SURV1003',
    location: 'Tumakuru',
    previousOwner: 'Suresh Kumar',
    newOwner: 'Kiran Kumar',
    transferDate: '2026-09-15',
    transferType: 'Inheritance',
    remarks: 'Demonstration transfer record - Heritage Property Transfer'
  }
];

export function serializeData(data: LandTransferData | string): string {
  if (typeof data === 'string') {
    return data;
  }
  // Deterministic string representation matching Python JSON / string concatenation
  return JSON.stringify({
    landId: data.landId,
    surveyNumber: data.surveyNumber,
    location: data.location,
    previousOwner: data.previousOwner,
    newOwner: data.newOwner,
    transferDate: data.transferDate,
    transferType: data.transferType
  });
}

export function calculateBlockHash(
  index: number,
  timestamp: string,
  data: LandTransferData | string,
  previousHash: string
): string {
  const dataString = serializeData(data);
  const rawString = `${index}${timestamp}${dataString}${previousHash}`;
  return sha256(rawString);
}

export class Blockchain {
  public chain: Block[];
  private originalBlockSnapshots: Map<number, Block>;

  constructor() {
    this.chain = [];
    this.originalBlockSnapshots = new Map();
    this.createGenesisBlock();
  }

  /**
   * Block 0: Genesis Block
   * Previous Hash = "0"
   * Data = "Genesis Block / Blockchain Initialization"
   */
  public createGenesisBlock(): Block {
    const index = 0;
    const timestamp = '2026-09-18 09:00:00';
    const data = 'Genesis Block / Blockchain Initialization - VTU BIC702';
    const previousHash = '0';
    const hash = calculateBlockHash(index, timestamp, data, previousHash);

    const genesisBlock: Block = {
      index,
      timestamp,
      data,
      previousHash,
      hash,
      isGenesis: true,
      isTampered: false
    };

    this.chain = [genesisBlock];
    this.originalBlockSnapshots.set(0, JSON.parse(JSON.stringify(genesisBlock)));
    return genesisBlock;
  }

  public getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  /**
   * Add a new Land Transfer Block to the blockchain
   */
  public addBlock(landData: LandTransferData, customTimestamp?: string): Block {
    const latestBlock = this.getLatestBlock();
    const index = this.chain.length;
    
    // Format timestamp nicely
    const now = new Date();
    const timestamp = customTimestamp || now.toISOString().replace('T', ' ').substring(0, 19);
    const previousHash = latestBlock.hash;
    const hash = calculateBlockHash(index, timestamp, landData, previousHash);

    const newBlock: Block = {
      index,
      timestamp,
      data: { ...landData },
      previousHash,
      hash,
      isGenesis: false,
      isTampered: false
    };

    this.chain.push(newBlock);
    this.originalBlockSnapshots.set(index, JSON.parse(JSON.stringify(newBlock)));
    return newBlock;
  }

  /**
   * Load predefined academic demonstration sample records
   */
  public loadSampleData(): void {
    // Reset to genesis block first to keep clean deterministic sequence
    this.createGenesisBlock();
    for (const sample of SAMPLE_DATA) {
      this.addBlock(sample, `${sample.transferDate} 11:30:00`);
    }
  }

  /**
   * Validate the blockchain integrity and hash linkages
   */
  public validate(): BlockchainValidationResult {
    const details: ValidationCheckDetail[] = [];
    let isOverallValid = true;
    let brokenBlockIndex: number | null = null;
    let failureReason = '';
    let hashLinksValid = true;
    let dataIntegrityValid = true;

    if (this.chain.length === 0) {
      return {
        isValid: false,
        totalBlocks: 0,
        genesisStatus: 'MISSING',
        hashLinksValid: false,
        dataIntegrityValid: false,
        brokenBlockIndex: 0,
        message: 'Blockchain is empty. Genesis block missing.',
        details: [],
        verifiedAt: new Date().toISOString()
      };
    }

    // 1. Verify Genesis Block (Block 0)
    const genesis = this.chain[0];
    const recalculatedGenesisHash = calculateBlockHash(
      genesis.index,
      genesis.timestamp,
      genesis.data,
      genesis.previousHash
    );

    const genesisHashMatch = genesis.hash === recalculatedGenesisHash;
    const genesisPrevMatch = genesis.previousHash === '0';
    const genesisValid = genesis.index === 0 && genesisHashMatch && genesisPrevMatch;

    details.push({
      blockIndex: 0,
      blockType: 'GENESIS',
      storedHash: genesis.hash,
      calculatedHash: recalculatedGenesisHash,
      hashMatch: genesisHashMatch,
      storedPrevHash: genesis.previousHash,
      actualPrevHash: '0',
      prevHashMatch: genesisPrevMatch,
      isValid: genesisValid,
      failureReason: !genesisValid ? 'Genesis Block header or hash was modified.' : undefined
    });

    if (!genesisValid) {
      isOverallValid = false;
      dataIntegrityValid = false;
      brokenBlockIndex = 0;
      failureReason = 'Genesis Block hash or previous hash is invalid.';
    }

    // 2. Verify all subsequent blocks
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Check 1: Recalculate hash of current block
      const recalculatedHash = calculateBlockHash(
        currentBlock.index,
        currentBlock.timestamp,
        currentBlock.data,
        currentBlock.previousHash
      );
      const hashMatch = currentBlock.hash === recalculatedHash;

      // Check 2: Current block's previousHash must equal previous block's hash
      const prevHashMatch = currentBlock.previousHash === previousBlock.hash;

      const blockValid = hashMatch && prevHashMatch;

      let blockFailureReason: string | undefined = undefined;
      if (!hashMatch) {
        blockFailureReason = `Data tampering: Recalculated hash does not match stored hash for Block ${i}.`;
        dataIntegrityValid = false;
      } else if (!prevHashMatch) {
        blockFailureReason = `Broken chain linkage: Previous hash in Block ${i} does not match Block ${i - 1}'s hash.`;
        hashLinksValid = false;
      }

      details.push({
        blockIndex: i,
        blockType: 'LAND_TRANSFER',
        storedHash: currentBlock.hash,
        calculatedHash: recalculatedHash,
        hashMatch,
        storedPrevHash: currentBlock.previousHash,
        actualPrevHash: previousBlock.hash,
        prevHashMatch,
        isValid: blockValid,
        failureReason: blockFailureReason
      });

      if (!blockValid && isOverallValid) {
        isOverallValid = false;
        brokenBlockIndex = i;
        failureReason = blockFailureReason || 'Integrity check failed.';
      }
    }

    return {
      isValid: isOverallValid,
      totalBlocks: this.chain.length,
      genesisStatus: genesisValid ? 'PRESENT' : 'CORRUPTED',
      hashLinksValid,
      dataIntegrityValid,
      brokenBlockIndex,
      message: isOverallValid
        ? 'Blockchain Status: VALID. No tampering detected. All cryptographic hash links and block contents verified.'
        : `Blockchain Status: INVALID. Tampering detected at Block ${brokenBlockIndex}! ${failureReason}`,
      details,
      verifiedAt: new Date().toLocaleTimeString()
    };
  }

  /**
   * Academic Tamper Detection Demo:
   * Simulates an unauthorized alteration of land transfer records without recalculating the hash,
   * or altering historical owner data to prove cryptographic detection.
   */
  public tamperBlock(blockIndex: number, field: keyof LandTransferData, newValue: string): boolean {
    if (blockIndex <= 0 || blockIndex >= this.chain.length) {
      return false;
    }

    const block = this.chain[blockIndex];
    if (typeof block.data === 'string') return false;

    // Save snapshot if not already saved
    if (!this.originalBlockSnapshots.has(blockIndex)) {
      this.originalBlockSnapshots.set(blockIndex, JSON.parse(JSON.stringify(block)));
    }

    // Mutate the field directly in block data
    (block.data as any)[field] = newValue;
    block.isTampered = true;
    return true;
  }

  /**
   * Restore the original authentic data from snapshot
   */
  public restoreBlock(blockIndex: number): boolean {
    const original = this.originalBlockSnapshots.get(blockIndex);
    if (!original || blockIndex >= this.chain.length) {
      return false;
    }

    this.chain[blockIndex] = JSON.parse(JSON.stringify(original));
    this.chain[blockIndex].isTampered = false;
    return true;
  }

  /**
   * Search blocks by Land ID or Survey Number
   */
  public search(query: string): Block[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return this.chain.filter(block => {
      if (block.isGenesis || typeof block.data === 'string') {
        return false;
      }
      const data = block.data as LandTransferData;
      return (
        data.landId.toLowerCase().includes(q) ||
        data.surveyNumber.toLowerCase().includes(q) ||
        data.location.toLowerCase().includes(q) ||
        data.previousOwner.toLowerCase().includes(q) ||
        data.newOwner.toLowerCase().includes(q)
      );
    });
  }
}

// Global singleton instance for app state
export const blockchainInstance = new Blockchain();
