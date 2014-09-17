angular.module("calcApp", ['ngRoute']).
controller("calcController", function($scope, $rootScope){
	$scope.title = "Waitstaff Calculator";


	$scope.calculate = function(){

		var taxValue = ($scope.taxRate / 100) * $scope.baseMealPrice;
		$scope.subtotal = taxValue + $scope.baseMealPrice;
		$scope.tip = ($scope.tipPercentage / 100) * $scope.subtotal;
		$scope.customerTotal = $scope.tip + $scope.subtotal;

		$rootScope.earnings.tipTotal = $rootScope.earnings.tipTotal + $scope.tip;
		$rootScope.earnings.mealCount++;
		$rootScope.earnings.averageTip = $rootScope.earnings.tipTotal / $rootScope.earnings.mealCount;

	};

	$scope.reset = function(){
		$scope.baseMealPrice = 0;
		$scope.taxRate = 0;
		$scope.tipPercentage = 0;

		$scope.subtotal= 0.0;
		$scope.tip = 0.0;
		$scope.customerTotal = 0.0;

		$rootScope.earnings = {tipTotal :0.0, 
		mealCount:0, averageTip:0.0};
		
	};

	$scope.reset();
}).config(function($routeProvider){
	$routeProvider.when('/', {
            templateUrl : './home.html',
            controller : 'calcController'
        }).when('/newMeal',{
        	templateUrl : './newMeal.html',
        	controller: 'calcController'
        }).when('/earnings',{
        	templateUrl : './earnings.html',
        	controller: 'calcController'
        });
});
