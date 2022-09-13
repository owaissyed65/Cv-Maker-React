
const express = require('express');
const Router = express.Router()
const User = require("../models/User")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const { collection, db } = require('../models/User');
Router.post('/auth/signup', async (req, res) => {
    const { name, email, password, cpassword, phone, work } = req.body

    try {

        if (!name || !email || !password || !cpassword || !phone || !work) {
            return res.status(422).json({ error: 'Plz filled all required' });
        }
        let userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(403).json({ error: 'User Already Exist' });
        }
        // This is the method to covert password into hash salt
        // let salt = bcrypt.genSaltSync(10);
        // let hash = bcrypt.hashSync(password, salt);

        const user = await User.create({ name, email, password, cpassword, phone, work });
        await user.save();
        res.status(201).json({ newUser: { user: req.body }, userExist: { user: userExist } })
    } catch (error) {
        res.status(500).send(error)
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
            token = await userLogin.generateAuthToken()

            await res.cookie('jwtoken', token, {
                expires: new Date(Date.now() + 2592000000),
                httpOnly: true,

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
// get data
Router.get('/auth/about', authenticate, async (req, res) => {
    res.json({ user: req.findUser })
})
// get information
Router.post('/auth/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body
        if (!name || !email || !phone || !message) {
            res.status(402).json({ message: "No Message Provided" })
        }
        const checkUser = await User.findOne({ _id: req.userID, })
        const Message = await checkUser.sendMessage(name, email, phone, message)

        res.status(201).json(checkUser);
    } catch (error) {
        res.status(500).send(error)
    }
})

// Router.delete('/auth/dlt/:id', authenticate, async (req, res) => {
//     try {
// let message = await User.findOne({ 'messages._id': req.params.id })
// console.log("somethimg" + message)
// console.log(req.params.id)
// if (!message.messages) {
//     return res.status(403).json({ message: 'No Message are found' });
// }
// if (!req.params.id) {
//     return res.status(402).json({ message: 'No Message are found' });
// }
// await User.findOneAndDelete({'messages._id':req.params.id})
// res.status(200).json({ msg: 'dlt' })


//     } catch (error) {
//         res.status(500)
//     }
// })
Router.get('/auth/logout', async (req, res) => {
    res.clearCookie('jwtoken', { path: '/' })
    res.send(200).send("logout")
})
module.exports = Router