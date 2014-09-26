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
                if(!params) return false;
                var paramsArray = params.split('/');
                var param = 0;
                for(var i = 0; i < paramsArray.length; i += 2) {
                    navigation.pageInfos[param] = JSON.parse('{"tag" : "' + paramsArray[i] + '", "value" : "' + paramsArray[i + 1] + '"}');
                    param++;
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
        //alert(JSON.stringify(navigation.pageInfos));
        switch(navigation.pageInfos[0].tag){
            case 'article':
                $('#article_view').css('opacity', '0');
                $('#article_view').css('display', 'block');
                TweenLite.to($('#article_view'),.5, {opacity:1, onComplete:function(){
                    alert('load article and create view');
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
        $('body').css('overflow','hidden')
    },
	destroy : function(){

    }
}

navigation.init();