#gulp-slack

Simple gulp plugin to post information to Slack.

##Usage

###Basic use

```javascript

var sftp = require('gulp-sftp');
var slack = require('gulp-slack')({
    url: '*Your Webhook URL*',
    channel: '#foo', // Optional
    user: 'bar', // Optional
    icon_url: 'http://foo.com/bar.jpg', // Optional
    icon_emoji: ':bowtie:' // Optional
});

gulp.task('deploy', function () {
    return gulp.src('src/*')
        .pipe(sftp({
            host: 'website.com',
            user: 'johndoe',
            pass: '1234'
        }))
        .pipe(slack('Deployed latest build'));
});

```

###Attachments

To display a richly-formatted message attachment in Slack, you need to pass an attachments array to gulp-slack. Each element of this array should contain the following parameters:

```javascript

{
    'fallback': 'Required text summary of the attachment that is shown by clients that understand attachments but choose not to show them.',
    'text': 'Optional text that should appear within the attachment',
    'pretext': 'Optional text that should appear above the formatted data',
    'color': '#36a64f', // Can either be one of 'good', 'warning', 'danger', or any hex color code
    // Fields are displayed in a table on the message
    'fields': [
    {
        'title': 'Required Field Title', // The title may not contain markup and will be escaped for you
        'value': 'Text value of the field. May contain standard message markup and must be escaped as normal. May be multi-line.',
        'short': false // Optional flag indicating whether the `value` is short enough to be displayed side-by-side with other values
    }
}

```

Example:

```javascript

var sftp = require('gulp-sftp');
var slack = require('gulp-slack')({
    url: '*Your Webhook URL*',
    channel: '#foo', // Optional
    user: 'bar', // Optional
    icon_url: 'http://foo.com/bar.jpg', // Optional
    icon_emoji: ':bowtie:' // Optional
});

gulp.task('deploy', function () {
    return gulp.src('src/*')
        .pipe(sftp({
            host: 'website.com',
            user: 'johndoe',
            pass: '1234'
        }))
        .pipe(slack([
            {
                'fallback': 'Latest build available <https://website.com/|here>',
                'pretext': 'Latest build available <https://website.com/|here>',
                'color': '#daa520',
                'fields': [
                    {
                        'title': 'Notes',
                        'value': 'Gulp is awesome!'
                    }
                ]
            }
        ]));
});

```
