var utilities = {
	defaultUri : "./",
	init : function(params){
        //this.defaultUri = params['baseURL'];
	},
	load_service : function(uri, params, callback){
		$.post( this.defaultUri+uri,  params, callback);
	}
}