angular.module('starter.controllers')
    .controller('userProfileSetupCtrl', function($scope, $state, $stateParams, $rootScope, DBService, $timeout, myService) {


        //alert($stateParams.myParam.profilePicture);
        $scope.profiles = [];

        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {

                DBService.readData(queries.readRecord.profiles).then(function(res) {
                    params = { 'myParam': res.rows.item(0) };
                    for (var i = 0; i < res.rows.length; i++) {
                        var temp = res.rows.item(i);
                        temp['editItem'] = false;
                        $scope.profiles[i] = temp;
                    }

                });
            });




        DBService.readData(queries.readRecord.profiles).then(function(res) {
            params = { 'myParam': res.rows.item(0) };
            for (var i = 0; i < res.rows.length; i++) {
                var temp = res.rows.item(i);
                temp['editItem'] = false;
                $scope.profiles[i] = temp;
            }
        });









        $scope.loadProfile = function(profile) {

            params = { 'myParam': profile };
            $state.go('menu.allergieslist', params);


            myService.set(params);

        }

        $scope.onHold = function(profile) {
            profile.editItem = !profile.editItem;
        }
        $scope.editProfile = function(profile) {

            params = { 'myParam': profile };
            $state.go('landing.profile', params);
        }
        $scope.deleteProfile = function(profile) {
            //alert(JSON.stringify(profile));


            DBService.deleteData(queries.deleteRecord.deleteProfile, [profile.emailid]).then(function(res) {
                DBService.readData(queries.readRecord.profiles).then(function(res) {
                    $scope.profiles = [];
                    params = { 'myParam': res.rows.item(0) };

                    for (var i = 0; i < res.rows.length; i++) {
                        var temp = res.rows.item(i);
                        temp['editItem'] = false;
                        $scope.profiles[i] = temp;
                    }

                });
            });
        }

        $scope.addProfile = function() {

            params = { 'myParam': null };
            $state.go('landing.createprofile', params);
        }



    })
    .controller('userProfileCtrl', function($scope, $state, $rootScope, $stateParams, DBService) {


        $scope.profile = $stateParams.myParam;
        $scope.employers = {};
        DBService.readData(queries.readRecord.employerDetails, [$scope.profile.emailid]).then(function(res) {

            for (var i = 0; i < res.rows.length; i++) {
                var temp = res.rows.item(i);

                $scope.employers[i] = temp;
            }

        });
        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {

                DBService.readData(queries.readRecord.employerDetails, [$scope.profile.emailid]).then(function(res) {

                    for (var i = 0; i < res.rows.length; i++) {
                        var temp = res.rows.item(i);

                        $scope.employers[i] = temp;
                    }

                });
            });



        $scope.contacts = function() {

            navigator.contacts.pickContact(function(contact) {
                alert('The following contact has been selected:' + JSON.stringify(contact));
                alert(contact.name.givenName);

                $scope.profile.firstname = contact.name.givenName;
                $scope.profile.lastname = contact.name.familyName;


                for (var i = 0; i < contact.phoneNumbers.length; i++) {

                    if (contact.phoneNumbers[i].type == "home") {
                        $scope.profile.phone = contact.phoneNumbers[i].value;
                    }
                    if (contact.phoneNumbers[i].type == "mobile") {
                        $scope.profile.cellphone = contact.phoneNumbers[i].value;
                    }

                }


                $scope.$apply();

            });
        }

        $scope.saveprofile = function() {

            //
            DBService.updateData(queries.updateRecord.updateUserProfile, [$scope.profile.firstname, $scope.profile.lastname, $scope.profile.picture, $scope.profile.dob, $scope.profile.pob, $scope.profile.gender, $scope.profile.bloodgroup, $scope.profile.maritalstatus, $scope.profile.noofkids, $scope.profile.organdonar, $scope.profile.language, $scope.profile.address, $scope.profile.city, $scope.profile.state, $scope.profile.zip, $scope.profile.phone, $scope.profile.cellphone, $scope.profile.emailid]).then(function(res) {
                localStorage.setItem("firstTime", "done");
                $state.go('landing.profileSetup');
            });
        }


        $scope.addemp = function() {

            //alert($scope.profile.emailid);

            params = { 'myParam': $scope.profile };
            $state.go('landing.employment', params);
        }
    });
