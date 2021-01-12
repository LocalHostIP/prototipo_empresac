const Conceptodb = require("../models/Concepto.js")
const Prediodb = require("../models/Predio.js")

//Predios and Conceptos
prediosdb=[];
conceptosdb=[];

var predios=[]; //Descriptions only
var conceptos=[]; //Descriptions only

function actualizar(){
	//actualiza conceptos y predios de la base de datos
	conceptos=[];
	predios=[];
	prediosdb=[];
	conceptosdb=[];
	Conceptodb.find({}, function(err,res_conceptos) {	
		res_conceptos.forEach(function(res_concepto) {
			conceptos.push(res_concepto.Descripcion);
			conceptosdb.push(res_concepto)
		});	
	  });

	  Prediodb.find({}, function(err,res_predios) {	
		res_predios.forEach(function(res_predio) {
			predios.push(res_predio.Descripcion);
			prediosdb.push(res_predio)
		});	
	  });
}

function getConceptos(){
	return conceptos;
}
function getPredios(){
	return predios;
}

function findConceptoID(descripcion){
	return conceptosdb.find(function(e) {
		return e.Descripcion == descripcion
	  }).IdConcepto;
}
function findPredioID(descripcion){
	return prediosdb.find(function(e) {
		return e.Descripcion == descripcion
	  }).IdElemento
}

module.exports={
	getConceptos, 
	getPredios,
	actualizar,
	findConceptoID,
	findPredioID
}