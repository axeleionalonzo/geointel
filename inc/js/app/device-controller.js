/********************* landing script controller *********************/

define(function() {

    var devicemenu = (function() {
    	var avail = true;
    		menu_container = "",
			dataUser = [];

		function isEmpty(p) {
		    return p.length == 0 ? true : false;
		}

		function showLoader(action) {
			var loader = $("body").find("div#landing-loader");

			if (action === true) {
				loader.fadeIn("slow");
			} else loader.fadeOut("slow");
		}

		function attachHandlers() {

			$("body").on("click", "#menu-toggle", function(e) {
		        e.preventDefault();
		        $("#wrapper").toggleClass("toggled");
		    });

			$("body").on("click", "a#logout", function(e) {
				e.preventDefault();
				$('#logout_modal').openModal();
			});

			
			$("body").on("click", "a#logout_proceed", function(e) {
				e.preventDefault();
				if (avail) {
					logout();
				}
			});

			$("body").on("click", "a#settings", function(e) {
				e.preventDefault();
				if (avail) {
					settings();
				}
			});
		}

		function removeHandlers() {
			// removing all jquery event handlers
			$('body').off();
			$("#password").off();
			$('#email').off();
		}

		function refreshHandlers() {
			removeHandlers();
			attachHandlers();
		}

		function logout() {

			// containers
			var card = $(".card");
			var card_content = $(".card-content");
			var card_action = $(".card-action");
			var input_email = $("#landing_email");
			var input_password = $("#landing_password");
			var input_clockin = $("#landing_clockin");
			var appContainer = $("body").find("div#app_container");

			// components
			var back = card.find("i#landing-back");

			// labels
			var account_name = card_content.find("p#accountname");
			var account_email = card_content.find("p#accountemail");
			var error_box = input_email.find("div#error");

			// i/o
			var password = input_password.find("input#password");
			var email = input_email.find("input#email").val();
			var error_message = "";
			var params = "";

			// buttons
			var next_button = input_email.find("a#next");
			var signin_button = input_password.find("a#signin");
			var logout_button = $("body").find("p#logout");

			avail = false;
			showLoader(true);

			$.ajax({
	            type: "POST",
	            url: "./auth/logout",
	            success: function(log) {

	            	if (log.status) {
						appContainer.children().fadeOut("slow").promise().done(function(){
							appContainer.children().remove();

		                	require(["app/page-controller"], function(slider) {
				                slider.where("landing");
				            });
						});
	            	}
	            	
		            avail = true;
		            showLoader(false);
	            }, // End of success function of ajax form
				error: function(xhr, status, errorThrown) {
					console.log("Error: " + errorThrown);
					console.log("Status: " + status);
					console.dir(xhr);
				},
	            dataType: "json"
	        });
		}

		function loadMenu() {

			showLoader(true);
			avail = false;
			var main_content = "";

	        loadHtml("main", function() {
				var devicemenu = $("body").find("div#app_container");

				console.log(dataUser[0]);
				require(["mustache"], function(Mustache) {

					var maintHTML = Mustache.render(menu_container, dataUser[0]);
					main_content = $("body").find("div#app_container");
					main_content.html(maintHTML);
					avail = true;

					$.getScript("./inc/js/libs/materialize.amd.js"); // invoke materialize js

		        	devicemenu.fadeIn("slow");

		        	refreshHandlers();
					showLoader(false);
				});
	        });
		}

        function loadHtml(content, callback) {

        	if (content === "main" && isEmpty(menu_container)) {
		        $.get('inc/templates/devicemenu/device-menu.mustache', function(data) {
		            menu_container = data;
		            if (callback) callback();
		        });
        	} else {
        		if (callback) callback();
        	}
        }

        return {
            init: function(data) {
            	dataUser = data.user;
            	loadMenu();
            },
            destroy: function() {
                removeHandlers();
            }

        };
		
    })();

    return devicemenu;

});