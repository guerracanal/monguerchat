var idglobal; 
var idenvio;
var fraseglobal;
var inputglobal;

function cargar (id, nombre, imagen){
	var line = $('<div class="caja-contacto" id="'+id+'"><div class="contacto"><div class="avatar-contacto"></div><div class="datos-contacto">'+nombre+'</div></div></div>');
	
	$('#contactos').append(line);
	
	if(imagen)$('#'+id+' .avatar-contacto').css('background-image', 'url("images/'+id+'.png")');
	
	//click en conversacion
	$( "#"+id ).on( "click", function() {
		idglobal = id;
		console.log("id seleccionada: "+idglobal);
		$('.chat').html('');
		//if(idselect!=''){
			$('#conversacion').css('display', 'block');
			if(imagen)$('#avatar-conversacion').css('background-image', 'url(images/'+id+'.png)');
			else $('#avatar-conversacion').css('background-image', 'url(images/avatar.png)');
			$('#home').css('display', 'none');
			$('#nombre-contacto').html(nombre);
			$("div").removeClass('select');
			$('#'+id).addClass('select');
			iniciar();
		//}
		console.log("Finaliza con id: "+idglobal);
	});
	
	$( ".boton" ).on( "click", function() {
		
	});
	
	
}

function iniciar(){
	
	console.log("INICIO CHAT CON: " + idglobal);
	
	// chat aliases
	var you = 'you';
	var robot = 'other';
	
	// slow reply by 400 to 800 ms
	var delayStart = 1000;
	var delayEnd = 3000;
	
	// initialize
	//var idselect=id;
	var chat = $('.chat');
	var waiting = 0;
	$('.busy').text('esta escribiendo...');
	
	
	// submit user input and get chat-bots reply
	var submitChat = function() {
	
		var input = $('.input input').val();
		if(input == '') return;
		
		$('.input input').val('');
		updateChat(you, input, true);
		
		var reply = chatBot(input, idglobal);
		if(reply == null) return;
		
		
		var latency = (Math.floor((Math.random() * (delayEnd - delayStart)) + delayStart));
		$('.busy').css('display', 'block');
		waiting++;
		setTimeout( function() {
			if(typeof reply === 'string') {
				updateChat(robot, reply, true);
			} else {
				for(var r in reply) {
					updateChat(robot, reply[r], true);
				}
			}
			if(--waiting == 0) $('.busy').css('display', 'none');
		}, latency);
	}
	
	
	// event binding
	$('.input').bind('keydown', function(e) {
		idenvio=idglobal;
		if(idenvio!=idglobal){
			$('.busy').css('display', 'none');
		}
		console.log('idenvio: '+idenvio);
		if(e.keyCode == 13) {
			submitChat();
		}
	});
	$('.input a').bind('click', submitChat);
	
//	 if(fraseglobal!=null){
//		 if(idglobal=='baymax'){
//			 console.log('Hay frase para baymax');
//			 updateChat(idglobal, fraseglobal, true);
//		 }
//	 }

	
	
	//Crear el registro de conversacion si no tenia
	if(localStorage['write_'+idglobal]==null){
		console.log("No hay chats con: " + idglobal);
		console.log('creamos registro: '+"write_" + idglobal);
		window["write_" + idglobal] = new Array();
		//window["read_" + idglobal] = JSON.parse(localStorage['write_'+idglobal]);
	}
	
	//TODO mostrar los 20 ultimos chats del array. No funciona bien.
	//Si hay chats los muestra
	else{
		console.log("Se recuperan chats con: " + idglobal);
		window["read_" + idglobal] = JSON.parse(localStorage['write_'+idglobal]);
		console.log("Total chats con "+idglobal+": "+window["read_" + idglobal].length);
		if(window["read_" + idglobal].length>0){
			var inicio = window["read_" + idglobal].length-20;
			if(inicio<0)inicio=0;
			console.log("Se muestra desde el: "+inicio);
			for(x=inicio; x<window["read_" + idglobal].length; x++) {
				console.log("leido: "+window["read_" + idglobal][x]);
				var elementos = window["read_" + idglobal][x].split('~~');
				//alert(window["read_" + id][x]);
				var destinatario=elementos[1];
				var mensaje=elementos[2];
				var fecha=elementos[3];
				//alert(destinatario+": "+mensaje);
				updateChat(destinatario, mensaje, false);
			}
		}
	}
	
}

