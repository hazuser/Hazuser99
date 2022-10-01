// ==UserScript==
// @name        Paywall Unblocker v2 updated
// @name:de     Paywall Unblocker v2 updated
// @license     MIT
// @namespace   http://tampermonkey.net/
// @version     0.50
// @match       https://www.cellesche-zeitung.de/*
// @match       https://www.rnd.de/*
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
// @description:de  entfernt Madsack Paywall
// @author      hazuser99
// @require     https://releases.jquery.com/git/jquery-1.x-git.min.js
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    async function run(content) {
        insert(content);
    }

    async function check4BadStuff(){
        // console.log("check");
        $("div[class^='ArticleContentLoaderstyled__Gradient-sc'").remove();
        $("span[class^='ArticleHeadstyled__ArticleHeadPaidIconContainer-sc'").remove();
        $("svg[class^='Buttonstyled__ButtonIcon-'").toggle();
        $("div[id^='piano-lightbox-article-'").remove();
        $("div[class^='ArticleImagestyled__ArticleImageCaptionContainer-'").css('display','unset');
        $("div[class^='ArticleImagestyled__ArticleImageOpenButton-'").remove();
        $("div[id^='piano-lightbox-article-'").remove();
        $("div[class^='recommendationstyled__RecommendationContainer'").remove();
        $("div[class^='Adstyled__AdWrapper-sc'").remove();
        $("#template-container").remove();
        $("#article").find("svg").remove();
    }
    function loopFunction(delay, f,callback){
        var loop = function(){
            f;
            callback();
            setTimeout(loop, delay);
        }; loop();
    };

    function insert(content){
        var $preArticle = $("div[class^='ArticleHeadstyled__ArticleTeaserContainer-sc'")
                .find("p:first").html();
        var $content = content.replaceAll('. ','.<br>');

        if ( $preArticle.length != $content.length + 7 ){
            $("div[class^='ArticleHeadstyled__ArticleTeaserContainer-sc'")
                .css('height','unset')
                // .css('font-size','x-large')
                // .css('font-family','Tahoma')
                // .css('line-height','1.5em')
                .find("p:first").empty()
                .append($("<p>").html($content));
        }
    }

        if ( $("div[id^='piano-lightbox-article-'").length > 0 )
        {
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
            loopFunction(1000, check4BadStuff(),function(){
                run(article);
                check4BadStuff();
                console.log("checking for AD Stuff to Remove");
            });
        }
    // todo
    // $(".blurred").css('-webkit-filter','unset').css('filter','unset');
})();
