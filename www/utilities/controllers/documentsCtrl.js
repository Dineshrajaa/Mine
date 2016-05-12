angular.module('starter.controllers')

.controller('documentsCtrl', function($scope,$state,$rootScope,DBService,$stateParams,$ionicHistory) {
            
$scope.WN={"emailid":$stateParams.myParam.emailid};
       
        //$scope.docsList=[{"title":"document 1"},{"title":"document 2"},{"title":"document 3"},{"title":"document 4"}];
            $scope.docsList=[];
            
            
            DBService.readData(queries.readRecord.documents,[$scope.WN.emailid]).then(function(res){
                                                                                      
                                                                                      for(var i=0;i<res.rows.length;i++){
                                                                                      var temp=res.rows.item(i);
                                                                                      
                                                                                      $scope.docsList[i]=temp;
                                                                                      }
                                                                                      
                                                                                      });
            $rootScope.$on('$stateChangeSuccess',
                           function(event, toState, toParams, fromState, fromParams){
                           
                           DBService.readData(queries.readRecord.documents,[$scope.WN.emailid]).then(function(res){
                                                                                                     
                                                                                                     for(var i=0;i<res.rows.length;i++){
                                                                                                     var temp=res.rows.item(i);
                                                                                                     
                                                                                                     $scope.docsList[i]=temp;
                                                                                                     }
                                                                                                     
                                                                                                     });
                           });

            
            

  $scope.GoBack = function() {
    $ionicHistory.goBack();
  };
       
            
            $scope.TakePhoto=function(){
            
            
                        if(window.cordova!=undefined){
                        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,destinationType: Camera.DestinationType.FILE_URI });
                        }else{
                        $rootScope.showAlert(messages.title,messages.errors.E005);
                        }
            
                        function onSuccess(imageURI) {
                        //$scope.profile.picture = imageURI;
            DBService.writeData(queries.insertRecord.adddocuments,[imageURI,$scope.WN.emailid]).then(function(res){


               DBService.readData(queries.readRecord.documents,[$scope.WN.emailid]).then(function(res){
                
                                                                                                      $scope.docsList=[];
             
                                                                                                     for(var i=0;i<res.rows.length;i++){
                                                                                                     var temp=res.rows.item(i);
                                                                                                     
                                                                                                     $scope.docsList[i]=temp;
                                                                                                     }
                                                                                                     
                                                                                                     });



                                    });
}
            
                        function onFail(message) {
                        $rootScope.showAlert(messages.title,message);
                        }
            
            
            
            
            }
            
            
            
            

            

            
 });
