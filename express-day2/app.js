var express = require('express');
var app = express();
let ejs = require('ejs');
app.set('view engine', 'ejs');

var data = {
  "name": "Champions League (Europe) 2017/18",
  "groups": [
    {
      "name": "Group A",
      "teams": [
        {
          "key": "benfica",
          "name": "Benfica",
          "code": "SLB",
          "country": {
            "key": "pt",
            "name": "Portugal"
          }
        },
        {
          "key": "cskamoskva",
          "name": "CSKA Moskva",
          "code": "CSKA",
          "country": {
            "key": "ru",
            "name": "Russia"
          }
        },
        {
          "key": "manutd",
          "name": "Manchester United",
          "code": "MUN",
          "country": {
            "key": "eng",
            "name": "England"
          }
        },
        {
          "key": "basel",
          "name": "FC Basel 1893",
          "code": "BAS",
          "country": {
            "key": "ch",
            "name": "Switzerland"
          }
        }
      ]
    },
    {
      "name": "Group B",
      "teams": [
        {
          "key": "anderlecht",
          "name": "Anderlecht",
          "code": "RSC",
          "country": {
            "key": "be",
            "name": "Belgium"
          }
        },
        {
          "key": "celtic",
          "name": "Celtic",
          "code": "CEL",
          "country": {
            "key": "sco",
            "name": "Scotland"
          }
        },
        {
          "key": "bayern",
          "name": "FC Bayern München",
          "code": "FCB",
          "country": {
            "key": "de",
            "name": "Germany"
          }
        },
        {
          "key": "paris",
          "name": "Paris SG",
          "code": "PSG",
          "country": {
            "key": "fr",
            "name": "France"
          }
        }
      ]
    },
    {
      "name": "Group C",
      "teams": [
        {
          "key": "qarabag",
          "name": "Qarabağ FK",
          "code": "QFK",
          "country": {
            "key": "az",
            "name": "Azerbaijan"
          }
        },
        {
          "key": "chelsea",
          "name": "Chelsea",
          "code": "CHE",
          "country": {
            "key": "eng",
            "name": "England"
          }
        },
        {
          "key": "atletico",
          "name": "Atlético",
          "code": "ATL",
          "country": {
            "key": "es",
            "name": "Spain"
          }
        },
        {
          "key": "roma",
          "name": "Roma",
          "code": "ROM",
          "country": {
            "key": "it",
            "name": "Italy"
          }
        }
      ]
    },
    {
      "name": "Group D",
      "teams": [
        {
          "key": "sportinglisboa",
          "name": "Sporting Lisboa",
          "code": "SCP",
          "country": {
            "key": "pt",
            "name": "Portugal"
          }
        },
        {
          "key": "olympiacos",
          "name": "Olympiakos Piräus",
          "code": "OLY",
          "country": {
            "key": "gr",
            "name": "Greece"
          }
        },
        {
          "key": "barcelona",
          "name": "Barcelona",
          "code": "FCB",
          "country": {
            "key": "es",
            "name": "Spain"
          }
        },
        {
          "key": "juventus",
          "name": "Juventus",
          "code": "JUV",
          "country": {
            "key": "it",
            "name": "Italy"
          }
        }
      ]
    },
    {
      "name": "Group E",
      "teams": [
        {
          "key": "spartak",
          "name": "Spartak",
          "code": "SMO",
          "country": {
            "key": "ru",
            "name": "Russia"
          }
        },
        {
          "key": "maribor",
          "name": "Maribor",
          "code": "FKM",
          "country": {
            "key": "si",
            "name": "Slovenia"
          }
        },
        {
          "key": "liverpool",
          "name": "Liverpool",
          "code": "LIV",
          "country": {
            "key": "eng",
            "name": "England"
          }
        },
        {
          "key": "sevilla",
          "name": "Sevilla",
          "code": "SEV",
          "country": {
            "key": "es",
            "name": "Spain"
          }
        }
      ]
    },
    {
      "name": "Group F",
      "teams": [
        {
          "key": "feyenoord",
          "name": "Feyenoord",
          "code": "FEY",
          "country": {
            "key": "nl",
            "name": "Netherlands"
          }
        },
        {
          "key": "donezk",
          "name": "Shakhtar Donetsk",
          "code": "SHK",
          "country": {
            "key": "ua",
            "name": "Ukraine"
          }
        },
        {
          "key": "mancity",
          "name": "Manchester City",
          "code": "MCI",
          "country": {
            "key": "eng",
            "name": "England"
          }
        },
        {
          "key": "napoli",
          "name": "Napoli",
          "code": "NAP",
          "country": {
            "key": "it",
            "name": "Italy"
          }
        }
      ]
    },
    {
      "name": "Group G",
      "teams": [
        {
          "key": "porto",
          "name": "Porto",
          "code": "FCP",
          "country": {
            "key": "pt",
            "name": "Portugal"
          }
        },
        {
          "key": "besiktas",
          "name": "Beşiktaş JK",
          "code": "BJK",
          "country": {
            "key": "tr",
            "name": "Turkey"
          }
        },
        {
          "key": "leipzig",
          "name": "RB Leipzig",
          "code": "RBL",
          "country": {
            "key": "de",
            "name": "Germany"
          }
        },
        {
          "key": "monaco",
          "name": "AS Monaco",
          "code": "ASM",
          "country": {
            "key": "mc",
            "name": "Monaco"
          }
        }
      ]
    },
    {
      "name": "Group H",
      "teams": [
        {
          "key": "apoel",
          "name": "APOEL",
          "code": "APL",
          "country": {
            "key": "cy",
            "name": "Cyprus"
          }
        },
        {
          "key": "dortmund",
          "name": "Borussia Dortmund",
          "code": "BVB",
          "country": {
            "key": "de",
            "name": "Germany"
          }
        },
        {
          "key": "tottenham",
          "name": "Tottenham Hotspur",
          "code": "TOT",
          "country": {
            "key": "eng",
            "name": "England"
          }
        },
        {
          "key": "madrid",
          "name": "Real Madrid",
          "code": "RMD",
          "country": {
            "key": "es",
            "name": "Spain"
          }
        }
      ]
    }
  ]
}

app.get('/', function(request,response){
     response.render('groups', {groups: data.groups, name: data.name});
});

app.get('/groups/:name', function(request,response){
     groups = ['A','B','C','D','E','F','G','H'];
     let index = groups.indexOf(request.params.name);
     console.log(index);
     response.render('teams', {group: data.groups[index]});
});

app.get('/groups/:name/:teamname', function(request,response){
     groups = ['A','B','C','D','E','F','G','H'];
     let index = groups.indexOf(request.params.name);
     console.log(index);
     let teams = data.groups[index].teams;
     var team = {};
     for (let jndex = 0; jndex < teams.length; jndex++){
          if (teams[jndex].key == request.params.teamname){
               team = teams[jndex];
               console.log(teams[jndex]);
          }
     }
     response.render('teamdetails', {team: team});
});

app.listen(3000, function(){
     console.log('Example app listening on port 3000!');
});
