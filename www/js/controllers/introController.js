angular.module('socialCloud.controllers')

// Define controller
.controller('IntroCtrl', IntroCtrl);

// Inject dependencies
IntroCtrl.$inject = ['$scope','$state', '$ionicLoading', '$ionicSlideBoxDelegate', '$ionicHistory', '$ionicNavBarDelegate', 'Resources'];

// Define controller
function IntroCtrl($scope, $state, $ionicLoading, $ionicSlideBoxDelegate, $ionicHistory, $ionicNavBarDelegate, Resources) {
    $ionicNavBarDelegate.showBackButton(false);
    $ionicLoading.hide()
    
    //load questions
    $scope.$on('$ionicView.loaded', function() {
        
        var callback = function(data) {
            
            var divRow = $("<div>");
            divRow.addClass("row");
            
            var divColQuestion = $("<div>");
            divColQuestion.addClass("col-60 item-text-wrap");
            divColQuestion.css("textAlign", "left");
            divColQuestion.css("font-weight", "bold");
            divColQuestion.text(data.question);
            divRow.append(divColQuestion);
            
            var divColSelect = $("<div>");
            divColSelect.addClass("col");
            
            
            //add select options
            var select = $("<select>");
            //add default blank option
            var option = $("<option>");
                option.text("");
                select.append(option);
            
            for (optionItem in data.options) {
                var option = $("<option>");
                option.text(data.options[optionItem]);
                select.append(option);
            }
            divColSelect.append(select);
            
            divRow.append(divColSelect);
            
            
            var label = $("<label>"); 
            label.append(divRow);
            label.addClass("item item-input item-select");
            $scope.questionsDiv = $('#questions');
            $scope.questionsDiv.append(label);
            
        };
        
        Resources.getSurveyQuestions(callback);
    });
    
    // Called to navigate to the main app
    $scope.startApp = function() {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.chats');
    };
        $scope.next = function() {
        $ionicSlideBoxDelegate.next();
    };
        $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
    };
    
    
}