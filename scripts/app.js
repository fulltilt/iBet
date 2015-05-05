'use strict';

var app = angular
  .module('iBetApp', [
    'ngAnimate',
    'ngResource',    
    'firebase',
    'ui.router',
    'toaster',
    'angularMoment'
  ])
  .constant('FURL', 'https://ibet.firebaseio.com/')
  .run(function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams,  error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the login page
      if (error === 'AUTH_REQUIRED') {
        $state.go('login');
      }
    });
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "views/home.html",
        controller: "HomeController",
        cache: false
      })
      .state("login", {
        url: "/login",
        templateUrl: "views/login.html",
        controller: "AuthController",
        cache: false
      })
      .state("register", {
        url: "/register",
        templateUrl: "views/register.html",
        controller: "AuthController",
        cache: false
      })
      .state("browse", {
        url: "/browse/:taskId",
        templateUrl: "views/browse.html",
        controller: "BrowseController",
        cache: false
      })
      .state("dashboard", {
        url: "/dashboard",
        templateUrl: "views/dashboard.html",
        controller: "DashboardController",
        resolve: {
          currentAuth: function(Auth) {
            return Auth.requireAuth();
          }
        },
        cache: false
      });
    
    $urlRouterProvider.otherwise('/');
  });