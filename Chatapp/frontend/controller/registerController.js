/*
*  purpose: chatapp
*  @file: fregisterController.js
*  @author: Snehal Patil<snehalppatil9@gmail.com>
*  @since:02/04/2019
*/
app.controller('registerController', function ($scope, registerServices ) {
    // for registration form
    $scope.register = function () {
        var user = {
            'name': $scope.name,
            'email': $scope.email,
            'password': $scope.password,
            'cpassword': $scope.cpassword
        }
        //validation for name
        if($scope.name==""){
            alert('Name must be filled out')
            return false;
        }
        //validation for email
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test($scope.email) == false) {
            alert('Invalid Email Address')
                return (false);
        }
        //validation for password
        var passw = /^[A-Za-z]\w{7,14}$/;
        if (passw.test($scope.password) == false) {
            alert('Wrong.....try again!')
            return false;
        }
        //validation for confirm password
        var cpassw = /^[A-Za-z]\w{7,14}$/;
        if (cpassw.test($scope.cpassword) == false) {
            alert('Wrong.....try again!')
            return false;
        }
        //console.log("register calling", user);
        //it checks password and confirm password matching or not
        if ($scope.password != $scope.cpassword) {
            alert("password and confirm password not match.....please try again...")
           
        } else {
            registerServices.register(user, $scope);
        }
    }
});