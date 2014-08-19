var user = {
    user_infos : null,
    init : function(){
        this.user_infos = JSON.parse(utilities.getLocalSession('lv_user'))[0];
        public_api.getUserPanoramics();
        $('#page_link').on('click', function(){
            window.location.href='/page/'+JSON.parse(utilities.getLocalSession('lv_user'))[0].page_name;
        });
        var pseudo = this.user_infos.page_name;
        if(this.user_infos.pseudo != ''){
            pseudo = this.user_infos.pseudo;
        }
        $('#pseudo').html(pseudo);
    }
}
user.init();