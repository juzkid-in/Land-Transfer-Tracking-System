"""
VTU BIC702 - Blockchain Technology
Activity Based Learning - Activity 2 (Activity No: 21)
Student: Sanjai Shanmuga Prabu (USN: 1SP23IC047)
Project: Blockchain-Based Land Transfer Tracking System Using Genesis Block
"""

import hashlib
import json
from datetime import datetime


class Block:
    def __init__(self, index, timestamp, data, previous_hash, hash_val=None):
        self.index = index
        self.timestamp = timestamp
        self.data = data  # Dictionary for land transfer or string for Genesis Block
        self.previous_hash = previous_hash
        self.is_genesis = (index == 0)
        self.hash = hash_val if hash_val else self.calculate_hash()

    def calculate_hash(self):
        """
        Calculates SHA-256 hash using Python hashlib.
        Formula: SHA-256(index + timestamp + serialized_data + previous_hash)
        """
        if isinstance(self.data, dict):
            # Sort keys for deterministic JSON serialization
            data_string = json.dumps(self.data, sort_keys=True)
        else:
            data_string = str(self.data)

        raw_block_string = f"{self.index}{self.timestamp}{data_string}{self.previous_hash}"
        return hashlib.sha256(raw_block_string.encode('utf-8')).hexdigest()

    def to_dict(self):
        return {
            "index": self.index,
            "timestamp": self.timestamp,
            "data": self.data,
            "previous_hash": self.previous_hash,
            "hash": self.hash,
            "is_genesis": self.is_genesis
        }


class Blockchain:
    def __init__(self):
        self.chain = []
        self.backup_snapshots = {}
        self.create_genesis_block()

    def create_genesis_block(self):
        """
        Creates Block 0 (Genesis Block).
        Previous Hash = "0"
        Data = "Genesis Block / Blockchain Initialization"
        """
        index = 0
        timestamp = "2026-09-18 09:00:00"
        data = "Genesis Block / Blockchain Initialization - VTU BIC702"
        previous_hash = "0"

        genesis_block = Block(index, timestamp, data, previous_hash)
        self.chain = [genesis_block]
        self.backup_snapshots[0] = json.loads(json.dumps(genesis_block.to_dict()))
        return genesis_block

    def get_latest_block(self):
        return self.chain[-1]

    def add_block(self, land_data, custom_timestamp=None):
        """
        Adds a new land transfer record as a cryptographically linked block.
        """
        latest_block = self.get_latest_block()
        index = len(self.chain)
        timestamp = custom_timestamp if custom_timestamp else datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        previous_hash = latest_block.hash

        new_block = Block(index, timestamp, land_data, previous_hash)
        self.chain.append(new_block)
        self.backup_snapshots[index] = json.loads(json.dumps(new_block.to_dict()))
        return new_block

    def load_sample_data(self):
        """
        Loads 3 academic demonstration records matching VTU specifications.
        """
        self.create_genesis_block()
        samples = [
            {
                "landId": "LAND001",
                "surveyNumber": "SURV1001",
                "location": "Bengaluru",
                "previousOwner": "Ravi Kumar",
                "newOwner": "Arjun Kumar",
                "transferDate": "2026-09-10",
                "transferType": "Ownership Transfer",
                "remarks": "Sub-Registrar Bengaluru North"
            },
            {
                "landId": "LAND002",
                "surveyNumber": "SURV1002",
                "location": "Mysuru",
                "previousOwner": "Priya Sharma",
                "newOwner": "Ananya Rao",
                "transferDate": "2026-09-12",
                "transferType": "Sale",
                "remarks": "Sub-Registrar Chamundi Zone"
            },
            {
                "landId": "LAND003",
                "surveyNumber": "SURV1003",
                "location": "Tumakuru",
                "previousOwner": "Suresh Kumar",
                "newOwner": "Kiran Kumar",
                "transferDate": "2026-09-15",
                "transferType": "Inheritance",
                "remarks": "Heritage Family Settlement"
            }
        ]
        for s in samples:
            self.add_block(s, f"{s['transferDate']} 11:30:00")

    def validate_chain(self):
        """
        Performs genuine mathematical blockchain verification:
        1. Genesis block has index 0, previous_hash == "0", and matching hash.
        2. Every subsequent block's recalculated SHA-256 == stored hash.
        3. Every subsequent block's previous_hash == previous block's hash.
        """
        if not self.chain:
            return {
                "is_valid": False,
                "message": "Blockchain is empty. Genesis block missing.",
                "total_blocks": 0
            }

        # Validate Genesis Block
        genesis = self.chain[0]
        if genesis.index != 0 or genesis.previous_hash != "0" or genesis.calculate_hash() != genesis.hash:
            return {
                "is_valid": False,
                "message": "Genesis Block integrity failure! Previous hash must be '0' and hash must match.",
                "broken_block_index": 0,
                "total_blocks": len(self.chain)
            }

        # Validate subsequent blocks
        for i in range(1, len(self.chain)):
            current = self.chain[i]
            prev = self.chain[i - 1]

            # 1. Recalculate hash of current block
            if current.calculate_hash() != current.hash:
                return {
                    "is_valid": False,
                    "message": f"Data tampering detected at Block {i}! Recalculated hash does not match stored hash.",
                    "broken_block_index": i,
                    "total_blocks": len(self.chain)
                }

            # 2. Check linkage
            if current.previous_hash != prev.hash:
                return {
                    "is_valid": False,
                    "message": f"Chain linkage broken at Block {i}! Previous hash does not match Block {i-1}'s hash.",
                    "broken_block_index": i,
                    "total_blocks": len(self.chain)
                }

        return {
            "is_valid": True,
            "message": "Blockchain Status: VALID. No tampering detected. All SHA-256 hash links are cryptographically intact.",
            "broken_block_index": None,
            "total_blocks": len(self.chain)
        }

    def tamper_block(self, block_index, field, new_value):
        """
        Academic Tamper Demonstration:
        Modifies block data in memory WITHOUT recomputing hashes,
        breaking the cryptographic integrity of the chain.
        """
        if block_index <= 0 or block_index >= len(self.chain):
            return False
        block = self.chain[block_index]
        if isinstance(block.data, dict):
            block.data[field] = new_value
            return True
        return False

    def restore_block(self, block_index):
        """
        Restores the authentic block data from original snapshot.
        """
        if block_index in self.backup_snapshots:
            snap = self.backup_snapshots[block_index]
            self.chain[block_index] = Block(
                snap["index"],
                snap["timestamp"],
                snap["data"],
                snap["previous_hash"],
                snap["hash"]
            )
            return True
        return False

    def search(self, query):
        """
        Searches land transfers by Land ID or Survey Number.
        """
        q = query.strip().lower()
        results = []
        for block in self.chain:
            if not block.is_genesis and isinstance(block.data, dict):
                d = block.data
                if (q in d.get("landId", "").lower() or
                    q in d.get("surveyNumber", "").lower() or
                    q in d.get("location", "").lower() or
                    q in d.get("previousOwner", "").lower() or
                    q in d.get("newOwner", "").lower()):
                    results.append(block)
        return results
