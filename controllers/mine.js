exports.get = async (context) => {
    console.log('GET /mine');
    context.body = "A new block will be mined.";
    console.log('context.body:', context.body);
};