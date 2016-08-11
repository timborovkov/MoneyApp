angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signUp', {
    url: '/signup',
    templateUrl: 'templates/signUp.html',
    controller: 'signUpCtrl'
  })

  .state('termsOfUse', {
    url: '/terms',
    templateUrl: 'templates/termsOfUse.html',
    controller: 'termsOfUseCtrl'
  })

  .state('connectWithYourBank', {
    url: '/connectBank',
    templateUrl: 'templates/connectWithYourBank.html',
    controller: 'connectWithYourBankCtrl'
  })

  .state('introduction', {
    url: '/intro',
    templateUrl: 'templates/introduction.html',
    controller: 'introductionCtrl'
  })

  .state('investorHome', {
    url: '/investorHome',
    templateUrl: 'templates/investorHome.html',
    controller: 'investorHomeCtrl'
  })

  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'profileCtrl'
  })

  .state('investMoney', {
    url: '/investMore',
    templateUrl: 'templates/investMoney.html',
    controller: 'investMoneyCtrl'
  })

  .state('pleaseEnterYourPin', {
    url: '/pin',
    templateUrl: 'templates/pleaseEnterYourPin.html',
    controller: 'pleaseEnterYourPinCtrl'
  })

  .state('borrowerHome', {
    url: '/borrowerHome',
    templateUrl: 'templates/borrowerHome.html',
    controller: 'borrowerHomeCtrl'
  })

  .state('borrowMoney', {
    url: '/borrow',
    templateUrl: 'templates/borrowMoney.html',
    controller: 'borrowMoneyCtrl'
  })

  .state('borrowerRegistration', {
    url: '/registerBorrower',
    templateUrl: 'templates/borrowerRegistration.html',
    controller: 'borrowerRegistrationCtrl'
  })

  .state('investorRegistration', {
    url: '/registerInvestor',
    templateUrl: 'templates/investorRegistration.html',
    controller: 'investorRegistrationCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});