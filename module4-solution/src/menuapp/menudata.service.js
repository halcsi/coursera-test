(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http', 'RestaurantBasePath']
function MenuDataService($http, RestaurantBasePath) {
  var service = this;

  service.getAllCategories = function () {
	  var resolve = $http({
	      method: "GET",
	      url: (RestaurantBasePath + "/categories.json")
	    }).then(function (result)  {
			  var foundItems = result;
			  	return foundItems.data;
		});
	  return resolve;
  };
  
  service.getItemsForCategory = function (categoryShortName) {
	  return $http({
	      method: "GET",
	      url: (RestaurantBasePath + "/menu_items.json"), 
	      params: {category: categoryShortName}
	    }).then(function (result)  {
			  var foundItems = result;
			  	return foundItems.data;
		});
  };
}

})();
