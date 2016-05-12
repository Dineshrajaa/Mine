angular.module('starter.controllers')

.controller('eventsCtrl', function($scope,$state,$stateParams,DBService,$rootScope,$ionicPopup) {
	         $scope.events=[];
	         $scope.eventsForm=[];
	         $scope.EditEventId = "";
	         $scope.currenteventid;
	          $scope.IsSave = true;
	           $scope.IsDone = false;
	           $scope.IsDone = $scope.IsDone ? false : true;
				$scope.IsSave = $scope.IsSave ? false : true;
	  $scope.WN={"emailid":$stateParams.myParam.emailid};
//alert($scope.WN.emailid);

         DBService.readData(queries.readRecord.events,[$scope.WN.emailid]).then(function(res){
         	
						 	//	alert(res.rows.length);
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.events[i]=temp;
						 			}

						 		});
         $rootScope.$on('$stateChangeSuccess',
						 	function(event, toState, toParams, fromState, fromParams){

						 	DBService.readData(queries.readRecord.events,[$scope.WN.emailid]).then(function(res){
						 		
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.events[i]=temp;
						 			}

						 		});
						 	});
                        $scope.edit=function(eventid){
                        	$scope.currenteventid=eventid;
             // alert(eventid);
              $scope.EditEventId =  eventid;
            //  alert($scope.EditEventId);
              DBService.readData(queries.readRecord.eventlist,[eventid]).then(function(res){

	                 $scope.details=res.rows.item(0);
	                
	                 $scope.eventsForm=$scope.details;
						 		
						 	$scope.IsDone = $scope.IsDone ? false : true;
							$scope.IsSave = $scope.IsSave ? false : true;
						 		});

               }


                              $scope.delete=function(eventid){
//alert(eventid);
DBService.deleteData(queries.deleteRecord.deleteeventlist,[eventid]).then(function(res){


	                        $scope.IsDone = $scope.IsDone ? false : true;
							$scope.IsSave = $scope.IsSave ? false : true;


  DBService.readData(queries.readRecord.events,[$scope.WN.emailid]).then(function(res){

  	                             $scope.events=[];
						 		$scope.eventsForm=[];
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.events[i]=temp;
						 			}

						 		});

});

 

}

   if($stateParams.myParam!=null){
          $scope.vaccines={"emailid":$stateParams.myParam.emailid,
            "type":null};
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
      $scope.delete($scope.currenteventid);
    }
     if(res==true) {
       
     } 
   });
 };





            $scope.updateEvent=function(){
            //	alert("update");
            	 DBService.updateData(queries.updateRecord.updateEvents,[$scope.eventsForm.name,$scope.eventsForm.eventtype,$scope.EditEventId]).then(function(res){
		DBService.readData(queries.readRecord.events,[$scope.WN.emailid]).then(function(res){
			                $scope.IsDone = $scope.IsDone ? false : true;
							$scope.IsSave = $scope.IsSave ? false : true;

  	                             $scope.events=[];
						 		$scope.eventsForm=[];
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.events[i]=temp;
						 			}

						 		});

                });

            }
          $scope.saveEvent=function(){
        //if(localStorage.getItem("navigation")=="edit"){

	


	 // DBService.updateData(queries.updateRecord.updateVaccines,[$scope.eventsForm.name,$scope.eventsForm.date,$scope.events.emailid]).then(function(res){
		// DBService.readData(queries.readRecord.events,[$scope.WN.emailid]).then(function(res){

  // 	                             $scope.events=[];
						 		
		// 				 			for(var i=0;i<res.rows.length;i++){
		// 				 				var temp=res.rows.item(i);
						 		
		// 				 				$scope.events[i]=temp;
		// 				 			}

		// 				 		});

  //               });

 //}

//else{
  DBService.writeData(queries.insertRecord.addEvent,[$scope.eventsForm.name,$scope.eventsForm.eventtype,$scope.WN.emailid]).then(function(res){
              
  DBService.readData(queries.readRecord.events,[$scope.WN.emailid]).then(function(res){


  	                             $scope.events=[];
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.events[i]=temp;
						 			}

						 		});
      
                });
//}

       }

            
 });
