var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var request = require('request');
var config = require('../config.js');
module.exports = {
    sendMessage: function(data) {
        var branch = data.ref.split(/refs\/heads\//g)[1];
        var message = {};
        if (data.total_commits_count == 0) {
            message = {
                "username": "sle-git-bot",
                "icon_url": "https://gitlab.com/uploads/project/avatar/13083/gitlab-logo-square.png",
                "text": data.user_name + " has pushed a new branch *" + branch + "*"
            };
        } else if (data.total_commits_count > 0) {
            var text = data.user_name + " has pushed " + data.total_commits_count + " commits on *" + branch + "*\n"
            for (var i = 0; (i < data.total_commits_count-1) && (i <= 2); i++) {
                text = text + "*Commit message " + (i+1) + ":* ```" + data.commits[i].message + "```\n"
            }
            message = {
                "username": "sle-git-bot",
                "icon_url": "https://gitlab.com/uploads/project/avatar/13083/gitlab-logo-square.png",
                "text": text
            };
        };

        request({
            url: config.slackbot_url,
            method: "POST",
            json: message
        }, (err, res, body) => {
            if (!err && res.statusCode === 200) {
                console.log("[SLACKBOT] " + body);
            } else {
                console.log("[SLACKBOT] error: " + err);
                console.log("[SLACKBOT] statusCode: " + res.statusCode);
                console.log("[SLACKBOT] statusText: " + res.statusText);
            }
        });
    }
}