//add a new line to the chat
function updateChat(party, text, storage) {
	if (text=="") return;
	var you = 'you';
	var robot = 'other';

	var chat = $('.chat');
	
	var d = new Date();
	/*
	if(window["write_" + id]==null){
		console.log('creamos variable: '+"write_" + id);
		window["write_" + id] = new Array();
	}
	*/
	
	//Grabar el mensaje
	if(storage==true){
		console.log("Se graba: "+idenvio+'~~'+party+'~~'+text+'~~'+d);
		if(window["write_" + idenvio]==null)window["write_" + idenvio] = new Array();
		window["write_" + idenvio][window["write_" + idenvio].length]=idenvio+'~~'+party+'~~'+text+'~~'+d;
		/*if(localStorage['write_'+id]==null){
			console.log('creamos variable local de: '+id);
		} */
		localStorage['write_'+idenvio]=JSON.stringify(window["write_" + idenvio]);
	}

	var style = 'you';
	if(party != you) {
		style = 'other';
	}
	
	//Si el mensaje es para grabar y idenvio==idglobal adelante
	//si no esta para grabar adelante
	
	var line = $('<p class="mensaje '+style+'"> <span class="party"><span class="text"></span></span> <span class="hora">'+d.getHours()	+':'+d.getMinutes()+'</span></p>');
	
	if((storage==false)){	
	
		line.find('.text').text(text);
	
		chat.append(line);
		
	}else{
		if(idenvio==idglobal){
			line.find('.text').text(text);
			chat.append(line);
		}
		else{
			console.log("El chat no es para almacenar");
			//$('.busy').css('display', 'none');
		} 
	}
	
	$('#chats').stop().animate({ scrollTop: $('#chats').prop("scrollHeight")});
	

}


function history(){
	alert('Tenemos ' + localStorage.length + ' elementos dentro de Local Storage');
	
	for(var i=0, t=localStorage.length; i < t; i++) {
	key = localStorage.key(i);
		alert('Clave: ' + key + '\nValor:\n' + localStorage[key]);
	}
		
}
function free(){
	
	var i;
	for(i=0, t=localStorage.length; i <= t; i++) {
	key = localStorage.key(i);
		console.log("Se elimina: "+key);
		localStorage.removeItem(key);
	}
	
	$('.chat').html('');
	
	alert('Se eliminan ' + i + ' conversaciones');

}
	
function autor(){
	alert('@guerracanal');
}

function chatBot(input, id) {
	//alert(idselect+': '+id);
	input = input.toLowerCase();
	if(id=='hodor') return randomHodor();
	if(id=='et') return randomET();
	if(id=='pikachu') return randomPikachu();
	if(id=='zombie') return randomZombie();
	if(id=='minion') return randomMinion();
	if(id=='gatete') return randomGatete();
	if(id=='chiquito') return randomChiquito();
	if(id=='baymax') return baymax(input);
	if(id=='clipo') return clipo(input);

	
	if(match('(hi|hello|hey|hola|howdy|ola)(\\s|!|\\.|$)', input)){
			if(id=='obvio') return randomObvio('hola', input);
	}
	
	if(match('what[^ ]* up', input) || match('sup', input) || match('how are you', input) || match('(tal estas|como estas|que tal)', input)){
		if(id=='obvio') return randomObvio('estado', input);
	}
	
	if(match('(sexo|follar|pene|polla|ojete)', input)){
		if(id=='obvio') return randomObvio('sexo', input);
	}
	
	if(match('(novia|novio|pareja|amor)', input)){
		if(id=='obvio') return randomObvio('amor', input);
	}
	
	if(match('(trabajo|futuro|examen|entrevista)', input)){
		if(id=='obvio') return randomObvio('futuro', input);
	}
	
	if(match('(asco|caca|mierda)', input)){
		if(id=='obvio') return randomObvio('mierda', input);
		//return ["Si te suicidas te matas."];
	}
	
	if(match('(politica|pp|psoe|podemos)', input)){
		if(id=='obvio') return randomObvio('politica', input);
		//return ["Los políticos hablan de política. Y Pablo Iglesias tiene coleta."];
	}
	
	if(match('(xd)', input)){
		if(id=='obvio') return randomObvio('xd', input);
		//return ["xD es un emoticono de que te hace risa algo. Pero la gente lo pone y no se rie de verdad."];
	}
	
	if(match('(jaja|haha|jeje|jiji|lol|juas)', input)){
		if(id=='obvio') return randomObvio('jaja', input);
		//return ["He dicho algo gracioso."];
	}
	
	if(match('(adios|bye|ciao)', input)){
		if(id=='obvio') return randomObvio('adios', input);
		//return ["Mañana será otro día."];
	}
	
	if(match('(gracias)', input)){
		if(id=='obvio') return randomObvio('gracias', input);
		//return ["De nada, Capitán Obvio siempre a tu servicio y recuerda: Si se puede, es porque es posible."];
	}
	
	if(id=='obvio')	return randomObvio('otro', input);
	
	//return input + "? Eso es verdad y, por lo tanto, verídico. Esto significa que es cierto y no es falso.";
	
	return "Este chat estará disponible proximamente";
	
}

