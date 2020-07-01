const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    bank: {
        type: Schema.Types.ObjectId,
        ref: "Bank",
        required: true
    },
    currency: {
        type: Schema.Types.ObjectId,
        ref: "Currency",
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Person",
        required: true
    },
    number: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model("Account", AccountSchema);
