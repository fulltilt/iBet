'user strict';

app.controller('BetController', function($scope, $state, toaster, Bet, Auth, Comment) {
	$scope.createBet = function() {
		$scope.bet.status = 'open';
		$scope.bet.gravatar = Auth.user.profile.gravatar;
		$scope.bet.name = Auth.user.profile.name;
		$scope.bet.bettor = Auth.user.uid;

		Bet.createBet($scope.bet)
			.then(function(ref) {
				if (ref === false) {
					toaster.pop('error', 'Error: invalid bettee!');
					return;
				}

				toaster.pop('success', 'Bet created successfully!');
				
				$scope.bet = {
					title: '',
					description: '',
					bettee: '',
					total: '',
					status: 'open',
					gravatar: '',
					name: '',
					bettor: ''
				};
				
				// using $state to redirect inside a controller and passing a parameter
				//$state.go('browse', { betId: ref.key() });
				$state.go('home');
			});
	};

	$scope.editBet = function(bet) {
		Bet.editBet(bet)
			.then(function() {
				toaster.pop('success', 'Bet is updated');
			});
	};

	$scope.acceptBet = function(bet) {
		Bet.acceptBet(bet)
			.then(function() {
				toaster.pop('success', 'Bet has been accepted');
			});
	};
});