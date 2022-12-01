'use strict';

// Whiteboard differs from code
//Implement RPG Schema

const express = require('express');
const { questInterface } = require('..//models')
const router = express.Router();



//Creates a quest
router.post('/quests', async (req, res, next) => {
    try {
        const newQuest = await questInterface.create(req.body);
        res.status(200).send(newQuest);
    } catch (error) {
        next(error);
    }
});

//Retrieves one quest
router.get('/quests/:id', async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        const singleQuest = await questInterface.read(id);
        res.status(200).send(singleQuest);
    } catch (error) {
        next(error);
    }
});

//Retrieves all quest
router.get('/quests', async (req, res, next) => {
    try {
        const quest = await questInterface.read();
        res.status(200).send(quest);
    } catch (error) {
        next(error);
    }
});

module.exports = router;