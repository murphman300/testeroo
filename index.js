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
})

Router.use((req, res, next)=>{
    log(req);
    return next();
})

App.use('/api', Router);


App.listen(3000,(err)=>{
    if (err) return log(err);
    log("Listening on 3000")
});