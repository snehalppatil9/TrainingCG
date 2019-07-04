//here we declare the dependancies
var app = angular.module('chatApp', ['ui.router', 'btford.socket-io']);
app.config(function ($stateProvider, $urlRouterProvider) {
    //$stateProvider provides interfaces to declare these states for app.
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'templates/loginPage.html',
        controller: 'loginController'

    })
    $stateProvider.state('forgotPassword', {
        url: '/forgotPassword',
        templateUrl: 'templates/forgotPass.html',
        controller: 'forgotController'

    })
    $stateProvider.state('resetPassword', {
        url: '/resetPassword/:token',
        templateUrl: 'templates/resetPass.html',
        controller: 'resetController'

    })
    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'templates/registration.html',
        controller: 'registerController'
    })
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: 'templates/dashboard.html',
        controller: 'chatController'
    });
    //urlRouterProvider it sets path default
    $urlRouterProvider.otherwise('login');
});

app.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        //connecting socket io
        ioSocket: io.connect('http://localhost:8080')
    })
}])