'use strict';


// Whiteboard differs from code
//Implement RPG Schema

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const notFound = require('./handlers/404');
const errorHandler = require('./handlers/500');
const PORT = process.env.PORT || 3001
const playerRouter = require('./routes/players');
const questRouter = require('./routes/quests');

const app = express();
app.use(cors());
app.use(express.json());
app.use(playerRouter);
app.use(questRouter);


//Root route for QOL
app.get('/', (req, res, next) => {
    res.status(200).send('Hello World!');
});


app.use('*', notFound);
app.use(errorHandler);

function start(){
    app.listen(PORT, () => console.log('listening on port', PORT))
}

module.exports = { app, start }