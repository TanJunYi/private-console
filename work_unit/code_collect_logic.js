/**
 * Created by strawmanbobi
 * 2018-11-06
 */

// global inclusion
require('../mini_poem/configuration/constants');

var logger = require('../mini_poem/logging/logger4js').helper;

var ErrorCode = require('../constants/error_code.js');
var errorCode = new ErrorCode();

exports.collectCodeWorkUnit = function (remoteText, remoteKey, remoteCode, callback) {
    if (remoteText && remoteKey && remoteCode) {
        logger.info("get code collect request : " + remoteText + ", " + remoteKey + ", " + remoteCode);
        callback(errorCode.SUCCESS);
    } else {
        callback(errorCode.FAILED);
    }
};
