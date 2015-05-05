'use strict';

app.factory('Comment', function(FURL, $firebase) {
	var ref = new Firebase(FURL);

	var Comment = {
		comments: function(betId) {
			return $firebase(ref.child('comments').child(betId)).$asArray();
		},

		addComment: function(betId, comment) {
			var bet_comments = this.comments(betId);
			comment.datetime = Firebase.ServerValue.TIMESTAMP;

			if (bet_comments) {
				return bet_comments.$add(comment);
			}
		}
	};

	return Comment;
});