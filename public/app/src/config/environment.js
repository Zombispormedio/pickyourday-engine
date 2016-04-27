angular.module('Application')
    .config(function($stateProvider, $urlRouterProvider, $httpProvider,  $mdThemingProvider){


    $stateProvider
        .state("login", {
        url: "/login",
        onEnter: function ($rootScope) {
            if (getJSONLocal("user")) {

                $rootScope.go("app.normal");
            }
        },
        templateUrl: '/views/login/main.html',
        controller: 'LoginCtrl'      

    })
        .state("app", {
        url: '/',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        templateUrl: '/views/main.html',
        controller: 'AppCtrl',
        abstract:true

    })
        .state("app.normal", {
        url: 'normal',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: '/views/normal/main.html',
                controller: 'NormalCtrl'
            }
        }  
    })
    
    .state("app.slider", {
        url: 'slider',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: '/views/slider/main.html',
                controller: 'SliderCtrl'
            }
        }  
    })
     .state("app.player", {
        url: 'player',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: '/views/player/main.html',
                controller: 'PlayerCtrl'
            }
        }  
    })

    $urlRouterProvider.otherwise("/login");

    $httpProvider.interceptors.push('AuthInterceptor');

   $mdThemingProvider.theme('default')
   .backgroundPalette('teal', {
      'default': '500', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    .primaryPalette('lime', {
      'default': '400', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('teal', {
      'default': '500' // use shade 200 for default, and keep all other shades the same
    });



});

