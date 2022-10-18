var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');

const authorization = require('../config/authorize');
const education = require('../models/education');

//insert new General skill
const addNewEducation = (dataEdu) => {
    return new Promise((resolve, reject) => {
        var newEducation = new education({
            _id : new mongoose.Types.ObjectId(),
            name : dataEdu.name,
            degress : dataEdu.degress,
            startDate : dataEdu.startDate,
            endDate : dataEdu.endDate,
            ofInformation : dataEdu.ofInformation
        })
        newEducation.save((err, data) => {
            if(err){
                console.log(err);
                reject(new Error('Cannot add New Skill!'))
            }else{
                resolve({
                    status: true,
                    newEducation
                })
            }
        })
    })
}

router.route('/edit/:id')
    .put(authorization, (req, res)=>{
        education.findOneAndUpdate({
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
        education.aggregate([{
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
            name : req.body.name,
            degress : req.body.degress,
            startDate : req.body.startDate,
            endDate : req.body.endDate,
            ofInformation : req.body.ofInformation
        }
        //console.log(playload);
        addNewEducation(playload)
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
        education.findByIdAndDelete(req.params.id, (error ,data) => {
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