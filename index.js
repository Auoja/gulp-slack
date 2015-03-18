var through = require('through2');
var slack = require('node-slack');

module.exports = function(param) {

    slack.setup(param);

    var post = function(input) {
        slack.postToSlack(input);
        return through.obj();
    };

    return post;

};