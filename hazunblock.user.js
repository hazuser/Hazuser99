// ==UserScript==
// @name         HAZ
// @namespace    http://tampermonkey.net/
// @version      0.41
// @include     https://www.haz.de/*
// @include     https://www.neuepresse.de/*
// @include     https://www.goettinger-tageblatt.de/*
// @include     https://www.goettinger-tageblatt2.de/*
// @description  try to take over the world!
// @author       You
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $("div[class^='ContentDetail__Grid-sc'").css('grid-template-columns','unset');
    if ( $('#piano-lightbox-article-haz').length > 0 ){
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
//            console.log("article:"+article);
            $('#piano-lightbox-article-haz').remove();
            $("div[class^='ArticleHeadstyled__ArticleTeaserContainer-sc'").empty()
                .append("<p>"+article.replaceAll('. ','.<br>')+"</p>")
                .css('height','unset')
                .css('font-size','x-large')
                .css('font-family','Tahoma')
                .css('line-height','1.5em');
        }
        $("div[class^='ArticleContentLoaderstyled__Gradient-sc'").remove();
        $("svg").remove();
    }



})();
