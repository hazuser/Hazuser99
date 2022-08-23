// ==UserScript==
// @name        Paywall Unblocker v2 updated
// @name:de     Paywall Unblocker v2 updated
// @license     MIT
// @namespace   http://tampermonkey.net/
// @version     0.47
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
// @description:de  entfernt Madsack paywall (leider ist die Haz ein linkes Hetzblatt, mir tun die guten Redakteure leid, die sich diesem Paradigma unterordnen müssen)
// @author      You
// @require     https://releases.jquery.com/git/jquery-1.x-git.min.js
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

function Sleep(milliseconds) {
 return new Promise(resolve => setTimeout(resolve, milliseconds));
}
async function run(content) {
 console.log("Vor der sleep-Funktion");
 await Sleep(3000); // Pausiert die Funktion für 3 Sekunden
 console.log("Nach der Sleep Funktion");
    $("div[class^='ArticleContentLoaderstyled__Gradient-sc'").remove();
    $("div[id^='piano-lightbox-article-'").remove();
    $("svg").remove();
    $("div[id^='piano-lightbox-article-'").remove();
    $("div[class^='recommendationstyled__RecommendationContainer'").remove();
    $("div[class^='Adstyled__AdWrapper-sc'").remove();
    $("#template-container").remove();
    insert(content);
}
    function insert(content){
        $("div[class^='ArticleHeadstyled__ArticleTeaserContainer-sc'")
                .css('height','unset')
//                .css('font-size','x-large')
//                .css('font-family','Tahoma')
//                .css('line-height','1.5em')
                .find("p:first").empty()
                // .empty()
                .append($("<p>").html(content.replaceAll('. ','.<br>')));
    }
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
        }
        run(article);
    }
})();
