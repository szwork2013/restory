// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('socialCloud', ['ionic', 'socialCloud.controllers', 'socialCloud.services', 'chart.js'])

.run(function ($ionicPlatform, $rootScope, $ionicPopup, $ionicHistory) {
    
    
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
    
    navigator.splashscreen.hide();
    
    $ionicPlatform.registerBackButtonAction(function(e){
        
        function showConfirm() {
            var confirmPopup = $ionicPopup.confirm({
              title: '<strong>Exit Restory?</strong>',
              template: 'Are you sure you want to exit Restory?'
            });

            confirmPopup.then(function(res) {
              if (res) {
                ionic.Platform.exitApp();
              } else {
                // Don't close
              }
            });
        }
        
    if ($rootScope.backButtonPressedOnceToExit) {
      ionic.Platform.exitApp();
    }

    else if ($ionicHistory.backView()) {
      $ionicHistory.goBack();
    }
    else {
      showConfirm();
    }
    e.preventDefault();
    return false;
  },101);
    
})

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    .state('login', {
        cache: false,
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })
    
    .state('intro', {
        cache: false,
        url: '/intro',
        templateUrl: 'templates/intro.html',
        controller: 'IntroCtrl'
    })

    // Each tab has its own nav history stack:

    .state('tab.profile', {
        cache: false,
        url: '/profile',
        views: {
            'tab-profile': {
                templateUrl: 'templates/tab-profile.html',
                controller: 'ProfileCtrl'
            }
        }
    })
    
    .state('tab.profile-mood-chart', {
            url: '/profile/:username',
            views: {
                'tab-profile': {
                    templateUrl: 'templates/profile-mood-chart.html',
                    controller: 'MoodChartCtrl'
                }
            }
        })

    .state('tab.chats', {
            cache: false,
            url: '/chats',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/tab-chats.html',
                    controller: 'ChatsCtrl'
                }
            }
        })
    
        .state('tab.chat-detail', {
            url: '/chats/:chatName',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })

    .state('tab.learn', {
        cache: false,
        url: '/learn',
        views: {
            'tab-learn': {
                templateUrl: 'templates/tab-learn.html',
                controller: 'LearnCtrl'
            }
        }
    })
        .state('tab.learn-detail', {
        cache: false,
            url: '/learn/:contentpage',
            views: {
                'tab-learn': {
                    templateUrl: 'templates/learn-detail.html',
                    controller: 'LearnDetailCtrl'
                }
            }
        })
    
    
    .state('register', {
        cache: "false",
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
    })
    
    .state('terms-and-conditions', {
        cache: "false",
        url: '/termsAndConditions',
        templateUrl: 'templates/terms-and-condtions.html',
        controller: 'TermsConditionsCtrl'
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});