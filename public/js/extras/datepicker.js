
//returns an array of dates by weeks
function getWeek(year,month,day) {
	current=new Date(year,month,day);
	var week= new Array(); 
	if(current.getDay()==0)
		current.setDate(current.getDate() -2);

	current.setDate((current.getDate() - current.getDay())+1);
	for (var i = 0; i < 7; i++) {
		week.push(
			new Date(current)
		); 
		current.setDate(current.getDate() +1);
	}
	return week; 
}

function getMonthName(ind){
	switch (ind) {
		case 0:
			return "Enero"
		case 1:
			return "Febrero"
		case 2:
			return "Marzo"
		case 3:
			return "Abril"
		case 4:
			return "Mayo"
		case 5:
			return "Junio"
		case 6:
			return "Julio"
		case 7:
			return "Agosto"
		case 8:
			return "Septiembre"
		case 9:
			return "Octubre"
		case 10:
			return "Noviembre"
		case 11:
			return "Diciembre"
	}
}

//Display calendar days and info
function display(){
	$("#month").html(getMonthName(currentDate.getMonth()));
	$("#year").html(currentDate.getFullYear());
	for(i=0;i<7;i++){
		if(week[i].getDate()==currentDate.getDate()){ //Add active class to day active
			$('#day'+i).html('<div class="day-active mx-auto" >'+week[i].getDate()+'</div>');
		}else{
			$('#day'+i).html(week[i].getDate());
		}
	}
	getWeekDescription()	
}

//Redirect to new Date
function changeDate(index){
	window.location.href = '/users/'+week[index].toISOString().slice(0,10); 
}

//Click on prev arrow
$('#prev-week').click(()=>{
	current=week[0];
	current.setDate(current.getDate()-1);
	window.location.href = '/users/'+current.toISOString().slice(0,10); 
});

//Click on next arrow
$('#next-week').click(()=>{
	current=week[6];
	current.setDate(current.getDate()+1);
	window.location.href = '/users/'+current.toISOString().slice(0,10); 
});

//Click on today link
$('#cal-hoy').click(()=>{
	currentDate=new Date();
	window.location.href = '/users/'+currentDate.toISOString().slice(0,10); 
});

//Get info of week
function getWeekDescription(){
	//convert to db format of date
	sendWeek=[]
	week.forEach(element => {
		sendWeek.push(element.toISOString().slice(0,10))
	});
	$.ajax({
		type:"POST", 
		url:"/users/infoweek/",
		data:{
			week:sendWeek
		}, // data recive un objeto con la informacion que se enviara al servidor
		success:function(datos){ //success es una funcion que se utiliza si el servidor retorna informacion
			let today=new Date().toISOString().slice(0,10);
			for(i=0;i<7;i++){
				$('#des'+i).html(datos[i]);
				if(datos[i]!='--')
					$('#des'+i).html(datos[i]+'hrs');
				if(week[i].toISOString().slice(0,10)<today && datos[i]=='--'){
					$("#des"+i).addClass('day-nofilled');
					$("#day"+i).addClass('day-nofilled');
				}
			}
		},
		dataType: 'json' 
	})
}

var currentDate = new Date($('#date').val());
currentDate.setDate(currentDate.getDate()+1);

var week=getWeek(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate());
display()

