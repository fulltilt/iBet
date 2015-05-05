'use strict';

app.controller('HomeController', function($scope, $stateParams, toaster, Bet, Auth, Comment, Stake) {
	$scope.searchBet = '';
	$scope.bets = Bet.all;
	$scope.signedIn = Auth.signedIn;
	$scope.listMode = true;
	$scope.user = Auth.user;

	if($stateParams.betId) {
		var bet = Bet.getBet($stateParams.betId).$asObject();
		$scope.listMode = false;
		setSelectedBet(bet);
	};

	function setSelectedBet(bet) {
		$scope.selectedBet = bet;

		if ($scope.signedIn()) {
			// Check if the current login used has already made an stake for selected item
			Stake.isStakeed(bet.$id)
				.then(function(data) {
					$scope.alreadyStakeed = data;
				});

			$scope.isBetCreator = Bet.isCreator;
			$scope.isOpen = Bet.isOpen;
			$scope.isAssignee = Bet.isAssignee;
			$scope.isCompleted = Bet.isCompleted;
		}

		$scope.comments = Comment.comments(bet.$id);
		$scope.stakes = Stake.stakes(bet.$id);
		$scope.block = false;	// block is used to enforce stake conditions
		$scope.isStakeMaker = Stake.isMaker;
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

	$scope.makeStake = function() {
		var stake = {
			total: $scope.total,
			uid: $scope.user.uid,
			name: $scope.user.profile.name,
			gravatar: $scope.user.profile.gravatar
		};

		Stake.makeStake($scope.selectedBet.$id, stake)
			.then(function() {
				toaster.pop('success', 'Your stake has been placed');
				$scope.total = '';
				$scope.block = true;
				$scope.alreadyStakeed = true;
			});
	};

	$scope.cancelStake = function(stakeId) {
		Stake.cancelStake($scope.selectedBet.$id, stakeId)
			.then(function() {
				toaster.pop('success', 'Your stake has been cancelled.');

				$scope.alreadyStakeed = false;
				$scope.block = false;
			});
	};

	$scope.acceptStake = function(stakeId, runnerId) {
		Stake.acceptStake($scope.selectedBet.$id, stakeId, runnerId)
			.then(function() {
				toaster.pop('success', 'Stake is accepted.');
			});
	};

	$scope.completeBet = function(betId) {
		Bet.completeBet(betId)
			.then(function() {
				toaster.pop('success', 'Congratulations! You have compeleted this bet!');
			});
	};
});