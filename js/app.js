var global = {
	root : null,
	appRoot : null,
    pageinit : null,
    ratio : null,
    devicePixelRatio : null,
    backingStoreRatio : null,
    groundcanvas : null,
    prevScroll : 0,
    mousePosition:{x:0,y:0},
	init:function(page){
        this.pageinit = page;
		this.root = Backbone.Router.extend ({
		    routes: {
		        '' 			: 'home',
		        'view/:page': 'viewImage'
		    },
		    home: function () {
		        //alert('you are viewing home page');
		    },
		    viewImage: function () {
		        //alert('you are viewing an image');
		    }
		});
		this.appRoot = new this.root();
		Backbone.emulateHTTP = true;
		//Backbone.history.start();
		Backbone.history.start({ pushState: true });
		this.setListeners();

        scrollNavigation.init(true, false);
        scrollNavigation.addKeyboardEvents();
	},
    setPixelRatio : function(){
        // get the canvas and context
        this.groundcanvas = document.getElementById('globalcanvas'),
        this.groundcanvascontext = this.groundcanvas.getContext('2d'),

        this.groundcanvas.width=$(document).width();
        this.groundcanvas.height=$(document).height();
        // finally query the various pixel ratios
        this.devicePixelRatio = window.devicePixelRatio || 1,
            this.backingStoreRatio = this.groundcanvascontext.webkitBackingStorePixelRatio ||
                this.groundcanvascontext.mozBackingStorePixelRatio ||
                this.groundcanvascontext.msBackingStorePixelRatio ||
                this.groundcanvascontext.oBackingStorePixelRatio ||
                this.groundcanvascontext.backingStorePixelRatio || 1,

        this.ratio = this.devicePixelRatio / this.backingStoreRatio;

        // upscale the canvas if the two ratios don't match
        if (this.devicePixelRatio !== this.backingStoreRatio) {

            var oldWidth = this.groundcanvas.width;
            var oldHeight = this.groundcanvas.height;

            this.groundcanvas.width = oldWidth * this.ratio;
            this.groundcanvas.height = oldHeight * this.ratio;

            this.groundcanvas.style.width = oldWidth + 'px';
            this.groundcanvas.style.height = oldHeight + 'px';

            // now scale the context to counter
            // the fact that we've manually scaled
            // our canvas element
            this.groundcanvascontext.scale(this.ratio, this.ratio);

        }

        this.groundcanvascontext.beginPath()
        this.groundcanvascontext.arc(100,100,100,0,Math.PI*2, false); // outer (filled)
        this.groundcanvascontext.arc(100,100,55,0,Math.PI*2, true); // inner (unfills it)
        this.groundcanvascontext.fill();
    },
	changePage : function(){
		this.appRoot.navigate("view/"+this.pageinit);
	},
	setListeners : function(uri){
        $('button').bind('click',function(e){
           	Backbone.history.start({ pushState: true });
			global.appRoot.navigate("view/"+e.target.id.split('page').join(''));
			Backbone.history.stop();
		});
	},
	destroy:function(){
		
	}
}




