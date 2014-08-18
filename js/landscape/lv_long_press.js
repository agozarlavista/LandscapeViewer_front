var long_press = function(target){
    this._objectId = target;
    this.init();
    this._delayedSelection = {value:0};
    this._delayedMotion = null;
    this._isLongPress = false;
    this._startX = 0;
    this._startY = 0;
}
long_press.prototype.init = function(){
    var self = this;
    // how many milliseconds is a long press?
    var longpress = 1000;
    // holds the start time
    var start;
    jQuery( "#"+this._objectId ).on( 'mousedown', function( e ) {
        if($(this).find('.selected_frame').css('display') == "block")
            return;
        $("body").prepend('<div class="long_press_canvas_content" style="left:' + (e.pageX-40) + 'px; top:' + (e.pageY-90) + 'px;"><canvas class="long_press_canvas" width="80" height="80" id="long_press_canvas"></canvas><div class="inner">h</div></div>');
        self._startX = e.pageX;
        self._startY = e.pageY;
        $(document).on('mousemove', function(e){
            if(!$('.long_press_canvas_content'))
                return;
            $('.long_press_canvas_content').css('left', (e.pageX-40)+'px');
            $('.long_press_canvas_content').css('top', (e.pageY-90)+'px');
            if(Math.abs(e.pageX-self._startX) > 5 || Math.abs(e.pageY-self._startY) > 5){
                $('.long_press_canvas_content').css('display', 'none');
                self._delayedMotion.kill();
            }
        });
        start = new Date().getTime();
        this._isLongPress = false;
        self.startDelayedPress();
    } );

    jQuery( "#"+this._objectId ).on( 'mouseleave', function( e ) {
        //self.destroyDelayedPress();
        start = 0;
    } );

    jQuery( "#"+this._objectId ).on( 'mouseup', function( e ) {
        if(self._isLongPress){
            $('#'+self._objectId).addClass('selected_article');
            $('#'+self._objectId+' .selected_frame').css('display', 'block');
        }
        self.destroyDelayedPress();
        if ( new Date().getTime() >= ( start + longpress )  ) {
            //alert('long press!');
        } else {
            //alert('short press!');
        }
        self._isLongPress = false;
    } );
}
long_press.prototype.destroyDelayedPress = function(){
    $(document).off('mousemove');
    $('.long_press_canvas_content').remove();
    this._delayedSelection.value = 0;
    //this._delayedMotion.kill();
    this._delayedMotion = null;
}
long_press.prototype.startDelayedPress = function(){
    var self = this;
    var can = document.getElementById('long_press_canvas');
    var ctx = can.getContext('2d');
        ctx.scale(.5,.5);
    //this._delayedSelection = {value:0};
    this._delayedMotion = TweenMax.to(self._delayedSelection, 1, {value:2,
        onUpdate:function(){
            ctx.beginPath();
            ctx.arc(80,80,80,0,Math.PI*self._delayedSelection.value, false);
            ctx.strokeStyle="#50AACE";
            ctx.lineWidth=80;
            ctx.stroke();
        }, onComplete : function(){
            self._isLongPress = true;
        }
    });
}
long_press.prototype.destroy = function(){
    jQuery( "#"+this.objectId ).off( 'mousedown');
    jQuery( "#"+this.objectId ).off( 'mouseleave');
    jQuery( "#"+this.objectId ).off( 'mouseup');
}