const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CardSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: "Account",
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

module.exports = mongoose.model("Card", CardSchema);
