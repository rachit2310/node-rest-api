
const Joi = require('joi');
const bcrypt = require('bcrypt');

const User = require('../../models');
const CustomErrorHandler = require('../../services/customErrorHandler');
const JwtService = require('../../services/jwtService');
const loginController = async (req, res, next) => {
    //validation

    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    })

    const {error} = loginSchema.validate(req.body);

    if(error) {
        return next(error)
    }
    try {
        let data = {};
        const user = await User.findOne({email: req.body.email})
        if(!user) {
            return next(CustomErrorHandler.wrongCredentials())
        }
        console.log(user)
        //compare the password
        const match = await bcrypt.compare(req.body.password, user.password)
        if(!match) {
            return next(CustomErrorHandler.wrongCredentials())
        }

        //generate token
        const access_token = JwtService.sign({
            _id: user._id,
            role: user.role
        })
        data.access_token = access_token;
        res.json(data)

    } catch (error) {
        return next(error)
    }
}

module.exports = loginController