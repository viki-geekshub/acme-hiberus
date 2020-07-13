const {
    User,
    Token
} = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const {
    jwt_secret
} = require('../config/config.json')[env];
const UserController = {
    async register(req, res) {
        try {
            const password = await bcrypt.hash(req.body.password, 9);
            const user = await User.create({
                username: req.body.username,
                email: req.body.email,
                password,
            });
            res.status(201).send({
                user,
                message: 'Registered user successfully!'
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'There was a problem trying to register the user.'
            });
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    username: req.body.username
                }
            })
            if (!user) {
                return res.status(400).send({
                    message: 'Incorrect username or password.'
                })
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send({
                    message: 'Incorrect username or password.'
                })
            }
            const token = jwt.sign({
                id: user.id
            }, jwt_secret);
            Token.create({
                token,
                UserId: user.id
            });
            res.send({
                message: 'Welcome ' + user.username + ' !',
                user,
                token
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'There was a problem trying to login.'
            });
        }
    },
    async logout(req, res) {
        try{
            const token = await Token.findOne({
                where: {
                    token: req.headers.authorization
                }
            })
            token.destroy()
            res.send({ message: 'User successfully disconnected.' })
        }catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'There was a problem trying to disconnect the user.'
            });
        }
    },
     getInfo(req,res){
        res.send(req.user);
    }
}
module.exports = UserController;