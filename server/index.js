var express=require('express'),
    https = require('https'),
    mongodb = require('mongodb'),
    oldTle = require('./oldTleSmall');

var app=express();

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');

    next();
});

var lastRun = 0;

app.get('/',function(req,res){

    res.end(JSON.stringify(oldTle));

/*
    var mongoUri = "secret";
    var satApi = "apiURL"
    var currRun = new Date(),
        oneHour = 60*60*1000;

    if(currRun < lastRun + oneHour){
        mongodb.MongoClient.connect(mongoUri, (err, client) => {
            if(err)
                res.end(JSON.stringify({status: "dbError", error: err}));

            let db = client.db("sats");
            let tle = db.collection("tle");

            tle.find({}).toArray((err, data) =>{
                if(err)
                    res.end(JSON.stringify({status: "findError", error: err}));
                else
                    res.end(JSON.stringify(data));
            })
        })
    }else{
        https.get(api, (resp) => {
            let data = '';
        
            resp.on('data', (chunk) => {
                data += chunk;
            });
        
            resp.on('end', () => {
                var json = JSON.parse(data);

                mongodb.MongoClient.connect(mongoUri, (err, client) => {
                    if(err)
                        res.end(JSON.stringify({status: "dbError", error: err, data: json}));
        
                    let db = client.db("sats");
                    let tle = db.collection("tle");
                    
                    tle.insert(json);
                    res.end(data);
                })
                
            });
        });
    }
*/

    setTimeout(() => {
        res.end(JSON.stringify({status: "timeout", error: "response Timeout after 30s"}));
    }, 30000);
});


app.listen(process.env.PORT || 5000,function() {});