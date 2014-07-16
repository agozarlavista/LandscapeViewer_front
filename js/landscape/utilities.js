var utilities = {
	defaultUri : "http://landscape-viewer.com/",
	init : function(){
		console.log('init utilities');
	},
	load_service : function(uri, params, callback){
		$.post( this.defaultUri+uri,  params, callback);
	}
}
utilities.init();