'use strict';

/**
 * The main Sails Angular app module
 *
 * @type {angular.Module}
 */
var app = angular.module('app', [
	'ui.router',
	'ui.bootstrap', 
	'sails.io', 
	'app.project',
	'app.cObject',
	'ngResource',
	 
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

