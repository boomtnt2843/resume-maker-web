var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');

const authorization = require('../config/authorize');
const language = require('../models/language');

//insert new General skill
const addMylanguage = (dataMyLanguage) => {
    return new Promise((resolve, reject) => {
        var newLanguage = new language({
            _id : new mongoose.Types.ObjectId(),
            name : dataMyLanguage.name,
            power : dataMyLanguage.power,
            ofInformation : dataMyLanguage.ofInformation
        })
        newLanguage.save((err, data) => {
            if(err){
                console.log(err);
                reject(new Error('Cannot add new Language!'))
            }else{
                resolve({
                    status: true,
                    newLanguage
                })
            }
        })
    })
}

router.route('/:ofInfoID')
    .get((req,res)=>{
        language.aggregate([{
            $match:{
                ofInformation: mongoose.Types.ObjectId(req.params.ofInfoID)
            }
        }])
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    })

router.route('/create')
    .post(authorization, (req,res)=>{
        const playload = {
            name: req.body.name,
            power: req.body.power,
            ofInformation: req.body.ofInformation
        }
        //console.log(playload);
        addMylanguage(playload)
            .then(result => {
                //console.log(result);
                res.status(200).json(result);
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json(err);
            })
    })

router.route('/deleteOne/:id')
    .delete(authorization, (req,res) => {
        language.findByIdAndDelete(req.params.id, (error ,data) => {
            if(error){
                //console.log(error);
                res.status(500).json(error)
            }else{
                res.status(200).json({
                    msg: data
                })
            }
        })
    })

module.exports = router