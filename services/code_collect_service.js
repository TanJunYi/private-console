/**
 * Created by strawmanbobi
 * 2018-11-06
 */

// system inclusion
var constants = require('../mini_poem/configuration/constants');
var logger = require('../mini_poem/logging/logger4js').helper;

// local inclusion
var ServiceResponse = require('../response/service_response.js');;

var codeCollectLogic = require('../work_unit/code_collect_logic.js');

var Enums = require('../constants/enums');
var ErrorCode = require('../constants/error_code');

var enums = new Enums();
var errorCode = new ErrorCode();

/*
 * function :   Collect code
 * parameter :  code tri-element
 * return :     None
 */
exports.collectCode = function (req, res) {
    var remoteText = req.body.remote_text;
    var remoteKey = req.body.remote_key;
    var remoteCode = req.body.remote_code;

    var serviceResponse = new ServiceResponse();
    codeCollectLogic.collectCodeWorkUnit(remoteText, remoteKey, remoteCode, function (collectCodeErr) {
        serviceResponse.status = collectCodeErr;
        res.send(serviceResponse);
        res.end();
    });
};