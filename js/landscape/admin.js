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
        $('#column_type #add #icon').on('change', function(event){
            self.file_upload(event.target.files, function(e){
                var response = JSON.parse(e);
                if(response.code && response.code == 200)
                    $('#column_type #add #image_id').html(response.id);
            });
            self.readFile(this, $('#column_type #add .preview'));
        });
		$('#column_type #add .submit_button').bind('click', function(){
			var params = {
				"label" : $('#column_type #add #label').val(),
				"description" : $('#column_type #add #description').val(),
                "icon" : parseInt($('#column_type #add #image_id').html())
			}
			utilities.load_service(
				"feed/add_type",
				params,
				function(result){
					self.refresh_types();
				}
			);
		});
        $('#column_type #edit #icon').on('change', function(e){
            self.file_upload(event.target.files, function(e){
                var response = JSON.parse(e);
                if(response.code && response.code == 200)
                    $('#column_type #edit #image_id').html(response.id);
            });
            self.readFile(this, $('#column_type #edit .preview'));
        });
		$('#column_type #edit #edit_button').bind('click', function(){
            var params = {
                "id" : self.types_list[self.type_id].id,
                "label" : $('#column_type #edit #label').val(),
                "description" : $('#column_type #edit #description').val(),
                "icon" : parseInt($('#column_type #edit #image_id').html())
            }
			utilities.load_service(
				"feed/edit_type",
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
                    $('#column_source').css('display', 'none');
                    $('#column_url').css('display', 'none');
				}
			);
		});
		
		$('#column_source #add_button').bind('click', function(){
			self.add_source_form();
		});

        $('#column_source #add #icon').on('change', function(e){
            self.file_upload(event.target.files, function(e){
                var response = JSON.parse(e);
                if(response.code && response.code == 200)
                    $('#column_source #add #image_id').html(response.id);
            });
            self.readFile(this, $('#column_source #add .preview'));
        });
		$('#column_source #add .submit_button').bind('click', function(){
            var params = {
				"id_type" : self.types_list[self.type_id].id,
				"label" : $('#column_source #add #label').val(),
				"description" : $('#column_source #add #description').val(),
				"icon" : parseInt($('#column_source #add #image_id').html())
			}
			utilities.load_service(
				"feed/add_source",
				params,
				function(result){
					self.refresh_sources();
				}
			);
		});
        $('#column_source #edit #icon').on('change', function(e){
            self.file_upload(event.target.files, function(e){
                var response = JSON.parse(e);
                if(response.code && response.code == 200)
                    $('#column_source #edit #image_id').html(response.id);
            });
            self.readFile(this, $('#column_source #edit .preview'));
        });
		$('#column_source #edit #edit_button').bind('click', function(){
            var params = {
                "id" : self.sources_list[self.source_id].id,
				"type_id" : self.types_list[self.type_id].id,
				"label" : $('#column_source #edit #label').val(),
				"description" : $('#column_source #edit #description').val(),
                "icon" : parseInt($('#column_source #edit #image_id').html())
			}
			utilities.load_service(
				"feed/edit_source",
				params,
				function(result){
					self.refresh_sources();
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
					self.refresh_sources();
                    $('#column_url').css('display', 'none');
				}
			);
		});
		$('#column_url #add_button').bind('click', function(){
			self.add_url_form();
		});
		$('#column_url #add .submit_button').bind('click', function(){
			var params = {
				"id_type" : self.types_list[self.type_id].id,
				"id_source" : self.sources_list[self.source_id].id,
				"url" : $('#column_url #add #url').val()
			}
			utilities.load_service(
				"feed/add_url",
				params,
				function(result){
					self.refresh_urls();
				}
			);
		});
		$('#column_url #edit #edit_button').bind('click', function(){
			var params = {
				"type_id" : self.types_list[self.type_id].id,
				"source_id" : self.sources_list[self.source_id].id,
                "id" : self.urls_list[self.url_id].id,
				"url" : $('#column_url #edit #url').val()
			}
			utilities.load_service(
				"feed/edit_url",
				params,
				function(result){
					self.refresh_urls();
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
					self.refresh_urls();
				}
			);
		});
	},
	add_type_form : function(){
		$('#column_type #add').css('display', 'block');
		$('#column_type #edit').css('display', 'none');
        $('#column_type #add #label').val('');
        $('#column_type #add #description').val('');
        $('#column_type #add #image_id').html('');
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
        $('#column_type #edit #image_id').html(this.types_list[this.type_id].icon);
        $('#column_type #edit .preview').attr("src", this.types_list[this.type_id].url);
	},
	edit_source_form : function(){
		$('#column_source #edit').css('display', 'block');
		$('#column_source #add').css('display', 'none');
		$('#column_source #edit #label').val(this.sources_list[this.source_id].label);
		$('#column_source #edit #description').val(this.sources_list[this.source_id].description);
        $('#column_source #edit #image_id').html(this.sources_list[this.source_id].icon);
        $('#column_source #edit .preview').attr("src", this.sources_list[this.source_id].url);
	},
	edit_url_form : function(){
		$('#column_url #edit').css('display', 'block');
		$('#column_url #add').css('display', 'none');
        $('#column_url #edit #url').val(this.urls_list[this.url_id].url);
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
					$('#column_type ul').append('<li id="type_'+i+'" data-id="'+self.types_list[i]['id']+'">'+self.short(self.types_list[i]['label'])+'<div class="right_arrow"></div></li>');
					$('#type_'+i).bind('click', function(){
						$('#column_type li').removeClass('selected');
						self.type_id = $(this).attr('id').replace('type_', '');
						$(this).addClass('selected');
						self.edit_type_form();
						
						$('#column_source').css('display', 'table');
                        $('#column_source #add').css('display', 'none');
                        $('#column_source #edit').css('display', 'none');
                        $('#column_url').css('display', 'none');
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
				"type_id":self.types_list[self.type_id].id
			},
			function(result){
				self.sources_list = JSON.parse(result);
				$('#column_source ul').html('');
				for(var i=0; i<self.sources_list.length; i++){
					$('#column_source ul').append('<li id="source_'+i+'" data-id="'+self.sources_list[i]['id']+'">'+self.short(self.sources_list[i]['label'])+'<div class="right_arrow"></div></li>');
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
				"type_id":self.types_list[self.type_id].id,
				"source_id":self.sources_list[self.source_id].id
			},
			function(result){
				console.log(result);
				self.urls_list = JSON.parse(result);
                $('#column_url ul').html('');
                for(var i=0; i<self.urls_list.length; i++){
                    $('#column_url ul').append('<li id="url_'+i+'" data-id="'+self.urls_list[i]['id']+'">'+self.short(self.urls_list[i]['url'])+'<div class="right_arrow"></div></li>');
                    $('#url_'+i).bind('click', function(){
                        $('#column_url li').removeClass('selected');
                        self.url_id = $(this).attr('id').replace('url_', '');
                        $(this).addClass('selected');
                        self.edit_url_form();
                        //$('#column_url').css('display', 'table');
                        //self.refresh_urls();
                    });
                }
			}
		);
	},
    readFile : function(input, target){
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                target.attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    },
    file_upload : function(files, callBack){
        var fileInput = files[0];
        var data = new FormData();

        for(var i = 0; i < files.length; ++i){
            data.append('file[]',files[i]);
        }
        $.ajax({
            type:'POST',
            method:'POST',/* for newest version of jQuery */
            url:'../feed/file_upload',
            headers:{'Cache-Control':'no-cache'},
            data:data,
            contentType:false,
            processData:false,
            success: function(response){
                var return_data = response;
                callBack(return_data);
                //if(return_data !== 'success') {
                    //failed();
                //}
                //else if(return_data == 'success') {
                    //success();
                //}
            }
        });
    },
    short : function(str){
        if(str.length > 20)
            str = str.substr(0,20)+"...";
        return str;
    }
}

admin.init();