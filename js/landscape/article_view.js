var articleView = {
	_articleInfos : null,
	_article_scroll : null,
	Diaporama : null,
    init : function(){
		//alert('we are on an article page '+navigation.pageInfos.id);
		//this.loadArticleInfos();
		for(var i=0; i<public_api._articles.length; i++){
			if(public_api._articles[i].id == navigation.pageInfos.id){
				this._articleInfos = public_api._articles[i];
				this.showArticleDatas();
				break;
			}
		}
    },
	showArticleDatas : function(){
		//alert(this._articleInfos.url);
		//$('#article_view').html(JSON.stringify(this._articleInfos));
		this._articleInfos.url = this._articleInfos.url.replace('./', '/');
		this._articleInfos.url = this._articleInfos.url.replace('http://localhost/~simondelamarre/LV/www', '');
		console.log(this._articleInfos);
		this._articleInfos.realDatas = JSON.parse(this._articleInfos.info_object);
		$('#article_view').css('background-color', this._articleInfos.dominante);
		lv_ui.get_template(
			{
				name:"article_detail_template",
				tagName : "div",
				attr:"article_viewer",
				values:this._articleInfos,
				target:$('#article_view')
			}
		);
		$('#article_view').css('background-image', 'url()');
		setTimeout(function(){
			$('#article_view').blurjs({
				source: '#article_image', //Background to blur
				radius: 25,
				overlay: '',
				offset: {
					x: 'center',
					y: 'center'
				},
				optClass: ''
			});
		},200);
		this._article_scroll = new IScroll('#article_view .wrapper', {mouseWheel: true});
		//$('#article_view .wrapper').
		//have to blur $('#article_image')

		this.Diaporama = new diaporama($('#article_diaporama'), 'artdiapo', 460, 'px', true, false, 20, function(e){
			console.log(e);
		});
		this.Diaporama.init();
	},
    loadArticleInfos : function(){
        utilities.load_service(
            "article_info/get",
            {
				article_id : navigation.pageInfos.id
			},
            function(response){
                console.log("user panoramics  = ", response);
                for(var i= 0; i<response.length; i++){
                    //get_template('user_panoramic_list');
                    lv_ui.get_template({name:"panoramic_list_template", tagName : "li", attr:"", values:response[i], target:$('#user_panoramic_list')});
                }
                self.replaceAll();
                //self._dropped_articles = null;
                //self.closeDropZone();
                //$('.panoramic_drop_zone .zone').html('p');
            }
        );
    },
    destroy : function(){

    }
}