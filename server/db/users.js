const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        trim: true,
    },
    displayName: {
        type: String,
        required: true,
        trim: true,
    },
    photoURL: {
        type: String,
        required: true,
        trim: true,
    },
});
const User = mongoose.model("User", UserSchema, "Users");
module.exports = User;