angular.module('starter.controllers')

.controller('notesCtrl', function($scope,$state,$stateParams,DBService,$rootScope,$ionicPopup) {
	         $scope.notes=[];
	         $scope.EditNoteId = "";
	         $scope.notesForm=[];
	         $scope.currentnoteid;
	          $scope.IsSave = true;
	           $scope.IsDone = false;
	           $scope.IsDone = $scope.IsDone ? false : true;
				$scope.IsSave = $scope.IsSave ? false : true;
	  	  $scope.WN={"emailid":$stateParams.myParam.emailid};
//alert($scope.WN.emailid);

         DBService.readData(queries.readRecord.notes,[$scope.WN.emailid]).then(function(res){
         	
						 	//	alert(res.rows.length);
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.notes[i]=temp;
						 			}

						 		});
         $rootScope.$on('$stateChangeSuccess',
						 	function(event, toState, toParams, fromState, fromParams){

						 	DBService.readData(queries.readRecord.notes,[$scope.WN.emailid]).then(function(res){
						 		
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.notes[i]=temp;
						 			}

						 		});
						 	});
                                 $scope.edit=function(noteid){
             // alert(eventid);
             $scope.currentnoteid=noteid;
              $scope.EditNoteId =  noteid;
            //  alert($scope.EditEventId);
              DBService.readData(queries.readRecord.notelist,[noteid]).then(function(res){

	                 $scope.details=res.rows.item(0);
	                
	                 $scope.notesForm=$scope.details;
						 		
						 	$scope.IsDone = $scope.IsDone ? false : true;
							$scope.IsSave = $scope.IsSave ? false : true;
						 		});

               }


                              $scope.delete=function(noteid){
//alert(eventid);
DBService.deleteData(queries.deleteRecord.deletenotelist,[noteid]).then(function(res){
	
                            $scope.IsDone = $scope.IsDone ? false : true;
							$scope.IsSave = $scope.IsSave ? false : true;

  DBService.readData(queries.readRecord.notes,[$scope.WN.emailid]).then(function(res){

  	                             $scope.notes=[];
						 		$scope.notesForm=[];
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.notes[i]=temp;
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
      $scope.delete($scope.currentnoteid);
    }
     if(res==true) {
       
     } 
   });
 };




       //$scope.notesList=[{"title":"note 1"},{"title":"note 1"},{"title":"note 1"},{"title":"note 1"},{"title":"note 1"}];

                     $scope.saveNote=function(){
//alert("save");
  DBService.writeData(queries.insertRecord.addNote,[$scope.notesForm.name,$scope.notesForm.notetype,$scope.WN.emailid]).then(function(res){
              
  DBService.readData(queries.readRecord.notes,[$scope.WN.emailid]).then(function(res){

  	                             $scope.notes=[];
						 		$scope.notesForm=[];
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.notes[i]=temp;
						 			}

						 		});
      
                });


       }
        $scope.updateNote=function(){
            //	alert("update");
            	 DBService.updateData(queries.updateRecord.updateNotes,[$scope.notesForm.name,$scope.notesForm.notetype,$scope.EditNoteId]).then(function(res){
		DBService.readData(queries.readRecord.notes,[$scope.WN.emailid]).then(function(res){
                            $scope.IsDone = $scope.IsDone ? false : true;
							$scope.IsSave = $scope.IsSave ? false : true;
  	                             $scope.notes=[];
						 		$scope.notesForm=[];
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.notes[i]=temp;
						 			}

						 		});

                });

            } 
 });
