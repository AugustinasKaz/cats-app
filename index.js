const express = require('express');
const request = require('request');
const path = require('path');
var cors = require('cors');
var bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const { Client } = require('pg');
const app = express();

var options = {
    method: 'GET',
    url: 'https://api.thecatapi.com/v1/images/search?limit=21',
    headers: { 'x-api-key': '6b20cc7c-275a-4071-b1dc-e12315b7da18' }
};

const DATABASE_URL = ''


app.use(cors());
app.use(express.static(path.join(__dirname, 'my-app/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/getComments', (req, res) => {
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

app.get('/api/getCatsPics', (req, res) => {
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
    client.query("INSERT INTO users(name, comment) VALUES('"+username+"','"+comment+"');", (err, response) => {
        if (err)
            res.json(err);
        else 
            res.json(response.rows[0]);
    })
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/my-app/build/index.html'));
});


app.listen(port, () => console.log(`app listening on port ${port}!`))
