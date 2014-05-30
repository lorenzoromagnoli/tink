'use strict';

/**
 * The main Sails Angular app module
 *
 * @type {angular.Module}
 */
var app = angular.module('app', [
	'ui.router',
	'ui.bootstrap', 
	'app.project',
	'app.cObject',
    'app.cOData',
    'app.cOTrigger',
    'app.cOAction',
    'app.connection',
	'ngResource',
    'ngAnimate',
    'ui.ace',
	 
	]);

app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            // For unmatched routes:
            $urlRouterProvider.otherwise('/');

            // states for my app
            $stateProvider              
                .state('edit', {
                    url: '/',

                })
                 .state('prova', {
                })
        }
    ])
    .config(['$locationProvider',
        function($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ]);

app.config(function($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
    $sceProvider.enabled(false);
});



    
