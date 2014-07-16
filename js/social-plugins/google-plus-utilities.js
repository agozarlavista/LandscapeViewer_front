/* ------------ GOOGLE PLUS API LANDSCAPE VIEWER ----------- */
var googleplus = {
    initPlugin : function(){
        (function() {
            var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
            po.src = 'https://apis.google.com/js/client:plusone.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
        })();

        $('#pageFooter').append('<span id="signinButton"><spanclass="g-signin"data-callback="googleplus.signinCallback"data-clientid="671569450943"data-cookiepolicy="single_host_origin"data-requestvisibleactions="http://schemas.google.com/AddActivity"data-scope="https://www.googleapis.com/auth/plus.login"></span></span>');
    },
    signinCallback : function (authResult) {
        if (authResult['access_token']) {
            // Autorisation réussie
            // Masquer le bouton de connexion maintenant que l'utilisateur est autorisé, par exemple :
            document.getElementById('signinButton').setAttribute('style', 'display: none');
        } else if (authResult['error']) {
            // Une erreur s'est produite.
            // Codes d'erreur possibles :
            //   "access_denied" - L'utilisateur a refusé l'accès à votre application
            //   "immediate_failed" - La connexion automatique de l'utilisateur a échoué
            // console.log('Une erreur s'est produite : ' + authResult['error']);
        }
    },destroy:function(){

    }
}
//googleplus.initPlugin();