'user strict';

app.controller('AuthController', function($scope, $location, Auth, toaster) {
	// if user is logged in and tries to go into the login screen, redirect him to home
	if (Auth.signedIn()) {
		$location.path('/');
	}

	$scope.register = function(user) {
		Auth.register(user)
			.then(function() {
				toaster.pop('success', 'Registered successfully.');
				$location.path('/');
			}, function(err) {
				console.log(err)
				toaster.pop('error', 'Oops, something went wrong during registration...');
			});
	};

	$scope.login = function(user) {
		Auth.login(user)
			.then(function() {
				toaster.pop('success', 'Logged in successfully!');
				$location.path('/');
			}, function(err) {
				console.log(err)
				toaster.pop('error', 'Oops, something went wrong while logging in...');
			});
	};

	$scope.changePassword = function(user) {
		Auth.changePassword(user)
			.then(function() {
				// Reset form
				$scope.user.email = '';
				$scope.user.oldPass = '';
				$scope.user.newPass = '';

				toaster.pop('success', 'Password changed successfully!');
			}, function(err) {
				console.log(err)
				toaster.pop('error', 'Oops, something went wrong during password change...');
			});
	};
});