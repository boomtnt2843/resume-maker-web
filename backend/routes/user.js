var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const user = require('../models/user');
const authorization = require('../config/authorize');

const key = 'CAT_MEOW';

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

const compareHash = async(plainText, hashText) =>{
    return new Promise((resolve, reject) =>{
        bcrypt.compare(plainText, hashText, (err, data) =>{
            if(err){
                reject(new Error ('Error bcrypt compare'))
            }else{
                resolve({status: data})
            }
        })
    })
}

const findUser = (username) => {
    return new Promise((resolve, reject) =>{
        user.findOne({username : username}, (err, data) =>{
            if(err){
                reject(new Error('Cannot find username!'))
            }else{
                if(data){
                    resolve({id: data._id, username: data.username, password: data.password})
                }else{
                    reject(new Error('Cannot find username!'))
                }
            }
        })
    })
}

//POST : register new account
router.route('/signup')
    .post(async(req, res) => {
        makeHash(req.body.password)
        .then(hashText => {
            const playload = {
                username: req.body.username,
                password: hashText,
            }
            console.log(playload);
            insertUser(playload)
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({err});
        })
    });

//POST : sign in
router.route('/signin')
    .post(async(req,res) => {
        const playload = {
            username: req.body.username,
            password: req.body.password
        }
        try{
            const result = await findUser(playload.username);
            const loginStatus = await compareHash(playload.password, result.password);
            const status = loginStatus.status;
            if(status){
                const token = jwt.sign(result, key, {expiresIn: '3h'});
                res.status(200).json({result, token, status});
            }else{
                res.status(200).json({status});
            }
        }catch(error){
            console.log(error);
            res.status(404).json({error});
        } 
    })
module.exports = router