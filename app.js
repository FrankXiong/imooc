var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoStore = require('connect-mongo')(session);
var logger = require('morgan');

var port = process.env.PORT || 3000;
var app = new express();
var dbUrl = 'mongodb://localhost/imooc'

app.locals.moment = require('moment');

mongoose.connect(dbUrl);

app.set('views','./app/views/pages');
app.set('view engine','jade');

app.use(express.static(path.join(__dirname,'dist/static')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    secret:'imooc',
    resave:false,
    saveUninitialized:false,
    store:new mongoStore({
        url:dbUrl,
        autoReconnect:true,
        collection:'sessions'
    })
}));


if('development' === app.get('env')){
    // 打印错误信息
    app.set('showStackError',true)
    app.use(logger(':method :url :status'))
    // 输出样式格式化
    app.locals.pretty = true
    // 输出数据库报错信息
    mongoose.set('debug',true)
}

require('./config/routes')(app)

app.listen(port);

console.log('imooc started on port '+port);