function match (regex, input) {
	
		return new RegExp(regex).test(input);
}

function randomHodor(){
	var message='';
	var frase = new Array(27);
	
	//index = Math.floor(Math.random() * frase.length);
	
	frase[0] = "Hodor! Hodor hodor, ";
	frase[1] = "Hodor hodor HODOR! Hodor ";
	frase[2] = "Hodor, hodor. Hodor. Hodor ";
	frase[3] = "Hodor!! ";
	frase[4] = "Hodor. Hodor ";
	frase[5] = "Hodor ";
	frase[6] = "Hodor - hodor ";
	frase[7] = "HODOR hodor, hodor ";
	frase[8] = "hodor ";
	frase[9] = "hodor, hodor. Hodor ";
	frase[10] = "hodor... Hodor hodor ";
	frase[11] = "hodor ";
	frase[12] = "hodor hodor ";
	frase[13] = "hodor; hodor ";
	frase[14] = "hodor. ";
	frase[15] = "hodor? ";
	frase[16] = "hodor hodor! ";
	frase[17] = "hodor?! ";
	frase[18] = "hodor, hodor, hodor hodor. ";
	frase[19] = "hodor. Hodor. ";
	frase[20] = 'Hoooodor ';
	frase[21] = 'Hodor?! Hooodooooor!! ';
	frase[22] = 'Hodor Hodor, hodor. ';
	frase[23] = 'Hodor ';
	frase[24] = 'Hooooodor Hodor Hooooodor ';
	frase[25] = 'Hooodor Hodor? ';
	frase[26] = 'HOOOODOR! ';

	for (s=0;s<=( Math.floor(Math.random()*3));s++) { 
		message+=frase[Math.floor(Math.random()*27)]
	}
		
	return message;
}

function randomET(){
	var message='';
	var frase = new Array(3);
		//index = Math.floor(Math.random() * frase.length);
		
		frase[0] = 'Mi caaaaasaaaaa... Teléfonooo...';
		frase[1] = 'Mi casa...';
		frase[2] = 'Teléfono...';
		
		for (s=0;s<=( Math.floor(Math.random()*5));s++) { 
			message+=frase[Math.floor(Math.random()*3)]
		}
	return message;
}

function randomPikachu(){
	var message='';
	var frase = new Array(18);
	
	//index = Math.floor(Math.random() * frase.length);
	frase[0] ="Pika-pika, pi-pika, chuuuuu! ";
	frase[1] ="Pikachuuuuu! ";
	frase[2] ="PIII KAAA CHUUUU! ";
	frase[3] = "Pika-pika ";
	frase[4] = "Pika-pika pi ";
	frase[5] = "Pikachu, Pika, Pika! ";
	frase[6] = "Pika, Pika? "; 
	frase[7] = "Pika ";
	frase[8] = "Pi, Pi, Pi! "; 
	frase[9] = "Pi-Pika-Chu! ";
	frase[10] = "Pika. "
	frase[11] = "Pikachu! ";
	frase[12] = "Pika, Pi! ";
	frase[13] = "Pi... ";
	frase[14] = "Pika Pika Pikachu! Pika Pika. ";
	frase[15] = "Pi-Pika-Chu! ";
	frase[16] = "Pika pika pikachu! Pika Pi! ";
	frase[17] = "pika pika pika piii ";
	
	for (s=0;s<=( Math.floor(Math.random()*3));s++) { 
		message+=frase[Math.floor(Math.random()*18)]
	}
	
	return message;
}

