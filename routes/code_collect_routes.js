/**
 * Created by strawmanbobi
 * 2018-11-06
 */

var app = require('../irext_console.js');
var collectService = require('../services/code_collect_service.js');

// code collector specified services
app.post('/irext/collect/collect_code', collectService.collectCode);