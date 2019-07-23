"use strict";

var request = require("request");

var send_message = {
  getUserInfo: function(req, res, next) {
    // console.log("inside getUserInfo --- --- - - - -- - --");
    // console.log("getiing req.query email  ------", req.query);
    if (!req.query) {
      return next("No user Email sent.Request failed");
    }
    var data = {
      url: "xxx",
      method: "POST",
      headers: {
        authorization: "xxx",
        Origin: "https://teams.microsoft.com",
        Referer: "xxx",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: req.query.email
    };
    request(data, function(err, result, bodyData) {
      if (err || !result.statusCode || result.statusCode != 200 || !bodyData) {
        return next("No user data could be fetched.Request failed");
      }
      bodyData = JSON.parse(bodyData);
      bodyData = bodyData.value[0].mri.split(":");
      var response = "User data retrieved with mri id : " + bodyData[2];
      return res.json({ message: response });
    });
  },

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

    const mri1 = "xxxxx";
    const mri2 = "yyyyy";

    req.body.messagetype = "Text";
    req.body.contenttype = "text";
    req.body.clientmessageid = newClientMessageId();
    req.body.amsreferences = [];
    req.body.properties = {
      importance: "",
      subject: null
    };
    var data = {
      url: "xxx" + mri1 + "xxx" + mri2 + "xxx",
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
      if (err || !result.statusCode || result.statusCode != 201 || !bodyData) {
        if (result && result.statusCode === 404) {
          data.url = "xxx" + mri2 + "xxx" + mri1 + "xxx";
          request(data, function(err2, result2, bodyData2) {
            // console.log("--------- inside retry -----");
            // console.log(bodyData2);
            if (err2 || !result2.statusCode || result2.statusCode != 201 || !bodyData2) {
                return next("No message could be posted.Request failed");
            }
            bodyData2 = JSON.parse(bodyData2);

            var response =
              "Message posted successfully with OriginalArrivalTime : " +
              bodyData2.OriginalArrivalTime;
            return res.json({ message: response });
          });
        }
        else{
            return next("No message could be posted.Request failed");
        }
      }else{
        bodyData = JSON.parse(bodyData);

        var response =
          "Message posted successfully with OriginalArrivalTime : " +
          bodyData.OriginalArrivalTime;
        return res.json({ message: response });
      }
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