function randomZombie(){
	var message='';
	var frase = new Array(15);
	
	frase[0] ="GRRjjjJJJRR... ";
	frase[1] ="Grrumbllll...! ";
	frase[2] ="Brains! Brbbb.. ";
	frase[3] = "AAAARRRRGG!  ";
	frase[4] = "Blubbbrrrr ";
	frase[5] = "SSssrruuuuggggjjj ";
	frase[6] = "Blub blub bluuub "; 
	frase[7] = "ceereeeebroooos ";
	frase[8] = "Aaaaaaaaaaaaaaaa "; 
	frase[9] = "Eeeeee ";
	frase[10] = "Hipp hiiiip "
	frase[11] = "Uuuurhhh ";
	frase[12] = "Huurgggg! ";
	frase[13] = "Ssssshhuuuup ";
	frase[14] = "GRRRRRRR!!! ";
	
	for (s=0;s<=( Math.floor(Math.random()*5));s++) { 
		message+=frase[Math.floor(Math.random()*15)]
	}
	
	return message;
}

function randomMinion(){
	var message='';
	var frase = new Array(29);
	
	frase[0] = "pepete ";
	frase[1] = "aaaaaah ";
	frase[2] = "uuuhhh ";
	frase[3] = "jiji ";
	frase[4] = "hahaha ";
	frase[5] = "jeje ";
	frase[6] = "wiiiii ";
	frase[7] = "bananaaaa ";
	frase[8] = "bappleees ";
	frase[9] = "potatoooo ";
	frase[10] = "para tú ";
	frase[11] = "la bodaaa ";
	frase[12] = "poulet tikka masala ";
	frase[13] = "daa ";
	frase[14] = "hana dul sae ";
	frase[15] = "belloo! ";
	frase[16] = "poopayee ";
	frase[17] = "tank yuuu! ";
	frase[18] = "me want bananaaa! ";
	frase[19] = "underweaaar ";
	frase[20] = "bee do bee do bee do ";
	frase[21] = "tulaliloo ";
	frase[22] = "ti aamoo! ";
	frase[23] = "tatata bala tu ";
	frase[24] = "baboiii ";
	frase[25] = "po kass ";
	frase[26] = "gelatooo ";
	frase[27] = "butt ";
	frase[28] = "chasy ";
	
	
	for (s=0;s<=( Math.floor(Math.random()*10));s++) { 
		message+=frase[Math.floor(Math.random()*29)]
	}
	
	return message;
}


function randomGatete(){
	var message='';
	var frase = new Array(22);
	
	frase[0] = "MEEEOW ";
	frase[1] = "meooow! ";
	frase[2] = "meeeeeoooooww ";
	frase[3] = "meow ";
	frase[4] = "miau miau ";
	frase[5] = "meeeeoroowwwwwwwwgghsss ";
	frase[6] = "HISSSSSS ";
	frase[7] = "Hisssss ";
	frase[8] = "MROW ";
	frase[9] = "PPPRRRRRRR ";
	frase[10] = "prrrrrr...... ";
	frase[11] = "MEEEOOOORWWWWGHHH!! ";
	frase[12] = "meeeeeaw..... ";
	frase[13] = "miau miau MIAU! ";
	frase[14] = "meow? ";
	frase[15] = "meaaaaw! ";
	frase[16] = "mmmmm....... ";
	frase[17] = "Zzzzzzz....... ";
	frase[18] = "Zzzz ";
	frase[19] = "ZZZZ ";
	frase[20] = "MEEEEEOW! ";
	frase[21] = "miau? ";
	
	
	for (s=0;s<=( Math.floor(Math.random()*10));s++) { 
		message+=frase[Math.floor(Math.random()*22)]
	}
	
	return message;
}

