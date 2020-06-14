const Bank = require("../../models/bank");

module.exports = {
    Query: {
        allBanks: async () => await Bank.find(),
        getBank: async (parent, { id }) => await Bank.findById(id)
    },
    Mutation: {
        createBank: async (parent, { bank }) => await Bank.create(bank),
        updateBank: async (parent, { id, bank }) => await Bank.findByIdAndUpdate(id, bank, { new: true }),
        deleteBank: async (parent, { id }) => await Bank.findByIdAndRemove(id)
    }
};