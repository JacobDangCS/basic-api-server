'use strict';

module.exports = (req, res, next) => {
    console.log('logs', req.query);
    next();
};