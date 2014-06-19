var gutil = require('gulp-util');

var through = require('through2');
var request = require('request');

var PLUGIN_NAME = 'gulp-slack'

module.exports = function (param) {

    var options = {
        url: 'https://' + param.team + '.slack.com/services/hooks/incoming-webhook?token=' + param.token
    };

    var post = {
        'chann': param.channel,
        'username': param.user || 'Gulp-Slack',
        'text': 'No Text',
        'icon_emoji': param.icon_emoji || ':neckbeard:'
    };


    var writeTextToSlack = function (text) {

        post['text'] = text || 'No Text';

        options.body = JSON.stringify(post);

        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                gutil.log(PLUGIN_NAME + ':', 'Posted update to', gutil.colors.green(post['chann']));
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