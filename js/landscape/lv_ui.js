var lv_ui = {
    _callBack : null,
    init : function(){
        var self = this;
        $('.lv_component').bind('click', function(){
            self.destroy_component();
        });
    },
    alert_component : function(params, callBack){
        this._callBack = callBack;
        this.get_template({name:"alert_template", attr:"alert", values:params, target:$('.lv_component')});
        $('.lv_component').css('display','block');
        TweenMax.to($('.lv_component'), .5, {
            css:{'background-color':'rgba(0,0,0,.5)'},
            onComplete:function(){

            }
        });
        TweenMax.to($('.lv_component div').first(),.3, {css:{top:0}, delay:.2});
    },
    destroy_component : function(){
        TweenMax.to($('.lv_component div').first(),.2, {
            css:{top:"150%"},
            onComplete:function(){
                TweenMax.to($('.lv_component'), .5, {
                    css:{'background-color':'rgba(0,0,0,0)'},
                    onComplete:function(){
                        $('.lv_component').html('');
                        $('.lv_component').css('display', 'none');
                    }
                });
            }
        });
    },
    get_template : function(params){
        //params : {name:"", attr:"", values:{}, target}
        var Template = Backbone.Model.extend({
            defaults:this.profile_data
        });
        var TemplateView = Backbone.View.extend({
            tagName:"div",
            className:params.attr,
            template:$("#"+params.name).html(),
            render:function () {
                var tmpl = _.template(this.template);
                this.$el.html(tmpl(this.model.toJSON()));
                return this;
            }
        });
        var _template = new Template(params.values);
        _templateView = new TemplateView({ model: _template });
        params.target.append(_templateView.render().el);
    },
    destroy : function(){

    }
}