'use strict';

app.factory('Bet', function(FURL, $firebase, Auth, $q) {
	var ref = new Firebase(FURL);
	var bets = $firebase(ref.child('bets')).$asArray();
	var user = Auth.user;

	var Bet = {
		all: bets,

		getBet: function(betId) {
			return $firebase(ref.child('bets').child(betId));
		},

		getUserBets: function (uid) {
			return $firebase(ref.child('user_bets').child(uid));
		},

		createBet: function(bet) {
			bet.datetime = Firebase.ServerValue.TIMESTAMP;
			var d = $q.defer();

			// check to see if bettee exists, if so, place bet
			Auth.doesUserExist(bet.bettee)
				.then(function(data) {
					if (data !== false) {
						var betteeId = data;
						bets.$add(bet)
							.then(function(newBet) {
								var obj = {
									betId: newBet.key(),
									type: true,
									title: bet.title,
									bettor: bet.bettor
								};

								$firebase(ref.child('bettor_bets').child(bet.bettor)).$push(obj);
								$firebase(ref.child('bettee_bets').child(betteeId)).$push(obj);
							});
					}

					d.resolve(data !== false);	
				}, function() {
		          	d.reject(false);
		        });
			
			return d.promise;

			
		},

		createUserBets: function(betId) {
			Bet.getBet(betId)
				.$asObject()
				.$loaded()
				.then(function(bet) {
					var obj = {
						betId: betId,
						type: false,
						title: bet.title
					};

					return $firebase(ref.child('user_bets').child(bet.bettee)).$push(obj);
				});
		},

		editBet: function(bet) {
			var t = this.getBet(bet.$id);
			return t.$update({
				title: bet.title,
				description: bet.description,
				bettee: bet.bettee,
				total: bet.total
			});
		},

		cancelBet: function(betId) {
			var t = this.getBet(betId);
			return t.$update({
				status: 'cancelled'
			});
		},

		isCreator: function(bet) {
			return (user && user.provider && user.uid === bet.bettor);
		},

		isOpen: function(bet) {
			return bet.status === 'open';
		},

		completeBet: function(betId) {
			var t = this.getBet(betId);
			return t.$update({
				status: 'completed'
			});
		},

		isAssignee: function(bet) {
			return (user && user.provider && user.uid === bet.bettee);
		},

		isCompleted: function(bet) {
			return bet.status === 'completed';
		}
	};

	return Bet;
});