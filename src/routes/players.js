'use strict';

// Whiteboard differs from code
//Implement RPG Schema

const express = require('express');
const { PlayerModel } = require('../models/index');

const router = express.Router();


//Retrieves all players
router.get('/players', async (req, res, next) =>  {
    try {
      const player = await PlayerModel.findAll();
      res.status(200).send(player);
    } catch (error) {
        console.log('----------------');
        console.log(error);
        next(error);
    }
});

//Retrieves one player
router.get('/players/:id', async (req, res, next) =>  {
    try {
      let id = parseInt(req.params.id);
      const singlePlayer = await PlayerModel.findOne({ where: { id } });
      res.status(200).send(singlePlayer);
    } catch (error) {
        next(error);
    }
});


//Creates a player
router.post('/players', async (req, res, next) => {
    try {
        const newPlayer = await PlayerModel.create(req.body);
        res.status(200).send(newPlayer);
      } catch (error) {
          next(error);
      }
});

//Updates player record
router.put('/players/:id', async (req, res, next) => {
    try {
        let id = parseInt(req.params.id);
        let body = req.body;
        const rePlayer = await PlayerModel.findOne( { where: {id} } );
        const updatedPlayer = await rePlayer.update(body);
        res.status(200).send(updatedPlayer);
      } catch (error) {
          next(error);
      }
});


//Deletes a player
router.delete('/players/:id', async (req, res, next) => {
    try{
      let id = parseInt(req.params.id);
      const deletePlayer = await PlayerModel.destroy( { where:{id} } );
      res.status(200).send();
    } catch (error){
        next(error)
    }
});

module.exports = router;