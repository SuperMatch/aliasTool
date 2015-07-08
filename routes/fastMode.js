/**
 * Created by Yunxiang on 14/12/7.
 */

var cheerio = require('cheerio');

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function dupCheck(alias, aliasDict){
    var lwrAlias = alias.toLowerCase();
    if(aliasDict[lwrAlias] === undefined){
        aliasDict[lwrAlias] = 0;
        return alias;
    }else{
        aliasDict[lwrAlias] += 1;
        return alias.concat(" ", aliasDict[lwrAlias]);
    }
}

function stripWord(preAlias){
    var words = preAlias.split(" ", 5);
    return words.join(' ')
}

function aliasProvider(nodeElem, aliasDict){
    var text = nodeElem.text();
    var children = nodeElem.children('img');
    if(children.length != 0){
        var alt = children.attr('alt');
        if(alt){
            var words = stripWord(alt);
        }
    }else if(text){
        var words = stripWord(text);
    }
    if(!words || !words.replace(/\s/g, "").length){
        words = "replace"
    }else{
        words = dupCheck(words, aliasDict);
    }
    return words
}

function fastAdder(code){
    $ = cheerio.load(code, {
        "decodeEntities": false,
        "xmlMode": true
    });
    var aliasDict = {};
    var allAtag = $('a');
    allAtag.each(function () {
        var alias = aliasProvider($(this), aliasDict);
        $(this).attr("alias", alias);
    })
    var output = $.html();
    output = output.replace("</meta>", "");
    output = output.replace("</custom>", "");
    output = htmlEntities(output);
    return output;
}

module.exports = fastAdder;
