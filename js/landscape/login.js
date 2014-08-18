var login = {
    router : null,
    loginParams : {avatar:"", pseudo:"", email:"", password:"", provider:"", page_name:""},
    init : function(){
        var self = this;
        $('#login').css('display', 'block');
        $('#register').css('display', 'none');
        $('#lost').css('display', 'none');
        this.initRoot();
        $(document).bind('click', function(event){
            if(typeof $(event.target).attr('data-page') != "undefined")
                self.router.navigate($(event.target).attr('data-page'), {trigger: true, replace: false});
        });
        $('#login_action').bind('click', function(){
            self.loginParams.email = $('#login #email').val();
            self.loginParams.password = $('#login #pwd').val();
            params = {
                email : $('#login #email').val(),
                password : $('#login #pwd').val()
            };
            utilities.load_service("public_api/auth", params, function(response){
                console.log(response);
                utilities.saveLocalSession('lv_user', JSON.stringify(response));
                window.location.replace(utilities.defaultUri);
            });
            //post service
        });
        $('#register_action').bind('click', function(){
            self.loginParams.page_name = $('#register #lv_id').val();
            self.loginParams.email = $('#register #email').val();
            self.loginParams.password = $('#register #pwd').val();
            params = {
                avatar : self.loginParams.avatar,
                page_name : $('#register #lv_id').val(),
                email : $('#register #email').val(),
                password : $('#register #pwd').val()
            };
            utilities.load_service(
                "public_api/create_account",
                params,
                function(response){
                    alert(response);
                    console.log(response)
                }
            );
            //post service
        });
        var myDropzoneOptions = {
            url: "./feed/file_upload",
            init: function() {
                this.on("success", function(file, response) {
                    console.log(file);
                    console.log(response);
                    self.loginParams.avatar = JSON.parse(response).id;
                });
                this.on("progress", function(e) {
                    console.log(e);
                });
                this.on("addedfile", function(file) {
                });
                this.on("removedfile", function(file) {
                });
            }
        };
        var myDropzone = new Dropzone("div#drop_zone_avatar", myDropzoneOptions);
    },
    initRoot : function(){
        var self = this;
        var ApplicationRouter = Backbone.Router.extend({
            routes: {
                "": "check_state",
                "*page":"check_state"
            },
            check_state : function(params){
                console.log(params);
                self.showPage(params);
            }
        });
        //Backbone.emulateHTTP = true;
        this.router = new ApplicationRouter();
        Backbone.history.start({pushState:true});
        //this.router.navigate('page/'+startPage, {trigger: true, replace: false});
    },
    showPage : function(params){
        this.removeOldView();
        switch(params){
            case "login":
                $('#login').css('display', 'block');
                $('#login').css('left', '100%');
                TweenMax.to($('#login'), .8, {
                    css:{"left":"0%"},
                    onComplete:function(){
                        $('#register').css('display', 'none');
                        $('#lost').css('display', 'none');
                    }, ease:Power4.easeOut
                });
                break;
            case "register":
                $('#register').css('display', 'block');
                $('#register').css('left', '100%');
                TweenMax.to($('#register'), .8, {
                    css:{"left":"0%"},
                    onComplete:function(){
                        $('#login').css('display', 'none');
                        $('#lost').css('display', 'none');
                    }, ease:Power4.easeOut
                });
                break;
            case "lost_password":
                $('#lost').css('display', 'block');
                $('#lost').css('left', '100%');
                TweenMax.to($('#lost'), .8, {
                    css:{"left":"0%"},
                    onComplete:function(){
                        $('#login').css('display', 'none');
                        $('#register').css('display', 'none');
                    }, ease:Power4.easeOut
                });
                break;
            default :
                $('#login').css('display', 'block');
                $('#login').css('left', '100%');
                TweenMax.to($('#login'), .8, {
                    css:{"left":"0%"},
                    onComplete:function(){
                        $('#register').css('display', 'none');
                        $('#lost').css('display', 'none');
                    }, ease:Power4.easeOut
                });
                break;
        }
    },
    removeOldView : function(){
        jQuery.each( $('.formular'), function( i ) {
            console.log($(this).offset().left);
            if($(this).offset().left == 30)
                TweenMax.to($(this), .5, {css:{"left":"-100%"}, ease:Power4.easeIn});
        });
    }
}
login.init();