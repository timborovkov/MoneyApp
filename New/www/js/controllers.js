angular.module('app.controllers', [])

.controller('loginCtrl', function($scope) {

})

.controller('signUpCtrl', function($scope) {
  $scope.whoAreYou = "Stranger";
  $scope.user = {};
  var user = $scope.user;
  user.acceptTerms = false;

  $scope.invest = function(){
    $scope.whoAreYou = "Investor";
  }
  $scope.borrow = function(){
    $scope.whoAreYou = "Borrower";
  }
  $scope.signUp = function(){
    console.log($scope);
    var dataFilled = true;
    if(user.firstName == null || user.firstName.length < 2){
      dataFilled = false;
    }
    if(user.lastName == null || user.lastName.length < 2){
      dataFilled = false;
    }
    if(user.socialSecurityNumber == null || user.socialSecurityNumber.length < 5 || user.socialSecurityNumber.length > 15){
      dataFilled = false;
    }
    if(user.phone == null || user.phone.length < 6 || user.phone.length > 20){
      dataFilled = false;
    }
    if(user.birthday == null || new Date(user.birthday) > new Date().setFullYear(new Date().getFullYear() - 18)){
      dataFilled = false;
    }
    if(user.email == null || user.email.length < 2){
      dataFilled = false;
    }
    if(user.password == null || user.password.length < 2){
      dataFilled = false;
    }
    if(user.passwordRepeat == null || user.passwordRepeat.length < 2){
      dataFilled = false;
    }

    if (dataFilled == false) {
      alert('Please fill all the data fields');
    }else{
      if(user.pin.length != 4){
        alert('Pin must be 4 digits long');
      }else{
        if(user.password !== user.passwordRepeat){
          alert('Passwords don`t match');
        }else{
          if ($scope.whoAreYou == 'Stranger') {
            alert('Please choose are you borrower or investor?')
          }else{
            if (user.acceptTerms == false){
              alert('You must accept terms of use first!');
            }else {
              //TODO sign up new user
              alert('Done');
            }
          }
        }
      }
    }
  }
})

.controller('termsOfUseCtrl', function($scope, $ionicHistory) {
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
})

.controller('connectWithYourBankCtrl', function($scope) {

})

.controller('introductionCtrl', function($scope) {

})

.controller('investorHomeCtrl', function($scope) {

})

.controller('profileCtrl', function($scope) {

})

.controller('investMoneyCtrl', function($scope) {

})

.controller('pleaseEnterYourPinCtrl', function($scope) {

})

.controller('borrowerHomeCtrl', function($scope) {

})

.controller('borrowMoneyCtrl', function($scope) {

})

.controller('borrowerRegistrationCtrl', function($scope) {

})

.controller('investorRegistrationCtrl', function($scope) {

})
