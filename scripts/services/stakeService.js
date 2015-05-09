'use strict';

app.factory('Stake', function(FURL, $firebase, $q, Auth, Bet) {
	var ref = new Firebase(FURL);
	var user = Auth.user;

	var Stake = {
		stakes: function(betId) {
			return $firebase(ref.child('stakes').child(betId)).$asArray();
		},

		makeStake: function(betId, stake) {
			var bet_stakes = this.stakes(betId);

			if (bet_stakes) {
				return bet_stakes.$add(stake);
			}
		},

		isStaked: function(betId) {
			if (user && user.provider) {
				var d = $q.defer();

				$firebase(ref.child('stakes').child(betId).orderByChild('uid')
					.equalTo(user.uid))
					.$asArray()
					.$loaded().then(function(data) {
						d.resolve(data.length > 0);
					}, function() {
						d.reject(false);
					});

				return d.promise;
			}
		},

		isBettor: function(stake) {
			return (user && user.provider && user.uid === stake.uid);
		},

		getStake: function(betId, stakeId) {
			return $firebase(ref.child('stakes').child(betId).child(stakeId));
		},

		cancelStake: function(betId, stakeId) {
			return this.getStake(betId, stakeId).$remove();
		},

		acceptStake: function(betId, stakeId, runnerId) {
			var o = this.getStake(betId, stakeId);
			return o.$update({
				accepted: true
			}).then(function() {
				var t = Bet.getBet(betId);
				return t.$update({
					status: 'assigned',
					runner: runnerId
				});
			}).then(function() {
				return Bet.createUserBets(betId);
			});
		}
	};

	return Stake;
});