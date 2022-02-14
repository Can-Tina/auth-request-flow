const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};

router.post('/login', (req, res) => {
    const {
        username,
        password
    } = req.body

    if(username === mockUser.username && password === mockUser.password) {
        const token = jwt.sign({ username: username, password: password }, 'secretkeywow')
        res.json(token)
    }
    res.json("Login Failed. Invalid Credentials")
});

router.get('/profile', (req, res) => {
    let decoded = ""
    try {
        decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF1dGhndXkiLCJpYXQiOjE2NDQ4NTMxODJ9.zZNb6Wl5mNZ6keaZvte5ptgTjiCCvCiWEr4wQY-Ymno', 'secretkeywow');
    } catch(err) {
        res.json("Mission Failed")
    }
    res.json(decoded)
});

module.exports = router;
