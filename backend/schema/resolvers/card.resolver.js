const Card = require("../../models/card");
const Account = require("../../models/account");
const Person = require("../../models/person");

module.exports = {
    Query: {
        allCards: async () => await Card.find(),
        getCard: async (parent, { id }) => await Card.findById(id)
    },
    Mutation: {
        createCard: async (parent, { card }) => await Card.create(card),
        updateCard: async (parent, { id, card }) => await Card.findByIdAndUpdate(id, card, { new: true }),
        deleteCard: async (parent, { id }) => await Card.findByIdAndRemove(id)
    },
    Card: {
        account: async card => await Account.findById(card.account),
        owner: async card => await Person.findById(card.owner)
    }
};