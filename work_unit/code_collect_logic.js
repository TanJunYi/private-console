/**
 * Created by strawmanbobi
 * 2018-11-06
 */

// global inclusion
require('../mini_poem/configuration/constants');
var orm = require('orm');
var AdminAuth = require('../authentication/admin_auth.js');
var PythonCaller = require('../mini_poem/external/python_caller');

var Category = require('../model/category_dao.js');
var Brand = require('../model/brand_dao.js');
var IRProtocol = require('../model/ir_protocol_dao.js');
var City = require('../model/city_dao.js');
var RemoteIndex = require('../model/remote_index_dao.js');
var StbOperator = require('../model/stb_operator_dao.js');
var RemoteCollected = require('../model/remote_collected_dao.js');
var KeyCollected = require('../model/key_collected_dao.js');

var Enums = require('../constants/enums.js');
var ErrorCode = require('../constants/error_code.js');
var Categories = require('../constants/remote_categories');

var logger = require('../mini_poem/logging/logger4js').helper;

var enums = new Enums();
var errorCode = new ErrorCode();
var categories = new Categories();

var async = require('async');

exports.collectCodeWorkUnit = function (remoteText, remoteKey, remoteCode, callback) {
    if (remoteText && remoteKey && remoteCode) {
        logger.info("collect code work unit called : " + remoteText + ", " + remoteKey + ", " + remoteCode);
        var cbSplit = findCBSplit(remoteText);
        callback(errorCode.SUCCESS);
    } else {
        callback(errorCode.FAILED);
    }
};

// utility functions
function findCBSplit(remoteText) {
    for (var i = 0; i < categories.categoryMaps.length; i++) {
        var splitIndex = remoteText.indexOf(categories.categoryMaps[i].col_name);
        if (-1 != splitIndex) {
            var cb = new Array(2);
            cb[0] = remoteText.substring(0, splitIndex);
            cb[1] = remoteText.substring(splitIndex);
            return cb;
        }
    }
    return null;
}