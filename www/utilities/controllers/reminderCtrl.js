angular.module('starter.controllers')

.controller('reminderCtrl', function($scope,$state,$stateParams,DBService,$rootScope,$ionicPopup) {
	         $scope.reminders=[];
	         $scope.EditReminderId = "";
	         $scope.remindersForm=[];
	         $scope.currentreminderid;
	          $scope.IsSave = true;
	           $scope.IsDone = false;
	           $scope.IsDone = $scope.IsDone ? false : true;
				$scope.IsSave = $scope.IsSave ? false : true;
	  	  $scope.WN={"emailid":$stateParams.myParam.emailid};
//alert($scope.WN.emailid);

         DBService.readData(queries.readRecord.reminders,[$scope.WN.emailid]).then(function(res){
         	
						 	//	alert(res.rows.length);
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.reminders[i]=temp;
						 			}

						 		});
         $rootScope.$on('$stateChangeSuccess',
						 	function(event, toState, toParams, fromState, fromParams){

						 	DBService.readData(queries.readRecord.reminders,[$scope.WN.emailid]).then(function(res){
						 		
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.reminders[i]=temp;
						 			}

						 		});
						 	});
       //$scope.notesList=[{"title":"note 1"},{"title":"note 1"},{"title":"note 1"},{"title":"note 1"},{"title":"note 1"}];
                                 $scope.edit=function(reminderid){
       //       alert(reminderid);
              //$scope.EditReminderId =  reminderid;
            //  alert($scope.EditEventId);
            $scope.currentreminderid=reminderid;
              DBService.readData(queries.readRecord.reminderlist,[reminderid]).then(function(res){

	                 $scope.details=res.rows.item(0);
	                
	                 $scope.remindersForm=$scope.details;
	                 
						 		
						 	$scope.IsDone = $scope.IsDone ? false : true;
							$scope.IsSave = $scope.IsSave ? false : true;
						 		});

               }


                              $scope.delete=function(reminderid){
//alert(eventid);
DBService.deleteData(queries.deleteRecord.deletereminderlist,[reminderid]).then(function(res){
	
                            $scope.IsDone = $scope.IsDone ? false : true;
							$scope.IsSave = $scope.IsSave ? false : true;

  DBService.readData(queries.readRecord.reminders,[$scope.WN.emailid]).then(function(res){

  	                             $scope.reminders=[];
						 		$scope.remindersForm=[];
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.reminders[i]=temp;
						 			}

						 		});

});

 

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
      $scope.delete($scope.currentreminderid);
    }
     if(res==true) {
       
     } 
   });
 };




             $scope.saveReminder=function(){
//alert("save"); //,remindertype=?,reminderFrequency=?,reminderPriority=? 
  DBService.writeData(queries.insertRecord.addReminder,[$scope.remindersForm.name,$scope.remindersForm.remindertype,$scope.remindersForm.reminderFrequency,$scope.remindersForm.reminderPriority,$scope.WN.emailid]).then(function(res){
              
  DBService.readData(queries.readRecord.reminders,[$scope.WN.emailid]).then(function(res){

  	                             $scope.reminders=[];
						 		$scope.remindersForm=[];
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.reminders[i]=temp;
						 			}

						 		});
      
                });


       }
        $scope.updateReminder=function(){
            //	alert("update");
            	 DBService.updateData(queries.updateRecord.updateReminder,[$scope.remindersForm.name,$scope.remindersForm.remindertype,$scope.remindersForm.reminderFrequency,$scope.remindersForm.reminderPriority,$scope.EditReminderId]).then(function(res){
		DBService.readData(queries.readRecord.reminders,[$scope.WN.emailid]).then(function(res){
                            $scope.IsDone = $scope.IsDone ? false : true;
							$scope.IsSave = $scope.IsSave ? false : true;
  	                             $scope.reminders=[];
						 		$scope.remindersForm=[];
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.reminders[i]=temp;
						 			}

						 		});

                });

            } 
 });
