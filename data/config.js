/**
 * Created by theokitsos on 29/09/15.
 */
var CommPortName
    ,CommPortBaud
    ,WebPort;

CommPortName ="/dev/ttyUSB0";
CommPortBaud = 4800;
WebPort = 8080;




exports.CommPortName = CommPortName;
exports.CommPortBaud = CommPortBaud;
exports.WebPort = CommPortBaud;