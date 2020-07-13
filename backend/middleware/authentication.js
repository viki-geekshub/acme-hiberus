const jwt = require('jsonwebtoken');
const { User, Token,Sequelize } = require('../models/index');
const { Op } = Sequelize;
const env = process.env.NODE_ENV || 'development';
const {  jwt_secret } = require('../config/config.json')[env];
const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, jwt_secret);
        const user = await User.findByPk(payload.id);
        const tokenFound = await Token.findOne({
            where:{
                [Op.and]:[{
                    token:token,
                },{
                    UserId:payload.id
                }] 
            }
        })
        if(!user || !tokenFound){
            res.status(401).send({
                message: 'No estas autorizado',
                error
            })
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({
            message: 'No estas autorizado',
            error
        })
    }
}
const isUser = (req, res, next) => {
    if (!user) {
        return res.status(403).send({
            message: 'Debes registrate si quieres calificar esta película.'
        });
        
    }
    next();
}
module.exports = {
    authentication,
    isUser
};