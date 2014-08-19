var public_api = {
    _articles : null,
    _ratio : 250,
    _cols : 0,
    _startPosition : null,
    _panoramics : [],
    _longPress : [],
    _panoramic_longPress : [],
    _startTime : 0,
    _parnoamics_articles : [],
    _dropLocked : false,
    _dropped_articles : null,
	init : function(){
        this.activeDropZone();
	},
    get_auth : function(params){
        utilities.load_service(
            "lv_api/get_auth",
            params,
            function(result){
                var response = JSON.parse(result);
                self._articles = response.data;
                self.display_pack();
            }
        );
    },
    destroy_auth : function(){

    },
    create_auth : function(){

    },
    set_user_profile : function(){

    },
    get_articles : function(){
        var self = this;
        var params = {
            limit:100
        }
        utilities.load_service(
            "feed/get_article",
            params,
            function(result){
                console.log(result);
                var response = result;
                self._articles = response;
                self.display_pack();
            }
        );
    },
    display_pack : function(){
        var self = this;
        //$('#global_section').html('');
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
                    TweenMax.to($(this),.2, {scaleX:.5, scaleY:.5});
                    $(this).css('z-index', '999');
                    self.openDropZone();
                },
                stop: function( event, ui ) {
                    console.log(ui);
                    console.log("cible = "+ ui.helper[0].nextElementSibling.id);
                    if(!self._dropLocked)
                        self.closeDropZone();
                    TweenMax.to($('.selected_frame'), .1, {css:{'border':'5px solid #50AACE'}});
                    TweenMax.to($(this),.5, {scaleX:1, scaleY:1, delay:.2});
                    TweenMax.to($(this), .5, {css:{left:ui.originalPosition.left, top:ui.originalPosition.top}, onComplete:function(){

                    }});
                    $(this).css('z-index', '1');
                }
            });
            $( "#art_"+i ).droppable({
                drop: function(event, ui) {
                    self.createPanoramic(ui.helper[0].id, $(this).attr('id'));
                }
            });
            $('#art_'+i).on('mousedown', function(){
                self._startTime = new Date().getTime();
                if($(this).find('.selected_frame').css('display') == "block"){
                    TweenMax.to($('.selected_frame'), .2, {css:{'border':'25px solid #50AACE'}});
                }
            });
            $('#art_'+i).on('mouseup', function(){
                if($(this).find('.selected_frame').css('display') == "block"){
                    TweenMax.to($('.selected_frame'), .1, {css:{'border':'5px solid #50AACE'}});
                }
            });
            $('#art_'+i).on('click', function(e){
                if(new Date().getTime() - self._startTime < 100){
                    if($(e.target).attr('id') === undefined){
                        //alert(self._articles[$(this).attr('id').replace('art_', '')].title);
                        //alert('redirect to article page encode uri /article/article_name');
                        var string = self._articles[$(this).attr('id').replace('art_', '')].title;
                        var specialChars = new Array(
                            'à','á','â','ã','ä','ç','è','é','ê','ë','ì','í','î','ï','ñ','ò','ó','ô','õ','ö','ù','ú','û','ü','ý','ÿ',':',';','.',',',"'",'/','\\',' ','  ','!','?','(',')', '«', '»'
                        );
                        var replaceChars = new Array(
                            'a','a','a','a','a','c','e','e','e','e','i','i','i','i','n','o','o','o','o','o','u','u','u','u','y','y',' ',' ',' ',' ',' ',' ','  ','_','__',' ',' ',' ',' ', '', ''
                        );
                        for(var i=0; i<specialChars.length; i++){
                            string = string.split(specialChars[i]).join(replaceChars[i]);
                        }
                        var adress = escape(encodeURI(string.split(' ').join('_')));
                        //adress =  adress.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
                        window.location.href = utilities.defaultUri+"article/"+adress+'-article-'+self._articles[$(this).attr('id').replace('art_', '')].id;
                    }
                }
            });
            $('#art_'+i).on('mouseover', function(){
                $(this).find('.article_header_menu').css('display', 'block');
                TweenMax.to($(this).find('.article_header_menu'),.2, {css:{height:'60px'}});
            });
            $('#art_'+i).on('mouseleave', function(){
                TweenMax.to($(this).find('.article_header_menu'),.2, {css:{height:'0px'}, delay:.1, onComplete:function(){
                    $(this).find('.article_header_menu').css('display', 'none');
                }});
            });
            $('#art_'+i).dblclick(function() {
                //alert('open id');
            });
            this._longPress[i] = new long_press("art_"+i);
            //console.log($('section article').last().css('top'));
            //console.log(top+" "+left);
            _currentCol++;
            if(_currentCol >= this._cols)
                _currentCol = 0;
            if(i > this._cols)
                _currentCol = this.getHeight()[0].id;
        }
    },
    createPanoramic : function(article, target){
        var self = this;
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
                $(this.el).attr('id', 'panoramic_'+self._panoramics.length);
                $(this.el).css('top', _offset.top+'px');
                $(this.el).css('left', _offset.left+'px');
                return this;
            }
        });
        var _panoramic = new Panoramic({});
        _panoramicView = new PanoramicView({ model: _panoramic });

        $('#'+target).after(_panoramicView.render().el);

        $('#panoramic_' + self._panoramics.length + ' #create_panoramic').bind('click', function(){
            //console.log($(this).parent().parent().attr('id').replace('panoramic_',''));
            var panoramic_id = $(this).parent().parent().attr('id').replace('panoramic_','');
            console.log(self._parnoamics_articles[parseInt(panoramic_id)]);
            var panoramic_label = $(this).parent().parent().find('#label').val();
            if(panoramic_label == ''){
                lv_ui.alert_component(
                    {
                        title:"error",
                        message:"You must edit panoramic label before...",
                        buttons:[
                            {color:"red", label:"ok"}
                        ]
                    },
                    function(e){
                        console.log(e);
                    }
                );
                return false;
            }
            var articles_list = [];
            for(var i=0; i<self._parnoamics_articles[parseInt(panoramic_id)].length; i++){
                articles_list.push(self._articles[self._parnoamics_articles[parseInt(panoramic_id)][i]].id);
            }
            var pano_object = $(this).parent().parent();
            console.log('articles list = ', articles_list);
            self.savePanoramic(pano_object, articles_list, panoramic_label);
        });

        $( "#panoramic_"+self._panoramics.length ).droppable({
            drop: function(event, ui) {
                //console.log( event );
                //console.log( ui );
                var artId = ui.helper[0].id.replace('art_', '');
                    artId = artId.replace('article_', '');
                $('#'+ui.helper[0].id).remove();
                self.appendToPanoramic($(this).attr('id').replace('panoramic_',''), artId);
                self.replaceAll();
            }
        });
        var artId = target.replace('art_', '');
            artId = artId.replace('article_', '');
        self.appendToPanoramic(self._panoramics.length, artId);
        var artId = article.replace('art_','');
            artId = artId.replace('article_','');

        //this._panoramic_longPress[self._panoramics.length] = new long_press("panoramic_"+self._panoramics.length);
        self.appendToPanoramic(self._panoramics.length, artId);
        //$('#panoramic_0 .container').append("<article>"+$('#'+target).html()+"</article>");
        //$('#panoramic_0 .container').append("<article>"+$('#'+article).html()+"</article>");

        self._panoramics.push($('#panoramic_'+self._panoramics.length));

        $('#'+article).remove();
        $('#'+target).remove();
        this.replaceAll();
    },
    appendToPanoramic : function(panoramicId, objectId){
        $('#panoramic_'+panoramicId+' .container').append('<div class="thumb" id="article_'+objectId+'" style="background-image:url('+this._articles[objectId].url+');"></div>');
        $( "#panoramic_"+panoramicId+" #article_"+objectId ).draggable({
            start: function( event, ui ) {
                $(this).css('z-index', '999');
                //self.openDropZone();
            },
            stop: function( event, ui ) {
                //self.closeDropZone();
                TweenMax.to($(this), .5, {css:{left:ui.originalPosition.left, top:ui.originalPosition.top}, onComplete:function(){

                }});
                $(this).css('z-index', '1');
            }
        });
        if(!this._parnoamics_articles[panoramicId])
            this._parnoamics_articles[panoramicId] = [];
        this._parnoamics_articles[panoramicId].push(objectId);
    },
    replaceAll : function(){
        for(var i=0; i<this._cols; i++){
            var h=0;
            jQuery.each( $('.col_'+i), function( i ) {
                TweenMax.to($(this),.5, {css:{'top': h+"px"}});
                h+=$(this).height();
                h+=14;
                //h+=14;
            });
        }
    },
    savePanoramic : function(panoramic_object, articles_list, panoramic_label){
        var self = this;
        params = {
            articles : articles_list,
            label : panoramic_label
        };
        utilities.load_service(
            "panoramic_manager/panoramic_create",
            params,
            function(response){
                lv_ui.destroyElement(
                    panoramic_object,
                    function(e){
                        self.replaceAll();
                    }
                );
            }
        );
    },
    addArticleLike : function(article_id){
        utilities.load_service(
            "public_api/add_article_like",
            {
                article_id : article_id
            },
            function(response){
                if(response.message && response.title){

                }
            }
        );
    },
    addArticleView : function(article_id){
        utilities.load_service(
            "public_api/add_article_view",
            {
                article_id : article_id
            },
            function(response){

            }
        );
    },
    openDropZone : function(){
        TweenMax.to($('.panoramic_drop_zone'), .5, {
            css:{height:'280px'}, ease:Power4.easeOut
        });
    },
    closeDropZone : function(){
        TweenMax.to($('.panoramic_drop_zone'), .5, {
            css:{height:'0px'}, ease:Power4.easeIn
        });
    },
    activeDropZone : function(){
        var self = this;
        $('.panoramic_drop_zone').droppable({
            drop: function(event, ui) {
                if(self._dropped_articles == null){
                    self._dropped_articles = [];
                    $('.panoramic_drop_zone .zone').html('');
                }

                self._dropLocked = true;
                console.log($('#'+ui.helper[0].id).hasClass( "selected_article" ));
                if($('#'+ui.helper[0].id).hasClass( "selected_article" )){
                    //si l'article est selectionné, on ajoute tout les articles selectionnés à la pile
                    $('.selected_article').each(function( index ) {
                        $(this).remove();
                        console.log( index +" "+$(this).attr('id') );
                        self._dropped_articles.push(self._articles[$(this).attr('id').replace('art_','')].id);
                        $('.panoramic_drop_zone .zone').append("<div class='small_preview' id='preview_"+self._dropped_articles.length+"' style='background-image:url("+self._articles[$(this).attr('id').replace('art_','')].url+");'></div>");
                        $('#preview_'+self._dropped_articles.length).on('click', function(){
                            lv_ui.alert_component(
                                {
                                    title:"Panoramic",
                                    message:"Do you want to remove this article from this selection.",
                                    buttons:[
                                        {color:"red", label:"yes"},
                                        {color:"red", label:"no"}
                                    ]
                                },
                                function(e){
                                    if(e==0){
                                        var index = parseInt($(this).attr('id').replace('preview_',''));
                                        self._dropped_articles.splice(index, 1);
                                        $(this).remove();
                                        console.log(self._dropped_articles);
                                    }
                                }
                            );
                        });
                    });
                    //self.createPanoramic(ui.helper[0].id, $(this).attr('id'));
                }else{
                    // transform: scale(.25); -webkit-transform:scale(.25); -ms-transform:scale(.25)
                    //$('.panoramic_drop_zone .zone').append('<article style="left:0; top:0;">'+$('#'+ui.helper[0].id).html()+"</article>");
                    // si l'article n'est pas selectionné, on l'ajoute à la pile
                    $('#'+ui.helper[0].id).remove();
                    self._dropped_articles.push(self._articles[ui.helper[0].id.replace('art_','')].id);
                    $('.panoramic_drop_zone .zone').append("<div class='small_preview' id='preview_"+self._dropped_articles.length+"' style='background-image:url("+self._articles[ui.helper[0].id.replace('art_','')].url+");'></div>");
                    console.log(ui.helper[0].id);
                    $('#preview_'+self._dropped_articles.length).on('click', function(){
                        var obj_to_edit = $(this);
                        lv_ui.alert_component(
                            {
                                title:"Panoramic",
                                message:"Do you want to remove this article from this selection.",
                                buttons:[
                                    {color:"red", label:"yes"},
                                    {color:"red", label:"no"}
                                ]
                            },
                            function(e){
                                if(e==0){
                                    var index = parseInt(obj_to_edit.attr('id').replace('preview_',''));
                                    self._dropped_articles.splice(index, 1);
                                    obj_to_edit.remove();
                                    console.log(self._dropped_articles);
                                }
                            }
                        );
                    });
                }
                self.replaceAll();
            }
        });
        $('.panoramic_drop_zone #drop_zone_save_button').on('click', function(){
            if($('#drop_zone_label').val() == ''){
                lv_ui.alert_component(
                    {
                        title:"error",
                        message:"You must edit panoramic label before...",
                        buttons:[
                            {color:"red", label:"ok"}
                        ]
                    },
                    function(e){
                        console.log(e);
                    }
                );
                return false;
            }
            params = {
                articles : self._dropped_articles,
                label : $('#drop_zone_label').val()
            };
            utilities.load_service(
                "panoramic_manager/panoramic_create",
                params,
                function(response){
                    self._dropped_articles = null;
                    self.closeDropZone();
                    $('.panoramic_drop_zone .zone').html('p');
                }
            );
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
            h+=$(this).height();
            h+=14;
        });
        return h;
        //alert($('.col_'+id).length);
    },
    getHeight : function(){
        var colsHeight = [];
        for(var i=0; i<this._cols; i++){
            colsHeight.push({"id":i, "height":this.getCurrentColHeight(i)});
        }
        var prop = "height";
        var asc = true;
        colsHeight = colsHeight.sort(function(a, b) {
            if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        });
        return colsHeight.sort();
    },
    makeShortDesc : function(str){
        if(str.length < 80){
            return str;
        }else{
            return str.substr(0,75) + '(...)';
        }
    },
    getUserPanoramics : function(){
        var self = this;
        utilities.load_service(
            "panoramic_manager/get",
            {},
            function(response){
                console.log("user panoramics  = ", response);
                for(var i= 0; i<response.length; i++){
                    //get_template('user_panoramic_list');
                    lv_ui.get_template({name:"panoramic_list_template", tagName : "li", attr:"", values:response[i], target:$('#user_panoramic_list')});
                }
                self.replaceAll();
                //self._dropped_articles = null;
                //self.closeDropZone();
                //$('.panoramic_drop_zone .zone').html('p');
            }
        );
    }
}
public_api.init();
