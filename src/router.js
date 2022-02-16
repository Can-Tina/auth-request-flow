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
    const { authorization } = req.headers.authorization
    try {
        decoded = jwt.verify(authorization, 'secretkeywow');
    } catch(err) {
        res.json("Mission Failed")
    }
    res.json(decoded)
});

module.exports = router;
