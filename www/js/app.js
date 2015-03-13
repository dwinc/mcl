// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'angular.filter', 'LocalStorageModule']);


app.value('apiUrl', 'http://eventapp.onesixty.info/api/');
app.value('eventId', '1');

app.run(function($ionicPlatform, $http) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
  $http.defaults.headers.common['x-app-platform'] = 'Android';
  
  var deviceID = '4353453453';
  
  $http.defaults.headers.common['x-app-deviceId'] = deviceID;
  $http.defaults.headers.common['x-app-key'] = 'b44f185c-f405-448b-a83b-6f46ea65f028';
   
  //var deviceID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  //  var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
  //  return v.toString(16);
  // });
  
});



app.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
  
    .state('app.home', {
      url: "/home",
      views: {
        'menuContent': {
          templateUrl: "templates/home.html",
          controller: 'HomeCtrl'
        }
      }
    })
  
    .state('app.schedule', {
      url: "/schedule",
      views: {
        'menuContent': {
          templateUrl: "templates/schedule.html",
          controller: "ScheduleCtrl"
        }
      }
    })

    .state('app.news', {
      url: "/news",
      views: {
        'menuContent': {
          templateUrl: "templates/news.html",
          controller: "NewsCtrl"
        }
      }
    })
    .state('app.newsitem', {
      url: "/newsitem",
      views: {
        'menuContent': {
          templateUrl: "templates/news-item.html"
          
        }
      }
    })
    .state('app.info', {
      url: "/info",
      views: {
        'menuContent': {
          templateUrl: "templates/info.html",
          controller: 'InfoCtrl'
        }
      }
    })
    .state('app.speakers', {
      url: "/speakers",
      views: {
        'menuContent': {
          templateUrl: "templates/speakers.html",
          controller: "SpeakersCtrl"
        }
      }
    })
    .state('app.map', {
      url: "/map",
      views: {
        'menuContent': {
          templateUrl: "templates/map.html"
          
        }
      }
    })
    .state('app.voting', {
      url: "/voting",
      views: {
        'menuContent': {
          templateUrl: "templates/voting.html",
          controller: "VotingCtrl"
        }
      }
    })
    .state('app.favs', {
      url: "/favs",
      views: {
        'menuContent': {
          templateUrl: "templates/favs.html",
          controller: "ScheduleCtrl"
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
