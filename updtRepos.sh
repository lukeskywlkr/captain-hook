#!/bin/bash
export PATH=$PATH:/usr/local/bin
cd ~/server/project/
git pull
logger "[servername] updated at the latest version"
pm2 stop app.js
logger "[servername] stopped for file updating "
/usr/local/bin/grunt shell:npm
/usr/local/bin/grunt shell:spanpm
/usr/local/bin/grunt babel
/usr/local/bin/grunt less
logger "[servername] grunt tasks executed"
pm2 restart app.js
logger "[servername] restarted with file updated "
