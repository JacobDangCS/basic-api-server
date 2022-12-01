'use strict';

module.exports = (req, res, next) => {
    console.log('logged at', req.query);
    next();
};