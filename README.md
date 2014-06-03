# AngularJS based webapplication for message sending.

## Setup
All you need is a nodejs.
Install the following node packages with npm:
underscore
restify

After finished start the server with the following command fromt he project root:
node server.js

## Additional information
To call some services namely sendMessage, getMessages and login you should possess an authentication 
key which is sent by the server to the app after login. Without it the server return immediately with the MALFORMED_CALL
status. Logging out simply removes the authentication key. 