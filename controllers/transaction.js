const blockchain = require('../blockchain');

const post = {
    new: async (context) => {
        const { sender, recipient, amount } = context.request.body;
        if (!sender || !recipient || !amount) {
            context.body = "missing values.";
            return;
        }
        let index = blockchain.new_transaction(sender, recipient, amount);
        context.body = {
            "message": `Transaction will be added to Block ${index}.`
        }
    }
};

exports.post = post;