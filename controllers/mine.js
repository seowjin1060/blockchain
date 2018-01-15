const Blockchain = require('../core/blockchain');
const blockchain = require('../blockchain');

const uuid = require('uuid4');
// const node_identifier = uuid();

exports.get = async (context) => {
    let last_block = blockchain.last_block;
    let last_proof = last_block['proof'];

    let proof = blockchain.proof_of_work(last_proof);

    let node_identifier = uuid().split('-').join('');
    blockchain.new_transaction('0', node_identifier, 1);

    let previous_hash = Blockchain.hash(last_block);
    let block = blockchain.new_block(proof, previous_hash);

    context.body = {
        "message": "new block forged.",
        block
    }
};