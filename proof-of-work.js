const crypto = require('crypto');

const key = 'https://github.com/rapsealk/blockchain.git';

let x = 5, y = 0;

while (true) {
    let val = crypto.createHmac('sha256', key).update(`${x*y}`).digest('hex');
    console.log('val:', val);
    if (val[val.length-1] != '0') y += 1;
    else break;
}
console.log(`The solution is y = ${y}`);