const express = require('express');
const router = express.Router()
const { Card } = require('../models');
const Sequelize = require('sequelize');

router.get('/', async (req, res) => {
    const listOfCards = await Card.findAll();
    res.json(listOfCards);
});

router.post('/new', async (req, res) => {
    let cardIn = req.body;
    const cardActual = await Card.create(cardIn);
    //TODO: ERROR HANDLING
    res.json(cardActual);
});

router.get('/:uid', async (req, res) => {
    const uid = req.params.uid;
    const listOfCards = await Card.findAll({ where: { UserId: uid } });
    res.json(listOfCards);
});

router.get('/:uid/next', async (req, res) => {
    const uid = req.params.uid;
    const card = await Card.findOne({ where: { UserId: uid }, order: [['next_interval', 'ASC']] });
    res.json(card);
});

router.patch('/updateInterval/:pid', async (req, res) => {
    const pid = req.params.pid;
    const {difficulty} = req.body;
    var date = new Date();
    
    if(difficulty == "easy"){
        date.setDate(date.getDate() + 14);
    }
    if(difficulty == "neutral"){
        date.setDate(date.getDate() + 7);
    }
    if(difficulty == "hard"){
        date.setDate(date.getDate() + 3);
    }

    console.log(date);

    const card = await Card.update({next_interval: date}, {where: {id: pid}});
    res.json("SUCCESS");
});

module.exports = router;