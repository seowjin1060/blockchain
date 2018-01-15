const Blockchain = require('./core/blockchain');
const blockchain = new Blockchain();

console.log('[Blockchain] init - ' + Date.now());

module.exports = blockchain;