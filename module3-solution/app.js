(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('RestaurantBasePath', "https://davids-restaurant.herokuapp.com/")
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
	restrict: 'E',
    templateUrl: 'foundItems.html',
    scope: {
      foundItems: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


function FoundItemsDirectiveController() {
  var list = this;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var ctrl = this;
  ctrl.searchTerm = "";
  ctrl.nothingFound = false;
  ctrl.narrowItDown = function() {
	  if(ctrl.searchTerm === "") {
		  ctrl.nothingFound = true;
	  }
	  else {
		  MenuSearchService.getMatchedMenuItems(ctrl.searchTerm).then(function(result) {
			  ctrl.found = result;
			  ctrl.nothingFound = result == null || result.length < 1;
		  });
	  }
  }
  ctrl.dontWant = function (itemIndex) {
	  ctrl.found.splice(itemIndex, 1);
  };
}

MenuSearchService.$inject = ['$http', 'RestaurantBasePath']
function MenuSearchService($http, RestaurantBasePath) {
	  var service = this;

	  service.getMatchedMenuItems = function (searchTerm) {
		  var response = $http({
		      method: "GET",
		      url: (RestaurantBasePath + "/menu_items.json")
		    }).then(function (result)  {
			  var foundItems = [];
			  for (var i = 0; i < result.data.menu_items.length; i++) {
			      if (result.data.menu_items[i].description.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1) {
			        foundItems.push(result.data.menu_items[i]);
			      }
			    }
			  	return foundItems;
			 });
		  return response;
	  };
}
})();
