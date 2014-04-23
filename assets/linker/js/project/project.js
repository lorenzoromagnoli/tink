
var project = angular.module('app.project', ['ngRoute']);

 
project.controller('projectCtrl', ['$scope','$route', '$routeParams','$location', 'Project', '$state','COData','CObject',

 	function($scope, $routeParams, $route, $location, Project, $state, COData,CObject) {

		$scope.$watch('projectId', function () {//wait until the variable is initialized
    		
 		  var id=$scope.projectId;
	  	var project = Project.show({projectId:id}, function(){

	  		$scope.project=project;
  		 	$scope.name=project.name;

  		 	$scope.cObjects=project.cObjects;
  
        $scope.selectedCObject;
      
        if(project.cObjects){ //if cObjects are already part of the project

          //set as default the first element as the active one
          $scope.selectedCObject=project.cObjects[0]; 
        
          //get all the COData actions
          $scope.cObjects.forEach( function (item,i){
            var cOdataArr=CObject.getCOData({id:$scope.cObjects[i].id}, function(){
              cODatas=cOdataArr.cODatas;
              item.cODatas=cODatas;
            });
          });

        }


		  });		
	  }); 

    $scope.selectCobject =function(cObject){
      $scope.selectedCObject=cObject;
      //console.log($scope.selectdCObject);
      $state.go('edit.addcObject');
    }

    $scope.selectedCOData=null; 

    $scope.selectCOData =function(cOdata){

      $scope.selectedCOData=cOdata;
      //console.log($scope.selectdCObject);
      $state.go('edit.editCOData');
    }


}]);

 // project.factory('Project', ['$resource',function($resource){
 //     return $resource('/project/:projectId', {}, {projectId:'@id'});
 //   }]);

 project.factory('Project', ['$resource',function($resource){
     return $resource('/project/:projectId', {}, 
     	{
     		//projectId:'@id',

     		'show': {method:'GET', params:{projectId:'@id'}, url:'/project/show/:projectId' }

     	});
   }]);


 project.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    	
    	 $stateProvider

        	.state('edit.addEntity', {
            	url: "addEntity",
                views:{
                  "left":{templateUrl: '/linker/js/project/partials/addEntity.ejs'} 
                } 
            })
        	.state('edit.addcObject', {       	
                views:{
                "left":{templateUrl: '/linker/js/project/partials/addcObject.ejs'}  
                } 
            })
          .state('edit.editCOData', {
                 url: "editCOData",        
                views:{
                  "left":{templateUrl: '/linker/js/project/partials/addcObject.ejs'}, 
                "editor":{templateUrl: '/linker/js/project/partials/editCOData.ejs'}  
                } 
            })

    }
 ]);


project.directive('systemDiagram', function() {
    return {
        restrict:'AE',
        //replace: true,
        link: function(scope,elem,attrs){
        },
        templateUrl: "/linker/js/project/partials/systemDiagram.ejs",
    };
});





