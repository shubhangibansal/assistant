"use strict";

var sendMessage = require('./sendMessage');

module.exports = function(app){
/**
 * body data
 * {
 *  "content":"testing via Api call",
 *  "imdisplayname":"Shubhangi Bansal"
 * }
 */
app.post('/sendData',sendMessage.formData, sendMessage.error);
}