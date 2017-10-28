module.exports = {
   "port": 8555, //The port of the web hook listening server.
   "hostname": "localhost", //The hostname for the web hook listening server.
   "command": "./updtRepos.sh", //The command that should be triggered.
   "repository": "RepositoryName", //The repository that triggers the web hook.
   "branch": "dev", //The branch that should trigger the command.
   "slackbot_url": "https://hooks.slack.com/services/", //The slack URL to send push events as bot messages
   "slackbot": true //Indicates if the slackbot should be enabled or not
}
