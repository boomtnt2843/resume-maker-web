var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');

const authorization = require('../config/authorize');
const activity = require('../models/activity');

//insert new General skill
const addNewActivity = (dataAct) => {
    return new Promise((resolve, reject) => {
        var newAct = new activity({
            _id : new mongoose.Types.ObjectId(),
            nameHeader : dataAct.nameHeader,
            detail : dataAct.detail,
            startDate : dataAct.startDate,
            endDate : dataAct.endDate,
            ofInformation : dataAct.ofInformation
        })
        newAct.save((err, data) => {
            if(err){
                console.log(err);
                reject(new Error('Cannot add New Skill!'))
            }else{
                resolve({
                    status: true,
                    newAct
                })
            }
        })
    })
}

router.route('/edit/:id')
    .put(authorization, (req, res)=>{
       activity.findOneAndUpdate({
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
        activity.aggregate([{
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
            nameHeader : req.body.nameHeader,
            detail : req.body.detail,
            startDate : req.body.startDate,
            endDate : req.body.endDate,
            ofInformation : req.body.ofInformation
        }
        //console.log(playload);
        addNewActivity(playload)
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
        activity.findByIdAndDelete(req.params.id, (error ,data) => {
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