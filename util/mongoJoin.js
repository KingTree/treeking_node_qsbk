/**
 * Created by admin on 2015/1/8.
 */
//======================================================================
//
//        Copyright (C) 2014-2015 ahwangshu.com
//        All rights reserved
//
//        filename :mongoJoin3.js
//        description：数据库连接对象
//
//        created by 王澍 at  2015年1月8日16:49:30
//        email:ahwangshu@qq.com
//        http://qsbk.ahwangshu.com
//
//         该数据连接对象已经报废
//======================================================================
var mongodb = require('mongodb');
var log4js = require('./../app').logger('fileAppenderError');
var Db = mongodb.Db;
var ObjectID = mongodb.ObjectID;
var Server = mongodb.Server;
var dbConfig = require('../config/config').dbConfig;
var globalDb = new Db(dbConfig.dbName, new Server(dbConfig.dbPath, dbConfig.dbPort), {auto_reconnect: true});

//全局打开一个连接
globalDb.open(function (err) {
    if (err) {
        log4js.error(err.stack);
        throw err;
    }
});
//导出模块
module.exports = {
    db: globalDb,
    ObjectID:ObjectID,//ObjectID对象
    objectId:{//返回一个新的mongodb objectId
        newId:function(){
            return new ObjectID();
        }
    }
};

