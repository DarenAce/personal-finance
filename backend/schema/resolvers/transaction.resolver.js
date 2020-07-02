const Account = require("../../models/account");
const Card = require("../../models/card");
const Category = require("../../models/category");
const Currency = require("../../models/currency");
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
    },
    Transaction: {
        account: async transaction => await Account.findById(transaction.account),
        card: async transaction => await Card.findById(transaction.card),
        currency: async transaction => await Currency.findById(transaction.currency),
        category: async transaction => await Category.findById(transaction.category)
    }
};