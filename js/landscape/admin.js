var admin = {
	types_list:null,
	sources_list:null,
	urls_list:null,
	type_id:null,
	source_id:null,
	url_id:null,
	init : function(){
		this.setListeners();
		$('#column_source').css('display', 'none');
		$('#column_url').css('display', 'none');
		this.refresh_types();
	},
	setListeners : function(){
		var self = this;
		$('#column_type #add_button').bind('click', function(){
			self.add_type_form();
		});
		$('#column_type #add .submit_button').bind('click', function(){
			var params = {
				"label" : $('#column_type #add #label').val(),
				"description" : $('#column_type #add #description').val(),
				"icon" : $('#column_type #add #icon').val()
			}
			utilities.load_service(
				"feed/add_type",
				params,
				function(result){
					self.refresh_types();
				}
			);
		});
		$('#column_type #edit #edit_button').bind('click', function(){
			var params = {
				"label" : $('#column_type #add #label').val(),
				"description" : $('#column_type #add #description').val(),
				"icon" : $('#column_type #add #icon').val()
			}
			utilities.load_service(
				"feed/update_type",
				params,
				function(result){
					self.refresh_types();
				}
			);
		});
		$('#column_type #edit #remove_button').bind('click', function(){
			var params = {
				"id" : self.types_list[self.type_id].id
			}
			utilities.load_service(
				"feed/remove_type",
				params,
				function(result){
					self.refresh_types();
				}
			);
		});
		
		$('#column_source #add_button').bind('click', function(){
			self.add_source_form();
		});
		$('#column_source #add .submit_button').bind('click', function(){
			var params = {
				"type_id" : self.types_list[self.type_id].id,
				"label" : $('#column_source #add #label').val(),
				"description" : $('#column_source #add #description').val(),
				"icon" : $('#column_source #add #icon').val()
			}
			utilities.load_service(
				"feed/add_source",
				params,
				function(result){
					self.refresh_types();
				}
			);
		});
		$('#column_source #edit #edit_button').bind('click', function(){
			var params = {
				"type_id" : self.types_list[self.type_id].id,
				"label" : $('#column_source #add #label').val(),
				"description" : $('#column_source #add #description').val(),
				"icon" : $('#column_source #add #icon').val()
			}
			utilities.load_service(
				"feed/update_source",
				params,
				function(result){
					self.refresh_types();
				}
			);
		});
		$('#column_source #edit #remove_button').bind('click', function(){
			var params = {
				"id" : self.sources_list[self.source_id].id
			}
			utilities.load_service(
				"feed/remove_source",
				params,
				function(result){
					self.refresh_types();
				}
			);
		});
		
		
		
		$('#column_url #add_button').bind('click', function(){
			self.add_url_form();
		});
		$('#column_url #add .submit_button').bind('click', function(){
			var params = {
				"type_id" : self.types_list[self.type_id].id,
				"source_id" : self.sources_list[self.source_id].id,
				"url" : $('#column_url #add #url').val()
			}
			utilities.load_service(
				"feed/add_url",
				params,
				function(result){
					self.refresh_types();
				}
			);
		});
		$('#column_url #edit #edit_button').bind('click', function(){
			var params = {
				"type_id" : self.types_list[self.type_id].id,
				"source_id" : self.sources_list[self.source_id].id,
				"url" : $('#column_url #add #url').val()
			}
			utilities.load_service(
				"feed/update_url",
				params,
				function(result){
					self.refresh_types();
				}
			);
		});
		$('#column_url #edit #remove_button').bind('click', function(){
			var params = {
				"id" : self.urls_list[self.url_id].id
			}
			utilities.load_service(
				"feed/remove_url",
				params,
				function(result){
					self.refresh_types();
				}
			);
		});
	},
	add_type_form : function(){
		$('#column_type #add').css('display', 'block');
		$('#column_type #edit').css('display', 'none');
	},
	add_source_form : function(){
		$('#column_source #add').css('display', 'block');
		$('#column_source #edit').css('display', 'none');
	},
	add_url_form : function(){
		$('#column_url #add').css('display', 'block');
		$('#column_url #edit').css('display', 'none');
	},
	edit_type_form : function(){
		$('#column_type #edit').css('display', 'block');
		$('#column_type #add').css('display', 'none');
		$('#column_type #edit #label').val(this.types_list[this.type_id].label);
		$('#column_type #edit #description').val(this.types_list[this.type_id].description);
	},
	edit_source_form : function(){
		$('#column_source #edit').css('display', 'block');
		$('#column_source #add').css('display', 'none');
		$('#column_source #edit #label').val(this.types_list[this.source_id].label);
		$('#column_source #edit #description').val(this.types_list[this.source_id].description);
	},
	edit_url_form : function(){
		$('#column_url #edit').css('display', 'block');
		$('#column_url #add').css('display', 'none');
	},
	refresh_types : function(){
		var self = this;
		//load get_types services and refresh types_list
		utilities.load_service(
			"feed/get_types_list",
			{
			},
			function(result){
				self.types_list = JSON.parse(result);
				$('#column_type ul').html('');
				for(var i=0; i<self.types_list.length; i++){
					$('#column_type ul').append('<li id="type_'+i+'" data-id="'+self.types_list[i]['id']+'">'+self.types_list[i]['label']+'<div class="right_arrow"></div></li>');
					$('#type_'+i).bind('click', function(){
						$('#column_type li').removeClass('selected');
						self.type_id = $(this).attr('id').replace('type_', '');
						$(this).addClass('selected');
						self.edit_type_form();
						
						$('#column_source').css('display', 'table');
						self.refresh_sources();
					});
				}
			}
		);
	},
	refresh_sources : function(){
		var self = this;
		//load get_sources services and refresh types_sources
		utilities.load_service(
			"feed/get_sources_list",
			{
				"type_id":self.type_id
			},
			function(result){
				self.types_list = JSON.parse(result);
				$('#column_source ul').html('');
				for(var i=0; i<self.types_list.length; i++){
					$('#column_source ul').append('<li id="type_'+i+'" data-id="'+self.types_list[i]['id']+'">'+self.types_list[i]['label']+'<div class="right_arrow"></div></li>');
					$('#source_'+i).bind('click', function(){
						$('#column_source li').removeClass('selected');
						self.source_id = $(this).attr('id').replace('source_', '');
						$(this).addClass('selected');
						
						self.edit_source_form();
						$('#column_url').css('display', 'table');
						self.refresh_urls();
					});
				}
			}
		);
	},
	refresh_urls : function(){
		var self = this;
		//load get_urls services and refresh types_urls
		utilities.load_service(
			"feed/get_urls_list",
			{
				"type_id":self.type_id,
				"source_id":self.source_id
			},
			function(result){
				console.log(result);
				self.types_list = JSON.parse(result);
			}
		);
	}
}
admin.init();