var front = {
    _defaultTopNav:0,
    init : function(){
        this._defaultTopNav = $('nav').offset().top;
        public_api.get_articles();
        this.addListeners();
        this.startRefresh();
    },
    addListeners : function(){
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
            //$( "#log" ).append( "<div>Handler for .scroll() called.</div>" );
        });
        $(window).on('resize', function(){
            public_api.replaceAll();
        });
    },
    startRefresh : function(){
        var self = this;
        TweenMax.to($('.progress'), .5, {css:{width:0}, ease:Power4.easeInOut, onComplete:function(){
            TweenMax.to($('.progress'), 25, {css:{width:"100%"}, ease:Power4.easeInOut, onComplete:function(){
                self.startRefresh();
            }});
        }});
    }
}
front.init();