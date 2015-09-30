var express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , app = express()
    , keypress = require('keypress')
    , nconf = require('nconf')
    , path = require('path')
    //, cookieParser = require('cookie-parser')
    , routes = require('./routes/index');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', routes);







///////////Load Configuration/
nconf.use('file', { file: './data/config.json' });
nconf.load();
//nconf.set('CommPortName', '/dev/ttyUSB0');
//nconf.set('CommPortBaud', '4800');
//nconf.set('WebPort', '8181');
//console.log(nconf.get('dessert'));






///Serial Port Params
//portName = "/dev/ttyUSB0";            // get port name from the command line
if(!nconf.get('CommPortName')){
    portName = "/dev/ttyUSB0";
    nconf.set('CommPortName',portName);
} else {
    portName = nconf.get('CommPortName');
    }
console.log ("The ComPort is set to " +portName);

//baud = 4800;
//baud = nconf.get('CommPortBaud');
if(!nconf.get('CommPortBaud')){
    baud = 4800;
    nconf.set('CommPortBaud',baud);
} else {
    baud = nconf.get('CommPortBaud');
}
console.log ("The ComPort Baud is set to " +baud);

//////////////////

/////////////////////

//webport = 8181;
//webport = nconf.get('WebPort');
if(!nconf.get('WebPort')){
    webport = 8080;
    nconf.set('WebPort',webport);
} else {
    webport = nconf.get('WebPort');
}
console.log ("The Web Port is set to " +webport);
///////////////////
//Save Configuration
nconf.save(function (err) {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('Configuration saved successfully.');
});




////////////




//////Set up web server

app.listen(webport, function(){
    console.log('CORS-enabled web server listening on port ' + webport);
});



