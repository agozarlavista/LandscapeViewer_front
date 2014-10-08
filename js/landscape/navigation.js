var navigation = {
    pageInfos : null,
	init : function(){
        this.initRoot();
        this.setListeners();
	},
	setListeners : function(){
        $(document).on('click', function(e){
            if($(e.target).attr('data-page')){
                navigation.router.navigate($(e.target).attr('data-page'), {trigger: true, replace: false});
            }else {
                if ($(e.target).parent().attr('data-page')){
                    navigation.router.navigate($(e.target).parent().attr('data-page'), {trigger: true, replace: false});
                }
            }
        });
	},
    initRoot : function(){
        var ApplicationRouter = Backbone.Router.extend({
            routes: {
                "": "loadPage",
                "*page":"loadPage"
            },
            loadPage : function(params){
                navigation.pageInfos = {};
                //if(!params) return false;
				if(typeof params != 'undefined'){
					var paramsArray = params.split('/');
					var param = 0;
					if(paramsArray.length > 0){
						navigation.pageInfos['page'] = paramsArray[0];
						for(var i = 0; i < paramsArray.length; i += 2) {
							navigation.pageInfos[paramsArray[i]] = paramsArray[i + 1];
							param++;
						}
					}
				}
                navigation.openPage();
            }
        });
        Backbone.emulateHTTP = true;
        navigation.router = new ApplicationRouter();
        Backbone.history.start({pushState:true});
        navigation.transition = 'instant';
        //navigation.router.navigate('page/'+startPage, {trigger: true, replace: false});
        //navigation.setSampleListeners();
        //Backbone.history.stop();
    },
    goBack : function(){
        Backbone.history.start();
        Backbone.history.back();
        Backbone.history.stop();
    },
    openPage : function(){
		//navigation.pageInfos.keys = Object_keys;
		if(typeof navigation.pageInfos.page != "undefined"){
			switch(navigation.pageInfos.page){
				case 'article':
					$('#article_view').css('opacity', '0');
					$('#article_view').css('display', 'block');
					articleView.init();
					TweenLite.to($('#article_view'),.5, {opacity:1, onComplete:function(){
					}});
					break;
				case 'panoramic':
					break;
				case 'profile':
					break;
				case 'search':
					break;
				case 'login':
					break;
				case 'download':
					break;
			}
			$('body').css('overflow','hidden');
		}else{
			$('body').css('overflow','scroll');
			$('#article_view').html('');
			$('#article_view').css('display', 'none');
		}
    },
	destroy : function(){

    }
}

navigation.init();