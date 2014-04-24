
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
        $scope.connectionsid=new Array();

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
    var dragArrowStarted=false;
    var calcOffsetX;
    var calcOffsetY;
    var scrollX;
    var scrollY;

    $scope.mouseDown=function(mouseEvent){
      
      dragStarted=true;

      var elem = document.elementFromPoint(mouseEvent.clientX, mouseEvent.clientY);
      //console.log(elem);
      //console.log(mouseEvent.clientX, mouseEvent.clientY);
     // console.log($(elem));
      SDElem=$("#systemDiagram");
      offsetX=SDElem.offset().left;
      offsetY=SDElem.offset().top;

      scrollX=$(window).scrollLeft();
      scrollY=$(window).scrollTop();

      calcOffsetX=offsetX-scrollX;
      calcOffsetY=offsetY-scrollY;

      console.log("offset",offsetX,offsetY)

      console.log("scroll",scrollX,scrollY);
      
      console.log("calcOffset",calcOffsetX,calcOffsetY)

    //console.log($(elem).attr('class'));
    
    //console.log($(elem).hasClass('out'));
      $scope.updatingConnection=false;


      if ($(elem).hasClass("out")){
        dragArrowStarted=true;
        console.log("I start a new arrow");
        
        outputID=elem.id;
        console.log(outputID);

        // var newX1=mouseEvent.clientX-calcOffsetX;
        // var newY1=mouseEvent.clientY-calcOffsetY;

        var newX1=$('#'+outputID).offset().left-offsetX ;
        var newY1=$('#'+outputID).offset().top-offsetY;

        $scope.connections.push({x1:newX1,y1:newY1,x2:newX1,y2:newY1});
        $scope.connectionsid.push({out:outputID, in:null});
      }
    }

    $scope.mouseMove=function(mouseEvent){
      if(dragArrowStarted){
        $scope.connections[$scope.connections.length-1].x2=mouseEvent.clientX-calcOffsetX;
        $scope.connections[$scope.connections.length-1].y2=mouseEvent.clientY-calcOffsetY;
      }
      if (dragStarted&&!dragArrowStarted){
        updateConnections();
        console.log("dragging something else than an arrow")
      }
    }

    $scope.mouseUp=function(mouseEvent){
      if(dragArrowStarted){
        var elem = document.elementFromPoint(mouseEvent.clientX, mouseEvent.clientY);
          if ($(elem).hasClass("in")){
            console.log("this is the right place!");

            inputId=elem.id;
            console.log(inputId);

            $scope.connectionsid[$scope.connectionsid.length-1].in=inputId;
            updateConnections();

          }else{
            $scope.connectionsid.pop();
            $scope.connections.pop();

          }

          console.log($scope.connectionsid);
      }
      dragArrowStarted=false;
      dragStarted=false;



    }
    var updateConnections=function(){

      $scope.updatingConnection=true;

      var newConnections=new Array();
      $scope.connectionsid.forEach(function(entry,i) {
        console.log(entry);
        x1=$('#'+entry.out).offset().left-offsetX ;
        y1=$('#'+entry.out).offset().top-offsetY;
        x2=$('#'+entry.in).offset().left-offsetX;
        y2=$('#'+entry.in).offset().top-offsetY;

        console.log("offset",x1);
        newConnections[i]={x1:x1, y1:y1, x2:x2, y2:y2}
      });
        $scope.connections=newConnections
        console.log($scope.connections);
    }
      $scope.updatingConnection=false;



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





