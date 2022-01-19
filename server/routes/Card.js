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

router.get('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const card = await Card.findAll({ where: { id: cid } });
    res.json(card);
});

router.get('/:uid/next', async (req, res) => {
    const uid = req.params.uid;
    const card = await Card.findOne({ where: { UserId: uid }, order: [['next_interval', 'ASC']] });
    res.json(card);
});

router.patch('/updateInterval/:cid', async (req, res) => {
    const cid = req.params.cid;
    const {difficulty} = req.body;
    var date = new Date();

    let card = await Card.update({last_viewed: date}, {where: {id: cid}});
    
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

    card = await Card.update({next_interval: date}, {where: {id: cid}});
    res.json("SUCCESS");
});

router.patch('/update/:cid', async (req, res) => {
    const cid = req.params.cid;
    const {front, back} = req.body;

    const card = await Card.update({front: front, back: back}, {where: {id: cid}});
    res.json("SUCCESS");
});

module.exports = router;