function randomChiquito(){
	var message='';
	
	var frase = ["fistro","torpedo","pecador","sexuarl","por la gloria de mi madre","diodeno","condemor","jarl","ese que llega","pupita","la caidita","te voy a borrar el cerito","al ataquerl","a wan","a peich","a gramenawer","no puedor","hasta luego Lucas","mamaar","apetecan","caballo blanco caballo negroorl","ese pedazo de","benemeritaar","te va a hasé pupitaa","de la pradera", "ese hombree", "quietooor", "qué dise usteer", "no te digo trigo por no llamarte Rodrigor", "está la cosa muy malar", "tiene musho peligro","ahorarr","diodenoo","amatomaa","me cago en tus muelas","llevame al sircoo", "papaar papaar", "se calle ustée", "va usté muy cargadoo"];
	
	for (s=0;s<=( Math.floor(Math.random()*5));s++) { 
		message+=frase[Math.floor(Math.random()*frase.length)]+' ';
	}
	
	return message;
}


function randomObvio(tema, input){
	var frase = new Array();
	
	if(tema=="hola"){
		frase.push('Hola, estas hablando conmigo.');
		frase.push('Hola, ¿sabias que cada 10 personas 5 son la mitad?');
		frase.push('Hoy debe ser cumpleaños de alguien.');

	}
	if(tema=="estado"){
		frase.push('Estoy bien porque no estoy mal. ¿y tú?');
		frase.push('Preguntamos que tal estamos cuando en realidad no nos importa la respuesta.');
		frase.push('Me he levantado por la mañana y por la noche me acostaré.');
		frase.push('A veces estoy bien.');
		frase.push('A veces estoy mal.');
	}
	if(tema=="oye"){
		frase.push('Dime tio');
		frase.push('Dime');
		frase.push('Cuentame...');
	}
	if(tema=="jaja"){
		frase.push('He dicho algo gracioso');
	}
	if(tema=="xd"){
		frase.push('xD es un emoticono de que te hace risa algo. Pero la gente lo pone y no se rie de verdad.');
	}
	if(tema=="amor"){
		frase.push('Te casarás con alguien, a no ser que te quedes soltero.');
		frase.push('Los gays son supersensibles.');
		frase.push('El amor siempre llega.');
		frase.push('Amores reñidos son los más queridos.');
		frase.push('Quieres que te quieran.');

	}
	if(tema=="sexo"){
		frase.push('La masturbación esta bien, pero hace sudar.');
		frase.push('Los niños nacen de un hombre y una mujer, pero no de dos hombres ni de dos mujeres.');
		frase.push('Todas son un poco putas.');
		frase.push('Todas somos bastante salidos.');
		frase.push('Sueles masturbarte.');
		frase.push('Te gusta follar.');
		frase.push('Eres sexy, tefo.');
		frase.push('Soy sexy.');
	}
	if(tema=="politica"){
		frase.push('El próximo presidente de China será chino, a menos que venga alguien de otro país y gane las elecciones.');
		frase.push('Todo va mal, puta crisis.');
		frase.push('El rey es campechano.');
		frase.push('Los políticos hablan de política.');
             
	}
	if(tema=="mierda"){
		frase.push('Si te pisa un tren, te mueres.');
		frase.push('Cuando mueras fallecerás.');
		frase.push('Si te suicidas te matas.');
		frase.push('Alguien está muriendo en estos mosmentos.');
		frase.push('Si tocas una corriente estando mojado, te mueres.');
		frase.push('Te vas a morir, eventualmente.');
		frase.push('Fumar mata.');
		frase.push('Si te suicidas te mueres.');
		frase.push('Alguien está muriendo en estos momentos.');
		frase.push('Cuando mueras fallecerás.');
		frase.push( 'Morir es malo para la salud.');
		frase.push( 'Si tocas una corriente estando mojado, te electrocutas.');
	}
	
	if(tema=="futuro"){
		frase.push('El ayer ya pasó.');
		frase.push('Mañana será otro día.');
		frase.push('El ayer ya pasó.');
		frase.push('El mañana todavía no llega.');
	}
	
	if(tema=="comida"){
		frase.push('La dieta mediterránea es la más sana.');
	}
	
	if(tema=="musica"){
		frase.push('Me gusta escuchar Death Metal porque su sonido es mortuorio y metálico.');
	}
	
	if(tema=="deporte"){
		frase.push('Si llega a entrar ese balón, es gol.');

	}
	if(tema=="adios"){
		frase.push('La obviedad es, en esencia, lo obvio.');
		frase.push('Adios, y recuerda... si se puede, es porque es posible.');

	}
	
	if(tema=="otro"){
		frase.push('Si saltas, luego caes.');
		frase.push('Si estas leyendo esto, es porque no tienes nada mejor que hacer.');
		frase.push('El último episodio de Lost, será al final de la serie.'); //series
		frase.push('Si tienes el ordenador estropeado, no puedes estar leyendo esto.');
		frase.push('Todas las modelos son tontas.');
		frase.push('Barcelona es muy cosmopolita.');
		frase.push('La tele atonta.');
		frase.push('Si te cortas por primera vez un dedo de la mano, solo te quedan cuatro dedos en ésa mano. A excepción que tengas una anomalía y tengas 6 dedos.'); //salud
		frase.push('Cuando se derrite un helado, se vuelve líquido y menos frío.');
		frase.push('Me comí una gelatina, muy gelatinosa. Era parecida al resto de gelatinas.');
		frase.push('Los círculos son redondos.'); 
		frase.push('Los cuadrados tienen cuatro lados de la misma longitud.');
		frase.push('Esto es verdad y, por lo tanto, verídico. Esto significa que es cierto y no es falso.');
		frase.push('Los pintores de casas siempre atenderán a domicilio, salvo que lo hagan sobre un lienzo.');
		frase.push('Es horrible quedarse calvo porque sufres de ausencia de pelo.');
		frase.push('Todos nacerán el día de su cumpleaños.');
		frase.push('El mejor lugar para esconderse es donde no te encuentren.');
		frase.push('Eso que buscas, lo encontrarás en el ultimo lugar en el que busques.');
		frase.push('En un año no bisiesto todos estaremos de cumpleaños, excepto los que nacieron el 29 de febrero.');
		frase.push('Mañana amanecerá antes del atardecer, y sera de noche antes del amanecer.');
		frase.push('Si hoy es hoy, ayer fue ayer y mañana será mañana.');
		frase.push('Los cumpleaños de todos caerán justo el día que nacieron.');
		frase.push('El no tener hijos es hereditario, si tus padres no tuvieron hijos, lo mas seguro es que tu tampoco.');
		frase.push('Si se puede, es porque es posible.');
		frase.push('La única manera de dormirse es estando despierto con anterioridad.');
		frase.push('Todas las casas tendrán mínimo una puerta.');
		frase.push('El agua mojará y el fuego quemará. Y el agua hirviendo, las dos cosas hará.');
		frase.push('Todo ser vivo tiene un corazón y un cerebro.');
		frase.push('¿Necesitas ayuda?');
		frase.push('¿Qué te preocupa?');
		frase.push('¿Tienes novia?');
		frase.push('¿Tienes novio?');
		frase.push('¿Qué te parecen las medidas del gobierno?');
		frase.push('¿Como estás?');
		frase.push('¿Qué tál?');
		frase.push('¿Estudias o trabajas?');
		frase.push('¿¡'+input+'?');
		frase.push('¿¡'+input+'? Eso es verdad y por lo tanto no es falso.');
		frase.push('Me estas hablando sobre '+input);
		//frase[19] = 'El 19 de febrero del 2016, habrá pasado un año desde hoy.'

	}
	
	index = Math.floor(Math.random() * frase.length);
	return frase[index];
}


