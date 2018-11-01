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

var KeyCollected = dbOrm.define('remote_collected',
    {
        id: Number,
        collect_id: Number,
        key_id: Number,
        key_name: String,
        key_value: String
    },
    {
        cache: false
    }
);

KeyCollected.createKeyCollected = function(keyCollected, callback) {
    var date = dateUtils.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
    var newKeyCollected = new KeyCollected({
        collect_id: keyCollected.collect_id,
        key_id: keyCollected.key_id,
        key_name: keyCollected.key_name,
        key_value: keyCollected.key_value
    });
    newKeyCollected.save(function (error, createdKeyCollected) {
        if (error) {
            logger.error('failed to create keyCollected : ' + error);
            callback(errorCode.FAILED, null);
        } else {
            callback(errorCode.SUCCESS, createdKeyCollected);
        }
    });
};

KeyCollected.findKeyCollectedByConditions = function(conditions, callback) {
    KeyCollected.find(conditions)
        .run(function (error, keyCollecteds) {
            if (error) {
                logger.error("find keyCollected error : " + error);
                callback(errorCode.FAILED, null);
            } else {
                callback(errorCode.SUCCESS, keyCollecteds);
            }
        });
};

KeyCollected.listKeyCollecteds = function(conditions, from, count, sortField, callback) {
    if("id" == sortField && 0 != from) {
        conditions.id = orm.gt(from);
        KeyCollected.find(conditions).limit(parseInt(count)).orderRaw("?? ASC", [sortField])
            .run(function (listKeyCollectedsErr, keyCollecteds) {
                if (listKeyCollectedsErr) {
                    logger.error("list keyCollecteds error : " + listKeyCollectedsErr);
                    callback(errorCode.FAILED, null);
                } else {
                    callback(errorCode.SUCCESS, keyCollecteds);
                }
            });
    } else {
        KeyCollected.find(conditions).limit(parseInt(count)).offset(parseInt(from)).orderRaw("?? ASC", [sortField])
            .run(function (listKeyCollectedsErr, keyCollecteds) {
                if (listKeyCollectedsErr) {
                    logger.error("list keyCollecteds error : " + listKeyCollectedsErr);
                    callback(errorCode.FAILED, null);
                } else {
                    callback(errorCode.SUCCESS, keyCollecteds);
                }
            });
    }
};

KeyCollected.countKeyCollecteds = function(conditions, callback) {
    KeyCollected.count(conditions, function(countKeyCollectedsErr, keyCollectedsCount) {
        if (countKeyCollectedsErr) {
            logger.error("count keyCollecteds error : " + countKeyCollectedsErr);
            callback(errorCode.FAILED, 0);
        } else {
            callback(errorCode.SUCCESS, keyCollectedsCount);
        }
    });
};

KeyCollected.getKeyCollectedByID = function(keyCollectedID, callback) {
    KeyCollected.get(keyCollectedID, function(error, keyCollected) {
        if (error) {
            logger.error("get keyCollected by ID error : " + error);
            callback(errorCode.FAILED, null);
        } else {
            callback(errorCode.SUCCESS, keyCollected);
        }
    });
};


module.exports = KeyCollected;