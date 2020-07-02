const Account = require("../../models/account");
const Bank = require("../../models/bank");
const Currency = require("../../models/currency");
const Person = require("../../models/person");

module.exports = {
    Query: {
        allAccounts: async () => await Account.find(),
        getAccount: async (parent, { id }) => await Account.findById(id)
    },
    Mutation: {
        createAccount: async (parent, { account }) => await Account.create(account),
        updateAccount: async (parent, { id, account }) => await Account.findByIdAndUpdate(id, account, { new: true }),
        deleteAccount: async (parent, { id }) => await Account.findByIdAndRemove(id)
    },
    Account: {
        bank: async account => await Bank.findById(account.bank),
        currency: async account => await Currency.findById(account.currency),
        owner: async account => await Person.findById(account.owner)
    }
};