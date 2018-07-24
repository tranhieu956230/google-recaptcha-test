const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');


const port = process.env.port || 3000;

const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
app.post('/submit', (req, res) => {
    console.log("incomming request");
    if (!req.body.captcha) {
        res.json({ "success": "false", "message": "Please complete the captcha" });
    }
  
    else {
        const secret = '6LdWxmUUAAAAAKVeV8zA-QA02rA6GltE5vTmavzg';
        const response = req.body.captcha;
        const remoteip = req.connection.remoteAddress;

        request( `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}&remoteip=${remoteip}`, (error, response, body) => {
            const data = JSON.parse(body);
            if(data.success == true) res.json({"success": true,"message": "Captcha passed"});
            else res.json({"success": false, "message": "Captcha failed"})
        })
        
    }
})

app.listen(port, () => {
    console.log("server is now listen on", port);
})