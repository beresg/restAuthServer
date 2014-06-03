var restify = require('restify');
var userHandler = require('./userHandler.js');
var messageHandler = require('./messageHandler.js');
var server = restify.createServer({ name : 'restAuthServer'});

server.listen(3000, function() {
    console.log('%s listening at %s', server.name, server.url);
});

server.use(restify.fullResponse()).use(restify.bodyParser());

function checkAuthKey(req, res, next) {
    var authKey = req.params.authKey;

    if (userHandler.checkAuthenticationKey(authKey)) {
        next();
    }
    else {
        res.send({ status: "MALFORMED_CALL" });
    }
}

server.post('/register', function(req, res, next) {
    var userName = req.params.userName;
    var pwd = req.params.pwd;
    var success = userHandler.addUser(userName, pwd);

    if (success) {
        res.send({ status: "OK" });
    }
    else {
        res.send({ status: "USERNAME_ALREADY_EXIST" });
    }

    next();
});

server.post('/login', function(req, res, next) {
    var userName = req.params.userName;
    var pwd = req.params.pwd;
    var success = userHandler.checkUser(userName, pwd);
    var isUserActive = userHandler.isUserActive(userName);
    if (success && !isUserActive) {
        var authKey = userHandler.makeUserAuthenticationKey(userName);
        res.send({
            status: "OK",
            authKey: authKey
        });
    }
    else {
        res.send({ status: "BAD_LOGIN" });
    }
    next();
});

server.post('/logout', checkAuthKey, function(req, res, next) {
    var authKey = req.params.authKey;
    userHandler.deactivateUserAuth(authKey);

    res.send({ status: "OK" });
});

server.post('/sendMessage', checkAuthKey, function(req, res, next) {
    var authKey = req.params.authKey;
    var message = req.params.message;
    var userName = userHandler.getUserForAuthKey(authKey);

    messageHandler.addMessage(userName, message);

    res.send({ status: "OK" });
});

server.post('/getMessages', checkAuthKey, function(req, res, next) {
    var from = req.params.from;
    var messages = messageHandler.getMessages(from);

    res.send({
        status: "OK",
        messages: messages
    });
});