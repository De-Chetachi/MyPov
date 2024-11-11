const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { createSecretToken } = require("../util/sToken");
const verify = require('../util/verify');
const fs = require('fs');
const path = require('path');

class UserController {
    static async register(req, res) {
        const { username, email, password, name, bio} = req.body;
        if (!username) return res.status(400).json({error: `username required`});
        if (!email) return res.status(400).json({error: `email required`});
        if (!password) return res.status(400).json({error: `password required`});
        if (!name) return res.status(400).json({error: `name required`});
        
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: "User already exists" });
            }
            const user = new User({ username, email, name, bio: bio || '', password});
            if (req.file) {
                const dirname = path.dirname(__dirname);
                const filepath = path.join(dirname + '/uploads/profileImage/' + username);
                img = {
                    data: fs.readFileSync(filepath ),
                    contentType: 'image/png',
                }
                user.image = img;  
            }
            user.save();
            return res.status(201).json({ message: 'registration successful', user });
        } catch(error) {
            return res.status(404).json({error: 'registration failure', error: error.message });
        }
    };

    static async updateUser(req, res) {
        try{
            const userId = await verify(req, res);
            const update = res.body;
            const user = User.findById(userId);
            if (req.file) {
                const dirname = path.dirname(__dirname);
                const filepath = path.join(dirname + '/uploads/profileImage/' + req.user.username);
                img = {
                    data: fs.readFileSync(filepath ),
                    contentType: 'image/png',
                }
                update.image = img;  
            }
            user = await User.findByIdAndUpdate(userId, update, { new: true });
            return res.status(201).json(user);
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async login(req, res, next) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.json({error:'username and password are required'})
        }
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).json({ error: 'user not found' })
                //return res.status(404).error('user not found');
            }
            const isPassword = await user.comparePassword(password);
            if (!isPassword) return res.status(401).json({error: 'Incorrect password'});
            const token = createSecretToken({ id: user._id });
            res.cookie('token', token);
            return res.status(201).json({ message: 'user logged in successfully', token: token });
        } catch (err) {
            return res.status(400).json({ error: 'login failed', error: err.message });
        };
    };

    static async logout(req, res) {
        try {
            await verify(req, res);
            res.cookie('token', null);
            return res.status(200).json({ message: 'logged out successfully' });
        } catch(error) {
            return res.status(401).json({error: error.message});
        }
    }

}

module.exports = UserController;