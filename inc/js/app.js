// filename: app.js

// require.js configuration files
require.config({
	baseUrl: 'inc/js',
	paths: {
		// libraries
		'materialize': 'libs/materialize.amd',
		'jquery': 'libs/jquery-2.1.1.min',
		'jqueryui': 'libs/jquery-ui.min',
		'jquerythde': 'libs/jquery.ba-throttle-debounce.min',
		'moment': 'libs/moment.min',
		'mustache': 'libs/mustache.min',
		'bootstrap_sidenav': '../plugins/startbootstrap-simple-sidebar-1.0.5/js/bootstrap.min',
		'sortable': '../plugins/Sortable-master/sortable'
	},
	shim: {
		materialize: {
			deps: ['jquery']
		},
		jqueryui: {
			deps: ['jquery']
		},
		jquerythde: {
			deps: ['jquery', 'jqueryui']
		},
		bootstrap_sidenav: {
			deps: ['jquery']
		},
		sortable: {
			deps: ['jquery']
		}
	}
});

// initialize module
require(['jquery', 'materialize', 'jqueryui', 'jquerythde', 'bootstrap_sidenav', 'sortable'], function($) {
	$(function() {

		$('.tooltipped').tooltip();
		$('.dropdown-button').dropdown();
		$('.materialboxed').materialbox();
		$('.slider').slider();
		$('.carousel').carousel();
		$('.modal-trigger').leanModal();
		$('.parallax').parallax();
		$('.tabs-wrapper .row').pushpin();
		$('ul.tabs').tabs();
		$(".button-collapse").sideNav();
		$('.collapsible').collapsible();
		$('select').material_select();

		require(['app/page-controller'], function(sliding) {
			sliding.init();
		});
		
		// require(['app/landing-controller'], function(slider) {
		// 	slider.init();
		// });
	});
});