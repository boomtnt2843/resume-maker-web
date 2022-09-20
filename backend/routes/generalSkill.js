var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');

const authorization = require('../config/authorize');
const general = require('../models/generalSkill');

//insert new General skill
const addGeneralSkill = (dataSkill) => {
    return new Promise((resolve, reject) => {
        var newSkill = new general({
            _id : new mongoose.Types.ObjectId(),
            name : dataSkill.nameSkill,
            power : dataSkill.power,
            ofInformation : dataSkill.ofInformation
        })
        newSkill.save((err, data) => {
            if(err){
                console.log(err);
                reject(new Error('Cannot add New Skill!'))
            }else{
                resolve({
                    status: true,
                    newSkill
                })
            }
        })
    })
}

router.route('/:ofInfoID')
    .get((req,res)=>{
        general.aggregate([{
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
            nameSkill: req.body.nameSkill,
            power: req.body.power,
            ofInformation: req.body.ofInformation
        }
        //console.log(playload);
        addGeneralSkill(playload)
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
        general.findByIdAndDelete(req.params.id, (error ,data) => {
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