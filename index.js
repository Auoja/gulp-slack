var gutil = require('gulp-util');

var through = require('through2');
var request = require('request');

var PLUGIN_NAME = 'gulp-slack';

var toType = function (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};

module.exports = function (param) {

    var options = {
        url: 'https://' + param.team + '.slack.com/services/hooks/incoming-webhook?token=' + param.token
    };

    var basePost = {
        'channel': param.channel,
        'username': param.user || 'Gulp-Slack',
        'icon_emoji': param.icon_emoji || ':neckbeard:'
    };


    var writeTextToSlack = function (input) {

        var post = basePost;
        var inputType = toType(input);

        if (inputType === 'string') {
            post.text = input;
        } else if (inputType === 'array') {
            post.attachments = input;
        } else {
            gutil.log(PLUGIN_NAME + ':', 'Input should be a text string or an attachments array.');
            return through.obj();
        }

        options.body = JSON.stringify(post);

        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                gutil.log(PLUGIN_NAME + ':', 'Posted update to', gutil.colors.green(post['channel']));
            } else if (!error) {
                gutil.log(PLUGIN_NAME + ':', gutil.colors.red(response.statusCode + ' - Something went wrong'));
            } else if (error) {
                gutil.log(PLUGIN_NAME + ':', gutil.colors.red('Something went really wrong'));
                gutil.log(error);
            }
        });

        return through.obj();
    };

    return writeTextToSlack;

};