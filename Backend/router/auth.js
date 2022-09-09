
const express = require('express');
const Router = express.Router()
const User = require("../models/User")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
Router.post('/auth/signup', async (req, res) => {
    const { name, email, password, cpassword, phone, work } = req.body

    try {

        if (!name || !email || !password || !cpassword || !phone || !work) {
            return res.status(422).json({ error: 'Plz filled all required' });
        }
        let userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(402).json({ error: 'User Already Exist' });
        }
        // This is the method to covert password into hash salt
        // let salt = bcrypt.genSaltSync(10);
        // let hash = bcrypt.hashSync(password, salt);

        const user = await User.create({ name, email, password, cpassword, phone, work });
        await user.save();
        res.status(201).json({ newUser: { user: req.body }, userExist: { user: userExist } })
    } catch (error) {
        res.status(500).send("Some error occured")
    }

})
// login 
Router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body
    try {
        let token;
        if (!email || !password) {
            return res.status(422).json({ error: 'Plz filled all required' });
        }
        let userLogin = await User.findOne({ email: email })
        if (userLogin) {

            let userPassword = await bcrypt.compare(password, userLogin.password)
            token =await userLogin.generateAuthToken()
            console.log(token)
            await res.cookie('jwtoken',token,{
                expires: new Date(Date.now()+2592000000),
                httpOnly:true,

            })
            if (!userPassword) {
                return res.status(400).json({ message: 'Invalid Credentials' })
            }
            else {
                return res.status(200).json({ user: { User: userLogin }, msg: 'signin successfully' })
            }
        }
        else {
            return res.status(400).json({ message: 'Invalid Credentials' })

        }


    } catch (error) {
        res.status(500).send("Some error occured")
    }

})

Router.get('/auth/about',authenticate,async(req,res) =>{
    res.json({user:req.findUser})
})
Router.get('/auth/logout',async(req,res) =>{
    res.clearCookie('jwtoken',{path:'/'})
    res.send(200).send("logout")
})
module.exports = Router