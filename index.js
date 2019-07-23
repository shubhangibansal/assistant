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
/**
 * query:
 *  email: shban@microsoft.com
 */
app.get('/getUserMriWithEmail', sendMessage.getUserInfo, sendMessage.error);
}