var userHandler = require('./userHandler.js');
var _ = require('underscore');

var messages = [];

module.exports = {
    addMessage: function(user, message) {
        messages.push({
            user: user,
            message: message
        });
        messages.forEach(function(message) {
            console.log(message.user);
            console.log(message.message);
        });
    },
    getMessages: function(from) {
        return messages.slice(from);
    }
};