const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return null;
    }
    const userId = jwt.verify(token, process.env.TOKEN_KEY, (err, res) => {
        if (err) return null;
        return res.id;
    });
    return userId.id;
}