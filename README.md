gulp-slack
==========

Simple gulp plugin to post information to Slack.

## Usage

```javascript

var sftp = require('gulp-sftp');
var slack = require('gulp-slack')({
    token: '*Your slack token*',
    team: 'foo',
    channel: '#bar',
    icon_emoji: ':bowtie:'
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
