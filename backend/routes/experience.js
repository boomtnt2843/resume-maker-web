var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');

const authorization = require('../config/authorize');
const experience = require('../models/experience');

//insert new General skill
const addNewExp = (dataExp) => {
    return new Promise((resolve, reject) => {
        var newExp = new experience({
            _id : new mongoose.Types.ObjectId(),
            location : dataExp.location,
            position : dataExp.position,
            detail : dataExp.detail,
            startDate : dataExp.startDate,
            endDate : dataExp.endDate,
            ofInformation : dataExp.ofInformation
        })
        newExp.save((err, data) => {
            if(err){
                console.log(err);
                reject(new Error('Cannot add New Skill!'))
            }else{
                resolve({
                    status: true,
                    newExp
                })
            }
        })
    })
}

router.route('/edit/:id')
    .put(authorization, (req, res)=>{
        experience.findOneAndUpdate({
        _id: req.params.id
       },{
        $set : req.body
       },(error, data) => {
        if (error) {
            console.log(error)
            res.status(500).json(error)
        } else {
            res.status(200).json(data)
            console.log('Data updated successfully')
        }
    })
    })

router.route('/:ofInfoID')
    .get((req,res)=>{
        experience.aggregate([{
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
            location : req.body.location,
            position : req.body.position,
            detail : req.body.detail,
            startDate : req.body.startDate,
            endDate : req.body.endDate,
            ofInformation : req.body.ofInformation
        }
        //console.log(playload);
        addNewExp(playload)
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
        experience.findByIdAndDelete(req.params.id, (error ,data) => {
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