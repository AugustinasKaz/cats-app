const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client/build')));


var options = {
    method: 'GET',
    url: 'https://api.thecatapi.com/v1/images/search?limit=21',
    headers: { 'x-api-key': '6b20cc7c-275a-4071-b1dc-e12315b7da18' }
};


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

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))