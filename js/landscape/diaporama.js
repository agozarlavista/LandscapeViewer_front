function diaporama (target, name, height, unity, displayNavigation, autoSwipe, swipeDelay, endCallBack) {
	this.target = target;
	this._current = 0;
	this._action = true;
	this._name = name;
	this._idName = target.attr('id');
	this._count = this.target.find('li').length;
	this._delay = swipeDelay;
	this._autoSwipe = autoSwipe;
	this.delayMotion = null;
	this._endCallBack = endCallBack;
	this._isOnSwipe = false;
	this.target.find('.diaporama').css('height', height + unity);

	if(displayNavigation == false){
		this.target.find('.diaporama_navigation').css('display', 'none');
	}
	if(this._count == 1){
		this.target.find('.diaporama_navigation').css('display', 'none');
	}
}
diaporama.prototype.init = function(){
	this.target.find('li').first().addClass('active');
	this.target.find('.content_screens').css('transform', 'translateZ(0)');
	this.target.find('.slide').css('transform', 'translateZ(0)');
	this.target.find('.slide div').css('transform', 'translateZ(0)');
	this.target.find('.slide p').css('transform', 'translateZ(0)');
	this.target.find('.slide span').css('transform', 'translateZ(0)');
	this.target.find('.slide').css('width', this.target.find('.content_screens').width()+"px");
	this.target.find('.content_screens').css('width', (this._count * 100) + '%');
	var self = this;
	/* add events */
	var startX = 0;
	var endX = 0;
	var startY = 0;
	var endY = 0;
	var currentX = this._current * $(document).width();
	if(this._count > 1){
		if(window.ontouchstart !== undefined) {
			this.target.find('li').on('tap', function(e){
				//if(self._action)
				self.slide($(this).attr('data-slide'));
			});
			Hammer(document.getElementById(self._idName)).on("touchstart", function (event) {
				if (!self._action)
					return false;
				if (event.target.nodeName == "INPUT") {
					return false;
				}
				event.preventDefault();
				currentX = -(self._current * $(document).width());
				startX = event.touches[0].pageX;
				startY = event.touches[0].pageY;
				if (startX < 50) {
					return false;
				}
				//console.log('touch start');
				self._isOnSwipe = true;
				if (self.delayMotion != null) {
					self.delayMotion.pause();
				}
			});
			Hammer(document.getElementById(self._idName)).on("touchmove", function (event) {
				if (!self._action)
					return false;
				if (!self._isOnSwipe)
					return false;
				endX = event.touches[0].pageX;
				endY = event.touches[0].pageY;
				if (Math.abs(startX - endX) < Math.abs(startY - endY)) {
					return false;
				}
				/*if(Math.abs(startY-endY) > 25){
				 self.slide(self._current);
				 return false;
				 }*/
				self.target.find('.content_screens').css('left', (currentX - (startX - endX) / 2) + 'px');
				event.preventDefault();
			});
			Hammer(document.getElementById(self._idName)).on("touchend", function (event) {
				if (!self._action)
					return false;
				if (event.target.nodeName == "INPUT") {
					return false;
				}
				if (!self._isOnSwipe)
					return false;

				self._isOnSwipe = false;
				if (Math.abs(startX - endX) < Math.abs(startY - endY)) {
					self.slide(self._current);
					return false;
				}
				/*if(Math.abs(startY-endY) > 25){
				 self.slide(self._current);
				 return false;
				 }*/
				if (Math.abs(startX - endX) > $(document).width() / 4) {
					if (startX - endX < 0) {
						self.slide(self._current - 1);
					} else {
						self.slide(self._current + 1);
					}
				} else {
					self.slide(self._current);
				}
			});
		}else{
			this.target.find('li').on('click', function(e){
				//console.log($(this).attr('data-slide'));
				//if(self._action)
					self.slide($(this).attr('data-slide'));
			});
			Hammer(document.getElementById(self._idName)).on("mousedown", function (event) {
				if (!self._action)
					return false;
				if (event.target.nodeName == "INPUT") {
					return false;
				}
				event.preventDefault();
				currentX = -(self._current * $(document).width());
				startX = event.pageX;
				startY = event.pageY;
				self._isOnSwipe = true;
				if (self.delayMotion != null) {
					self.delayMotion.pause();
				}
			});
			Hammer(document.getElementById(self._idName)).on("mousemove", function (event) {
				if (!self._action)
					return false;
				if (!self._isOnSwipe)
					return false;
				endX = event.pageX;
				endY = event.pageY;
				if (Math.abs(startX - endX) < Math.abs(startY - endY)) {
					return false;
				}
				self.target.find('.content_screens').css('left', (currentX - (startX - endX) / 2) + 'px');
				event.preventDefault();
			});
			Hammer(document.getElementById(self._idName)).on("mouseup", function (event) {
				if (!self._action)
					return false;
				if (event.target.nodeName == "INPUT") {
					return false;
				}
				if (!self._isOnSwipe)
					return false;

				self._isOnSwipe = false;
				if (Math.abs(startX - endX) < Math.abs(startY - endY)) {
					self.slide(self._current);
					return false;
				}
				if (Math.abs(startX - endX) > 200) {
					if (startX - endX < 0) {
						self.slide(self._current - 1);
					} else {
						self.slide(self._current + 1);
					}
				} else {
					self.slide(self._current);
				}
			});
		}
	}

	if(this._autoSwipe == true){
		self.target.find('.diaporama').append('<div class="progress_bar orange" id="progress_bar"></div>');
		self.startRotation();
	}
}
diaporama.prototype.startRotation = function(){
	var self = this;
	self.waitCompt = {value:0};
	self.delayMotion = TweenLite.to(self.waitCompt, self._delay, {value:100,
		onUpdate : function(){
			self.target.find('.progress_bar').css('width', self.waitCompt.value+'%');
		},
		onComplete:function(){
			var showId = self._current+1;
			if(showId > (self._count - 1)){
				showId=0;
			}
			self.slide(showId);
			//self.startRotation();
		}, ease:Power4.easeOutIn});
}
diaporama.prototype.slide = function(id){
	var self = this;
	if(self._isOnSwipe)
		return false;
	/*var time = .6;
	 var dif = this.target.find('.content_screens').position().left - (-(id * 100));
	 time = (Math.abs(dif)/100).toFixed(2);*/
	if(self.delayMotion != null){
		self.delayMotion.pause();
	}
	if(id < 0){
		id=0;
	}
	self._endCallBack(id);
	if(id > (this._count - 1)){
		id=(this._count - 1);
	}
	this._action = false;
	$('li').each(function(){$(this).removeClass('active');});
	this.target.find('#diapo_'+this._current).removeClass('active');
	this.target.find('#diapo_'+id).addClass('showed');
	this.target.find('#diapo_'+id).addClass('active');
	this.target.find('#slide_'+id+' img').attr('src', this.target.find('#slide_'+id+' img').attr('data-image'));
	TweenLite.to($('.diaporama_navigation'), .4, {css:{'left': (140-(id*35))+'px'}});
	TweenLite.to(this.target.find('.content_screens'), .8, {css:{'left': (-(id * 100)) + "%"}, ease:Power4.easeInOut, onComplete:function(){
		setTimeout(function() {
			//self.target.find('.content_screens').css('left', (-(id * 100)) + "%");
			if (self._current != id){
				self.target.find('#slide_' + self._current + ' img').attr('src', '');
			}
			self._action = true;
			if(self.delayMotion != null){
				self.delayMotion.restart();
			}
			self._current = id;
		}, 300);
	}});
}
diaporama.prototype.destroy = function(id){
	var self = this;
	if(self.delayMotion){
		self.delayMotion.pause();
		TweenLite.killTweensOf(self.delayMotion);
		this.delayMotion = null;
	}
}
diaporama.prototype.bind = function (scope) {
	var fn = this;
	return function () {
		return fn.apply(scope);
	};
}
