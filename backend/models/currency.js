const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CurrencySchema = new Schema({
    code: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    sign: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Currency", CurrencySchema);
