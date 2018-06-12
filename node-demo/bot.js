// Matthew Binshtok
// World Cup Twitter Bot

const http = require('http');

var Twit = require("twit");
var config = require("./config");

// API endpoints
const worldcupendpoint = 'http://api.football-data.org/v1/competitions/467';
const fixturesappend = '/fixtures?matchday=1';
const teamsappend = '/teams';
const groupsappend = '/leagueTable';
// !REMOVED MY API KEY

// API key
const options = {
     headers: {
          'X-Auth-Token': apikey,
     }
};

// Teams in World Cup
var teams = populateTeams();
var teamsdata = {};

/* PROCEDURE

     1. go through mentions
          a. favorite each tweet
          b. process team name
     2. construct response tweet
          Tweet format:
               GERMANY (GER)

               Group F
               ⚽ Germany
               ⚽ Mexico
               ⚽ Sweden
               ⚽ South Korea

               next match: GER vs MEX (date/time)
*/

/*T.post('statuses/update', { status: 'the greatest troll has awoke' }, function(err, data, response) {
console.log(data)
})*/


/*http.get(worldcupendpoint+fixturesappend, (resp) => {
let data = '';

// A chunk of data has been recieved.
resp.on('data', (chunk) => {
data += chunk;
});

// The whole response has been received. Print out the result.
resp.on('end', () => {
let newdata = JSON.parse(data);
let matches = newdata.count;
for (let i = 0; i < matches; i++){
let hometeam = newdata.fixtures[i].homeTeamName;
let awayteam = newdata.fixtures[i].awayTeamName;
let date = newdata.fixtures[i].date;
console.log(hometeam + ' v ' + awayteam);
}
//console.log(matches);
});

}).on("error", (err) => {
console.log("Error: " + err.message);
});*/

// populateTeams()
// populates global teams array
function populateTeams(){
     // set return array
     let arr = []
     // get JSON for teams
     http.get(worldcupendpoint+teamsappend, (resp) => {
          let data = '';
          // a chunk of data has been recieved
          resp.on('data', (chunk) => {
               data += chunk;
          });
          // the whole response has been received, parse result
          resp.on('end', () => {
               let newdata = JSON.parse(data);
               let count = newdata.count;
               teamsData = newdata.teams;
               for (let i = 0; i < count; i++){
                    // push each team name (lowercase)
                    arr.push(teamsData[i].name.toLowerCase());
                    console.log(teamsData[i].name + ' (' + teamsData[i].code + ')');
               }
          });
     }).on("error", (err) => {
          console.log("Error: " + err.message);
     });
     // return
     return arr;
}

// generateResponse()
// generates response for given tweet if valid query
// tweets response text back at user
function generateResponse(T, mention){
     var teamname = strip(mention.text);
     // check that tweet contains valid team
     if ( teams.indexOf(teamname.toLowerCase()) >= 0 ){
          // check that this tweet has not already been processed (favorited)
          if (!mention.favorited){
               // favorite the tweet (to avoid re-processing)
               T.post('favorites/create', { id: mention.id_str } );
               // construct tweet body
               var team = toTitleCase(teamname);
               var code = getTeamCode(teamname).toUpperCase();
               var group = getTeamGroup(teamname);
               var newTweet = team + ' (' + code + ')\n\n' + group;
               console.log(newTweet);
               T.post('statuses/update', { status: newTweet }, function(err, data, response) {
                    var newTweetId = data.id_str;
                    console.log("Tweeted: " + newTweetId);
          }
     }
}

// strip()
// strips mention of the twitter handle to isolate team name
function strip(mention){
     console.log(mention);
     return mention.replace('@worldcupbot ', '');
}

// toTitleCase()
// capitalizes first letter of each word
function toTitleCase(str) {
     return str.replace(/\w\S*/g, function(txt){
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
     });
}

function getTeamCode(teamname){
     let i = teams.indexOf(teamname);
     return teamsData[i].code;
}

function getTeamGroup(teamname){
     let str = '';
     http.get(worldcupendpoint+groupsappend, (resp) => {
          let data = '';
          // a chunk of data has been recieved
          resp.on('data', (chunk) => {
               data += chunk;
          });
          // the whole response has been received, parse result
          resp.on('end', () => {
               let newdata = JSON.parse(data);
               let standings = newdata.standings;
               console.log(newdata);
               let groupletter = '';
               let groups = ['A','B','C','D','E','F','G','H'];
               // go through each group until in correct group
               let gindex = 0;
               for (var group in standings){
                    console.log(group);
                    for (teamn in standings[group]){
                         let newteam = JSON.parse(teamn);
                         console.log(newteam.team);
                         if (teamn.team == teamname){
                              groupletter = group[i].group;
                         }
                    }
                    gindex++;
               }
               // add group name to string
               str = "Group ";
               str += groupletter;
               str += '\n';
               // collect group data for relevant group
               let index = groups.indexOf(groupletter);
               for (var team in standings.groupletter){
                    str += '⚽ ';
                    str += team.team;
                    str += '\n';
               }
          });
     }).on("error", (err) => {
          console.log("Error: " + err.message);
     });
     return str;
}

// BOT FUNCTION
setInterval(function(){
     // initialize Twitter session
     var T = new Twit(config)
     // get mentions
     T.get('statuses/mentions_timeline', { screen_name: 'worldcupbot' }, function (err,tweets,response) {
          // while we get a response
          while (err !== undefined){
               // set timeout before function is called
               setTimeout(function(){
                    T.get('statuses/mentions_timeline', { screen_name: 'worldcupbot' }, function (suberror,subdata,subresponse) {
                         error = suberr;
                         tweets = subdata;
                         response = subresponse;
                    });
               },
               60000);
          }
          // pass each tweet to generateResponse function
          tweets.forEach(function(tweet){
               generateResponse(T,tweet);
          });
     });
}, 5000);
