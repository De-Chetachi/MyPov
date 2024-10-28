const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { createSecretToken } = require("../util/sToken");
const verify = require('../util/verify');
const Blacklist = require('../models/blacklistModel');

class UserController {
    static async register(req, res) {
        const { username, email, password, name, bio} = req.body;
        if (!username) return res.status(400).json({message: `username required`});
        if (!email) return res.status(400).json({message: `email required`});
        if (!password) return res.status(400).json({message: `password required`});
        if (!name) return res.status(400).json({message: `name required`});
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.json({ message: "User already exists" });
            }
            const user = new User({ username, email, name, bio: bio || '', password });
            user.save();
            return res.status(201).json({ message: 'registration successful', user });
        } catch(error) {
            return res.status(404).json({message: 'registration failure', error: error.message });
        }
    };

    static async login(req, res, next) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.json({message:'username and password are required'})
        }
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).json({ message: 'user not found' })
            }
            const isPassword = await user.comparePassword(password);
            if (!isPassword) return res.status(401).json({message: 'Incorrect password'});
            const token = createSecretToken({ id: user._id });
            // res.cookie('token', token, {
            //     withCredentials: true,
            //     httpOnly: false,
            // });
            return res.status(201).json({ message: 'user logged in successfully', token: token });
        } catch (err) {
            next(err);
        };
    };

    static async logout(req, res) {
        try {
            verify(req, res);
            const token = req.header('Authorization');
            const isBlackList = await Blacklist.find({ token });
            if (isBlackList) return res.status(401).json({ message: 'Already logged out' });
            await Blacklist.create({ token });
            return res.status(200).json({ message: 'logged out successfully' });
        } catch(error) {
            return res.status(401).json({error: error.message});
        }
    }

}

module.exports = UserController;