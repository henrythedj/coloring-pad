$(document).ready(function(){
	for (var j = 1; j<=100; j++){
		$('#colorspace').append('<div class="colorblock" style="height: 70px; width: 70px;"></div>')
	}
	$('button').hover(function(){
		$(this).toggleClass('activebutton');
	});

	$('.new').click(function(){
		var hw = prompt("How big is your imagination?", "Enter Number");
		if ($.isNumeric(hw)){
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

	var colors = ["black"];
	var coloring = ["black"];
	var red = 0;
	var green = 0;
	var blue = 0;
	var currentgrey = 'blank';
	var currentgrey2 = 'blank';
	var initializegrey = 0;
	var r = 0;
	var g = 0;
	var b = 0;

	$('#black').click(function(){
		colors = ["black"];
	});
	$('#grey').click(function(){
		colors = 2;

	});
	$('#random').click(function(){
		colors = 1;
	});
	$('#rgb').click(function(){
		colors = ["red", "green", "blue"];
	});


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
			if(r!==g || g!==b || r<=0){
				coloring = "lightgrey";
				$(this).css("background-color", coloring);
			}
			else{
				r=r-20;
				g=g-20;
				b=b-20;
				$(this).css("background-color", "rgb(" + r + "," + g + "," + b + ")");
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
		

	$('#erase').on('click', function(){
		$('#colorspace').children().css("background-color", "transparent");
	});
});