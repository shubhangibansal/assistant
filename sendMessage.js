"use strict";

var request = require("request");

var send_message = {
  formData: function(req, res, next) {

    function newClientMessageId(){
        const CLIENT_MSG_ID_MAX = 10551863936860307670;
        return Math.floor(Math.random() * CLIENT_MSG_ID_MAX).toString();
    }

    var mandatParams = ["content", "imdisplayname"].some(
      function(key) {
        return !req.body[key];
      }
    );
    if (mandatParams === true) {
      return next(
        "Manadatory params missing (content, imdisplayname)"
      );
    }

    req.body.messagetype = "Text";
    req.body.contenttype = "text";
    req.body.clientmessageid = newClientMessageId();
    req.body.amsreferences = [];
    req.body.properties = {
      importance: "",
      subject: null
    };
    var data = {
      url: "xxx",
      method: "POST",
      headers: {
        Authentication: "xxxx",
        Origin: "https://teams.microsoft.com",
        Referer: "https://teams.microsoft.com/_",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    };

    request(data, function(err, result, bodyData) {

      err = null;

      if (err || !result.statusCode || result.statusCode != 201 || !bodyData) {
        return next("No message could be posted.Request failed");
      }

      bodyData = JSON.parse(bodyData);

      var response =
        "Message posted successfully with OriginalArrivalTime : " +
        bodyData.OriginalArrivalTime;
      return res.json({ message: response });
    });
  },

  error: function(err, req, res, next) {
    console.log("## error ##", err);
    if (err || err.data || err.status) {
      var response = {};
      response.error = err;
      res.json(response);
    }
  }
};

module.exports = send_message;

(function() {
  if (require.main === module) {
  }
})();
