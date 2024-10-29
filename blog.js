const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Blog schema definition
const blogschema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    comments: [
        {
            text: { type: String, required: true },
            user: { type: String, required: true },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true });

// Model for Blogposts
const Blogposts = mongoose.model('Blogpost', blogschema);

// User schema definition
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Model for Users
const User = mongoose.model('User', userSchema);

// Exporting both models
module.exports = {
    Blogposts,
    User
};
