const User = require('./models/User');
const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config({ path: './config/.env' });

const URI = process.env.MONGO_URI;
console.log(URI);
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
// Middleware to parse JSON data
app.use(express.json());

app.get('/get-users', async (req, res) => {
    try {
        const user = await User.find();
        return res.status(200).json({
            message: "Users gotten successfully",
            data: user
        })
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.post('/post-user', async (req, res) => {
    try {
        // Create a new user using the User model and request data
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password, // In a real-world scenario, make sure to hash the password before saving!
            dateOfBirth: req.body.dateOfBirth
        });

        // Save the user to the database
        await user.save();

        // Send a response
        res.status(201).json({
            message: 'User registered successfully',
            userId: user._id
        });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({
            error: 'Failed to register user',
            details: error.message  // This will give more specific details about the error
        });
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});