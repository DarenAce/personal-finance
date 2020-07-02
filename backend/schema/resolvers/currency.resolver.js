const Currency = require("../../models/currency");

module.exports = {
    Query: {
        allCurrencies: async () => await Currency.find(),
        getCurrency: async (parent, { id }) => await Currency.findById(id)
    },
    Mutation: {
        createCurrency: async (parent, { currency }) => await Currency.create(currency),
        updateCurrency: async (parent, { id, currency }) => await Currency.findByIdAndUpdate(id, currency, { new: true }),
        deleteCurrency: async (parent, { id }) => await Currency.findByIdAndRemove(id)
    }
};