##################################################################
#   DESCRIPTION
##################################################################
This node.js application has two tasks:
    1) delivering files as a web server
    2) authenticating users against a CouchDB using the module "superlogin"

##################################################################
#   USAGE OF THE WEB-SERVER
##################################################################
place web-files some where and configure the routs in the file "server.ts"


##################################################################
#   INSTALLATION
##################################################################
1) Configure "server-config.ts" with the correct CouchDB URL
2) Enable CORS at the CouchDB
    a) npm install -g add-cors-to-couchdb
    b) add-cors-to-couchdb http://me.iriscouch.com -u myusername -p mypassword