function baymax(input){
	inputglobal=input;
	var frase = new Array();
	
	if(input=="hola"){
		frase.push('En una escala del 1 al 10, ¿Cómo calificas tu dolor?');
		frase.push('BEBE PELUDO! bebe peluuuudo...');
	}else{
		busqueda(input, 'wiki', 0);
	}
	index = Math.floor(Math.random() * frase.length);
	return frase[index];
}

function clipo(input){
	inputglobal=input;
	var frase = new Array();
	
	if(input=="hola"){
		frase.push('Hola! ¿puedo ayudarte? ¿puedo ayudarte?');
		frase.push('Preguntame lo que quieras saber. ¡Yo te ayudo!');
	}else{
		busqueda(input, 'wiki', 0);
	}
	index = Math.floor(Math.random() * frase.length);
	return frase[index];
}

function busqueda(input, fuente, i) {
	console.log("busqueda: "+input);
	var url;
	if(fuente=='wiki') url = 'http://es.wikipedia.org/w/api.php?action=opensearch&search='+input+'&callback=?';
	if(fuente=='lastfm') url= 'http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist='+input+'&format=json&api_key=ade52095db9e6&callback=?';
	
	console.log('buscando en: '+url);
		$.getJSON(url ,
		{  
		prop:"text", 
		uselang:"es"
		}, function(data){
			if(fuente=='wiki')fraseglobal = JSON.stringify(data);
			console.log("fraseglobal: "+fraseglobal);
		}
		);
}

