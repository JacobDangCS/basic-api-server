'use strict';

// Whiteboard differs from code
//Implement RPG Schema

const express = require('express');

//Remove PlayerModel after finishing DELETE Interface
const { PlayerModel } = require('../models/index');
const { playerInterface, questInterface} = require('../models')

const router = express.Router();



//Creates a player
router.post('/players', async (req, res, next) => {
    try {
        const newPlayer = await playerInterface.create(req.body);
        res.status(200).send(newPlayer);
    } catch (error) {
        next(error);
    }
});

//Retrieves one player
router.get('/players/:id', async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        const singlePlayer = await playerInterface.read(id);
        res.status(200).send(singlePlayer);
    } catch (error) {
        next(error);
    }
});

router.get('/playersWithQuests/:id', async(req, res, next) => {
    let id = req.params.id;
    const playerWithQuests = await playerInterface.readManyToOne(id, questInterface.model);
    res.status(200).send(playerWithQuests);
})

//Retrieves all players
router.get('/players', async (req, res, next) => {
    try {
        const player = await playerInterface.read();
        res.status(200).send(player);
    } catch (error) {
        next(error);
    }
});

//Updates player record
router.put('/players/:id', async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        let body = req.body;
        const rePlayer = await playerInterface.update(id);
        const updatedPlayer = await rePlayer.update(body);
        res.status(200).send(updatedPlayer);
    } catch (error) {
        next(error);
    }
});


//Deletes a player
router.delete('/players/:id', async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        const deletePlayer = await PlayerModel.destroy({ where: { id } });
        res.status(200).send(deletePlayer);
    } catch (error) {
        next(error)
    }
});

module.exports = router;