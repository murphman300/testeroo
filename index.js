const Express = require('express');
const App = Express();
const Router = Express.Router();
const PID = process.pid;
const bodyParser = require('body-parser');
const cexpresser = require('./cexpresser');
const CEClient = require('./ceclient');
let Client;

const log = (err) => {
    console.log(PID, new Date(), err);
};

cexpresser('../cexpfile.json')
    .then((file)=>{
        log("Got File");
        log("Starting");

        Client = new CEClient(file.url, file.token);

        App.use(bodyParser.json());
        App.use(bodyParser.urlencoded({ extended: false }));

        App.use((req, res, next)=>{
            log("Getting Inbound Call");
            return next();
        });

        Router.use((req, res, next)=>{
            log(req.path);
            return next();
        })


        Router.get('/api/now', (req, res)=>{
            return res.status(200).json({statusCode: 200, message: "Ok"});
        });

        Router.get('/api/templates', async (req, res)=>{
            try {
                let temps = await Client.getTemplates();
                return res.status(200).json({statusCode: 200, message: "Ok", body: temps});
            } catch (e) {
                return res.status(500).json({statusCode: 500, error: e});
            }
        });

        Router.post('/api/oauth/callback', (req, res)=>{
            log(req.body);
            if (!req.body.token) return res.status(400).json({statusCode: 400, error: "Bad Request"});
            return res.status(200).json({statusCode: 200, message: "Ok"});
        });

        App.use('/test', Router);

        App.use((req, res, next)=>{
            log("404");
            return res.status(404).json({statusCode: 404, error: "Not Found"});
        })

        App.listen(3000,(err)=>{
            if (err) return log(err);
            log("Listening on 3000")
        });
    })
    .catch(err=>log(err));

