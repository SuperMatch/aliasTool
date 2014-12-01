/**
 * Created by ychai on 2014/12/1.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('alias/input', { title: 'Alias Input' });
});

module.exports = router;
