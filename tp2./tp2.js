var personnage={
	initPerso:function (nom,sante,force) {
		this.nom=nom;
		this.sante=sante;
		this.force=force;

	}
};
var joueur =object.create(personnage);
joueur.initJoueur=function (nom,sante,force) {
	this.initPerso(nom,sante,force);
	this.xp=0;
};
 joueur.decrire=function () {
 	var description=this.nom+" a "+this.sante+" points de vie, "+this.force+" en force et "+this.xp+" points d'expérience";
 	return description;
 };
var adversaire =object.create(personnage);
adversaire.initAdversaire = function (nom,sante,force,race,valeur) {
	this.initPerso(nom,sante,force);
	this.race = race ;
	this.valeur=valeur;
};
adversaire.tostring=function () {
 	var description=this.nom+" a "+this.sante+" points de vie, "+this.force+" en force et "+this.race+
 	" race" + this.valeur +" valeur";
 	return tostring;
 };
 if(f.j[0].checked){
 	var nom=f.n.value;
	var sante=f.s.value;
	var force=f.fo.value;
	let joueu= new joueur(nom,sante,force);
	let t_filtres=joueu.filter(function(el){
		console.log(el.decrire()); 
	})
 }
else if(f.j[1].checked){
	var nom=f.n.value;
	var sante=f.s.value;
	var force=f.fo.value;
	var race=f.ra.value;
	var valeur=f.va.value;
	let adver= new adversaire(nom,sante,force,race,valeur);
	let t_filtres=joueu.filter(function(el){
		console.log(el.decrire()); 
	})
}


	
	

	
	console.log( adversair.tostring());