var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const user = require('../models/user');

const makeHash = async(plainText) => {
    //BECAREFUL!!! salt hash DON'T use value more then 18
    const result = await bcrypt.hash(plainText ,9);
    return result; 
}

const insertUser = (dataUser) => {
    return new Promise ((resolve, reject) => {
        var new_user = new user({
            _id: new mongoose.Types.ObjectId(),
            username: dataUser.username,
            password: dataUser.password
        });
        new_user.save((err, data) => {
            if(err){
                reject(new Error('Cannot insert user to DB!'));
            }else{
                resolve({message: 'Sign up successfully'})
            }
        });
    });
}

//POST : register new account
router.route('/signup')
    .post((req, res) => {
        makeHash(req.body.password)
        .then(hashText => {
            const playload = {
                username: req.body.username,
                password: hashText,
            }
            console.log(playload);
            insertUser(playload)
                .then(result => {
                    console.log(result);
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        })
    });
module.exports = router