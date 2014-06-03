var _ = require('underscore');

var registeredUsers = [];
var activeUsers = [];

module.exports = {
    addUser: function(userName, pwd) {
        var found = _.find(registeredUsers, function(curr) { return curr.userName === userName});

        if (!found) {
            registeredUsers.push({
                userName: userName,
                pwd: pwd
            });

            console.log('---------------------------');
            console.log('User successfully added');
            console.log('Username: ' + userName);
            console.log('Password: ' + pwd);
            console.log('---------------------------');
            return true;
        }

        console.log('---------------------------');
        console.log('User registration failed, user already exists!!!!');
        console.log('---------------------------');
        return false;
    },
    checkUser: function(userName, pwd) {
        var found = _.find(registeredUsers, function(curr) { return curr.userName === userName; });
        return found.pwd === pwd;
    },
    makeUserAuthenticationKey: function(userName) {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        var authenticationKey = s4() + s4();
        activeUsers.push({
            userName: userName,
            authKey: authenticationKey
        });

        console.log('---------------------------');
        console.log('Authentication key generated for user: ' + userName);
        console.log('Authentication key : ' + authenticationKey);
        console.log('---------------------------');
        return authenticationKey;
    },
    checkAuthenticationKey: function(authKey) {
        var found = _.find(activeUsers, function(curr) { return curr.authKey === authKey; });
        return found !== undefined;
    },
    deactivateUserAuth: function(authKey) {
        console.log('---------------------------');
        console.log('Removing authentication key: ' + authKey);
        console.log('---------------------------');
        activeUsers = _.reject(activeUsers, function(curr) { return curr.authKey === authKey});
    },
    isUserActive: function(userName) {
        var found = _.find(activeUsers, function(curr) { return curr.userName === userName; });
        return found !== undefined;
    },
    getUserForAuthKey: function(authKey) {
        var user = _.find(activeUsers, function(curr) { return curr.authKey === authKey});
        console.log('---------------------------');
        console.log('Querring auithKey for user');
        console.log('User: ' + user.userName);
        console.log('Authentication key : ' + authKey);
        console.log('---------------------------');
        return user.userName;
    }
};