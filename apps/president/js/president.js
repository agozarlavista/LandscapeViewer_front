var president = {
    force       : {"J":13,"2":12,"A":11,"R":10,"D":09,"V":08,"10":07,"9":06,"8":05,"7":04,"6":03,"5":02,"4":01,"3":00}, /* PUISSANCE DU PLUS FORT AU MOINS FORT DES CARTES À JOUER*/
    exception   : [], /* AJOUTER DES CARTES À RETIRER SI BESOIN DANS CE TABLEAU SI LES CAVALIERS ETC NE SE JOUENT PAS*/
    cards       : [], /* ARRAY À REMPLIR À LA CRÉATION DU GAMEPLAY*/
    mixedCards  : [], /* ARRAY CONTENANT LES ID MELANGES DES CARTES */
    distrib     : {"3":18, "4":13, "5":10},
    nbPlayers   : "5",
    players     : [],
    playersArray: null,
    whoiam      : 0,
    currentPlayer : 0,
    currentHand :[],
    played      :false,
    turn        :0,
    lastPlayer : 0,
    distributeCards:0,
    init : function(nbPlayers, playersArray){
        this.nbPlayers = nbPlayers;
        this.playersArray = playersArray;
        this.createGamePlay();
        this.mixCards();
        this.distribute();
        this.setGamePlay();
    },
    createGamePlay : function(){
        for(var i=0; i<cards.length; i++){
            for(var c=0; c<cards[i]['cards'].length; c++){
                var addCard = true;
                if(this.exception.length == 0){
                    cards[i]['cards'][c]['force'] = this.force[cards[i]['cards'][c]['label']];
                    this.cards.push(cards[i]['cards'][c]);
                    this.mixedCards.push(this.cards.length);
                }else{
                    for(var e=0; e<this.exception.length; e++){
                        if(this.exception[e] == cards[i]['cards'][c]['label']){
                            addCard = false;
                        }
                        if(e == this.exception.length-1 && addCard == true){
                            this.cards.push(cards[i]['cards'][c]);
                            this.mixedCards.push(this.cards.length);
                        }
                    }
                }
            }
        }
        //alert(JSON.stringify(this.cards));
    },
    mixCards : function(){
        var i = this.cards.length;
        while (--i) {
            var j = Math.floor(Math.random() * (i+1));
            var temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    },
    distribute:function(){
        this.players = [];
        for(var p=0; p<this.nbPlayers; p++){
            $('.plate .centerPlateCard').append(this.getPlayerTemplate(p));
            $('#playerCard_'+p).css('top', playerPos[0][this.nbPlayers][p]['y']);
            $('#playerCard_'+p).css('left', playerPos[0][this.nbPlayers][p]['x']);
            //TweenMax.to($('#player_'+p), .6, {css:{left:playerPos[0][this.nbPlayers][p]['x'], top:playerPos[0][this.nbPlayers][p]['y']}, delay: (.1 * p)});
            //console.log(playerPos[0][this.nbPlayers][p]['x']);
            var pname = this.playersArray[p]['pseudo'];
            this.players.push({"name":pname, "cards":[]});
            for(var i=0; i<this.distrib[this.nbPlayers]; i++){
                this.players[p]['cards'].push(this.cards[this.distributeCards]);
                this.distributeCards++;
            }
        }
        //console.log(JSON.stringify(this.players));
    },
    getPlayerTemplate : function(p){
        var htmlTemp = '<div id="playerCard_'+p+'" class="backCard" style="background-image:url('+backCard+');">';
                htmlTemp+= '<div class="avatar">';
                    htmlTemp+= '<div class="pseudo">'+this.playersArray[p]['pseudo']+'</div>';
                htmlTemp+= '</div>';
                htmlTemp+= '<div class="nbCard info">'+this.distrib[this.nbPlayers]+'</div>';
                htmlTemp+= '<div class="status info">pending</div>';
                htmlTemp+= '<div class="points info">0</div>';
            htmlTemp+= '</div>';
        return htmlTemp;
    },
    setGamePlay : function(){
        var prop = "force";
        this.players[this.whoiam]['cards'] = this.players[this.whoiam]['cards'].sort(function(a, b) {
            if (false) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        });
        for(var i=0; i<this.players[this.whoiam]['cards'].length; i++){
            $('#myCards').append('<div id="player_'+i+'" class="card" style="left:'+(50 * i)+'px; background-image:url('+this.players[this.whoiam]['cards'][i]['picture']+');" data-force="'+this.players[this.whoiam]['cards'][i]['force']+'" data-selected="false" data-cardId="'+i+'"></div>');
            TweenMax.to($('#player_'+i),.5,{css:{top:"30px"}, delay: (.3 * i), ease:Back.easeOut});
        }
        $('.card').bind('click', function(e){
            president.selectCard(e.target.id);
        });
    },
    selectCard : function(e){
        if(this.played == true){
            return;
        }
        if($('#'+e).attr('data-selected') == "true"){
            this.played = true;
            this.playCards();
            return;
        }
        if($('#'+e).attr('data-force') == "13"){
            $('#'+e).removeClass('preselected');
            $('#'+e).addClass('selected');
            $('#'+e).attr('data-selected', 'true');
            TweenMax.to($('#'+e), .3,{css:{top:"10px"}, ease:Back.easeOut, onComplete:function(){
                president.letsPlay();
            }});
            return;
        }
        //alert($('#'+e).attr('data-selected')+" "+$('#'+e).attr('data-force'));
        $.each( $('.card'), function( i ) {
            if($('#'+e).attr('data-force') != "13"){
                if($('#card_'+i).attr('data-force') == "13"){
                    $('#card_'+i).removeClass('preselected');
                    $('#card_'+i).removeClass('selected');
                    TweenMax.to($('#card_'+i), .3,{css:{top:"30px"}, ease:Back.easeOut});
                }
            }
            if($('#card_'+i).attr('data-selected') == "true"){
                if($('#card_'+i).attr('data-force') == $('#'+e).attr('data-force')){

                }else{
                    $('#card_'+i).attr('data-selected', 'false');
                    $('#card_'+i).removeClass('selected');
                    $('#card_'+i).removeClass('preselected');
                    TweenMax.to($('#card_'+i), .3,{css:{top:"30px"}, ease:Back.easeOut});
                }
            }else{
                if($('#card_'+i).attr('data-force') == $('#'+e).attr('data-force') || $('#card_'+i).attr('data-force') == "13"){
                    $('#card_'+i).addClass('preselected');
                }else{
                    $('#card_'+i).removeClass('selected');
                    $('#card_'+i).removeClass('preselected');
                }
            }
            //$( "#card_" + i ).append( document.createTextNode( " - " + val ) );
        });
        if($('#'+e).attr('data-selected') == "false"){
            $('#'+e).attr('data-selected', 'true');
            $('#'+e).addClass('selected');
            TweenMax.to($('#'+e), .3,{css:{top:"10px"}, ease:Back.easeOut});
        }else{
            $('#'+e).attr('data-selected', 'false');
            $('#'+e).removeClass('selected');
            TweenMax.to($('#'+e), .3,{css:{top:"30px"}, ease:Back.easeOut});
        }
    },
    playCards:function(){
        president.currentHand = [];
        //console.log('playCards '+$('.card').length);
        $.each( $('.card'), function( i ) {
            //console.log(i);
            $('#card_'+i).removeClass('selected');
            $('#card_'+i).removeClass('preselected');
            //console.log($('#card_'+i).attr('data-selected'));
            if($('#card_'+i).attr('data-selected') == "true"){
                //console.log('playCards selected true');
                TweenMax.to($('#card_'+i),.2,{css:{top:"150px"}, onComplete:function(){
                    president.currentHand.push(president.players[president.whoiam]['cards'][parseInt($('#card_'+i).attr('id').split('card_').join(''))]);
                    $('#card_'+i).remove();
                    delete president.players[president.whoiam]['cards'][i];
                    president.sortPlayerCards(president.whoiam);
                }});
            }
        });
        president.replaceCards();
    },
    replaceCards:function(){
        setTimeout(function(){
            $.each( $('.card'), function( i ) {
                $(this).attr('id', 'card_'+i);
                TweenMax.to($(this), .5, {css:{left:(50 * i)+'px'}, delay: (.1*i), ease:Back.easeOut});
            });
            var w=(($('.card').length * 50)+$('.card').width()-50);
            TweenMax.to($('.playerContent'), .5, {css:{width:w+'px'}, delay: (.1 * $('.card').length)});
            president.played = false;
            president.addHand();
        },500);
    },
    addHand : function(){
        console.log('inner add hand');
        var p = $('#playerCard_'+this.currentPlayer).offset();
        var hw = ((president.currentHand.length * 20)+($('.card').width()/2)-20);
        if(hw == 0){
            hw = 62;
        }
        var htmlTemp = '<div id="hand_'+president.turn+'" style="margin:auto; height:96px; position:absolute; width:'+hw+'px; left:'+ p.left+'px; top:'+ p.top+'px;">';
            for(var i=0; i<president.currentHand.length; i++){
                htmlTemp+= '<div class="playedCard" style="left:'+(20 * i)+'px; background-image:url('+president.currentHand[i]['picture']+');" data-force="'+president.currentHand[i]['force']+'"></div>';
            }
            htmlTemp+= '</div>';
        $('.hand').append(htmlTemp);
        console.log('addHand '+htmlTemp);
        TweenLite.to($('#hand_'+president.turn), .4, {css:{top:0, left:0, right:0, bottom:0}, onComplete:function(){
            president.turn++;
            president.checkTurn();
            console.log('check turn inner add hand');
        }});
    },
    checkTurn : function(){
        if(president.currentHand.length == 0){
            return;
        }
        var handValue = "";
        handValue = president.currentHand[president.currentHand.length-1]['force'];
        if(parseInt(handValue) >= 12){
            // je joueur garde la main il à joué des deux ou des as
            // alert('joueur garde la main');
            var playerOffset = $('#playerCard_'+president.currentPlayer).offset();
            $.each($('.hand div'), function(i){
                TweenMax.to($(this),.8,{
                    css:{top:playerOffset.top - ($(document).height()/2) + $('.card').height(), left:playerOffset.left - ($(document).width()/2)},
                    onComplete:function(){
                        $.each($('.hand div'), function(i){
                            $(this).remove();
                        });
                        //president.currentHand = null;
                    },
                    delay:.5
                });
            });
            setTimeout(function(){
                president.letsPlay();
            }, 1500);
        }else{
            president.lastPlayer = president.currentPlayer;
            president.currentPlayer++;
            president.checkPossibilities();
        }
    },
    letsPlay : function(){
        if(president.currentPlayer == president.whoiam){
            return;
        }
        this.sortPlayerCards(president.currentPlayer);
        president.currentHand = [];
        if(president.players[president.currentPlayer]['cards'].length > 0){
            president.currentHand.push(president.players[president.currentPlayer]['cards'][president.players[president.currentPlayer]['cards'].length - 1]);
            delete president.players[president.currentPlayer]['cards'][president.players[president.currentPlayer]['cards'].length - 1];
            //this.sortPlayerCards(president.currentPlayer);
            console.log("lets play");
            president.addHand();
        }else{
            president.currentPlayer++;
            president.checkPossibilities();
        }
    },
    checkPossibilities : function(){
        if(president.currentPlayer > parseInt(this.nbPlayers)-1){
            president.currentPlayer = 0;
        }
        var offset = $('#playerCard_'+president.currentPlayer).offset();
        TweenMax.to($('.currentPlayerInfo'),.5,{css:{top:(offset.top+15)+"px",left:(offset.left+15)+"px"} });

        this.sortPlayerCards(0);
        this.sortPlayerCards(president.currentPlayer);
        console.log(JSON.stringify(president.players[president.whoiam]['cards']));
        console.log('checkPossibilities '+president.currentPlayer);
        var canPlay = false;
        var selectedCards = null;
        if(president.players[president.currentPlayer]['cards'].length == 0){
            president.currentPlayer++;
            president.checkPossibilities();
        }
        for(var i=0; i<president.players[president.currentPlayer]['cards'].length; i++){
            // check si il a au dessus de president.currentHand
            //{"label":"10","picture":"images/jeu-54-cartes/pique/pique-10.png","force":7}
            if(president.players[president.currentPlayer]['cards'][i] != null){
                console.log("///////////////////////");
                console.log(president.currentHand);
                console.log(president.currentHand[president.currentHand.length-1]);
                console.log(president.currentHand[president.currentHand.length-1]['force']);
                //console.log(parseInt(president.players[president.currentPlayer]['cards'][i]['force'])+" >= "+parseInt(president.currentHand[president.currentHand.length-1]['force'])+" ??? ");
                if(parseInt(president.players[president.currentPlayer]['cards'][i]['force']) >= parseInt(president.currentHand[president.currentHand.length-1]['force'])){
                    console.log(parseInt(president.players[president.currentPlayer]['cards'][i]['force'])+" >= "+parseInt(president.currentHand[president.currentHand.length-1]['force'])+" > TRUE ");
                    canPlay = true;
                    selectedCards = i;
                }
            }
        }
        if(selectedCards != null){
            console.log("////////////////////////// "+president.currentPlayer);
            console.log(JSON.stringify(president.players));
            console.log(president.currentPlayer + " " + JSON.stringify(president.players[president.currentPlayer]['cards'][selectedCards]));
            if(this.playersArray[president.currentPlayer]['typ'] == "IA"){
                //jouer les cartes
                president.currentHand = [];
                president.currentHand.push(president.players[president.currentPlayer]['cards'][selectedCards]);
                delete president.players[president.currentPlayer]['cards'][selectedCards];
                this.sortPlayerCards(president.currentPlayer);
                //president.currentPlayer++;
                console.log("prev addHand "+ JSON.stringify(president.currentHand));
                president.addHand();
            }else{
                if(this.currentPlayer == this.whoiam){
                    //c'est à mon tour et je peux jouer
                    console.log('c est mon tour');
                }else{
                    console.log('le tour d\'un autre joueur');
                }
            }
        }else{
            //alert('pas moyen de jouer');
            //$('#player_state').html('passe');
            $('#playerCard_'+president.currentPlayer+" .status").html('passe');
            setTimeout(function(){
                president.currentPlayer++;
                president.checkPossibilities();
            }, 800);
        }
        //check les cartes du joueur en cours
        // s'il ne peut pas jouer = $('#player_state').html('passe'); president.currentPlayer++; president.checkPossibilities();
        // S'il peut jouer :
            // check si c'est un IA = this.playersArray['typ'] == 'IA'
                // Si c'est un IA jouer à sa place
                // Si non check si c'est moi if(this.currentPlayer == this.whoiam)
                    //Si oui activer et jouer
                    //Si non attendre la réponse de l'adversaire

    },
    sortPlayerCards : function(id){
        var removeNullObject = [];
        for(var i=0; i<this.players[id]['cards'].length; i++){
            if(this.players[id]['cards'][i] != null){
                removeNullObject.push(this.players[id]['cards'][i]);
            }
        }
        this.players[id]['cards'] = removeNullObject;
        var prop = "force";
        this.players[id]['cards'] = this.players[id]['cards'].sort(function(a, b) {
            if (false) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        });
        $('#playerCard_'+id+" .nbCard").html(president.players[id]['cards'].length);
    },
    regles : function(){

    }, destroy:function(){

    }
}



/* ------------------- NOTES -------------------
J       =   remplace n'importe quelle carte
force   =   puissance des cartes
nb de cartes = 13 * 4 + 2 Jokers = 52 + 2 = 54 cartes
JOUER A 3 = distribuer 18 cartes / joueur ? 54/3 = 18 OK
JOUER A 4 = distribuer 14 cartes / joueur ? 54/4 = 13.5 SHIT > 13 CARTES DISTRIBUÉES
JOUER A 5 = distribuer 11 cartes / joueur ? 54/5 = 10.8 SHIT > 10 CARTES DISTRIBUÉES
------------------- NOTES ------------------- */