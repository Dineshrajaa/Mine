angular.module('starter.controllers')

.controller('employmentCtrl', function($rootScope, $scope, $state, $stateParams, DBService) {

    alert(JSON.stringify($stateParams.myParam));

    if ($stateParams.myParam != null) {
        $scope.emp = { "emailid": $stateParams.myParam.emailid };


    }

    $scope.addemployment = function() {
        alert($scope.emp.emailid);

        DBService.writeData(queries.insertRecord.addEmployment, [$scope.emp.employername, $scope.emp.startdate, $scope.emp.enddate, $scope.emp.comments, $scope.emp.emailid]).then(function(res) {

            params = { "myParam": $stateParams.myParam };
            $state.go('landing.profile',params);
        });


    }


});
