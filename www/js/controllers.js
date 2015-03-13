angular.module('starter.controllers', [])

app.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope, $state) {
  
  $rootScope.$state = $state;
            
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});


app.controller('HomeCtrl', function($rootScope, $scope, $state, $http, apiUrl) {

    $scope.navTitle='<img class="title-image" src="img/event-logo.png" />';
    
    $http.get(apiUrl+'events').
        success(function(data, status, headers, config) {
          console.log(data);
          $scope.data = data[0];
        }).
        error(function(data, status, headers, config) {
          $scope.data.title = 'Please check your internet connection';
        });

});

app.controller('ScheduleCtrl', function($rootScope, $filter, $scope, $state, $http, apiUrl, eventId, localStorageService) {
    
    //localStorageService.remove('favs');
    
    $scope.getFavs = function(){
      $scope.favsList = localStorageService.get('favs');  
    };
    $scope.getFavs();
    
    $scope.getSchedule = function(){
        $http.get(apiUrl+'event/'+eventId+'/schedule').
        success(function(data, status, headers, config) {
          
            if(localStorageService.get('favs') === null){ 
                var favs = [];
            } else {
                var favs = localStorageService.get('favs');
            }
          
            $scope.scheduleList = data;
            angular.forEach($scope.scheduleList, function(scheduleItem, key){
              var startDate = new Date(scheduleItem.start);
              var endDate = new Date(scheduleItem.end);
              scheduleItem.date = $filter('date')(startDate, 'dd-MM-yyyy');
              scheduleItem.startTime = $filter('date')(startDate, 'hh:mm');
              scheduleItem.endTime = $filter('date')(endDate, 'HH:mm');
              
            for (var i = 0; i < favs.length; i++) {
                if (favs[i].id === scheduleItem.id){
                    scheduleItem.fav = true;   
                }
                if (!scheduleItem.fav){
                    scheduleItem.fav = false;
                }
            }
              
          });
          
        }).
        error(function(data, status, headers, config) {
          $scope.data = 'Please check your internet connection';
        });
    };
    $scope.getSchedule();
    
    $scope.setFav = function(item){
                
        if(localStorageService.get('favs') === null){ 
            var favs = [];
        } else {
            var favs = localStorageService.get('favs');
        }
        console.log(favs);
        
        var index = null;
        
        for (var i = 0; i < favs.length; i++) {
    
            if (favs[i].id === item.id){
                index = i;
                break;
            }
        }

        if (index !== null) {
            console.log('item exists, will be deleted');
            favs.splice(index, 1);
            localStorageService.set('favs', favs);
            console.log(favs);
        } else {
            console.log('items does not exist, will be added');
            favs.push(item);
            localStorageService.set('favs', favs);
        }
        
        $scope.getSchedule();
        $scope.getFavs();
        
    }; //end of setFav

});

app.controller('InfoCtrl', function($rootScope, $scope, $state, $http, apiUrl, eventId) {

    $http.get(apiUrl+'event/'+eventId+'/info-pages').
        success(function(data, status, headers, config) {
          
          $scope.infoPages = data;
          console.log(data);
        }).
        error(function(data, status, headers, config) {
          $scope.data = 'Please check your internet connection';
        });

});

app.controller('SpeakersCtrl', function($rootScope, $scope, $state, $http, apiUrl, eventId) {

    $http.get(apiUrl+'event/'+eventId+'/speakers').
        success(function(data, status, headers, config) {
          
          $scope.speakersList = data;
          console.log(data);
        }).
        error(function(data, status, headers, config) {
          $scope.data = 'Please check your internet connection';
        });

});

app.controller('NewsCtrl', function($rootScope, $scope, $state, $http){
    
    $http.jsonp('http://www.mobileconventionlondon.uk/?feed=json&callback=JSON_CALLBACK').
        success(function(data, status, headers, config) {
          $scope.newsList = data;
          console.log(data);
        }).
        error(function(data, status, headers, config) {
          $scope.data = 'Please check your internet connection';
        });
    
});

app.controller('VotingCtrl', function($rootScope, $scope, $state, $http, apiUrl, eventId) {

    $http.get(apiUrl+'event/'+eventId+'/votes').
        success(function(data, status, headers, config) {
          
          $scope.questionsList = data;
          console.log(data);
        }).
        error(function(data, status, headers, config) {
          $scope.data = 'Please check your internet connection';
        });

}); 


app.controller('FavsCtrl', function($rootScope, $scope, $state, $http, localStorageService) {

    $scope.favsList = localStorageService.get('favs');

}); 