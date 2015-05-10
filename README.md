#iBet

iBet is a site where two parties can make bets on anything and everything. There is no fees nor oversight so this site is mainly for fun.

##Usage
A party (bettor) initiates a bet directed at a second party (bettee) which contains a title, description and wager amount. The bettee has the option to accept the bet if they are comfortable with the terms. The creator can edit and cancel the bet at anytime until the bettee has accepted the bet at which point the terms can no longer be changed.

Once the bet is accepted, to complete the bet, the bettor must initiate the completion process by clicking Complete which will put the bet into Pending status. At this point, the bet can be completed once the bettee clicks the Complete button while the bet is in Pending status.

###Dev Notes:
-may be able to consolidate denormalized bettor_bets and bettee_bets
-on a related note, when changing the status of a bet, denormalized tables above currently don't get updated

