// ==UserScript==
// @name        Paywall Unblocker v2 updated
// @name:de     Paywall Unblocker v2 updated
// @license     MIT
// @namespace   http://tampermonkey.net/
// @version     0.44
// @match       https://www.cellesche-zeitung.de/*
// @match       https://www.dnn.de/*
// @match       https://www.goettinger-tageblatt.de/*
// @match       https://www.haz.de/*
// @match       https://www.kn-online.de/*
// @match       https://www.ln-online.de/*
// @match       https://www.lvz.de/*
// @match       https://www.maz-online.de/*
// @match       https://www.mz-web.de/*
// @match       https://www.neuepresse.de/*
// @match       https://www.ostsee-zeitung.de/*
// @match       https://www.paz-online.de/*
// @match       https://www.rundschau-online.de/*
// @match       https://www.sn-online.de/*
// @match       https://www.waz-online.de/*
// @description unblocks Madsack Paywall
// @description:de  entfernt Madsack paywall
// @author      You
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// ==/UserScript==

(function() {
    'use strict';
    if ( $("div[id^='piano-lightbox-article-'").length > 0 ){
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
            $("div[id^='piano-lightbox-article-'").remove();
            $("div[class^='ArticleHeadstyled__ArticleTeaserContainer-sc-'")
                .css('height','unset')
//                .css('font-size','x-large')
//                .css('font-family','Tahoma')
//                .css('line-height','1.5em')
                .find("p:first").empty()
                .append($("<p>").html(article.replaceAll('. ','.<br>')));
        }
        $("div[class^='ArticleContentLoaderstyled__Gradient-sc'").remove();
        $("svg").remove();
    }
})();
