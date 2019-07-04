/*
*  purpose: chatapp
*  @file: forgotController.js
*  @author: Snehal Patil<snehalppatil9@gmail.com>
*  @since:02/04/2019
*/
app.controller('forgotController', function ($scope, forgotServices) {
    $scope.forgotPassword = function () {
        var data = {
            'email': $scope.email,
        }
        //validation for email
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test($scope.email) == false) {
            alert('Invalid Email Address');
            return (false);
        }
        forgotServices.forgotPassword(data, $scope);
    }
});

