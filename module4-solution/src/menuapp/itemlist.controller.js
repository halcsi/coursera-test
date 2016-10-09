(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemListController', ItemListController);

// Version with resolving to 1 item based on $stateParams in route config
ItemListController.$inject = ['$stateParams','MenuDataService', 'items'];
function ItemListController($stateParams, MenuDataService, items) {
  var $ctrl = this;
  $ctrl.items = items.menu_items;
  $ctrl.category = items.category;
  console.log(items);
}

})();
