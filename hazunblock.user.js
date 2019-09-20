// ==UserScript==
// @name         HAZ
// @namespace    http://tampermonkey.net/
// @version      0.1
// @include     https://www.haz.de/*
// @description  try to take over the world!
// @author       You
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var divArticle = $('.pdb-article-body');
    var d = $('script[type="application/ld+json"]').text();
    var startPos = d.indexOf("articleBody");
    var endPos = -1;
    var article = "";
    if ( startPos != -1 ) {
        endPos = d.indexOf("\",\"",startPos+14);
    }
    if ( endPos != -1 ){
        var length = endPos - startPos - 14;
        article = d.substr(startPos+14,length);
    }
    if ( article != "" ){
        console.log("article:"+article);
        divArticle.empty();
        divArticle.append("<p>"+article+"</p>");
    }
    //var json = JSON.parse( d );

// Log the JSON




})();