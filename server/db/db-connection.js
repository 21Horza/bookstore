const mongoose = require('mongoose');

module.exports = async function connection() {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Connected to DB')
    } catch(e) {
        console.log(e);
        console.log('Can not connect to db');
    }
}