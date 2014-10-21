var articles = {
    _current_update : 0,
    _current_article : 0,
    _current_article_list : null,
    _urls_list : null,

	init : function(){
        var self = this;
	    utilities.load_service("feed/get_urls_list", {}, function(e){
            self._urls_list = e;
            for(var i=0; i<self._urls_list.length; i++){
                $('#urls_list').append(self._urls_list[i].url);
            }
            setTimeout(function(){self.startUpdateArticles();},500);
        });
    },
    startUpdateArticles : function(){
        this._current_article = 0;
        var self = this;
        //for tests http://www.lemonde.fr/rss/une.xml
        //self._urls_list[self._current_update].url
        //"http://www.milkmagazine.net/feed/"
        if(self._current_update == self._urls_list.length-1){
            self._current_update = 0;
            setTimeout(function(){self.startUpdateArticles();},500);
            return;
        }
        console.log("////////////////**********************///////////////////////"+self._urls_list[self._current_update].url)
        landscapeViewerFeed.loadPage(self._urls_list[self._current_update].url, function(response){
			console.log(response);
       		//landscapeViewerFeed.loadPage("http://rss.lemonde.fr/c/205/f/3050/index.rss", function(response){
            if(response.error){
                self._current_update++;
                setTimeout(function(){self.startUpdateArticles();},500);
                return false;
            }
            //console.log(JSON.stringify(response));
            //return;
            self._current_article_list = response;
            //console.log(self._current_article_list);
            if(self._current_article_list.length > 0){
                self.saveFeedArticles();
            }else{
                self._current_update++;
                setTimeout(function(){self.startUpdateArticles();},500);

            }
        });
    },
    saveFeedArticles : function(){
		console.log('saveFeedArticles');
        var self = this;
        self.saveArticle(self._current_article_list[self._current_article], function(e){
            if(this._current_article < self._current_article_list.length){
                self.saveFeedArticles();
            }else{
				//self._current_article = 0;
            }
        });
        //this._current_article++;
    },
    saveArticle : function(Object, callBack){
        console.log("saveArticle");
        console.log(Object);
        //return;
        var self = this;
        //ON CRée le thumb en premier
        var data_image = {
            "image_url" : Object.images[0]
        }
        utilities.load_service("feed/get_article", {"link":Object.link}, function(e) {
			console.log(e);
			//response = JSON.parse(e);
			response = e;
			/*if(response.code != 200)
			 return;*/
			if (response.length > 0) {
				//console.log('already exist');
				self.nextArticle();
				return;
			}
			var params = {
				object : JSON.stringify(Object),
				id_type : self._urls_list[self._current_update].id_type,
				id_source : self._urls_list[self._current_update].id_source,
				date : new Date(Object.publishedDate).getTime(),
				tags : Object.tags,
				image_id : 0,
				link : Object.link,
				title : Object.title
			}
			if(Object.images.length>0){
				utilities.load_service("feed/save_image_from_web", data_image, function (image_id) {
					console.log('save_image_from_web : ', image_id);
					params.image_id = image_id.toString();
					console.log('params.image_id : ', params.image_id);
					self.saveIt(params);
				});
			}else{
				self.saveIt(params);
			}
        });
    },
	saveIt : function(params){
		console.log('params : ', params);
		var self = this;
		utilities.load_service("feed/add_article", params, function(reponse){
			console.log(self._current_article+" < "+self._current_article_list);
			self.nextArticle();
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
            setTimeout(function(){self.startUpdateArticles();},500);
        }
    },
    short : function(str){
        if(str.length > 20)
            str = str.substr(0,20)+"...";
        return str;
    }
}
articles.init();