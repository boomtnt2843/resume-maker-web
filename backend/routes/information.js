var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');

const authorization = require('../config/authorize');
const info = require('../models/information');
const activity = require('../models/activity');
const education = require('../models/education');
const experience = require('../models/experience');
const general = require('../models/generalSkill');
const language = require('../models/language');
const technical = require('../models/technicalSkill');

const exampleData = require('../models/exampleData')

//Frist time you click "Let's Start"
const createNewInformation = (dataInformation) => {
    return new Promise ((resolve, reject) => {
        var new_info = new info({
            _id : new mongoose.Types.ObjectId(),
            owner : dataInformation.owner
        })
        new_info.save((err, data) => {
            if(err){
                reject(new Error('Cannot create new information!'));
            }else{
                resolve({
                    status: true,
                    new_info
                })
            }
        })
    })
}
//get for view in edit page
const findoneInfo = (infoID) => {
    return new Promise((resolve, reject) =>{
        info.findOne({owner : infoID}, (err, data) =>{
            if(err){
                reject(new Error('Cannot find information!'))
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannot find information!'))
                }
            }
        })
    })
}

//get only format
const findoneFormat = (infoID) => {
    return new Promise((resolve, reject) =>{
        info.findOne({owner : infoID}, (err, data) =>{
            if(err){
                reject(new Error('Cannot find information!'))
            }else{
                if(data){
                    resolve(data.format)
                }else{
                    reject(new Error('Cannot find information!'))
                }
            }
        })
    })
}

//first time crate
router.route('/create')
    .post(authorization, (req,res)=>{
        const playload = {
            owner : req.body.owner 
        }
        createNewInformation(playload)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json(err);
            })
    })

//find ownerID to edit information
router.route('/edit/:ownerId')
    .put(authorization, (req, res)=>{
       info.findOneAndUpdate({
        owner: req.params.ownerId
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
        findoneInfo(req.params.ofInfoID)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json(err);
            })
    })

router.route('/format/:ofInfoID')
    .get((req,res)=>{
        findoneFormat(req.params.ofInfoID)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json(err);
            })
    })

//get for show in resume
router.route('/all/:ofInfoID')
    .get((req,res)=>{
        if(req.params.ofInfoID==="example"){
            res.status(200).json(exampleData);
            return
        }
        info.aggregate([{
            $match:{
                owner: mongoose.Types.ObjectId(req.params.ofInfoID)
            },
        },{
            $lookup:{
                from: "generalskills",
                localField: "_id",
                foreignField: "ofInformation",
                as: "generalskills"
            }
        },{
            $lookup:{
                from: "technicalskills",
                localField: "_id",
                foreignField: "ofInformation",
                as: "technicalskills"
            }
        },{
            $lookup:{
                from: "languages",
                localField: "_id",
                foreignField: "ofInformation",
                as: "languages"
            }
        },{
            $lookup:{
                from: "experiences",
                localField: "_id",
                foreignField: "ofInformation",
                as: "experiences"
            }
        },{
            $lookup:{
                from: "educations",
                localField: "_id",
                foreignField: "ofInformation",
                as: "educations"
            }
        },{
            $lookup:{
                from: "activities",
                localField: "_id",
                foreignField: "ofInformation",
                as: "activities"
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

router.route('/deleteInfo/:id')
    .delete(authorization, (req,res) => {
        activity.deleteMany({ofInformation: req.params.id}, (error ,data) => {
            if(error){
                res.status(500).json(error)
            }
        })
        education.deleteMany({ofInformation: req.params.id}, (error ,data) => {
            if(error){
                res.status(500).json(error)
            }
        })
        experience.deleteMany({ofInformation: req.params.id}, (error ,data) => {
            if(error){
                res.status(500).json(error)
            }
        })
        general.deleteMany({ofInformation: req.params.id}, (error ,data) => {
            if(error){
                res.status(500).json(error)
            }
        })
        language.deleteMany({ofInformation: req.params.id}, (error ,data) => {
            if(error){
                res.status(500).json(error)
            }
        })
        technical.deleteMany({ofInformation: req.params.id}, (error ,data) => {
            if(error){
                res.status(500).json(error)
            }
        })
        info.findByIdAndDelete(req.params.id, (error ,data) => {
            if(error){
                res.status(500).json(error)
            }else{
                res.status(200).json({
                    msg: data
                })
            }
        })
    })

module.exports = router