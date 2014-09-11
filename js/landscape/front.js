var front = {
    _defaultTopNav:0,
    _refreshDelay : null,
    init : function(){
        this._defaultTopNav = $('nav').offset().top;
        public_api.get_articles();
        lv_ui.init();
        this.addListeners();
        this.startRefresh();
        //this.get_articles();
    },
    addListeners : function(){
        var self = this;
        $(document).scroll(function() {
            if(typeof this._defaultTopNav == "undefined")
                this._defaultTopNav = $('nav').offset().top;
            if($(window).scrollTop() >= this._defaultTopNav){
                $('nav').css('position', 'fixed');
                $('nav').css('top', '0');
                $('nav').css('width', '100%');
                $('nav').css('z-index', '999');
                $('section').css('margin-top', $('nav').height()+'px');
            }else{
                $('nav').css('position', 'relative');
                $('section').css('margin-top', 0);
            }
            //($(document).height()-$('header').first().height()-$('nav').first().height())
            if ($(window).scrollTop()+$(window).height() >= $(document).height()) {
                TweenMax.to($('.refresh_bottom'),.5, {css:{height:"20px"}, onComplete:function(){
                    self.refreshDown();
                }});
                // you're at the bottom of the page
            }else{
                if(self._refreshDelay != null){
                    self._refreshDelay.kill();
                    self._refreshDelay = null;
                    self.stopRefreshDown();
                    TweenMax.to($('.refresh_bottom'),.5, {css:{height:"0px"}, onComplete:function(){
                    }});
                }
            }
            self.checkImagesVisibility();
            //$( "#log" ).append( "<div>Handler for .scroll() called.</div>" );
        });
        $('#advanced_search').on('click',function(){
            search.openSearchBar();
        });
        $(window).on('resize', function(){
            public_api.replaceAll();
        });
        $('.refresh_bull').bind('click', function(){
            lv_ui.alert_component({
                title:"error",
                message:"this part is currently off sorry.",
                buttons:[
                    {label:"OK", color:"red"},
                    {label:"No problem", color:"red"}
                ]
            }, function(e){
                console.log(e);
            });
        });
        self.checkImagesVisibility();
    },
    checkImagesVisibility : function(){
        jQuery.each( $('article'), function( i ) {
            var topPos = $(this).offset().top-$(window).scrollTop();
            if(topPos > -100 && topPos < $(window).height() && typeof $(this).find('header').attr('data-ground') != "undefined"){
                if($(this).find('header').attr('data-ground') != ""){
                    $(this).find('.image_header').css('background-image', 'url('+$(this).find('header').attr('data-ground')+')');
                    TweenLite.to($(this).find('.image_header'),.5, {opacity:1, delay:.2});
                }
            }else{
                TweenLite.to($(this).find('.image_header'),.5, {opacity:0, delay:.2, onComplete:function(){
                    $(this).find('header').css('background-image', '');
                }});
            }
        });
        if(typeof $('#global_section article') != "undefined"){
            if(public_api.getHeight().length > 0)
                $('#global_section').height((public_api.getHeight()[public_api.getHeight().length-1].height+20)+"px");
        }
    },
    startRefresh : function(){
        var self = this;
        TweenMax.to($('.progress'), .5, {css:{width:0}, ease:Power4.easeInOut, onComplete:function(){
            TweenMax.to($('.progress'), 25, {css:{width:"100%"}, ease:Power4.easeInOut, onComplete:function(){
                self.startRefresh();
            }});
        }});
    },
    refreshDown : function(){
        var self = this;
        this._refreshDelay = TweenMax.to($('.refresh_bottom .bar'), 2, {css:{width:$(document).width()+"px"}, ease:Power4.easeOut, onComplete:function(){
            alert('refreshed');
            self.stopRefreshDown();
        }});
    },
    stopRefreshDown : function(){
        TweenMax.to($('.refresh_bottom .bar'), 2, {css:{width:"0px"}, ease:Power4.easeIn});
    }
}
front.init();