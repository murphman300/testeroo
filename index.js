const Express = require('express');
const App = Express();
const Router = Express.Router();
const PID = process.pid;
const bodyParser = require('body-parser');

const log = (err) => {
    console.log(PID, new Date(), err);
};

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));

App.use((req, res, next)=>{
    log("Getting Inbound Call");
    return next();
});

Router.use((req, res, next)=>{
    log(req);
    return next();
})


Router.get('/now', (req, res)=>{
    log(req);
    return res.status(200).json({statusCode: 200, message: "Ok"});
})

App.use('/api', Router);

App.use((req, res, next)=>{
    log("404");
    return res.status(400).json({statusCode: 404, error: "Not Found"});
})

App.listen(3000,(err)=>{
    if (err) return log(err);
    log("Listening on 3000")
});