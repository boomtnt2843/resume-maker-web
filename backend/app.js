const expressFunction = require('express')
const mongoose = require('mongoose')
var expressApp = expressFunction();

const url = 'mongodb://localhost:27017/Resume';
const config = {
    autoIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true
};

expressApp.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Option, Authorization')
    return next()
});
expressApp.use(expressFunction.json());
expressApp.use((req, res, next) => {
    mongoose.connect(url, config)
    .then(() => {
        console.log('Connected to MongoDB...');
        next();
    })
    .catch(err => {
        console.log('Cannot connect to mongoDB');
        res.status(501).send('Cannot connect to mongoDB')
    });
});

expressApp.use('/user', require('./routes/user'))
expressApp.use('/information', require('./routes/information'))
expressApp.use('/general', require('./routes/generalSkill'))
expressApp.use('/technical', require('./routes/technicalSkill'))
expressApp.use('/activity', require('./routes/activity'))
expressApp.use('/language', require('./routes/language'))
expressApp.use('/education', require('./routes/education'))
expressApp.use('/exprience', require('./routes/experience'))

expressApp.listen(4200, function(){
    console.log('Listening on port 4200');  
});