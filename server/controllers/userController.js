const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { createSecretToken } = require("../util/sToken");
const verify = require('../util/verify');
const { mongoose } = require('mongoose');
const uploadMiddleware = require('../middleware/uploadMiddleware');


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
            const user = User.create({ username, email, name, bio: bio || '', password});
            return res.status(201).json({ message: 'registration successful', user });
        } catch(error) {
            return res.status(404).json({error: 'registration failure', error: error.message });
        }
    };

    static async getUser(req, res) {
        try{ 
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)){
                return res.status(404).json({error: `No user with id: ${id}`});
            }
            const user = await User.findById(id);
            if (!user) return res.status(404).json({ error: 'user not found' });
            return res.status(200).json(user);

        } catch(error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async profilePicture(req, res) {
        try {
            const userId = await verify(req, res);
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ error: 'user not found' });
            if (req.file) {
                const imgObject = await uploadMiddleware(req);
                user.image = imgObject.url;
                user.save();
                return res.status(201).json({ message: 'profile picture updated successfully', user });
            }
            return res.status(400).json({ error: 'profile picture not updated' });
        } catch(error) {
            return res.status(400).json({ error: error.message });
        }
    }
    static async updateUser(req, res) {             
        try{
            const userId = await verify(req, res);
            const update = res.body;
            const user = User.findById(userId);
            if (req.file) {
                const img = await uploadMiddleware(req);
                update.image = img.url;  
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