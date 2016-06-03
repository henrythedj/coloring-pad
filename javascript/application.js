$(document).ready(function(){
	//Creates initial 10x10 coloring space
	for (var j = 1; j<=100; j++){
		$('#colorspace').append('<div class="colorblock" style="height: 70px; width: 70px;"></div>')
	}
	$('button').hover(function(){
		$(this).toggleClass('activebutton');
	});
	//initializes new or resized space with rules to block out UNREASONABLE IMAGINATIONS
	$('.new').click(function(){
		var hw = prompt("How big is your imagination?", "Enter Number");
		if ($.isNumeric(hw)){
			while (hw >= 150){
				alert("OOO WEE! Your imagination is too big! Bring it down a notch (under 150)");
				hw = prompt("How big is your imagination?", "Enter Number");
			}
			$('.colorblock').remove();
			for (var i = 1; i <= hw*hw ; i++) {		
				$('#colorspace').append('<div class="colorblock" style="height:'+ 700/hw +'px; width:'+ 700/hw +'px;"></div>');
			}
		}
		else {
			alert("That's not a number, silly! Here's a 10x10 grid");
			$('.colorblock').remove();
			for (var j = 1; j<=100; j++){
				$('#colorspace').append('<div class="colorblock" style="height: 70px; width: 70px;"></div>');
			}
		}
	});
	//initializing variables used to set colors 
	var colors = ["black"];
	var coloring = ["black"];
	var red = 0;
	var green = 0;
	var blue = 0;
	//I used these variables to pull the RGB values of the DIVs (below) and then split to get the numbers so I could manipulate them
	var currentgrey = 'blank';
	var currentgrey2 = 'blank';
	var r = 0;
	var g = 0;
	var b = 0;
	//These set the color buttons to either a set of colors or a number that will trigger an if statement
	$('#black').click(function(){
		$('#colorspace').children().removeClass("initgrey");
		colors = ["black"];
	});
	$('#grey').click(function(){
		colors = 2;

	});
	$('#random').click(function(){
		$('#colorspace').children().removeClass("initgrey");
		colors = 1;
	});
	$('#rgb').click(function(){
		$('#colorspace').children().removeClass("initgrey");
		colors = ["red", "green", "blue"];
	});

	//Initializes variables for the permanent or trailing functions
	var permanent = 1;
	var trailing = 0;

	$("#perm").click(function(){
		permanent = 1;
		trailing = 0;
	});

	$("#trailing").click(function(){
		permanent = 0;
		trailing = 1;
	});

	//Main 'COLORING' function - checks to see if the colors are random or greyscale, and then uses the colors variable and a Math.random
	// to pull a color out (only one color in black's case, three in RGB). Then it checks for trailing or permanent and keeps or erases the color

	$('#colorspace').on('mouseover', '.colorblock', function(){
		if (colors===1){
			coloring = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
			$(this).css("background-color", coloring);
		}
		else if (colors===2){
			currentgrey = $(this).css("background-color");
			currentgrey2 = currentgrey.match(/[0-9]+/g);
			r=currentgrey2[0];
			g=currentgrey2[1];
			b=currentgrey2[2];
			var greyclass = $(this).attr("class");
			var initgrey = greyclass.split(" ");
			initgrey = initgrey[initgrey.length -1];

			if(initgrey==="initgrey"){
				r=r-20;
				g=g-20;
				b=b-20;
				$(this).css("background-color", "rgb(" + r + "," + g + "," + b + ")");
			}
			else{
				coloring = "lightgrey";
				$(this).css("background-color", coloring);
				$(this).addClass("initgrey")
			}
			
		}

		if(permanent===1){
			coloring = colors[Math.floor(Math.random()*colors.length)];
			$(this).css("background-color", coloring);
		}
		else if(trailing===1){
			coloring = colors[Math.floor(Math.random()*colors.length)];
			$(this).css("background-color", coloring);
			$(this).animate({backgroundColor: "transparent"}, "slow");
		}

		});
		//I know this is not the best way to get the shake effect but it works. DRY AF, right?
	$('#erase').on('click', function(){
		$('#colorspace').animate({left: "30px", top: "25px"},'fast');
		$('#colorspace').animate({left: "-30px", top: "11px"},'fast');
		$('#colorspace').animate({left: "30px", top: "25px"},'fast');
		$('#colorspace').animate({left: "-30px", top: "11px"},'fast');
		$('#colorspace').animate({left: "0px", top: "10px"},500);
		$('#colorspace').children().removeClass("initgrey");
		$('#colorspace').children().css("background-color", "white");
	});
});