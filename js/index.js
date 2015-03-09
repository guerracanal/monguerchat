 
 $(function() {
	
	cargar("obvio", "Cápitan Obvio", true);
	cargar("hodor", "Hodor", true);
	cargar("pikachu", "Pikachu", true);
	//cargar("bocaseca", "Bocaseca", false);
	//cargar("ganan", "Gañán", false);
	//cargar("marlo", "Marlo", false);
	cargar("clipo", '"Clipo" El clip del Windows', true);
	cargar("minion", "Minion", true);
	cargar("chiquito", "Chiquito de la Calzada", true);
	//cargar("onofre", "Onofre", false);
	//cargar("torrente", "Torrente", false);
	//cargar("sabina", "Joaquin Sabina", false);
	//cargar("jaybob","Jay y Bob el Silencioso", false);
	//cargar("house","Dr House", false);
	//cargar("barney","Barney Stinson", false);
	//cargar("sheldon","Sheldon Cooper", false);
	cargar("et","ET", true);
	//cargar("hipster","Hipster", false);
	//cargar("vicentin","Vicentín", false);
	cargar("zombie","Zombie", true);
	//cargar("gallu","Gallu", false);
	//cargar("heisemberg","Heisemberg", false);
	cargar("gatete", "Gatete", true);
	
	$('#free').click(function(){ free(); return false; });
	$('#history').click(function(){ history(); return false; });
	$('#autor').click(function(){ autor(); return false; });
	//$('#session').html(sessionStorage['id']);
	
	setInterval('mostrarfraseglobal()',2000);
	 
});