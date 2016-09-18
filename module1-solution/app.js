(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController ($scope) {
  $scope.meal = "";
  $scope.message = "";
  

  $scope.checkLunch = function (meal) {
	var arrayOfMeal = meal.split(",");
	var numberOfNonEmptyMeal = arrayOfMeal.length;
	for(var i=0; i<arrayOfMeal.length; i++) {
		if(!(arrayOfMeal[i].trim())) {
			numberOfNonEmptyMeal--;
		}
	}
    if(numberOfNonEmptyMeal === 0) {
    	return "Please enter data first";
    }
    else if(numberOfNonEmptyMeal < 4) {
    	return "Enjoy!"
    }
    else {
    	return "Too much!";
    }
  };
  $scope.checkLunchClick = function() {
	  $scope.message = $scope.checkLunch($scope.meal);
  }
}

})();
