'use strict';

app.controller('DashboardController', function ($scope, Dashboard, Auth) {
	$scope.initiatedBets = [];
	$scope.offeredBets = [];

	var uid = Auth.user.uid;

	Dashboard.getUserInititatedBets(uid)
		.then(function (bets) {
			for (var i = 0; i < bets.length; i++) {
				$scope.initiatedBets.push(bets[i]);
			}

			$scope.numInititatedBets = $scope.initiatedBets.length;
			// for (var i = 0; i < bets.length; i++) {
			// 	bets[i].type ? $scope.betPoster.push(bets[i]) : $scope.betRunner.push(bets[i]);
			// }

			// $scope.numPoster = $scope.betPoster.length;
			// $scope.numRunner = $scope.betRunner.length;
		});

	Dashboard.getOfferedBets(uid)
		.then(function (bets) {
			for (var i = 0; i < bets.length; i++) {
				$scope.offeredBets.push(bets[i]);
			}

			$scope.numOfferdBets = $scope.offeredBets.length;
			// for (var i = 0; i < bets.length; i++) {
			// 	bets[i].type ? $scope.betPoster.push(bets[i]) : $scope.betRunner.push(bets[i]);
			// }

			// $scope.numPoster = $scope.betPoster.length;
			// $scope.numRunner = $scope.betRunner.length;
		});		
});