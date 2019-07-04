/*
*  purpose: chatapp
*  @file: registerservice.js
*  @author: Snehal Patil<snehalppatil9@gmail.com>
*  @since:02/04/2019
*/
app.service('registerServices', function ($http) {
    this.register = function (data, $scope) {
        console.log("data on service register ", data); 
        $http({
            method: 'POST',
            url: 'http://localhost:8080/register',
            data: data
         }).then(
            function successCallback(response) {
                //console.log("MI");    
                alert("new user registered successfully")
                //console.log("register successfull ");
                console.log(response);
                //$scope.message = "register successfull"; 
            },
            function errorCallback(response) {
             alert("register Unsuccessfully")
            // console.log("register Unsuccessfull ");
             $scope.message =response.data.message.message;


            }
        );
    }
});