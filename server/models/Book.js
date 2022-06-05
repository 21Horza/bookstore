const {Schema, model} = require("mongoose");

const Book = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    picture: {type: String, required: true},
    publish_date: {type: Date, required: true},
    description: {type: String, required: true}
})

module.exports = model("Book", Book);