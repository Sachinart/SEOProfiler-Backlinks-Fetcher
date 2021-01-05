const express = require('express');
const puppeteer = require('puppeteer');
const app = express();//Import puppeteer function
const searchSite = require('./searchSite');
const port = 3003;

//Catches requests made to localhost:3000/search
app.get('/backlinks', (request, response) => {

    //Holds value of the query param 'w'.
    let w = request.query.w;
	
	w = w.replace(/<(.|\n)*?>/g, '');
	
    //Do something when the w is not null.
    if (w != null) {

        searchSite(w)
            .then(results => {
                //Returns a 200 Status OK with Results JSON back to the client.
                response.status(200);
                response.json(results);
            });
    } else {
        response.end();
    }
});

//Catches requests made to localhost:3003/
app.get('/', (req, res) => res.send('So, it is working perfectly!'));


//Initialises the express server on the port 300
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
