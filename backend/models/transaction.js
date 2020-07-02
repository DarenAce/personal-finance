const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    card: {
        type: Schema.Types.ObjectId,
        ref: "Card"
    },
    currency: {
        type: Schema.Types.ObjectId,
        ref: "Currency",
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    sum: {
        type: Number,
        required: true
    },
    sumInAccountCurrency: {
        type: Number,
        required: true
    },
    transactionDate: {
        type: Date,
        required: true
    },
    processedDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comment: {
        type: String
    }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
