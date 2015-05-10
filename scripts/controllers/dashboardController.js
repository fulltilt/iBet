'use strict';

app.controller('DashboardController', function ($scope, Dashboard, Auth) {
	$scope.searchInitBet = '';
	$scope.searchOffBet = '';
	$scope.initiatedBets = [];
	$scope.offeredBets = [];

	var uid = Auth.user.uid;

	Dashboard.getUserInititatedBets(uid)
		.then(function (bets) {
			for (var i = 0; i < bets.length; i++) {
				$scope.initiatedBets.push(bets[i]);
			}

			$scope.numInitiatedBets = $scope.initiatedBets.length;
		});

	Dashboard.getOfferedBets(uid)
		.then(function (bets) {
			for (var i = 0; i < bets.length; i++) {
				$scope.offeredBets.push(bets[i]);
			}

			$scope.numOfferedBets = $scope.offeredBets.length;
		});		
});