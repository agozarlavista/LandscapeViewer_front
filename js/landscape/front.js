var front = {
    _defaultTopNav:0,
    _refreshDelay : null,
    init : function(){
        this._defaultTopNav = $('nav').offset().top;
        public_api.get_articles({limit:25});
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
            clearTimeout($.data(this, 'timer'));
			$.data(this, 'timer', setTimeout(function() {
				self.checkImagesVisibility();
				if ($(window).scrollTop()+$(window).height() >= $(document).height()-25) {
					$('.refresh_bottom').css('height',"0px");
					self.refreshDown();
				}else{
					if(self._refreshDelay != null){
						self._refreshDelay.kill();
						self._refreshDelay = null;
						self.stopRefreshDown();
						//TweenMax.to($('.refresh_bottom'),.5, {css:{height:"0px"}, onComplete:function(){
						//}});
					}
				}
			}, 40));
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
                //console.log(e);
            });
        });
        self.checkImagesVisibility();
    },
    checkImagesVisibility : function(){
        jQuery.each( $('article'), function( i ) {
            var topPos = $(this).offset().top-$(window).scrollTop();
            if(topPos > -100 && topPos < $(window).height() && typeof $(this).find('header').attr('data-ground') != "undefined"){
				if($(this).find('header').attr('data-ground') != ""){
					var curObj = $(this).find('.image_header');
					var curUri = $(this).find('header').attr('data-ground');
					var img = new Image();
					img.onload = function(){
						curObj.css('background-image', 'url('+curUri+')');
						TweenLite.to(curObj,.5, {opacity:1, delay:.2});
					};
					img.src = curUri;
				}
            }else{
				if($(this).find('image_header').css('opacity') != "0") {
					TweenLite.to($(this).find('.image_header'), .5, {
						opacity: 0, delay: .2, onComplete: function () {
							$(this).find('header').css('background-image', '');
						}
					});
				}
            }
			if(topPos > -$(this).height() || topPos < $(window).height()){
				$(this).css('display', 'block');
			}else {
				if ($(this).css('display') != "none") {
					$(this).css('display', 'none');
				}
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
            TweenMax.to($('.progress'),20, {css:{width:"100%"}, ease:Power4.easeInOut, onComplete:function(){
                self.startRefresh();
            }});
        }});
    },
    refreshDown : function(){
        var self = this;
        //this._refreshDelay = TweenMax.to($('.refresh_bottom .bar'),.3, {css:{width:$(document).width()+"px"}, ease:Power4.easeInOut, onComplete:function(){
        //    public_api.get_articles({start:$('#global_section article').length, limit:25});
        //    self.stopRefreshDown();
        //}});
		public_api.get_articles({start:$('#global_section article').length, limit:25});
		self.stopRefreshDown();
    },
    stopRefreshDown : function(){
        TweenMax.to($('.refresh_bottom .bar'),.5, {css:{width:"0px"}, ease:Power4.easeIn});
    }
}
front.init();