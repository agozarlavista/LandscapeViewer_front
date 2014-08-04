var utilities = {
	defaultUri : "http://landscape-viewer.local/",
	init : function(params){
        //this.defaultUri = params['baseURL'];
	},
	load_service : function(uri, params, callback){
        $.ajax({
            type: "POST",
            url: this.defaultUri+uri,
            dataType: 'json',
            data: params,
            success: function (response) {
                console.log(response);
                callback(response.data);
            },
            error: function(e) {
                if(JSON.parse(e.responseText).message){
                    alert(JSON.parse(e.responseText).message.message);
                }
                // callback(JSON.parse(e.responseText));
                // alert('fail '+ JSON.parse(e.responseText));
            }
        });
        //$.post( this.defaultUri+uri, params, callback );
	}
}