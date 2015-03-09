 
 $(function() {
	
	cargar("obvio", "Cápitan Obvio", false);
	cargar("hodor", "Hodor", false);
	cargar("pikachu", "Pikachu", false);
	//cargar("bocaseca", "Bocaseca", false);
	//cargar("ganan", "Gañán", false);
	//cargar("marlo", "Marlo", false);
	cargar("clipo", '"Clipo" El clip del Windows', false);
	cargar("minion", "Minion", false);
	cargar("chiquito", "Chiquito de la Calzada", false);
	//cargar("onofre", "Onofre", false);
	//cargar("torrente", "Torrente", false);
	//cargar("sabina", "Joaquin Sabina", false);
	//cargar("jaybob","Jay y Bob el Silencioso", false);
	//cargar("house","Dr House", false);
	//cargar("barney","Barney Stinson", false);
	//cargar("sheldon","Sheldon Cooper", false);
	cargar("et","ET", false);
	//cargar("hipster","Hipster", false);
	//cargar("vicentin","Vicentín", false);
	cargar("zombie","Zombie", false);
	//cargar("gallu","Gallu", false);
	//cargar("heisemberg","Heisemberg", false);
	cargar("gatete", "Gatete", false);
	
	$('#free').click(function(){ free(); return false; });
	$('#history').click(function(){ history(); return false; });
	$('#autor').click(function(){ autor(); return false; });
	//$('#session').html(sessionStorage['id']);
	
	setInterval('mostrarfraseglobal()',2000);
	 
});