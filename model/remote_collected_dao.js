/**
 * Created by strawmanbobi
 * 2018-11-01
 */

// global inclusion
var orm = require('orm');
var dbOrm = require('../mini_poem/db/mysql/mysql_connection').mysqlDB;
var logger = require('../mini_poem/logging/logger4js').helper;
var dateUtils = require('../mini_poem/utils/date_utils.js');

// local inclusion
var ErrorCode = require('../constants/error_code');
var errorCode = new ErrorCode();

var RemoteCollected = dbOrm.define('remote_collected',
    {
        id: Number,
        category_id: Number,
        category_name: String,
        brand_id: Number,
        brand_name: String,
        city_code: String,
        city_name: String,
        operator_id: Number,
        update_time: String
    },
    {
        cache: false
    }
);

RemoteCollected.createRemoteCollected = function(remoteCollected, callback) {
    var date = dateUtils.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
    var newRemoteCollected = new RemoteCollected({
        category_id: remoteCollected.category_id,
        category_name: remoteCollected.category_name,
        brand_id: remoteCollected.brand_id,
        brand_name: remoteCollected.brand_name,
        city_code: remoteCollected.city_code,
        city_name: remoteCollected.city_name,
        operator_id: remoteCollected.operator_id,
        update_time: date
    });
    newRemoteCollected.save(function (error, createdRemoteCollected) {
        if (error) {
            logger.error('failed to create remoteCollected : ' + error);
            callback(errorCode.FAILED, null);
        } else {
            callback(errorCode.SUCCESS, createdRemoteCollected);
        }
    });
};

RemoteCollected.findRemoteCollectedByConditions = function(conditions, callback) {
    RemoteCollected.find(conditions)
        .run(function (error, remoteCollecteds) {
            if (error) {
                logger.error("find remoteCollected error : " + error);
                callback(errorCode.FAILED, null);
            } else {
                callback(errorCode.SUCCESS, remoteCollecteds);
            }
        });
};

RemoteCollected.listRemoteCollecteds = function(conditions, from, count, sortField, callback) {
    if("id" == sortField && 0 != from) {
        conditions.id = orm.gt(from);
        RemoteCollected.find(conditions).limit(parseInt(count)).orderRaw("?? ASC", [sortField])
            .run(function (listRemoteCollectedsErr, remoteCollecteds) {
                if (listRemoteCollectedsErr) {
                    logger.error("list remoteCollecteds error : " + listRemoteCollectedsErr);
                    callback(errorCode.FAILED, null);
                } else {
                    callback(errorCode.SUCCESS, remoteCollecteds);
                }
            });
    } else {
        RemoteCollected.find(conditions).limit(parseInt(count)).offset(parseInt(from)).orderRaw("?? ASC", [sortField])
            .run(function (listRemoteCollectedsErr, remoteCollecteds) {
                if (listRemoteCollectedsErr) {
                    logger.error("list remoteCollecteds error : " + listRemoteCollectedsErr);
                    callback(errorCode.FAILED, null);
                } else {
                    callback(errorCode.SUCCESS, remoteCollecteds);
                }
            });
    }
};

RemoteCollected.countRemoteCollecteds = function(conditions, callback) {
    RemoteCollected.count(conditions, function(countRemoteCollectedsErr, remoteCollectedsCount) {
        if (countRemoteCollectedsErr) {
            logger.error("count remoteCollecteds error : " + countRemoteCollectedsErr);
            callback(errorCode.FAILED, 0);
        } else {
            callback(errorCode.SUCCESS, remoteCollectedsCount);
        }
    });
};

RemoteCollected.getRemoteCollectedByID = function(remoteCollectedID, callback) {
    RemoteCollected.get(remoteCollectedID, function(error, remoteCollected) {
        if (error) {
            logger.error("get remoteCollected by ID error : " + error);
            callback(errorCode.FAILED, null);
        } else {
            callback(errorCode.SUCCESS, remoteCollected);
        }
    });
};


module.exports = RemoteCollected;