'use strict';

const { app } = require('../src/server.js');
const supertest = require('supertest');
const { sqlDatabase } = require('../src/models/index.js');
const req = supertest(app);

beforeAll(async () => {
    await sqlDatabase.sync();
});

afterAll(async () => {
    await sqlDatabase.drop();
});


describe('REST API', () => {
    test('handles invalid requests', async () => {
        const res = await req.get('/foo');

        expect(res.status).toEqual(404);
    });


// Whiteboard differs from code
//Implement RPG Schema

    test ('Creates a player', async () => {
        let res = await (req.post('/player')).send({
            name:'player1',
            level: 10,
            class:'knight',
        });
        expect(res.body.name).toEqual('player1');
        expect(res.body.level).toEqual('10');
        expect(res.body.class).toEqual('knight');
    });

    test('finds all players', async () => {
        let res = await req.get('/player');

        expect(res.body.name).toEqual('player1');
        expect(res.body.level).toEqual('10');
        expect(res.body.class).toEqual('knight');
    });

    //Tests for single player
    test('finds a single player', async () => {
        let res = await req.get('/players/2');
        
        expect(res.body[0].name).toEqual('player1');
        expect(res.body[0].level).toEqual('10');
        expect(res.body[0].class).toEqual('knight');
    })

    //Tests for update player
    test('updates a single player', async () => {
        let res = await (req.post('/player')).send({
            name:'player2',
            level: 20,
            class:'ninja',
        });

        await req.get('/players/2');
        expect(res.body[0].name).toEqual('player2');
        expect(res.body[0].level).toEqual('20');
        expect(res.body[0].class).toEqual('ninja');
    })

    //Tests for deleted player
    test('deletes a single player', async () => {
        await req.delete('/players/2');

        let res = await req.get('/customer')
        
        expect(res.body.length).toEqual(1);
        expect(res.body[0].name).toEqual('player1');
        expect(res.body[0].level).toEqual('10');
        expect(res.body[0].class).toEqual('knight');
    })
    

});