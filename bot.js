
// ***IMPORTANT*** Your Account Name Below (No @)
var hero = 'daniel.dalo';

// ***IMPORTANT*** Your Posting Private Key Below
var herowifkey = '5KaYbS4nHzPPENToUMdyDG4vrA4rKVSQzL5BoCzfbXc4ik1r6gR';

// No need to modify these variables
var steem = require('steem');
var dateTime = require('node-datetime');
const duration = require('pendel');
var sleep = require('thread-sleep');
var dt = dateTime.create();
var totalblocks = 0;
var totalvote = 0;
var count = 0;
var totalcomment = 0;

require('events').EventEmitter.defaultMaxListeners = 100;

//const wif = steem.auth.toWif(hero, herowifkey, 'posting');

//----- Script Started + Show Time
     var starttime = dt.format('Y-m-d H:M:S');
console.log("===================================================================");
console.log("-------------------------------------------------------------------");
console.log("Voting Bot - By @daniel.dalo - Listening to STEEM Network");
console.log("-------------------------------------------------------------------");
console.log("===================================================================");
console.log("---------------- Start Time: " + starttime + " ------------------");
console.log("-------------------------------------------------------------------");
console.log(" ");

//----- Grab Current STEEM Block
steem.api.streamBlockNumber(function(err1, newestblock) {
    totalblocks++
    console.log(" ");
	console.log("-------------------------------------------------------------------");
    console.log("Scanning STEEM Block #" + newestblock);
    console.log("-------------------------------------------------------------------");
    console.log("Blocks Monitored this Session = " + totalblocks);
    console.log("Upvotes This Session = " + totalvote);
    console.log(" ");
	
	var query = {
        //tags: ['story','steemit','fiction','photography','life','introduceyourself','writing'],
        limit: "100"
    };

	steem.api.getDiscussionsByCreated(query, function(err1, result) {
		for (var i=0;i<=99;i++){
			var res = result[i];
			var value = parseFloat(res.pending_payout_value.replace('.',''))/1000;
			var votes = res.net_votes;
			var author = res.author;
			var permlink = res.permlink;
			
			var pt = res.created.replace('T',' ');
			var cm = dateTime.create();
			var cm1 = cm.format('Y-m-d H:M:S');
			var duration = require('pendel');
			var hours = duration.time(pt, cm1).hours-2;
			var minutes = duration.time(pt, cm1).minutes;
			
			var votado = false;
			
			//console.log(err1,res);
			console.log(value + '------' + votes + '----' + author);
			
			if(value >= votes/10 && votes <= 50 && hours >= 0 && minutes >= 15){
				console.log('MATCH: ' + 'value:' + value + ' votes:' + votes +' author:' + author + ' ---> ' + "'"+res.root_title+"'" + ' --- Votado:' + votado);
				
				for(var j=0;j<res.net_votes;j++){
				  if(res.active_votes[j].voter == hero){
					  votado = true;
					  console.log('UPVOTE by: ' + res.active_votes[j].voter + ' ' + '/i:' + i + ' /j:' + j + ' ------ ' + 'MATCH: ' + author + ' ---> ' + "'"+res.root_title+"'" + ' --- Votado:' + votado);
				  }
				}
				
				if(votado == false){
					
					steem.broadcast.vote(
					  herowifkey, // Posting WIF
					  hero, // Voter username
					  author, // Author
					  permlink, // Permlink
					  10000, // Weight (10000 = 100%)
					  function(err3, result3) {
						//console.log(err3, result3);
						console.log('NEW UPVOTE by: ' + hero + ' ------> ' + 'MATCH: ' + author + ' ---> ' + "'"+res.root_title+"'" + ' --- Votado:' + votado);
						sleep(60000);
						totalvote++;
					  }
					);
				}
			}
		}
	});
	
	//sleep(15000);
});

