const jwt = require('jsonwebtoken');
const Blacklist = require('../models/blacklistModel');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        throw Error('No token provided');
    }
    const isBlackList = await Blacklist.findOne({ token });
    if (isBlackList) throw Error('Not logged in');
    const userId = jwt.verify(token.split(' ')[1], process.env.TOKEN_KEY, (err, res) => {
        if (err) throw Error("forbidden");
        return res.id;
    })
    return userId.id;
}