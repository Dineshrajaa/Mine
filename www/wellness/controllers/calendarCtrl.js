angular.module('starter.controllers')
    .controller('calendarCtrl', function($scope, $state, $stateParams, DBService, $ionicHistory) {
        $scope.onezoneDatepicker = {
            date: new Date(), // MANDATORY 
            showDatepicker: true,
            calendarMode: true                    
                /*mondayFirst: false,
                months: months,
                daysOfTheWeek: daysOfTheWeek,
                startDate: startDate,
                endDate: endDate,
                disablePastDays: false,
                disableSwipe: false,
                disableWeekend: false,
                disableDates: disableDates,
                disableDaysOfWeek: disableDaysOfWeek,
                showDatepicker: false,
                showTodayButton: true,
                calendarMode: false,
                hideCancelButton: false,
                hideSetButton: false,
                highlights: highlights,
                callback: function(value) {
                    // your code
                }*/
        };
    })
