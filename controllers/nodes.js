const blockchain = require('../blockchain');

exports.get = {
    resolve: async (context) => {
        let replaced = blockchain.resolve_conflicts();
        if (replaced) {
            context.body = {
                "message": "Our chain was replaced.",
                "new_chain": blockchain.chain
            };
        } else {
            context.body = {
                "message": "Our chain is authoritative.",
                "chain": blockchain.chain
            };
        }
    }
};

exports.post = {
    register: async (context) => {
        let { nodes } = context.request.body;
        if (!nodes) 
            return context.throw(400, "Error: Please supply a valid list of nodes.", {});

        nodes.forEach(node => blockchain.register_node(node));

        context.body = {
            "message": "New nodes have been added.",
            "total_nodes": blockchain.nodes
        };
    }
};