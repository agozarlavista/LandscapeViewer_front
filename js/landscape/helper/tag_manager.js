var tag_manager = {
	tags : null,
	_ : null,
	init : function(){
		this._ = require("underscore");
	},
	analyse : function(str, minLenght){
		for(var i=0; i<exclude.length; i++){
			str = str.split(exclude[i]).join('.');
		}
		for(var i=0; i<ponctuation.length; i++){
			str = str.split(ponctuation[i]).join('');
		}
		var phrase = str.split('.');
		this.tags = [];
		for (var p=0; p<phrase.length; p++) {
			var totalCount = phrase[p].split(' ');
			for (var i = 0; i < totalCount.length; i++) {
				if (totalCount[i].length >= minLenght) {
					if (this.checkName(totalCount[i])) {
						if (i < totalCount.length - 1) {
							if (this.checkName(totalCount[i + 1])) {
								if (i < totalCount.length - 2) {
									if (this.checkName(totalCount[i + 2])) {
										this.tags.push({
											"type": "character",
											"value": totalCount[i] + " " + totalCount[i + 1] + " " + totalCount[i + 2]
										});
										i++;
									} else {
										this.tags.push({
											"type": "character",
											"value": totalCount[i] + " " + totalCount[i + 1]
										});
									}
								} else {
									this.tags.push({
										"type": "character",
										"value": totalCount[i] + " " + totalCount[i + 1]
									});
								}
								i++;
							} else {
								this.tags.push({"type": "name", "value": totalCount[i]});
							}
						}
					} else {
						//this.tags.push({"type":"word", "value":totalCount[i]});
					}
				}
			}
		}
		console.log(this.tags);
		this.tags = _.groupBy(this.tags, 'value');
		console.log(this.tags);
		/*var result = this._.chain(this.tags)
			.groupBy("value")
			.map(function(value, key) {
				return {
					value: key,
					Cost: sum(_.pluck(value, "Cost")),
					Impressions: sum(_.pluck(value, "Impressions"))
				}
			})
			.value();*/
		//console.log(result);
	},
	checkName : function(str){
		return /^[A-Z]/.test( str);
	},
	sum : function(numbers) {
		return this._.reduce(numbers, function(result, current) {
			return result + parseFloat(current);
		}, 0);
	}
}
var exclude = [
	' je ', ' me ', ' m’', ' moi ', ' tu ', ' te ', ' t’', ' t\'', ' d\'', ' d’', ' toi ', ' nous ', ' vous ', ' il ', ' elle ', ' ils ', ' elles ', ' se ', ' en ', ' y ', ' le ', ' la ', ' l’', ' l\'', ' les ', ' lui ', ' soi' , ' leur ', ' eux ', ' lui ', ' leurs ', ' celui-ci ', ' celui-là ', ' celui ', ' celle-ci ', ' celle-là ', ' celle ', ' ceux-ci ', ' ceux-là ', ' ceux ', ' celles-ci ', ' celles-là ', ' celles ', ' ceci ', ' cela ', ' ce ', ' ça ', ' le mien ', ' le tien ', ' le sien ', ' la mienne ', ' la tienne ', ' la sienne ', ' les miens ', ' les tiens ', ' les siens ', ' les miennes ', ' les tiennes ', ' les siennes ', ' le nôtre ', ' le vôtre ', ' le leur ', ' la nôtre ', ' la vôtre ', ' la leur ', 'les nôtres', 'les vôtres', 'les leurs', 'qui', 'que', 'quoi', 'dont', 'où', 'lequel', 'auquel', 'duquel', 'laquelle', 'à laquelle', 'de laquelle', 'lesquels', 'auxquels', 'desquels', 'lesquelles', 'auxquelles', 'desquelles', 'qui', 'que', 'quoi', 'qu\'est-ce', 'lequel', 'auquel', 'duquel', 'laquelle', 'à laquelle', 'de laquelle', 'lesquels', 'auxquels', 'desquels', 'lesquelles', 'auxquelles', 'desquelles', 'on', 'tout', 'un', 'une', 'l\'un', 'l\'une', 'les uns', 'les unes', 'un autre', 'une autre', 'd\'autres', 'l\'autre', 'les autres', 'aucun', 'aucune', 'aucuns', 'aucunes', 'certains', 'certaine', 'certains', 'certaines', 'tel', 'telle', 'tels', 'telles', 'tout', 'toute', 'tous', 'toutes', 'le même', 'la même', 'les mêmes', 'nul', 'nulle', 'nuls', 'nulles','quelqu\'un', 'quelqu\'une', 'quelques uns', 'quelques unes', 'personne (aucun)', 'autrui', 'quiconque', 'd’aucuns'
];
var ponctuation = [
	',', ';', ':', '!', '?', '"'
];