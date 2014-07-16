<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="chrome=1" />
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" type="text/css" href="styles/president.css">
    <script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="js/greensock/TweenMax.min.js"></script>
    <script type="text/javascript" src="js/cards.js"></script>
    <script type="text/javascript" src="js/president.js"></script>
    <title>Président</title>
</head>
<body>
<div class="plate">
    <div class="centerPlate"></div>
    <div class="centerPlateBorder"></div>
    <div class="centerPlateCard"></div>
</div>
<div class="hand">
</div>
<div class="playerContent">
    <div id="myCards"></div>
</div>
<div class="currentPlayerInfo">
    <div class="attempt info" id="player_state">Attempt</div>
</div>
</body>
</html>
<script>
    var selectedPlayers = [
        {"typ":"REAL","pseudo":"PLAYER1"},
        {"typ":"IA","pseudo":"IA2"},
        {"typ":"IA","pseudo":"IA3"},
        {"typ":"IA","pseudo":"IA4"},
        {"typ":"IA","pseudo":"IA5"}
    ];
    $( document ).ready(function() {
        president.init("5", selectedPlayers);
    });
</script>