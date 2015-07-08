/**
 * Created by ychai on 2014/12/1.
 */

var express = require('express');
var router = express.Router();
var fastAdder = require("./fastMode");
var removeAll = require("./removeAll");

/* GET home page. */
router.get('/', function(req, res) {
    res.render('alias/input', { title: 'Alias Input' });
});

router.get('/fastMode', function(req, res) {
    res.render('alias/fastmode', { title: 'Code Input' });
});

router.post('/fastResult', function(req, res) {
    var code = req.body.code;
    var aliasCode = fastAdder(code)
    res.render('alias/result', { title: 'Code Output', code: aliasCode });
});

router.get('/removeAllMode', function(req, res) {
    res.render('alias/removeAllMode', { title: 'Code Input' });
});

router.post('/removeResult', function(req, res){
    var code = req.body.code;
    var aliasCode = removeAll(code)
    res.render('alias/removeAllResult', { title: 'Code Output', code: aliasCode });
});

module.exports = router;
