const Person = require("../../models/person");

module.exports = {
    Query: {
        allPersons: async () => await Person.find(),
        getPerson: async (parent, { id }) => await Person.findById(id)
    },
    Mutation: {
        createPerson: async (parent, { person }) => await Person.create(person),
        updatePerson: async (parent, { id, person }) => await Person.findByIdAndUpdate(id, person, { new: true }),
        deletePerson: async (parent, { id }) => await Person.findByIdAndRemove(id)
    },
    Person: {
        fullName: person => `${person.firstName} ${person.lastName}`
    }
};