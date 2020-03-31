const mongoose = require('mongoose');
const password = require('./password.js');

mongoose.connect(
    `mongodb+srv://mlucas24:${password}@mustang-pzgtd.gcp.mongodb.net/test?retryWrites=true&w=majority`,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "MUSTANG"
    }
);
let db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connected to MUSTANG database!'));
module.exports = db;