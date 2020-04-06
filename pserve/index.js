//Require dotenv for reading enviromental variables
const dotenv = require('dotenv').config({path: './process.env'});
//Exit if error in reading env file
if (dotenv.error) {
    console.log('No env file found (process.env)');
    process.exit(2);

}
//Require express
const express = require('express');
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
    /*databaseURI: 'mongodb://webdevisdemo:c0r0naD3m0@basecluster0-shard-00-01-yhnnw.mongodb.net:27017,basecluster0-shard-00-00-yhnnw.mongodb.net:27017,basecluster0-shard-00-02-yhnnw.mongodb.net:27017/?ssl=true&replicaSet=baseCluster0-shard-0&readPreference=primary&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1',*/
    cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
    fileKey: 'wdis',
    appId: process.env.APP_ID || 'myAppId',
    masterKey: process.env.MASTER_KEY || '',
    serverURL: parseURL || 'http://localhost:1337/parse',
    liveQuery: {
        classNames: ["Posts", "Comments"]
    }
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

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);


