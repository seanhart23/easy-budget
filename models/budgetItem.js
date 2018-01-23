var mongoose = require("mongoose");

//SCHEMA SETUP
var budgetItemSchema = new mongoose.Schema({
    itemLabel: String,
    type: String,
    category: String,
    planned: Number,
    actual: Number,
    dueDate: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        username: String
    }
});

module.exports = mongoose.model("budgetItem", budgetItemSchema);