/**
 * Created by Yunxiang on 15/7/3.
 */

var cheerio = require('cheerio');

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function removeAll(code){
    $ = cheerio.load(code, {
        "decodeEntities": false,
        "xmlMode": true
    });
    var aliasDict = {};
    var allAtag = $('a');
    allAtag.each(function () {
        $(this).removeAttr("alias");
    })
    var output = $.html();
    output = output.replace("</meta>", "");
    output = output.replace("</custom>", "");
    output = htmlEntities(output);
    return output;
}

module.exports = removeAll;
