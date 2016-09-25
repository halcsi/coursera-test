(function() {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
			.controller('ToBuyShoppingController', ToBuyShoppingController)
			.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
			.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyShoppingController.$inject = [ '$scope', "ShoppingListCheckOffService"];

	function ToBuyShoppingController($scope, ShoppingListCheckOffService) {
		var toBuy = this;
		
		toBuy.toBuyItems = ShoppingListCheckOffService.getToBuyItems();
		
		toBuy.buyItem = function(itemIndex) {
			ShoppingListCheckOffService.buyItem(itemIndex);
		}

	}
	AlreadyBoughtShoppingController.$inject = [ '$scope', "ShoppingListCheckOffService"];
	function AlreadyBoughtShoppingController($scope, ShoppingListCheckOffService) {
		var alreadyBought = this;
		
		alreadyBought.alreadyBoughtItems = ShoppingListCheckOffService.getAlreadyBoughtItems();
	}

	function ShoppingListCheckOffService() {
		var service = this;

		// List of shopping items
		var toBuyItems = [];
		var alreadyBoughtItems = [];

		service.addItem = function(array, itemName, quantity) {
			var item = {
				name : itemName,
				quantity : quantity
			};
			array.push(item);
		};
		service.addItem(toBuyItems, 'Shoes', '3 pair');
		service.addItem(toBuyItems, 'Books', '2');
		service.addItem(toBuyItems, 'Coffee', '2 kilo');
		service.addItem(toBuyItems, 'Tee Filter', '100');
		service.addItem(toBuyItems, 'Bread', '2 kilo');

		service.buyItem = function(itemIdex) {
			service.addItem(alreadyBoughtItems, toBuyItems[itemIdex].name, toBuyItems[itemIdex].quantity);
			toBuyItems.splice(itemIdex,1);
		};

		service.getToBuyItems = function() {
			return toBuyItems;
		};
		
		service.getAlreadyBoughtItems = function() {
			return alreadyBoughtItems;
		};
	}

})();
