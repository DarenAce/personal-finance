const Category = require("../../models/category");

module.exports = {
    Query: {
        allCategories: async () => await Category.find(),
        getCategory: async (parent, { id }) => await Category.findById(id)
    },
    Mutation: {
        createCategory: async (parent, { category }) => await Category.create(category),
        updateCategory: async (parent, { id, category }) => await Category.findByIdAndUpdate(id, category, { new: true }),
        deleteCategory: async (parent, { id }) => await Category.findByIdAndRemove(id)
    }
};