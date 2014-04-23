
var project = angular.module('app.project', ['ngRoute']);

 
project.controller('projectCtrl', ['$scope','$route', '$routeParams','$location', 'Project', '$state','COData','CObject','COTrigger','COAction',

 	function($scope, $routeParams, $route, $location, Project, $state, COData,CObject,COTrigger,COAction) {

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
            
            var cOdataArr=CObject.getCOData({id:item.id}, function(){
              cODatas=cOdataArr.cODatas;
              item.cODatas=cODatas;
              //console.log("initialdatas",cODatas);
            });

          });
          $scope.cObjects.forEach( function (item,i){

            var cOtriggerArr=CObject.getCOAction({id:item.id}, function(){
              cOActions=cOtriggerArr.cOActions;
              item.cOActions=cOActions;
              //console.log("initialactions",cOActions);

            });
          });
          $scope.cObjects.forEach( function (item,i){

            var cOtriggerArr=CObject.getCOTrigger({id:item.id}, function(){
              console.log("triggersData",cOtriggerArr);

              cOTriggers=cOtriggerArr.cOTriggers;
              item.cOTriggers=cOTriggers;
              console.log("initialtriggers",cOTriggers);

            });

          });

        }

        // var connection0 = {x1:20, y1=20, x2:200, y1=150};
        // var connection1 = {x1:50, y1=50, x2:100, y1=150};


        // $scope.connections=new Array();
        // $scope.connections[0]=connection0;
        // $scope.connections[1]=connection1;


        $scope.connections=new Array();
        $scope.connections=[{x1:20, y1:20, x2:200, y2:150,},
                            {x1:50, y1:50, x2:100, y2:150,}]


		  });		
	  }); 

    $scope.selectCobject =function(cObject){
      $scope.selectedCObject=cObject;
      //console.log($scope.selectdCObject);
      $state.go('edit.addcObject');
    }

    $scope.selectedCOData=null; 
    $scope.selectCOData =function(cOData){
      $scope.selectedCOData=cOData;
      //console.log($scope.selectdCObject);
      $state.go('edit.editCOData');
    }

    $scope.selectedCOTrigger=null; 
    $scope.selectCOTrigger =function(cOTrigger){
      $scope.selectedCOTrigger=cOTrigger;
      //console.log($scope.selectdCObject);
      $state.go('edit.editCOTrigger');
    }

    $scope.selectedCOAction=null; 
    $scope.selectCOAction =function(cOAction){
      $scope.selectedCOAction=cOAction;
      //console.log($scope.selectdCObject);
      $state.go('edit.editCOAction');
    }


    var dragStarted=false;
    var initialTriggerId;
    var offsetX;
    var offsetY;

    $scope.mouseDown=function(mouseEvent){
      var elem = document.elementFromPoint(mouseEvent.clientX, mouseEvent.clientY);
      console.log(elem);
      //console.log(mouseEvent.clientX, mouseEvent.clientY);
      console.log($(elem));
      SDElem=$("#systemDiagram");
      offsetX=SDElem.offset().left;
      offsetY=SDElem.offset().top;

console.log($(elem).hasClass("out"));
      if ($(elem).hasClass("out")){
        dragStarted=true;
        console.log("I start a new arrow");
        initialTriggerId=elem.id;
        console.log(initialTriggerId);

        var newX1=mouseEvent.clientX-offsetX;
        var newY1=mouseEvent.clientY-offsetY;

        $scope.connections.push({x1:newX1,y1:newY1,x2:newX1,y2:newY1});
      }
    }

    $scope.mouseMove=function(mouseEvent){
      if(dragStarted){
        $scope.connections[$scope.connections.length-1].x2=mouseEvent.clientX-offsetX;
        $scope.connections[$scope.connections.length-1].y2=mouseEvent.clientY-offsetY;

      }
    }

    $scope.mouseUp=function(mouseEvent){
      dragStarted=false;

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
                "left":{templateUrl: '/linker/js/cObject/partials/addcObject.ejs'}  
                } 
            })
          .state('edit.editCOData', {
                 url: "editCOData",        
                views:{
                  "left":{templateUrl: '/linker/js/cObject/partials/addcObject.ejs'}, 
                "editor":{templateUrl: '/linker/js/cOData/partials/editCOData.ejs'}  
                } 
            })
            .state('edit.editCOTrigger', {
                 url: "editCOTrigger",        
                views:{
                  "left":{templateUrl: '/linker/js/cObject/partials/addcObject.ejs'}, 
                "editor":{templateUrl: '/linker/js/cOTrigger/partials/editCOTrigger.ejs'}  
                } 
            })
            .state('edit.editCOAction', {
                 url: "editCOAction",        
                views:{
                  "left":{templateUrl: '/linker/js/cObject/partials/addcObject.ejs'}, 
                "editor":{templateUrl: '/linker/js/cOAction/partials/editCOAction.ejs'}  
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





