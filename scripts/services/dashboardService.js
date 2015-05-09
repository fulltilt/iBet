'use strict';

app.factory('Dashboard', function(FURL, $firebase, $q) {
	var ref = new Firebase(FURL);

	var Dashboard = {
		getUserInititatedBets: function(uid) {
			var defer = $q.defer();

			$firebase(ref.child('bettor_bets').child(uid))
				.$asArray()
				.$loaded()
				.then(function (tasks) {
					defer.resolve(tasks);
				}, function (err) {
					defer.reject();
				});

			return defer.promise;
		},

		getOfferedBets: function(uid) {
			var defer = $q.defer();

			$firebase(ref.child('bettee_bets').child(uid))
				.$asArray()
				.$loaded()
				.then(function (tasks) {
					defer.resolve(tasks);
				}, function (err) {
					defer.reject();
				});

			return defer.promise;
		}
	};

	return Dashboard;
});