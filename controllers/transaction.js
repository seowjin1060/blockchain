const post = {
    new: async (context) => {
        console.log('POST /transaction/new');
        context.body = "A new transaction will be added."
        console.log('context.body:', context.body);
    }
};

exports.post = post;