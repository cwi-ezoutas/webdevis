//Require dotenv for reading enviromental variables
const dotenv = require('dotenv').config({path: './process.env'});
const sharp = require('sharp');
//Exit if error in reading env file
if (dotenv.error) {
    console.log('No env file found (process.env)');
    process.exit(2);

}
//Require express and path
const express = require('express');
const path = require('path');
//Include parse server
const ParseServer = require('parse-server').ParseServer;
//Include parse dashboard
const ParseDashboard = require('parse-dashboard');

//Check for database URL
if (!process.env.DATABASE_URI) {
    console.log('DATABASE_URI not specified. Exiting');
    process.exit(1);
}

//Initialize port, parse and dashboard path
let port = process.env.PORT || 1337;
let parsePath = process.env.PARSE_MOUNT || '/parse';
let dashboardPath = process.env.DASHBOARD_MOUNT || '/dashboard';
let parseURL = 'http://localhost:'+port+parsePath;

//Configure Parse Server
let api = new ParseServer({
    databaseURI: process.env.DATABASE_URI,
    cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
    fileKey: 'wdis',
    appId: process.env.APP_ID || 'myAppId',
    masterKey: process.env.MASTER_KEY || '',
    restAPIKey: process.env.RESTAPI_KEY || 'myRestKey',
    javascriptKey: process.env.JAVASCRIPT_KEY || 'myJavKey',
    serverURL: parseURL || 'http://localhost:1337/parse',
    /*verbose: 1,
    liveQuery: {
        classNames: ["dubailandmarks","Gamescore"]
    }*/
});

// Configure Parse Dashboard
let dashboard = new ParseDashboard({
    apps: [
        {
            serverURL: parseURL || 'http://localhost:1337/parse',
            appId: process.env.APP_ID,
            masterKey: process.env.MASTER_KEY || '',
            appName: process.env.APP_NAME || ''
        }
    ],
    users: [
        {
            user:process.env.DASH_USERNAME,
            pass:process.env.DASH_PASSWORD,
            readonly: false,
            apps: [{appId: process.env.APP_ID || ''}]
        }
    ],
    trustProxy: 1
}, {allowInsecureHTTP: true});


let app = express();
//Normal status 200 response on root path
app.get('/', function(req, res) {
    res.status(200).send('Webserver is up');
});

//Serve the Parse API on the /parse URL prefix
app.use(parsePath, api);
//Serve parse dashboard on the /dashboard URL prefix (express middleware solution)
app.use(dashboardPath,dashboard);

//Start webserver
let httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('Parse server running ' + parseURL + '.');
});

//Disable below, not need for this project
//This will enable the Live Query real-time server
//ParseServer.createLiveQueryServer(httpServer);
