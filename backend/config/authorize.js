//use for POST API to insert or update your information

const jwt = require('jsonwebtoken');
//key for authorization
const key = 'CAT_MEOW';

const authorization = ((req, res, next)=>{
    const token = req.headers['authorization'];
    if(token == undefined){
        return res.status(401).json({
            "status":401,
            "message": 'Unauthorized'
        })
    }else{
        jwt.verify(token, key, (err,decode)=>{
            if(err){
                return res.status(401).json({
                    "status":401,
                    "message": 'Unauthorized'
                })
            }else{
                //console.log(decode);
                next()
            }
        })
    }
})

module.exports = authorization