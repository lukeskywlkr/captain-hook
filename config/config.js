module.exports = {
  server: {
    host: 'localhost', //The hostname for the web hook listening server.
    port: 8555, //The port of the web hook listening server.
  },
  scripts: {
    folder: 'scripts',
    update: 'updtRepos.sh', //The command that should be triggered on update.
  },
  git: {
    repository: 'RepositoryName', //The repository that triggers the web hook.
    branch: 'master', //The branch that should trigger the command.
  },
  plugins: {
    slackbot: {
      url: 'https://hooks.slack.com/services/<code>', //The slack URL to send push events as bot messages
      activate: true, //Indicates if the slackbot should be enabled or not
    },
  },
}
