const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config({ path: './config/.env' });

const URI = process.env.MONGO_URI;
console.log(URI);

const app = express();

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send('hello world')
});

app.listen(3000);
