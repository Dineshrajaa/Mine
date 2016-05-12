angular.module('starter.controllers')
.controller('userRegCtrl', function($rootScope,$scope,$state,DBService,$timeout) {
  $scope.userRegistration={};
  $scope.createuser=function(){
    if(($scope.userRegistration.firstName!="" && $scope.userRegistration.firstName!=undefined) && ($scope.userRegistration.emailId!="" && $scope.userRegistration.emailId!=undefined) ){
      DBService.writeData(queries.insertRecord.userRegistrationFirstTime,[$scope.userRegistration.firstName,$scope.userRegistration.emailId]).then(function(res){
        if(res.rowsAffected==1){
         localStorage.setItem("emailId",$scope.userRegistration.emailId);
         $rootScope.showAlert(messages.title,messages.message.M001);
         $state.go('landing.passwordSetup');
       }else{
         $rootScope.showAlert(messages.title,messages.errors.E001);
       }
     });
    }else{
        $rootScope.showAlert(messages.title,messages.errors.E003);
    }

  }
})


.controller('passwordSetupCtrl', function($rootScope,$scope,$state,DBService) {
  $scope.passwordSetup={
    password:'',
    confirmPassword:''
  };
  $scope.createBtnClicked=false;
  $scope.createStatus=true;
  $scope.onPasswordSetup=function(){
    $scope.createBtnClicked=true;
    if(($scope.passwordSetup.password!= undefined && $scope.passwordSetup.password!= "") && ($scope.passwordSetup.confirmPassword!=undefined && $scope.passwordSetup.confirmPassword!="")){

      if($scope.passwordSetup.password==$scope.passwordSetup.confirmPassword){
$scope.createStatus=true;
        var emailId=localStorage.getItem("emailId");
        DBService.updateData(queries.updateRecord.passwordSetup,[$scope.passwordSetup.password,emailId]).then(function(res){
         $rootScope.showAlert(messages.title,messages.message.M002);
         $state.go('landing.login');
       });
      }else{
        $scope.createStatus=false;
        //$rootScope.showAlert(messages.title,messages.errors.E002); 
      }
    }else{
    
      //$rootScope.showAlert(messages.title,messages.errors.E003);
    }
  }

$scope.passwordChange=function(){
  
   $scope.createStatus=true;
}

$scope.confirmPasswordChange=function(){
  $scope.createStatus=true;
   
}

})


.controller('loginCtrl', function($scope,$state,$rootScope,$ionicPopup,DBService) {
  $scope.loginField={
    password:""
  };
  $scope.loginBtnClicked=false;
  $scope.loginStatus=true;

  if(localStorage.getItem("emailId")!=undefined){
    $scope.emailId=localStorage.getItem("emailId");
    $rootScope.emailId =localStorage.getItem("emailId");
  }else{
    $state.go('landing.userReg');
  }

  $scope.login=function(){
    // DBService.readData(queries.readRecord.login,[$scope.emailId]).then(function(res){
    //   if(res.rows.length!=0){
    //     params={'myParam' :res.rows.item(0)};
    //     if( res.rows.item(0).password==$scope.loginField.password ){
    //       if(localStorage.getItem("firstTime")==undefined){
    //         $state.go('landing.createprofile',params);
    //       }else{
    //         $state.go('landing.profileSetup');
    //       }
    //     }else{
    //       $rootScope.showAlert(messages.title,messages.errors.E004);
    //     }
    //   }
    // });

$scope.loginBtnClicked=true;
if($scope.loginField.password != ""){

  DBService.readData(queries.readRecord.login,[$scope.emailId]).then(function(res){
      if(res.rows.length!=0){
        params={'myParam' :res.rows.item(0)};
        if( res.rows.item(0).password==$scope.loginField.password ){
          $scope.loginStatus=true;
$state.go('landing.welcome');
}else{
  $scope.loginStatus=false;
          //$rootScope.showAlert(messages.title,messages.errors.E004);
        }
      }
  });
}




  }


  $scope.changePassword=function(){

    $scope.loginStatus=true;
  }
  $rootScope.$on('$stateChangeSuccess',
   function(event, toState, toParams, fromState, fromParams){
    if(localStorage.getItem("emailId")!=undefined){
      $scope.emailId=localStorage.getItem("emailId");
      $rootScope.emailId =localStorage.getItem("emailId");
    }else{
      $state.go('landing.userReg');
    }
  });
});
