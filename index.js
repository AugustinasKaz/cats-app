const express = require('express');
const request = require('request');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
var bodyParser = require("body-parser");
const { Client } = require('pg');

app.use(express.static(path.join(__dirname, 'my-app/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const DATABASE_URL = 'postgres://xawgefxcwnxfqh:c5abc23f115270d5f68d9664042a0b9c0d7e7646f4f44018b3a0e3f4e5aaebe2@ec2-176-34-184-174.eu-west-1.compute.amazonaws.com:5432/d5u7va0o6g0486';
var options = {
    method: 'GET',
    url: 'https://api.thecatapi.com/v1/images/search?limit=21',
    headers: { 'x-api-key': '6b20cc7c-275a-4071-b1dc-e12315b7da18' }
};

app.get('/api/users', (req, res) => {
    const client = new Client({
        connectionString: DATABASE_URL,
        ssl: true,
    });
    client.connect();
    client.query('SELECT*FROM users;', (err, response) => {
        if (err)
            throw err;
        else {
            const users = [];
            for (let row of response.rows) {
                users.push(row);
            }
            client.end();
            res.json(users);
        }
    });
})

app.get('/api/cats', (req, res) => {
    request(options, function (error, response, body) {
        if (error)
            throw new Error(error);
        else {
            const cat_pics = [];
            var jsondata = JSON.parse(body);
            for (var i = 0; i < jsondata.length; i++) {
                var counter = jsondata[i];
                var pic = { id: counter.id, url: counter.url };
                cat_pics.push(pic);
            }
            res.json(cat_pics);
        }
    });
})

app.post('/api/post_comment',function(req,res){
    const client = new Client({
        connectionString: DATABASE_URL,
        ssl: true,
    });
    client.connect();
    var username=req.body.user;
    var comment=req.body.comment;
    client.query("INSERT INTO users(name, comment) VALUES('"+username+"','"+comment+"');");
    res.end("success");
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/my-app/build/index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))