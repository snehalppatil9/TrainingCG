/*
*  purpose: chatapp
*  @file: forgotservice.js
*  @author: Snehal Patil<snehalppatil9@gmail.com>
*  @since:02/04/2019
*/
app.service('forgotServices', function ($http) {
    this.forgotPassword = function (data, $scope) {
        $http({
            method: 'POST',
            url: 'http://localhost:8080/forgotPassword',
            data: data,
            headers:{
                token:$scope.token
            }
        }).then(
            function successCallback(response) {
                console.log("forgotPassword successfull ");
                var userid = response.data.message[0]._id;
                var name = response.data.message[0].name1;
                var token = response.data.token;
                localStorage.setItem("userid", userid);
                localStorage.setItem("name", name);
                localStorage.setItem("token",token);
                $location.path('dashboard');
                console.log(response);
                $scope.loginMessage = "login successfull";
              
            },
            function errorCallback(response) {
                console.log("register Unsuccessfull ");
                console.log(response);
                $scope.loginMessage = 'Email Id Incorrect ';
            }
        );
    }

});