'use strict';


module.exports = (req, res, next) => {
    if (req.query) {
        next();
    } else next('Unable to register. No player found')
};