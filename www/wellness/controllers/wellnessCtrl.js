angular.module('starter.controllers')


// .controller('wellnessListCtrl', function($scope,$state,$stateParams) {



//        $scope.menuItemsList=[{"name":"Allergies"},{"name":"Vaccines"},{"name":"Medical History"},{"name":"Social History"},{"name":"Drugs"},{"name":"Past Surgeries"},{"name":"Doctor Visits"},{"name":"Ongoing Biometry"},{"name":"Current Conditions"},{"name":"Medical Tests"},{"name":"Admin Data"},{"name":"Event"},{"name":"Reminder"},{"name":"Notes"},{"name":"About Us"}];


//       $scope.itemClick=function(item){

//     $scope.WN={"emailid":$stateParams.myParam.emailid};

//   params={'myParam' :{'emailid':$scope.WN.emailid}};



//  if(item.name=="About Us"){

//    $state.go('landing.aboutUs');

//  }else if(item.name=="Notes"){
//    $state.go('landing.notes',params);
//  }else if(item.name=="Reminder"){
//    $state.go('landing.reminder',params);
//  }
//  else if(item.name=="Event"){
//    $state.go('landing.events',params);
//  }
//   else if(item.name=="Admin Data"){
//    $state.go('landing.adminData',params);
//  }
//   else if(item.name=="Allergies"){
//    $state.go('landing.allergieslist',params);
//  }

//   else if(item.name=="Vaccines"){
//    $state.go('landing.vaccineslist',params);
//  }

//    else if(item.name=="Medical History"){
//    $state.go('landing.medicalHistorylist',params);
//  }

//    else if(item.name=="Social History"){
//  $state.go('landing.sociallist',params);
//  }

//     else if(item.name=="Drugs"){

//    $state.go('landing.drugslist',params);
//  }

//      else if(item.name=="Past Surgeries"){
//    $state.go('landing.surgerieslist',params);
//  }

//       else if(item.name=="Doctor Visits"){
//    $state.go('landing.doctorvisitlist',params);
//  }

//        else if(item.name=="Ongoing Biometry"){
//    $state.go('landing.biometry',params);
//  }

//  else if(item.name=="Current Conditions"){
//    $state.go('landing.currentconditions',params);
//  }

//  else if(item.name=="Medical Tests"){
//    $state.go('landing.medicaltests',params);
//  }

//       }













//  })




.controller('menuCtrl', function($scope, $stateParams, $state, myService, $location) {
    //alert(JSON.stringify($stateParams.myParam));


    $scope.menuItemsList = [{ "name": "Go To Profile" }, { "name": "Allergies" }, { "name": "Vaccines" }, { "name": "Medical History" }, { "name": "Social History" }, { "name": "Drugs" }, { "name": "Past Surgeries" }, { "name": "Doctor Visits" }, { "name": "Ongoing Biometry" }, { "name": "Current Conditions" }, { "name": "Medical Tests" }, { "name": "Admin Data" }, { "name": "Event" }, { "name": "Reminder" }, { "name": "Notes" }, { "name": "Calendar" }, { "name": "About Us" }];

    $scope.a = [];
    $scope.a = myService.get();
    //alert(JSON.stringify($scope.a));

    $scope.itemClick = function(item) {

        //alert(JSON.stringify($scope.a.myParam.emailid));

        $scope.WN = { "emailid": $scope.a.myParam.emailid };

        params = { 'myParam': { 'emailid': $scope.WN.emailid } };

        if (item.name == "Go To Profile") {

            $state.go('landing.profileSetup');
            //window.location.reload();


        } else if (item.name == "About Us") {

            $state.go('menu.aboutUs');

        } else if (item.name == "Notes") {
            $state.go('menu.notes', params);
        } else if (item.name == "Reminder") {
            $state.go('menu.reminder', params);
        } else if (item.name == "Event") {
            $state.go('menu.events', params);
        } else if (item.name == "Admin Data") {
            $state.go('menu.adminData', params);
        } else if (item.name == "Allergies") {
            $state.go('menu.allergieslist', params);
        } else if (item.name == "Vaccines") {

            $state.go('menu.vaccineslist', params);
        } else if (item.name == "Medical History") {
            $state.go('menu.medicalHistorylist', params);
        } else if (item.name == "Social History") {
            $state.go('menu.sociallist', params);
        } else if (item.name == "Drugs") {

            $state.go('menu.drugslist', params);
        } else if (item.name == "Past Surgeries") {
            $state.go('menu.surgerieslist', params);
        } else if (item.name == "Doctor Visits") {
            $state.go('menu.doctorvisitlist', params);
        } else if (item.name == "Ongoing Biometry") {
            $state.go('menu.biometry', params);
        } else if (item.name == "Current Conditions") {
            $state.go('menu.currentconditions', params);
        } else if (item.name == "Medical Tests") {
            $state.go('menu.medicaltests', params);
        } else if (item.name == "Calendar") {
            // window.plugins.calendar.openCalendar();
            
            $state.go('menu.calendar', params);
        }

    }
});
