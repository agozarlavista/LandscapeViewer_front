var search = {
    typesScroll : null,
    sourcesScroll : null,
    keywordsScroll : null,
    init:function(){
        var self = this;
        this.getTypesList();
        //this.getSourcesList();
        this.keywordsScroll = new IScroll('#keywords_wrapper',{mouseWheel: true});
        $("#searchTags").tagit({
            beforeTagAdded: function(event, ui) {
                self.keywordsScroll.refresh();
            }
        });
        $('#save_search').on('click',function(){
            var sourceArray = [];
            $('#sources_list li').each(function( index ) {
                if($(this).hasClass('selected')){
                    sourceArray.push($(this).attr('data-value'));
                }
            });
            var keywordsArray = [];
            $('#searchTags li .tagit-label').each(function( index ) {
                keywordsArray.push($(this).html());
            });
            var locationArray = [];

            var languagesArray = ["fr", "en", "de", "es", "pt", "it", "cn", "nl"];

            var searchParams = {sources:sourceArray, keywords:keywordsArray, locations:locationArray, languages:languagesArray}
            console.log(JSON.stringify(searchParams));
        });
    },
    getSourcesList : function(){
        var self = this;
        var typesArray = [];
        $('#sources_list').html('');
        $('#types_list li').each(function( index ) {
            console.log( index + ": " + $( this ).text() );
            if($(this).hasClass('selected')){
                typesArray.push($(this).attr('data-value'));
            }
        });
        utilities.load_service(
            "feed/get_sources_list",
            {
                type_list : typesArray
            },
            function(result){
                var response = result;
                for(var i=0; i<response.length; i++){
                    $('#sources_list').append('<li id="source_'+response[i]['id']+'"class="animated" data-value="'+response[i]['id']+'"><span class="list_icon" style="background-image:url('+response[i].url+');"></span>'+response[i].label+'</li>');
                    //<input type="checkbox" value="'+response[i]['id']+'"/>
                    $('#source_'+response[i]['id']).on('click', function(){
                        if($(this).hasClass('selected')){
                            $(this).removeClass('selected');
                        }else{
                            $(this).addClass('selected');
                        }
                    });
                }
                if(self.sourcesScroll)
                    self.sourcesScroll.destroy();
                self.sourcesScroll = new IScroll('#sources_wrapper',{mouseWheel: true});
            }
        );
    },
    getTypesList : function(){
        var self = this;
        //feed/get_types_list
        utilities.load_service(
            "feed/get_types_list",
            {},
            function(result){
                console.log(result);
                var response = result;
                for(var i=0; i<response.length; i++){
                    $('#types_list').append('<li id="type_'+response[i]['id']+'"class="animated" data-value="'+response[i]['id']+'"><span class="list_icon" style="background-image:url('+response[i].url+');"></span>'+response[i].label+'</li>');
                    //<input type="checkbox" value="'+response[i]['id']+'"/>
                    $('#type_'+response[i]['id']).on('click', function(){
                        if($(this).hasClass('selected')){
                            $(this).removeClass('selected');
                        }else{
                            $(this).addClass('selected');
                        }
                        self.getSourcesList();
                    });
                }
                self.typesScroll = new IScroll('#types_wrapper',{mouseWheel: true});
            }
        );
    },
    openSearchBar : function(){
        console.log('offset = ', $('#top_nav').offset());
        console.log('position = ', $('#top_nav').position());
        var self = this;
        if($('.advancedSearchBar').height() > 0){
            this.closeSearchBar();
            return;
        }
        var h = $(window).height()-60;
        TweenLite.to(window, .2, {scrollTo:{y:$('#top_nav').offset().top}, onComplete:function(){
            TweenMax.to($('.advancedSearchBar'), 1, {height:h+"px", ease:Power4.easeInOut, onComplete : function(){
                $('.col').height((h-65)+'px');
                $('#types_wrapper').height((h-110)+"px");
                if(self.typesScroll)
                    self.typesScroll.refresh();
                $('#sources_wrapper').height((h-110)+"px");
                if(self.sourcesScroll)
                    self.sourcesScroll.refresh();

                $('#keywords_wrapper').height((h-110)+"px");
                if(self.keywordsScroll)
                    self.keywordsScroll.refresh();

            }});
        }});
    },
    closeSearchBar : function(){
        TweenMax.to($('.advancedSearchBar'), 1, {height:"0px", ease:Power4.easeIn});
    }
}
search.init();