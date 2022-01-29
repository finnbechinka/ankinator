const express = require('express')
const router = express.Router()
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const {validateToken} = require('../middlewares/AuthMiddleware')
const {sign} = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const {email, password, type} = req.body;
    const user = await User.findOne({ where: {email: email}});
    if(!user){
        bcrypt.hash(password, 10).then((hash) => {
            User.create({
                email: email,
                password: hash,
                type: type
            });
            res.json("Benutzer erfolgreich erstellt!");
        });
    }else{
        res.json({error: "Ein Benutzer mit dieser E-Mail Adresse existiert schon!"});
    }
});

router.post('/login', async (req, res) =>{
    const {email, password} = req.body;

    const user = await User.findOne({ where: {email: email}});
    if(!user){
        res.json({error: "Benutzer nicht gefunden!"});
    }else{
        bcrypt.compare(password, user.password).then((match) => {
            if(!match){
                res.json({error: "Falsches Passwort"});
            }else{
                const accessToken = sign({email: user.email, id: user.id}, "secret");
                res.json({token: accessToken, email: user.email, id: user.id});
            }
        });
    }
    
});

router.get('/auth', validateToken, (req, res) =>{
    res.json(req.user);
});

module.exports = router;