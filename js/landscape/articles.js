var articles = {
    _current_update : 0,
    _current_article : 0,
    _current_article_list : null,
    _urls_list : null,

	init : function(){
        var self = this;
	    utilities.load_service("feed/get_urls_list", {}, function(e){
            self._urls_list = JSON.parse(e);
            for(var i=0; i<self._urls_list.length; i++){
                $('#urls_list').append(self._urls_list[i].url);
            }
            self.startUpdateArticles();
        });
    },
    startUpdateArticles : function(){
        this._current_article = 0;
        var self = this;
        //for tests http://www.lemonde.fr/rss/une.xml
        //self._urls_list[self._current_update].url
        //"http://www.milkmagazine.net/feed/"
        //alert(self._current_update+" == "+self._urls_list.length)
        if(self._current_update == self._urls_list.length){
            alert('finished');
            return
        }
        console.log("////////////////**********************///////////////////////"+self._urls_list[self._current_update].url)
        landscapeViewerFeed.loadPage(self._urls_list[self._current_update].url, function(response){
            self._current_article_list = response;
            console.log(self._current_article_list);
            if(self._current_article_list.length > 0){
                self.saveFeedArticles();
            }else{
                self._current_update++;
                self.startUpdateArticles();
            }
        });
    },
    saveFeedArticles : function(){
        var self = this;
        //alert(JSON.stringify(self._current_article_list[this._current_article]));
        self.saveArticle(self._current_article_list[self._current_article], function(e){
            if(this._current_article < self._current_article_list.length){
                self.saveFeedArticles();
            }else{

            }
        });
        //this._current_article;
    },
    saveArticle : function(Object, callBack){
        console.log("saveArticle");
        var self = this;
        //ON CRée le thumb en premier
        var data_image = {
            "image_url" : Object.images[0]
        }
        utilities.load_service("feed/get_article", {"link":Object.link}, function(e){
            response = JSON.parse(e);
            if(response.code != 200)
                return;
            if(response.data.length>0){
                console.log('already exist');
                self.nextArticle();
                return;
            }
            utilities.load_service("feed/save_image_from_web", data_image, function(reponse){
                console.log(reponse);
                response = JSON.parse(reponse);
                //alert(response+" "+response.code+ "  " + typeof response.code);
                if(parseInt(response.code) == 200){
                    var params = {
                        object : JSON.stringify(Object),
                        id_type : self._urls_list[self._current_update].id_type,
                        id_source : self._urls_list[self._current_update].id_source,
                        date : new Date(Object.publishedDate).getTime(),
                        image_id : response.id,
                        tags : Object.tags,
                        link : Object.link,
                        title : Object.title
                    }
                    console.log(params);
                    //alert(JSON.stringify(params));
                    //on ajoute l'article en base avec l'image_id
                    utilities.load_service("feed/add_article", params, function(reponse){
                        console.log(self._current_article+" < "+self._current_article_list);
                        self.nextArticle();
                    });
                }
            });
        });
    },
    nextArticle : function(){
        var self = this;
        if(self._current_article < self._current_article_list.length-1){
            console.log("on passe à l'article suivant");
            self._current_article++;
            self.saveFeedArticles();
        }else{
            console.log('on a parcuru les articles du feed on passe au feed suivant');
            self._current_update++;
            self.startUpdateArticles();
        }
    },
    short : function(str){
        if(str.length > 20)
            str = str.substr(0,20)+"...";
        return str;
    }
}
articles.init();