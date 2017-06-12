import * as express from "express";
import * as bodyParser from "body-parser";
import {ServerConfig} from "./server-config";
let SuperLogin = require("superlogin");


// SuperLogin Configuration
// (https://github.com/colinskow/superlogin/blob/master/config.example.js)
let config = {
    security: {
        // Default roles given to a new user
        defaultRoles: ['user'],
        // Disables the ability to link additional providers to an account when set to true
        disableLinkAccounts: true,
        // Maximum number of failed logins before the account is locked
        maxFailedLogins: 3,
        // The amount of time the account will be locked for (in seconds) after the maximum failed logins is exceeded
        lockoutTime: 10*60,
        // The amount of time (in seconds) a new session is valid for
        sessionLife: 14*24*60*60,
        // The amount of time (in seconds) a password reset token is valid for
        tokenLife: 24*60*60,
        // The maximum number of entries in the activity log in each user doc. Zero to disable completely
        userActivityLogSize: 10,
        // If set to true, the user will be logged in automatically after registering
        loginOnRegistration: false,
        // If set to true, the user will be logged in automatically after resetting the password
        loginOnPasswordReset: false
    },
    local: {
        // Set this to true to disable usernames and use emails instead
        emailUsername: true,
    },
    dbServer: {
        // The CouchDB compatible server where all your databases are stored on
        protocol: ServerConfig.DATABASE_PROTOCOL,
        host: ServerConfig.DATABASE_HOST,
        user: 'root',
        password: 'forthewin',
        // Set this to true if you are using Cloudant
        cloudant: false,
        // The name for the database that stores all your user information. This is distinct from CouchDB's _user database.
        // Alternatively you can pass in a PouchDB object to the SuperLogin constructor and leave this blank
        userDB: 'user_register',
        // CouchDB's _users database. Each session generates the user a unique login and password. This is not used with Cloudant.
        couchAuthDB: '_users'
    },
    userDBs: {
        defaultDBs: {
            // Private databases are personal to each user. They will be prefixed with your setting below and postfixed with $USERNAME.
            private: ['settings'],
            // Shared databases that you want the user to be authorized to use. These will not be prefixed, so type the exact name.
            shared: ['application_settings', 'german', 'english']
        }
    }
};

// select port
let port: number = process.env.PORT || 3000;
// get Express-App instance
let app = express();

// initialize SuperLogin
let superlogin = new SuperLogin(config);

// enable CORS for the Express Web Server
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// output request details
// app.use(function(req, res, next) {
//     console.log("REQUEST URL: " + req.url );
//     next(); // Passing the request to the next handler in the stack.
// });

// use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Mount SuperLogin's routes to the app
app.use('/auth', superlogin.router);

// define the static routes where just files should get loaded from
app.use('/assets', express.static(__dirname + '/assets'));

// define the static routes where just files should get loaded from
app.use('/build', express.static(__dirname + '/build'));

// all requests that could not be handled until this point get answered by returning the index.html
app.get('/*', (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + '/index.html');
});

// start the server
let server = app.listen(port, function() {
    let host = server.address().address;
    let port = server.address().port;
    console.log('This express app is listening on port:' + port);
});