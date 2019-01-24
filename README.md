# Description
This node.js application has two tasks:
    1) delivering files as a web server
    2) authenticating users against a CouchDB using the module "superlogin"

# Usage of the web-server
place web-files some where and configure the routs of the Express.js app in the file "server.ts"

# Installation
1) install CouchDB on a server
2) install Node.js on a server
3) Configure "server-config.ts" with the correct CouchDB URL
4) Enable CORS at the CouchDB
    a) npm install -g add-cors-to-couchdb
    b) add-cors-to-couchdb http://me.iriscouch.com -u myusername -p mypassword
5) run "npm install"
6) run "gulp" to execute the app
