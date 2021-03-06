var articleView = {
	_articleInfos : null,
	_article_scroll : null,
	Diaporama : null,
    init : function(){
		var self = this;
		utilities.load_service(
			"feed/get_article",
			{
				id:navigation.pageInfos.id
			},
			function(result){
				console.log('article current : ', result);
				self._articleInfos = result[0];
				self.showArticleDatas();
			}
		);
    },
	showArticleDatas : function(){
		//alert(this._articleInfos.url);
		//$('#article_view').html(JSON.stringify(this._articleInfos));
		this._articleInfos.url = this._articleInfos.url.replace('./', '/');
		this._articleInfos.url = this._articleInfos.url.replace('http://localhost/~simondelamarre/LV/www', '');
		//console.log(this._articleInfos);
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
			//console.log(e);
			console.log(navigation.pageInfos);
			navigation.router.navigate('article/'+navigation.pageInfos.article+'/id/'+navigation.pageInfos.id+'/picture/'+e, {trigger: true, replace: false});
		});
		this.Diaporama.init();

		if(typeof navigation.pageInfos.picture != "undefined"){
			this.Diaporama.slide(navigation.pageInfos.picture);
		}
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
                    lv_ui.get_template({name:"panoramic_list_template", tagName : "li", attr:"", values:response[i], target:$('#user_panoramic_list')});
                }
                self.replaceAll();
            }
        );
    },
    destroy : function(){

    }
}