export interface LandTransferData {
  landId: string;
  surveyNumber: string;
  location: string;
  previousOwner: string;
  newOwner: string;
  transferDate: string;
  transferType: 'Ownership Transfer' | 'Sale' | 'Gift' | 'Inheritance';
  remarks?: string;
}

export interface Block {
  index: number;
  timestamp: string; // ISO string or human-readable format
  data: LandTransferData | string; // Genesis block has string or special object
  previousHash: string;
  hash: string;
  isGenesis: boolean;
  isTampered?: boolean;
  originalDataSnapshot?: any;
}

export interface ValidationCheckDetail {
  blockIndex: number;
  blockType: 'GENESIS' | 'LAND_TRANSFER';
  storedHash: string;
  calculatedHash: string;
  hashMatch: boolean;
  storedPrevHash: string;
  actualPrevHash: string;
  prevHashMatch: boolean;
  isValid: boolean;
  failureReason?: string;
}

export interface BlockchainValidationResult {
  isValid: boolean;
  totalBlocks: number;
  genesisStatus: 'PRESENT' | 'MISSING' | 'CORRUPTED';
  hashLinksValid: boolean;
  dataIntegrityValid: boolean;
  brokenBlockIndex: number | null;
  message: string;
  details: ValidationCheckDetail[];
  verifiedAt: string;
}

export interface TamperState {
  isTampered: boolean;
  tamperedBlockIndex: number | null;
  originalBlockData: LandTransferData | null;
  tamperedField: string | null;
  tamperedValue: string | null;
}
