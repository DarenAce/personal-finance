const Transaction = require("../../models/transaction");

module.exports = {
    Query: {
        allTransactions: async () => await Transaction.find(),
        getTransaction: async (parent, { id }) => await Transaction.findById(id)
    },
    Mutation: {
        createTransaction: async (parent, { transaction }) => await Transaction.create(transaction),
        updateTransaction: async (parent, { id, transaction }) => await Transaction.findByIdAndUpdate(id, transaction, { new: true }),
        deleteTransaction: async (parent, { id }) => await Transaction.findByIdAndRemove(id)
    }
};