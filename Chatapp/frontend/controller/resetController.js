/*
*  purpose: chatapp
*  @file: resetController.js
*  @author: Snehal Patil<snehalppatil9@gmail.com>
*  @since:02/04/2019
*/
app.controller('resetController', function ($scope, $stateParams,resetservices) {
    //console.log($stateParams.token);
    
    // for registration form
    $scope.resetPassword = function () {
        var user = {
            'password': $scope.password,
            'cpassword': $scope.cpassword
        }
        //validation for password
        var passw = /^[A-Za-z]\w{7,14}$/;
        if (passw.test($scope.password) == false) {
            alert("Something went wrong.....try again")
            return false;
        }
        //validation for confirm password
        var cpassw = /^[A-Za-z]\w{7,14}$/;
        if (cpassw.test($scope.cpassword) == false) {
            alert("Something went wrong.....try again")
            return false;
        }
        // console.log("register calling", user);
        //it checks password and confirm password matching or not
        if ($scope.password != $scope.cpassword) {
            alert("password and confirm password not match.....please try again...")
            $scope.message = "password and confirm password not match.....please try again...";
        } else {
            resetservices.resetPassword(user, $scope,$stateParams.token);
        }
    }
});