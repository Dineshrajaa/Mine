angular.module('starter.controllers', ['starter.services'])
    .run(function($rootScope, $ionicPopup, $state) {

        $rootScope.showAlert = null;
        $rootScope.emailId = null;
        $rootScope.showAlert = function(title, message) {


            var alertPopup = $ionicPopup.alert({
                title: title,
                template: message
            });

            alertPopup.then(function(res) {});

        }

        ionic.Platform.ready(function() {
            StatusBar.styleBlackOpaque();
            StatusBar.overlaysWebView(false);
        });


    });
