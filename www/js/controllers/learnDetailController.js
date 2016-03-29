angular.module('socialCloud.controllers')

// Create controller
.controller('LearnDetailCtrl', LearnDetailCtrl);

// Inject dependencies
LearnDetailCtrl.$inject = ['$scope', '$stateParams','$ionicScrollDelegate', '$ionicLoading', 'Resources'];

// Define controller
function LearnDetailCtrl($scope, $stateParams, $ionicScrollDelegate, $ionicLoading, Resources) {
    var resourceId = $stateParams.contentpage;
    $ionicLoading.show({template: 'Loading Content...'});
    $scope.$on('$ionicView.loaded', function() {
        
        var callback = function(content) {
            document.getElementById('content').innerHTML = content;
            $ionicLoading.hide();
        }
        var content = Resources.get(resourceId, callback);
        
    });
    
}