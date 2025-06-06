const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { createSecretToken } = require("../util/sToken");
const verify = require('../util/verify');
const { mongoose } = require('mongoose');
const uploadMiddleware = require('../middleware/uploadMiddleware');


class UserController {
    static async register(req, res) {
        const { username, email, password, bio} = req.body;
        if (!username) return res.status(400).json({error: `username required`});
        if (!email) return res.status(400).json({error: `email required`});
        if (!password) return res.status(400).json({error: `password required`});
        // if (!name) return res.status(400).json({error: `name required`});
        
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: "User already exists" });
            }
            const user = User.create({ username, email, bio: bio || '', password});
            return res.status(201).json({ message: 'registration successful', username });
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

    static async isLogged(req, res) {
        try {
            const userId = await verify(req, res);
            if (userId)  {
                const user =  await User.findById(userId);
                return res.status(200).json({ user })
            }
            else {
                return res.status(401).json({ message: "unauthorized" });
            }
        } catch(err){
            return res.status(401).json({message: "unauthorized"})
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
            console.log(userId);
            const { username, bio } = req.body;
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ error: 'user not found' });
            if (req.file) {
                const img = await uploadMiddleware(req);
                user.image = img.url;  
            }
            user.username = username || user.username;
            user.bio = bio || user.bio;
            await user.save();
            console.log(user);
            return res.status(200).json({user});
        } catch(error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({error:'username and password are required'})
        }
        const userId = await verify(req, res);
        if (userId) {
            return res.status(400).json({ error: 'you are already logged in' });
        }
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: 'user not found' })
                //return res.status(404).error('user not found');
            }
            const isPassword = await user.comparePassword(password);
            if (!isPassword) return res.status(401).json({error: 'Incorrect password'});
            const token = createSecretToken({ id: user._id });
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                path: '/',
                maxAge: 3 * 24 * 60 * 60 * 1000,
            });
            return res.status(201).json({ message: 'user logged in successfully', token, user});
        } catch (err) {
            return res.status(401).json({ error: 'login failed', error: err.message });
        };
    };

    static async logout(req, res) {
        try {
            const userId = await verify(req, res);
            if (!userId) {
                return res.status(401).json({ message: 'unauthorized' });
            }
            res.clearCookie('token');
            return res.status(200).json({ message: 'logged out successfully' });
        } catch(error) {
            return res.status(401).json({error: error.message});
        }
    }

}

module.exports = UserController;