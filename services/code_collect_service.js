/**
 * Created by strawmanbobi
 * 2018-11-06
 */

// system inclusion
// local inclusion
var ServiceResponse = require('../response/service_response.js');

var codeCollectLogic = require('../work_unit/code_collect_logic.js');

var Enums = require('../constants/enums');
var ErrorCode = require('../constants/error_code');

/*
 * function :   Collect code
 * parameter :  code tri-element
 * return :     None
 */
exports.collectCode = function (req, res) {
    var remoteText = req.body.text;
    var remoteKey = req.body.key;
    var remoteCode = req.body.code;

    var serviceResponse = new ServiceResponse();
    codeCollectLogic.collectCodeWorkUnit(remoteText, remoteKey, remoteCode, function (collectCodeErr) {
        serviceResponse.status = collectCodeErr;
        res.send(serviceResponse);
        res.end();
    });
};