const blockchain = require('../blockchain');

exports.get = async (context) => {
    console.log('GET /chain');
    context.body = {
        "chain": blockchain.chain,
        "length": blockchain.chain.length
    };
    console.log('context.body:', context.body);
};