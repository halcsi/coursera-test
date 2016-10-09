(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoryListController', CategoryListController);


CategoryListController.$inject = ['MenuDataService', 'categories'];
function CategoryListController(MenuDataService, categories) {
  var $ctrl = this;
  $ctrl.categories = categories;
}

})();
