import crypto from 'crypto';

const key = 'https://github.com/rapsealk/blockchain.git';

class Blockchain {

    constructor() {
        this.chain = [];
        this.current_transaction = [];
        // Genesis block
        this.new_block(100, 1);
    }

    new_block(proof, previous_hash=null) {
        let block = {
            "index": this.chain.length + 1,
            "timestamp": Date.now(),
            "transactions": this.current_transaction,
            "proof": proof,
            "previous_hash": previous_hash || this.hash(this.chain[this.chain.length-1])
        }
        this.current_transaction = [];
        this.chain.append(block);
        return block;
    }

    new_transaction(sender, recipient, amount) {
        this.current_transaction.append({
            "sender": sender,
            "recipient": recipient,
            "amount": amount
        });
        return this.last_block["index"] + 1;
    }

    static hash(block) {
        let block_string = JSON.stringify(block);
        return crypto.createHmac('sha256', key).update(block).digest('hex');
    }

    get last_block() {
        return this.chain[this.chain.length-1];
    }

    set last_block() {
        return;
    }
}