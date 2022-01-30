const express = require('express');
const router = express.Router()
const { Card } = require('../models');
const Sequelize = require('sequelize');

router.get('/', async (req, res) => {
    //TODO: REMOVE; ONLY FOR TESTING
    const listOfCards = await Card.findAll();
    res.json(listOfCards);
});

router.post('/new', async (req, res) => {
    let cardIn = req.body;
    const cardActual = await Card.create(cardIn);
    if(cardActual){
        res.json(cardActual);
    }else{
        res.json({error: "Fehler beim erstellen der Karte!"});
    }
});

router.get('/all/:uid', async (req, res) => {
    const uid = req.params.uid;
    const listOfCards = await Card.findAll({ where: { UserId: uid } });
    if(listOfCards){
        res.json(listOfCards);
    }else {
        res.json({error: "Fehler beim zurückgeben aller Karten für einen Benutzer!"});
    }
});

router.get('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const card = await Card.findAll({ where: { id: cid } });
    if(card){
        res.json(card);
    }else {
        res.json({error: "Fehler beim zurückgeben der Karte!"});
    }
});

router.get('/:uid/next', async (req, res) => {
    const uid = req.params.uid;
    const card = await Card.findOne({ where: { UserId: uid }, order: [['next_interval', 'ASC']] });
    var date = new Date();
    var cardDate = new Date(card.dataValues.next_interval);
    if(card){
        if(cardDate <= date){
            res.json(card);
        }else{
            res.json("Alle Karten abgearbeitet!");
        }
    }else {
        res.json({error: "Fehler beim zurückgeben der nächsten Karte!"});
    }
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

    card = await Card.update({next_interval: date}, {where: {id: cid}});
    res.json("Intervall aktualisiert");
});

router.patch('/update/:cid', async (req, res) => {
    const cid = req.params.cid;
    const {front, back} = req.body;

    const card = await Card.update({front: front, back: back}, {where: {id: cid}});
    res.json("Karte aktualisiert");
});

module.exports = router;