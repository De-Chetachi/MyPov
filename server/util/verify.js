const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        throw Error('unauthorized');
    }
    const userId = jwt.verify(token, process.env.TOKEN_KEY, (err, res) => {
        if (err) throw Error("forbidden");
        return res.id;
    })
    return userId.id;
}