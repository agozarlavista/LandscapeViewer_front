/* ------------ FACEBOOK API LANDSCAPE VIEWER ----------- */
var facebookapi = {
    initialize : function(){
        $(document).append('<div id="fb-root"></div>');
        $('#pageFooter').append('<div class="fb-login-button" data-max-rows="1" data-size="xlarge" data-show-faces="false" data-auto-logout-link="true"></div>');
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/fr_FR/all.js#xfbml=1&appId=667223300008617";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    },destroy:function(){

    }
}
//facebookapi.initialize();