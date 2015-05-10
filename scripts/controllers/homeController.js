'use strict';

app.controller('HomeController', function($scope, $stateParams, toaster, Bet, Auth, Comment) {
	$scope.searchBet = '';
	$scope.bets = Bet.all;
	$scope.signedIn = Auth.signedIn;
	$scope.listMode = true;
	$scope.user = Auth.user;

	if ($stateParams.betId) {
		var bet = Bet.getBet($stateParams.betId).$asObject();
		$scope.listMode = false;
		setSelectedBet(bet);
	};

	function setSelectedBet(bet) {
		$scope.selectedBet = bet;

		if ($scope.signedIn()) {
			$scope.isBetCreator = Bet.isCreator;
			$scope.isOpen = Bet.isOpen;
			$scope.isAccepted = Bet.isAccepted;
			$scope.isCompleted = Bet.isCompleted;
		}

		$scope.comments = Comment.comments(bet.$id);
		$scope.block = false;	// block is used to enforce bet conditions
	};

	$scope.completeBet = function(betId) {
		Bet.completeBet(betId)
			.then(function() {
				toaster.pop('success', 'This bet is has completed successfully.');
			});
	};

	$scope.cancelBet = function(betId) {
		Bet.cancelBet(betId)
			.then(function() {
				toaster.pop('success', 'This bet is cancelled successfully.');
			});
	};

	$scope.addComment = function() {
		var comment = {
			content: $scope.content,
			name: $scope.user.profile.name,
			gravatar: $scope.user.profile.gravatar
		};

		Comment.addComment($scope.selectedBet.$id, comment)
			.then(function() {
				$scope.content = '';
			});
	};
});