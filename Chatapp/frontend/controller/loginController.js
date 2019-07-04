/*
*  purpose: chatapp
*  @file: loginController.js
*  @author: Snehal Patil<snehalppatil9@gmail.com>
*  @since:02/04/2019
*/
//console.log("gbrtyrvg56fthyfrgbthyrftgdgy");
app.controller('loginController', function ($scope, loginServices) {
    //console.log('csk');
    //for login form 
    $scope.login = function () {
        var data = {
            'email': $scope.email,
            'password': $scope.password
        }
        //validation for email
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test($scope.email) == false) {
                alert('Invalid Email Address');
              //  return (false);
        }
        //validation for password
        var passw = /^[A-Za-z]\w{7,14}$/;
        if (passw.test($scope.password) == false) {
            alert('Wrong.....try again!')
            //return false;
        }
        loginServices.login(data, $scope);
        }

       
    });

//console.log('csk');