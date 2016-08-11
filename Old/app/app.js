var express = require('express');
var app = express();

app.use('/app', express.static('app'));

app.get('/', function (req, res) {
  res.send('Hello From Money App!');
});

app.get('/validatePassport', function (req, res) {
  var idCardFront = req.query.idCardFront,
  idCardBack = req.query.idCardBack,
  uid = req.query.uid,
  result = {
    'allow': false,
    'uid': uid,
    'by':1,
    'validUntil': new Date(Date.now() + 94608000000) // Next time to check documents is in 3 years
  };

  //TODO: do analyse
  //TODO: check data

  //Testing
    //allow all
    result.allow = true;

  res.send(result);
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});


/*
  var offers = [
    {
      id: 1,
      first_name: "John",
      last_name: "Cena",
      amount: 50,
      picture: "http://zblogged.com/wp-content/uploads/2015/11/17.jpg",
      details: "I am registering my software company and I am lookin for needed resources to do that. Please help me!",
      score: 97,
      about: "In this text user must tell about it self: passion, hobbies, friends...",
      age: 52,
      likes: ['briefcase', 'bicycle', 'language', 'mobile', 'automobile'],
      loansCount: 5,
      recomendationCount: 4,
      socialMedia: [
        "https://www.facebook.com/profile.php?id=100004701122385&fref=nf",
        "https://www.linkedin.com/in/tim-borovkov-8a8ba4b5"
      ],
      payback: [2016,08,01]
    },
    {
      id: 2,
      first_name: "Adam",
      last_name: "Levine",
      amount: 25,
      picture: "http://static.eharmony.com/blog/wp-content/uploads/2010/04/eHarmony-Blog-profile-picture.jpg",
      details: "I need money to go and see the new avangers! Please help me to do that :)",
      score: 86,
      about: "In this text user must tell about it self: passion, hobbies, friends...",
      age: 32,
      likes: ['apple', 'futbol-o', 'code'],
      loansCount: 1,
      recomendationCount: 0,
      socialMedia: [
        "https://www.facebook.com/karri.liikkanen",
        "https://twitter.com/dragental"
      ],
      payback: [2016,07,10]
    }
  ];
  //var d = new Date(2016,7,10); == year, month - 1, day
*/
