var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');

const authorization = require('../config/authorize');
const info = require('../models/information');

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

router.route('/create')
    .post(authorization, (req,res)=>{
        const playload = {
            owner : req.body.owner 
        }
        //console.log(playload);
        createNewInformation(playload)
            .then(result => {
                //console.log(result);
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

module.exports = router