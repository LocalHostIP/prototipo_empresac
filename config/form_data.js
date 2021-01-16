const Conceptodb = require("../models/Concepto.js")
const Prediodb = require("../models/Predio.js")

//Predios and Conceptos
prediosdb=[];
conceptosdb=[];

var predios=[]; //Busqueda only
var conceptos=[]; //Busqueda only

function actualizar(){
	//actualiza conceptos y predios de la base de datos
	conceptos=[];
	predios=[];
	prediosdb=[];
	conceptosdb=[];
	Conceptodb.find({}, function(err,res_conceptos) {	
		res_conceptos.forEach(function(res_concepto) {
			conceptos.push(res_concepto.IdConcepto+" "+res_concepto.Descripcion);
			conceptosdb.push(res_concepto)
		});	
	  });
	  Prediodb.find({}, function(err,res_predios) {	
		res_predios.forEach(function(res_predio) {
			predios.push(res_predio.Id_Elemento+" "+res_predio.Descripcion);
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

function findConceptoID(busqueda){
	return conceptosdb.find(function(e) {
		return e.IdConcepto+" "+e.Descripcion == busqueda
	  }).IdConcepto;
}
function findPredioID(busqueda){
	return prediosdb.find(function(e) {
		return e.Id_Elemento+" "+e.Descripcion == busqueda
	  }).Id_Elemento
}

module.exports={
	getConceptos, 
	getPredios,
	actualizar,
	findConceptoID,
	findPredioID
}