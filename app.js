const express = require('express');
const path = require('path');
const joi = require('joi');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const { Blogposts, User } = require('./blog.js'); // Import models
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const db = process.env.MONGO_URI;

// MongoDB connection
mongoose.connect(db)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

// Middleware
app.use('/public', express.static(__dirname));
app.use(bodyparser.json()); // Middleware for JSON body parsing
app.use(bodyparser.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'sign.html'));
});

// Sign-up Route
app.post('/signup', (req, res) => {
    const { mail, pass } = req.body;

    // Validate user input
    if (!mail || !pass) {
        return res.status(400).send('Email and Password are required');
    }

    bcrypt.hash(pass, 10)
        .then(hashedPassword => {
            const newUser = new User({
                email: mail,
                password: hashedPassword
            });

            return newUser.save();
        })
        .then(() => {
            res.send('User registered successfully');
        })
        .catch(error => {
            if (error.code === 11000) { // Duplicate email error
                return res.status(400).send('User already exists');
            }
            console.error(error);
            res.status(500).send('Server error');
        });
});

app.get('/texteditor', (req, res) => {
    res.sendFile(path.join(__dirname, 'texteditor.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});
app.get('/afterlogin',(req,res)=>{
    res.sendFile(path.join(__dirname, 'loginafter.html'));
})
app.get('/explore',(req,res)=>{
    res.sendFile(path.join(__dirname, 'explore.html'));
})
// Existing code...

// Login Route
app.post('/login', (req, res) => {
    const { mail, pass } = req.body;

    // Validate user input
    if (!mail || !pass) {
        return res.status(400).send('Email and Password are required');
    }

    // Find user by email
    User.findOne({ email: mail })
        .then(user => {
            if (!user) {
                return res.status(400).send('User not found');
            }

            // Compare password with hashed password
            return bcrypt.compare(pass, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).send('Invalid password');
                    }

                    // Redirect to text editor on successful login
                    res.redirect('/afterlogin');
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Server error');
        });
});
app.get('/explore', async (req, res) => {
    try {
        const posts = await Blog.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts' });
    }
});

// Update likes
app.post('/update-like', async (req, res) => {
    const { filter, update } = req.body;

    try {
        await Blog.updateOne(filter, update);
        res.json({ message: 'Like updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating like' });
    }
});

// Add comment
app.post('/add-comment', async (req, res) => {
    const { postId, comment } = req.body;

    try {
        const post = await Blog.findById(postId);
        if (post) {
            post.comments.push(comment);
            await post.save();
            res.json({ comment }); // Return the new comment for display
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment' });
    }
});

// Blog posting route
app.post('/texte', (req, res) => {
    const schema = joi.object().keys({
        title: joi.string().required(),
        author: joi.string().required(),
        content: joi.string().required()
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        let customErrorMessage = '';

        if (error.details[0].context.key === 'title' && error.details[0].type === 'string.empty') {
            customErrorMessage = 'Title cannot be empty';
        } else if (error.details[0].context.key === 'content' && error.details[0].type === 'string.empty') {
            customErrorMessage = 'Content cannot be empty';
        } else if (error.details[0].context.key === 'author' && error.details[0].type === 'string.empty') {
            customErrorMessage = 'Author cannot be empty';
        }

        return res.status(400).send(customErrorMessage);
    } else {
        const blog = new Blogposts({
            title: value.title,
            author: value.author,
            body: value.content
        });
        blog.save()
            .then(() => res.send('<script>alert("Posted successfully!");</script>'))
            .catch(err => {
                console.error(err);
                res.send(err);
            });
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
