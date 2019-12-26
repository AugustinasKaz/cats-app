const express = require('express');
const request = require('request');
const app = express();
var cors = require('cors');
const port = 5000;
const { Client } = require('pg');

const DATABASE_URL = 'postgres://xawgefxcwnxfqh:c5abc23f115270d5f68d9664042a0b9c0d7e7646f4f44018b3a0e3f4e5aaebe2@ec2-176-34-184-174.eu-west-1.compute.amazonaws.com:5432/d5u7va0o6g0486';
var options = {
    method: 'GET',
    url: 'https://api.thecatapi.com/v1/images/search?limit=21',
    headers: { 'x-api-key': '6b20cc7c-275a-4071-b1dc-e12315b7da18' }
};

app.use(cors());

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

app.get('/', (req, res) => {
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))