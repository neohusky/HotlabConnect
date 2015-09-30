/**
 * Created by theokitsos on 29/09/15.
 */
var express = require('express');
var router = express.Router();

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
    res.render('about');

});

module.exports = router;
