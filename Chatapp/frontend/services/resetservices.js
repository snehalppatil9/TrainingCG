/*
*  purpose: chatapp
*  @file: resetservice.js
*  @author: Snehal Patil<snehalppatil9@gmail.com>
*  @since:02/04/2019
*/
app.service('resetservices', function ($http) {
    this.resetPassword = function (data, $scope,token) {
       // console.log("data on service register ", data);
       $http({
            method: 'POST',
            url: 'http://localhost:8080/resetPassword',
            data: data,
            headers:{
                "token":token
            }  
        }).then(
            function successCallback(response) {
                alert("Success!Password updated")
                //console.log("reset password successfull ");
                var userid = response.data.message[0]._id;
                var name = response.data.message[0].name1;
                var token = response.data.token;
                localStorage.setItem("userid", userid);
                localStorage.setItem("name", name);
                localStorage.setItem("token",token);
                $location.path('dashboard');
               //console.log(response);
                $scope.message = "reset password successfull";
            },
            function errorCallback(response) {
             alert("reset password Unsuccessfull")  
             //console.log("reset password Unsuccessfull ");
             $scope.message =response.data.message.message;
            }
        );
    }
});