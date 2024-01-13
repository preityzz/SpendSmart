const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");

require('dotenv').config({ path : "./config.env"});
const port = process.env.PORT || 5000;


// use middleware
app.use(cors());
app.use(express.json());

// mongodb connection
const con = require('./db/connection.js');

// using routes
app.use(require('./routes/route'));

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

con.then(db => {
    if(!db) return process.exit(1);

    // listen to the http server 
    app.listen(port, () => {
        console.log(`Server is running on port: http://localhost:${port}`)
    })

    app.on('error', err => console.log(`Failed To Connect with HTTP Server : ${err}`));
//     // error in mondb connection
}).catch(error => {
    console.log(`Connection Failed...! ${error}`);
});