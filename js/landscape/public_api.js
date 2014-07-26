var public_api = {
    _articles : null,
    _ratio : 250,
    _cols : 0,
    _startPosition : null,
	init : function(){
        this.get_articles();
	},
    get_articles : function(){
        var self = this;
        var params = {
        }
        utilities.load_service(
            "feed/get_article",
            params,
            function(result){
                var response = JSON.parse(result);
                self._articles = response.data;
                self.display_pack();
            }
        );
    },
    display_pack : function(){
        var self = this;
        $('#global_section').html('');
        this._cols = Math.round($(document).width()/264)-1;
        var _currentCol = 0;
        $('#global_section').width(264*this._cols);
        //JSON.stringify(this._articles)
        for(var i=0; i<this._articles.length; i++){
            this._articles[i].width = this._ratio;
            this._articles[i].height = (this._articles[i].height*100)/this._ratio;
            this._articles[i].url = this.getImageUri(this._articles[i].url);
            this._articles[i].short_desc = this.makeShortDesc(JSON.parse(this._articles[i].info_object).content);
            this._articles[i].url.offsetLeft = _currentCol*264;
            this._articles[i].url.offsetTop = this.getCurrentColHeight(_currentCol);
            var left = _currentCol*264;
            var top = this.getCurrentColHeight(_currentCol);

            if(this._articles[i].dominante == "rgb(0,0,0)"){
                this._articles[i].height = 0;
            }
            var Article = Backbone.Model.extend({
                defaults:this.profile_data
            });
            var ArticleView = Backbone.View.extend({
                tagName:"article",
                className:"col_"+_currentCol,
                template:$("#article_template").html(),
                render:function () {
                    var tmpl = _.template(this.template); //tmpl is a function that takes a JSON object and returns html
                    this.$el.html(tmpl(this.model.toJSON())); //this.el is what we defined in tagName. use $el to get access to jQuery html() function
                    return this;
                }
            });
            var _article = new Article(this._articles[i]);
            _articleView = new ArticleView({ model: _article });
            $("#global_section").append(_articleView.render().el);
            $('#global_section article').last().attr('id', 'art_'+i);
            $('#global_section article').last().css('left', left+'px');
            $('#global_section article').last().css('top', top+'px');
            $( "#art_"+i ).draggable({
                start: function( event, ui ) {
                    self._defaultPosition = $(this).offset();
                    $(this).css('z-index', '9');
                },
                stop: function( event, ui ) {
                    //console.log(event);
                    TweenMax.to($(this), .5, {css:{left:ui.originalPosition.left, top:ui.originalPosition.top}, onComplete:function(){

                    }});
                    $(this).css('z-index', '1');
                }
            });
            $( "#art_"+i ).droppable({
                drop: function(event, ui) {
                    console.log($(this).attr('id'));
                    console.log( ui.helper[0].id);
                    //console.log( ui.helper[0].nextElementSibling.id);
                    //console.log( event );
                    //console.log( ui );
                    self.createPanoramic(ui.helper[0].id, $(this).attr('id'));
                }
            });
            //console.log($('section article').last().css('top'));
            //console.log(top+" "+left);
            _currentCol++;
            if(_currentCol >= this._cols)
                _currentCol = 0;
        }
    },
    createPanoramic : function(article, target){
        var _currentCol = parseInt($('#'+target).attr('class').split(' ')[0].replace('col_', ''));
        var _offset = $('#'+target).position();
        //alert(_currentCol);
        var Panoramic = Backbone.Model.extend({
            defaults:{id:"panoramic_0"},
            idAttribute:"id"
        });
        var PanoramicView = Backbone.View.extend({
            tagName:"div",
            className:"panoramic col_"+_currentCol,
            template:$("#panoramic_template").html(),
            render:function () {
                var tmpl = _.template(this.template); //tmpl is a function that takes a JSON object and returns html
                this.$el.html(tmpl(this.model.toJSON())); //this.el is what we defined in tagName. use $el to get access to jQuery html() function
                $(this.el).attr('id', 'panoramic_0');
                $(this.el).css('top', _offset.top+'px');
                $(this.el).css('left', _offset.left+'px');
                return this;
            }
        });
        var _panoramic = new Panoramic({});
        _panoramicView = new PanoramicView({ model: _panoramic });

        $('#'+target).after(_panoramicView.render().el);

        $('#panoramic_0 .container').append("<article>"+$('#'+target).html()+"</article>");
        $('#panoramic_0 .container').append("<article>"+$('#'+article).html()+"</article>");


        $('#'+article).remove();
        $('#'+target).remove();
        this.replaceAll();
    },
    replaceAll : function(){
        jQuery.each( $('#global_section').children(), function( i ) {
            console.log(i);
        });
    },
    getImageUri : function(url){
        if(url.indexOf("http") != -1)
            return url;
        return "http://localhost/~simondelamarre/LV/www/"+url.replace('./','');
    },
    getCurrentColHeight : function(id){
        var h=0;
        jQuery.each( $('.col_'+id), function( i ) {
            //console.log($(this));
            h+=$(this).height();
            h+=14;
        });
        return h;
        //alert($('.col_'+id).length);
    },
    makeShortDesc : function(str){
        if(str.length < 80){
            return str;
        }else{
            return str.substr(0,75) + '(...)';
        }
    }
}