function mostrarfraseglobal(){
	if((fraseglobal!=null)&&(fraseglobal!='')){
//		if(fraseglobal=='""') fraseglobal='Pensandolo mejor, no me apetece buscar eso';
		
		console.log(JSON.parse(fraseglobal));
		console.log(fraseglobal);
		
		var referencias = JSON.parse(fraseglobal)[1];
		var definiciones = JSON.parse(fraseglobal)[2][0];

		console.log(referencias);
		console.log(definiciones);
		
		if(empty(referencias)){
			console.log('vacio');
		}else{
			console.log('no vacio');
		}

	
//		for (i in referencias){
//			if(referencias[i].indexOf('desambiguación')==-1)
//				if(i==0){
//					if(referencias[i]!="") 
////						updateChat(idglobal, referencias[i]+' es tu consulta. ¡te lo miro!', true);
//						escribiendo(idglobal, referencias[i]+' es tu consulta. ¡te lo miro!');
//				}
//		}
		
		console.log('Renfenrencias: '+referencias.length);
		var buscandofrase = new Array();
		
		buscandofrase.push(' es tu consulta. ¡te lo miro!');
		buscandofrase.push(' es tu consulta. ¡te lo miro!');
		
		var index = Math.floor(Math.random() * buscandofrase.length);
		escribiendo(idglobal, referencias[0]+' '+buscandofrase[index]);
		if(referencias.length>1) 
//			updateChat(idglobal, 'Tiene mucho intringulis, puedes estar refiriendote a algo de todo esto: '+referencias, true);
			escribiendo(idglobal, 'Tiene mucho intringulis, puedes estar refiriendote a algo de todo esto: '+referencias);

		
		console.log(definiciones);
		
		if(definiciones.indexOf('puede referirse a:')==-1){
//			updateChat(idglobal, definiciones, true);
			escribiendo(idglobal, definiciones);
		}

//		for (i in definiciones){
//			if(definiciones[i].indexOf('desambiguación')==-1)
//			updateChat(idglobal, definiciones[i], true);
//		}
		
		
//		if(fraseglobal.indexOf('puede referirse a:')!=-1) {
//			
//		}
		
		fraseglobal=null;
	}
}

function escribiendo(id, texto){
	// chat aliases
	var you = 'you';
	var robot = 'other';
	
	// slow reply by 400 to 800 ms
	var delayStart = 1000;
	var chat = $('.chat');
	var waiting = 0;
	var delayEnd = 3000;
	
	var latency = (Math.floor(3000 + delayStart));
	$('.busy').css('display', 'block');
	waiting++;
	setTimeout( function() {
		updateChat(id, texto, true);
		if(--waiting == 0) $('.busy').css('display', 'none');
	}, latency);
}

function empty(array){
	console.log('array: '+array.length);
	console.log(array);
	for (i in array) {
		console.log('Elemento: '+array[i]);
		if(array[i]!='""') return false;
	}
	return true;
}

// function sleep(delay) {
//    var start = new Date().getTime();
//    while (new Date().getTime() < start + delay);
//  }

//function random(categoria) {
//	if(categoria == 'frase'){
//		var frase = new Array(20);
//		//calculando el random
//		index = Math.floor(Math.random() * frase.length);
//
//		
//		/*
//		
//		*/
//		return frase[index];
//	}
//return 'frase';
//}


                            