scrollNavigation = {
    pagePos : [],
    subPagePos : [],
    navRefs : [],
    mArticles : [],
    subArticles : [],
    subNavigations : [],
    currentPage : -1,
    returnNav : false,
    oldScrollTop : 0,
    oldScrollLeft : 0,
    groundcanvas : null,
    groundcanvascontext : null,
    mousePosition : {x:0,y:0},
    prevMousePosition:{x:0,y:0},
    wavePos:{top:50, bottom:0},
    pageName : "",
    subPageName:"",
    isDown : false,
    init : function(returnNav, activeScroll){
        this.setCanvasSize();
        this.returnNav = returnNav;
        this.wavePos.bottom = $(window).height();
        $('body').css('overflow','hidden');
        $( document ).scroll(function(e) {
            var limit = $(window).height() - 40;
            var headerPosition = $(window).height() - $(document).scrollTop();
            if(headerPosition < 50){
                headerPosition = 50;
            };
            $('.header').height(headerPosition+"px");
            scrollNavigation.checkPage();

            e.preventDefault();
        });
        if(!activeScroll == true){
            $(document).on('mousewheel', function(e) {
                //console.log(event.deltaX, event.deltaY, event.deltaFactor);
                clearTimeout($.data(this, 'timer'));
                $.data(this, 'timer', setTimeout(function() {
                    if(e.deltaY >= 1){
                        scrollNavigation.currentPage--;
                        scrollNavigation.replacePageScroll();
                        e.stopPropagation();
                    }else if(e.deltaY <= -1){
                        scrollNavigation.currentPage++;
                        scrollNavigation.replacePageScroll();
                        e.stopPropagation();
                    }
                    $('#scrollCanvas').css('display','none');
                }, 50));
                scrollNavigation.scrollCanvas(e.deltaY, e.deltaX);
                $('#scrollCanvas').css('display','block');
            });
        }
        this.initPos();
        $( window ).resize(function() {
            scrollNavigation.initPos();
        });

        $(window).mousedown(function(e){
            scrollNavigation.isDown = true;
            scrollNavigation.prevMousePosition.x = e.pageX;
            scrollNavigation.prevMousePosition.y = e.pageY;
            $('#scrollCanvas').css('display','block');
        });
        $(window).mouseup(function(e){
            if(!scrollNavigation.isDown)
                return;
            var difY = e.pageY - scrollNavigation.prevMousePosition.y;
            var difX = e.pageX - scrollNavigation.prevMousePosition.x;
            scrollNavigation.reversScrollCanvas(e.pageY, e.pageX);
            if(Math.abs(difY) > Math.abs(difX)){
                if(Math.abs(difY) < 125)
                    return;
                if(difY > 0){
                    scrollNavigation.currentPage--;
                    scrollNavigation.replacePageScroll();
                    e.stopPropagation();
                }else if(difY < 0){
                    scrollNavigation.currentPage++;
                    scrollNavigation.replacePageScroll();
                    e.stopPropagation();
                }
            }else{
                if(difX > 0){
                    scrollNavigation.updateSubPage('next');
                }else{
                    scrollNavigation.updateSubPage('prev');
                }
            }

        });
        $(window).mousemove(function(e){
            if(scrollNavigation.isDown){
                var difY = e.pageY - scrollNavigation.prevMousePosition.y;
                var difX = e.pageX - scrollNavigation.prevMousePosition.x;
                scrollNavigation.scrollCanvas(difY/2, difX/2);
                if(Math.abs(difY) > $(window).height()/1.5){
                    scrollNavigation.reversScrollCanvas(e.pageY, e.pageX);
                    if(difY > 0){
                        scrollNavigation.currentPage--;
                        scrollNavigation.replacePageScroll();
                        e.stopPropagation();
                    }else if(difY < 0){
                        scrollNavigation.currentPage++;
                        scrollNavigation.replacePageScroll();
                        e.stopPropagation();
                    }
                }
            }
        });
    },
    initPos : function(){
        scrollNavigation.pagePos = [];
        scrollNavigation.navRefs = [];
        $('section:first article').each(function() {
            if($(this).attr('data-page') != undefined){
                var off = $(this).position();
                scrollNavigation.pagePos.push(off.top);
                scrollNavigation.mArticles.push($(this));
                scrollNavigation.setSubPagination($(this));
            }
        });
        $('header:first li').each(function() {
            if($(this).attr('data-page') != undefined){
                scrollNavigation.navRefs.push($(this));
            }
        });
        if(this.returnNav){
            scrollNavigation.navRefs.reverse();
        }
    },
    setSubPagination : function(article){
        var numArray = this.pagePos.length;
        this.subArticles[numArray] = [];
        this.subNavigations[this.pagePos.length] = [];
        this.subPagePos.push(0);
        article.find('section:first arcticle').css('width', $(document).width()+'px');
        article.find('section:first arcticle').each(function() {
            if($(this).attr('data-page') != undefined){
                scrollNavigation.subArticles[numArray].push($(this));
            }
        });
        article.find('section:first .contentScroller').css('width', (100 * article.find('section:first arcticle').length)+"%");
        article.find('footer:first li').each(function() {
            if($(this).attr('data-page') != undefined){
                scrollNavigation.subNavigations[numArray].push($(this));
            }
        });
        scrollNavigation.subNavigations[scrollNavigation.pagePos.length][0].addClass('selection');
    },
    addKeyboardEvents : function(){
        $( document ).keydown(function(e) {
            switch(e.keyCode){
                case 38:
                    //UP
                    scrollNavigation.currentPage--;
                    scrollNavigation.replacePageScroll();
                    break;
                case 40:
                    //DOWN
                    scrollNavigation.currentPage++;
                    scrollNavigation.replacePageScroll();
                    break;
                case 37:
                    //LEFT
                    scrollNavigation.updateSubPage('prev');
                    break;
                case 39:
                    //RIGHT
                    scrollNavigation.updateSubPage('next');
                    break;
                case 90:
                    //UP
                    scrollNavigation.currentPage--;
                    scrollNavigation.replacePageScroll();
                    break;
                case 83:
                    //DOWN
                    scrollNavigation.currentPage++;
                    scrollNavigation.replacePageScroll();
                    break;
                case 81:
                    //LEFT
                    scrollNavigation.updateSubPage('prev');
                    break;
                case 68:
                    //RIGHT
                    scrollNavigation.updateSubPage('next');
                    break;
            }
            // $( "#target" ).keydown();
            e.preventDefault();
        });
    },
    checkPage : function(){
        if($(document).scrollTop() < this.pagePos[0]-10){
            this.navRefs[0].removeClass('scrollNavigationSelected');
            this.navRefs[0].find(".text").css('color', '#fff');
            this.currentPage = -1;
            return false;
        }
        if($(document).scrollTop() > this.pagePos[this.pagePos.length-1]){
            this.navRefs[this.pagePos.length-1].removeClass('scrollNavigationSelected');
            this.navRefs[this.pagePos.length-1].find(".text").css('color', '#fff');
            this.currentPage = this.pagePos.length;
            return false;
        }
        for(var i=0; i<this.pagePos.length; i++){
            this.navRefs[i].removeClass('scrollNavigationSelected');
            this.navRefs[i].find(".text").css('color', '#fff');
            if($(document).scrollTop() + this.navRefs[0].height() > this.pagePos[i]){
                this.currentPage = i;
            }
            if(i == this.pagePos.length-1){
                this.navRefs[this.currentPage].addClass('scrollNavigationSelected');
                this.navRefs[this.currentPage].find(".text").css('color', '#000');
                //this.navRefs[this.currentPage].attr('selection','true');
            }
        }
    },
    replacePageScroll : function(){
        if(this.currentPage <= -1){
            this.currentPage = -1;
            Backbone.history.start({ pushState: true });
            global.appRoot.navigate("");
            Backbone.history.stop();
            TweenLite.to(window,.8, {scrollTo:{y:0, x:0}, ease:Power2.easeInOut});
            return;
        }else if(this.currentPage == 0){
            this.currentPage = 0;
        }
        if(this.currentPage > this.pagePos.length - 1){
            TweenLite.to($('#pageFooter'), .6, {css:{height:"100%"}, ease:Power4.easeInOut});
            this.currentPage = this.pagePos.length;
            return false;
        }else{
            TweenLite.to($('#pageFooter'), .6, {css:{height:"0"}, ease:Power4.easeInOut});
        }/*else{
            this.wavePos.bottom = $(window).height();
            this.wavePos.top = 50;
        }*/
        this.pageName = $('section:first #article'+this.currentPage).attr('data-page');
        Backbone.history.start({ pushState: true });
        global.appRoot.navigate(this.pageName);
        Backbone.history.stop();

        this.subPagePos[this.currentPage] = 0;
        this.updateSubPage("prev");
        //TweenLite.to(this.mArticles[this.currentPage].find('section:first'), .1, {scrollTo:{x:0, y:0}, ease:Power2.easeInOut});

        TweenLite.to(window,.6, {scrollTo:{y:this.pagePos[this.currentPage], x:0}, ease:Power2.easeInOut, onComplete:function(){
            //console.log(scrollNavigation.currentPage);
        }});
    },
    updateSubPage : function(action){
        if(this.currentPage>=0 && this.currentPage < this.navRefs.length){
            if(action=="prev"){
                this.subPagePos[this.currentPage]--;
            }else if(action=="next"){
                this.subPagePos[this.currentPage]++;
            }
            if(this.subPagePos[this.currentPage] < 0){
                this.subPagePos[this.currentPage] = 0;
            }else if(this.subPagePos[this.currentPage] > this.subArticles[this.currentPage+1].length - 1){
                this.subPagePos[this.currentPage] = this.subArticles[this.currentPage+1].length - 1;
            }
            this.subPageName = $('section:first #article' + this.currentPage + " #art" + this.subPagePos[this.currentPage]).attr('data-page');
            Backbone.history.start({ pushState: true });
            global.appRoot.navigate(this.pageName+"/"+this.subPageName);
            Backbone.history.stop();

            var scrollPos = $(document).width() * this.subPagePos[this.currentPage];
            TweenLite.to(this.mArticles[this.currentPage].find('section:first'), .6, {scrollTo:{x:scrollPos, y:0}, ease:Power2.easeInOut});
            for(var i=0; i<scrollNavigation.subNavigations[this.currentPage+1].length; i++){
                scrollNavigation.subNavigations[this.currentPage+1][i].removeClass('selection');
            }
            scrollNavigation.subNavigations[this.currentPage+1][this.subPagePos[this.currentPage]].addClass('selection');
        }
    },
    setCanvasSize : function(){
        this.groundcanvas = document.getElementById('scrollCanvas'),
        this.groundcanvascontext = this.groundcanvas.getContext('2d'),

        this.groundcanvas.width=$(window).width();
        this.groundcanvas.height=$(window).height();
        // finally query the various pixel ratios
        this.devicePixelRatio = window.devicePixelRatio || 1,
            this.backingStoreRatio = this.groundcanvascontext.webkitBackingStorePixelRatio ||
                this.groundcanvascontext.mozBackingStorePixelRatio ||
                this.groundcanvascontext.msBackingStorePixelRatio ||
                this.groundcanvascontext.oBackingStorePixelRatio ||
                this.groundcanvascontext.backingStorePixelRatio || 1,

            this.ratio = this.devicePixelRatio / this.backingStoreRatio;

        // upscale the canvas if the two ratios don't match
        if (this.devicePixelRatio !== this.backingStoreRatio) {

            var oldWidth = this.groundcanvas.width;
            var oldHeight = this.groundcanvas.height;

            this.groundcanvas.width = oldWidth * this.ratio;
            this.groundcanvas.height = oldHeight * this.ratio;

            this.groundcanvas.style.width = oldWidth + 'px';
            this.groundcanvas.style.height = oldHeight + 'px';

            // now scale the context to counter
            // the fact that we've manually scaled
            // our canvas element
            this.groundcanvascontext.scale(this.ratio, this.ratio);

        }
    },
    scrollCanvas : function(bezierHeight, bezierWidth){
        //var can = document.getElementById('scrollCanvas');
        //var ctx = can.getContext();
        this.groundcanvascontext.clearRect(0,0,this.groundcanvas.width,this.groundcanvas.height);
        //this.groundcanvascontext.beginPath()
        //this.groundcanvascontext.arc(100,100,100,0,Math.PI*2, false); // outer (filled)
        //this.groundcanvascontext.arc(100,100,55,0,Math.PI*2, true); // inner (unfills it)
        //this.groundcanvascontext.fill();
        var difBezier = bezierHeight;
        var bezier = {
            "start":$(document).width()/4 + difBezier,
            "bezierStart":$(document).width()/4 + difBezier,
            "bezierPicIn":($(document).width()/2)+bezierWidth,
            "picIn":bezierHeight,
            "bezierPicOut":($(document).width()/2)+bezierWidth,
            "picOut":bezierHeight
        }
        if(bezierHeight >0){
            if(this.currentPage <= -1){
                return false;
            }
            var posY = this.wavePos.top;
            bezierHeight = bezierHeight + this.wavePos.top;
            this.groundcanvascontext.beginPath();
            this.groundcanvascontext.moveTo(0, this.wavePos.top);
            this.groundcanvascontext.bezierCurveTo($(document).width()/4 + difBezier, this.wavePos.top, $(document).width()/4 + difBezier, bezierHeight, ($(document).width()/2)+bezierWidth, bezierHeight);
            this.groundcanvascontext.lineTo(($(document).width()/2)+bezierWidth, bezierHeight);
            this.groundcanvascontext.bezierCurveTo(($(document).width()/2)+bezierWidth + $(document).width()/4 - difBezier, bezierHeight, $(document).width()/2 + $(document).width()/4 - difBezier, this.wavePos.top, $(document).width(), this.wavePos.top);
        }else if(bezierHeight < 0){
            var posY = this.wavePos.bottom;
            this.groundcanvascontext.beginPath();
            this.groundcanvascontext.moveTo(0, posY);
            this.groundcanvascontext.bezierCurveTo($(document).width()/4 - difBezier, posY, $(document).width()/4 - difBezier, posY+bezierHeight, ($(document).width()/2)+bezierWidth, posY+bezierHeight);
            this.groundcanvascontext.lineTo(($(document).width()/2)+bezierWidth, posY+bezierHeight);
            this.groundcanvascontext.bezierCurveTo(($(document).width()/2)+bezierWidth + $(document).width()/4 + difBezier, posY+bezierHeight, $(document).width()/2 + $(document).width()/4 + difBezier, posY, $(document).width(), posY);
        }
        this.groundcanvascontext.fill();
    },
    reversScrollCanvas : function(y, x){
        scrollNavigation.isDown = false;
        var difY = y - scrollNavigation.prevMousePosition.y;
        var difX = x - scrollNavigation.prevMousePosition.x;
        var tweenObj = {deltaY:difY/2, deltaX:difX/2}
        TweenMax.to(tweenObj,.6, {deltaY:0, deltaX:0, ease:Quint.easeOut, onUpdate:function(){
            scrollNavigation.scrollCanvas(tweenObj.deltaY, tweenObj.deltaX);
        }, onComplete:function(){
            $('#scrollCanvas').css('display','none');
        }});
    },
    destroy:function(){

    }
}
