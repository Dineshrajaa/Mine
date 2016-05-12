angular.module('starter.controllers')

.controller('createprofileCtrl', function($rootScope, $scope, $state, $stateParams, DBService) {
    $scope.profile = {
        firstname: "",
        color: "color0",
        picture: "picture",
        emailid: ""
    };
    if ($stateParams.myParam != null) {
        $scope.profile.firstname = $stateParams.myParam.firstname;
        $scope.profile.emailid = $stateParams.myParam.emailid;
    }
    $scope.mainColor = "color0";
    $scope.colorProfile1Class = "color0";
    $scope.colorProfile2Class = "color0";
    $scope.colorProfile3Class = "color0";
    $scope.colorProfile4Class = "color0";
    $scope.colorProfileClass = $scope.mainColor;
    $scope.changeColor = function(color) {
        $scope.colorProfileClass = "color" + color;

        $scope.mainColor = "color" + color;
        $scope.profile.color = "color" + color;
    }

    $scope.touch = function(profile, profilePicture) {
        $scope.profile.picture = profilePicture;
    }

    $scope.capturePhoto = function() {

        if (window.cordova != undefined) {
            navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
        } else {
            $rootScope.showAlert(messages.title, messages.errors.E005);
        }

        function onSuccess(imageURI) {
            $scope.profile.picture = imageURI;
        }

        function onFail(message) {
            $rootScope.showAlert(messages.title, message);
        }
    }


    $scope.updateProfile = function() {
        if ($stateParams.myParam != null) {
            DBService.updateData(queries.updateRecord.updateProfile, [$scope.profile.color, $scope.profile.picture, $stateParams.myParam.emailid]).then(function(res) {

                params = { 'myParam': $scope.profile };
                $state.go('landing.profile', params);

            });
        } else {

            DBService.writeData(queries.insertRecord.userRegistration, [$scope.profile.firstname, $scope.profile.emailid, $scope.profile.color, $scope.profile.picture]).then(function(res) {

                params = { 'myParam': $scope.profile };
                $state.go('landing.profile', params, { reload: true });
            });
        }


    }







});
