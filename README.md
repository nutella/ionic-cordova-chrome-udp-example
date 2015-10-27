# ionic-cordova-chrome-udp-example
Simple app to demostrate the use of cordova plugin chrome socket udp

1. create ionic project from this repo
2. add cordova udp plugin (https://github.com/MobileChromeApps/cordova-plugin-chrome-apps-sockets-udp)
3. try it!

This app has only one button on the top right corner that scan and receive udp packet for 10 seconds,
then display all the packets. Actually the port to be listened to is hardcoded on line 12 of the file
js/udp-services.js.