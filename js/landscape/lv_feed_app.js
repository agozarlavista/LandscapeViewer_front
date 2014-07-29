var landscapeViewerFeed = {
    searchList:null,
    page:1,
    callBack:null,
    init:function(){
        google.load("feeds", "1");
        //this.initialize();
        google.setOnLoadCallback(this.initialize)
    },
    initialize : function(){
        /*ALL WE NEED
         get page without category selection : http://www.zeutch.com/feed?paged=3
         get page with category selection : http://www.zeutch.com/category/graphik/feed?paged=3
         get page with multiple category selection : http://www.zeutch.com/category/graphik,design/feed?paged=3
         list of zeutch category : archi, cool, design, fashion, graphik, media, mode, movie, photo, zik
         get category list by rss feed :
         get author informations : http://www.zeutch.com/category/zeutcher/feed

         LIST OF GREAT BLOG :
         http://www.fubiz.net/ as a wp
         http://konbini.com
         http://www.be-street.com/
         http://streetart-paris.fr/feed/


         ACTU :
         http://actumag.info/feed/
         */
        //for(var i=1; i<10; i++){
        //    landscapeViewerFeed.page=i;
        //landscapeViewerFeed.loadPage();
        //}

        //alert('loadpage');
        //var feed = new google.feeds.Feed("http://www.zeutch.com/feed?paged="+this.page);
        //var feed = new google.feeds.Feed("http://www.lemonde.fr/rss/une.xml");
        //var feed = new google.feeds.Feed("http://rss.lefigaro.fr/lefigaro/laune?format=xml");
        //var feed = new google.feeds.Feed("http://www.lemonde.fr/culture/rss_full.xml");
        //var feed = new google.feeds.Feed("http://www.lemonde.fr/crise-financiere/rss_full.xml");
        //var feed = new google.feeds.Feed("http://www.mediapart.fr/articles/feed?page="+this.page);
        //http://rss.liberation.fr/rss/9/   //la une
        //http://rss.liberation.fr/rss/58/  //Cinema
        //http://rss.liberation.fr/rss/13/  //Economie

        //http://tempsreel.nouvelobs.com/rss.xml //actualités en temps réel
        //http://tempsreel.nouvelobs.com/politique/rss.xml // politique
        //http://tempsreel.nouvelobs.com/societe/rss.xml // société
        //http://tempsreel.nouvelobs.com/monde/rss.xml // société
        //http://tempsreel.nouvelobs.com/economie/rss.xml // économie
        //http://obsession.nouvelobs.com/high-tech/rss.xml // hight tech
        //http://obsession.nouvelobs.com/education/rss.xml // éducation
        //http://obsession.nouvelobs.com/sport/rss.xml // sport
        //http://obsession.nouvelobs.com/culture/rss.xml // culture

        //http://cinema.nouvelobs.com/articles.rss // cinéObs
        //http://teleobs.nouvelobs.com/rss.xml // TV OBS

        //http://sciencesetavenir.nouvelobs.com/rss.xml // science avenir actus a la une
        //http://sciencesetavenir.nouvelobs.com/decryptage/rss.xml //decryptage
        //http://sciencesetavenir.nouvelobs.com/espace/rss.xml
        //http://sciencesetavenir.nouvelobs.com/sante/rss.xml
        //http://sciencesetavenir.nouvelobs.com/nature/rss.xml
        //
        //http://sciencesetavenir.nouvelobs.com/high-tech/rss.xml
        //http://sciencesetavenir.nouvelobs.com/infographies/rss.xml
        //http://sciencesetavenir.nouvelobs.com/galeries-photos/rss.xml

        // GRAPHISME //
        // http://feeds.feedburner.com/etapes/feed?format=xml
        // http://wadmag.com/feed.xml
        // http://www.milkmagazine.net/feed/

        //http://www.aplusmag.com/feed/
        //http://dresscodemag.com/feed/
        //http://www.be-street.com/feed/
        //http://www.dazeddigital.com/rss
        //http://www.gqmagazine.fr/rss.xml
        //http://cdn-elle.ladmedia.fr/var/plain_site/storage/flux_rss/fluxToutELLEfr.xml
        //http://www.vogue.fr/home.xml
        //http://www.aplusmag.com/feed/

        //http://syndication.lesechos.fr/rss/rss_france.xml
        //http://syndication.lesechos.fr/rss/rss_politique.xml

        //TECHNOLOGIE
        //http://feeds.feedburner.com/TechCrunch/startups
        //http://feeds.feedburner.com/TechCrunch/Mobilecrunch
        //http://feeds.feedburner.com/TechCrunch/crunchgear

        //http://www.presse-citron.net/feed
        //http://hello-dude.com/site/feed/

        //http://www.lesinrocks.com/actualite/feed/
        //http://www.rollingstone.fr/feed/

        //http://www.blogdumoderateur.com/feed/

        //http://www.thefwa.com/rss/
        //http://www.trendsnow.net/feed
        //http://inkultmagazine.com/feed/
        //http://www.aa13.fr/feed
        //http://www.dwell.com/articles/feed
        //http://feeds.inspirationhut.net/inspirationhut
        //http://www.lemondenumerique.com/actualite_main.rss


        //http://feeds.feedburner.com/BoredPanda
    },
    loadPage : function(address, callBack){
        this.callBack = callBack;
        var feed = new google.feeds.Feed(address);


        feed.load(function(result) {
            //alert(JSON.stringify(result));
            console.log(JSON.stringify(result));
            if (!result.error && result.status.code == 200) {
                landscapeViewerFeed.parseForApp(result);
            }else{
                callBack({error:result.status.code});
                //alert("error = "+JSON.stringify(result));
            }
        });
    },
    parseForApp : function(result){
        var parsedResult = [];
        var container = document.getElementById("feed");
        //alert(result.feed.entries.length);
        for (var i = 0; i < result.feed.entries.length; i++) {
            //alert(result.feed.entries[i].content);
            var saveContent = result.feed.entries[i].content;
            //console.log(i);
            result.feed.entries[i].images = this.getImages(result.feed.entries[i].content);
            result.feed.entries[i].links = this.getLinks(result.feed.entries[i].content);
            result.feed.entries[i].tags = this.getTags(result.feed.entries[i]);
            result.feed.entries[i].twits = this.getTwits(result.feed.entries[i].content);
            result.feed.entries[i].videos = this.getVideos(result.feed.entries[i].content);
            result.feed.entries[i].content = this.parseHTML(saveContent);
            //if(result.feed.entries[i].images.length > 0)
            parsedResult.push(result.feed.entries[i]);
        }
        this.searchList = parsedResult;
        //alert(JSON.stringify(this.searchList));
        //wp.lastWpSearch = this.searchList;
        //alert(JSON.stringify(this.searchList));
        //wp.addGrid(this.searchList);
        //wp.whoList(this.searchList);
        this.callBack(this.searchList);
    },
    parseHTML :function(str){
        return $("<div/>").html(str).text();
    },
    getImages : function(str){
        var images = [];
        var stripImages = str.split('<img');
        for(var m=0; m<stripImages.length; m++){
            var imageHref = stripImages[m].split('src=\"');
            if(imageHref.length>1){
                var preciseImageLink = imageHref[1].split('\" ')[0];
                //if(preciseImageLink.indexOf('.img') != -1){
                    images.push(preciseImageLink.replace('">',''));
                //}
            }
        }
        return images;
    },
    getLinks : function(str){
        var links = [];
        var stripLinks = str.split('<a');
        for(var m=0; m<stripLinks.length; m++){
            var imageHref = stripLinks[m].split('href=\"');
            if(imageHref.length>1){
                var preciseLink = imageHref[1].split('\">')[0];
                if(preciseLink.indexOf(".jpg") == -1 && preciseLink.indexOf(".jpeg") == -1 && preciseLink.indexOf(".png") == -1 && preciseLink.indexOf(".gif") == -1 && preciseLink.indexOf("twitter") == -1)
                    links.push(preciseLink);
            }
        }
        return links;
    },
    getTwits : function(str){
        var links = [];
        var stripLinks = str.split('<a');
        for(var m=0; m<stripLinks.length; m++){
            var imageHref = stripLinks[m].split('href=\"');
            if(imageHref.length>1){
                var preciseLink = imageHref[1].split('\"')[0];
            }
            var imageAlt = stripLinks[m].split('alt=\"');
            if(imageAlt.length>1){
                var altLink = imageAlt[1].split('\"')[0];
            }
            if(typeof preciseLink != 'undefined' && preciseLink.indexOf("twitter") != -1){
                var type = "twit";
                if(preciseLink.indexOf('hashtag') != -1){
                    type = "hashTag";
                }
                links.push({"preciseLink" : preciseLink, "altLink" : altLink, "type": type});
            }
        }
        return links;
    },
    getVideos : function(str){
        var videos = [];
        var stripLinks = str.split('<iframe');
        //alert(stripLinks);
        //alert(stripLinks.length);
        for(var m=0; m<stripLinks.length; m++){
            var SRC = stripLinks[m].split('src=\"');
            if(SRC.length>1){
                var preciseLink = SRC[1].split('\" ')[0];
                videos.push(preciseLink);
            }
        }
        return videos;
    },
    getTwits : function(str){
        //TODO : manage twitter post list integration.
    },
    getTags : function(obj){
        var tags = [];
        for(var i=0; i<obj.categories.length; i++){
            tags.push(obj.categories[i]);
        }
        return tags;
    }
}
landscapeViewerFeed.init();