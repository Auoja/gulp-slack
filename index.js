var gutil = require('gulp-util');

var through = require('through2');
var request = require('request');

module.exports = function (param) {

    var options = {
        url: 'https://' + param.team + '.slack.com/services/hooks/incoming-webhook?token=' + param.token
    };

    var post = {
        'chann': param.channel,
        'username': param.user || 'Gulp-Slack',
        'text': 'No Text',
        'icon_emoji': ':neckbeard:'
    };


    var writeTextToSlack = function (text) {

        post['text'] = text || 'No Text';

        options.body = JSON.stringify(post);

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                gutil.log('Posted update to', gutil.colors.cyan('Slack'));
            }
        });

        return through.obj();
    };

    return writeTextToSlack;

};