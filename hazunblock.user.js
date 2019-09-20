// ==UserScript==
// @name         HAZ+NP Unblocker
// @namespace    http://tampermonkey.net/
// @version      0.2
// @include     https://www.haz.de/*
// @include     https://www.neuepresse.de/*
// @description  try to take over the world!
// @author       Me
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
        $('#erasmo').remove();
        $('.pdb-article-body-paidcontentintro').remove();
        $('.pdb-article-body-blurred').find('p,h1,h2,h3,h4,h5,h6,span,.pdb-embedimage-caption').remove();
        $('.pdb-article-body-blurred').removeClass('pdb-article-body-blurred');
        //divArticle.empty();

        divArticle.append("<p>"+article+"</p>");
    }
    //var json = JSON.parse( d );

// Log the JSON




})();
