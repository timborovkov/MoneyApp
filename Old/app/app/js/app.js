  var app = {
    server: "http://localhost:3000/",
    offers: []
  };

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  function getOfferById(id){
    for (var i = 0; i < app.offers.length; i++) {
      var offer = app.offers[i];
      if(offer.id == id){
        return offer;
      }
    }
  }

  function getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      return age;
  }

//********
//Firebase
//********

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAeKZuf-mAFuq01DOnepv3qQ2FceXFIGDE",
    authDomain: "project-4367565704560528864.firebaseapp.com",
    databaseURL: "https://project-4367565704560528864.firebaseio.com",
    storageBucket: "project-4367565704560528864.appspot.com",
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var storage = firebase.storage();

  //User account managment
    function onAuthStateChanged(callback){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var name, email, photoUrl, uid;
          name = user.displayName;
          email = user.email;
          photoUrl = user.photoURL;
          uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                           // this value to authenticate with your backend server, if
                           // you have one. Use User.getToken() instead.
          callback(user);
        } else {
          // No user is signed in.
          callback(null);
        }
      });
    }
    function firebaseLogin(email, password, type, callback){
      switch (type) {
        case "normal":
            var failed = false;
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
              // Handle Errors here.
              failed = true;
              var errorCode = error.code;
              var errorMessage = error.message;
              console.error(errorMessage);
              callback(false);
            });
            setTimeout(function () {
              if(!failed){
                firebaseGetUserData();
                callback(true);
              }
            }, 2000);
          break;
        case "google":
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/plus.login');
            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                var user = result.user;
                firebaseGetUserData();
                callback(true);
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;

                console.error(errorMessage);
                callback(false);
            });
          break;
        case "facebook":
            var provider = new firebase.auth.FacebookAuthProvider();
            provider.addScope('user_birthday');
            firebase.auth().signInWithPopup(provider).then(function(result) {
              // This gives you a Facebook Access Token. You can use it to access the Facebook API.
              var token = result.credential.accessToken;
              var user = result.user;
              firebaseGetUserData();
              callback(true);
            }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              var email = error.email;
              var credential = error.credential;

              console.error(errorMessage);
              callback(false);
            });
          break;
      }
    }
    function firebaseRegister(email, password, callback){
      console.log(email);
      var failed = false;
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        failed = true;
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorMessage);
      });
      setTimeout(function(){
        if(!failed){
          //Done
          console.log(firebase.auth().currentUser.uid);
          callback(firebase.auth().currentUser.uid);
        }else{
          //Error
          callback(false);
        }
      }, 2000)
    }
    function firebaseLogout(){
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        return true;
      }, function(error) {
        // An error happened.
        console.error(error);
        return false;
      });

      setCookie('birthday', null);
      setCookie('firstname', null);
      setCookie('lastname', null);
      setCookie('address', null);
      setCookie('about_me', null);
      setCookie('image', null);
      setCookie('facebook', null);
      setCookie('twitter', null);
      setCookie('instagram', null);
      setCookie('linkedin', null);
      setCookie('likes', null);

      $(".content").load("pages/sign_in.html");
    }
    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

  // Database managment
    function firebaseSetUserData(data){
      database.ref("users/" + firebase.auth().currentUser.uid).set(data);
    }
    function firebaseUpdateUserData(field, data){
      database.ref("users/" + firebase.auth().currentUser.uid + '/' + field).set(data);
    }
    function firebaseGetUserData(){
      var userId = firebase.auth().currentUser.uid;
      database.ref('users/' + userId).once('value').then(function(snapshot) {
        var user = snapshot.val();
        setCookie('birthday', user.birthday);
        setCookie('firstname', user.firstname);
        setCookie('lastname', user.lastname);
        setCookie('about_me', user.about_me);
        setCookie('address', user.address);
        setCookie('picture', user.picture);
        setCookie('facebook', user.facebook);
        setCookie('twitter', user.twitter);
        setCookie('instagram', user.instagram);
        setCookie('linkedin', user.linkedin);
        setCookie('likes', user.likes);
      });
    }
    function firebaseGetOffers(callback) {
      database.ref('offers/').limitToLast(100).once('value').then(function(snapshot) {
        callback(snapshot.val());
      });
    }
    function firebaseGetInfoOnUser(uid, callback) {
      database.ref('users/'+uid+'/').once('value').then(function(snapshot) {
        callback(snapshot.val());
      });
    }
    function firebaseAddOffer(amount, details, payback){
      var borrower = firebase.auth().currentUser.uid,
      offerData = {
        "amount": amount,
        "details": details,
        "payback": payback,
        "borrower": borrower,
        "timestamp": Date.now(),
        "done": false,
        "completedBy": false
      };
      // Get a key for a new offer.
      var newOfferKey = database.ref().child('offers').push().key;

      var updates = {};
      updates['/offers/' + newOfferKey] = offerData;
      updates['/user_offers/' + borrower + '/' + newOfferKey] = offerData;

      return database.ref().update(updates);
    }
    function firebaseAddUser(user, callback){
      var newUser = {
        "about_me": user.about_me,
        "birthday": user.birthday,
        "credit_score": "100",
        "firstname": user.firstname,
        "lastname": user.lastname,
        "likes": user.likes||'[]',
        "address": user.address,
        "loans_count": 0,
        "picture": user.picture,
        "recomendation_count": 0,
        "facebook": user.facebook,
        "twitter": user.twitter,
        "instagram": user.instagram,
        "linkedin": user.linkedin
      };

      setCookie('birthday', user.birthday);
      setCookie('firstname', user.firstname);
      setCookie('lastname', user.lastname);
      setCookie('about_me', user.about_me);
      setCookie('address', user.address);
      setCookie('picture', user.picture);
      setCookie('facebook', user.facebook);
      setCookie('twitter', user.twitter);
      setCookie('instagram', user.instagram);
      setCookie('linkedin', user.linkedin);
      if(user.likes != null){
        setCookie('likes', user.likes);
      }

      var updates = {};
      updates['/users/' + firebase.auth().currentUser.uid] = newUser;

      database.ref().update(updates);
      callback();
    }

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
