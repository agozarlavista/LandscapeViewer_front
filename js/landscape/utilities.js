var utilities = {
	defaultUri : "http://landscape-viewer.local/",
    auth_token : null,
    position : null,
	init : function(params){
        //this.defaultUri = params['baseURL'];
	},
	load_service : function(uri, params, callback){
        var self = this;
        params = self.addParams(params);
        console.log(params);
        $.ajax({
            type: "POST",
            url: this.defaultUri+uri,
            dataType: 'json',
            data: params,
            success: function (response) {
                console.log(JSON.stringify(response.data));
                callback(response.data);
                if(response.data.message){
                    lv_ui.alert_component(
                        {
                            title:response.data.title,
                            message:response.data.message,
                            buttons:[
                                {color:"red", label:"ok"}
                            ]
                        },
                        function(e){
                            console.log(e);
                        }
                    );
                }
                if(response.access){
                    self.setTokenAccess(JSON.stringify(response.access));
                }
            },
            error: function(e) {
                console.log("error : ", e);
                if(JSON.parse(e.responseText).message){
                    lv_ui.alert_component(
                        {
                            title:JSON.parse(e.responseText).title,
                            message:JSON.parse(e.responseText).message,
                            buttons:[
                                {color:"red", label:"ok"}
                            ]
                        },
                        function(e){
                            console.log(e);
                        }
                    );
                    //alert(JSON.parse(e.responseText).message.message);
                }
                // callback(JSON.parse(e.responseText));
                // alert('fail '+ JSON.parse(e.responseText));
            },
            always:function(e){
                console.log("always = ", e);
                if(e.access){
                    self.setTokenAccess(e.access);
                }
            }
        });
        //$.post( this.defaultUri+uri, params, callback );
	},
    addParams : function(params){
        if(this.getLocalSession("lv_access") != '' && this.getLocalSession("lv_access") != null && this.getLocalSession("lv_access") != "undefined"){
            params.auth_token = JSON.parse(this.getLocalSession("lv_access")).AUTH_TOKEN;
        }
        if(utilities.getLocalSession('lv_user') != '' && utilities.getLocalSession('lv_user') != null && this.getLocalSession("lv_user") != "undefined"){
            params.user_id = JSON.parse(this.getLocalSession("lv_user"))[0].id;
        }
        if(this.location != null){
            params.position = this.location;
        }
        return params;
    },
    setTokenAccess : function(access){
        this.auth_token = access.AUTH_TOKEN;
        this.saveLocalSession("lv_access", access);
    },
    saveLocalSession : function(name, data){
        window.localStorage.setItem(name, data);
    },
    getLocalSession : function(name){
        return window.localStorage.getItem(name);
    },
    getLocation: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            //x.innerHTML = "Geolocation is not supported by this browser.";
        }
    },
    setPosition : function(position){
        //position.coords.latitude;
        this.position = position.coords;
        this.saveLocalSession('position', position.coords);
    }
}