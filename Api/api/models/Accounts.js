const mongoose = require ("mongoose")

const Schema = new mongoose.Schema({
    Username: String,
    Password: String,
    Todos: Array
})

module.exports = mongoose.model("React-Logins", Schema)