'user strict';

app.controller('BetController', function($scope, $location, toaster, Bet, Auth, Comment) {
	$scope.createBet = function() {
		$scope.bet.status = 'open';
		$scope.bet.gravatar = Auth.user.profile.gravatar;
		$scope.bet.name = Auth.user.profile.name;
		$scope.bet.poster = Auth.user.uid;

		Bet.createBet($scope.bet)
			.then(function(ref) {
				toaster.pop('success', 'Bet created successfully!');
				
				$scope.bet = {
					title: '',
					description: '',
					total: '',
					status: 'open',
					gravatar: '',
					name: '',
					poster: ''
				};

				$location.path('/browse/' + ref.key());
			});
	};

	$scope.editBet = function(bet) {
		Bet.editBet(bet)
			.then(function() {
				toaster.pop('success', 'Bet is updated');
			});
	};
});