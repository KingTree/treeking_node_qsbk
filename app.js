var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var log4js = require('log4js');

log4js.configure({
    appenders: [
        {
            type: 'console',
            category: "console"
        },
        {
            category: 'logFileInfo',
            type: 'file',
            filename: 'logs/fileLog.log',
            maxLogSize: 102400,
            backups: 4
        },
        {
            category: 'fileAppenderError',
            type: 'file',
            filename: 'logs/errLog.log',
            maxLogSize: 102400,
            backups: 4
        },
        {
            category: 'dateFileAppender',
            type: 'dateFile',
            filename: 'logs/dateFileLog.log',
            pattern: '-yyyy-MM-dd',
            alwayIncludePattern: false
        }
    ],
    replaceConsole: true//替换控制台
});

//导出模块-让其他层引用该log
exports.logger = function (categoryName) {
    return log4js.getLogger(categoryName || 'logFileInfo');
};



var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
//app.use(log4js.connectLogger(log4js.getLogger("logFileInfo"), {level: log4js.levels.DEBUG, format: ':remote-addr :method :url :status'}));
app.use(log4js.connectLogger(log4js.getLogger("logFileInfo"), {level: log4js.levels.DEBUG}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
