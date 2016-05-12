angular.module('starter.controllers')

.controller('surgeriesCtrl', function($scope,$state,$stateParams,DBService,$rootScope,$ionicHistory,$ionicPopup) {
    $scope.date=new Date();
  if(localStorage.getItem("navigation")=="edit"){
	$scope.id=$stateParams.myParam.id;



DBService.readData(queries.readRecord.surgeriesedithistory,[$scope.id]).then(function(res){

	                 $scope.details=res.rows.item(0);
	                
	                 $scope.surgeries=$scope.details;


              $scope.surgeries.date=new Date($scope.details.date);
              $scope.surgeries.stayDate=new Date($scope.details.stayDate);
						 		
						 	

						 		});
}
$scope.surgeries={
  name:'',
  date:'',
  result:'',
  hospital:'',
  provider:'',
  comments:'',
  stayname:'',
  stayDate:'',
  stayreason:'',
  stayresult:'',
  stayhospital:'',
  staycomments:''

};

 $scope.surgeries.date=new Date($scope.date);
 $scope.surgeries.stayDate=new Date($scope.date);

$scope.GoBack = function() {
    $ionicHistory.goBack();
  };
   if($stateParams.myParam!=null){
          $scope.surgeries.emailid=$stateParams.myParam.emailid;
          $scope.surgeries.type=null;
            }



 $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title:'Delete Record',
     template: 'Are you sure need to delete the record?',
     cancelText: 'YES',
     okText: 'NO',
     cancelType:'button-assertive',
     okType:'button-positive'
   });

   confirmPopup.then(function(res) {

    if(res==false)
    {
      $scope.delete();
    }
     if(res==true) {
       
     } 
   });
 };

$scope.saveBtnClicked=false;
       $scope.saveSurgery=function(){
        $scope.saveBtnClicked=true;
      //alert(localStorage.getItem("navigation"));

      if($scope.surgeries.name!="" && $scope.surgeries.result!="" && $scope.surgeries.hospital!="" && $scope.surgeries.stayname!="" && $scope.surgeries.stayresult!="" && $scope.surgeries.stayhospital!=""){
        if(localStorage.getItem("navigation")=="edit"){
      

	

//name TEXT,date TEXT,result TEXT,hospital TEXT,provider TEXT,comments TEXT,stayname TEXT,stayDate TEXT,stayreason TEXT,stayresult TEXT,stayhospital TEXT,staycomments TEXT
	 DBService.updateData(queries.updateRecord.updateSurgery,[$scope.surgeries.name,$scope.surgeries.date,$scope.surgeries.result,$scope.surgeries.hospital,$scope.surgeries.provider,$scope.surgeries.comments,$scope.surgeries.stayname,$scope.surgeries.stayDate,$scope.surgeries.stayreason,$scope.surgeries.stayresult,$scope.surgeries.stayhospital,$scope.surgeries.staycomments,$scope.id]).then(function(res){
		
                                                                                                                                                                                        
               params={"myParam":{"emailid":$scope.surgeries.emailid}} ;    
              $state.go('menu.surgerieslist',params);
                });

 }

else{
  
  DBService.writeData(queries.insertRecord.addsurgery,[$scope.surgeries.name,$scope.surgeries.date,$scope.surgeries.result,$scope.surgeries.hospital,$scope.surgeries.provider,$scope.surgeries.comments,$scope.surgeries.stayname,$scope.surgeries.stayDate,$scope.surgeries.stayreason,$scope.surgeries.stayresult,$scope.surgeries.stayhospital,$scope.surgeries.staycomments,$scope.surgeries.emailid]).then(function(res){
              
                                                                                                                                                                                        
              params={"myParam":{"emailid":$scope.surgeries.emailid}} ;    
              $state.go('menu.surgerieslist',params);
                });
}
}
       }
         
        
                                      $scope.delete=function(){

DBService.deleteData(queries.deleteRecord.deletesurgerieshistory,[$scope.id]).then(function(res){
   $state.go('menu.surgerieslist',params);



});

 

}
       

            
 });
