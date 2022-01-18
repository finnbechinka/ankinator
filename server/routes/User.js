const express = require('express')
const router = express.Router()
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const {validateToken} = require('../middlewares/AuthMiddleware')
const {sign} = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const {username, password, type} = req.body;
    const user = await User.findOne({ where: {username: username}});
    if(!user){
        bcrypt.hash(password, 10).then((hash) => {
            User.create({
                username: username,
                password: hash,
                type: type
            });
            res.json("SUCCESS");
        });
    }else{
        res.json({error: "username is taken"});
    }
});

router.post('/login', async (req, res) =>{
    const {username, password} = req.body;

    const user = await User.findOne({ where: {username: username}});
    if(!user){
        res.json({error: "no such user"});
    }else{
        bcrypt.compare(password, user.password).then((match) => {
            if(!match){
                res.json({error: "wrong password"});
            }else{
                const accessToken = sign({username: user.username, id: user.id}, "secret");
                res.json({token: accessToken, username: user.username, id: user.id});
            }
        });
    }
    
});

router.get('/auth', validateToken, (req, res) =>{
    //console.log("auth called");
    res.json(req.user);
});

router.post('/getusername', async (req, res) =>{
    const {uid} = req.body;
    const user = await User.findByPk(uid);
    if(user){
        res.json({username: user.username})
    }
})

module.exports = router;