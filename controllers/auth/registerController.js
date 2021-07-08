const Joi = require('joi');
const User = require('../../models');
const CustomErrorHandler = require('../../services/customErrorHandler');
const bcrypt = require('bcrypt');
const JwtService = require('../../services/jwtService');

const registerController = {
    register: async (req, res, next) => {
        //register logic CHECKLIST

        // [+] validate the reuest
        // [+] authorise the request
        // [+] check if the user in DB already
        // [+] prepare model
        // [+] store in DB
        // [+] generate jwt token
        // [+] send response

        //validaton

        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeatPassword: Joi.ref('password')
        })
        console.log(req.body)
        const {error} = registerSchema.validate(req.body)

        if(error) {
            return next(error)
        }

        //check if user already exist in DB
        try {
            const userExist = await User.exists({
                email: req.body.email
            })
            if (userExist) {
                return next(CustomErrorHandler.alreadyExist('User already registered'));
            }
        }catch(error) {
            return next(error)
        }

        //hashed password
        const hashedPassword = await bcrypt.hash(req.body.password,10)

        //preapre the model
        const {name, email} = req.body
        const user = new User({name, email, password: hashedPassword})
        let access_token = '';
        try {
            const result = await user.save()
            console.log(result)
            //token
            access_token = JwtService.sign({
                _id: result._id,
                role: result.role
            })

        } catch (error) {
            return next(error)
        }

        res.json({
            msg: "Data got successfully",
            access_token,
            data: req.body
        })
    }
}
module.exports = registerController