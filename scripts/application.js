var repeater;
var scrlRate;
var posX;
jQuery(document).ready(function ($) {


	$('#gallery').bind('mouseenter', function () {
		this.iid = setInterval(function () {
			galleryScroller()
		}, 1);
	}).bind('mouseleave', function () {
		this.iid && clearInterval(this.iid);
	});




	scroll_trigger = false;
	site = false;
	$(function () {
		console.log("THING called");
		$('a[href*="#"]:not([href="#"])').click(function () {
			//hijacks the anchor click action and does this >---
			console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX   link " + this.hash + " clicked");

			var doc = document.documentElement;
			var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
			var scroll_poss = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
			//var scroll_poss = (window.height);
			
			console.log("scroll_poss is at=" + scroll_poss);
			sra_menu(this.hash);

			closeMenu(); // closes mobile menu - even if already closed
		});
	});

	function sra_menu(move_this) {
		//set variables and output log
		displayed_content = move_this;
		display_here_top = $(top_of_site).offset().top;
		displayed_content_top = $(displayed_content).offset().top;
		displayed_content_height = $(displayed_content).height();
		move_here_y = (display_here_top - displayed_content_top);
		console.log("move_here_y = " + move_here_y);
		console.log("window.innerHeight = " + window.innerHeight);
		console.log("displayed_content_height = " + displayed_content_height);
		console.log("displayed_content =  " + displayed_content);
		console.log('$("hidden_element".prop) =  ' + $("hidden_element").prop);
		console.log($(displayed_content).find("iframe"));
		if (!$(displayed_content).find("iframe")) {
			console.log("NO IFRAMES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

		}


		//resets last moved section if it has been moved
		if (typeof last_content != 'undefined') {
			console.log("last_content = " + last_content);
			if (displayed_content != last_content) {
				/*						*/
				reset_last_content();
			}
		}


		console.log(" #############  transform state of " + displayed_content + " = " + $(displayed_content).css("transform"));


		/*******************  ON click Menu Item Action *****************************************/

		scroll_trigger = false;
		check_scroll_height(); //disable scroll if conent smaller than window



		if ($(displayed_content).css("transform") == 'none') { // No element selected
			$(".hidden_element").show(function () {
				// Find the iframes within our newly-visible element

				/*				console.log("*********** "+$(displayed_content).data('src')+" ********* ")*/

				$(displayed_content).find("iframe").prop("src", function () {
					// Set their src attribute to the value of data-src
					console.log("!!!!****!!!!**** " + $(this).data("src"));

					/*					$(".web_portfolio .menu").animate({
											opacity: site
										}, "500")*/
					$(displayed_content).find("iframe").css("display", "block");
					$(displayed_content).find("iframe").css("height", "90vh");
					/*			$(".web_portfolio .menu").animate({
									opacity: 1
								}, "500");*/

					return $(this).data("src");
				});



			});
			if (open == false) { //  if NOT a mobile
				//$("displayed_content").css("position", "fixed"); //stops scrolling - but leaves gaps
				$('html,body').animate({
						scrollTop: -80
					}, '10') // sends page scroll to top
			}
			//*******if mobile
			if (open == true) {
				$('html,body').animate({
					scrollTop: -80
				}, '100'); //  if mobile set to top of screen

				//Restricts scrolling to size of element - fails;
				console.log("this height = " + $(this).height());
				console.log("displayed_content height = " + $(displayed_content).height());
				//$(this).css("resizeTo; ", "100%, " + $(displayed_content).height());
				console.log("this height NOW = " + $(this).height());
				//Restricts scrolling to size of element - fails;

				//$("body").css("overflow-y", "hidden !important");
			};
			//*******if mobile - end

			$("body").css("overflow-y", "scroll"); //replaces scrollbar removed by position fixed

			$(displayed_content).css("display", "block");


			//****************START MOVES PIECE
			$(displayed_content).css("transform", "translate(0px," + move_here_y + "px)"); // moves current piece up from original place to just under menu at the top
			$(displayed_content).css("z-index", "10"); // puts selected content over mask

			//****************END MOVES PIECE

		/*	$(mask).css("height", "100vh");
			$(mask).animate({
				opacity: 0.5
			}, 200);*/ //displays mask after selection

			/*******************  ON 2nd click Menu Item Action *********************************/

			if (typeof last_content != 'undefined') {
				check_scroll_height(); //disable scroll if conent smaller than window
				if (open == true) { //  if mobile
					$("body").css("position", "relative !important"); //allows scrolling;
					$("mask").css("z-index", "0 !important"); //allows scrolling;
				}
			}

		} else
			MYAPP.reset_displayed_content(); {}

		last_content = displayed_content;


		$(document).scroll(function (e) {
			// grab the scroll amount and the window height
			var scrollAmount = $(window).scrollTop();
			var documentHeight = $(document).height();
			displayed_content_top = $(displayed_content).offset().top;
			/*console.log("scrollAmount =" + scrollAmount);
			console.log("window.innerHeight =" + window.innerHeight);
			console.log("displayed_content_height =" + displayed_content_height);
			console.log("displayed_content_top =" + displayed_content_top)*/
			;
			scroll_end = displayed_content_top + (displayed_content_height / 2);
			/*console.log("scroll_end =" + scroll_end);*/




			//testScrollPosition();

			/*			function testScrollPosition() {
							if (scrollAmount > (scroll_end)) {
								console.log("testScrollPosition");
								bounce_element_up();
							}
						}

						setTimeout(testScrollPosition, 0);*/
		}); // end live sensor

		//console.log("The MASK OPACITY is : " + $(mask).css('opacity'));

		//if ($(mask).css('opacity') == 0.5) {

		/*		$(mask).hover(function () {
					$(document).bind('mousewheel', function (e) {
						var delta = e.originalEvent.wheelDelta;
						MYAPP.reset_displayed_content();
						//console.log('The mouse delta is : ' + delta);
						//console.log("The MASK OPACITY is : " + $(mask).css('opacity'));
					})
				});*/
		//}
		console.log($(displayed_content).find("iframe").css("transform"));
	/*	if ($("#web_portfolio").css("transform") != 'none' || $(displayed_content).find("iframe").css("transform") == 'none') {
			site = 1;
			$(displayed_content).find("iframe").css("height", "80vh");
			$(displayed_content).find("iframe").css("display", "block");


		} else {
			site = 0;
			$("iframe").css("height", "0vh");
			$("iframe").css("display", "none");
		}*/
		$("ul.nav-child").animate({
			opacity: site
		}, "500");

	} // end menu click actions

	function bounce_element_up() {
		console.log("scroll_triggered !!!!!!!!!!!!!!!!!!!!!!!!!");

		$('html,body').animate({
				scrollTop: (scroll_end - (displayed_content_height / 2))
			}, 100) // stops browser scrolling past end of dusplayed content
		console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
		//this.addEventListener("mousewheel", function(e){ e.preventDefault(); });
		/*			$("body").css("position", "absolute");
					$("body").css("top", "0");
					$("body").css("bottom", "0");
					$("body").css("left", "0");
					$("body").css("right", "0");
					$("body").css("overflow", "auto");*/
	}

	function check_scroll_height() { // if content smaller than view, disable scrolling
		if (window.innerHeight > displayed_content_height) {
			$("body").css("position", "fixed"); //stops scrolling;
		} else {
			$("body").css("position", "relative")
		}; //re- enables scrolling;}


	}

	MYAPP = {
		reset_displayed_content: function () {
			if ($(mask).css('opacity') == 0.5) {

				$("body").css("position", "relative"); //allows scrolling
				$(displayed_content).css("transform", "none"); // returns element to original position
				//$(mask).css("opacity", "0"); //clears mask
				$(mask).animate({
					opacity: 0
				}, "200");
				$(mask).css("height", "0vh");

				console.log("reset?");
				/*		if(move_here_y==0){move_here_y=-2000};
						console.log("move_here_y="+move_here_y);*/
				$(displayed_content).css("z-index", "1"); // puts content back under mask
				$('html,body').animate({
					scrollTop: -80
				}, "100");
				displayed_content_height = 999999999;
			}

			//$(displayed_content).find("iframe").css("display", "none");

			/*		$(".web_portfolio .menu").animate({
						opacity: 0
					}, "500");*/
			//$(hidden_element).css("display","none");



			//console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX last_content = ' + $(last_content).find("iframe").css("height"));

			/*		$(displayed_content).css("display", "none");
						console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX displayed_content = "+ ($(displayed_content).css("display")));*/

		}
	}

	function reset_last_content() {
		console.log(" -----reset_last_content--------  transform state of last_content" + last_content + " = " + $(last_content).css("transform"));

		$(last_content).css("transform", "none"); //returns last content to original place
		$(last_content).css("z-index", "1"); // puts content back under mask
		$(last_content).css("position", "relative"); // returns selection to flow
		console.log(" #############  RESETTING transform state of last_content" + last_content + " = " + $(last_content).css("transform"));
		last_content = displayed_content;
		console.log(" after last_content = displayed_content = " + last_content);
		$("body").css("position", "relative"); //allows scrolling
		$("body").css("overflow-y", "scroll");
		//$(displayed_content).find("iframe").css("display", "none");
		$(last_content).find("iframe").css("height", "0vh");

	/*	if ($(last_content) == web_portfolio) {

		}*/

		//$(hidden_element).css("display","none");


		console.log('XXXXXXXX' + last_content + 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX last_content = ' + $(last_content).find("iframe").css("height"));
		/*		console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX last_content = '+ $(".web_portfolio "+last_content).css("display","none"));*/
	}

	function galleryScroller(event) {
		document.addEventListener('mousemove', onMouseMove, false);
		doScroll(scrollX);

		function onMouseMove(e) {
			posX = e.clientX;
			if (!posX) {
				posX = e.pageX;
			}

			//console.log(posX);
		}

		scrlRate = (window.innerWidth / posX);
		//console.log(scrlRate);

	/*	if (scrlRate < 1.8) {
			scrollX = 1;
		}
		if (scrlRate < 1.3) {
			scrollX = 2;
		}
		if (scrlRate < 1.2) {
			scrollX = 3;
		}
		if (scrlRate > 1.8) {
			scrollX = 0;
		}
		if (scrlRate > 2.5) {
			scrollX = -1;
		}
		if (scrlRate > 4.5) {
			scrollX = -2;
		}
if (scrlRate > 5) {
			scrollX = -3;
		}
*/

		scrollX=(scrlRate-2.5)*-2;
	}

	function doScroll(scrollX) {
		//console.log("scrlRate= " + scrlRate + "scrollx= " + scrollX);
		document.getElementById("gallery").scrollLeft += scrollX;
		//console.log(document.getElementById("gallery").scrollLeft);
		//console.log(document.getElementById("gallery"));
	}

});
/*
END Dcocument Ready
*/
var open = false;

function onClickMenu() {
	console.log("onClickMenu called");
	console.log("open = " + open);
	if (open == true) {
		closeMenu();
	} else {
		openMenu();
	}
}

function onClickCover() {
	console.log("onClickCover called");
	console.log("open = " + open);
	closeMenu();
}

var scrollPos;

function openMenu() {
	console.log("openMenu called");

	scrollPos = jQuery('body').scrollTop();
	jQuery('.cover').animate({
		left: '80%'
	});
	jQuery('.mobile-menu-bar').animate({
		left: '80%'
	});
	//jQuery('.off-screen-left').css('display', 'block');
	jQuery('.off-screen-left').animate({
		left: '0%'
	});
	jQuery('.outer').css({
		position: 'fixed',
		top: -(document.body.scrollTop)
	});
	jQuery(".body").on("touchmove", false);
	jQuery('.cover').fadeIn();
	jQuery('.fadeout').fadeOut();
	open = true;
}

function closeMenu() {

	console.log("closeMenu called");
	jQuery('.cover').animate({
		left: '0%'
	});
	jQuery('.mobile-menu-bar').animate({
		left: '0%'
	});
	jQuery('.off-screen-left').animate({
		left: '-80%'
	});
	jQuery('.outer').css({
		position: 'relative'
	});
	jQuery('body').scrollTop(scrollPos);
	jQuery(".body").off("touchmove", false);
	jQuery('.cover').fadeOut();
	jQuery('.fadeout').fadeIn();
	open = false;
}

function desktop_reset() {
	MYAPP.reset_displayed_content();
}