var express = require('express');
var router = express.Router();
var keypress = require('keypress');
var serial = require('../scripts/serial.js');

var barcode = require("../scripts/barcode.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// middleware specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// define the about route
router.get('/about', function(req, res) {
    res.render('about');
});


// define the settings route
router.get('/settings',function(req,res){
    var set = { selCommPortName: '1',
        CommPortName: '2',
        Baud: 'image.jpg url',
        webport: 'title of the image' };
    console.log("set :" + set.CommPortName); //correct json object
    res.render('settings', {
        title: 'Settings Page',
        result: set
    });

});


router.post('/settings', function (req, res) {
    res.render('settings', { CommPortName: req.body.CommPortName });
    console.log("result")
});

router.post('/getJson', function (req, res) {
    // If it's not showing up, just use req.body to see what is actually being passed.
    console.log(req.body);
    res.render('about');
});




router.get('/data', function(req, res, next){

    //serialData ='~1 Tc-99m 35.1 1.293 GBq';
    //LastBarCode ='E2841 /n';

    /*    var data = '{"data":[' +
     '{"CalibratorData":"'+serialData+'" , ' +
     '"BarcodeData":"'+ LastBarCode +'"}]}';*/
    //res.json({msg: 'This is CORS-enabled for all origins!'});
    if(!serial.serialData){
        StatusString="No Comm";
        res.json({Status:StatusString,
            BarcodeData:barcode.LastBarCode});
        console.log("The sent barcode is " + barcode.LastBarCode);
    } else {

        res.json({
            Status: StatusString,
            CalIsotope: calibrator.IsotopeA100(serialData),
            CalActivity: calibrator.ActivityA100(serialData),
            CalUnits: calibrator.UnitsA100(serialData),
            BarcodeData: barcode.LastBarCode
        });
    console.log("The sent barcode is " + barcode.LastBarCode);
    }
//Erase LastBarcode when value has been retrieved
    barcode.LastBarCode = ""
});

router.get('/getCommPorts', function(req, res) {

    serial.getCommPorts(function (list) {
        res.json(list);

    });
});

router.get('/getCalReading', function(req, res) {

    serial.getCalReading(function (data) {
        res.json(data);

    });
});

router.get('/getCalStatus', function(req, res) {

    serial.getCalStatus(function (data) {
        res.json(data);

    });
});
router.get('/getBarcode', function(req, res) {

    barcode.getBarcode(function (data) {
        res.json(data);

    });

});

// accept get request at /user
router.get('/test', function (req, res) {
    res.send('Got a get request at /test');
    serial.calTest();

});

// accept get request at /user
router.get('/resetcomm', function (req, res) {
    serial.resetComm();
    console.log("comm has been reset");
    res.send('Comm has been reset');
});

router.get('/reboot', function (req, res) {
    var exec = require('child_process').exec;
    exec('sudo reboot', function (error, stdout, stderr) {
        StatusString="Rebooting...";
        res.json({Status:StatusString});
        // output is in stdout
    });
});

router.get('/shutdown', function (req, res) {
    var exec = require('child_process').exec;
    exec('sudo shutdown -h now', function (error, stdout, stderr) {
        res.send('Shutting down....');
        // output is in stdout
    });
});

router.get('/control/:isotope', function(req, res) {
    var isotope = req.params.isotope;
    serial.calIsotope(req.params.isotope);

        //res.send("Not recognised Isotope " +isotope);






    res.send(isotope);
});


module.exports = router;




