const crypto = require('crypto');
const { URL } = require('url');
const axios = require('axios');

const key = 'https://github.com/rapsealk/blockchain.git';

class Blockchain {

    constructor() {
        this.chain = [];
        this.current_transaction = [];
        this.nodes = new Set();
        // Genesis block
        this.new_block(100, 1);
    }

    // Consensus ==================================================
    register_node(address) {
        console.log('address:', address);
        let parsed_url = new URL(address);
        console.log('parsed_url:', parsed_url);
        this.nodes.add(parsed_url.host);
    }

    valid_chain(chain) {
        let last_block = chain[0];
        let current_index = 1;

        while (current_index < chain.length) {
            let block = chain[current_index];
            console.log('last_block:', last_block, '/ block:', block);
            console.log('\n----------\n');
            if (block.previous_hash != this.hash(last_block)) return false;
            if (!this.valid_proof(last_block.proof, block.proof)) return false;
            last_block = block;
            current_index += 1;
        }
        return true;
    }

    async resolve_conflicts() {
        let neighbors = this.nodes;
        let new_chain = null;
        let max_length = this.chain.length;

        for (node in neighbors) {
            let response = await axios.get(`http://${node}/chain`);
            if (response.status == 200) {
                let { length, chain } = response.data;
                if (length > max_length && this.valid_chain(chain)) {
                    max_length = length;
                    new_chain = chain;
                }
            }
        }

        if (new_chain) {
            this.chain = new_chain;
            return true;
        }

        return false;
    }

    // Blockchain ==================================================
    new_block(proof, previous_hash=null) {
        let block = {
            "index": this.chain.length + 1,
            "timestamp": Date.now(),
            "transactions": this.current_transaction,
            "proof": proof,
            "previous_hash": previous_hash || this.hash(this.chain[this.chain.length-1])
        }
        this.current_transaction = [];
        this.chain.push(block);
        return block;
    }

    new_transaction(sender, recipient, amount) {
        this.current_transaction.push({
            "sender": sender,
            "recipient": recipient,
            "amount": amount
        });
        return this.last_block["index"] + 1;
    }

    static hash(block) {
        let block_string = JSON.stringify(block);
        return crypto.createHmac('sha256', key).update(block_string).digest('hex');
    }

    get last_block() {
        return this.chain[this.chain.length-1];
    }

    proof_of_work(last_proof) {
        let proof = 0;
        while (Blockchain.valid_proof(last_proof, proof) == false) {
            proof += 1;
        }
        return proof;
    }

    static valid_proof(last_proof, proof) {
        let guess = (last_proof * proof).toString();
        let guess_hash = crypto.createHmac('sha256', key).update(guess).digest('hex');
        return guess_hash.slice(0, 4) == '0000';    // difficulty, nonce
    }
}

module.exports = Blockchain;